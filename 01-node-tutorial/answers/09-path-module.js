const path = require('path');

console.log(`I am the default separator ${path.sep}`);

console.log(`Look Dorothy! I am a path! Follow me -> ${path.join('..', '..', '1-yellow-brick', '2-yellow-brick', '01-node-tutorial')}`);
console.log(`Look! I am a path! Follow me -> ${path.resolve(__dirname, '..', '..', '01-node-tutorial')}`);