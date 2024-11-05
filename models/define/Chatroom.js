/*
create table project_meet.chatroom
(
    chatroom_id int auto_increment
        primary key,
    name        int                                       not null,
    status      varchar(100)                              not null,
    created_at  timestamp(6) default CURRENT_TIMESTAMP(6) not null,
    updated_at  timestamp(6) default CURRENT_TIMESTAMP(6) not null on update CURRENT_TIMESTAMP(6)
);

*/

const { DataTypes } = require("sequelize");
const sequelize = require("../connectToDB");

const Chatroom = sequelize.define(
  "chatroom",
  {
    chatroom_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "chatroom",
    timestamps: false,
  }
);

module.exports = Chatroom;
