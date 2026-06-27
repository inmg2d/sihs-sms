<?php

namespace App\Services;

use App\Models\GradingScale;

class GradingService
{
    /**
     * Calculate grade, remark and points from a score.
     */
    public function calculate(float $score): array
    {
        $scale = GradingScale::where('active', true)
            ->where('min_score', '<=', $score)
            ->where('max_score', '>=', $score)
            ->first();

        if (!$scale) {
            return [
                'grade' => 'N/A',
                'remark' => 'No Grade Scale',
                'points' => 0,
            ];
        }

        return [
            'grade' => $scale->grade,
            'remark' => $scale->remark,
            'points' => $scale->points,
        ];
    }
}
