const express = require("express");
const auth = express.Router();
const passport = require("passport");

const handleGetUser = require("../controllers/auth/handleGetUser");
const handleRegister = require("../controllers/auth/register/handleRegister");
const handleLogin = require("../controllers/auth/login/handleLogin");
const handleKakaoCallback = require("../controllers/auth/login/handleKakaoCallback");
const handleCheckUnique = require("../controllers/auth/register/handleCheckUnique");
const handleGetTerms = require("../controllers/auth/register/handleGetTerms");
const handleAddTerms = require("../controllers/admin/handleAddTerms");
const handleSpecificRegister = require("../controllers/auth/register/handleSpecificRegister");
const handleReissueToken = require("../controllers/auth/login/handleReissueToken");
const handleLogout = require("../controllers/auth/login/handleLogout");

auth.get("/terms", handleGetTerms);
// TODO: 다른 서버로 분리하던, ip제한이던 해야합니다.
auth.post("/terms", handleAddTerms);

auth.get(
  "/user",
  (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user) => {
      if (user) {
        req.user = user;
        return next();
      }
      passport.authenticate("jwtRefresh", { session: false })(req, res, next);
    })(req, res, next);
  },
  handleGetUser,
);

// 24/10/26 01:35 개발 끝
auth.post("/register", handleRegister);
auth.post("/check-unique", handleCheckUnique);
auth.post("/register/specific", handleSpecificRegister);

// 24/10/26 01:35 개발 끝
auth.post(
  "/login",
  passport.authenticate("local", { session: false }),
  handleLogin,
);
auth.get("/logout", handleLogout);

// 24/10/26 01:52 개발 끝
// 카카오 OAuth 관련, 아래에 응답 첨부함.
auth.get("/kakao", passport.authenticate("kakao", { session: false }));
auth.get("/kakao/callback", handleKakaoCallback); // 미들웨어 실행

auth.get(
  "/reissue-token",
  passport.authenticate("jwtRefresh", { session: false }),
  handleReissueToken,
);

module.exports = auth;
