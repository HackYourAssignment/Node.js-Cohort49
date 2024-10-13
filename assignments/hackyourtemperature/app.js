import fetch from 'node-fetch';

import express from 'express';

const API_KEY = '5b880f4ee3e43bab62bd1d03019f09c2';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello from backend to frontend');
});

app.post('/weather', async (req, res) => {
  const cityName = req.body.cityName;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
  if (!cityName) {
    return res.status(400).json({ error: 'cityName is required' });
  }
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === '404') {
      return res.status(404).json({ weatherText: 'city is not found' });
    } else if (!response.ok) {
      return res.status(response.status).json({ error: 'city not found' });
    }

    const temperature = data.main.temp;

    res.status(200).json({
      weatherText: `The temperature in ${cityName} is ${temperature}°C`,
    });
  } catch (error) {
    res.status(500).json({ error: 'server error' });
  }
});

export default app;
