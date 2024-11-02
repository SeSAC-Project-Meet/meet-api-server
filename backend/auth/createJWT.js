const jwt = require("jsonwebtoken");
const config = require("../config.json");

function createJWT(user_id) {
  const payload = {
    user_id: user_id,
  };
  const options = {
    expiresIn: "10s",
  };
  return jwt.sign(payload, config.development.JWT_SECRET, options);
}

module.exports = createJWT;
