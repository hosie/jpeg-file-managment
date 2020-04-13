const ExifImage = require('exif').ExifImage;
const targetFilePath = require('./target-file-path.js').targetFilePath
const targetFileName = require('./target-file-path.js').targetFileName
const realRecursive = require("recursive-readdir");
const fs = require('fs')
const util = require('util')
const path = require('path')
const recursive =util.promisify(realRecursive)


async function analyseDirectory(dirpath){
  if(! fs.existsSync(dirpath)){
    return Promise.reject(`${dirpath} does not exist`)

  }
  const stats = fs.statSync(dirpath)

  if(! stats.isDirectory() ){
    return Promise.reject(`${dirpath} is not a directory`)
  }

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
            if(filePath===null || fileName===null){
              reject({source:`File: ${file}`,code:`NO_DATE_TIME`})
            }else{
              resolve({source:file,target:path.join(filePath,fileName)})
            }
          }
      });
    })
  }

  let results = await recursive(dirpath)
  results = results.map(readExif)

  return Promise.allSettled(results)


}
module.exports.analyseDirectory = analyseDirectory
