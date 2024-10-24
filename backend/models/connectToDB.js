const { Sequelize } = require("sequelize");

const config = require("../config.json");
const dbConfig = config["development"];

// Sequelize 인스턴스 생성
const sequelize = new Sequelize(
  "project_meet",
  dbConfig.MYSQL_USER,
  dbConfig.MYSQL_PASSWORD,
  {
    host: dbConfig.MYSQL_HOST,
    port: dbConfig.MYSQL_PORT,
    dialect: "mysql",
    logging: (msg) => console.log(`[Sequelize Log]: ${msg}`),
    timezone: "+09:00",
  }
);

module.exports = sequelize;
