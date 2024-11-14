const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("./index");

const UserToken = sequelize.define(
  "UserToken",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "user_id",
      },
    },
    user_token_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    token: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      // defaultValue: Sequelize.fn("CURRENT_TIMESTAMP", 6),
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP + INTERVAL 9 HOUR"),
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
      // defaultValue: Sequelize.fn("CURRENT_TIMESTAMP", 6),
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP + INTERVAL 9 HOUR"), // TODO : 수정, 만료 시간 확인 구현과 함께
      // defaultValue: Sequelize.literal("CURRENT_TIMESTAMP + INTERVAL 30 MINUTE"),
      // defaultValue: Sequelize.literal(
      // "CURRENT_TIMESTAMP + INTERVAL 9 HOUR + INTERVAL 30 MINUTE", // TODO : 수정
      // "CURRENT_TIMESTAMP + INTERVAL 10 HOUR", // TODO : 수정
      // ),
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "user_token",
    timestamps: false,
  },
);

module.exports = UserToken;
