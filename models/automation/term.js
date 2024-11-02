const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('term', {
    term_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(1024),
      allowNull: false
    },
    content: {
      type: DataTypes.STRING(4096),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'term',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "term_id" },
        ]
      },
    ]
  });
};
