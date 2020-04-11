const analyseDirectory = require('./analyse-directory.js').analyseDirectory

async function validateDirectory(dirpath){
  let results = await analyseDirectory(dirpath)
  let failures = results.filter(result =>{
    return result.status !== 'fulfilled' || result.value.source !== result.value.target
  })
  if (failures.length) {
    return failures
  } else {
    return true
  }
}

module.exports = {
  validateDirectory
}
