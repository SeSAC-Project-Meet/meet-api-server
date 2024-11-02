const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('message_user', {
    message_user_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    message_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'message',
        key: 'message_id'
      }
    },
    checked_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id'
      }
    },
    checked_at: {
      type: DataTypes.DATE(6),
      allowNull: false,
      defaultValue: "CURRENT_TIMESTAMP(6)"
    }
  }, {
    sequelize,
    tableName: 'message_user',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "message_user_id" },
        ]
      },
      {
        name: "fk_message_user_checked_user",
        using: "BTREE",
        fields: [
          { name: "checked_user_id" },
        ]
      },
      {
        name: "fk_message_user_message",
        using: "BTREE",
        fields: [
          { name: "message_id" },
        ]
      },
    ]
  });
};
