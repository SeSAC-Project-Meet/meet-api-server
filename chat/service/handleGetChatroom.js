const Chatroom = require("../../models/define/Chatroom");
const User_chatroom = require("../../models/define/User_chatroom");
const logger = require("../../logger");

const handleGetChatroom = async (req, res) => {
  const { name } = req.body;
  logger.info(`[handleCreateChatroom] name: ${name}`);
  logger.info(`[handleCreateChatroom] user: ${req.user.dataValues.user_id}`);

  const getUserChatroom = await User_chatroom.findAll({
    attributes: ["chatroom_id"],
    where: {
      user_id: req.user.dataValues.user_id,
      user_status: "active",
    },
  });
  logger.info(
    `[handleGetChatroom] getUserChatroom: ${JSON.stringify(getUserChatroom)}`,
  );

  const chatrooms = await Promise.all(
    getUserChatroom.map(async (userChatroom) => {
      const chatroom = await Chatroom.findOne({
        attributes: ["name"],
        where: {
          chatroom_id: userChatroom.dataValues.chatroom_id,
          status: "active",
        },
      });
      return {
        id: userChatroom.dataValues.chatroom_id,
        name: chatroom.dataValues.name,
      };
    }),
  );

  logger.info(`[handleGetChatroom] chatrooms: ${JSON.stringify(chatrooms)}`);
  res.status(200).json(chatrooms);
};

module.exports = handleGetChatroom;
