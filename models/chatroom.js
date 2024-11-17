const { Model, DataTypes } = require("sequelize");

class Chatroom extends Model {
  static init(sequelize) {
    super.init(
      {
        chatroom_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        status: {
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
        tableName: "chatroom",
        timestamps: false,
      },
    );
  }

  static associate(models) {
    models.Chatroom.hasMany(models.Message, { foreignKey: "chatroom_id" });
    models.Chatroom.hasMany(models.UserChatroom, { foreignKey: "chatroom_id" });
  }
}

module.exports = Chatroom;
