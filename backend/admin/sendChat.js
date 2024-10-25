const config = require("../config.json").AWS;
const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");

const client = new SNSClient({
  region: "ap-northeast-1",
  credentials: {
    accessKeyId: config.AWS_SESAC_ACCESS_KEY,
    secretAccessKey: config.AWS_SESAC_SECRET_KEY,
  },
});

const sendSMS = async () => {
  const params = {
    Message: "MESSAGE",
    PhoneNumber: "",
  };

  try {
    const command = new PublishCommand(params);
    const data = await client.send(command);
    console.log("Message sent successfully:", data);
  } catch (err) {
    console.error("Error sending message:", err);
  }
};

sendSMS();
