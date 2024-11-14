const User = require("../../models/user");
const logger = require("../../logger");

const checkUniquePhoneNumber = async (phone_number) => {
  try {
    // 기존 유저가 존재하는지 확인 : 핸드폰 번호 기준
    const existingUser = await User.findOne({
      where: { phone_number },
    });

    if (existingUser) {
      logger.info(
        "[checkUniquephone_number] User already exists with this Phone Number:",
        phone_number,
      );
      return {
        status: 409,
        message: `User already exists with this Phone Number : ${phone_number}`,
      };
    } else {
      logger.info(
        "[checkUniquePhoneNumber] Unique Phone Number, good to go : ",
        phone_number,
      );
      return { status: 200, message: "Unique Phone Number, good to go" };
    }
  } catch (error) {
    console.error(
      "[checkUniquePhoneNumber] Error checking Phone Number",
      error,
    );
    throw new Error(
      "[checkUniquePhoneNumber] Error checking Phone Number",
      error,
    );
  }
};

module.exports = checkUniquePhoneNumber;
