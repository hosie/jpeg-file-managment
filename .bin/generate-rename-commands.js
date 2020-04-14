(async () => {
  const directoryName=process.argv[2]
  const targetDirectoryName=process.argv[3]
  const limit=process.argv[4]
  if(typeof directoryName === 'undefined' || typeof targetDirectoryName === 'undefined'){
    console.log("Must provide dirname and target dir name")
    return
  }
  console.log(directoryName)
  const fs = require('fs')
  const generateRenameCommands = require('../index.js').generateRenameCommands
  let result = await generateRenameCommands(directoryName,targetDirectoryName,limit)
    fs.writeFileSync('./rename.sh',result,{encoding:"utf-8"})
    console.log("See rename.sh")
})();
