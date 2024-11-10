/*
create table project_meet.user_refresh_token
(
    user_refresh_token_id int auto_increment
        primary key,
    user_id               int                                       not null,
    token                 varchar(300)                              not null,
    user_valid            tinyint(1)   default 1                    not null,
    created_at            timestamp(6) default CURRENT_TIMESTAMP(6) not null,
    updated_at            timestamp(6) default CURRENT_TIMESTAMP(6) not null on update CURRENT_TIMESTAMP(6),
    constraint user_refresh_token_user_user_id_fk
        foreign key (user_id) references project_meet.user (user_id)
);


*/

const { DataTypes, Model } = require("sequelize");
const sequelize = require("../connectToDB");

class User_refresh_token extends Model {}

User_refresh_token.init(
  {
    user_refresh_token_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
      defaultValue: sequelize.fn("CURRENT_TIMESTAMP", 6),
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE(6),
      defaultValue: sequelize.fn("CURRENT_TIMESTAMP", 6),
      allowNull: false,
      onUpdate: sequelize.fn("CURRENT_TIMESTAMP", 6),
    },
  },
  {
    sequelize,
    modelName: "User_refresh_token",
    tableName: "user_refresh_token",
    timestamps: false,
  }
);

module.exports = User_refresh_token;
