const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_badge', {
    user_badge_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id'
      }
    },
    badge_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'badge',
        key: 'badge_id'
      }
    }
  }, {
    sequelize,
    tableName: 'user_badge',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_badge_id" },
        ]
      },
      {
        name: "fk_user_badge_badge",
        using: "BTREE",
        fields: [
          { name: "badge_id" },
        ]
      },
      {
        name: "fk_user_badge_user",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
