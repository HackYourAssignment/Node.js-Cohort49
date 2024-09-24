import express from 'express';
const app = express();

// Set server to listen on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.send('hello from backend to frontend!');
  });
  
  app.use(express.json());


  app.post('/weather', (req, res) => {
    const cityName = req.body.cityName;
    res.send(`You requested the weather for: ${cityName}`);
  });
  