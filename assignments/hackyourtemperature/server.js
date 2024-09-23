import express from "express";
import { engine } from "express-handlebars";

const app = express();
const PORT = 3000;

app.use(express.json());

app.engine("handlebars", engine());
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.send("Hello from backend to frontend!");
});

app.post("/weather", (req, res) => {
  const { cityName } = req.body;

  res.send(`You entered: ${cityName}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
