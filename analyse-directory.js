const ExifImage = require('exif').ExifImage;
const targetFilePath = require('./target-file-path.js').targetFilePath
const targetFileName = require('./target-file-path.js').targetFileName
const realRecursive = require("recursive-readdir");
const fs = require('fs')
const util = require('util')
const path = require('path')
const recursive = util.promisify(realRecursive)
var bunyan = require('bunyan');
var log = bunyan.createLogger({
  name: "analyse-directory",
  streams: [{
    path: './bunyan.log',
    // `type: 'file'` is implied
  }]
});


async function analyseDirectory(dirpath, limit) {

  if (!fs.existsSync(dirpath)) {
    return Promise.reject(`${dirpath} does not exist`)

  }
  const stats = fs.statSync(dirpath)

  if (!stats.isDirectory()) {
    return Promise.reject(`${dirpath} is not a directory`)
  }

  let count=0
  function enforceLimit(file,stats){
    log.debug(`#enforceLimit ${file}`)
    if(stats.isDirectory()){
      return false
    }
    count++
    if( typeof limit === 'undefined'){
      log.debug('#enforceLimit unlimited')
      return false
    }else{
      if(count>limit){
        log.debug('#enforceLimit limit exceed')
        return true

      }else{
        log.debug(`#enforceLimit within limit ${count}`)
        return false

      }
    }
  }

  async function readExif(file) {
    log.info(`#readExif file`);
    return new Promise((resolve, reject) => {
      new ExifImage({
        image: file
      }, function(error, exifData) {
        if (error) {
          reject(error)
        } else {
          let filePath = targetFilePath(exifData)
          let fileName = targetFileName(exifData)
          if (filePath === null || fileName === null) {
            reject({
              source: `File: ${file}`,
              code: `NO_DATE_TIME`
            })
          } else {
            resolve({
              source: file,
              target: path.join(filePath, fileName)
            })
          }
        }
      });
    })
  }

  let results = await recursive(dirpath,[enforceLimit])
  results = results.map(readExif)

  return Promise.allSettled(results)


}
module.exports.analyseDirectory = analyseDirectory
