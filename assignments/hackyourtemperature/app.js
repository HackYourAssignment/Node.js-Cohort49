import express from "express";
import fetch from "node-fetch";
import { API_KEY } from "./sources/keys.js";

export const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Weather App!");
});

app.post("/weather", async (req, res) => {
  const cityName = req.body.cityName;

  if (!cityName) {
    return res.status(400).json({ weatherText: "City name is required!" });
  }

  try {
    const weatherData = await getWeatherData(cityName);

    if (weatherData.cod !== 200) {
      const errorMessage =
        weatherData.cod === "404" ? "City is not found!" : weatherData.message;

      return res.status(weatherData.cod).json({ weatherText: errorMessage });
    }

    const temp = weatherData.main.temp;
    return res
      .status(200)
      .json({ weatherText: `The weather in ${cityName} is ${temp}°C` });
  } catch (error) {
    return res.status(500).json({ weatherText: "Something went wrong!" });
  }
});

const getWeatherData = async (cityName) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${API_KEY}&units=metric`
  );
  return await response.json();
};
