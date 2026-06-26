<?php

namespace App\Http\Controllers;

use App\Models\SchoolClass;
use Illuminate\Http\Request;

class ClassSubjectController extends Controller
{
    public function index()
    {
        return SchoolClass::with('subjects')->get();
    }

    public function store(Request $request)
    {
        $class = SchoolClass::findOrFail($request->school_class_id);

        $class->subjects()->syncWithoutDetaching([
            $request->subject_id
        ]);

        return response()->json([
            'message' => 'Subject assigned successfully'
        ]);
    }

    public function destroy(SchoolClass $class, $subject)
    {
        $class->subjects()->detach($subject);

        return response()->json([
            'message' => 'Subject removed'
        ]);
    }
}
