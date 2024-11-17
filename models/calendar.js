const { Model, DataTypes } = require("sequelize");

class Calendar extends Model {
  static init(sequelize) {
    super.init(
      {
        calendar_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
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
        tableName: "calendar",
        timestamps: false,
      },
    );
  }

  static associate(models) {
    models.Calendar.hasMany(models.CalendarEvent, {
      foreignKey: "calendar_id",
    });
    models.Calendar.hasMany(models.MeetroomCalendar, {
      foreignKey: "calendar_id",
    });
    models.Calendar.hasMany(models.UserCalendar, { foreignKey: "calendar_id" });
  }
}

module.exports = Calendar;
