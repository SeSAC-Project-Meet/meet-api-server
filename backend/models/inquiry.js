const { DataTypes } = require("sequelize");
const sequelize = require("./connectToDB");

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
