<?php

#ini_set('display_errors', 1);
#ini_set('display_startup_errors', 1);
#error_reporting(E_ALL);

header('Content-Type: image/png');
require './tiles.inc.php';

$BASEDIR = '/home/model/apps/wordpress/wp-content/uploads/sites/12/tiles';
$set = $_GET['set'];
$id = $_GET['id'];
$width = $_GET['w'];

$height = getHeightLookup($id, $width);
$file = "$BASEDIR/$set/$id.png";
list($baseWidth, $baseHeight) = getimagesize($file);
$src = imagecreatefrompng($file);

# echo "width =$width, height=$height";
$img = imagecreatetruecolor($width, $height);
imagecopyresampled($img, $src, 0, 0, 0, 0, $width, $height, $baseWidth, $baseHeight);

imagepng($img, null, 0);
imagedestroy($img);
