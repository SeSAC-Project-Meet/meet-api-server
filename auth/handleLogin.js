const createAccessToken = require("./createAccessToken");
const createRefreshToken = require("./createRefreshToken");
const logger = require("../logger");

const handleLogin = async (req, res) => {
  // passport 통해서 들어온거 check
  logger.info(`[handleLogin] Is user exists : ${!!req.user}`);

  if (req.user) {
    logger.info(`[handleLogin] user_id : ${req.user.user_id}`);
    const { user_id, username } = req.user;
    const createdAccessToken = createAccessToken(user_id, username);
    const createdRefreshToken = await createRefreshToken(user_id, username);
    logger.info(`Login success, sent token : ${user_id} ${username}`);
    const cookieOptions = {
      maxAge: 1000 * 60 * 60 * 24 * 7, // ms * s * m * h * d 7일
      httpOnly: true,
      sameSite: "none",
      secure: true,
    };
    return res
      .status(200)
      .cookie("MEET_REFRESH_TOKEN", createdRefreshToken, cookieOptions)
      .json({
        token: createdAccessToken,
        user: { user_id, username },
        message: "Login success",
      });
  } else {
    logger.info(`Login failed`);
    return res.status(401).json({ message: "Login failed" });
  }
};

module.exports = handleLogin;
