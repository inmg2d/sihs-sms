<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use Illuminate\Http\Request;

class ExamController extends Controller
{
    public function index()
    {
        return Exam::orderBy('start_date')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'term' => 'required|string|max:255',
            'academic_year' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'active' => 'boolean',
        ]);

        return Exam::create($validated);
    }

    public function show(Exam $exam)
    {
        return $exam;
    }

    public function update(Request $request, Exam $exam)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'term' => 'sometimes|required|string|max:255',
            'academic_year' => 'sometimes|required|string|max:255',
            'start_date' => 'sometimes|required|date',
            'end_date' => 'sometimes|required|date',
            'active' => 'sometimes|boolean',
        ]);

        $exam->update($validated);

        return $exam;
    }

    public function destroy(Exam $exam)
    {
        $exam->delete();

        return response()->json([
            'success' => true
        ]);
    }
}
