const { Model, DataTypes } = require("sequelize");

class Badge extends Model {
  static init(sequelize) {
    super.init(
      {
        badge_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING(100),
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
        tableName: "badge",
        timestamps: false,
      },
    );
  }

  static associate(models) {
    models.Badge.hasMany(models.UserBadge, { foreignKey: "badge_id" });
  }
}

module.exports = Badge;
