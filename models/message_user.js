const { Model, DataTypes } = require("sequelize");

class MessageUser extends Model {
  static init(sequelize) {
    super.init(
      {
        message_user_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        message_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        checked_user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        checked_at: {
          type: DataTypes.DATE(6),
          defaultValue: DataTypes.NOW,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "message_user",
        timestamps: false,
      },
    );
  }

  static associate(models) {
    models.MessageUser.belongsTo(models.Message, { foreignKey: "message_id" });
    models.MessageUser.belongsTo(models.User, {
      foreignKey: "checked_user_id",
    });
  }
}

module.exports = MessageUser;
