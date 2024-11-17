const { Model, DataTypes } = require("sequelize");

class CalendarEvent extends Model {
  static init(sequelize) {
    super.init(
      {
        calendar_event_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        calendar_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING(512),
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING(2048),
          allowNull: true,
        },
        location: {
          type: DataTypes.STRING(512),
          allowNull: true,
        },
        starts_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        ends_at: {
          type: DataTypes.DATE,
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
        tableName: "calendar_event",
        timestamps: false,
      },
    );
  }

  static associate(models) {
    models.CalendarEvent.belongsTo(models.Calendar, {
      foreignKey: "calendar_id",
    });
  }
}

module.exports = CalendarEvent;
