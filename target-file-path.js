const moment=require('moment')
module.exports.targetFilePath = function(exifData){
  let dateTimeOriginal=exifData.exif.DateTimeOriginal
  let dateObj = moment(dateTimeOriginal,"YYYY:MM:DD HH:MM:SS")
  return `${dateObj.year()}/${dateObj.month()}/${dateObj.date()}`

}
