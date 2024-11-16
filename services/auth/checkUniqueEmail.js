const { User } = require("../../models/index");
// TODO : 책임분리
const logger = require("../../logger");

const checkUniqueEmail = async (email) => {
  try {
    // 기존 유저가 존재하는지 확인 : 핸드폰 번호 기준
    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      logger.info(
        "[checkUniqueEmail] User already exists with this Email:",
        email
      );
      return {
        status: 409,
        message: `User already exists with this email : ${email}`,
      };
    } else {
      logger.info(`[checkUniqueEmail] Unique Email, good to go : ${email}`);
      return { status: 200, message: "Unique Email, good to go" };
    }
  } catch (error) {
    console.error(`[checkUniqueEmail] Error checking email: ${error}`);
    throw new Error("[checkUniqueEmail] Error checking email");
  }
};

module.exports = checkUniqueEmail;
