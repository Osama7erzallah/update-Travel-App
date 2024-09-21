import axios from "axios";

const URL = "http://localhost:4000/api";

/**
 * Fetch coordinates for a given location (city).
 * @param {string} CName - The name of the city.
 * @returns {Promise<Object>} - Returns the coordinates and city details.
 */
const getCoord = async (CName) => {
  try {
    const response = await axios.get(`${URL}/coordinates`, {
      params: { city: CName },
    });
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.error("Error fetching coordinates:", e);
    throw e;
  }
};

/**
 * Fetch weather data for a specific latitude, longitude, and date.
 * @param {number} latitude - The latitude of the location.
 * @param {number} longitude - The longitude of the location.
 * @param {string} date - The date for the weather forecast.
 * @returns {Promise<Object>} - Returns the weather details for the location.
 */
const getWeather = async (latitude, longitude, date) => {
  try {
    const response = await axios.get(`${URL}/weather`, {
      params: { lat: latitude, lng: longitude, date },
    });
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.error("Error fetching weather:", e);
    throw e;
  }
};

/**
 * Fetch an image URL for a given location (city).
 * @param {string} CName - The name of the city.
 * @returns {Promise<Object>} - Returns the image URL for the city.
 */
const getCImg = async (CName) => {
  try {
    const response = await axios.get(`${URL}/image`, {
      params: { city: CName },
    });
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.error("Error fetching image:", e);
    throw e;
  }
};

export { getCoord, getWeather, getCImg };
