const http = require('http');

const server = http.createServer((req, res) => {
  res.write('<h1 style="font-size: 80px">Welcome</h1>');
  res.end();
});

server.listen(3000);
