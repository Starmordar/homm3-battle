const { unpackLOD, unpackDEF, unpackPCX } = require('homm3-unpacker');
const fs = require('fs'); // So we don't care about the number of open files.
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

async function deleteAllFilesInDir(dirPath) {
  const files = fs.readdirSync(dirPath);
  files.map((file) => fs.unlinkSync(path.join(dirPath, file)));
}

// async function example8(path) {
//   deleteAllFilesInDir('./assets');

//   const file = await read(path);

//   const lod = unpackLOD(file, {
//     def: (buffer, filename) => {
//       if (!filename.includes('WRAIT')) return;

//       const def = unpackDEF(buffer, { format: 'bitmap', padding: false });

//       for (const [filename, image] of Object.entries(def.images)) {
//         console.log('filename :>> ', filename);
//         write(`./assets/${filename}`, image.data);
//         if (image.selection) write(`./assets/selection-${filename}`, image.selection);
//       }
//     },
//     // pcx: (buffer, filename) => {
//     //   console.log('image :>> ', image);
//     //   const image = unpackPCX(buffer, { format: 'png' });
//     //   console.log(image);
//     //   write(`./assets/${filename}`, image.data);
//     // },
//   });

//   //   const pcxFile = await read('./sprite/cwrait01.pcx');
//   //   console.log('pcxFile :>> ', pcxFile);
//   //   unpackPCX(pcxFile, { format: 'png' });
// }

// async function example1(path) {
//   deleteAllFilesInDir('./assets');

//   const file = await read(path);
//   console.log(file);
//   unpackLOD(file, (buffer, filename, skip) => {
//     if (filename.includes('CWRAIT.def')) {
//       write(`./assets/${filename}`, buffer);
//       console.log('filename :>> ', filename.includes('CWRAIT.def'));
//     }
//     return filename.includes('WRAIT') ? buffer : skip();
//   });
// }

async function unpack_frames(path, dir = './') {
  deleteAllFilesInDir(dir);

  const file = await read(path);
  const def = unpackDEF(file);

  for (const [filename, image] of Object.entries(def.images)) {
    write(dir + filename, image.data);
  }
}

unpack_frames('./CWRAIT.def', './assets/');
// example2('./H3sprite.lod');
