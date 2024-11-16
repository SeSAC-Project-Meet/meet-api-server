const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const KakaoStrategy = require("passport-oauth2").Strategy;
const axios = require("axios");

const config = require("./config.json").development;
const bcrypt = require("bcrypt");

const { User, UserRefreshToken } = require("./models/index");
const getUserbyEmail = require("./repositories/user/getUserbyEmail");
const logger = require("./logger");

const optsCookie = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    (req) => {
      let token = null;
      if (req.cookies) {
        token = req.cookies.MEET_REFRESH_TOKEN; // 쿠키에서 JWT를 가져옵니다.
        logger.info(`[passport-setup] 쿠키에서 JWT 파싱완료 : ${!!token}`);
      }
      return token;
    },
  ]),
  secretOrKey: config.JWT_SECRET, // 비밀 키 설정
};

const optsHeader = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    (req) => {
      const token =
        ExtractJwt.fromAuthHeaderAsBearerToken()(req) ||
        ExtractJwt.fromHeader("x-access-token")(req);
      logger.info(`[passport-setup] Header에서 JWT 파싱완료 : ${!!token}`);
      return token;
    },
  ]),
  secretOrKey: config.JWT_SECRET, // 비밀 키 설정
};

passport.use(
  "jwtRefresh",
  new JWTStrategy(optsCookie, async (jwt_payload, done) => {
    logger.info(
      `[passport-setup] RefreshToken 검증 시도 : ${JSON.stringify(jwt_payload, null, 2)}`
    );
    try {
      const user =
        (await UserRefreshToken.count({
          where: { user_id: jwt_payload.user_id, user_valid: true },
        })) > 0;
      logger.info(
        `[passport-setup] RefreshToken 검증 결과 : ${JSON.stringify(user, null, 2)}`
      );
      if (user) {
        return done(null, {
          user_id: jwt_payload.user_id,
          username: jwt_payload.username,
        });
      } else {
        return done(null, false);
      }
    } catch (error) {
      logger.info(`[passport-setup] RefreshToken 검증 중 오류 발생 : ${error}`);
      return done(error, false);
    }
  })
);

passport.use(
  "jwt",
  new JWTStrategy(optsHeader, async (jwt_payload, done) => {
    logger.info(
      `[passport-setup] jwt_payload : ${JSON.stringify(jwt_payload, null, 2)}`
    );
    try {
      const user = await User.findByPk(jwt_payload.user_id); // payload에서 user_id로 사용자 찾기
      logger.info(
        `[passport-setup] JWT에 따른 사용자 ID : ${user.dataValues.user_id}`
      );
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      logger.info(`[passport-setup] AccessToken Error : ${error}`);
      return done(error, false);
    }
  })
);

passport.use(
  "local",
  new LocalStrategy(
    { usernameField: "loginID", passwordField: "password" },
    async (loginID, password, done) => {
      logger.info(
        `[passport-setup] 로그인 요청 id: ${loginID}, password: ${password}`
      );
      const user = await User.findOne({ where: { phone_number: loginID } });
      if (user && (await bcrypt.compare(password, user.password))) {
        logger.info(`[passport-setup] 로그인 성공`);
        return done(null, user);
      }
      logger.info(`[passport-setup] 로그인 실패`);
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
      logger.info(
        `[passport-setup] 카카오 로그인 verify 함수:  ${JSON.stringify(params, null, 2)}`
      );
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
          `[passport-setup] 카카오 me로부터 가지고 온 정보 : ${JSON.stringify(kakaoUserProfile, null, 2)}`
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
            `[passport-setup] 카카오계정 이메일에 일치하는 사용자가 존재합니다, 다음 정보를 전달합니다 :\n${JSON.stringify(userInfo, null, 2)}`
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

logger.info(`[INFO] passport-setup.js loaded`);
