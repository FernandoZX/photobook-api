const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World 312321321312!\n');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const server = http.createServer(app);

server.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
