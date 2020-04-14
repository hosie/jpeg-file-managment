/*
For a given directory, that contains jpegs, potentially in sub directories
Generate a batch script that will rename all jpegs based on the creation
*/

const analyseDirectory = require('./analyse-directory.js').analyseDirectory
const path = require('path')
async function generateRenameCommandsForBrokenFiles(dirpath,targetDirPath,limit,existingResults){
  function addToScript(script,file,index){
      let source = file.reason.source.substring(6)
      let target = path.normalize(path.join(targetDirPath,file.reason.code,source))
      script = script + `

      moveFile ${source} ${target} ${index+1}
      `
      return script
  }

  let initialScript =
`#!/bin/bash
if [ -z "$RESTART_CHECKPOINT" ]
then
  export RESTART_CHECKPOINT=0
fi
echo starting from $RESTART_CHECKPOINT

function moveFile() {
  sourceFile=$1
  targetFile=$2
  checkpointNumber=$3

  if (( $checkpointNumber > RESTART_CHECKPOINT ))
  then
    if [[ -f $2 ]]
    then
      echo detected duplicate $2
    else
      mkdir -p $(dirname $2)
      mv $1 $2
      RESTART_CHECKPOINT=$((checkpointNumber))
    fi
  fi

}
  `
  let results
  if(typeof existingResults === 'undefined'){
    results = await analyseDirectory(dirpath,limit)
  } else {
    results=existingResults
  }
  let finalScript = results
  .filter(result =>{
    return result.status === 'rejected'
  })
  .reduce(addToScript,initialScript)
  return finalScript

}

module.exports = {
  generateRenameCommandsForBrokenFiles
}
