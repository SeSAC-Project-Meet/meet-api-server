const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        username: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: true,
        },
        phone_number: {
          type: DataTypes.STRING(40),
          allowNull: false,
          unique: true,
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
        tableName: "user",
        timestamps: false,
      },
    );
  }

  static associate(models) {
    models.User.hasMany(models.Inquiry, { foreignKey: "user_id" });
    models.User.hasMany(models.Message, { foreignKey: "user_id" });
    models.User.hasMany(models.MessageUser, { foreignKey: "checked_user_id" });
    models.User.hasMany(models.UserBadge, { foreignKey: "user_id" });
    models.User.hasMany(models.UserBlocked, {
      foreignKey: "user_id",
      as: "BlockedUsers",
    });
    models.User.hasMany(models.UserBlocked, {
      foreignKey: "opponent_id",
      as: "BlockedByUsers",
    });
    models.User.hasMany(models.UserCalendar, { foreignKey: "user_id" });
    models.User.hasMany(models.UserChatroom, { foreignKey: "user_id" });
    models.User.hasMany(models.UserContest, { foreignKey: "user_id" });
    models.User.hasMany(models.UserMeetroom, { foreignKey: "user_id" });
    models.User.hasMany(models.UserOAuth, { foreignKey: "user_id" });
    models.User.hasOne(models.UserProfile, { foreignKey: "user_id" });
    models.User.hasMany(models.UserRefreshToken, { foreignKey: "user_id" });
    models.User.hasMany(models.UserSocket, { foreignKey: "user_id" });
    models.User.hasMany(models.UserSpec, { foreignKey: "user_id" });
    models.User.hasMany(models.UserTag, { foreignKey: "user_id" });
    models.User.hasMany(models.UserTerm, { foreignKey: "user_id" });
    models.User.hasMany(models.UserToken, { foreignKey: "user_id" });
    models.User.hasMany(models.UserUsageTime, { foreignKey: "user_id" });
  }
}

module.exports = User;
