const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");
const { Server } = require("socket.io");
const http = require("http");
const path = require("path");

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

function logger(req, res, next) {
  let logText = {
    info: "logger LOG",
    url: req.url,
    method: req.method,
    time: new Date(),
    headers: req.headers,
    body: req.body,
    ip: req.ip,
  };

  res.send(logText); // 주석처리 해제 안하면 crash .. 확인용 코드라 그럼
  console.log(logText);
  next();
}

// Middleware to log all incoming requests using morgan
app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    morgan("combined")(req, res, next);
  } else {
    morgan("dev")(req, res, next);
  }
});
app.use(logger);
app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Passport 초기화
app.use(passport.initialize());
require("./passport-setup");

app.use("/auth", authRoutes);
app.use("/inquiry", inquiryRouter);

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const io = new Server(server, {
  cors: corsOptions,
});

chatRoutes(io);
