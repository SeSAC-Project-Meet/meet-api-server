const { DataTypes, Model } = require("sequelize");
const sequelize = require("./index");

class MessageUser extends Model {}

MessageUser.init(
  {
    message_user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    message_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    checked_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    checked_at: {
      type: DataTypes.DATE(6),
      defaultValue: sequelize.fn("CURRENT_TIMESTAMP", 6),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "MessageUser",
    tableName: "message_user",
    timestamps: false,
  },
);

module.exports = MessageUser;
