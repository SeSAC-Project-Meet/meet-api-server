const passport = require("passport");
const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("../config.json").development;

const chat = express.Router();

const handleCreateChatroom = require("./service/handleCreateChatroom");
const handleGetChatroom = require("./service/handleGetChatroom");
const handleSocketMessage = require("./service/handleSocketMessage");
const User_socket = require("../models/define/User_socket");
const handleGetChatsInChatroom = require("./service/handleGetChatsInChatroom");

const cookie = require("cookie");

const passportOptions = {
  session: false,
  // failureMessage: true,
};

chat.get("/", handleGetChatsInChatroom);

chat.post(
  "/chatroom",
  passport.authenticate("jwt", passportOptions),
  handleCreateChatroom
);

chat.get(
  "/chatroom",
  passport.authenticate("jwt", passportOptions),
  handleGetChatroom
);

function chatSocketRouter(io) {
  console.log("./chat loaded");
  const chatio = io.of("/chat");

  chatio.use((socket, next) => {
    const rawToken = socket.request.headers.cookie;
    if (!rawToken) {
      console.log("[chatsocket] No cookie");
      socket.disconnect("No Cookie Provided, Disconnecting");
      return;
    }
    const token = cookie.parse(rawToken).MEET_ACCESS_TOKEN;
    console.log("[socket] Token: ", token);

    if (!token) {
      console.log("[chatsocket] No token");
      socket.disconnect("No Token Provided, Disconnecting");
      return;
    }

    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log("[chatsocket] Invalid token");
        socket.disconnect("Invalid Token Provided, Disconnecting");
        return;
      }
      socket.user = decoded.user_id; // Store user_id from payload
      console.log("[chatsocket] User ID: ", socket.user);
      next();
    });
  });

  chatio.on("connection", async (socket) => {
    const recordSocketId = await User_socket.create({
      user_id: socket.user,
      socket_id: socket.id,
      status: true,
    });
    console.log("User connected & socket id recorded: ", recordSocketId);

    socket.on("message", (data) => handleSocketMessage(socket, data));

    socket.on("reconnect", () => {
      console.log("User reconnected to /chat namespace");
    });

    socket.on("disconnect", (reason) => {
      // disconnect 시에 user_socket에 저장해둔 socket_id 삭제
      // 이거 await임, socket_id 로 한 이유는 여러 기기에서 접속했을 경우 대비
      User_socket.destroy({ where: { socket_id: socket.id } })
        .then((result) => {
          console.log("User disconnected :", reason);
          console.log("Deleted socket id record: ", result);
        })
        .catch((err) => {
          console.log("Error deleting socket id record: ", err);
        });
    });
  });
}

module.exports = { chatSocketRouter, chat };
