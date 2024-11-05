const User_chatroom = require("../../models/define/User_chatroom");
const User_socket = require("../../models/define/User_socket");
const inputMessage = require("../../models/message/inputMessage");
const getMessageByChatroomId = require("../../models/message/getMessagesByChatroomId");

const handleSocketMessage = async (socket, data) => {
  const user_id = socket.user;
  data = { ...data, user_id };

  // chatroom_id 를 받으면 -> user_chatroom에서 user_id 를 받아오고, 그걸 user_socket에서 찾음
  // 그 socket_id로 message를 보냄
  if (!data.chatroom_id) {
    console.error("[handleSocketMessage] No chatroom_id provided");
    socket.emit("error", "No chatroom_id provided");
    return;
  }

  console.log("[handleSocketMessage] chatroom_id: ", data.chatroom_id);

  try {
    const users = await User_chatroom.findAll({
      attributes: ["user_id"],
      where: { chatroom_id: data.chatroom_id },
    });

    if (!users.length) {
      console.error("[handleSocketMessage] No users found");
      socket.emit("error", "No users found");
      return;
    }

    console.log("[handleSocketMessage] users: ", users);

    const sendMessagesToUsers = async () => {
      try {
        await Promise.all(
          users.map(async (user) => {
            const user_id = user.dataValues.user_id;
            console.log("[handleSocketMessage] user_id: ", user_id);
            const user_socket = await User_socket.findOne({
              attributes: ["socket_id"],
              where: { user_id },
            });

            if (!user_socket) {
              console.error(
                "[handleSocketMessage] No user_socket found for user_id:",
                user_id
              );
              return; // 오류 메시지 전송하지 않고 종료
            }

            const user_socket_id = user_socket.dataValues.socket_id;
            console.log(
              "[handleSocketMessage] user_socket_id: ",
              user_socket_id
            );

            const message = {
              from: socket.user, // 보내는 사람 ID
              chatroom_id: data.chatroom_id,
              type: data.type,
              content: data.content,
            };

            // 해당 사용자에게 메시지 전송
            await socket.to(user_socket_id).emit("message", message);
          })
        );
      } catch (error) {
        console.error("Error sending messages:", error);
      }
    };

    // 모든 사용자에게 메시지 전송
    await sendMessagesToUsers();

    const message = await inputMessage(data);
    console.log("[handleSocketMessage] message_id: ", message);

    // const prevMessage = await getMessageByChatroomId(data.chatroom_id);
    // console.log("[handleSocketMessage] prevMessage: ", prevMessage);
    socket.emit("message", message);
  } catch (error) {
    console.error("[handleSocketMessage] Error:", error);
    socket.emit("error", error.message || "An error occurred");
  }
};

module.exports = handleSocketMessage;
