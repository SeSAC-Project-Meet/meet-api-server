const { DataTypes, Sequelize, Model } = require("sequelize");
const sequelize = require("./index");

class Term extends Model {}

Term.init(
  {
    term_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(1024),
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(4096),
      allowNull: false,
    },
    is_required: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE(6),
      defaultValue: Sequelize.fn("CURRENT_TIMESTAMP", 6),
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE(6),
      defaultValue: Sequelize.fn("CURRENT_TIMESTAMP", 6),
      allowNull: false,
      onUpdate: Sequelize.fn("CURRENT_TIMESTAMP", 6),
    },
  },
  {
    sequelize,
    modelName: "Term",
    tableName: "term",
    timestamps: false,
  },
);

module.exports = Term;
