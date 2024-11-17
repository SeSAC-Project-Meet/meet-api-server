const { Model, DataTypes } = require("sequelize");

class Contest extends Model {
  static init(sequelize) {
    super.init(
      {
        contest_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(300),
          allowNull: false,
        },
        short_description: {
          type: DataTypes.STRING(512),
          allowNull: true,
        },
        description: {
          type: DataTypes.STRING(4096),
          allowNull: false,
        },
        host: {
          type: DataTypes.STRING(512),
          allowNull: false,
        },
        place: {
          type: DataTypes.STRING(1024),
          allowNull: false,
        },
        participation_fee: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        starts_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        ends_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        application_starts_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        application_ends_at: {
          type: DataTypes.DATE,
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
        tableName: "contest",
        timestamps: false,
      },
    );
  }

  static associate(models) {
    models.Contest.hasMany(models.UserContest, { foreignKey: "contest_id" });
  }
}

module.exports = Contest;
