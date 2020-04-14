const fs = require('fs')
const path = require('path')
const resultsFile = process.argv[2] || 'results.json'
const results = JSON.parse(fs.readFileSync(resultsFile, {
  encoding: 'utf8'
}))
const isNonJPegs = result => (result.status === "rejected" && result.reason.code === "NOT_A_JPEG")
const nonJPegs = results.filter(isNonJPegs)
const jpegs = results.filter(result => !isNonJPegs(result))


const isNoExifSegments = result => (result.status === "rejected" && result.reason.code === "NO_EXIF_SEGMENT")
const noExifSegments = results.filter(isNoExifSegments)

const isNoDateTime = result => (result.status === "rejected" && result.reason.code === "NO_DATE_TIME")
const noDateTime = results.filter(isNoDateTime)


const isDuplicate = result => (result.status === "rejected" && result.reason.code === "DUPLICATE")
const duplicates = results.filter(isDuplicate)


const others = results.filter(result => (!isNoExifSegments(result) && !isNonJPegs(result) && !isNoDateTime(result) && !isDuplicate(result)))

//console.log(JSON.stringify(nonJPegs,null,2))
let initialNonJPegDetails = {
  extentions: []
}

function addToDetails(nonJPegDetails, nonJPeg) {
  let currentExtension = path.extname(nonJPeg.reason.source.substring(6))
  if (!nonJPegDetails.extentions.includes(currentExtension.toLowerCase())) {
    nonJPegDetails.extentions.push(currentExtension.toLowerCase())
    nonJPegDetails[currentExtension.toLowerCase()] = {
      count: 1,
      mixedCases: [currentExtension]
    }
  } else {
    nonJPegDetails[currentExtension.toLowerCase()].count = nonJPegDetails[currentExtension.toLowerCase()].count + 1
    if (!nonJPegDetails[currentExtension.toLowerCase()].mixedCases.includes(currentExtension)) {
      nonJPegDetails[currentExtension.toLowerCase()].mixedCases.push(currentExtension)
    }
  }

  return nonJPegDetails
}
let nonJPegDetails = nonJPegs.reduce(addToDetails, initialNonJPegDetails)



let reasons = []
let numMatches = 0
let misMatches = []
let misMatchReasons = {
  differentExtensions: {
    count: 0,
    values: []
  },
  dupe: {
    count: 0,
    values: []
  },
  leading0onDay: {
    count: 0,
    values: []
  },
  millisecondPrecision: {
    count: 0,
    values: []
  },
  unknownsDir: {
    count: 0,
    values: []
  },
  differentPathLengths: {
    count: 0,
    values: []
  },
  differentFileName: {
    count: 0,
    values: []
  },
  unkownMismatch: {
    count: 0,
    values: []
  },
  differentDay: {
    count: 0,
    values: []
  }
}
let numberRejected = 0
let numberFulfilled = 0
let numberUnknownStatus = 0
results.forEach(result => {
  if (result.status === 'rejected') {
    let currentReason

    numberRejected++
    if (result.reason) {
      currentReason = result.reason.code
    } else{
      currentReason = 'undefined'
    }
    if (!reasons.includes(currentReason)) {
      reasons.push(currentReason)
    }
  } else if (result.status === "fulfilled") {

    numberFulfilled++

    if (result.value.source === result.value.target) {
      numMatches++
    } else {
      let unknown = true
      let sourcePath = result.value.source.split(path.sep)
      let targetPath = result.value.target.split(path.sep)
      if (result.value.source.startsWith("/Volumes/SAMSUNG/HP/users/John/PictureLibrary/unknown")) {
        misMatchReasons.unknownsDir.count++
        misMatchReasons.unknownsDir.values.push(result.value)
        unknown = false
      } else {
        if (sourcePath.length !== targetPath.length) {
          misMatchReasons.differentPathLengths.count++
          misMatchReasons.differentPathLengths.values.push(result.value)
          unknown = false
        } else {
          if (sourcePath[sourcePath.length - 1] !== targetPath[targetPath.length - 1]) {
            unknown = false
            let sourceWithoutExtension = sourcePath[sourcePath.length - 1].substring(0, sourcePath[sourcePath.length - 1].lastIndexOf("."))
            let targetWithoutExtension = targetPath[targetPath.length - 1].substring(0, targetPath[targetPath.length - 1].lastIndexOf("."))

            if (sourceWithoutExtension === targetWithoutExtension) {
              misMatchReasons.differentExtensions.count++
              misMatchReasons.differentExtensions.values.push(result.value)
            } else if (sourceWithoutExtension.startsWith(targetWithoutExtension)) {
              if (sourcePath[targetPath.length - 1].substring(8, 9) == "-" && !Number.isNaN(sourcePath[targetPath.length - 1].substring(9, 11))) {

                misMatchReasons.millisecondPrecision.count++
                misMatchReasons.millisecondPrecision.values.push(result.value)

              } else {

                misMatchReasons.dupe.count++
                misMatchReasons.dupe.values.push(result.value)
              }
            } else {
              misMatchReasons.differentFileName.count++
              misMatchReasons.differentFileName.values.push(result.value)
            }
          }
          if (sourcePath[sourcePath.length - 2] !== targetPath[targetPath.length - 2]) {
            if (sourcePath[sourcePath.length - 2] === "0" + targetPath[targetPath.length - 2]) {
              misMatchReasons.leading0onDay.count++
              misMatchReasons.leading0onDay.values.push(result.value)

            } else {
              misMatchReasons.differentDay.count++
              misMatchReasons.differentDay.values.push(result.value)

            }
            unknown = false

          }
        }
      }
      if (unknown) {
        misMatchReasons.unkownMismatch.count++
        misMatchReasons.unkownMismatch.values.push(result.value)
      }
      misMatches.push(result.value)
    }
  } else {
    numberUnknownStatus++
  }

})
//console.log(JSON.stringify(nonJPegDetails,null,2))
console.log(`There are ${results.length}  results`)

console.log(`There are ${numberFulfilled}  Fulfilled`)
console.log(`There are ${numberRejected}  Rejected`)
console.log(`unique resonse for rejection ${JSON.stringify(reasons)}`)

console.log(`There are ${numberUnknownStatus}  Unknown status`)

console.log(`There are ${nonJPegs.length} non JPegs`)
console.log(`There are ${duplicates.length} duplicates`)

console.log(`There are ${noExifSegments.length}  No exif segments`)
console.log(`There are ${noDateTime.length}  with no date time information`)

console.log(`There are ${results.length - (noExifSegments.length + nonJPegs.length + noDateTime.length)}  others`)
console.log(`There are ${others.length}  others`)
console.log(`matches: ${numMatches}`)
//console.log(`mismatches:${JSON.stringify(misMatches,null,2)}`)
console.log(`mismatches count:${misMatches.length}`)

console.log(`mismatches unknownsDir:${misMatchReasons.unknownsDir.count}`)
console.log(`mismatches differentPathLengths:${misMatchReasons.differentPathLengths.count}`)
console.log(`mismatches differentFileName:${misMatchReasons.differentFileName.count}`)
console.log(`mismatches differentDay:${misMatchReasons.differentDay.count}`)
console.log(`mismatches dupe:${misMatchReasons.dupe.count}`)
console.log(`mismatches millisecondPrecision:${misMatchReasons.millisecondPrecision.count}`)
console.log(`mismatches leading0onDay:${misMatchReasons.leading0onDay.count}`)
console.log(`mismatches differentExtensions:${misMatchReasons.differentExtensions.count}`)

console.log(`mismatches unknown:${misMatchReasons.unkownMismatch.count}`)
//console.log(`mismatch reasons: ${JSON.stringify(misMatchReasons,null,2)}`)
//console.log(`differentPathLengths : ${JSON.stringify(misMatchReasons.differentPathLengths,null,2)}`)
//console.log(`mismatches differentFileName list :${JSON.stringify(misMatchReasons.differentFileName.values,null,2)}`)
//console.log(`mismatches leading0onDay list :${JSON.stringify(misMatchReasons.leading0onDay.values,null,2)}`)
