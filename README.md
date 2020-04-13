## How to use

If you have a directory containing Jpegs, first make sure that all directories, subdirectories and file names only contain chars `a-z,A-Z,0-9,_,.,/,-`


To speed things up and simplify things, you should also remove any non jpeg files.

To analyse the directory to see which files need to be, and can be, renamed
```
node ./.bin/analyse-directory.js <path-to-dir>
```
Results are written to `results.json`

Analyse these results with
```
node ./.bin/analyse-results.js
```

Generate a script to move all files that are valid to be moved.
```
node ./.bin/generate-rename-commands.js <path-to-dir> <path-to-target-dir>
```
Review the resulting `rename.sh` and when you are happy, run that but first reset the the checkpoint flag.  Ensure to source the file so that the checkpoint flag will be set in case of early termination.
```
unset RESTART_CHECKPOINT
. ./rename.sh
```

if there are any problems, you can restart them and it will attempt to continue from where it go to, so long as you do it in the same shell and do not change the value or unset `RESTART_CHECKPOINT`

To validate a directory run
```
node ./.bin/validate-directory.js <path-to-dir>
```

It will either output `Passed` or will write a `failures.json` that details the files that are not valid.  `failures.json` can be analysed with
```
node ./.bin/analyse-results.js ./failures.json
```
