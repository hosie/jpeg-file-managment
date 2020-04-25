#!/bin/bash
ALL_JPEGS=$(find /mnt/TOSHIBA/PictureLibrary/sorted/ -not -type d | cut -sd / -f 6- | rev | cut -b 5- | rev |  sort)
TOTAL=0
TOTAL_JPEGS=$(echo "$ALL_JPEGS" | wc -l)
ALL_RESIZES=()
COUNT=0

while read JPEG
do
  if ! [[ -f /mnt/TOSHIBA/piwigo/_data/i/galleries/sorted/${JPEG}-sm.JPG ]]
  then
    ALL_RESIZES+=("sorted/${JPEG}-sm.JPG")
    TOTAL=$(($TOTAL + 1))
  fi

  if ! [[ -f /mnt/TOSHIBA/piwigo/_data/i/galleries/sorted/${JPEG}-th.JPG ]]
  then
    ALL_RESIZES+=("sorted/${JPEG}-th.JPG")
    TOTAL=$(($TOTAL + 1))
  fi

  if ! [[ -f /mnt/TOSHIBA/piwigo/_data/i/galleries/sorted/${JPEG}-xs.JPG ]]
  then
    ALL_RESIZES+=("sorted/${JPEG}-xs.JPG")
    TOTAL=$(($TOTAL + 1))
  fi


  if ! [[ -f /mnt/TOSHIBA/piwigo/_data/i/galleries/sorted/${JPEG}-sq.JPG ]]
  then
    ALL_RESIZES+=("sorted/${JPEG}-sq.JPG")
    TOTAL=$(($TOTAL + 1))
  fi


  if ! [[ -f /mnt/TOSHIBA/piwigo/_data/i/galleries/sorted/${JPEG}-xx.JPG ]]
  then
    ALL_RESIZES+=("sorted/${JPEG}-xx.JPG")
    TOTAL=$(($TOTAL + 1))
  fi

  if ! [[ -f /mnt/TOSHIBA/piwigo/_data/i/galleries/sorted/${JPEG}-cu_e250.JPG ]]
  then
    ALL_RESIZES+=("sorted/${JPEG}-cu_e250.JPG")
    TOTAL=$(($TOTAL + 1))
  fi

  COUNT=$(($COUNT + 1))

  echo "checked $COUNT of ${TOTAL_JPEGS}"

done <<< "$ALL_JPEGS"


echo "found ${TOTAL_JPEGS} jpegs and need to generate ${TOTAL} sizes"

COUNT=0

for RESIZE in ${ALL_RESIZES[@]};
do
echo  $RESIZE
  curl "http://raspberrypi/piwigo/i.php?/galleries/${RESIZE}&b=1586935094&ajaxload=true" -H 'Connection: keep-alive' -H 'Pragma: no-cache' -H 'Cache-Control: no-cache' -H 'Accept: application/json, text/javascript, */*; q=0.01' -H 'X-Requested-With: XMLHttpRequest' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36' -H 'Referer: http://raspberrypi/piwigo/admin.php?page=batch_manager' -H 'Accept-Language: en-US,en;q=0.9' -H 'Cookie: pwg_id=a7tmun7qpql104129m7kuik2vt; phavsz=2556x1364x2' --compressed --insecure
  COUNT=$(($COUNT + 1))
  echo "generated $COUNT of $TOTAL"
done

