const Message = require("../../models/message");

const inputMessage = async (data) => {
  const { user_id, chatroom_id, type, content } = data;
  if (!content) {
    throw new Error("[inputMessage] Content is required");
  }
  if (type === "text") {
    return await Message.create({
      user_id,
      chatroom_id,
      type,
      text: content,
    });
  } else if (type === "image") {
    return await Message.create({
      user_id,
      chatroom_id,
      type,
      image_url: content,
    });
  }
};

module.exports = inputMessage;
