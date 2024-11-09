const { DataTypes, Model } = require("sequelize");
const sequelize = require("../connectToDB");

class User_socket extends Model {}

User_socket.init(
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
    modelName: "User_socket",
    tableName: "user_socket",
    timestamps: false,
  }
);

module.exports = User_socket;
