<?php

namespace App\Services;

use App\Models\Mark;

class ResultService
{
    public function calculateStudentResults($studentId, $examId)
    {
        $marks = Mark::where('student_id', $studentId)
            ->where('exam_id', $examId)
            ->get();

        $total = $marks->sum('score');

        $subjects = $marks->count();

        $average = $subjects > 0
            ? round($total / $subjects, 2)
            : 0;

        return [
            'total' => $total,
            'average' => $average,
            'subjects' => $subjects,
        ];
    }
}
