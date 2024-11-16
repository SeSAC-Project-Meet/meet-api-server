const jwt = require("jsonwebtoken");
const { UserRefreshToken } = require("../../models/index");
// TODO : repository로 책임분리 필요
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

  await UserRefreshToken.create({
    user_id,
    token: result,
  });

  return result;
}

module.exports = createRefreshToken;
