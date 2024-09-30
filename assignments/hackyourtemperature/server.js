import express from 'express';
const app = express();
const port = 3000;

app.use(express.json());

app.post('/weather', (req, res) => {
  const cityName = req.body.cityName;
  if (cityName) {
    res.status(200).json({ message: 'received city: ${cityName}' });
  } else {
    res.status(400).json({ error: 'cityName is required in the request body' });
  }
});
app.get('/', (req, res) => {
  res.send('hello from backend to frontend!');
});
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
