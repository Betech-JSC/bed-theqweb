<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'avatar',
        'role',
        'bio',
        'description',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'meta_robots',
        'canonical_link',
        'meta_image',
    ];

    /**
     * Get all articles written by this author.
     */
    public function articles()
    {
        return $this->hasMany(Article::class, 'author_id');
    }
}
