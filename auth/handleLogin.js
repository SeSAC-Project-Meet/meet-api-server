const jwt = require("jsonwebtoken");
const config = require("../config.json").development;

const handleLogin = async (req, res) => {
  // passport 통해서 들어온거 check
  console.log("auth/login check, is user : " + !!req.user);

  if (req.user) {
    console.log("user_id check : " + req.user.user_id);
    const token = jwt.sign({ user_id: req.user.user_id }, config.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("Login success");
    return res
      .status(200)
      .cookie("MEET_USER_TOKEN", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 3600000,
      })
      .json({ message: "Login success" });
  } else {
    console.log("Login failed");
    return res.status(401).json({ message: "Login failed" });
  }
};

module.exports = handleLogin;
