import express from 'express';
import { getCurrentWeather } from './openWeatherAPI.js';

const app = express();
//-middlewares----
app.use(express.json());

//-app-routes-----
app.get('/', (req, res, next) => {
  res.send(
    'To get the weather make a post request to "/weather" with the body request {cityName: <city>}',
  );
});

app.post('/weather', async (req, res, next) => {
  const { cityName } = req.body;
  if (!cityName)
    return res.status(400).json({ error: 'Required information is missing' });

  const data = await getCurrentWeather(cityName);

  const statusCode = !data ? 404 : 200;
  const weatherText = !data
    ? `City: ${cityName}, is not found! `
    : `The temperature in ${data.city} is ${data.temp}. ${data.description}`;

  res.status(statusCode).send({ weatherText });
});

//-for undefined routes ----
app.use((req, res, next) => {
  res.status(404).send({ message: 'Route not found!' });
});

export default app;
