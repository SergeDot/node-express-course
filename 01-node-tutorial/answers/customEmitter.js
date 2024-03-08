const EventEmitter = require('events');
const http = require('http');

const simpleEmitter = new EventEmitter();

simpleEmitter.on('simpleMessage', msg => {
  console.log(`Look I am a simple message: ${msg}`);
});

simpleEmitter.emit('simpleMessage', 'That\'s all Folks!');

const serverEmitter = new EventEmitter();
serverEmitter.on('triggerEvent', (html, page404) => {
  const port = 3000;
  const simpleServer = http.createServer();
  simpleServer.on('request', (req, res) => {
    const emitPage = new EventEmitter();
    emitPage.on('/', () => {
      res.end(html);
    });
    emitPage.on('/about', () => {
      res.end(page404);
    });
    emitPage.emit(req.url);
  });

  simpleServer.listen(port, () => {
    console.log(`The server is listening on port ${port}.`);
  });
});

const homePageSource = `<h1 style="font-size: 80px">Welcome stranger</h1>
<ul><li><a href="/about">about</a></li></ul>`;
const errorPage = `<h1 style="font-size: 80px">Pardon, this may have been a wrong turn.<br>
This <a href="/">link</a> will take you back safely</h1>`;

serverEmitter.emit('triggerEvent', homePageSource, errorPage)

const emitter = new EventEmitter();
let hiThere = setInterval(() => {
  emitter.emit("timer", "hi there");
}, 2000);
setTimeout(() => {
  clearInterval(hiThere);
}, 10000);
emitter.on("timer", (msg) => console.log(msg));
