(async () => {
  const directoryName=process.argv[2]
  console.log(directoryName)
  const fs = require('fs')
  const generateRenameCommands = require('../index.js').generateRenameCommands
  let result = await generateRenameCommands(directoryName)
    fs.writeFileSync('./rename.sh',result,{encoding:"utf-8"})
    console.log("See rename.sh")
})();
