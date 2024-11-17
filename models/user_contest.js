const { Model, DataTypes } = require("sequelize");

class UserContest extends Model {
  static init(sequelize) {
    super.init(
      {
        user_contest_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        contest_id: {
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
        tableName: "user_contest",
        timestamps: false,
      },
    );
  }

  static associate(models) {
    models.UserContest.belongsTo(models.User, { foreignKey: "user_id" });
    models.UserContest.belongsTo(models.Contest, { foreignKey: "contest_id" });
  }
}

module.exports = UserContest;
