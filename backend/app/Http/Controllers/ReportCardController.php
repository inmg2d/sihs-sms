<?php

namespace App\Http\Controllers;

use App\Services\ReportCardService;

class ReportCardController extends Controller
{
    protected $reportCardService;

    public function __construct(ReportCardService $reportCardService)
    {
        $this->reportCardService = $reportCardService;
    }

    /**
     * Generate a student's report card.
     */
    public function show($studentId, $examId)
    {
        return response()->json(
            $this->reportCardService->generate($studentId, $examId)
        );
    }
}
