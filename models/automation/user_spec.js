const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_spec', {
    user_spec_id: {
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
    spec_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'spec',
        key: 'spec_id'
      }
    }
  }, {
    sequelize,
    tableName: 'user_spec',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_spec_id" },
        ]
      },
      {
        name: "fk_user_spec_spec",
        using: "BTREE",
        fields: [
          { name: "spec_id" },
        ]
      },
      {
        name: "fk_user_spec_user",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
