const config = require("../../config.json").AWS;
const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");
const logger = require("../../logger");

const client = new SNSClient({
  region: "ap-northeast-1",
  credentials: {
    accessKeyId: config.AWS_SESAC_ACCESS_KEY,
    secretAccessKey: config.AWS_SESAC_SECRET_KEY,
  },
});

const sendSMS = async (text, number) => {
  const params = {
    Message: text,
    PhoneNumber: number,
  };

  try {
    const command = new PublishCommand(params);
    const data = await client.send(command);
    logger.info(`[AWS SNS] Message sent successfully: ${data}`);
  } catch (err) {
    console.error("[AWS SNS] Error sending message:", err);
  }
};

module.exports = sendSMS;
