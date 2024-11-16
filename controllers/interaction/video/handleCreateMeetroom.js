const { Meetroom, UserMeetroom } = require("../../../models/index");
const logger = require("../../../logger");

const handleCreateMeetroom = async (req, res) => {
  logger.info(`[handleCreateMeetroom] user: ${req.user.dataValues.user_id}`);

  const meetroom = await Meetroom.create({});
  const meetroom_id = meetroom.dataValues.meetroom_id;

  const registerUserToMeetroom = await UserMeetroom.create({
    meetroom_id,
    user_id: req.user.dataValues.user_id,
  });
  res.status(201).json({
    user_meetroom_id: registerUserToMeetroom.user_meetroom_id,
    meetroom_id: meetroom.meetroom_id,
  });
};

module.exports = handleCreateMeetroom;
