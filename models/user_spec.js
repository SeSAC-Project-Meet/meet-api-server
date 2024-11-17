const { Model, DataTypes } = require("sequelize");

class UserSpec extends Model {
  static init(sequelize) {
    super.init(
      {
        user_spec_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        spec_id: {
          type: DataTypes.INTEGER,
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
        tableName: "user_spec",
        timestamps: false,
      },
    );
  }

  static associate(models) {
    models.UserSpec.belongsTo(models.User, { foreignKey: "user_id" });
    models.UserSpec.belongsTo(models.Spec, { foreignKey: "spec_id" });
  }
}

module.exports = UserSpec;
