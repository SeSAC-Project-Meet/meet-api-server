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

const insertSocketIdWithUserId = require("../models/user/insertSocketdWithUserId");

const cookie = require("cookie");
const logger = require("../logger");
const getMessageByChatroomId = require("../models/message/getMessagesByChatroomId");
const handleUserLeaveChatroom = require("./service/handleUserLeaveChatroom");

const passportOptions = {
  session: false,
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
  logger.info(`./chat loaded`);
  const chatio = io.of("/chat");
  const videocall = io.of("/videocall");
  const groupcall = io.of("/groupcall");

  groupcall.on("connection", (socket) => {
    socket.on("join-room", (roomId, userId) => {
      socket.join(roomId);
      socket.broadcast.to(roomId).emit("user-connected", userId);

      socket.on("disconnect", () => {
        socket.broadcast.to(roomId).emit("user-disconnected", userId);
      });
    });
  });

  videocall.on("connection", (socket) => {
    logger.info(`User connected to /videocall namespace ${socket.id}`);

    socket.on("offer", (data) => {
      socket.broadcast.emit("offer", data);
    });

    socket.on("answer", (data) => {
      socket.broadcast.emit("answer", data);
    });

    socket.on("candidate", (data) => {
      socket.broadcast.emit("candidate", data);
    });

    socket.on("reconnect", () => {
      logger.info(`User reconnected to /videocall namespace`);
    });

    socket.on("disconnect", (reason) => {
      logger.info(`User disconnected: ${reason}`);
    });
  });

  chatio.use((socket, next) => {
    const rawToken = socket.request.headers.cookie;
    if (!rawToken) {
      logger.info(`[chatsocket] No cookie`);
      socket.disconnect(`No Cookie Provided, Disconnecting`);
      return;
    }
    const token = cookie.parse(rawToken).MEET_ACCESS_TOKEN;
    logger.info(`[socket] Token: ${token}`);

    if (!token) {
      logger.info(`[chatsocket] No token`);
      socket.disconnect(`No Token Provided, Disconnecting`);
      return;
    }

    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
      if (err) {
        logger.info(`[chatsocket] Invalid token`);
        socket.disconnect(`Invalid Token Provided, Disconnecting`);
        return;
      }
      socket.user = decoded.user_id; // Store user_id from payload
      logger.info(`[chatsocket] User ID: ${socket.user}`);
      next();
    });
  });

  chatio.on("connection", async (socket) => {
    // const recordSocketId = await insertSocketIdWithUserId(
    //   socket.user,
    //   socket.id
    // );
    // const senderSocketId = recordSocketId?.dataValues.socket_id;
    // logger.info(
    //   // TODO : ???
    //   `User connected & socket id recorded: ${senderSocketId}`
    // );

    // socket.onAny((event, ...args) => {
    //   logger.error(`[chatsocket] Event: ${event}, Args: ${args}`);
    // });
    socket.on("initialMessage", async (data) => {
      logger.info(`Initial Message: ${JSON.stringify(data, null, 2)}`);
      const { chatroom_id } = data;
      const messages = await getMessageByChatroomId(chatroom_id);
      // logger.info(`Initial Message: ${JSON.stringify(messages, null, 2)}`);
      socket.emit("initialMessage", messages);
    });

    socket.on("join", (data) => {
      const { chatroom_id } = data;
      socket.join(chatroom_id);
      logger.info(`Joined User to chatroom ${chatroom_id}`);
      socket.to(chatroom_id).emit("userJoin", socket.user);
    });

    socket.on("leave", (data) => handleUserLeaveChatroom(socket, data));

    socket.on("message", (data) => handleSocketMessage(socket, data));

    socket.on("reconnect", () => {
      logger.info(`User reconnected to /chat namespace`);
    });

    socket.on("disconnect", (reason) => {
      User_socket.destroy({ where: { socket_id: socket.id } })
        .then((result) => {
          logger.info(`User disconnected: ${reason}`);
          logger.info(`Deleted socket id record: ${result}`);
        })
        .catch((err) => {
          logger.info(`Error deleting socket id record: ${err}`);
        });
    });
  });
}

module.exports = { chatSocketRouter, chat };
