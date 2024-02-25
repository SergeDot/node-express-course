const fs = require('fs');

const textFileLocation = 'temporary\\fileB.txt';
const text = 'I am an async that syncs async\'fully. If an async is sync\'ed sync\'fully it ain\'t sync\'ing async\'fully if at all\n';
let flagA = { flag: 'a' };

fs.writeFile(textFileLocation, `1 ${text}`, (err, result) => {
  if (err) {
    console.log(err);
    return;
  };
  fs.writeFile(textFileLocation, `2 ${text}`, flagA, (err, result) => {
    if (err) {
      console.log(err);
      return;
    };
    fs.writeFile(textFileLocation, `3 ${text}`, flagA, (err, result) => {
      if (err) {
        console.log(err);
        return;
      };
      fs.readFile(textFileLocation, 'utf8', (err, result) => {
        if (err) {
          console.log(err);
          return;
        };
        console.log(`Reading file:\n${result}`);
      });
    });
  });
});
