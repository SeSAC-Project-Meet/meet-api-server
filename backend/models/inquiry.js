const { DataTypes } = require("sequelize");
const sequelize = require("./connectToDB"); // connect ETIMEDOUT 에러 발생
// const { Sequelize } = require("sequelize");
const dbConfig = require("../config.json")["development"]; // connect ETIMEDOUT 에러 발생
// const dbConfig = require("../config.json")["development local db"];
// const sequelize = new Sequelize(
//   "project_meet",
//   dbConfig.MYSQL_USER,
//   dbConfig.MYSQL_PASSWORD,
//   {
//     host: dbConfig.MYSQL_HOST,
//     port: dbConfig.MYSQL_PORT,
//     dialect: "mysql",
//     logging: (msg) => console.log(`[Sequelize Log]: ${msg}`),
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000,
//     },
//   }
// );

const Inquiry = sequelize.define(
  "Inquiry",
  {
    inquiry_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(4096),
      allowNull: false,
    },
    photo_url_1: {
      type: DataTypes.STRING(1024),
      allowNull: true,
    },
    // question: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // answer: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
    // 컬럼 추가 및 변경 필요
  },
  {
    tableName: "inquiry",
    timestamps: false, // TODO : 테이블 변경 후 수정 필요
  }
);

module.exports = Inquiry;
