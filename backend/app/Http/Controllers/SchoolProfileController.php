<?php

namespace App\Http\Controllers;

use App\Models\SchoolProfile;
use Illuminate\Http\Request;

class SchoolProfileController extends Controller
{
    /**
     * Display the school profile.
     */
    public function index()
    {
        return response()->json(
            SchoolProfile::first()
        );
    }

    /**
     * Store a new profile.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([

            'school_name' => 'required|string|max:255',

            'short_name' => 'nullable|string|max:100',

            'motto' => 'nullable|string|max:255',

            'address' => 'nullable|string',

            'city' => 'nullable|string|max:100',

            'region' => 'nullable|string|max:100',

            'country' => 'nullable|string|max:100',

            'phone' => 'nullable|string|max:50',

            'whatsapp' => 'nullable|string|max:50',

            'email' => 'nullable|email',

            'website' => 'nullable|string|max:255',

            'principal' => 'nullable|string|max:255',

            'director_operations' => 'nullable|string|max:255',

            'registrar' => 'nullable|string|max:255',

            'bursar' => 'nullable|string|max:255',

            'currency' => 'nullable|string|max:20',

            'timezone' => 'nullable|string|max:100',

            'primary_color' => 'nullable|string|max:20',

            'secondary_color' => 'nullable|string|max:20',

            'active' => 'boolean'
        ]);

        $profile = SchoolProfile::create($validated);

        return response()->json($profile, 201);
    }

    /**
     * Update profile.
     */
    public function update(Request $request, SchoolProfile $schoolProfile)
    {
        $validated = $request->validate([

            'school_name' => 'required|string|max:255',

            'short_name' => 'nullable|string|max:100',

            'motto' => 'nullable|string|max:255',

            'address' => 'nullable|string',

            'city' => 'nullable|string|max:100',

            'region' => 'nullable|string|max:100',

            'country' => 'nullable|string|max:100',

            'phone' => 'nullable|string|max:50',

            'whatsapp' => 'nullable|string|max:50',

            'email' => 'nullable|email',

            'website' => 'nullable|string|max:255',

            'principal' => 'nullable|string|max:255',

            'director_operations' => 'nullable|string|max:255',

            'registrar' => 'nullable|string|max:255',

            'bursar' => 'nullable|string|max:255',

            'currency' => 'nullable|string|max:20',

            'timezone' => 'nullable|string|max:100',

            'primary_color' => 'nullable|string|max:20',

            'secondary_color' => 'nullable|string|max:20',

            'active' => 'boolean'
        ]);

        $schoolProfile->update($validated);

        return response()->json($schoolProfile);
    }

    /**
     * Delete profile.
     */
    public function destroy(SchoolProfile $schoolProfile)
    {
        $schoolProfile->delete();

        return response()->json([
            'success' => true
        ]);
    }
}
