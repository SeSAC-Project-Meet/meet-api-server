const Message = require("../define/Message");

const getMessageByChatroomId = async (chatroomId) => {
  const messages = await Message.findAll({
    attributes: [
      "message_id",
      "user_id",
      "created_at",
      "type",
      "text",
      "image_url",
    ],
    where: { chatroom_id: chatroomId },
  });
  return messages;
};

module.exports = getMessageByChatroomId;
