import axios from "axios";
import { getCoord, getWeather, getCImg } from "../Apis";

jest.mock("axios");

describe("API Functions", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  // Test for successful fetching of coordinates
  test("getCoord returns data on success", async () => {
    const mockResponse = {
      latitude: 51.5074,
      longitude: -0.1278,
      CName: "London",
      countryName: "United Kingdom",
    };
    axios.get.mockResolvedValue({ data: mockResponse });

    const data = await getCoord("London");

    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:4000/api/coordinates",
      { params: { city: "London" } }
    );
    expect(data).toEqual(mockResponse);
  });

  // Test for error handling in fetching coordinates
  test("getCoord handles errors", async () => {
    const errorMessage = "Network Error";
    axios.get.mockRejectedValue(new Error(errorMessage));

    await expect(getCoord("London")).rejects.toThrow(errorMessage);
  });

  // Test for successful fetching of weather data
  test("getWeather returns data on success", async () => {
    const mockResponse = {
      temperature: 15,
      description: "Clear sky",
      icon: "01d",
    };
    axios.get.mockResolvedValue({ data: mockResponse });

    const data = await getWeather(51.5074, -0.1278, "2024-09-01");

    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:4000/api/weather",
      { params: { lat: 51.5074, lng: -0.1278, date: "2024-09-01" } }
    );
    expect(data).toEqual(mockResponse);
  });

  // Test for error handling in fetching weather data
  test("getWeather handles errors", async () => {
    const errorMessage = "Network Error";
    axios.get.mockRejectedValue(new Error(errorMessage));

    await expect(getWeather(51.5074, -0.1278, "2024-09-01")).rejects.toThrow(
      errorMessage
    );
  });

  // Test for successful fetching of city image
  test("getCImg returns data on success", async () => {
    const mockResponse = { imgUrl: "https://example.com/image.jpg" };
    axios.get.mockResolvedValue({ data: mockResponse });

    const data = await getCImg("London");

    expect(axios.get).toHaveBeenCalledWith("http://localhost:4000/api/image", {
      params: { city: "London" },
    });
    expect(data).toEqual(mockResponse);
  });

  // Test for error handling in fetching city image
  test("getCImg handles errors", async () => {
    const errorMessage = "Network Error";
    axios.get.mockRejectedValue(new Error(errorMessage));

    await expect(getCImg("London")).rejects.toThrow(errorMessage);
  });
});
