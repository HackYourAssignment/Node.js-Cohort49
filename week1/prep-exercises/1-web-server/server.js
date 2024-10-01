const http = require("http");
const fs = require("fs");

let server = http.createServer(function (req, res) {
  if (req.url === "/") {
    // Serve index.html
    fs.readFile("index.html", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.write("Internal Server Error");
        res.end();
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      }
    });
  } else if (req.url === "/index.js") {
    // Serve index.js
    fs.readFile("index.js", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.write("Internal Server Error");
        res.end();
      } else {
        res.writeHead(200, { "Content-Type": "application/javascript" });
        res.write(data);
        res.end();
      }
    });
  } else if (req.url === "/style.css") {
    // Serve style.css
    fs.readFile("style.css", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.write("Internal Server Error");
        res.end();
      } else {
        res.writeHead(200, { "Content-Type": "text/css" });
        res.write(data);
        res.end();
      }
    });
  } else {
    // Handle 404 errors
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("404 Not Found");
    res.end();
  }
});

// Start the server
server.listen(3000, function () {
  console.log("Server is listening on port 3000");
});
