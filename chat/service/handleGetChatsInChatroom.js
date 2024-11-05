const getMessageByChatroomId = require("../../models/message/getMessagesByChatroomId");

const handleGetChatsInChatroom = async (req, res) => {
  const { chatroom_id } = req.query;
  console.log("[handleGetChatsInChatroom] chatroom_id: ", chatroom_id);

  getMessageByChatroomId(chatroom_id)
    .then((getChats) => {
      console.log("[handleGetChatsInChatroom] getChats: ", getChats);
      return res.status(200).json(getChats);
    })
    .catch((error) => {
      console.error("[handleGetChatsInChatroom] Error getting chats: ", error);
      return res.status(500).json(error);
    });
};

module.exports = handleGetChatsInChatroom;
