const { User_socket } = require("../../models/index");

const getAllSocketIdByUserId = async (user_id) => {
  const result = await User_socket.findAll({
    attributes: ["socket_id"],
    where: { user_id: user_id },
  });
  if (result && result.length > 0) {
    return result.map((r) => r.dataValues.socket_id);
  }
  return null;
};

module.exports = getAllSocketIdByUserId;
