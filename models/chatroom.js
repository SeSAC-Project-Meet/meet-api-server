const { DataTypes, Model } = require("sequelize");
const sequelize = require("./index");

class Chatroom extends Model {}

Chatroom.init(
  {
    chatroom_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Chatroom",
    tableName: "chatroom",
    timestamps: false,
  },
);

module.exports = Chatroom;
