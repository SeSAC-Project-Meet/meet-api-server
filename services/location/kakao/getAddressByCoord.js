const axios = require("axios");
const logger = require("../../../logger");
const config = require("../../../config.json").development;

const getAddressByCoord = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lon}&y=${lat}`,
      {
        headers: {
          Authorization: `KakaoAK ${config.KAKAO_REST_API_KEY}`,
        },
      }
    );
    logger.info(
      `[getAddressByCoord] Response: ${JSON.stringify(response.data, null, 2)}`
    );
    const areaName = response.data.documents[0].region_2depth_name;
    logger.info(`[getAddressByCoord] AreaName: ${areaName}`);
    return areaName;
  } catch (error) {
    logger.error(`[getAddressByCoord] Error: ${error}`);
    return null;
  }
};

getAddressByCoord(37.553325, 126.951972);

module.exports = getAddressByCoord;
