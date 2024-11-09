const deleteUserFromChatroom = require("../../models/user/deleteUserFromChatroom");
const logger = require("../../logger");

const handleUserLeaveChatroom = async (socket, data) => {
  const { chatroom_id } = data;
  const userId = socket.user;

  const userLeft = await deleteUserFromChatroom(chatroom_id, userId);
  if (userLeft) {
    socket.leave(chatroom_id);
    socket.broadcast.to(chatroom_id).emit("userLeave", userId);
    logger.info(
      `[handleUserLeaveChatroom] User ${userId} left chatroom ${chatroom_id}`
    );
  }
};

module.exports = handleUserLeaveChatroom;
