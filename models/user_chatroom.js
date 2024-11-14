const { DataTypes, Model } = require("sequelize");
const sequelize = require("./index");

class UserChatroom extends Model {}

UserChatroom.init(
  {
    user_chatroom_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    chatroom_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_status: {
      type: DataTypes.STRING(30),
      allowNull: false,
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
    modelName: "UserChatroom",
    tableName: "user_chatroom",
    timestamps: false,
  },
);

module.exports = UserChatroom;
