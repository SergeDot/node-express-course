const fs = require('fs');

const bigFile = './temporary/big.txt';
const utf8 = 'utf8';

const stream = fs.createReadStream(bigFile, { highWaterMark: 200, encoding: utf8 });

let i = 0;
stream.on('data', () => console.log(`Chunk # ${i++}`));
stream.on('end', () => console.log(`Total chunks ${i}`));
stream.on('error', err => console.log(`Oopsie: ${err}`));
