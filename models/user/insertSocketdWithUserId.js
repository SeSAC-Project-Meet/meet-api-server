const User_socket = require("../define/User_socket");

const insertSocketIdWithUserId = async (user_id, socket_id) => {
  User_socket.create({
    user_id,
    socket_id,
    status: true,
  })
    .then((result) => {
      // console.log(result);
      return result;
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
};

module.exports = insertSocketIdWithUserId;
