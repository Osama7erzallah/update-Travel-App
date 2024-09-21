import { getCoord, getWeather, getCImg } from "./Apis.js";
import {
  DisWInfo,
  DisCImg,
  showEM,
} from "./UI.js";

/**
 * Handle form submission when the user submits the destination and date.
 * It fetches the coordinates, weather, and city image data.
 * @param {Event} e - The event triggered by form submission.
 */
export const HSubmit = async (e) => {
  e.preventDefault(); // Prevent form from submitting in the traditional way.

  // Get the input values from the form
  const city = document.getElementById("destination").value;
  const date = document.getElementById("departureDate").value;

  try {
    // Fetch coordinates based on the city name
    const coordinates = await getCoord(city);
    const { latitude, longitude } = coordinates; // Destructure the coordinates

    // Fetch weather data using the latitude, longitude, and the chosen date
    const WData = await getWeather(latitude, longitude, date);

    // Update the UI with the fetched weather information
    DisWInfo(WData, city);

    // Fetch an image for the city and update the UI with the image URL
    const imgD = await getCImg(city);
    DisCImg(imgD.imgUrl);
  } catch (e) {
    // Log and display an error message in case of failure
    console.error("Error:", e);
    showEM("Failed to fetch data. Please try again.");
  }
};
