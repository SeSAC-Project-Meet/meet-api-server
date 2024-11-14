const { DataTypes, Model } = require("sequelize");
const sequelize = require("./index");

class UserProfile extends Model {}

UserProfile.init(
  {
    user_profile_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    introduction: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    mbti_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "UserProfile",
    tableName: "user_profile",
    timestamps: false,
  },
);

module.exports = UserProfile;
