const ExifImage = require('exif').ExifImage;
const targetFilePath = require('./target-file-path.js').targetFilePath
const targetFileName = require('./target-file-path.js').targetFileName
const realRecursive = require("recursive-readdir");
const util = require('util')
const path = require('path')
const recursive =util.promisify(realRecursive)


async function analyseDirectory(dirpath){

  async function readExif(file){
    return new Promise((resolve,reject)=>{
      new ExifImage({ image : file }, function (error, exifData) {
          if (error)
          {
            reject(error)
          }
          else
          {
            let filePath = targetFilePath(exifData)
            let fileName = targetFileName(exifData)
            resolve({source:file,target:path.join(dirpath,filePath,fileName)})
          }
      });
    })
  }

  let results = await recursive(dirpath)
  results = results.map(readExif)

  return Promise.allSettled(results)


}
module.exports.analyseDirectory = analyseDirectory
