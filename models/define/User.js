const sequelize = require("../connectToDB");
const { DataTypes, Sequelize } = require("sequelize");

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    phone_number: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE(6),
      defaultValue: Sequelize.fn("CURRENT_TIMESTAMP", 6),
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE(6),
      defaultValue: Sequelize.fn("CURRENT_TIMESTAMP", 6),
      allowNull: false,
      onUpdate: Sequelize.fn("CURRENT_TIMESTAMP", 6),
    },
  },
  {
    tableName: "user",
    timestamps: false, // If you want to manage created_at and updated_at manually
  }
);

module.exports = User;
