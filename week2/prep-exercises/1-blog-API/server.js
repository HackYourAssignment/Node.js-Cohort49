const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const PORT = 4000;

app.use(express.json());

// 1 creating a blog
app.post('/blogs', (req, res) => {
  const { title, content } = req.body;
  fs.writeFileSync(`${title}.txt`, content);
  res.send('Blog created');
});

// 1.2 updating existing posts

app.put('/blogs/:title', (req, res) => {
  const title = req.params.title;
  const { content } = req.body;
  if (!content) {
    return res.status(400).send('Content is required');
  }
  try {
    if (fs.existsSync(path.join(__dirname, title))) {
      fs.writeFileSync(path.join(__dirname, title), content);
      res.send('Blog updated');
    } else {
      res.status(404).send('Blog not found');
    }
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

// 1.3 deleting existing posts

app.delete('/blogs/:title', (req, res) => {
  const title = req.params.title;
  if (fs.existsSync(path.join(__dirname, title))) {
    fs.unlinkSync(path.join(__dirname, title));
    res.send('Blog deleted');
  } else {
    res.status(404).send('Blog not found');
  }
});
// 1.4 reading existing posts

app.get('/blogs/:title', (req, res) => {
  const title = req.params.title;
  if (fs.existsSync(path.join(__dirname, title))) {
    const content = fs.readFileSync(path.join(__dirname, title), 'utf8');
    res.send(content);
  } else {
    res.status(404).send('Blog not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
