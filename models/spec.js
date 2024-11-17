const { Model, DataTypes } = require("sequelize");

class Spec extends Model {
  static init(sequelize) {
    super.init(
      {
        spec_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        type: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        verify_domain: {
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
        tableName: "spec",
        timestamps: false,
      },
    );
  }

  static associate(models) {
    models.Spec.hasMany(models.UserSpec, { foreignKey: "spec_id" });
  }
}

module.exports = Spec;
