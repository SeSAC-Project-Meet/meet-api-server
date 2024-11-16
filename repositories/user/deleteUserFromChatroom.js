const logger = require("../../logger");
const { User_chatroom } = require("../../models/index");

const deleteUserFromChatroom = async (chatroomId, userId) => {
  try {
    const [userChatroom] = await User_chatroom.update(
      { user_status: "inactive" },
      {
        where: {
          user_id: userId,
          chatroom_id: chatroomId,
        },
      }
    );
    if (!userChatroom) {
      logger.info(
        `[deleteUserFromChatroom] User ${userId} is not in chatroom ${chatroomId}`
      );
      return false;
    } else {
      logger.info(
        `[deleteUserFromChatroom] User ${userId} left chatroom ${chatroomId}`
      );
      return true;
    }
  } catch (error) {
    logger.error(`[deleteUserFromChatroom] ${error}`);
    return false;
  }
};

module.exports = deleteUserFromChatroom;
