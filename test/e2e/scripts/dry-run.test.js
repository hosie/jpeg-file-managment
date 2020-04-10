//const dryRun = require('../../../dry-run.js').dryRun

(async () => {
  const dryRun = require('../../../index.js').dryRun
  let result = await dryRun(`${__dirname}/../input`)
  console.log(result)
})();
