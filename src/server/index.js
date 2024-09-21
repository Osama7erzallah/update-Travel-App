const express = require("express");
const axios = require("axios");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../../dist")));

const PORT = process.env.PORT || 4000;

/**
 * Fetch coordinates for a given city from the GeoNames API.
 * @param {string} C - The name of the city to fetch coordinates for.
 * @returns {Object} - The latitude, longitude, city name, and country name.
 */
const getCCoord = async (C) => {
  const geoNKey = process.env.geoNKey;
  const apiUrl = `https://secure.geonames.org/searchJSON?q=${C}&maxRows=1&username=${geoNKey}`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (data.geonames.length > 0) {
      const { lat, lng, name, countryName } = data.geonames[0];
      return { latitude: lat, longitude: lng, CName: name, countryName };
    } else {
      throw new Error("No data found for the specified location");
    }
  } catch (e) {
    console.error("Error fetching city coordinates:", e);
    throw new Error("Unable to fetch city coordinates");
  }
};

/**
 * Fetch an image for a given city from the Pixabay API.
 * @param {string} C - The name of the city to fetch the image for.
 * @returns {string} - The URL of the image.
 */
const getCImg = async (C) => {
  const pixKey = process.env.pixKey;
  const apiUrl = `https://pixabay.com/api/?key=${pixKey}&q=${encodeURIComponent(
    C
  )}&image_type=photo`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    return data.hits.length > 0 ? data.hits[0].webformatURL : "";
  } catch (e) {
    console.error("Error fetching image from Pixabay:", e);
    throw new Error("Unable to fetch city image");
  }
};

/**
 * Calculate the number of days remaining until a target date.
 * @param {string} targetDate - The future date to calculate days until.
 * @returns {number} - The number of days until the target date.
 */
const calculateDaysUntil = (targetDate) => {
  const today = new Date();
  const target = new Date(targetDate);
  const TDiff = target - today;
  const DDiff = Math.ceil(TDiff / (1000 * 60 * 60 * 24));
  return DDiff;
};

/**
 * Fetch the weather forecast for a given location and date using the Weatherbit API.
 * @param {number} lat - The latitude of the location.
 * @param {number} lng - The longitude of the location.
 * @param {string} date - The future date for which to fetch weather data.
 * @returns {Object} - The temperature, weather description, and weather icon.
 */
const getWeatherForecast = async (lat, lng, date) => {
  const WKey = process.env.weatherAPIKey;
  const remainingDays = calculateDaysUntil(date);
  const apiUrl = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&units=M&key=${WKey}&days=${remainingDays}`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (data.data.length > 0) {
      const { temp, weather } = data.data[0];
      return {
        temperature: temp,
        description: weather.description,
        icon: weather.icon,
      };
    } else {
      throw new Error("No weather data available");
    }
  } catch (e) {
    console.error("Error fetching weather forecast:", e);
    throw new Error("Unable to fetch weather forecast");
  }
};

// Serve the main index.html file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Endpoint to get city coordinates
app.get("/api/coordinates", async (req, res) => {
  const C = req.query.city;

  if (!C) {
    return res.status(400).json({ error: "City parameter is required" });
  }

  try {
    const coordinates = await getCCoord(C);
    res.json(coordinates);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Endpoint to get weather forecast
app.get("/api/weather", async (req, res) => {
  const { lat, lng, date } = req.query;
  if (!lat || !lng || !date) {
    return res
      .status(400)
      .json({ error: "Latitude, Longitude, and Date parameters are required" });
  }

  try {
    const weatherForecast = await getWeatherForecast(lat, lng, date);
    res.json(weatherForecast);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Endpoint to get city image
app.get("/api/image", async (req, res) => {
  const c = req.query.city;

  if (!c) {
    return res.status(400).json({ error: "City parameter is required" });
  }

  try {
    const imgUrl = await getCImg(c);
    res.json({ imgUrl });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = app;

if (process.env.NODE_ENV !== "test") {
  // Start the server only when not in testing mode
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}
