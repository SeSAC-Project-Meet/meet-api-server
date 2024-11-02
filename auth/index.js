const express = require("express");
const auth = express.Router();
const { User, registerUser } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config.json");

const passport = require("passport");

const createJWT = require("./createJWT");


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


auth.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("auth/user check, is user : " + !!req.user);
    if (req.user) {
      return res.status(200).json({ user: req.user });
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }
);


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

auth.get("/kakao/callback", (req, res) => {
  passport.authenticate("kakao", { session: false }, (err, user, info) => {
    if (err) {
      console.log("[auth/kakao/callback] Error: ", err);
      return; // 에러가 발생하면 다음 미들웨어로 넘깁니다.
    }

    if (!user) {
      // 인증 실패 시
      return res
        .status(401)
        .send(
          `<script>window.opener.postMessage({ error: 'Authentication failed' }, '*'); window.close();</script>`
        );
    }

    console.log("Kakao login success:", user);
    const cookieOptions = {
      maxAge: 1000 * 60 * 60 * 24 * 1, // 1 day
      // httpOnly: true,
      sameSite: "strict",
    };

    const createdToken = createJWT(user.user_id);

    return res
      .cookie("MEET_ACCESS_TOKEN", createdToken, cookieOptions)
      .send(
        `<script>window.opener.postMessage({ user: ${JSON.stringify(user)} }, '*'); window.close();</script>`
      );
    // .json({ user: user })
    // .redirect(config.development.KAKAO_REDIRECT_URI);
  })(req, res);
}); // 미들웨어 실행

// auth.get("/kakao/callback", (req, res, next) => {
//   passport.authenticate("kakao", {
//     session: false,
//     // failureRedirect: config.development.KAKAO_REDIRECT_FAILURE,
//     // successRedirect: config.development.KAKAO_REDIRECT_URI,
//   })(req, res, (err) => {
//     if (err) {
//       console.log("ERR : ", err);
//       return; // 에러가 있으면 다음 미들웨어로 전달
//     }

//     // 이곳은 인증 후 처리 부분입니다.
//     if (!req.user) {
//       return res.status(401).json({ message: "Authentication failed" });
//     }

//     console.log("REQ :", req);
//     console.log("Kakao login success:", req.user);

//     const cookieOptions = {
//       maxAge: 1000 * 60 * 60 * 24 * 1, // 1 day
//       httpOnly: true,
//       sameSite: "strict",
//     };

//     return res
//       .cookie("MEET_ACCESS_TOKEN", createJWT(req.user.user_id), cookieOptions)
//       .redirect(config.development.KAKAO_REDIRECT_URI);
//   });
// });

// 카카오 로그인 콜백 처리
// auth.get(
//   "/kakao/callback",
//   passport.authenticate(
//     "kakao",
//     {
//       session: false,
//       failureRedirect: config.development.KAKAO_REDIRECT_FAILURE,
//       // successRedirect: config.development.KAKAO_REDIRECT_URI,
//     },
//     (err) => {
//       console.log("ERR : ", err);
//     }
//   ),
//   (req, res) => {
//     // console.log("CALLBACK REQUEST");
//     // console.log(req.headers, req.cookies);
//     // 로그인 성공 후의 처리

//     console.log("REQ :", req);
//     console.log("Kakao login success:", req.user);
//     const cookieOptions = {
//       maxAge: 1000 * 60 * 60 * 24 * 1, // 1 days
//       httpOnly: true,
//       sameSite: "strict",
//     };
//     return res
//       .cookie("MEET_ACCESS_TOKEN", createJWT(req.user.user_id), cookieOptions)
//       .redirect(config.development.KAKAO_REDIRECT_URI);
//   }
// );

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
