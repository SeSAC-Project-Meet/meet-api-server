const axios = require("axios");
const logger = require("../../../logger");
const config = require("../../../config.json").development;

const getLocationByKeyword = async (keyword) => {
  try {
    const response = await axios.get(
      `https://dapi.kakao.com/v2/local/search/keyword.json?query=${keyword}`,
      {
        headers: {
          Authorization: `KakaoAK ${config.KAKAO_REST_API_KEY}`,
        },
      },
    );
    logger.info(
      `[getLocationByKeyword] Response: ${JSON.stringify(response.data, null, 2)}`,
    );
    return response.data;
  } catch (error) {
    logger.error(`[getLocationByKeyword] Error: ${error}`);
    return null;
  }
};

module.exports = getLocationByKeyword;
