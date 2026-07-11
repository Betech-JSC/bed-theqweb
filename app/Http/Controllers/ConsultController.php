<?php

namespace App\Http\Controllers;

use App\Models\Submission;
use Illuminate\Http\Request;

class ConsultController extends Controller
{
    /**
     * Store a new consultation submission.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:50',
            'email' => 'nullable|email|max:255',
            'service' => 'nullable|string|max:255',
            'branch' => 'nullable|string|max:255',
            'note' => 'nullable|string',
        ]);

        Submission::create($validated);

        return back()->with('success', 'Đăng ký tư vấn thành công! Chúng tôi sẽ liên hệ lại bạn sớm nhất.');
    }

    /**
     * Update the status of a submission.
     */
    public function updateStatus(Request $request, Submission $submission)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:Chờ liên hệ,Đã liên hệ,Đã hủy',
        ]);

        $submission->update(['status' => $validated['status']]);

        return back()->with('success', 'Cập nhật trạng thái thành công.');
    }

    /**
     * Delete a submission.
     */
    public function destroy(Submission $submission)
    {
        $submission->delete();

        return back()->with('success', 'Xóa lượt đăng ký thành công.');
    }
}
