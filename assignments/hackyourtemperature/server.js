import express from 'express';
import bodyParser from 'body-parser';

const PORT = process.env.PORT || 3000;

const app = express();

//-middlewares----
app.use(bodyParser.json());

//-app-routes-----
app.get('/', (req, res, next) => {
  res.send('Hello from backend to frontend!');
});

app.post('/weather/', (req, res, next) => {
  const { cityName } = req.body;
  res.send(cityName);
});

//----------------
app.listen(PORT, () => {
  console.log(`Server is listening on: ${PORT}`);
});
