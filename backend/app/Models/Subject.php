<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    protected $fillable = [
        'code',
        'name',
        'department',
        'coefficient',
        'active'
    ];

    public function teachers()
    {
        return $this->belongsToMany(Teacher::class);
    }

    public function classes()
    {
        return $this->belongsToMany(
            SchoolClass::class,
            'class_subject'
        );
    }
public function teachingAssignments()
{
    return $this->belongsToMany(
        Teacher::class,
        'class_teacher_subject'
    )
    ->withPivot('school_class_id')
    ->withTimestamps();
}
}
