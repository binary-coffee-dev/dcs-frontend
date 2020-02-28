# !/bin/bash

BASE_BRANCH=$(git log --first-parent --format=format:'%H' | head -2 | tail -1)
#BASE_BRANCH="e5b60005"
HEAD_BRANCH="HEAD"

AFFECTED_APPS=$(nx affected:apps --base=$BASE_BRANCH --head=$HEAD_BRANCH --plain)

RESPONSE=0

IFS=' '
read -ra ADDR <<< "$AFFECTED_APPS"
for i in "${ADDR[@]}"; do
    if [ "$i" = "dcs-frontend" -a "$1" = "dcs-frontend" ] ; then RESPONSE=1 ; fi
    if [ "$i" = "dcs-admin" -a "$1" = "dcs-admin" ] ; then RESPONSE=1 ; fi
done

echo $RESPONSE
