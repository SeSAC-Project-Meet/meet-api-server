const handleLogout = (req, res) => {
  const cookieOptions = {
    maxAge: 0,
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };

  return res
    .status(200)
    .cookie("MEET_REFRESH_TOKEN", "", cookieOptions)
    .json({ message: "로그아웃 되었습니다." });
};

module.exports = handleLogout;
