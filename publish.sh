#/bin/bash

ssh oleggromov <<'ENDSSH'
PUBLIC_FOLDER="oleggromov.com"
NEW_FOLDER="_new"

cp -R $PUBLIC_FOLDER _$PUBLIC_FOLDER-$(date +'%Y-%m-%d_%H-%M-%S')
rm -rf $NEW_FOLDER
mkdir $NEW_FOLDER
ENDSSH

scp -r build/* oleggromov:~/_new

if [ $? -eq 0 ]; then
	echo "Files copied successfully, renaming"
ssh oleggromov <<'ENDSSH'
PUBLIC_FOLDER="oleggromov.com"
NEW_FOLDER="_new"
OLD_FOLDER="_old"

mv $PUBLIC_FOLDER $OLD_FOLDER
mv $NEW_FOLDER $PUBLIC_FOLDER
rm -rf $OLD_FOLDER
ENDSSH
else
	echo "scp exit code was $?"
fi
