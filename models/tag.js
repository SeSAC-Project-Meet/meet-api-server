const { Model, DataTypes } = require("sequelize");

class Tag extends Model {
  static init(sequelize) {
    super.init(
      {
        tag_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        type: {
          type: DataTypes.STRING(100),
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
        tableName: "tag",
        timestamps: false,
      },
    );
  }

  static associate(models) {
    models.Tag.hasMany(models.UserTag, { foreignKey: "tag_id" });
  }
}

module.exports = Tag;
