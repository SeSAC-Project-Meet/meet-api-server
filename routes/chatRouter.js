const passport = require("passport");
const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("../config.json").development;

const chat = express.Router();

const handleCreateChatroom = require("../controllers/interaction/chat/handleCreateChatroom");
const handleGetChatroom = require("../controllers/interaction/chat/handleGetChatroom");
const handleSocketMessage = require("../controllers/interaction/chat/handleSocketMessage");
const handleGetChatsInChatroom = require("../controllers/interaction/chat/handleGetChatsInChatroom");

const { UserSocket } = require("../models/index");

const logger = require("../logger");
const getMessageByChatroomId = require("../repositories/message/getMessagesByChatroomId");
const handleUserLeaveChatroom = require("../controllers/interaction/chat/handleUserLeaveChatroom");

const handleCreateMeetroom = require("../controllers/interaction/video/handleCreateMeetroom");
const handleGetMeetroom = require("../controllers/interaction/video/handleGetMeetroom");

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

chat.post(
  "/meetroom",
  passport.authenticate("jwt", passportOptions),
  handleCreateMeetroom
);

chat.get(
  "/meetroom",
  passport.authenticate("jwt", passportOptions),
  handleGetMeetroom
);

function chatSocketRouter(io) {
  logger.info(`./chat loaded`);
  const chatio = io.of("/chat");
  let socketList = {};

  chatio.use((socket, next) => {
    const authHeader = socket.request.headers.authorization;
    if (!authHeader) {
      logger.info(`[chatsocket] No authorization header`);
      socket.emit("unauthorized", "No Authorization Header Provided");
      socket.disconnect(`No Authorization Header Provided, Disconnecting`);
      return;
    }

    const token = authHeader.split(" ")[1];
    logger.info(`[socket] Token: ${token}`);

    if (!token) {
      logger.info(`[chatsocket] No token`);
      socket.emit("unauthorized", "No Token Provided");
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
    logger.info(`/chat으로 socket.io 연결 수립됨: ${socket.id}`);
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
      UserSocket.destroy({ where: { socket_id: socket.id } })
        .then((result) => {
          logger.info(`User disconnected: ${reason}`);
          logger.info(`Deleted socket id record: ${result}`);
        })
        .catch((err) => {
          logger.info(`Error deleting socket id record: ${err}`);
        });
    });

    /* Video-calls */
    /**
     * Join Room
     */
    socket.on("BE-join-room", ({ meetroomId }) => {
      // Socket Join RoomName
      console.log("BE-join-room", meetroomId, socket.user);
      socket.join(meetroomId);
      socketList[socket.id] = { user: socket.user, video: true, audio: true };
      // Set User List
      io.sockets
        .in(meetroomId)
        .allSockets()
        .then((clients) => {
          try {
            const users = [];
            clients.forEach((client) => {
              // Add User List
              users.push({ userId: client, info: socketList[client] });
              console.log("sdfdsfds");
            });
            socket.broadcast.to(meetroomId).emit("FE-user-join", users);
            console.log(users);
          } catch (e) {
            console.log("error occur");
          }
        });
    });
  });
}

module.exports = { chatSocketRouter, chat };
