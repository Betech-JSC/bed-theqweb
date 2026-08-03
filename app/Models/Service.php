<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'name',
        'category',
        'service_category_id',
        'price',
        'description',
        'image',
        'banner_image',
        'slug',
        'is_highlight',
        'order',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'meta_robots',
        'canonical_link',
        'meta_image',
        'pillars',
        'reviews',
        'before_after',
        'schema',
    ];

    protected $casts = [
        'is_highlight' => 'boolean',
        'pillars' => 'array',
        'reviews' => 'array',
        'before_after' => 'array',
    ];

    /**
     * Get reviews for the service.
     */
    public function serviceReviews()
    {
        return $this->hasMany(ServiceReview::class);
    }

    /**
     * Get the service category.
     */
    public function serviceCategory()
    {
        return $this->belongsTo(ServiceCategory::class);
    }

    /**
     * Accessor for category string attribute for backward compatibility.
     */
    public function getCategoryAttribute($value)
    {
        return $this->serviceCategory ? $this->serviceCategory->name : $value;
    }
}
