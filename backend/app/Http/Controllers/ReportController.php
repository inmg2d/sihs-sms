<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\ReportCard;
use App\Services\ResultService;

class ReportController extends Controller
{
    public function generate($examId)
    {
        $service = new ResultService();

        foreach (Student::all() as $student) {

            $result = $service->calculateStudentResults(
                $student->id,
                $examId
            );

            ReportCard::updateOrCreate(
                [
                    'student_id' => $student->id,
                    'exam_id' => $examId,
                ],
                [
                    'total' => $result['total'],
                    'average' => $result['average'],
                    'decision' => $result['average'] >= 50
                        ? 'PROMOTED'
                        : 'REPEAT',
                ]
            );
        }

        $cards = ReportCard::where('exam_id', $examId)
            ->orderByDesc('average')
            ->get();

        $position = 1;

        foreach ($cards as $card) {
            $card->position = $position++;
            $card->save();
        }

        return response()->json([
            'message' => 'Report cards generated successfully.'
        ]);
    }

    public function show($studentId, $examId)
    {
        return ReportCard::with([
            'student',
            'exam'
        ])
        ->where('student_id', $studentId)
        ->where('exam_id', $examId)
        ->first();
    }
}
