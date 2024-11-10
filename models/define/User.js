const sequelize = require("../connectToDB");
const { DataTypes, Model } = require("sequelize");

class User extends Model {
  static associate(models) {
    User.hasMany(models.User_profile, {
      foreignKey: "user_id",
      sourceKey: "user_id",
    });
    User.hasMany(models.User_socket, {
      foreignKey: "user_id",
      sourceKey: "user_id",
    });
    User.hasMany(models.User_tag, {
      foreignKey: "user_id",
      sourceKey: "user_id",
    });
    User.hasMany(models.Chatroom, {
      foreignKey: "user_id",
      sourceKey: "user_id",
    });
  }
}

User.init(
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
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE(6),
      defaultValue: DataTypes.NOW,
      allowNull: false,
      onUpdate: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "user",
    timestamps: false, // If you want to manage created_at and updated_at manually
  }
);

module.exports = User;
