const logger = require("../../logger");

const handleGetUser = (req, res) => {
  logger.info(`[handleGetUser] 사용자 존재여부 : ${!!req.user}`);
  if (req.user) {
    logger.info(`[handleGetUser] User : ${JSON.stringify(req.user, null, 2)}`);
    return res
      .status(200)
      .json({ username: req.user.username, user_id: req.user.user_id });
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = handleGetUser;
