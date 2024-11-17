const { Model, DataTypes } = require("sequelize");

class UserTag extends Model {
  static init(sequelize) {
    super.init(
      {
        user_tag_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        tag_id: {
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
        tableName: "user_tag",
        timestamps: false,
      },
    );
  }

  static associate(models) {
    models.UserTag.belongsTo(models.User, { foreignKey: "user_id" });
    models.UserTag.belongsTo(models.Tag, { foreignKey: "tag_id" });
  }
}

module.exports = UserTag;
