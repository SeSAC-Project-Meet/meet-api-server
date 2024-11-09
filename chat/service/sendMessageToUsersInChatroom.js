const getAllUserIdInChatroom = require("../../models/user/getAllUserIdInChatroom");
const getAllSocketIdByUserId = require("../../models/user/getAllSocketIdByUserId");
const logger = require("../../logger");

const sendMessageToUsersInChatroom = async (socket, chatroom_id, message) => {
  const users = await getAllUserIdInChatroom(chatroom_id);

  if (!users) {
    console.error("[sendMessageToUsersInChatroom] No users found");
    socket.emit("error", "No users found");
    return;
  }

  await Promise.all(
    users.map(async (user_id) => {
      logger.info(`[sendMessageToUsersInChatroom] User ID: ${user_id}`);
      const socket_ids = await getAllSocketIdByUserId(user_id);

      if (!socket_ids) {
        logger.info(`Opponent is Offline`);
        socket.emit("error", "Opponent is Offline");
      } else {
        socket_ids.map((socket_id) => {
          const reply_message = {
            ...message,
            user_id: user_id,
          };
          socket.to(socket_id).emit("message", reply_message);
          logger.info(
            `[sendMessageToUsersInChatroom] Message: ${JSON.stringify(reply_message)} to Socket ID: ${socket_id}`
          );
          // logger.info(
          //   `[sendMessageToUsersInChatroom] Socket ID: ${JSON.stringify(socket_id)}`
          // );
        });
      }
    })
  );

  return true;
};

module.exports = sendMessageToUsersInChatroom;
