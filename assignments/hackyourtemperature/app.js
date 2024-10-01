import express from "express";
import { keys } from "./sources/keys.js";
import fetch from "node-fetch";
 const app = express();

app.use(express.json());


app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});


app.post("/weather", async (req, res) => {
  try {
    const cityName = req.body.cityName;
    const isValidCityName = /^[A-Za-z\s]+$/.test(cityName);
    if (!cityName || !isValidCityName) {
      return res.status(400).json({ error: "Invalid city name" });
    }
 
    const unit = 'metric';
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${keys.API_KEY}&units=${unit}`
    );

    if (!response.ok) {
      return res
        .status(404)
        .json({ weatherText: "City is not found!" });
    }

    const data = await response.json();
    console.log(data);
    return res.json({
        cityName: cityName,
        message: `The temperature in ${cityName} is between a low of ${data.main.temp_min} °C and a high of ${data.main.temp_max} °C.`,
      });


  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
});

export default app;