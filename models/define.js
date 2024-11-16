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
      }
    );
  }

  static associate(models) {
    Area.hasMany(models.Meetroom, { foreignKey: "area_id" });
  }
}

class Badge extends Model {
  static init(sequelize) {
    super.init(
      {
        badge_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING(100),
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
        tableName: "badge",
        timestamps: false,
      }
    );
  }

  static associate(models) {
    Badge.hasMany(models.UserBadge, { foreignKey: "badge_id" });
  }
}

class Calendar extends Model {
  static init(sequelize) {
    super.init(
      {
        calendar_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
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
        tableName: "calendar",
        timestamps: false,
      }
    );
  }

  static associate(models) {
    Calendar.hasMany(models.CalendarEvent, { foreignKey: "calendar_id" });
    Calendar.hasMany(models.MeetroomCalendar, { foreignKey: "calendar_id" });
    Calendar.hasMany(models.UserCalendar, { foreignKey: "calendar_id" });
  }
}

class CalendarEvent extends Model {
  static init(sequelize) {
    super.init(
      {
        calendar_event_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        calendar_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING(512),
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING(2048),
          allowNull: true,
        },
        location: {
          type: DataTypes.STRING(512),
          allowNull: true,
        },
        starts_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        ends_at: {
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
        tableName: "calendar_event",
        timestamps: false,
      }
    );
  }

  static associate(models) {
    CalendarEvent.belongsTo(models.Calendar, { foreignKey: "calendar_id" });
  }
}

class Chatroom extends Model {
  static init(sequelize) {
    super.init(
      {
        chatroom_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        status: {
          type: DataTypes.STRING(100),
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
        tableName: "chatroom",
        timestamps: false,
      }
    );
  }

  static associate(models) {
    Chatroom.hasMany(models.Message, { foreignKey: "chatroom_id" });
    Chatroom.hasMany(models.UserChatroom, { foreignKey: "chatroom_id" });
  }
}

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
      }
    );
  }

  static associate(models) {
    Contest.hasMany(models.UserContest, { foreignKey: "contest_id" });
  }
}

class Meetroom extends Model {
  static init(sequelize) {
    super.init(
      {
        meetroom_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        area_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        expires_at: {
          type: DataTypes.DATE(6),
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
        tableName: "meetroom",
        timestamps: false,
      }
    );
  }

  static associate(models) {
    Meetroom.belongsTo(models.Area, { foreignKey: "area_id" });
    Meetroom.hasMany(models.MeetroomCalendar, { foreignKey: "meetroom_id" });
    Meetroom.hasMany(models.UserMeetroom, { foreignKey: "meetroom_id" });
  }
}

class MeetroomCalendar extends Model {
  static init(sequelize) {
    super.init(
      {
        meetroom_calendar_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        meetroom_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        calendar_id: {
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
        tableName: "meetroom_calendar",
        timestamps: false,
      }
    );
  }

  static associate(models) {
    MeetroomCalendar.belongsTo(models.Meetroom, { foreignKey: "meetroom_id" });
    MeetroomCalendar.belongsTo(models.Calendar, { foreignKey: "calendar_id" });
  }
}

class Spec extends Model {
  static init(sequelize) {
    super.init(
      {
        spec_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        type: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        verify_domain: {
          type: DataTypes.STRING(100),
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
        tableName: "spec",
        timestamps: false,
      }
    );
  }

  static associate(models) {
    Spec.hasMany(models.UserSpec, { foreignKey: "spec_id" });
  }
}

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
      }
    );
  }

  static associate(models) {
    Tag.hasMany(models.UserTag, { foreignKey: "tag_id" });
  }
}

class Term extends Model {
  static init(sequelize) {
    super.init(
      {
        term_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING(1024),
          allowNull: false,
        },
        content: {
          type: DataTypes.STRING(4096),
          allowNull: false,
        },
        is_required: {
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
        tableName: "term",
        timestamps: false,
      }
    );
  }

  static associate(models) {
    Term.hasMany(models.UserTerm, { foreignKey: "term_id" });
  }
}

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
      }
    );
  }

  static associate(models) {
    User.hasMany(models.Inquiry, { foreignKey: "user_id" });
    User.hasMany(models.Message, { foreignKey: "user_id" });
    User.hasMany(models.MessageUser, { foreignKey: "checked_user_id" });
    User.hasMany(models.UserBadge, { foreignKey: "user_id" });
    User.hasMany(models.UserBlocked, {
      foreignKey: "user_id",
      as: "BlockedUsers",
    });
    User.hasMany(models.UserBlocked, {
      foreignKey: "opponent_id",
      as: "BlockedByUsers",
    });
    User.hasMany(models.UserCalendar, { foreignKey: "user_id" });
    User.hasMany(models.UserChatroom, { foreignKey: "user_id" });
    User.hasMany(models.UserContest, { foreignKey: "user_id" });
    User.hasMany(models.UserMeetroom, { foreignKey: "user_id" });
    User.hasMany(models.UserOAuth, { foreignKey: "user_id" });
    User.hasOne(models.UserProfile, { foreignKey: "user_id" });
    User.hasMany(models.UserRefreshToken, { foreignKey: "user_id" });
    User.hasMany(models.UserSocket, { foreignKey: "user_id" });
    User.hasMany(models.UserSpec, { foreignKey: "user_id" });
    User.hasMany(models.UserTag, { foreignKey: "user_id" });
    User.hasMany(models.UserTerm, { foreignKey: "user_id" });
    User.hasMany(models.UserToken, { foreignKey: "user_id" });
    User.hasMany(models.UserUsageTime, { foreignKey: "user_id" });
  }
}

class Inquiry extends Model {
  static init(sequelize) {
    super.init(
      {
        inquiry_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        title: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        content: {
          type: DataTypes.STRING(4096),
          allowNull: false,
        },
        photo_url_1: {
          type: DataTypes.STRING(1024),
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
        tableName: "inquiry",
        timestamps: false,
      }
    );
  }

  static associate(models) {
    Inquiry.belongsTo(models.User, { foreignKey: "user_id" });
  }
}

class Message extends Model {
  static init(sequelize) {
    super.init(
      {
        message_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        chatroom_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        type: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        text: {
          type: DataTypes.STRING(4096),
          allowNull: true,
        },
        image_url: {
          type: DataTypes.STRING(1024),
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
        tableName: "message",
        timestamps: false,
      }
    );
  }

  static associate(models) {
    Message.belongsTo(models.Chatroom, { foreignKey: "chatroom_id" });
    Message.belongsTo(models.User, { foreignKey: "user_id" });
    Message.hasMany(models.MessageUser, { foreignKey: "message_id" });
  }
}

class MessageUser extends Model {
  static init(sequelize) {
    super.init(
      {
        message_user_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        message_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        checked_user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        checked_at: {
          type: DataTypes.DATE(6),
          defaultValue: DataTypes.NOW,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "message_user",
        timestamps: false,
      }
    );
  }

  static associate(models) {
    MessageUser.belongsTo(models.Message, { foreignKey: "message_id" });
    MessageUser.belongsTo(models.User, { foreignKey: "checked_user_id" });
  }
}

class UserBadge extends Model {
  static init(sequelize) {
    super.init(
      {
        user_badge_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        badge_id: {
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
        tableName: "user_badge",
        timestamps: false,
      }
    );
  }

  static associate(models) {
    UserBadge.belongsTo(models.User, { foreignKey: "user_id" });
    UserBadge.belongsTo(models.Badge, { foreignKey: "badge_id" });
  }
}

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
      }
    );
  }

  static associate(models) {
    UserBlocked.belongsTo(models.User, { foreignKey: "user_id", as: "User" });
    UserBlocked.belongsTo(models.User, {
      foreignKey: "opponent_id",
      as: "Opponent",
    });
  }
}

class UserCalendar extends Model {
  static init(sequelize) {
    super.init(
      {
        user_calendar_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        calendar_id: {
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
        tableName: "user_calendar",
        timestamps: false,
      }
    );
  }

  static associate(models) {
    UserCalendar.belongsTo(models.User, { foreignKey: "user_id" });
    UserCalendar.belongsTo(models.Calendar, { foreignKey: "calendar_id" });
  }
}

class UserChatroom extends Model {
  static init(sequelize) {
    super.init(
      {
        user_chatroom_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        chatroom_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        user_status: {
          type: DataTypes.STRING(30),
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
        tableName: "user_chatroom",
        timestamps: false,
      }
    );
  }

  static associate(models) {
    UserChatroom.belongsTo(models.User, { foreignKey: "user_id" });
    UserChatroom.belongsTo(models.Chatroom, { foreignKey: "chatroom_id" });
  }
}

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
      }
    );
  }

  static associate(models) {
    UserContest.belongsTo(models.User, { foreignKey: "user_id" });
    UserContest.belongsTo(models.Contest, { foreignKey: "contest_id" });
  }
}

class UserMeetroom extends Model {
  static init(sequelize) {
    super.init(
      {
        user_meetroom_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        meetroom_id: {
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
        tableName: "user_meetroom",
        timestamps: false,
      }
    );
  }

  static associate(models) {
    UserMeetroom.belongsTo(models.User, { foreignKey: "user_id" });
    UserMeetroom.belongsTo(models.Meetroom, { foreignKey: "meetroom_id" });
  }
}

class UserOAuth extends Model {
  static init(sequelize) {
    super.init(
      {
        user_oauth_key: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        oauth_type: {
          type: DataTypes.STRING(128),
          allowNull: false,
        },
        oauth_id: {
          type: DataTypes.STRING(1024),
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
        tableName: "user_oauth",
        timestamps: false,
      }
    );
  }

  static associate(models) {
    UserOAuth.belongsTo(models.User, { foreignKey: "user_id" });
  }
}

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
      }
    );
  }

  static associate(models) {
    UserProfile.belongsTo(models.User, { foreignKey: "user_id" });
  }
}

class UserRefreshToken extends Model {
  static init(sequelize) {
    super.init(
      {
        user_refresh_token_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        token: {
          type: DataTypes.STRING(300),
          allowNull: false,
        },
        user_valid: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
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
        tableName: "user_refresh_token",
        timestamps: false,
      }
    );
  }

  static associate(models) {
    UserRefreshToken.belongsTo(models.User, { foreignKey: "user_id" });
  }
}

class UserSocket extends Model {
  static init(sequelize) {
    super.init(
      {
        user_socket_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        socket_id: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        status: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "user_socket",
        timestamps: false,
      }
    );
  }

  static associate(models) {
    UserSocket.belongsTo(models.User, { foreignKey: "user_id" });
  }
}

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
      }
    );
  }

  static associate(models) {
    UserSpec.belongsTo(models.User, { foreignKey: "user_id" });
    UserSpec.belongsTo(models.Spec, { foreignKey: "spec_id" });
  }
}

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
      }
    );
  }

  static associate(models) {
    UserTag.belongsTo(models.User, { foreignKey: "user_id" });
    UserTag.belongsTo(models.Tag, { foreignKey: "tag_id" });
  }
}

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
      }
    );
  }

  static associate(models) {
    UserTerm.belongsTo(models.User, { foreignKey: "user_id" });
    UserTerm.belongsTo(models.Term, { foreignKey: "term_id" });
  }
}

class UserToken extends Model {
  static init(sequelize) {
    super.init(
      {
        user_token_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        token: {
          type: DataTypes.STRING(64),
          allowNull: false,
        },
        type: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        created_at: {
          type: DataTypes.DATE(6),
          defaultValue: DataTypes.NOW,
          allowNull: false,
        },
        expires_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "user_token",
        timestamps: false,
      }
    );
  }

  static associate(models) {
    UserToken.belongsTo(models.User, { foreignKey: "user_id" });
  }
}

class UserUsageTime extends Model {
  static init(sequelize) {
    super.init(
      {
        user_usage_time_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        type: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        time: {
          type: DataTypes.DATE(6),
          defaultValue: DataTypes.NOW,
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
        tableName: "user_usage_time",
        timestamps: false,
      }
    );
  }

  static associate(models) {
    UserUsageTime.belongsTo(models.User, { foreignKey: "user_id" });
  }
}

module.exports = {
  Area,
  Badge,
  Calendar,
  CalendarEvent,
  Chatroom,
  Contest,
  Meetroom,
  MeetroomCalendar,
  Spec,
  Tag,
  Term,
  User,
  Inquiry,
  Message,
  MessageUser,
  UserBadge,
  UserBlocked,
  UserCalendar,
  UserChatroom,
  UserContest,
  UserMeetroom,
  UserOAuth,
  UserProfile,
  UserRefreshToken,
  UserSocket,
  UserSpec,
  UserTag,
  UserTerm,
  UserToken,
  UserUsageTime,
};
