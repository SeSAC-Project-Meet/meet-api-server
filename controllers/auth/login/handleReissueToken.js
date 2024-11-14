const User = require("../../../models/user");
const createAccessToken = require("../../../services/auth/createAccessToken");

const handleReissueToken = async (req, res) => {
  const { user } = req;
  const username = await User.findByPk(user.user_id, {
    attributes: ["username"],
  });
  console.error("aejfasdfjkasd USERNAME", username);
  const createdAccessToken = createAccessToken(
    user.user_id,
    username.dataValues.username,
  );
  return res.status(201).json({
    token: createdAccessToken,
    user: { user_id: user.user_id, username: username.dataValues.username },
    message: "Token reissued",
  });
};

module.exports = handleReissueToken;
