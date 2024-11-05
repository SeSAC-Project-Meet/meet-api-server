/*
create table project_meet.message_user
(
    message_user_id int auto_increment
        primary key,
    message_id      int                                       not null,
    checked_user_id int                                       not null,
    checked_at      timestamp(6) default CURRENT_TIMESTAMP(6) not null,
    constraint fk_message_user_checked_user
        foreign key (checked_user_id) references project_meet.user (user_id),
    constraint fk_message_user_message
        foreign key (message_id) references project_meet.message (message_id)
);

*/

const { DataTypes } = require("sequelize");
const sequelize = require("../connectToDB");

const Message_user = sequelize.define(
  "message_user",
  {
    message_user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    message_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    checked_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    checked_at: {
      type: DataTypes.DATE(6),
      defaultValue: sequelize.fn("CURRENT_TIMESTAMP", 6),
      allowNull: false,
    },
  },
  {
    tableName: "message_user",
    timestamps: false,
  }
);

module.exports = Message_user;
