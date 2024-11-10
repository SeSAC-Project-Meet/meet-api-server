const jwt = require("jsonwebtoken");
const config = require("../config.json").development;

function createAccessToken(user_id, username) {
  const payload = {
    user_id,
    username,
  };
  const options = {
    expiresIn: "30m",
  };
  return jwt.sign(payload, config.JWT_SECRET, options);
}

module.exports = createAccessToken;
