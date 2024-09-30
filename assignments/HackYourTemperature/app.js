import express from 'express';
import fetch from 'node-fetch';
import { API_KEY } from './sources/keys.js'; 

const app = express();
app.use(express.json()); 

app.post('/weather', async (req, res) => {
  const { cityName } = req.body; 


  if (!cityName) {
    return res.status(400).json({ error: 'cityName is required' });
  }

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`);
    const data = await response.json();


    if (data.cod !== 200) {
      return res.status(data.cod).json({ error: data.message });
    }

    const temperature = data.main.temp;
    res.json({ weatherText: `The temperature in ${cityName} is ${temperature}°C` });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default app;
