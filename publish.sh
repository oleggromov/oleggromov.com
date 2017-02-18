#!/bin/bash

# setting up exiting on any error
set -e

BUILT=~/home_projects/oleggromov.com/build/*
GHPAGES_REPO=~/home_projects/oleggromov.github.io
DATE=$(date '+%Y-%m-%d %H:%M')
COMMIT_MESSAGE="Rebuild from $DATE"

cd $GHPAGES_REPO
cp -R $BUILT .
git add .
git commit -m "$COMMIT_MESSAGE"
git push origin master

echo "Done"