<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServiceReview extends Model
{
    protected $fillable = [
        'service_id',
        'name',
        'rating',
        'comment',
        'is_approved',
    ];

    protected $casts = [
        'is_approved' => 'boolean',
    ];

    /**
     * Get the service this review belongs to.
     */
    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}
