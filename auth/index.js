const express = require("express");
const auth = express.Router();
const passport = require("passport");

const handleGetUser = require("./handleGetUser");
const handleRegister = require("./handleRegister");
const handleLogin = require("./handleLogin");
const handleKakaoCallback = require("./handleKakaoCallback");
const handleCheckUnique = require("./handleCheckUnique");
const handleGetTerms = require("./handleGetTerms");
const handleAddTerms = require("./handleAddTerms");

auth.get("/terms", handleGetTerms);
// TODO: 다른 서버빼던, ip제한이던 해야합니다.
auth.post("/terms", handleAddTerms);

auth.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  handleGetUser
);

// 24/10/26 01:35 개발 끝
auth.post("/register", handleRegister);
auth.post("/check-unique", handleCheckUnique);

// 24/10/26 01:35 개발 끝
auth.post(
  "/login",
  passport.authenticate("local", { session: false }),
  handleLogin
);

// 24/10/26 01:52 개발 끝
// 카카오 OAuth 관련, 아래에 응답 첨부함.
auth.get("/kakao", passport.authenticate("kakao", { session: false }));
auth.get("/kakao/callback", handleKakaoCallback); // 미들웨어 실행

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
