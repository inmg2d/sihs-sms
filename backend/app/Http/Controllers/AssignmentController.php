<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use Illuminate\Http\Request;

class AssignmentController extends Controller
{
    public function index()
    {
        return Teacher::with('subjects')->get();
    }

    public function store(Request $request)
    {
        $teacher = Teacher::findOrFail($request->teacher_id);

        $teacher->subjects()->syncWithoutDetaching([
            $request->subject_id
        ]);

        return response()->json([
            'message' => 'Assigned successfully'
        ]);
    }

    public function destroy($teacherId, $subjectId)
    {
        $teacher = Teacher::findOrFail($teacherId);

        $teacher->subjects()->detach($subjectId);

        return response()->json([
            'message' => 'Assignment removed'
        ]);
    }
}
