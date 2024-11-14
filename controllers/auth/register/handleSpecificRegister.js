const User_profile = require("../../../models/user_profile");
const User_tag = require("../../../models/user_tag");

const handleSpecificRegister = async (req, res) => {
  const { nickname, mbti_id, hashtags, introduction, areas } = req.body;
  try {
    const userProfileResult = await User_profile.create({
      user_id: req.user.user_id,
      nickname,
      introduction,
      mbti_id,
    });
    const bulkHashtags = hashtags.map((tag_id) => ({
      user_id: req.user.user_id,
      tag_id,
    }));
    const tagsResult = await User_tag.bulkCreate(bulkHashtags);

    return res.status(201).json({
      message: "회원가입 완료",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = handleSpecificRegister;
