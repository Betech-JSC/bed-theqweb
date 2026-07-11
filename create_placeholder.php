<?php
$width = 800;
$height = 600;
$image = imagecreatetruecolor($width, $height);
$white = imagecolorallocate($image, 255, 255, 255);
imagefill($image, 0, 0, $white);
$dir = __DIR__ . '/public/images';
if (!is_dir($dir)) {
    mkdir($dir, 0755, true);
}
imagepng($image, $dir . '/white-placeholder.png');
imagedestroy($image);
echo "White placeholder image created successfully at public/images/white-placeholder.png\n";
