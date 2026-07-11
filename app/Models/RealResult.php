<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RealResult extends Model
{
    use HasFactory;

    protected $fillable = [
        'category',
        'title',
        'detail',
        'image',
        'is_video',
        'order',
        'slug',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'meta_robots',
        'canonical_link',
        'meta_image',
        'video',
    ];

    protected $casts = [
        'is_video' => 'boolean',
        'order' => 'integer',
    ];
}
