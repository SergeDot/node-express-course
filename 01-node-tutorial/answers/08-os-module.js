const os = require('os');
const path = require('path');

const userInfo = os.userInfo();
console.log(`this is the user's info: `, userInfo);
console.log(`this is the user's uptime: `, os.uptime());

let userDir = os.userInfo().homedir;
const defaultSep = path.sep;
let re = new RegExp(`([^\\${defaultSep}]+$)`, 'g')
let userName = userDir.match(re)[0];
console.log(`this is the user's name: `, userName);

const currentOS = {
  name: os.type(),
  release: os.release(),
  totalMem: os.totalmem(),
  freeMem: os.freemem()
}

console.log(currentOS);