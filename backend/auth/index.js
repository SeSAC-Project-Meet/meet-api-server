const express = require("express");
const auth = express.Router();

/*
create table user
(
    user_id      int auto_increment
        primary key,
    created_at   datetime(6)  not null,
    updated_at   datetime(6)  not null,
    name         int          not null,
    nickname     varchar(15)  not null,
    birthdate    date         not null,
    email        varchar(200) not null,
    phone_number varchar(30)  not null
)
*/

auth.post("/register", (req, res) => {
    const { name, nickname, birthdate, email, phone_number } = req.body;
    // Check if the user already exists
    // If the user does not exist, create a new user
    // Return the user data
  try {
    const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
    const createdUser = 
  } catch (err) {
    res.status(500).json("error");
  }
});



module.exports = auth;
