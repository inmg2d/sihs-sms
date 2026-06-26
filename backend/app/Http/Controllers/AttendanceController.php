<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    public function index()
    {
        return Attendance::with([
            'student',
            'schoolClass'
        ])->get();
    }

    public function store(Request $request)
    {
        $attendance = Attendance::updateOrCreate(
            [
                'student_id' => $request->student_id,
                'attendance_date' => $request->attendance_date,
            ],
            [
                'school_class_id' => $request->school_class_id,
                'status' => $request->status,
            ]
        );

        return response()->json($attendance);
    }

    public function destroy(Attendance $attendance)
    {
        $attendance->delete();

        return response()->json([
            'message' => 'Attendance deleted successfully'
        ]);
    }
}
