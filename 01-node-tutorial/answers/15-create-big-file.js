const fs = require('fs');

const bigFile = './temporary/big.txt';
const flagA = { flag: 'a' }

for (let i = 1; i <= 20000; i++) {
  fs.writeFileSync(bigFile, `I will not tell lies to Ms Umbridge ${i}\n`, flagA);
};