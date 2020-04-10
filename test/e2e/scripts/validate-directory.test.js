(async () => {
  const validateDirectory = require('../../../index.js').validateDirectory
  let result = await validateDirectory(`${__dirname}/../input/organised`)
  if(result !== true){
    throw new Error(`result is not true: ${result}`)
  } else {
    console.log("Passed")
  }
})();
