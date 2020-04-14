const findDuplicates = require('./find-duplicates.js').findDuplicates
const expect = require('chai').expect


describe('find-duplicates', () => {
  let testArray
  beforeEach(()=>{
    testArray = [
     {
       "status": "fulfilled",
       "value": {
         "source": "/foo/bar/quz.jpg",
         "target": "2001/01/01/01-01-01.JPG"
       }
     },
     {
       "status": "fulfilled",
       "value": {
         "source": "/bar/quz/foo.jpg",
         "target": "2002/02/02/01-02-02.JPG"
       }
     },
     {
       "status": "fulfilled",
       "value": {
         "source": "/quz/foo/bar.jpg",
         "target": "2003/03/03/03-03-03.JPG"
       }
     }
   ]
  })

  it('returns original array if there are no duplicates',()=>{

    let result = findDuplicates(testArray,()=>false)
    expect(result).to.deep.equal(testArray)

  })

  it('marks all as duplicates if all files exist',()=>{

    let result = findDuplicates(testArray,()=>true)
    expect(result[0].status).to.equal("rejected")
    expect(result[0].reason.code).to.equal("DUPLICATE")
    expect(result[1].status).to.equal("rejected")
    expect(result[1].reason.code).to.equal("DUPLICATE")
    expect(result[2].status).to.equal("rejected")
    expect(result[2].reason.code).to.equal("DUPLICATE")

  })

  it('marks only the duplicates of files that exist',()=>{
    let result = findDuplicates(testArray,(file)=> (file===testArray[1].value.target))
    expect(result[0]).to.deep.equal(testArray[0])
    expect(result[2]).to.deep.equal(testArray[2])
    expect(result[1].status).to.equal("rejected")
    expect(result[1].reason.code).to.equal("DUPLICATE")

  })

  it('ignores broken files',()=>{
    testArray.push({
      status:'rejected',
      reason:{
        code:'SOME_RANDOM'
      }
    })
    let result = findDuplicates(testArray,(file)=> (file===testArray[1].value.target))
    expect(result[0]).to.deep.equal(testArray[0])
    expect(result[2]).to.deep.equal(testArray[2])
    expect(result[1].status).to.equal("rejected")
    expect(result[1].reason.code).to.equal("DUPLICATE")

  })


  it('marks duplicates if there are duplicates in the input',()=>{
    testArray.push(testArray[0])
    let result = findDuplicates(testArray,()=>false)
    expect(result[0]).to.deep.equal(testArray[0])
    expect(result[1]).to.deep.equal(testArray[1])
    expect(result[2]).to.deep.equal(testArray[2])
    expect(result[3].status).to.equal("rejected")
    expect(result[3].reason.code).to.equal("DUPLICATE")
    expect(result[3].reason.source).to.equal("File: /foo/bar/quz.jpg")

  })

})
