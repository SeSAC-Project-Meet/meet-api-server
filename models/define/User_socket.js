/*
create table project_meet.user_socket
(
    user_socket_id int auto_increment
        primary key,
    socket_id      varchar(50) not null,
    user_id        int         not null,
    status         tinyint(1)  not null,
    constraint user_socket_user_user_id_fk
        foreign key (user_id) references project_meet.user (user_id)
);

*/

const { DataTypes } = require("sequelize");
const sequelize = require("../connectToDB");

const User_socket = sequelize.define(
  "user_socket",
  {
    user_socket_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    socket_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: "user_socket",
    timestamps: false,
  }
);

module.exports = User_socket;
