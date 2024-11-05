require("../../models/define/User_chatroom");
require("../../models/define/User_socket");
const inputMessage = require("../../models/message/inputMessage");
require("../../models/message/getMessagesByChatroomId");
const logger = require("../../logger");
require("../../models/user/getAllUserIdInChatroom");
const sendMessageToUsersInChatroom = require("./sendMessageToUsersInChatroom");

const handleSocketMessage = async (socket, data) => {
  logger.info(`[handleSocketMessage] Data Recieved: ${JSON.stringify(data)}`);
  const user_id = socket.user;
  if (data.type === "image") {
    data = { ...data, content: data.image_url };
  } else if (data.type === "text") {
    data = { ...data, content: data.text };
  }
  data = { ...data, user_id };

  // chatroom_id 를 받으면 -> user_chatroom에서 user_id 를 받아오고, 그걸 user_socket에서 찾음
  // 그 socket_id로 message를 보냄
  // 데이터 검증 형식 필요함
  logger.info(`[handleSocketMessage] Data Renewed: ${JSON.stringify(data)}`);

  sendMessageToUsersInChatroom(socket, data.chatroom_id, data)
    .then((r) => {
      logger.info(`[sendMessageToUsersInChatroom] Result: ${r}`); // 메시지가 성공적으로 전송되었을 때 로그
      return inputMessage(data); // 데이터베이스에 메시지를 저장
    })
    .then((r) => {
      logger.info(`[inputMessage] Chat: ${JSON.stringify(r.dataValues)}`);
    }) // 메시지가 성공적으로 저장되었을 때 로그
    .catch((e) => logger.error(e)); // 에러 처리
};

module.exports = handleSocketMessage;
