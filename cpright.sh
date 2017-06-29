#!/bin/bash

YEAR=$(date +"%Y")
COPYRIGHT="© $YEAR Oleg Gromov, oleggromov.com"
INPUT_DIR=$1
OUTPUT_DIR=$2

show_usage () {
	echo "use like:"
	echo  "./cpright.sh <INPUT_DIR> <OUTPUT_DIR>"
	exit 1
}

if [ -z $INPUT_DIR ]; then
	show_usage
fi

if [ -z $OUTPUT_DIR ]; then
	show_usage
fi

IMAGES=$(find $INPUT_DIR -name *.jpg  \
	-o -name *.jpeg \
	-o -name *.png)

for IMAGE in $IMAGES;
do
	BASENAME=$(basename $IMAGE)
	convert $IMAGE \
		-auto-orient \
		-resize 1920x1920 \
		-quality 80 \
		-strip \
		-gravity SouthEast \
		-pointsize 28 \
		-stroke '#000' -strokewidth 1 -annotate +15+10 "$COPYRIGHT" \
		-stroke none -fill '#fff' -annotate +15+10 "$COPYRIGHT" \
		$OUTPUT_DIR/$BASENAME
	echo "$BASENAME is resized, copyrighted and copied to $OUTPUT_DIR"
done
