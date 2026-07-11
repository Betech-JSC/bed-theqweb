<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'name',
        'category',
        'price',
        'description',
        'image',
        'banner_image',
        'slug',
        'is_highlight',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'meta_robots',
        'canonical_link',
        'meta_image',
        'pillars',
        'reviews',
        'before_after',
    ];

    protected $casts = [
        'is_highlight' => 'boolean',
        'pillars' => 'array',
        'reviews' => 'array',
        'before_after' => 'array',
    ];
}
