<?php

namespace App\Http\Controllers;

use App\Models\FeeCategory;
use Illuminate\Http\Request;

class FeeCategoryController extends Controller
{
    public function index()
    {
        return FeeCategory::orderBy('name')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|unique:fee_categories',
            'name' => 'required',
            'description' => 'nullable',
            'active' => 'boolean'
        ]);

        return FeeCategory::create($validated);
    }

    public function show(FeeCategory $feeCategory)
    {
        return $feeCategory;
    }

    public function update(Request $request, FeeCategory $feeCategory)
    {
        $validated = $request->validate([
            'code' => 'required|unique:fee_categories,code,' . $feeCategory->id,
            'name' => 'required',
            'description' => 'nullable',
            'active' => 'boolean'
        ]);

        $feeCategory->update($validated);

        return $feeCategory;
    }

    public function destroy(FeeCategory $feeCategory)
    {
        $feeCategory->delete();

        return response()->json([
            'success' => true
        ]);
    }
}
