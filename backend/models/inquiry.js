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
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // TODO : fix
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "inquiry",
    timestamps: false,
  },
);

module.exports = Inquiry;
