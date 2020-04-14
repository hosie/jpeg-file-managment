(async () => {
  const fs=require('fs')
  let resultsFile=process.argv[2]
  let targetDirectoryName=process.argv[3]

  if(typeof resultsFile === 'undefined' || typeof targetDirectoryName === 'undefined'){
    console.log("Must provide results file and target dir name")
    return
  }

  let results=JSON.parse(fs.readFileSync(resultsFile))
  let limit //= undefined

  const generateRenameCommandsForBrokenFiles = require('../index.js').generateRenameCommandsForBrokenFiles
  let result = await generateRenameCommandsForBrokenFiles(null,targetDirectoryName,limit,results)
    fs.writeFileSync('./rename.sh',result,{encoding:"utf-8"})
    console.log("See rename.sh")
})();
