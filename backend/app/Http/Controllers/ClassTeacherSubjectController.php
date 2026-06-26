<?php

namespace App\Http\Controllers;

use App\Models\SchoolClass;
use Illuminate\Http\Request;

class ClassTeacherSubjectController extends Controller
{
    public function index()
    {
        return SchoolClass::with([
            'teachers',
            'subjects'
        ])->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'school_class_id' => 'required|exists:school_classes,id',
            'teacher_id'      => 'required|exists:teachers,id',
            'subject_id'      => 'required|exists:subjects,id',
        ]);

        $class = SchoolClass::findOrFail($request->school_class_id);

        $class->teachers()->syncWithoutDetaching([
            $request->teacher_id => [
                'subject_id' => $request->subject_id,
            ]
        ]);

        return response()->json([
            'message' => 'Teacher assigned successfully.'
        ]);
    }

    public function destroy($class, $teacher)
    {
        $schoolClass = SchoolClass::findOrFail($class);

        $schoolClass->teachers()->detach($teacher);

        return response()->json([
            'message' => 'Assignment removed.'
        ]);
    }
}
