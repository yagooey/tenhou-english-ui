<?php

#ini_set('display_errors', 1);
#ini_set('display_startup_errors', 1);
#error_reporting(E_ALL);

header('Content-Type: image/png');
require './tiles.inc.php';

$BASEDIR = '/home/model/apps/wordpress/wp-content/uploads/sites/12/tiles';
# $tileSizePrefixes = ['', 'm', 's'];
$set = $_GET['set'];
$id = $_GET['id'];
$width = $_GET['w'];

function resize_image($file, $w, $h, $crop=FALSE) {

    list($width, $height) = getimagesize($file);
    $r = $width / $height;
    if ($crop) {
        if ($width > $height) {
            $width = ceil($width-($width*abs($r-$w/$h)));
        } else {
            $height = ceil($height-($height*abs($r-$w/$h)));
        }
        $newwidth = $w;
        $newheight = $h;
    } else {
        if ($w/$h > $r) {
            $newwidth = $h*$r;
            $newheight = $h;
        } else {
            $newheight = $w/$r;
            $newwidth = $w;
        }
    }
    $src = imagecreatefrompng($file);
    $dst = imagecreatetruecolor($newwidth, $newheight);
    imagecopyresampled($dst, $src, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);

    return $dst;
}
/*
function getSize($w) {

    // find the smallest spritesheet we've got that's >= size requested
    $size = 0;
    for ($i = 1; $i < $heights[$id].length; $i++) {
        if ($w <= $heights[$id][$i]) {
            $size = $i;
        } else break;
    }
    return $size;
}
*/
# list($height, $size) = getDims($width);
$height = getHeightLookup($id, $width);
$file = "$BASEDIR/$set/$id.png";
# $img = resize_image($file, $width, $height, false);

list($baseWidth, $baseHeight) = getimagesize($file);
$src = imagecreatefrompng($file);
# echo "width =$width, height=$height";
$img = imagecreatetruecolor($width, $height);
imagecopyresampled($img, $src, 0, 0, 0, 0, $width, $height, $baseWidth, $baseHeight);

imagepng($img, null, 0);
imagedestroy($img);
