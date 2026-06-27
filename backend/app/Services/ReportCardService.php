<?php

namespace App\Services;

use App\Models\Student;
use App\Models\Mark;

class ReportCardService
{
    public function generate($studentId, $examId)
    {
        $student = Student::findOrFail($studentId);

        $marks = Mark::with(['subject'])
            ->where('student_id', $studentId)
            ->where('exam_id', $examId)
            ->get();

        $total = $marks->sum('score');

        $average = $marks->count()
            ? round($total / $marks->count(), 2)
            : 0;

        return [
            'student' => $student,
            'marks' => $marks,
            'total' => $total,
            'average' => $average,
        ];
    }
}
