const sequelize = require("./connectToDB");
const { DataTypes, Sequelize } = require("sequelize");

/**
 * Tests the connection to the database.
 * @async
 * @function testConnection
 * @returns {Promise<void>} Resolves if the connection is successful, otherwise logs an error.
 */
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
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
    },
    created_at: {
      type: DataTypes.DATE(6),
      defaultValue: Sequelize.fn("CURRENT_TIMESTAMP", 6),
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE(6),
      defaultValue: Sequelize.fn("CURRENT_TIMESTAMP", 6),
      allowNull: false,
      onUpdate: Sequelize.fn("CURRENT_TIMESTAMP", 6),
    },
  },
  {
    tableName: "user",
    timestamps: false, // If you want to manage created_at and updated_at manually
  }
);

/**
 * Synchronizes the database and creates the User table.
 * @async
 * @function syncDatabase
 * @returns {Promise<void>} Resolves if the synchronization is successful, otherwise logs an error.
 */
async function syncDatabase() {
  try {
    await sequelize.sync({ force: true }); // 프로덕션 환경에서는 사용하면 안됨
    // force: true는 기존 테이블을 삭제하고 다시 생성
    // alter: true는 변경된 내용만 반영
    console.log("Database & User table created!");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
}

/**
 * Registers a new user in the database.
 * @async
 * @function registerUser
 * @param {Object} userData - The data of the user to be registered.
 * @param {string} userData.name - The name of the user.
 * @param {string} userData.nickname - The nickname of the user.
 * @param {string} userData.birthdate - The birthdate of the user in YYYY-MM-DD format.
 * @param {string} userData.email - The email address of the user.
 * @param {string} userData.phone_number - The phone number of the user.
 * @returns {Promise<void>} Resolves if the user is successfully registered, otherwise logs an error.
 */
async function registerUser(userData) {
  try {
    // 기존 유저가 존재하는지 확인 : 핸드폰 번호 기준
    const existingUser = await User.findOne({
      where: { phone_number: userData.phone_number },
    });

    if (existingUser) {
      console.log("User already exists with this email:", userData.email);
      return { status: 409, message: "User already exists with this email" };
    }

    // 유저가 존재하지 않으면 새 유저 생성
    const user = await User.create(userData);
    console.log("User registered:", user.toJSON());
    return { status: 201, message: "User registered successfully" };
  } catch (error) {
    console.error("Error registering user:", error);
    return { status: 500, message: "Error registering user" };
  }
}

module.exports = { User, testConnection, syncDatabase, registerUser };

/*
샘플 코드 ,, 
Schema 변경이 있지 않은 한 syncDatabase는 사용하지 않는 것이 좋습니다.
syncDatabase().then(() => {
  registerUser({
    name: "John Doe",
    nickname: "johnny",
    birthdate: "1990-01-01",
    email: "john@example.com",
    phone_number: "123-456-7890",
  });
});

*/
