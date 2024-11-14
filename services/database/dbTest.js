const sequelize = require("../../models");
const logger = require("../../logger");

// 연결 테스트
async function testConnection() {
  try {
    await sequelize.authenticate();
    logger.info(`Connection has been established successfully.`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();
