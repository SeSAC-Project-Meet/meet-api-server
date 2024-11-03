const handleGetUser = (req, res) => {
  console.log("auth/user check, is user : " + !!req.user);
  if (req.user) {
    return res.status(200).json({ username: req.user.username });
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = handleGetUser;
