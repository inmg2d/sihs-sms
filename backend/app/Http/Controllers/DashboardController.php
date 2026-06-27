<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Teacher;
use App\Models\Subject;
use App\Models\SchoolClass;
use App\Models\Exam;
use App\Models\Mark;

class DashboardController extends Controller
{
    public function index()
    {
        return response()->json([
            "students" => Student::count(),
            "teachers" => Teacher::count(),
            "subjects" => Subject::count(),
            "classes" => SchoolClass::count(),
            "exams" => Exam::count(),
            "marks" => Mark::count(),
        ]);
    }
}
