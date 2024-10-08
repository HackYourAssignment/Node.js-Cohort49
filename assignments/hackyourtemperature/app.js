import express from 'express';
import fetch from 'node-fetch';
import keys from './sources/keys.js';

const app = express();
app.use(express.json()); 

app.post('/weather', async (req, res) => {
  const cityName = req.body.cityName;

  if (!cityName) {
    return res.status(400).send({ weatherText: "City name is required!" });
  }

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${keys.API_KEY}&units=metric`);
    const data = await response.json();

    if (response.ok) {
      const temperature = data.main.temp;
      return res.send({ weatherText: `The current temperature in ${cityName} is ${temperature}°C` });
    } else if (response.status === 401) {
      return res.status(401).send({ weatherText: "Invalid or expired API key." });
    } else if (response.status === 404) {
      return res.status(404).send({ weatherText: "City not found!" });
    } else {
      return res.status(response.status).send({ weatherText: `Unexpected error: ${response.statusText}` });
    }
  } catch (error) {
    return res.status(500).send({ weatherText: "An error occurred while fetching weather data." });
  }
});


export default app;
