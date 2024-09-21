/**
 * Updates the weather information on the UI for a given destination.
 * @param {Object} WDetails - The weather data including temperature and description.
 * @param {string} city - The destination for which the weather data is displayed.
 */
const DisWInfo = (WDetails, city) => {
  const WResultsE = document.getElementById("weather-results");
  WResultsE.style.display = "block"; // Make the weather results section visible

  // Construct the weather information display
  const WInfo = `
        <div>
            <strong>${city}</strong><br>
            Temperature: ${WDetails.temperature}<br>
            Description: ${WDetails.description}<br>
            <p>Icon: ${WDetails.icon} </p>
        </div>
    `;

  // Append the constructed weather information to the weather results element
  WResultsE.innerHTML = WInfo;
};

/**
 * Updates the image section of the UI with the city image.
 * @param {string} imgUrl - The URL of the city image.
 */
const DisCImg = (imgUrl) => {
  const imgSection = document.getElementById("image-container");

  // Clear any previous image
  imgSection.innerHTML = "";

  // Create a new image element and set its source
  const imgElement = document.createElement("img");
  imgElement.src = imgUrl;

  // Append the new image to the image container
  imgSection.appendChild(imgElement);
};

/**
 * Displays an error message to the user using an alert.
 * @param {string} M - The error message to display.
 */
const showEM = (M) => {
  alert(M); // Show error message in an alert dialog
};

// Export the functions for use in other files
export { DisWInfo, DisCImg, showEM };
