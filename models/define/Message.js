/*
create table project_meet.message
(
    message_id  int auto_increment
        primary key,
    user_id     int                                       not null,
    chatroom_id int                                       not null,
    type        varchar(30)                               not null,
    text        varchar(4096)                             null,
    image_url   varchar(1024)                             null,
    created_at  timestamp(6) default CURRENT_TIMESTAMP(6) not null,
    updated_at  timestamp(6) default CURRENT_TIMESTAMP(6) not null on update CURRENT_TIMESTAMP(6),
    constraint fk_message_chatroom
        foreign key (chatroom_id) references project_meet.chatroom (chatroom_id),
    constraint fk_message_user
        foreign key (user_id) references project_meet.user (user_id)
);
*/

const { DataTypes } = require("sequelize");
const sequelize = require("../connectToDB");

const Message = sequelize.define(
  "message",
  {
    message_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    tableName: "message",
    timestamps: false,
  }
);

module.exports = Message;
