/*
create table project_meet.user_chatroom
(
    user_chatroom_id int auto_increment
        primary key,
    user_id          int                                       null,
    chatroom_id      int                                       not null,
    user_status      varchar(30)                               not null,
    created_at       timestamp(6) default CURRENT_TIMESTAMP(6) not null,
    updated_at       timestamp(6) default CURRENT_TIMESTAMP(6) not null on update CURRENT_TIMESTAMP(6),
    constraint fk_user_chatroom_chatroom
        foreign key (chatroom_id) references project_meet.chatroom (chatroom_id),
    constraint fk_user_chatroom_user
        foreign key (user_id) references project_meet.user (user_id)
);


*/

const { DataTypes } = require("sequelize");
const sequelize = require("../connectToDB");

const User_chatroom = sequelize.define(
  "user_chatroom",
  {
    user_chatroom_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    tableName: "user_chatroom",
    timestamps: false,
  }
);

module.exports = User_chatroom;
