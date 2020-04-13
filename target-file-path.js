const moment=require('moment')
const parse= require("exif-date").parse;
const path= require('path')



module.exports.targetFilePath = function(exifData){
  let dateTimeOriginal=exifData.exif.DateTimeOriginal
  let dateObj = moment(dateTimeOriginal,"YYYY:MM:DD HH:mm:SS")
  //let dateObj = parse(dateTimeOriginal)
  let year=''+dateObj.year()
  let month=dateObj.month() +1
  if(month<10){
    month='0'+month
  }else{
    month=''+month
  }

  let date = ''+dateObj.date()
  if(date<10){
    date='0'+date
  }else{
    date=''+date
  }
  return path.join(year,month,date)

}

module.exports.targetFileName = function(exifData){
  let dateTimeOriginal=exifData.exif.DateTimeOriginal
  let dateObj = moment(dateTimeOriginal,"YYYY:MM:DD HH:mm:ss")
  let hour=dateObj.hour()
  if(hour<10){
    hour='0'+hour
  }else{
    hour=''+hour
  }
  let minutes=dateObj.minutes()
  if(minutes<10){
    minutes='0'+minutes
  }else{
    minutes=''+minutes
  }
  let seconds=dateObj.seconds()
  if(seconds<10){
    seconds='0'+seconds
  }else{
    seconds=''+seconds
  }

  return `${hour}-${minutes}-${seconds}.JPG`

}
