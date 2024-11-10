const nodemailer = require("nodemailer");
const config = require("../config.json")["development"];

// 이메일 전송 함수
async function sendVerificationEmail(email, token) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config["GOOGLE_EMAIL"],
      pass: config["GOOGLE_EMAIL_PASSWORD"],
    },
  });

  let info = await transporter.sendMail({
    from: '"메일 인증 테스트" frunning21@gmail.com',
    to: email,
    subject: "가입 인증 메일",
    // html: `가입확인 버튼를 누르시면 가입 인증이 완료됩니다.<br/><form action="http://localhost:9999/api-test/verify-email?token=${token}" method="POST"><button>가입확인</button></form>`,
    html: `인증 코드: ${token}`,
  });

  console.log("Message sent: %s", info.messageId);
}

const express = require("express");
const User = require("../models/define/User");
const router = express.Router();

// exports.checkEmail = async (req, res, next) => {
const checkEmail = async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: { email: req.body.email },
      attributes: ["email"],
    });
    console.log(exUser);
    if (exUser) {
      return (
        res
          // .status(409)
          .json({
            code: 409, // TODO
            message: "사용할 수 없는 이메일입니다.",
          })
      );
    } else {
      next(); // next(email) ???
    }
  } catch (e) {
    // console.error(e);
    // return ???
    res.status(500).json({ code: 500, message: "이메일 확인 중 서버 에러" });
    // next(e)
  }
};

// exports.sendEmailWithToken = async(req, res, next) => {}
const crypto = require("crypto");
const UserToken = require("../models/define/UserToken");
const { Op } = require("sequelize");

const sendEmailWithToken = async (req, res) => {
  const { email } = req.body;

  const token = crypto.randomInt(100000, 1000000);

  const savedToken = await UserToken.create({
    token,
    user_id: 8, // TODO : DB 수정. 현재 값은 8로 고정
    type: "email",
    expires_at: new Date(new Date().getTime() + 1000 * 60 * 30), // TODO : KTC?
  });
  console.log(token);
  await sendVerificationEmail(email, token);
  res.status(200).json({ code: 200, message: "Verification email sent" });
};

// POST /api-test/send-verification-email
router.post("/send-verification-email", checkEmail, sendEmailWithToken);

// POST /api-test/verify-email-token
router.post("/verify-email", async (req, res) => {
  const { token } = req.body;
  console.log("token", token);
  // 토큰 검증 로직 추가
  const matchedToken = await UserToken.findAll({
    where: {
      token,
      // user_id: 8, // TODO : DB 수정. 현재 값은 8로 고정
      // expires_at: { [Op.gt]: new Date() }, // TODO : KTC?
    },
    // attributes: ["token", "created_at"],
    // order: [["created_at", "desc"]]
  });
  console.log("matchedToken@@@@", matchedToken);
  if (matchedToken.length > 0) {
    return res.status(200).json({ code: 200, message: "이메일 인증 성공" });

    // TODO : 토큰 삭제
    // await UserToken.destroy({ where: { token } });
  } else {
    return (
      res
        // .status(401)
        .json({ code: 401, message: "이메일 인증 실패" })
    );
  }
});

module.exports = router;
