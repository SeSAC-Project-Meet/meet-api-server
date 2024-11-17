const { Model, DataTypes } = require("sequelize");

class UserUsageTime extends Model {
  static init(sequelize) {
    super.init(
      {
        user_usage_time_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        type: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        time: {
          type: DataTypes.DATE(6),
          defaultValue: DataTypes.NOW,
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
        tableName: "user_usage_time",
        timestamps: false,
      },
    );
  }

  static associate(models) {
    models.UserUsageTime.belongsTo(models.User, { foreignKey: "user_id" });
  }
}

module.exports = UserUsageTime;
