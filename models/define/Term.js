const sequelize = require("../connectToDB");
const { DataTypes, Sequelize } = require("sequelize");

/*
create table project_meet.term
(
    term_id    int auto_increment
        primary key,
    title      varchar(1024)                             not null,
    content    varchar(4096)                             not null,
    created_at timestamp(6) default CURRENT_TIMESTAMP(6) not null,
    updated_at timestamp(6) default CURRENT_TIMESTAMP(6) not null on update CURRENT_TIMESTAMP(6)
);
*/

const Term = sequelize.define(
  "Term",
  {
    term_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(1024),
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(4096),
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
    tableName: "term",
    timestamps: false,
  }
);

module.exports = Term;
