const sequelize = require("./connectToDB");
const { DataTypes } = require("sequelize");

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

/**
 * Defines the User model with the following fields:
 *
 * @typedef {Object} User
 * @property {number} user_id - The unique identifier for the user. Auto-incremented primary key.

 * @property {Date} created_at - The date and time when the user was created. Defaults to the current date and time.
 * @property {Date} updated_at - The date and time when the user was last updated. Defaults to the current date and time.
 * @property {string} name - The name of the user. Maximum length of 30 characters.
 * @property {string} nickname - The nickname of the user. Maximum length of 15 characters.
 * @property {Date} birthdate - The birthdate of the user. Stored as a date only.
 * @property {string} email - The email address of the user. Maximum length of 200 characters.
 * @property {string} phone_number - The phone number of the user. Maximum length of 30 characters.
 *
 * @param {import('sequelize').Sequelize} sequelize - The Sequelize instance.
 * @param {import('sequelize').DataTypes} DataTypes - The Sequelize DataTypes.
 * @returns {import('sequelize').Model} The User model.
 */
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
      type: DataTypes.STRING(30),
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
    password: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  },
  {
    tableName: "user", // 사용할 테이블 이름
    timestamps: false, // createdAt, updatedAt 필드 자동 생성 비활성화
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
