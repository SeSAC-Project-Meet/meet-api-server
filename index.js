const express = require("express");

const cors = require("cors");
const logger = require("./logger");

const morgan = require("morgan");

const passport = require("passport");
const { Server } = require("socket.io");

const { PORT } = require("./config.json").development;

const authRoutes = require("./auth/index.js");
const inquiryRouter = require("./inquiry");
const chatRoutes = require("./chat/index.js");

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
    host: req.headers.host,
    body: req.body,
    ip: req.ip,
  };

  logger.info(logText);

  // res.send(logText); // 주석처리 해제 안하면 crash .. 확인용 코드라 그럼
  // console.log(logText);
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
