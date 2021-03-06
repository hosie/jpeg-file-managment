(async () => {
  const directoryName = process.argv[2]
  const limit = process.argv[3]
  console.log(directoryName)
  const fs = require('fs')
  const analyseDirectory = require('../index.js').analyseDirectory
  let result = await analyseDirectory(directoryName, limit)
  if(result !== true){
    fs.writeFileSync('./results.json',JSON.stringify(result,null,2),{encoding:"utf-8"})
    console.log("analysis complete.  See results.json")
  }
})();
