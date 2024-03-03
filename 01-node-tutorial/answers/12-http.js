const http = require('http')

const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.end(`<h1 style="font-size: 80px">Welcome stranger</h1>
    <ul><li><a href="/about">about</a></li><li><a href="/not_about">not about</a></li><li><a href="yes_i_am">are you sure?</a></li></ul>`);
  } else if (req.url === '/about') {
    res.end(`<h1 style="font-size: 80px">This is a page. Just a page.<br>
    You can turn it <a href="/">back</a> any time</h1>`);
  } else if (req.url === '/lkejlkejfldsahgodsjdsafkjdsgfikjnflsdf') {
    res.end(`<h1 style="font-size: 80px">No way you ended up here just typing randomly!<br>
    You are definitely a Lucky Person!<br>
    Now it is time to go <a href="/">back</a>.</h1>`);
  } else {
    res.end(`<h1 style="font-size: 80px">Pardon, this may have been a wrong turn.<br>
    This <a href="/">link</a> will take you back safely</h1>`);
  };
});

/*
const server = http.createServer(function (req, res) {
  if (req.url === '/'){
    res.end('Welcome to our home page')
  }
  if (req.url === '/about'){
    res.end('Here is our short history')
  }
  res.end(`<h1>Oops!</h1>
  <p>We can't seems to find the page you are looking for</p>
  <a href="/">back home</a>`)
})
*/
server.listen(port, () => {
  console.log(`The server is listening on port ${port}.`);
});
