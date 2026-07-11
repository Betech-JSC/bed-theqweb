<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'description',
        'content',
        'image',
        'author',
        'published_date',
        'category',
        'is_highlight',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'meta_robots',
        'canonical_link',
        'meta_image',
    ];

    protected $casts = [
        'is_highlight' => 'boolean',
    ];
}
