const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("You have built you API 🎉");
});

app.post("/blogs", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).send("Title and content are required");
  }

  try {
    fs.writeFileSync(`./${title}.txt`, content);
    res.status(201).send("Blog created");
  } catch (err) {
    res.status(500).send("An error occurred while creating the blog");
  }
});

app.put("/blogs/:title", (req, res) => {
  const { title } = req.params;
  const { content } = req.body;

  if (!content) {
    return res.status(400).send("Content is required");
  }

  if (fs.existsSync(`./${title}.txt`)) {
    try {
      fs.writeFileSync(`./${title}.txt`, content);
      res.send("Blog updated");
    } catch (err) {
      res.status(500).send("An error occurred while updating the blog");
    }
  } else {
    res.status(404).send("This post does not exist!");
  }
});

app.delete("/blogs/:title", (req, res) => {
  const { title } = req.params;

  if (fs.existsSync(`./${title}.txt`)) {
    try {
      fs.unlinkSync(`./${title}.txt`);
      res.send("Blog deleted");
    } catch (err) {
      res.status(500).send("An error occurred while deleting the blog");
    }
  } else {
    res.status(404).send("This post does not exist!");
  }
});

app.get("/blogs/:title", (req, res) => {
  const { title } = req.params;

  if (fs.existsSync(`./${title}.txt`)) {
    try {
      const content = fs.readFileSync(`./${title}.txt`, "utf8");
      res.send(content);
    } catch (err) {
      res.status(500).send("An error occurred while reading the blog");
    }
  } else {
    res.status(404).send("This post does not exist!");
  }
});

app.get("/blogs", (req, res) => {
  try {
    const files = fs.readdirSync("./");
    const blogs = files
      .filter((file) => file.endsWith(".txt"))
      .map((file) => ({
        title: file.replace(".txt", ""),
      }));
    res.json(blogs);
  } catch (err) {
    res.status(500).send("An error occurred while reading the blogs");
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
