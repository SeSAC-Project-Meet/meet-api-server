const { Sequelize } = require("sequelize");
const config = require("../config.json");
const logger = require("../logger");
const dbConfig = config.development;

// Sequelize 인스턴스 생성
const sequelize = new Sequelize(
  "project_meet",
  dbConfig.MYSQL_USER,
  dbConfig.MYSQL_PASSWORD,
  {
    host: dbConfig.MYSQL_HOST,
    port: dbConfig.MYSQL_PORT,
    dialect: "mysql",
    logging: (msg) => logger.info(`[Sequelize Log]: ${msg}`),
    timezone: "+09:00",
    pool: {
      max: 10, // 최대 연결 수
      min: 0, // 최소 연결 수
      acquire: 30000, // 연결을 가져오는 최대 시간 (ms)
      idle: 10000, // 연결이 유휴 상태일 때 종료되기까지의 시간 (ms)
    },
  },
);

const models = {};
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
fs.readdirSync(__dirname)
  .filter((file) => {
    return !file.startsWith(".") && file !== basename && file.endsWith(".js");
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file)); // 모델 불러오기
    // console.log(file, model.name);
    models[model.name] = model; // 모델을 models 객체에 저장
    model.init(sequelize); // 모델 초기화
  });
Object.keys(models).forEach((modelName) => {
  // if (models[modelName].associate) {
  if (typeof modelName.associate === "function") {
    models[modelName].associate(models); // 모델 간 관계 설정
  }
});

const db = {
  sequelize, // sequelize 객체
  ...models, // 초기화된 모든 모델
};

module.exports = db;
// 다른 파일에서 모델 불러오는 방법 2가지 예시 :
// const { User } = require("./models/index.js"); // User
// const db = require("./models/index.js"); // db.User, db.Area, db.Badge, ...
