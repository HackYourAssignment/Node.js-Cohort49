const express = require("express");
const { engine } = require("express-handlebars");
const fetch = require("node-fetch");
const keys = require("./src/keys");

const app = express();
app.use(express.json());

app.engine("handlebars", engine());
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.send("Hello from backend to frontend!");
});

app.post("/weather", async (req, res) => {
  const { cityName } = req.body;

  if (!cityName) {
    return res.status(400).json({ error: "City name is required." });
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${keys.API_KEY}&units=metric`,
    );

    const weatherData = await response.json();

    if (weatherData.cod === "404") {
      return res.status(404).json({ weatherText: "City is not found!" });
    }

    const temperature = weatherData.main.temp;
    res.json({
      weatherText: `The temperature in ${cityName} is ${temperature}°C.`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching weather data." });
  }
});

module.exports = app;
