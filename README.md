# Travel Companion App

## Overview
The **Travel Companion App** is a helpful tool for travelers. It allows users to enter a destination and a travel date, and then fetches the weather details and displays relevant images for the chosen location using multiple external APIs. This app is designed to assist users in planning their trips by providing real-time weather forecasts and a visual preview of their destination.

## Features
- **Enter a destination**: Users can input any city or location.
- **Enter a travel date**: Users specify their intended travel date.
- **Fetch and display weather data**: The app fetches weather details for the destination based on the date.
- **Display relevant images**: The app displays images related to the destination.

## Prerequisites

### Node.js Version
This project requires **Node.js version 18.8.1**. To check your current Node.js version, run the following command:

node -v

If you do not have the required version, download and install it from Node.js official website.

## APIs Used
This app integrates with the following external APIs:
1. **Geonames API**: Provides the geographical coordinates (latitude and longitude) based on the destination entered by the user.
2. **Weatherbit API**: Fetches the weather forecast for the destination using the geographical coordinates and travel date.
3. **Pixabay API**: Displays relevant images of the destination to provide users with a visual preview.

## Installation and Setup

Follow these steps to set up and run the project locally:

1. **Clone the repository**  
First, clone the repository to your local machine:

git clone https://github.com/your-username/travel-companion-app.git

2. **Navigate to the project directory**  
Go to the root folder of the project:

cd travel-companion-app

3. **Install dependencies**  
Install the required dependencies using npm:

npm install

4. **Set up environment variables**  
Create a .env file in the root of your project and add your API keys as follows:

# .env file content  
weatherAPIKey=your_weatherbit_key  
geoNKey=your_geonames_username  
pixKey=your_pixabay_key  

Replace your_weatherbit_key, your_geonames_username, and your_pixabay_key with the actual API keys from the respective services.

5. **Start the development server**  
To start the development server with live reloading, run:

npm run dev

This will start the development server on http://localhost:8080 with hot reloading enabled.

6. **Build for production**  
To build the app for production, run the following command:

npm run build

This will generate the production build in the dist/ directory.

7. **Start the production server**  
After building the project, start the production server:

npm run start

The production server will start on http://localhost:4000.

8. **Run tests**  
To run the unit tests and ensure everything is working properly, use:

npm run test

This command runs all the Jest tests defined for the app.

## File Structure
The project follows a standard client-server architecture. Here's an overview of the key files and directories:

├── src  
│   ├── client  
│   │   ├── js  
│   │   │   ├── main.js           # Main JavaScript file for client-side logic  
│   │   │   └── ApisCalls.js      # API call functions  
│   │   ├── styles  
│   │   │   └── styles.scss       # SCSS styling for the app  
│   │   └── views  
│   │       └── index.html        # HTML file for the app  
│   └── server  
│       └── index.js              # Express server configuration  
├── .env                          # API keys and environment variables  
├── .gitignore                    # Files and directories to ignore in Git  
├── package.json                  # Project dependencies and scripts  
├── webpack.dev.js                # Webpack configuration for development  
├── webpack.prod.js               # Webpack configuration for production  
├── README.md                     # Project documentation  

## Troubleshooting

### Common Issues
- **API errors**: If the app fails to fetch data from the APIs, ensure that your API keys are correct and that the services are not down.
- **Invalid dates**: If the weather data is not displayed correctly, check that the entered travel date is valid and not in the past.
- **Port conflicts**: If you receive an error about the port being in use, either close the application using that port or change the port in the .env file or in your server configuration.
