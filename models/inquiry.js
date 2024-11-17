const { Model, DataTypes } = require("sequelize");

class Inquiry extends Model {
  static init(sequelize) {
    super.init(
      // Inquiry.init() = super.init() 과 같은 역할
      {
        inquiry_id: {
          type: DataTypes.INTEGER, // Sequelize.INTEGER 로 대체 가능
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        title: {
          type: DataTypes.STRING(100), // 4 bytes * 100
          allowNull: false,
        },
        content: {
          type: DataTypes.STRING(4096), // 4 bytes * 4096
          allowNull: false,
        },
        photo_url_1: {
          type: DataTypes.STRING(1024), // 4 bytes * 1024
          allowNull: true,
        },
        created_at: {
          type: DataTypes.DATE(6),
          defaultValue: DataTypes.NOW,
          // defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(6)"),
          allowNull: false,
        },
        updated_at: {
          type: DataTypes.DATE(6),
          defaultValue: DataTypes.NOW,
          // defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(6)")
          allowNull: false,
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
        tableName: "inquiry",
        timestamps: false,
        // modelName: "Inquiry",
        // paranoid: false,
        // charset: "utf8mb4",
        // collate: "utf8mb4_general_ci", // utf8mb4_0900_ai_ci ?
      },
    );
  }

  static associate(models) {
    models.Inquiry.belongsTo(models.User, { foreignKey: "user_id" });
  }
}

module.exports = Inquiry;
