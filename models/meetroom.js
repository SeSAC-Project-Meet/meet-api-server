const { Model, DataTypes } = require("sequelize");

class Meetroom extends Model {
  static init(sequelize) {
    super.init(
      {
        meetroom_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        area_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        expires_at: {
          type: DataTypes.DATE(6),
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
        tableName: "meetroom",
        timestamps: false,
      },
    );
  }

  static associate(models) {
    models.Meetroom.belongsTo(models.Area, { foreignKey: "area_id" });
    models.Meetroom.hasMany(models.MeetroomCalendar, {
      foreignKey: "meetroom_id",
    });
    models.Meetroom.hasMany(models.UserMeetroom, { foreignKey: "meetroom_id" });
  }
}

module.exports = Meetroom;
