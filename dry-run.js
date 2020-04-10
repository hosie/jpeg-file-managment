const ExifImage = require('exif').ExifImage;
const targetFilePath = require('./target-file-path.js').targetFilePath
module.exports.dryRun = function(filepath){
  console.log(filepath)
  try {
    new ExifImage({ image : filepath }, function (error, exifData) {
        if (error)
        {
          console.log('Error: '+error.message);
        }
        else
        {
          //console.log(exifData); // Do something with your data!
          let result = targetFilePath(exifData)
          console.log(result)


        }
    });
} catch (error) {
    console.log('Error: ' + error.message);
}

}
