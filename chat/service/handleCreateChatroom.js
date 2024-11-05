const Chatroom = require("../../models/define/Chatroom");
const User_chatroom = require("../../models/define/User_chatroom");

const handleCreateChatroom = async (req, res) => {
  const { name } = req.body;
  // const { user } = req.user;
  console.log("[handleCreateChatroom] name: ", name);
  console.log("[handleCreateChatroom] user: ", req.user.dataValues.user_id);

  const chatroom = await Chatroom.create({ name, status: "active" });
  const chatroom_id = chatroom.dataValues.chatroom_id;

  const registerUserToChatroom = await User_chatroom.create({
    chatroom_id,
    user_id: req.user.dataValues.user_id,
    user_status: "active",
  });
  res.status(201).json({
    uc_id: registerUserToChatroom.user_chatroom_id,
    c_id: chatroom.chatroom_id,
  });
};

module.exports = handleCreateChatroom;
