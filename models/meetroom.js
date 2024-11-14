const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Meetroom = sequelize.define(
  "meetroom",
  {
    meetroom_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    expires_at: {
      type: DataTypes.DATE(6),
      defaultValue: sequelize.fn("CURRENT_TIMESTAMP", 6),
      allowNull: false,
    },
  },
  {
    tableName: "meetroom",
    timestamps: false,
  },
);

module.exports = Meetroom;
