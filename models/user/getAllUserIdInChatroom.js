const logger = require("../../logger");
const User_chatroom = require("../define/User_chatroom");

const getAllUserIdInChatroom = async (chatroom_id) => {
  const result = await User_chatroom.findAll({
    attributes: ["user_id"],
    where: { chatroom_id: chatroom_id },
  });
  logger.info(result);
  if (result && result.length > 0) {
    return result.map((r) => r.dataValues.user_id);
  }
  return null;
};

module.exports = getAllUserIdInChatroom;
