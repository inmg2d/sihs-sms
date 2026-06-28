<?php

namespace App\Http\Controllers;

use App\Models\StudentBill;
use Illuminate\Http\Request;

class StudentBillController extends Controller
{
    public function index()
    {
        return StudentBill::with([
            'student',
            'schoolClass'
        ])->get();
    }

    public function store(Request $request)
    {
        $data = $request->all();

        $data['balance'] = $data['total_amount'] - $data['amount_paid'];

        if ($data['balance'] <= 0) {
            $data['status'] = 'Paid';
        } elseif ($data['amount_paid'] > 0) {
            $data['status'] = 'Partial';
        } else {
            $data['status'] = 'Pending';
        }

        return StudentBill::create($data);
    }

    public function show(StudentBill $studentBill)
    {
        return $studentBill->load([
            'student',
            'schoolClass'
        ]);
    }

    public function update(Request $request, StudentBill $studentBill)
    {
        $data = $request->all();

        $data['balance'] = $data['total_amount'] - $data['amount_paid'];

        if ($data['balance'] <= 0) {
            $data['status'] = 'Paid';
        } elseif ($data['amount_paid'] > 0) {
            $data['status'] = 'Partial';
        } else {
            $data['status'] = 'Pending';
        }

        $studentBill->update($data);

        return $studentBill;
    }

    public function destroy(StudentBill $studentBill)
    {
        $studentBill->delete();

        return response()->json([
            'success' => true
        ]);
    }
}
