const Sequelize = require("sequelize");

class Inquiry extends Sequelize.Model {
  static initiate(sequelize) {
    Inquiry.init(
      {
        inquiry_id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          type: Sequelize.STRING(100), // 4 bytes * 100
          allowNull: false,
        },
        content: {
          type: Sequelize.STRING(4096), // 4 bytes * 4096
          allowNull: false,
        },
        photo_url_1: {
          type: Sequelize.STRING(1024), // 4 bytes * 1024
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE(6),
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(6)"),
          // type: Sequelize.DATE,
          // defaultValue: Sequelize.NOW,
        },
        updated_at: {
          type: Sequelize.DATE(6),
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(6)"),
        }, // TODO : 필요 없는 컬럼?
        // read_at: {
        //   type: Sequelize.DATE(6),
        //   allowNull: true,
        // }, // TODO : 구현 예정
        // answered_at: {
        //   type: Sequelize.DATE(6),
        //   allowNull: true,
        // }, // TODO : 구현 예정
        // user_id: {
        //   type: Sequelize.INTEGER,
        //   allowNull: false,
        // }
        // 모델 정의에 넣어도 되지만, 시퀄라이즈 자체에서 관계를 따로 정의할 수 있다.
      },
      {
        sequelize,
        timestamps: false,
        modelName: "Inquiry",
        tableName: "inquiry",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // utf8mb4_0900_ai_ci ?
      }
    );
  }

  static associate(db) {
    db.User.belongsTo(db.User, {
      // foreignKey: "",
      targetKey: "user_id",
    });
  }
}

module.exports = Inquiry;
