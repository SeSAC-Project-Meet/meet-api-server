const { Model, DataTypes } = require("sequelize");

class Message extends Model {
  static init(sequelize) {
    super.init(
      {
        message_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        chatroom_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        type: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        text: {
          type: DataTypes.STRING(4096),
          allowNull: true,
        },
        image_url: {
          type: DataTypes.STRING(1024),
          allowNull: true,
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
        tableName: "message",
        timestamps: false,
      },
    );
  }

  static associate(models) {
    models.Message.belongsTo(models.Chatroom, { foreignKey: "chatroom_id" });
    models.Message.belongsTo(models.User, { foreignKey: "user_id" });
    models.Message.hasMany(models.MessageUser, { foreignKey: "message_id" });
  }
}

module.exports = Message;
