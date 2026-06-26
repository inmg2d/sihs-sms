<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SchoolClass extends Model
{
    protected $fillable = [
        'name',
        'section',
        'academic_year',
        'active',
    ];

    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }

    public function subjects()
    {
        return $this->belongsToMany(
            Subject::class,
            'class_subject'
        );
    }
public function attendances()
{
    return $this->hasMany(Attendance::class);
}
    public function teachers()
    {
        return $this->belongsToMany(
            Teacher::class,
            'class_teacher_subject'
        )
        ->withPivot('subject_id')
        ->withTimestamps();
    }
}
