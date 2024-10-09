import express from "express";
import fetch from "node-fetch";
import { API_KEY } from "./sources/keys.js";

const app = express();

app.use(express.json());
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

app.post("/weather", async (req, res) => {
  if (!req.body.cityName) {
    return res.status(400).send({ weatherText: "City name is required!" });
  }

  const cityName = req.body.cityName;
  const url = `${baseUrl}?q=${cityName}&APPID=${API_KEY}&units=metric`;

  const response = await fetch(url);

  if (!response.ok) {
    return res.status(404).send({ weatherText: "City is not found!" });
  }

  const data = await response.json();

  res.status(200).send({ [data.name]: data.main.temp });
});

export default app;
