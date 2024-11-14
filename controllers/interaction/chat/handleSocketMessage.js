require("../../../models/user_chatroom");
require("../../../models/user_socket");
const inputMessage = require("../../../repositories/message/inputMessage");
require("../../../repositories/message/getMessagesByChatroomId");
const logger = require("../../../logger");
require("../../../repositories/user/getAllUserIdInChatroom");

const handleSocketMessage = async (socket, data) => {
  logger.info(
    `[handleSocketMessage] Data Recieved: ${JSON.stringify(data, null, 2)}`,
  );
  const user_id = socket.user;
  if (data.type === "image") {
    data = { ...data, content: data.image_url };
  } else if (data.type === "text") {
    data = { ...data, content: data.text };
  }
  data = { ...data, user_id };

  const result = await inputMessage(data);
  console.log("result", result);
  data = { ...data, created_at: new Date() };
  // chatroom_id 를 받으면 -> user_chatroom에서 user_id 를 받아오고, 그걸 user_socket에서 찾음
  // 그 socket_id로 message를 보냄
  // 데이터 검증 형식 필요함
  logger.info(
    `[handleSocketMessage] Data Renewed: ${JSON.stringify(data, null, 2)}`,
  );

  socket.broadcast.emit("message", data);
  socket.emit("message", data);
  socket.emit("error", Array.from(socket.rooms));
  logger.info(
    `[handleSocketMessage] Message: ${JSON.stringify(data, null, 2)} \nto Chatroom ID: ${data.chatroom_id}`,
  );
};

module.exports = handleSocketMessage;
