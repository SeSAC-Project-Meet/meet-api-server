const { Model, DataTypes } = require("sequelize");

class UserProfile extends Model {
  static init(sequelize) {
    super.init(
      {
        user_profile_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        profile_image: {
          type: DataTypes.STRING(2048),
          allowNull: true,
        },
        experience_point: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
          allowNull: false,
        },
        nickname: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        introduction: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "user_profile",
        timestamps: false,
      },
    );
  }

  static associate(models) {
    models.UserProfile.belongsTo(models.User, { foreignKey: "user_id" });
  }
}

module.exports = UserProfile;
