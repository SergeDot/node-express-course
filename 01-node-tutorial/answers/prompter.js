const http = require("http");
const os = require('os');
const path = require('path');
var StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};

// here, you could declare one or more variables to store what comes back from the form.
let item = "Talk to Zoltar... Give me a prompt";
let color = '';
const defaultSep = path.sep;
const info = os.userInfo().homedir;
const re = new RegExp(`([^\\${defaultSep}]+$)`, 'g');
const userName = info.match(re)[0];
const machine = os.type();
let message;
const colorList = ['lightpink', 'lightcyan', 'palegreen', 'lightgoldenrodyellow', 'pink', 'lightskyblue', 'mediumspringgreen', 'papayawhip', 'lavenderblush', 'paleturquoise', 'mediumseagreen', 'antiquewhite'];

// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.
const form = () => {
  const uptime = os.uptime();
  const humanTime = `${parseInt(uptime / 60 / 60)} hours, ${parseInt((uptime / 60)) % 60} minutes ${parseInt(uptime % 60)} seconds`;
  message = `<br><div>Your name is: <span>${userName}</span>, and you have been working on <span>${machine}</span> for <span>${humanTime}</span> already.<br>
  <span>Do not forget to take breaks!<br>All the best!</span></div>`;

  return `
  <body>
  <style>
    body {background-color:${color}}
    div {font-size:1.3em}
    span {font-weight:bold}
  </style>
  <p>${item}</p>
  <form method="POST">
  <input name="item"></input>
  <label for="colors">Choose the color of the day:</label>
  <select name="colors" id="colors">
    <option value="" selected="selected"></option>
    <option value="${colorList[Math.floor(Math.random() * colorList.length)]}">Green</option>
    <option value="${colorList[Math.floor(Math.random() * colorList.length)]}">Yellow</option>
    <option value="${colorList[Math.floor(Math.random() * colorList.length)]}">Blue</option>
    <option value="${colorList[Math.floor(Math.random() * colorList.length)]}">Red</option>
  </select>
  <button type="submit">Submit</button>
  </form>
  ${color ? '<h1>Gotcha!!! Surprise color for you!!! This is your lucky color for today! Want to try again? Click "Submit"</h1>' : ''}
  <script>
  const dropdown = document.querySelector('select');
  const labelElement = document.querySelector('label');
  const isMessagePresent = document.querySelectorAll('div').length;
  isMessagePresent ? dropdown.style.display="inline-block" : dropdown.style.display="none";
  isMessagePresent ? labelElement.style.display="inline-block" : labelElement.style.display="none";
  </script>
  </body>
  `;
};

const server = http.createServer((req, res) => {
  console.log("req.method is ", req.method);
  console.log("req.url is ", req.url);
  if (req.method === "POST") {
    getBody(req, (body) => {
      console.log("The body of the post is ", body);
      // here, you can add your own logic
      if (body["item"]) {
        item = `You said "${body["item"]}"...<br>So my guess is: ${message}`;
      } else {
        item = `You are not very talkative. But I will still tell you...${message}`;
      };
      color = body["colors"];
      // Your code changes would end here
      res.writeHead(303, {
        Location: "/",
      });
      res.end();
    });
  } else {
    res.end(form());
  }
});

server.listen(3000);
console.log("The server is listening on port 3000.");

server.on("request", (req) => {
  console.log("event received: ", req.method, req.url);
}); 