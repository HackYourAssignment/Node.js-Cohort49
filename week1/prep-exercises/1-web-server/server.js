const http = require('http');
const fs = require('fs');
const path = require('path');

//create a server
let server = http.createServer(function (req, res) {
  if (req.url === '/') {
    // If the URL is the root ("/"), send the index.html file
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.write('Error loading index.html');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
      }
      res.end();
    });
  } else if (req.url === '/index.js') {
    // If the URL is /index.js, send the index.js file
    fs.readFile('index.js', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.write('Error loading index.js');
      } else {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.write(data);
      }
      res.end();
    });
  } else if (req.url === '/style.css') {
    // If the URL is /style.css, send the style.css file
    fs.readFile('style.css', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.write('Error loading style.css');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.write(data);
      }
      res.end();
    });
  } else {
    // If the URL doesn't match, send a 404 Not Found response
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write('404 Not Found');
    res.end();
  }
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
