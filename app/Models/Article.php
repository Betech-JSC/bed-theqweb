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
        'image_alt',
        'author_id',
        'legacy_author',
        'published_date',
        'category',
        'is_highlight',
        'status',
        'focus_keyword',
        'related_urls',
        'redirect_urls',
        'views',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'meta_robots',
        'canonical_link',
        'meta_image',
        'schema',
    ];

    protected $casts = [
        'is_highlight' => 'boolean',
        'views' => 'integer',
    ];

    protected $with = ['author'];

    /**
     * Get the author of this article.
     */
    public function author()
    {
        return $this->belongsTo(Author::class, 'author_id');
    }
}
