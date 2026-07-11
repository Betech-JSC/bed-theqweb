<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

// Bootstrap Laravel
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$placeholderSource = public_path('images/white-placeholder.png');

if (!file_exists($placeholderSource)) {
    // Generate placeholder if missing
    $width = 800;
    $height = 600;
    $image = imagecreatetruecolor($width, $height);
    $white = imagecolorallocate($image, 255, 255, 255);
    imagefill($image, 0, 0, $white);
    $dir = public_path('images');
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
    imagepng($image, $placeholderSource);
    imagedestroy($image);
    echo "Generated $placeholderSource\n";
}

function ensureImageExists($path) {
    global $placeholderSource;
    if (empty($path) || !is_string($path)) {
        return;
    }
    
    // Check if it's a local web path starting with /images/ or /videos/ etc.
    if (strpos($path, 'http') === 0 || strpos($path, '//') === 0) {
        // External URL, ignore
        return;
    }
    
    // Clean up query parameters or leading slashes
    $cleanPath = ltrim(parse_url($path, PHP_URL_PATH), '/');
    if (empty($cleanPath)) {
        return;
    }
    
    $absolutePath = public_path($cleanPath);
    
    if (!file_exists($absolutePath)) {
        $dir = dirname($absolutePath);
        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }
        
        // Copy the white placeholder to the missing path
        if (copy($placeholderSource, $absolutePath)) {
            echo "Created placeholder for missing asset: $path -> $absolutePath\n";
        } else {
            echo "Failed to create placeholder for: $path\n";
        }
    }
}

function processValueRecursive($value) {
    if (is_string($value)) {
        // If it looks like an image path
        $ext = strtolower(pathinfo($value, PATHINFO_EXTENSION));
        if (in_array($ext, ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'])) {
            ensureImageExists($value);
        }
    } elseif (is_array($value)) {
        foreach ($value as $item) {
            processValueRecursive($item);
        }
    } elseif (is_object($value)) {
        foreach (get_object_vars($value) as $item) {
            processValueRecursive($item);
        }
    }
}

// 1. Scan Articles
if (Schema::hasTable('articles')) {
    echo "Scanning articles...\n";
    $articles = DB::table('articles')->get();
    foreach ($articles as $article) {
        ensureImageExists($article->image);
        if (isset($article->meta_image)) {
            ensureImageExists($article->meta_image);
        }
        // Also parse any image tags inside content
        if (!empty($article->content)) {
            preg_match_all('/<img[^>]+src=["\']([^"\']+)["\']/i', $article->content, $matches);
            if (!empty($matches[1])) {
                foreach ($matches[1] as $imgSrc) {
                    ensureImageExists($imgSrc);
                }
            }
        }
    }
}

// 2. Scan Services
if (Schema::hasTable('services')) {
    echo "Scanning services...\n";
    $services = DB::table('services')->get();
    foreach ($services as $service) {
        ensureImageExists($service->image);
        if (isset($service->meta_image)) {
            ensureImageExists($service->meta_image);
        }
        
        // JSON columns: pillars, reviews, before_after
        if (!empty($service->pillars)) {
            processValueRecursive(json_decode($service->pillars, true));
        }
        if (!empty($service->reviews)) {
            processValueRecursive(json_decode($service->reviews, true));
        }
        if (!empty($service->before_after)) {
            processValueRecursive(json_decode($service->before_after, true));
        }
    }
}

// 3. Scan Banners
if (Schema::hasTable('banners')) {
    echo "Scanning banners...\n";
    $banners = DB::table('banners')->get();
    foreach ($banners as $banner) {
        ensureImageExists($banner->image_desktop);
        if (isset($banner->image_mobile)) {
            ensureImageExists($banner->image_mobile);
        }
    }
}

// 4. Scan Doctors
if (Schema::hasTable('doctors')) {
    echo "Scanning doctors...\n";
    $doctors = DB::table('doctors')->get();
    foreach ($doctors as $doctor) {
        ensureImageExists($doctor->image);
    }
}

// 5. Scan Real Results
if (Schema::hasTable('real_results')) {
    echo "Scanning real_results...\n";
    $results = DB::table('real_results')->get();
    foreach ($results as $result) {
        ensureImageExists($result->image);
        if (isset($result->meta_image)) {
            ensureImageExists($result->meta_image);
        }
        if (isset($result->video) && !empty($result->video)) {
            $ext = strtolower(pathinfo($result->video, PATHINFO_EXTENSION));
            if (in_array($ext, ['mp4', 'webm', 'ogg', 'mov', 'avi'])) {
                $cleanPath = ltrim(parse_url($result->video, PHP_URL_PATH), '/');
                $absolutePath = public_path($cleanPath);
                if (!file_exists($absolutePath)) {
                    $dir = dirname($absolutePath);
                    if (!is_dir($dir)) {
                        mkdir($dir, 0755, true);
                    }
                    touch($absolutePath);
                    echo "Created empty dummy file for missing video: $result->video -> $absolutePath\n";
                }
            }
        }
    }
}

echo "Scan and placeholder generation complete!\n";
