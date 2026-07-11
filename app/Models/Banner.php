<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    use HasFactory;

    protected $fillable = [
        'eyebrow',
        'title',
        'subtitle',
        'description',
        'image_desktop',
        'image_mobile',
        'button_primary_text',
        'button_primary_url',
        'button_secondary_text',
        'button_secondary_url',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
    ];
}
