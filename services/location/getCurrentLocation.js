const axios = require("axios");

async function getCurrentLocation() {
  try {
    const url = "http://ip-api.com/json/24.48.0.1?fields=66846719";
    const response = await axios.get(url);
    console.log(`Response: ${JSON.stringify(response.data, null, 2)}`);
    const { lat, lon } = response.data;
    console.log(`Latitude: ${lat}, Longitude: ${lon}`);
  } catch (error) {
    console.error("Error fetching location:", error);
  }
}

getCurrentLocation();
