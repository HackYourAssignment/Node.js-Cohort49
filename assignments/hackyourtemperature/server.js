import fetch from 'node-fetch';
import { API_KEY } from './source/key.js';
import express from 'express';

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

    if (data.cod === '404') {
      return res.status(404).json({ error: 'city not found' });
    }
    const temperature = data.main.temp;

    res.status(200).json({
      weatherText: `The temperature in ${cityName} is ${temperature}°C`,
    });
  } catch (error) {
    res.status(500).json({ error: 'server error' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
