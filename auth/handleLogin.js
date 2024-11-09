const createJWT = require("./createJWT");
const logger = require("../logger");

const handleLogin = async (req, res) => {
  // passport 통해서 들어온거 check
  logger.info(`[handleLogin] Is user exists : ${!!req.user}`);

  if (req.user) {
    logger.info(`[handleLogin] user_id : ${req.user.user_id}`);
    const createdToken = createJWT(req.user.user_id);
    logger.info(`Login success, Token : ${createdToken}`);
    const { user_id, username } = req.user;
    const cookieOptions = {
      maxAge: 1000 * 60 * 60, // ms * s * m * h
      httpOnly: true,
      sameSite: "none",
      secure: true,
    };
    return res
      .status(200)
      .cookie("MEET_ACCESS_TOKEN", createdToken, cookieOptions)
      .json({ user: { user_id, username }, message: "Login success" });
  } else {
    logger.info(`Login failed`);
    return res.status(401).json({ message: "Login failed" });
  }
};

module.exports = handleLogin;
