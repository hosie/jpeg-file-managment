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

  })

  describe("targetFileName", () => {
    it("has correct name", () => {
      const testExifData = {
        exif: {
          DateTimeOriginal: "2010:12:25 16:59:25"
        }
      }
      const result = targetFilePath(testExifData)

      expect(result).to.equal("16_59_25")
    })

  })
})
