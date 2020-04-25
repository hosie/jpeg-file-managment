if [[ -z $1 ]]
then
 echo "defaulting to 10"
 PAGE_SIZE=10
else
 echo "pages size ${1}"
 PAGE_SIZE=$1
fi
node ./.bin/analyse-directory.js /mnt/SAMSUNG/PictureLibrary/unsorted ${PAGE_SIZE}
npm run find-duplicates-in-file results.json /mnt/SAMSUNG/PictureLibrary/sorted

node ./.bin/analyse-results.js
node ./.bin/generate-rename-commands-from-file.js ./results.json /mnt/SAMSUNG/PictureLibrary/sorted
unset RESTART_CHECKPOINT
NEW_UUID=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 4 | head -n 1)
mkdir ~/duplicates/${NEW_UUID}
. ./rename.sh > rename.log
cat rename.log
mv rename.log ~/duplicates/${NEW_UUID}/rename.log
mv ./rename.sh ~/duplicates/${NEW_UUID}/rename.sh
cp ./results.json ~/duplicates/${NEW_UUID}/results.json
echo $RESTART_CHECKPOINT

node ./.bin/generate-rename-commands-from-file-for-broken-files.js ./results.json /mnt/SAMSUNG/PictureLibrary/broken/
unset RESTART_CHECKPOINT
. ./rename.sh > rename.log

echo $RESTART_CHECKPOINT

echo done $( find /mnt/SAMSUNG/PictureLibrary/sorted/ -not -type d | wc -l)
export REMAINING=$( find /mnt/SAMSUNG/PictureLibrary/unsorted/ -not -type d | wc -l)
echo remaining ${REMAINING}
