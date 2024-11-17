const { Model, DataTypes } = require("sequelize");

class UserChatroom extends Model {
  static init(sequelize) {
    super.init(
      {
        user_chatroom_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        chatroom_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        user_status: {
          type: DataTypes.STRING(30),
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
        tableName: "user_chatroom",
        timestamps: false,
      },
    );
  }

  static associate(models) {
    models.UserChatroom.belongsTo(models.User, { foreignKey: "user_id" });
    models.UserChatroom.belongsTo(models.Chatroom, {
      foreignKey: "chatroom_id",
    });
  }
}

module.exports = UserChatroom;
