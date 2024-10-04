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
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${API_KEY}&units=metric`
    );
    const data = await response.json();

    if (data.cod !== 200) {
      if (data.cod === "404") {
        return res.status(data.cod).json({ weatherText: "City is not found!" });
      }

      return res.status(data.cod).json({ weatherText: `${data.message}` });
    }

    const temp = data.main.temp;
    return res
      .status(200)
      .json({ weatherText: `The weather in ${cityName} is ${temp}°C` });
  } catch (error) {
    return res.status(500).json({ weatherText: "Something went wrong!" });
  }
});
