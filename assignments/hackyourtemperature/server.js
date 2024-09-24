import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});
app.use(express.json());
app.post("/weather", (req, res) => {
  const cityName = req.body.cityName;
  res.send(cityName);
});

app.listen(3000);
