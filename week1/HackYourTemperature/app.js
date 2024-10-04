import express from "express";
import fetch from "node-fetch";
import keys from "./sources/keys.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

app.post("/weather", async (req, res) => {
  const cityName = req.body.cityName;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${keys.API_KEY}&units=metric`
    );
    const data = await response.json();

    if (data.cod === "404") {
      return res.status(404).json({ weatherText: "City is not found!" });
    }

    const temperature = data.main.temp;
    res.status(200).json({
      weatherText: `The temperature in ${cityName} is ${temperature}°C`
    });
  } catch (error) {
    res.status(500).json({ weatherText: "An error occurred." });
  }
});

export default app;
