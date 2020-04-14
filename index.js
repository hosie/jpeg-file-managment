module.exports = {
  dryRun:require('./dry-run.js').dryRun,
  validateDirectory:require('./validate-directory.js').validateDirectory,
  analyseDirectory:require('./analyse-directory.js').analyseDirectory,
  generateRenameCommands:require('./generate-rename-commands.js').generateRenameCommands,
  generateRenameCommandsForBrokenFiles:require('./generate-rename-commands-for-broken-files.js').generateRenameCommandsForBrokenFiles,
  findDuplicates:require('./find-duplicates.js').findDuplicates,
}
