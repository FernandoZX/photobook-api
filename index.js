const http = require('http');

const app = require('./server/');
const config = require('./server/config/');

const {
  port,
  hostname,
} = config.server;
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World 312321321312!\n');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

const server = http.createServer(app);

// server.listen(3000, () => {
//   console.log('Example app listening on port 3000!');
// });

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
