import express from "express";
import keys from "./src/keys.js";


const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from backend to frontend!");
});

app.post("/weather", async (req, res) => {
  const cityName = req.body.cityName;

  if (!cityName) {
    return res.status(400).json({ weatherText: "City name is required" });
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${keys.API_KEY}&units=metric`
    );

    const data = await response.json();

    if (response.status === 404) {
      return res.status(404).json({ weatherText: "City is not found!" });
    }

    const temperature = data.main.temp;
    return res.status(200).json({
      weatherText: `The weather in ${cityName} is ${temperature}°C`,
    });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
});

export default app;
