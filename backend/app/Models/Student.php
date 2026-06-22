<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = [
        'matricule',
        'first_name',
        'last_name',
        'gender',
        'date_of_birth',
        'phone',
        'parent_name',
        'parent_phone',
        'class',
        'section',
        'photo',
        'active'
    ];
}
