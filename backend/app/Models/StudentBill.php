<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentBill extends Model
{
    protected $fillable = [

        'student_id',

        'school_class_id',

        'academic_year',

        'term',

        'total_amount',

        'amount_paid',

        'balance',

        'status'

    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function schoolClass()
    {
        return $this->belongsTo(SchoolClass::class);
    }
}
