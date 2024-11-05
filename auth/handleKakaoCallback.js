const passport = require("passport");
const config = require("../config.json").development;
const createJWT = require("./createJWT");

const handleKakaoCallback = (req, res) => {
  passport.authenticate("kakao", { session: false }, (err, user, info) => {
    if (err) {
      console.log("[auth/kakao/callback] Error: ", err);
      return; // 에러가 발생하면 다음 미들웨어로 넘깁니다.
    }

    if (!user) {
      // 인증 실패 시
      return res
        .status(401)
        .send(
          `<script>window.opener.postMessage({ not_registered_user : ${JSON.stringify(info)} }, '${config.FRONTEND_URL}'); window.close();</script>`
        );
    }

    console.log("Kakao login success:", user);
    const cookieOptions = {
      maxAge: 1000 * 60 * 5, // 1 day
      httpOnly: true,
      sameSite: "strict",
    };

    const createdToken = createJWT(user.user_id);

    return res
      .status(200)
      .cookie("MEET_ACCESS_TOKEN", createdToken, cookieOptions)
      .send(
        `<script>window.opener.postMessage({ user: ${JSON.stringify(user)} }, '${config.FRONTEND_URL}'); window.close();</script>`
      );
    // .json({ user: user })
    // .redirect(config.KAKAO_REDIRECT_URI);
  })(req, res);
};

module.exports = handleKakaoCallback;
