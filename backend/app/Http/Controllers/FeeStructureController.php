<?php

namespace App\Http\Controllers;

use App\Models\FeeStructure;
use Illuminate\Http\Request;

class FeeStructureController extends Controller
{
    public function index()
    {
        return FeeStructure::with([
            'schoolClass',
            'feeCategory'
        ])->get();
    }

    public function store(Request $request)
    {
        return FeeStructure::create($request->all());
    }

    public function show(FeeStructure $feeStructure)
    {
        return $feeStructure->load([
            'schoolClass',
            'feeCategory'
        ]);
    }

    public function update(Request $request, FeeStructure $feeStructure)
    {
        $feeStructure->update($request->all());

        return $feeStructure;
    }

    public function destroy(FeeStructure $feeStructure)
    {
        $feeStructure->delete();

        return response()->json([
            "success" => true
        ]);
    }
}
