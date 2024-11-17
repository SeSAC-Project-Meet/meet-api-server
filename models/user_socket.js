const { Model, DataTypes } = require("sequelize");

class UserSocket extends Model {
  static init(sequelize) {
    super.init(
      {
        user_socket_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
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
        tableName: "user_socket",
        timestamps: false,
      },
    );
  }

  static associate(models) {
    models.UserSocket.belongsTo(models.User, { foreignKey: "user_id" });
  }
}

module.exports = UserSocket;
