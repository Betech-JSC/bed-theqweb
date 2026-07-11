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
        'note',
        'status',
    ];
}
