const express = require("express");
const https = require("https");
const fs = require("fs");

const cors = require("cors");
const logger = require("./logger");

const morgan = require("morgan");

const passport = require("passport");
const cookieParser = require("cookie-parser");

const { Server } = require("socket.io");
const { PORT } = require("./config.json").development;

const authRoutes = require("./auth/index.js");
const inquiryRouter = require("./inquiry");
const { chat, chatSocketRouter } = require("./chat/index.js");
const verifyEmailRouter = require("./auth/verifyEmail");

const app = express();

app.use(cookieParser());

const corsOptions = {
  origin: ["http://localhost:5173", "http://192.168.35.254:5173"],
  credentials: true,
};

// SSL 인증서 로드
const sslOptions = {
  key: fs.readFileSync("localhost-key.pem"), // 개인 키 파일
  cert: fs.readFileSync("localhost-cert.pem"), // 인증서 파일
};

app.use(cors(corsOptions));

const customlogger = (req, res, next) => {
  let logText = {
    url: req.url,
    method: req.method,
    time: new Date(),
    host: req.headers.host,
    body: req.body,
    cookie: req.cookies,
    ip: req.ip,
  };

  logger.info(logText);

  // res.send(logText); // 주석처리 해제 안하면 crash .. 확인용 코드라 그럼
  // logger.info(logText);
  next();
};

app.use(morgan("combined"));
app.use(customlogger);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Passport 초기화
app.use(passport.initialize());
require("./passport-setup");

app.use("/auth", authRoutes);

app.use("/inquiry", inquiryRouter);

app.use("/api-test", verifyEmailRouter);

app.use("/chat", chat);

const server = https.createServer(sslOptions, app);
server.listen(PORT, "0.0.0.0", () => {
  logger.info(`Server is running on https://localhost:${PORT}`);
});

const io = new Server(server, {
  cors: corsOptions,
  cookie: true,
});

chatSocketRouter(io);
