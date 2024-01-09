const fs = require('graceful-fs');
const path = require('path');

function read(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (error, data) => (error ? reject(error) : resolve(data.buffer)));
  });
}

function write(path, buffer) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, Buffer.from(buffer), (error) => (error ? reject(error) : resolve()));
  });
}

async function clearDir(dirPath) {
  const files = fs.readdirSync(dirPath);
  files.map((file) => fs.unlinkSync(path.join(dirPath, file)));
}

module.exports = { read, write, clearDir };
