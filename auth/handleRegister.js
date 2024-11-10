const registerUser = require("../models/user/registerUser");
const bcrypt = require("bcrypt");
const logger = require("../logger");
const config = require("../config.json").development;

const handleRegister = async (req, res) => {
  logger.info(req.body);
  const { name, email, phone_number, password } = req.body;
  // Check if the user already exists
  // If the user does not exist, create a new user
  // Return the user data
  try {
    const nameRegex = /^[a-zA-Z가-힣]+$/;
    if (!nameRegex.test(name)) {
      return res.status(400).json({ message: "Invalid Format Received" });
    }

    const phoneRegex =
      /^(010|011|016|017|018|019|02|031|032|033|034|041|042|043|044|051|052|053|054|055|061|062|063|064|070)-\d{3,4}-\d{4}$/;
    if (!phoneRegex.test(phone_number)) {
      return res.status(400).json({ message: "Invalid Format Received" });
    }

    const trimmedPassword = password.trim();
    const regex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?-]).{8,}$/;

    if (!regex.test(trimmedPassword)) {
      // 비밀번호 조건확인 로직
      return res.status(400).json({ message: "Invalid Format Received" });
    }

    const bcryptSalt = await bcrypt.genSalt(config.SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(trimmedPassword, bcryptSalt);
    const result = await registerUser({
      // 젠장할 await을 잘 씁시다 ^&^
      username: name, // username이 name으로 변경되었습니다.
      email: email,
      phone_number: phone_number,
      password: hashedPassword,
    });
    logger.info(result.status);
    res.status(result.status).json({ message: result.message });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = handleRegister;
