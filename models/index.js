const { Sequelize } = require("sequelize");

const config = require("../config.json");
const logger = require("../logger");
const dbConfig = config["development"];
// const dbConfig = require("../config.json")["development local db"]; // 로컬 DB 사용 시
const {
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
} = require("./main");

// Sequelize 인스턴스 생성
const sequelize = new Sequelize(
  "project_meet",
  dbConfig.MYSQL_USER,
  dbConfig.MYSQL_PASSWORD,
  {
    host: dbConfig.MYSQL_HOST,
    port: dbConfig.MYSQL_PORT,
    dialect: "mysql",
    logging: (msg) => logger.info(`[Sequelize Log]: ${msg}`),
    timezone: "+09:00",
    pool: {
      max: 10, // 최대 연결 수
      min: 0, // 최소 연결 수
      acquire: 30000, // 연결을 가져오는 최대 시간 (ms)
      idle: 10000, // 연결이 유휴 상태일 때 종료되기까지의 시간 (ms)
    },
  }
);

// 모델 간 관계 설정 (모든 모델을 associate에 전달)
const models = {
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

// 모델 초기화
for (const model of Object.values(models)) {
  model.init(sequelize);
}

// 모델 간 관계 설정
for (const model of Object.values(models)) {
  if (typeof model.associate === "function") {
    model.associate(models);
  }
}

const db = {
  sequelize, // sequelize 객체
  ...models, // 초기화된 모든 모델
};

module.exports = db;
