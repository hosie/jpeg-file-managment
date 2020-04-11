(async () => {
  const fs = require('fs')
  const validateDirectory = require('../../../index.js').validateDirectory
  let result = await validateDirectory(`${__dirname}/../input/organised`)

  if(result !== true){
    //console.log(JSON.stringify(result,null,2))
    fs.writeFileSync('./results.json',JSON.stringify(result,null,2),{encoding:"utf-8"})
    throw new Error(`result is not true: ${result}`)

  } else {
    console.log("Passed")
  }
})();
