const { Model, DataTypes } = require("sequelize");

class UserBlocked extends Model {
  static init(sequelize) {
    super.init(
      {
        user_blocked_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        opponent_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        type: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        blocked_at: {
          type: DataTypes.DATE(6),
          defaultValue: DataTypes.NOW,
          allowNull: false,
        },
        unblocked_at: {
          type: DataTypes.DATE(6),
          allowNull: true,
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
        tableName: "user_blocked",
        timestamps: false,
      },
    );
  }

  static associate(models) {
    models.UserBlocked.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "User",
    });
    models.UserBlocked.belongsTo(models.User, {
      foreignKey: "opponent_id",
      as: "Opponent",
    });
  }
}

module.exports = UserBlocked;
