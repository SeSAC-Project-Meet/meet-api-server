const { UserMeetroom } = require("../../../models/index");
const logger = require("../../../logger");

const handleGetMeetroom = async (req, res) => {
  logger.info(`[handleCreateMeetroom] user: ${req.user.dataValues.user_id}`);

  const getUserMeetroom = await UserMeetroom.findAll({
    attributes: ["meetroom_id"],
    where: {
      user_id: req.user.dataValues.user_id,
    },
  });
  logger.info(
    `[handleGetMeetroom] getUserMeetroom: ${JSON.stringify(getUserMeetroom)}`
  );

  const meetrooms = await Promise.all(
    getUserMeetroom.map(async (userMeetroom) => {
      return {
        id: userMeetroom.dataValues.meetroom_id,
      };
    })
  );

  logger.info(`[handleGetMeetroom] meetrooms: ${JSON.stringify(meetrooms)}`);
  res.status(200).json(meetrooms);
};

module.exports = handleGetMeetroom;
