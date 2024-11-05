const createJWT = require("./createJWT");

const handleLogin = async (req, res) => {
  // passport 통해서 들어온거 check
  console.log("[handleLogin] Is user exists : " + !!req.user);

  if (req.user) {
    console.log("[handleLogin] user_id : " + req.user.user_id);
    const createdToken = createJWT(req.user.user_id);
    console.log("Login success, Token :", createdToken);
    const { user_id, username } = req.user;
    const cookieOptions = {
      maxAge: 1000 * 60 * 5, // 5 m
      httpOnly: true,
      sameSite: "strict",
    };
    return res
      .status(200)
      .cookie("MEET_ACCESS_TOKEN", createdToken, cookieOptions)
      .json({ user: { user_id, username }, message: "Login success" });
  } else {
    console.log("Login failed");
    return res.status(401).json({ message: "Login failed" });
  }
};

module.exports = handleLogin;
