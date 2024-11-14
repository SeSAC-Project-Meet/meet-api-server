const User = require("../../models/user");
const logger = require("../../logger");

/**
 * Registers a new user in the database.
 * @async
 * @function registerUser
 * @param {Object} userData - The data of the user to be registered.
 * @param {string} userData.name - The name of the user.
 * @param {string} userData.nickname - The nickname of the user.
 * @param {string} userData.birthdate - The birthdate of the user in YYYY-MM-DD format.
 * @param {string} userData.email - The email address of the user.
 * @param {string} userData.phone_number - The phone number of the user.
 * @returns {Promise<void>} Resolves if the user is successfully registered, otherwise logs an error.
 */
async function registerUser(userData) {
  try {
    // 기존 유저가 존재하는지 확인 : 핸드폰 번호 기준
    const existingUser = await User.findOne({
      where: { phone_number: userData.phone_number },
    });

    if (existingUser) {
      logger.info(
        "User already exists with this phone_number:",
        userData.phone_number,
      );
      return {
        status: 409,
        message: `User already exists with this phone_number : ${userData.phone_number}`,
      };
    }

    // 유저가 존재하지 않으면 새 유저 생성
    const user = await User.create(userData);
    logger.info(`User registered: ${user.toJSON()}`);
    return { status: 201, message: "User registered successfully" };
  } catch (error) {
    console.error("Error registering user:", error);
    return { status: 500, message: "Error registering user" };
  }
}

module.exports = registerUser;
