const axios = require("axios");
const logger = require("../../../logger");
const config = require("../../../config.json").development;

const getAreaNameByCoord = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${lon}&y=${lat}`,
      {
        headers: {
          Authorization: `KakaoAK ${config.KAKAO_REST_API_KEY}`,
        },
      },
    );
    logger.info(
      `[getAreaNameByCoord] Response: ${JSON.stringify(response.data, null, 2)}`,
    );
    const areaName = response.data.documents[0].region_2depth_name;
    logger.info(`[getAreaNameByCoord] AreaName: ${areaName}`);
    return areaName;
  } catch (error) {
    logger.error(`[getAreaNameByCoord] Error: ${error}`);
    return null;
  }
};

module.exports = getAreaNameByCoord;
