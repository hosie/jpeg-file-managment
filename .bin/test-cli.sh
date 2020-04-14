#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

## Analyse the directories
npm run analyse-directory ${DIR}/../test/e2e/input/organised
RESULTS_ANALYSIS=$(npm run analyse-results)
echo "${RESULTS_ANALYSIS}"
NUMBER_OF_RESULTS=$(echo "${RESULTS_ANALYSIS}" | grep -E "There are .+  results")
if [[ ${NUMBER_OF_RESULTS} = "There are 8  results" ]]
then
  echo "PASSED"
else
  echo "FAILED"
  return
fi


## Analyse with a limit
npm run analyse-directory ${DIR}/../test/e2e/input/organised 5
RESULTS_ANALYSIS=$(npm run analyse-results)
echo "${RESULTS_ANALYSIS}"
NUMBER_OF_RESULTS=$(echo "${RESULTS_ANALYSIS}" | grep -E "There are .+  results")
if [[ ${NUMBER_OF_RESULTS} = "There are 5  results" ]]
then
  echo "PASSED"
else
  echo "FAILED"
  return
fi

## Generate rename commands
npm run generate-rename-commands ${DIR}/../test/e2e/input/organised ${DIR}/../test/e2e/output/target
NUM_MOVES=$(grep "moveFile /" rename.sh | wc -l)
if (( $NUM_MOVES == 8 ))
then
  echo "PASSED"
else
  echo "FAILED"
  return
fi

## Generate rename commands with a limit
npm run generate-rename-commands ${DIR}/../test/e2e/input/organised ${DIR}/../test/e2e/output/target 5
NUM_MOVES=$(grep "moveFile /" rename.sh | wc -l)
if (( $NUM_MOVES == 5 ))
then
  echo "PASSED"
else
  echo "FAILED"
  return
fi


## Generate rename commands from file
npm run analyse-directory ${DIR}/../test/e2e/input/organised
RESULTS_ANALYSIS=$(npm run analyse-results)
echo "${RESULTS_ANALYSIS}"
NUMBER_OF_RESULTS=$(echo "${RESULTS_ANALYSIS}" | grep -E "There are .+  results")
if [[ ${NUMBER_OF_RESULTS} = "There are 8  results" ]]
then
  npm run generate-rename-commands-from-file ./results.json ${DIR}/../test/e2e/output/target
  NUM_MOVES=$(grep "moveFile /" rename.sh | wc -l)
  if (( $NUM_MOVES == 8 ))
  then
    echo "PASSED"
  else
    echo "FAILED"
    return
  fi
else
  echo "Failed"
  return
fi



## Analyse the directories
npm run analyse-directory ${DIR}/../test/e2e/input/unorganised
RESULTS_ANALYSIS=$(npm run analyse-results)
echo "${RESULTS_ANALYSIS}"
NUMBER_OF_RESULTS=$(echo "${RESULTS_ANALYSIS}" | grep -E "There are .+  results")
if [[ ${NUMBER_OF_RESULTS} = "There are 8  results" ]]
then
  npm run generate-rename-commands-from-file-for-broken-files ./results.json ${DIR}/../test/e2e/output/target
  NUM_MOVES=$(grep "moveFile /" rename.sh | wc -l)
  if (( $NUM_MOVES == 6 ))
  then
    echo "PASSED"
  else
    echo "FAILED"
    return
  fi
else
  echo "Failed"
  return
fi



## Analyse the directories
npm run analyse-directory ${DIR}/../test/e2e/input/duplicates
RESULTS_ANALYSIS=$(npm run analyse-results)
echo "${RESULTS_ANALYSIS}"
NUMBER_OF_RESULTS=$(echo "${RESULTS_ANALYSIS}" | grep -E "There are .+  results")
if [[ ${NUMBER_OF_RESULTS} = "There are 8  results" ]]
then
  npm run find-duplicates-in-file ./results.json ${DIR}/../test/e2e/input/organised
  RESULTS_ANALYSIS=$(npm run analyse-results)
  echo "${RESULTS_ANALYSIS}"
  NUMBER_OF_DUPES=$(echo "${RESULTS_ANALYSIS}" | grep -E "There are .+ duplicates")
  if [[ ${NUMBER_OF_DUPES} = "There are 8 duplicates" ]]
  then
    npm run generate-rename-commands-from-file-for-broken-files ./results.json ${DIR}/../test/output
    NUMBER_OF_DUPES=$(grep "test/output/DUPLICATE" rename.sh | wc -l)
    if (( $NUMBER_OF_DUPES == 8 ))
    then
      echo "PASSED"
    else
      echo "FAILED"
      return
    fi


    echo "PASSED"
  else
    echo "Failed"
    return
  fi
else
  echo "Failed"
  return
fi
