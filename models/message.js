const { DataTypes, Model } = require("sequelize");
const sequelize = require("./index");

class Message extends Model {}

Message.init(
  {
    message_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    chatroom_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING(4096),
      allowNull: true,
    },
    image_url: {
      type: DataTypes.STRING(1024),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE(6),
      defaultValue: sequelize.fn("CURRENT_TIMESTAMP", 6),
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE(6),
      defaultValue: sequelize.fn("CURRENT_TIMESTAMP", 6),
      allowNull: false,
      onUpdate: sequelize.fn("CURRENT_TIMESTAMP", 6),
    },
  },
  {
    sequelize,
    modelName: "Message",
    tableName: "message",
    timestamps: false,
  },
);

module.exports = Message;
