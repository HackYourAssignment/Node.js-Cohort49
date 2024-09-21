/**
 * Exercise 3: Create an HTTP web server
 */

const http = require('http');
const fs = require('fs'); // import the file system module

//create a server
let server = http.createServer(function (req, res) {
  // we check if the request URL(req.url) is /, if it is, we use fs.readFile() to read the index.html file
  // if success, we set the content-Type to text/html and send the file content as the response.

  if (req.url === '/') {
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.writeHead(500, { 'content-type': 'text/plain' });
        res.end('service error');
      } else {
        res.writeHead(200, { 'content-type': 'text/html' });
        res.end(data);
      }
    });
  } else if (req.url === '/index.js') {
    fs.readFile('index.js', (err, data) => {
      if (err) {
        res.writeHead(500, { 'content-type': 'text/plain' });
        res.end('service error');
      } else {
        res.writeHead(200, { 'content-type': 'application/javascript' });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, { 'content-type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(3000); // The server starts to listen on port 3000
