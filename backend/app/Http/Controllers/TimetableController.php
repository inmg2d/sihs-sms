<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Timetable;
use Illuminate\Http\Request;

class TimetableController extends Controller
{
    /**
     * Display all timetable entries.
     */
    public function index()
    {
        return Timetable::with([
            'schoolClass',
            'subject',
            'teacher'
        ])
        ->orderBy('day')
        ->orderBy('start_time')
        ->get();
    }

    /**
     * Store a new timetable entry.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'school_class_id' => 'required|exists:school_classes,id',
            'subject_id'       => 'required|exists:subjects,id',
            'teacher_id'       => 'required|exists:teachers,id',
            'day'              => 'required|string',
            'start_time'       => 'required',
            'end_time'         => 'required|after:start_time',
            'room'             => 'nullable|string|max:100',
        ]);

        // Class conflict
        $classConflict = Timetable::where('school_class_id', $validated['school_class_id'])
            ->where('day', $validated['day'])
            ->where(function ($query) use ($validated) {
                $query->whereBetween('start_time', [
                    $validated['start_time'],
                    $validated['end_time']
                ])
                ->orWhereBetween('end_time', [
                    $validated['start_time'],
                    $validated['end_time']
                ]);
            })
            ->exists();

        if ($classConflict) {
            return response()->json([
                'message' => 'Class already has a lesson scheduled during this time.'
            ], 422);
        }

        // Teacher conflict
        $teacherConflict = Timetable::where('teacher_id', $validated['teacher_id'])
            ->where('day', $validated['day'])
            ->where(function ($query) use ($validated) {
                $query->whereBetween('start_time', [
                    $validated['start_time'],
                    $validated['end_time']
                ])
                ->orWhereBetween('end_time', [
                    $validated['start_time'],
                    $validated['end_time']
                ]);
            })
            ->exists();

        if ($teacherConflict) {
            return response()->json([
                'message' => 'Teacher is already assigned during this time.'
            ], 422);
        }

        // Room conflict
        if (!empty($validated['room'])) {

            $roomConflict = Timetable::where('room', $validated['room'])
                ->where('day', $validated['day'])
                ->where(function ($query) use ($validated) {
                    $query->whereBetween('start_time', [
                        $validated['start_time'],
                        $validated['end_time']
                    ])
                    ->orWhereBetween('end_time', [
                        $validated['start_time'],
                        $validated['end_time']
                    ]);
                })
                ->exists();

            if ($roomConflict) {
                return response()->json([
                    'message' => 'Room is already occupied during this time.'
                ], 422);
            }
        }

        $timetable = Timetable::create($validated);

        return response()->json($timetable, 201);
    }

    /**
     * Display a single timetable entry.
     */
    public function show(Timetable $timetable)
    {
        return $timetable->load([
            'schoolClass',
            'subject',
            'teacher'
        ]);
    }

    /**
     * Update an existing timetable entry.
     */
    public function update(Request $request, Timetable $timetable)
    {
        $validated = $request->validate([
            'school_class_id' => 'required|exists:school_classes,id',
            'subject_id'       => 'required|exists:subjects,id',
            'teacher_id'       => 'required|exists:teachers,id',
            'day'              => 'required|string',
            'start_time'       => 'required',
            'end_time'         => 'required|after:start_time',
            'room'             => 'nullable|string|max:100',
        ]);

        $timetable->update($validated);

        return response()->json($timetable);
    }

    /**
     * Delete a timetable entry.
     */
    public function destroy(Timetable $timetable)
    {
        $timetable->delete();

        return response()->json([
            'message' => 'Timetable entry deleted successfully.'
        ]);
    }
}
