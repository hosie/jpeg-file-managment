const ExifImage = require('exif').ExifImage;
const targetFilePath = require('./target-file-path.js').targetFilePath
var recursive = require("recursive-readdir");




module.exports.dryRun = function(filepath){
  console.log(filepath)
  try {
    recursive(filepath, function (err, files) {
      // `files` is an array of file paths
      console.log(files);
      files
      .forEach(file=>{
        new ExifImage({ image : file }, function (error, exifData) {
            if (error)
            {
              console.log(`Error: with ${file}`+error.message);
            }
            else
            {
              //console.log(exifData); // Do something with your data!
              let result = targetFilePath(exifData)
              console.log(`${file} => ${result}`)
            }
        });
      })
    });

  } catch (error) {
    console.log('Error: ' + error.message);
    console.log('Error: ' + error.stack);
  }

}
