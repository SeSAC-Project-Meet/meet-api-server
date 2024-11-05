const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const KakaoStrategy = require("passport-oauth2").Strategy;
const axios = require("axios");

const config = require("./config.json").development;
const bcrypt = require("bcrypt");

const User = require("./models/define/User"); // User 모델 경로
const getUserbyEmail = require("./models/getUserbyEmail");
const logger = require("./logger");

const opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    (req) => {
      let token = null;
      if (req.cookies) {
        token = req.cookies.MEET_ACCESS_TOKEN; // 쿠키에서 JWT를 가져옵니다.
        logger.info(`[passport-setup] JWT from cookie : ${token}`);
      }
      return token;
    },
  ]),
  secretOrKey: config.JWT_SECRET, // 비밀 키 설정
};

passport.use(
  "jwt",
  new JWTStrategy(opts, async (jwt_payload, done) => {
    logger.info(`[passport-setup] jwt_payload : ${jwt_payload}`);
    try {
      const user = await User.findByPk(jwt_payload.user_id); // payload에서 user_id로 사용자 찾기
      logger.info(`[passport-setup] user_id in JWT payload: ${user}`);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      logger.info(`[passport-setup] JWT Error : ${error}`);
      return done(error, false);
    }
  })
);

passport.use(
  "local",
  new LocalStrategy(
    { usernameField: "loginID", passwordField: "password" },
    async (loginID, password, done) => {
      logger.info(`🚀 ~ loginId: ${loginID}, password: ${password}`);
      const user = await User.findOne({ where: { phone_number: loginID } });
      if (user && (await bcrypt.compare(password, user.password))) {
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
    async (accessToken, refreshToken, params, profile, done) => {
      logger.info(`🚀 ~ CALLED`);
      logger.info(`[passport] ${JSON.stringify(params)}`);
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
        logger.info(
          `[passport-setup : kakao] KakaoUserProfile : ${JSON.stringify(kakaoUserProfile)}`
        );

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
        } else {
          const userInfo = { ...kakaoUserProfileParsed, ...user };
          logger.info(
            `[passport-setup : kakao] Final User Info : ${JSON.stringify(userInfo)}`
          );
          return done(null, userInfo);
        }
      } catch (error) {
        logger.info(`[passport-setup : kakao] Error : ${error}`);
        return done(error, null);
      }
    }
  )
);

logger.info(`passport-setup.js loaded`);
