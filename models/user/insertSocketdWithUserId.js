const User_socket = require("../define/User_socket");

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