let http = require('http');

let server = http.createServer((req, res) => {
  res.end('hello world');
});

let port = 8100;
server.listen(8100, () => {
  console.log(`listening on port 8100`);
  console.log('try to visit http://localhost:8100');
});
