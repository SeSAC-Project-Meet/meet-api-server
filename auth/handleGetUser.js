const logger = require("../logger");
const handleGetUser = (req, res) => {
  logger.info(`auth/user check, is user : ${!!req.user}`);
  if (req.user) {
    return res
      .status(200)
      .json({ username: req.user.username, user_id: req.user.user_id });
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = handleGetUser;
