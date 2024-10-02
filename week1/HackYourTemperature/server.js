import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

app.post("/weather", (req, res) => {
  const cityName = req.body.cityName;
  res.send(`You have submitted: ${cityName}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
