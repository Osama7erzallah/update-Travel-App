process.env.NODE_ENV = "test"; // Setting the environment to test
const request = require("supertest");
const express = require("express");
const app = require("../index");

jest.mock("axios");
const axios = require("axios");

const mockCimgUrl =
  "https://pixabay.com/get/g25c53b440669a8f5831517df9…206381c48edfe1e051a651a313a02e32f80345b26_640.jpg";

describe("API Endpoints", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  // Test if GET /api/coordinates returns 400 if no city is provided
  test("GET /api/coordinates returns 400 if city is not provided", async () => {
    const response = await request(app).get("/api/coordinates");

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("City parameter is required");
  });

  // Test if GET /api/weather returns 400 if latitude, longitude, or date is missing
  test("GET /api/weather returns 400 if parameters are missing", async () => {
    const response = await request(app)
      .get("/api/weather")
      .query({ lat: 51.5074, lng: -0.1278 });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      "Latitude, Longitude, and Date parameters are required"
    );
  });

  // Test if GET /api/image returns the correct city image URL
  test("GET /api/image returns city image URL", async () => {
    axios.get.mockResolvedValue({
      data: { hits: [{ webformatURL: mockCimgUrl }] },
    });

    const response = await request(app)
      .get("/api/image")
      .query({ city: "London" });

    expect(response.status).toBe(200);
    expect(response.body.imgUrl).toBe(mockCimgUrl);
  });

  // Test if GET /api/image returns 400 if no city is provided
  test("GET /api/image returns 400 if city is not provided", async () => {
    const response = await request(app).get("/api/image");

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("City parameter is required");
  });
});
