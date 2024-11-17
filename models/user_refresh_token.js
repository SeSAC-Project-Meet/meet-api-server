const { Model, DataTypes } = require("sequelize");

class UserRefreshToken extends Model {
  static init(sequelize) {
    super.init(
      {
        user_refresh_token_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        token: {
          type: DataTypes.STRING(300),
          allowNull: false,
        },
        user_valid: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
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
        },
      },
      {
        sequelize,
        tableName: "user_refresh_token",
        timestamps: false,
      },
    );
  }

  static associate(models) {
    models.UserRefreshToken.belongsTo(models.User, { foreignKey: "user_id" });
  }
}

module.exports = UserRefreshToken;
