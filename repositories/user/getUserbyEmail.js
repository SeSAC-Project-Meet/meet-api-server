const { User } = require("../../models/index");
const logger = require("../../logger");

const getUserbyEmail = async (email) => {
  logger.info(`getUserbyEmail: ${email}`);
  const user = await User.findOne({ where: { email: email } });
  if (!user) {
    return null;
  }
  const ret = {
    user_id: user.user_id,
    username: user.username,
    email: user.email,
  };
  return ret;
};

module.exports = getUserbyEmail;
