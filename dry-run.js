const ExifImage = require('exif').ExifImage;
const targetFilePath = require('./target-file-path.js').targetFilePath
const realRecursive = require("recursive-readdir");
const util = require('util')
const recursive =util.promisify(realRecursive)

async function readExif(file){
  return new Promise((resolve,reject)=>{
    new ExifImage({ image : file }, function (error, exifData) {
        if (error)
        {
          //console.log(`Error: with ${file}`+error.message);
          reject(error)
        }
        else
        {
          //console.log(exifData); // Do something with your data!
          let result = targetFilePath(exifData)
          //console.log(`${file} => ${result}`)
          resolve({source:file,target:result})
        }
    });
  })
}
async function dryRun(filepath){

  console.log(filepath)
    try {
      let results = await recursive(filepath)
      results = results.map(readExif)
      return Promise.allSettled(results)

    } catch (error) {
      //console.log('Error: ' + error.message);
      //console.log('Error: ' + error.stack);
      throw error
    }
}
module.exports.dryRun = dryRun
