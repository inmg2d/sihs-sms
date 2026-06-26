<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Attendance;

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
        'school_class_id',
        'photo',
        'active'
    ];

    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }

    public function schoolClass()
    {
        return $this->belongsTo(SchoolClass::class);
    }
}
