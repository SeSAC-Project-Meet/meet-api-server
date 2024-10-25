const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const KakaoStrategy = require("passport-oauth2").Strategy;
const axios = require("axios");

// passport-local의 LocalStrategy와 passport-jwt의 JWTStrategy를 각각 올바르게 가져옴
const config = require("./config.json");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("./models/User"); // User 모델 경로

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.development.JWT_SECRET,
};

passport.use(
  "jwt",
  new JWTStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findByPk(jwt_payload.user_id); // payload에서 user_id로 사용자 찾기
      if (user) {
        return done(null, user.user_id);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

passport.use(
  "local",
  new LocalStrategy(
    { usernameField: "phone_number", passwordField: "password" },
    async (phone_number, password, done) => {
      const user = await User.findOne({ where: { phone_number } });
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
      clientID: config.development.KAKAO_REST_API_KEY, // 카카오 앱 키
      callbackURL: "/auth/kakao/callback", // 설정한 Redirect URI
      scope: ["profile_nickname", "profile_image", "account_email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const response = await axios.get("https://kapi.kakao.com/v2/user/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        });

        const userProfile = response.data;
        // 여기서 userProfile을 기반으로 DB에 사용자 정보 저장/조회 처리
        // 제공받은 정보를 기반으로 비교하는 로직이 필봄

        done(null, userProfile); // 우선 어떻게 담겨오는지 확인하기 위해 넣어봄
      } catch (error) {
        done(error, null);
      }
    }
  )
);
