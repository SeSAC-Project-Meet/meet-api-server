const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_meetroom', {
    user_meetroom_id: {
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
    meetroom_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'meetroom',
        key: 'meetroom_id'
      }
    }
  }, {
    sequelize,
    tableName: 'user_meetroom',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_meetroom_id" },
        ]
      },
      {
        name: "user_meetroom_user_user_id_fk",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "user_meetroom_meetroom_meetroom_id_fk",
        using: "BTREE",
        fields: [
          { name: "meetroom_id" },
        ]
      },
    ]
  });
};
