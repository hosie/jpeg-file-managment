(async () => {
  const fs = require('fs')
  const path = require('path')
  const validateDirectory = require('../../../index.js').validateDirectory
  let result = await validateDirectory(path.normalize(`${__dirname}/../input/organised`))

  if(result !== true){
    console.log(JSON.stringify(result,null,2))
    throw new Error(`result is not true: ${result}`)

  } else {
    console.log("Passed")
  }
})();
