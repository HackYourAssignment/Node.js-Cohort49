const http = require('http');
const fs = require('fs').promises; 

let server = http.createServer(async function (req, res) {
  try {
    if (req.url === '/') {
      const html = await fs.readFile('index.html');
      res.setHeader('Content-Type', 'text/html');
      res.write(html);
    } else if (req.url === '/index.js') {
      const js = await fs.readFile('index.js');
      res.setHeader('Content-Type', 'application/javascript');
      res.write(js);
    } else if (req.url === '/style.css') {
      const css = await fs.readFile('style.css');
      res.setHeader('Content-Type', 'text/css');
      res.write(css);
    } else {
      res.statusCode = 404;
      res.write('404: Not Found');
    }
  } catch (error) {
    res.statusCode = 500;
    res.write('Server error');
  }
  res.end(); 
});

server.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
