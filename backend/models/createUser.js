const sequelize = require("./connectToDB");

// 연결 테스트
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

// User 모델 정의
const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    created_at: {
      type: DataTypes.DATE(6),
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE(6),
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    name: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  },
  {
    tableName: "user", // 사용할 테이블 이름
    timestamps: false, // createdAt, updatedAt 필드 자동 생성 비활성화
  }
);

// 데이터베이스 동기화
async function syncDatabase() {
  try {
    await sequelize.sync({ force: true }); // force: true는 기존 테이블을 삭제하고 다시 생성
    console.log("Database & User table created!");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
}

// 사용자 등록 함수
async function registerUser(userData) {
  try {
    const user = await User.create(userData);
    console.log("User registered:", user.toJSON());
  } catch (error) {
    console.error("Error registering user:", error);
  }
}

// 사용 예시
syncDatabase().then(() => {
  registerUser({
    name: 1, // 예시로 정수값 사용
    nickname: "john_doe",
    birthdate: "1990-01-01",
    email: "john@example.com",
    phone_number: "123-456-7890",
  });
});
