const jwt = require("jsonwebtoken");
const config = require("../config.json").development;

function createJWT(user_id) {
  const payload = {
    user_id: user_id,
  };
  const options = {
    expiresIn: "5m",
  };
  return jwt.sign(payload, config.JWT_SECRET, options);
}

module.exports = createJWT;
