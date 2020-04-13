(async () => {
  const directoryName=process.argv[2]
  console.log(directoryName)
  const fs = require('fs')
  const validateDirectory = require('../index.js').validateDirectory
  let result = await validateDirectory(directoryName)
  if(result !== true){
    fs.writeFileSync('./failures.json',JSON.stringify(result,null,2),{encoding:"utf-8"})
    console.log("there are some invalid files found.  See failures.json")

  } else {
    console.log("Passed")
  }
})();
