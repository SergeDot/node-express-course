const { writeFile, readFile } = require("fs").promises;

const tempFile = './temporary/temp.txt';
const text = 'I am a test text that tests texts and texts tests';
let flagA = {};
const utf8 = 'utf8';

const writer = async () => {
  for (let i = 0; i < 3; i++) {
    if (i) flagA = { flag: 'a' };
    try {
      await writeFile(tempFile, `${text} ${i + 1}\n`, flagA);
    } catch (err) {
      console.log(`Line ${i + 1}: ${err}`);
    };
  };
};

const reader = async () => {
  try {
    const readResult = await readFile(tempFile, utf8);
    console.log(readResult);
  } catch (err) {
    console.log(err);
  };
};

const readWrite = async () => {
  try {
    await writer();
    await reader();
  } catch (err) {
    console.log(err);
  };
};

readWrite();
