const targetFilePath = require('./target-file-path.js').targetFilePath
const targetFileName = require('./target-file-path.js').targetFileName
const expect = require('chai').expect
describe("target-file-path", () => {
  describe("targetFilePath", () => {
    it("has correct path",()=>{
      const testExifData = {
        exif: {
          DateTimeOriginal: "2010:12:25 16:59:25"
        }
      }
      const result = targetFilePath(testExifData)

      expect(result).to.equal("2010/12/25")
    })

    it("deals with leading zeros on month",()=>{
      const testExifData = {
        exif: {
          DateTimeOriginal: "2010:02:25 16:59:25"
        }
      }
      const result = targetFilePath(testExifData)

      expect(result).to.equal("2010/02/25")
    })

    it("deals with leading zeros on date",()=>{
      const testExifData = {
        exif: {
          DateTimeOriginal: "2010:12:05 16:59:25"
        }
      }
      const result = targetFilePath(testExifData)

      expect(result).to.equal("2010/12/05")
    })

  })

  describe("targetFileName", () => {
    it("has correct name", () => {
      const testExifData = {
        exif: {
          DateTimeOriginal: "2010:12:25 16:59:25"
        }
      }
      const result = targetFileName(testExifData)

      expect(result).to.equal("16-59-25.JPG")
    })

    it("deals with leading zeros on hour", () => {
      const testExifData = {
        exif: {
          DateTimeOriginal: "2010:12:25 06:59:25"
        }
      }
      const result = targetFileName(testExifData)

      expect(result).to.equal("06-59-25.JPG")
    })

    it("deals with leading zeros on minute", () => {
      const testExifData = {
        exif: {
          DateTimeOriginal: "2010:12:25 06:09:25"
        }
      }
      const result = targetFileName(testExifData)

      expect(result).to.equal("06-09-25.JPG")
    })

    it("deals with leading zeros on second", () => {
      const testExifData = {
        exif: {
          DateTimeOriginal: "2010:12:25 06:09:05"
        }
      }
      const result = targetFileName(testExifData)

      expect(result).to.equal("06-09-05.JPG")
    })

    it("uses subsecond if available", () => {
      const testExifData = {
        exif: {
          DateTimeOriginal: "2010:12:25 16:59:25",
          SubSecTimeOriginal: "30"
        }
      }
      const result = targetFileName(testExifData)

      expect(result).to.equal("16-59-25-30.JPG")
    })

    it("deals with leading zero on subsecond if available", () => {
      const testExifData = {
        exif: {
          DateTimeOriginal: "2010:12:25 16:59:25",
          SubSecTimeOriginal: "03"
        }
      }
      const result = targetFileName(testExifData)

      expect(result).to.equal("16-59-25-03.JPG")
    })

  })
})
