const { Model, DataTypes } = require("sequelize");

class UserOAuth extends Model {
  static init(sequelize) {
    super.init(
      {
        user_oauth_key: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        oauth_type: {
          type: DataTypes.STRING(128),
          allowNull: false,
        },
        oauth_id: {
          type: DataTypes.STRING(1024),
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
        tableName: "user_oauth",
        timestamps: false,
      },
    );
  }

  static associate(models) {
    models.UserOAuth.belongsTo(models.User, { foreignKey: "user_id" });
  }
}

module.exports = UserOAuth;
