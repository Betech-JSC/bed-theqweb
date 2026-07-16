<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Submission extends Model
{
    protected $fillable = [
        'name',
        'phone',
        'email',
        'service',
        'branch',
        'booking_date',
        'booking_time',
        'doctor_id',
        'note',
        'status',
    ];

    protected $with = ['doctor'];

    /**
     * Get the doctor selected for this booking.
     */
    public function doctor()
    {
        return $this->belongsTo(Doctor::class, 'doctor_id');
    }
}
