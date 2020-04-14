/*
take a JSON array and a function that can check the existence of a file from relative path
return a copy of the array that is modified with any duplicates marked as such
*/

function findDuplicates(candidates, checkExists) {
  let uniqueTargets = []
  let result = candidates.map(file => {
    if ((checkExists(file.value.target)) || (uniqueTargets.includes(file.value.target))) {
      return {
        status: 'rejected',
        reason: {
          source: `File: ${file.value.source}`,
          code: 'DUPLICATE'
        }
      }
    } else {
      uniqueTargets.push(file.value.target)
      return file
    }
  })
  return result
}

module.exports = {
  findDuplicates
}
