const { Model, DataTypes } = require("sequelize");

class UserBadge extends Model {
  static init(sequelize) {
    super.init(
      {
        user_badge_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        badge_id: {
          type: DataTypes.INTEGER,
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
        tableName: "user_badge",
        timestamps: false,
      },
    );
  }

  static associate(models) {
    models.UserBadge.belongsTo(models.User, { foreignKey: "user_id" });
    models.UserBadge.belongsTo(models.Badge, { foreignKey: "badge_id" });
  }
}

module.exports = UserBadge;
