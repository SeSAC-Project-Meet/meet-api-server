const { Sequelize } = require("sequelize");

const config = require("../config.json");
const dbConfig = config["development"];
// const dbConfig = require("../config.json")["development local db"]; // 로컬 DB 사용 시

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
    pool: {
      max: 10, // 최대 연결 수
      min: 0, // 최소 연결 수
      acquire: 30000, // 연결을 가져오는 최대 시간 (ms)
      idle: 10000, // 연결이 유휴 상태일 때 종료되기까지의 시간 (ms)
    },
  }
);

module.exports = sequelize;
