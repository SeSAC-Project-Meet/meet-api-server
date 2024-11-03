const User = require("./define/User");

const getUserbyEmail = async (email) => {
  console.log(`getUserbyEmail: ${email}`);
  const user = await User.findOne({ where: { email: email } });
  console.log("LOG");
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
