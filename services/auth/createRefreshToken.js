const jwt = require("jsonwebtoken");
const User_refresh_token = require("../../models/user_refresh_token");
const config = require("../../config.json").development;

async function createRefreshToken(user_id, username) {
  const payload = {
    user_id,
    username,
  };
  const options = {
    expiresIn: "7d",
  };
  const result = jwt.sign(payload, config.JWT_SECRET, options);

  await User_refresh_token.create({
    user_id,
    token: result,
  });

  return result;
}

module.exports = createRefreshToken;
