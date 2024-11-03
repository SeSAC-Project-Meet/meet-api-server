const { User } = require("./User");

const getUserbyEmail = async (email) => {
  console.log(`getUserbyEmail: ${email}`);
  const user = await User.findOne({ where: { email: email } });
  console.log("LOG");
  const ret = {
    user_id: user.user_id,
    username: user.username,
    email: user.email,
  };
  if (!user) {
    return null;
  }
  return ret;
};

module.exports = getUserbyEmail;
