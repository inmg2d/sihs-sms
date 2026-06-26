<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Exam extends Model
{
    protected $fillable = [
        'name',
        'term',
        'academic_year',
        'start_date',
        'end_date',
        'active'
    ];
}
