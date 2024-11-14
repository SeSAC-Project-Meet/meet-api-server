const passport = require("passport");
const config = require("../../../config.json").development;
const createAccessToken = require("../../../services/auth/createAccessToken");
const createRefreshToken = require("../../../services/auth/createRefreshToken");
const logger = require("../../../logger");

const handleKakaoCallback = (req, res) => {
  passport.authenticate(
    "kakao",
    { session: false },
    async (err, user, info) => {
      if (err) {
        logger.info(`[auth/kakao/callback] Error: ${err}`);
        return; // 에러가 발생하면 다음 미들웨어로 넘깁니다.
      }
      if (!user) {
        // 인증 실패 시
        const { email } = info.user; // return value
        logger.info(
          `Not registerd User logged in with kakao: ${JSON.stringify(email)}`,
        );
        return res
          .status(401)
          .send(
            `<script>window.opener.postMessage({ not_registered_user : ${JSON.stringify({ email })} }, '${config.FRONTEND_URL}'); window.close();</script>`,
          );
      }

      logger.info(`Kakao login success: ${user}`);
      const cookieOptions = {
        maxAge: 1000 * 60 * 60 * 24 * 7, // ms * s * m * h * d 7일
        httpOnly: true,
        sameSite: "none",
        secure: true,
      };

      const { user_id, username } = user; // return value
      const createdAccessToken = createAccessToken(user_id, username);
      const createdRefreshToken = await createRefreshToken(user_id, username);
      logger.info("로그인 성공, 토큰 발급 후 쿠키로 전달합니다.");
      return res
        .status(200)
        .cookie("MEET_REFRESH_TOKEN", createdRefreshToken, cookieOptions)
        .send(
          `<script>window.opener.postMessage(${JSON.stringify({ token: createdAccessToken, user_id, username })}, '${config.FRONTEND_URL}'); window.close();</script>`,
        );
      // .json({ user: user })
      // .redirect(config.KAKAO_REDIRECT_URI);
    },
  )(req, res);
};

module.exports = handleKakaoCallback;
