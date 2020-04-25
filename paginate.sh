REMAINING=$( find /mnt/SAMSUNG/PictureLibrary/unsorted/ -not -type d | wc -l)

while (( $REMAINING > 0 ))
do
./next-page.sh 30
REMAINING=$( find /mnt/SAMSUNG/PictureLibrary/unsorted/ -not -type d | wc -l)
done
