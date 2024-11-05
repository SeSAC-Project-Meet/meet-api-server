const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const KakaoStrategy = require("passport-oauth2").Strategy;
const axios = require("axios");

// passport-local의 LocalStrategy와 passport-jwt의 JWTStrategy를 각각 올바르게 가져옴
const config = require("./config.json").development;
const bcrypt = require("bcrypt");

const User = require("./models/define/User"); // User 모델 경로
const getUserbyEmail = require("./models/getUserbyEmail");

const opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    (req) => {
      let token = null;
      if (req.cookies) {
        token = req.cookies.MEET_ACCESS_TOKEN; // 쿠키에서 JWT를 가져옵니다.
        console.log("[passport-setup] JWT from cookie : ", token);
      }
      return token;
    },
  ]),
  secretOrKey: config.JWT_SECRET, // 비밀 키 설정
};

passport.use(
  // TODO : JWT 유효성 검증을 안하는데? ; 응 하고 있어 opts ...
  // 참고로 여기서 유효한 opts를 거쳤을 떄 유효한 토큰이 아니면 아래 함수는 실행되지도 않음
  "jwt",
  new JWTStrategy(opts, async (jwt_payload, done) => {
    console.log("[passport-setup] jwt_payload : ", jwt_payload);
    try {
      const user = await User.findByPk(jwt_payload.user_id); // payload에서 user_id로 사용자 찾기
      console.log("[passport-setup] user_id in JWT payload: ", user);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      console.log("[passport-setup] JWT Error : ", error);
      return done(error, false);
    }
  })
);

passport.use(
  "local",
  new LocalStrategy(
    { usernameField: "loginID", passwordField: "password" },
    async (loginID, password, done) => {
      console.log("🚀 ~ loginId:", loginID, password);
      const user = await User.findOne({ where: { phone_number: loginID } });
      if (user && (await bcrypt.compare(password, user.password))) {
        // console.log("🚀 ~ user:", user);
        return done(null, user);
      }
      return done(null, false);
    }
  )
);

passport.use(
  "kakao",
  new KakaoStrategy(
    {
      authorizationURL: "https://kauth.kakao.com/oauth/authorize",
      tokenURL: "https://kauth.kakao.com/oauth/token",
      clientID: config.KAKAO_REST_API_KEY, // 카카오 앱 키
      callbackURL: "/auth/kakao/callback", // 설정한 Redirect URI
      clientSecret: config.KAKAO_CLIENT_SECRET, // 카카오 앱 시크릿
      scope: ["profile_nickname", "profile_image", "account_email", "openid"],
    },
    // verify callback
    async (accessToken, refreshToken, params, profile, done) => {
      console.log("🚀 ~ CALLED");
      console.log(params);
      try {
        const kakaoProfileRes = await axios.get(
          "https://kapi.kakao.com/v2/user/me",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          }
        );

        const kakaoUserProfile = kakaoProfileRes.data;
        console.log(
          "[passport-setup : kakao] KakaoUserProfile : ",
          kakaoUserProfile
        );
        // 여기서 userProfile을 기반으로 DB에 사용자 정보 저장/조회 처리
        // 제공받은 정보를 기반으로 비교하는 로직이 필봄

        const kakaoUserProfileParsed = {
          kakao_id_token: params.id_token,
          nickname: kakaoUserProfile.kakao_account.profile.nickname,
          profile_image_url:
            kakaoUserProfile.kakao_account.profile.profile_image_url,
          email: kakaoUserProfile.kakao_account.email,
        };

        const user = await getUserbyEmail(kakaoUserProfileParsed.email);
        if (!user) {
          return done(null, false, {
            message: "User not found",
            user: kakaoUserProfileParsed,
          });
          // throw new Error("User not found");
        } else {
          const userInfo = { ...kakaoUserProfileParsed, ...user };
          console.log("[passport-setup : kakao] Final User Info : ", userInfo);
          return done(null, userInfo); // user_id를 parse해서 돌려보냄
        }
      } catch (error) {
        console.log("[passport-setup : kakao] Error : ", error);
        return done(error, null);
      }
    }
  )
);

console.log("passport-setup.js loaded");
