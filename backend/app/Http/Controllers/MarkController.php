<?php

namespace App\Http\Controllers;

use App\Models\Mark;
use Illuminate\Http\Request;
use App\Services\GradingService;

class MarkController extends Controller
{
    protected $gradingService;

    public function __construct(GradingService $gradingService)
    {
        $this->gradingService = $gradingService;
    }

    public function index()
    {
        return Mark::with([
            'student',
            'exam',
            'subject',
            'teacher'
        ])->get();
    }

    public function store(Request $request)
    {
$validated = $request->validate([
    'student_id'      => 'required|exists:students,id',
    'school_class_id' => 'required|exists:school_classes,id',
    'exam_id'         => 'required|exists:exams,id',
    'subject_id'      => 'required|exists:subjects,id',
    'teacher_id'      => 'required|exists:teachers,id',
    'score'           => 'required|numeric|min:0|max:100',
]);

        $grading = $this->gradingService->calculate($validated['score']);

        $validated['grade'] = $grading['grade'];
        $validated['remark'] = $grading['remark'];
        $validated['points'] = $grading['points'];

        return Mark::updateOrCreate(
            [
                'student_id' => $validated['student_id'],
                'exam_id' => $validated['exam_id'],
                'subject_id' => $validated['subject_id'],
            ],
            $validated
        );
    }

    public function destroy(Mark $mark)
    {
        $mark->delete();

        return response()->json([
            'success' => true
        ]);
    }
}
