/**
 * Exercise 3: Create an HTTP web server
 */

const http = require('http');
const { readFile } = require('fs/promises');


//create a server
let server = http.createServer(async function (req, res) {
	
	try{
		const htmlFile = await readFile('index.html');
		if(req.url === `/`){
			res.setHeader('Content-Type', 'text/html')
			res.write(htmlFile);
		}
		else if(req.url === `/index.js`){
			const jsFile = await readFile('index.js')
			res.setHeader('Content-Type', 'text/javascript')
			res.write(jsFile);
		}
		else if(req.url === '/style.css'){
		const cssFile = await readFile('style.css')
		res.setHeader('Content-Type','text/css')
		res.write(cssFile);
		}
	}catch(error){
		console.log(error)
		res.write('Error loading the page');
	}
	
	res.end(); // Ends the response
});

server.listen(3000); // The server starts to listen on port 3000
