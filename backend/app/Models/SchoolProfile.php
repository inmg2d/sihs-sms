<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SchoolProfile extends Model
{
    use HasFactory;

    protected $fillable = [

        'school_name',

        'short_name',

        'motto',

        'logo',

        'address',

        'city',

        'region',

        'country',

        'phone',

        'whatsapp',

        'email',

        'website',

        'principal',

        'director_operations',

        'registrar',

        'bursar',

        'currency',

        'timezone',

        'primary_color',

        'secondary_color',

        'school_stamp',

        'active'
    ];

    protected $casts = [

        'active' => 'boolean'

    ];
}
