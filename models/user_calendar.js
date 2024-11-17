const { Model, DataTypes } = require("sequelize");

class UserCalendar extends Model {
  static init(sequelize) {
    super.init(
      {
        user_calendar_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        calendar_id: {
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
        tableName: "user_calendar",
        timestamps: false,
      },
    );
  }

  static associate(models) {
    models.UserCalendar.belongsTo(models.User, { foreignKey: "user_id" });
    models.UserCalendar.belongsTo(models.Calendar, {
      foreignKey: "calendar_id",
    });
  }
}

module.exports = UserCalendar;
