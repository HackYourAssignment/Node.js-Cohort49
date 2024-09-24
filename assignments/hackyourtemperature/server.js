import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from backend to frontend!");
});

app.post("/weather", (req, res) => {
  const { cityName } = req.body;
  if (cityName) {
    res.json({ message: `You submitted: ${cityName}` });
  } else {
    res.status(400).json({ error: "No cityName provided" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
