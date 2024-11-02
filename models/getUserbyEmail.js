const { User } = require("./User");

const getUserbyEmail = async (email) => {
  console.log(`getUserbyEmail: ${email}`);
  const user = await User.findOne({ where: { email: email } });
  console.log("LOG");
  if (!user) {
    return null;
  }
  return user.user_id;
};

module.exports = getUserbyEmail;
