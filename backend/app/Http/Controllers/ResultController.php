<?php

namespace App\Http\Controllers;

use App\Models\Mark;
use App\Models\Student;
use App\Models\SchoolClass;
use Illuminate\Http\Request;

class ResultController extends Controller
{
    /**
     * Student Results
     */
    public function student(Student $student)
    {
        $marks = Mark::with([
            'subject',
            'exam'
        ])
        ->where('student_id', $student->id)
        ->get();

        $total = $marks->sum('score');

        $average = $marks->count()
            ? round($total / $marks->count(), 2)
            : 0;

        return response()->json([
            'student' => $student,
            'marks' => $marks,
            'total' => $total,
            'average' => $average,
        ]);
    }

    /**
     * Class Results
     */
    public function class(SchoolClass $class)
    {
        $students = Student::where(
            'school_class_id',
            $class->id
        )->get();

        $results = [];

        foreach ($students as $student) {

            $marks = Mark::where(
                'student_id',
                $student->id
            )->get();

            $total = $marks->sum('score');

            $average = $marks->count()
                ? round($total / $marks->count(), 2)
                : 0;

            $results[] = [
                'student' => $student,
                'total' => $total,
                'average' => $average,
            ];
        }

        return response()->json($results);
    }

    /**
     * Class Ranking
     */
    public function ranking($class, $exam)
    {
        $students = Student::where(
            'school_class_id',
            $class
        )->get();

        $ranking = [];

        foreach ($students as $student) {

            $marks = Mark::where(
                'student_id',
                $student->id
            )
            ->where('exam_id', $exam)
            ->get();

            $total = $marks->sum('score');

            $average = $marks->count()
                ? round($total / $marks->count(), 2)
                : 0;

            $ranking[] = [
                'student' => $student,
                'total' => $total,
                'average' => $average,
            ];
        }

        usort($ranking, function ($a, $b) {
            return $b['average'] <=> $a['average'];
        });

        foreach ($ranking as $index => &$row) {
            $row['position'] = $index + 1;
        }

        return response()->json($ranking);
    }
}
