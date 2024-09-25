import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello From Backend to Frontend!');
});

app.post('/weather', (req, res) => {
  const cityName = req.body.cityName;
  res.send(`you are looking for the weather in ${cityName}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})