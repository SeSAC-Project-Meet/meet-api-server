const { Model, DataTypes } = require("sequelize");

class Area extends Model {
  static init(sequelize) {
    super.init(
      {
        area_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING(300),
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
        tableName: "area",
        timestamps: false,
      },
    );
  }

  static associate(models) {
    models.Area.hasMany(models.Meetroom, { foreignKey: "area_id" });
  }
}

module.exports = Area;
