(async () => {
  const fs=require('fs')
  const path=require('path')
  let resultsFile=process.argv[2]
  let targetDirectoryName=process.argv[3]

  if(typeof resultsFile === 'undefined' || typeof targetDirectoryName === 'undefined'){
    console.log("Must provide results file and target dir name")
    return
  }

  let results=JSON.parse(fs.readFileSync(resultsFile))

  const findDuplicates = require('../index.js').findDuplicates
  let dedupedResults = findDuplicates(results,(file)=>{
    return fs.existsSync(path.join(targetDirectoryName,file))
  })
  fs.writeFileSync('./results.json',JSON.stringify(dedupedResults,null,2),{encoding:"utf-8"})

})();
