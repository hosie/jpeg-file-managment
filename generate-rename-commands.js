/*
For a given directory, that contains jpegs, potentially in sub directories
Generate a batch script that will rename all jpegs based on the creation
*/

const analyseDirectory = require('./analyse-directory.js').analyseDirectory

async function generateRenameCommands(dirpath){
  function addToScript(script,file,index){
      script = script + `

      moveFile ${file.value.source} ${file.value.target} ${index+1}
      `
      return script
  }

  let initialScript =
`#!/bin/bash
if [ -z "$RESTART_CHECKPOINT" ]
then
  export RESTART_CHECKPOINT=0
fi


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
  let results = await analyseDirectory(dirpath)
  let finalScript = results
  .filter(result =>{
    return result.status !== 'fulfilled' || result.value.source !== result.value.target
  })
  .reduce(addToScript,initialScript)
  return finalScript

}

module.exports = {
  generateRenameCommands
}
