const { writeFile, readFile } = require("fs").promises;

const tempFile = './temporary/temp.txt';
const text = 'I am a test text that tests texts and texts tests';
const flagA = { flag: 'a' }
const utf8 = 'utf8';


writeFile(tempFile, `1 ${text}\n`)
  .then(() => writeFile(tempFile, `2 ${text} \n`, flagA))
  .then(() => writeFile(tempFile, `3 ${text} \n`, flagA))
  .then(() => readFile(tempFile, utf8))
  .then((result) => console.log(result))
  .catch((error) => console.log(error));
