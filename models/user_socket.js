const { DataTypes, Model } = require("sequelize");
const sequelize = require("./index");

class UserSocket extends Model {}

UserSocket.init(
  {
    user_socket_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    socket_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "UserSocket",
    tableName: "user_socket",
    timestamps: false,
  },
);

module.exports = UserSocket;
