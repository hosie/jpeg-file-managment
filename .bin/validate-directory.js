(async () => {
  const directoryName=process.argv[2]
  console.log(directoryName)
  const fs = require('fs')
  const validateDirectory = require('../index.js').validateDirectory

  let result = await validateDirectory(directoryName)
  if(result !== true){
    fs.writeFileSync('./results.json',JSON.stringify(result,null,2),{encoding:"utf-8"})
    throw new Error(`result is not true: ${result}`)

  } else {
    console.log("Passed")
  }
})();
