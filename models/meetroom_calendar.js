const { Model, DataTypes } = require("sequelize");

class MeetroomCalendar extends Model {
  static init(sequelize) {
    super.init(
      {
        meetroom_calendar_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        meetroom_id: {
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
        tableName: "meetroom_calendar",
        timestamps: false,
      },
    );
  }

  static associate(models) {
    models.MeetroomCalendar.belongsTo(models.Meetroom, {
      foreignKey: "meetroom_id",
    });
    models.MeetroomCalendar.belongsTo(models.Calendar, {
      foreignKey: "calendar_id",
    });
  }
}

module.exports = MeetroomCalendar;
