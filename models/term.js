const { Model, DataTypes } = require("sequelize");

class Term extends Model {
  static init(sequelize) {
    super.init(
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
        tableName: "term",
        timestamps: false,
      },
    );
  }

  static associate(models) {
    models.Term.hasMany(models.UserTerm, { foreignKey: "term_id" });
  }
}

module.exports = Term;
