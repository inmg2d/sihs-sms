<?php

namespace App\Http\Controllers;

use App\Models\SchoolClass;
use Illuminate\Http\Request;

class SchoolClassController extends Controller
{
    public function index()
    {
        return SchoolClass::with('teacher')->get();
    }

    public function store(Request $request)
    {
        return SchoolClass::create($request->all());
    }

    public function show(SchoolClass $class)
    {
        return $class->load('teacher');
    }

    public function update(Request $request, SchoolClass $class)
    {
        $class->update($request->all());

        return $class;
    }

    public function destroy(SchoolClass $class)
    {
        $class->delete();

        return response()->json([
            'message' => 'Deleted'
        ]);
    }
}
