const fs = require('fs');

const textFileLocation = 'temporary\\fileA.txt';
const test = 'I am a test text';
const text = 'that tests texts';
const testText = 'and texts tests';

for (let i = 0; i < 3; i++) fs.writeFileSync(
  textFileLocation, 
  `${test} ${text} ${testText} #${i + 1}!\n`, 
  { flag:'a'}
  );
const fileContent = fs.readFileSync(textFileLocation, 'utf8');
console.log(fileContent);