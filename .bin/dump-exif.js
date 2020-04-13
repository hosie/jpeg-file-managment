const ExifImage = require('exif').ExifImage;
const fs = require('fs')

const fileName = process.argv[2]

if(! fs.existsSync(fileName)){
  return Promise.reject(`${fileName} does not exist`)
}

new ExifImage({ image : fileName }, function (error, exifData) {
    if (error)
    {
      reject(error)
    }
    else
    {
      console.log(JSON.stringify(exifData,null,2))
    }
});
