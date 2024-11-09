const Chatroom = require("../../models/define/Chatroom");
const User_chatroom = require("../../models/define/User_chatroom");
const logger = require("../../logger");

const handleCreateChatroom = async (req, res) => {
  const { name } = req.body;
  // const { user } = req.user;
  logger.info(`[handleCreateChatroom] name: ${name}`);
  logger.info(`[handleCreateChatroom] user: ${req.user.dataValues.user_id}`);

  const chatroom = await Chatroom.create({ name, status: "active" });
  const chatroom_id = chatroom.dataValues.chatroom_id;

  const registerUserToChatroom = await User_chatroom.create({
    chatroom_id,
    user_id: req.user.dataValues.user_id,
    user_status: "active",
  });
  res.status(201).json({
    user_chatroom_id: registerUserToChatroom.user_chatroom_id,
    chatroom_id: chatroom.chatroom_id,
  });
};

module.exports = handleCreateChatroom;
