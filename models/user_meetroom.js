const { Model, DataTypes } = require("sequelize");

class UserMeetroom extends Model {
  static init(sequelize) {
    super.init(
      {
        user_meetroom_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        meetroom_id: {
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
        tableName: "user_meetroom",
        timestamps: false,
      },
    );
  }

  static associate(models) {
    models.UserMeetroom.belongsTo(models.User, { foreignKey: "user_id" });
    models.UserMeetroom.belongsTo(models.Meetroom, {
      foreignKey: "meetroom_id",
    });
  }
}

module.exports = UserMeetroom;
