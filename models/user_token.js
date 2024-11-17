const { Model, DataTypes } = require("sequelize");

class UserToken extends Model {
  static init(sequelize) {
    super.init(
      {
        user_token_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        token: {
          type: DataTypes.STRING(64),
          allowNull: false,
        },
        type: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        created_at: {
          type: DataTypes.DATE(6),
          defaultValue: DataTypes.NOW,
          allowNull: false,
        },
        expires_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "user_token",
        timestamps: false,
      },
    );
  }

  static associate(models) {
    models.UserToken.belongsTo(models.User, { foreignKey: "user_id" });
  }
}

module.exports = UserToken;
