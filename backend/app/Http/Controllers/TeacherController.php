<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TeacherController extends Controller
{
    public function index()
    {
        return Teacher::all();
    }

    public function store(Request $request)
    {
        $data = $request->all();

        if ($request->hasFile('photo')) {
            $data['photo'] = $request
                ->file('photo')
                ->store('teachers', 'public');
        }

        $teacher = Teacher::create($data);

        return response()->json($teacher, 201);
    }

    public function show(Teacher $teacher)
    {
        return $teacher;
    }

    public function update(Request $request, Teacher $teacher)
    {
        $data = $request->all();

        if ($request->hasFile('photo')) {

            if ($teacher->photo) {
                Storage::disk('public')->delete($teacher->photo);
            }

            $data['photo'] = $request
                ->file('photo')
                ->store('teachers', 'public');
        }

        $teacher->update($data);

        return $teacher;
    }

    public function destroy(Teacher $teacher)
    {
        if ($teacher->photo) {
            Storage::disk('public')->delete($teacher->photo);
        }

        $teacher->delete();

        return response()->json([
            'message' => 'Deleted'
        ]);
    }
}
