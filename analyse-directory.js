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
          reject(error)
        }
        else
        {
          let result = targetFilePath(exifData)
          resolve({source:file,target:result})
        }
    });
  })
}
async function analyseDirectory(filepath){

  console.log(filepath)
  let results = await recursive(filepath)
  results = results.map(readExif)
  return Promise.allSettled(results)


}
module.exports.analyseDirectory = analyseDirectory
