const { User, registerUser } = require("../models/User");
const bcrypt = require("bcrypt");
const config = require("../config.json").development;

const handleRegister = async (req, res) => {
  console.log(req.body);
  const { name, email, phone_number, password } = req.body;
  // Check if the user already exists
  // If the user does not exist, create a new user
  // Return the user data
  try {
    let trimmedPassword = password.trim();
    if (trimmedPassword.length < 8) {
      // 비밀번호 조건확인 로직
      res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
      return;
    }
    const bcryptSalt = await bcrypt.genSalt(config.SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, bcryptSalt);
    const result = await registerUser({
      // 젠장할 await을 잘 씁시다 ^&^
      username: name, // username이 name으로 변경되었습니다.
      email: email,
      phone_number: phone_number,
      password: hashedPassword,
    });
    console.log(result.status);
    res.status(result.status).json({ message: result.message });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = handleRegister;