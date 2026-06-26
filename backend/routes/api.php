<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClassTeacherSubjectController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\SchoolClassController;
use App\Http\Controllers\AssignmentController;
use App\Http\Controllers\ClassSubjectController;
use App\Http\Controllers\TimetableController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\MarkController;
use App\Http\Controllers\ReportController;

Route::apiResource('attendances', AttendanceController::class)
     ->only(['index', 'store', 'destroy']);
Route::apiResource('exams', ExamController::class);
Route::apiResource('timetables', TimetableController::class);
Route::get('/class-subjects', [ClassSubjectController::class, 'index']);
Route::post('/class-subjects', [ClassSubjectController::class, 'store']);
Route::delete('/class-subjects/{class}/{subject}', [ClassSubjectController::class, 'destroy']);
Route::get('/class-teacher-subjects', [ClassTeacherSubjectController::class, 'index']);
Route::apiResource('marks', MarkController::class);
Route::post(
    '/reports/generate/{exam}',
    [ReportController::class, 'generate']
);

Route::get(
    '/reports/{student}/{exam}',
    [ReportController::class, 'show']
);

Route::post('/class-teacher-subjects', [ClassTeacherSubjectController::class, 'store']);

Route::delete(
    '/class-teacher-subjects/{class}/{teacher}',
    [ClassTeacherSubjectController::class, 'destroy']
);
Route::apiResource('students', StudentController::class);
Route::apiResource('teachers', TeacherController::class);
Route::apiResource('subjects', SubjectController::class);
Route::apiResource('classes', SchoolClassController::class);

Route::get('/assignments', [AssignmentController::class, 'index']);
Route::post('/assignments', [AssignmentController::class, 'store']);
Route::delete('/assignments/{teacher}/{subject}', [AssignmentController::class, 'destroy']);
