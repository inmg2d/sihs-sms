<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class StudentController extends Controller
{
    public function index()
    {
        return Student::all();
    }

    public function store(Request $request)
{
    $data = $request->all();

    if ($request->hasFile('photo')) {
        $data['photo'] = $request
            ->file('photo')
            ->store('students', 'public');
    }

    $student = Student::create($data);

    return response()->json($student, 201);
}

    public function show(Student $student)
    {
        return $student;
    }

public function update(Request $request, Student $student)
{
    $data = $request->all();

    if ($request->hasFile('photo')) {

        if ($student->photo) {
            Storage::disk('public')->delete($student->photo);
        }

        $data['photo'] = $request
            ->file('photo')
            ->store('students', 'public');
    }

    $student->update($data);

    return $student;
}

    public function destroy(Student $student)
    {
        $student->delete();

        return response()->json(['message' => 'Deleted']);
    }
}
