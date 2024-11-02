const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const logger = require("./logger");

const passport = require("passport");
const { Server } = require("socket.io");
const http = require("http");
const path = require("path");

const { PORT } = require("./config.json").development;

const authRoutes = require("./auth/index.js");
const inquiryRouter = require("./inquiry");
const chatRoutes = require("./chat/index.js");

<<<<<<< HEAD
=======
const { Server } = require("socket.io");

>>>>>>> d7350d3 (Chore: sync with team)
const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

const customlogger = (req, res, next) => {
  let logText = {
    url: req.url,
    method: req.method,
    time: new Date(),
    headers: req.headers,
    body: req.body,
    ip: req.ip,
  };

<<<<<<< HEAD
  res.send(logText); // 주석처리 해제 안하면 crash .. 확인용 코드라 그럼
  console.log(logText);
=======
  logger.info(logText);

  // res.send(logText); // 주석처리 해제 안하면 crash .. 확인용 코드라 그럼
  // console.log(logText);
>>>>>>> d7350d3 (Chore: sync with team)
  next();
};

// Middleware to log all incoming requests using morgan
<<<<<<< HEAD
app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    morgan("combined")(req, res, next);
  } else {
    morgan("dev")(req, res, next);
  }
});
app.use(logger);
app.use("/", express.static(path.join(__dirname, "public")));
=======
app.use(morgan("combined"));
app.use(customlogger);

// JSON 요청 본문 파싱 미들웨어를 먼저 사용
>>>>>>> d7350d3 (Chore: sync with team)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Passport 초기화
app.use(passport.initialize());
require("./passport-setup");

app.use("/auth", authRoutes);
app.use("/inquiry", inquiryRouter);

app.get("/main", (req, res) => {
  res.send("Main Page");
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const io = new Server(server, {
  cors: corsOptions,
});

chatRoutes(io);
