const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const UserMeetroom = sequelize.define(
  "user_meetroom",
  {
    user_meetroom_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    meetroom_id: {
      type: DataTypes.INTEGER,
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
    tableName: "user_meetroom",
    timestamps: false,
  },
);

module.exports = UserMeetroom;
