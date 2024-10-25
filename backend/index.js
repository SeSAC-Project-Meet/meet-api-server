const express = require("express");

const { PORT } = require("./config.json").development;

const morgan = require("morgan");
const passport = require("passport");
const authRoutes = require("./auth/index.js");

const app = express();
app.use(express.json());

const inquiryRouter = require("./inquiry");

function logger(req, res, next) {
  let logText = {
    url: req.url,
    method: req.method,
    time: new Date(),
    headers: req.headers,
    body: req.body,
    ip: req.ip,
  };

  // res.send(logText); // 주석처리 해제 안하면 crash .. 확인용 코드라 그럼
  console.log(logText);
  next();
}

// Middleware to log all incoming requests using morgan
app.use(morgan("combined"));
app.use(logger);

// JSON 요청 본문 파싱 미들웨어를 먼저 사용
app.use(express.json());

// Passport 초기화
app.use(passport.initialize());
require("./passport-setup");

app.use("/auth", authRoutes);

app.use("/inquiry", inquiryRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
