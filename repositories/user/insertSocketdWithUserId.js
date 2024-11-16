const { User_socket } = require("../../models/index");

const insertSocketIdWithUserId = async (user_id, socket_id) => {
  try {
    const result = await User_socket.create({
      user_id,
      socket_id,
      status: true,
    });
    return result;
  } catch (error) {
    console.error("Error inserting socket ID with user ID:", error);
    return null;
  }
};

module.exports = insertSocketIdWithUserId;
