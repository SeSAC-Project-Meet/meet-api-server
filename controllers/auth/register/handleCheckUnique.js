const checkUniqueEmail = require("../../../services/auth/checkUniqueEmail");
const checkUniquePhoneNumber = require("../../../services/auth/checkUniquePhoneNumber");

const handleCheckUnique = async (req, res) => {
  const { type, value } = req.body;
  if (type === "email") {
    const result = await checkUniqueEmail(value);
    return res.status(result.status).json({ message: result.message });
  } else if (type === "phone_number") {
    const result = await checkUniquePhoneNumber(value);
    return res.status(result.status).json({ message: result.message });
  }
};

module.exports = handleCheckUnique;
