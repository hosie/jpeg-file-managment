
(async () => {
  const analyseDirectory = require('../../../index.js').analyseDirectory
  let result = await analyseDirectory(`${__dirname}/../input/unorganised`)
  console.log(result)
})();
