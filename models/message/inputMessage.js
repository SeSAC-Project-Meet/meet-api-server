const Message = require("../define/Message");

const inputMessage = async (data) => {
  const { user_id, chatroom_id, type, content } = data;
  if (!content) {
    throw new Error("[inputMessage] Content is required");
  }
  if (type === "text") {
    const message = await Message.create({
      user_id,
      chatroom_id,
      type,
      text: content,
    });
    return message;
  } else if (type === "image") {
    const message = await Message.create({
      user_id,
      chatroom_id,
      type,
      image_url: content,
    });

    return message;
  }
};

module.exports = inputMessage;
