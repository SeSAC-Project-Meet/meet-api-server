const express = require("express");
const auth = express.Router();
const { User, registerUser } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config.json");

const passport = require("passport");

/*
create table project_meet.user
(
    user_id      int auto_increment
        primary key,
    created_at   datetime(6)  not null,
    updated_at   datetime(6)  not null,
    name         varchar(30)  not null,
    nickname     varchar(15)  not null,
    birthdate    date         not null,
    email        varchar(200) not null,
    phone_number varchar(30)  not null,
    password     varchar(30)  not null
);
*/

// 24/10/26 01:35 개발 끝
auth.post("/register", async (req, res) => {
  console.log(req.body);
  const { name, nickname, birthdate, email, phone_number, password } = req.body;
  // Check if the user already exists
  // If the user does not exist, create a new user
  // Return the user data
  try {
    let trimmedPassword = password.trim();
    if (trimmedPassword.length < 8) {
      // 비밀번호 조건확인 로직
      res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
      return;
    }
    const bcryptSalt = await bcrypt.genSalt(config.development.SALT_ROUNDS);
    const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
    const result = await registerUser({
      // 젠장할 await을 잘 씁시다 ^&^
      name: name,
      nickname: nickname,
      birthdate: birthdate,
      email: email,
      phone_number: phone_number,
      password: hashedPassword,
    });
    console.log(result.status);
    res.status(result.status).json({ message: result.message });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 24/10/26 01:35 개발 끝
auth.post(
  "/login",
  passport.authenticate("local", { session: false }),
  async (req, res) => {
    // passport 통해서 들어온거 check
    console.log("auth/login check, is user : " + !!req.user);

    if (req.user) {
      console.log("user_id check : " + req.user.user_id);
      const token = jwt.sign(
        { user_id: req.user.user_id },
        config.development.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      console.log("Login success");
      return res
        .status(200)
        .cookie("MEET_USER_TOKEN", token, {
          httpOnly: true,
          sameSite: "lax",
          maxAge: 3600000,
        })
        .json({ message: "Login success" });
    } else {
      console.log("Login failed");
      return res.status(401).json({ message: "Login failed" });
    }
  }
);

// 24/10/26 01:52 개발 끝
// 카카오 OAuth 관련, 아래에 응답 첨부함.

auth.get("/kakao", passport.authenticate("kakao"));

// 카카오 로그인 콜백 처리
auth.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    session: false,
    failureRedirect: "/auth/kakao",
    successReturnToOrRedirect: "/main",
  }),
  (req, res) => {
    console.log("CALLBACK REQUEST");
    console.log(req.headers, req.cookies);
    // 로그인 성공 후의 처리
    console.log("Kakao login success:", req.user);
    return res
      .status(200)
      .json({ message: "Kakao login successful", user: req.user });
  }
);

/*
req.user은 다음과 같음
{
  "message": "Kakao login successful",
  "user": {
    "id": "",
    "connected_at": "2024-10-25T16:46:30Z",
    "properties": {
      "nickname": "경운",
      "profile_image": "",
      "thumbnail_image": ""
    },
    "kakao_account": {
      "profile_nickname_needs_agreement": false,
      "profile_image_needs_agreement": false,
      "profile": {
        "nickname": "경운",
        "thumbnail_image_url": "":,
        "profile_image_url": "",
        "is_default_image": false,
        "is_default_nickname": false
      },
      "has_email": true,
      "email_needs_agreement": false,
      "is_email_valid": true,
      "is_email_verified": true,
      "email": ""
    }
  }
}
  */

module.exports = auth;
