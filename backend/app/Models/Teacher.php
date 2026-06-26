<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    protected $fillable = [
        'staff_id',
        'first_name',
        'last_name',
        'gender',
        'phone',
        'email',
        'qualification',
        'specialization',
        'photo',
        'active'
    ];
public function classes()
{
    return $this->belongsToMany(
        SchoolClass::class,
        'class_teacher_subject'
    )
    ->withPivot('subject_id')
    ->withTimestamps();
}
    public function subjects()
    {
        return $this->belongsToMany(Subject::class);
    }
}
