const fs = require('fs');

const textFileLocation = 'temporary\\fileB.txt';
const test = 'I am an async that syncs async\'fully.';
const text = 'If an async is sync\'ed sync\'fully';
const testText = 'is ain\'t sync\'ing async\'fully if at all';
let flag = '';

for (let i = 0; i < 3; i++) {
  if (i) flag = {flag: 'a'};
  fs.writeFileSync(
    textFileLocation, 
    `${test} ${text} ${testText} #${i + 1}!\n`, 
    flag,
    (err, result) => {
      if (err) {
        console.log(err);
        return;
      };
      console.log(result);
    }
    );
  };

const fileContent = fs.readFileSync(textFileLocation, 'utf8', (err, result) => {
  if (err) {
    console.log(err);
    return;
  };
  return result;
});
console.log(fileContent);