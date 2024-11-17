const { Model, DataTypes } = require("sequelize");

class UserTerm extends Model {
  static init(sequelize) {
    super.init(
      {
        user_term_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        term_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        agreement: {
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
        tableName: "user_term",
        timestamps: false,
      },
    );
  }

  static associate(models) {
    models.UserTerm.belongsTo(models.User, { foreignKey: "user_id" });
    models.UserTerm.belongsTo(models.Term, { foreignKey: "term_id" });
  }
}

module.exports = UserTerm;
