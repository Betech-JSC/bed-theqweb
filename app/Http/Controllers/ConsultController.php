<?php

namespace App\Http\Controllers;

use App\Models\Submission;
use Illuminate\Http\Request;

class ConsultController extends Controller
{
    /**
     * Store a new consultation/booking submission.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:50',
            'email' => 'nullable|email|max:255',
            'service' => 'nullable|string|max:255',
            'branch' => 'nullable|string|max:255',
            'booking_date' => 'nullable|date',
            'booking_time' => 'nullable|string|max:50',
            'doctor_id' => 'nullable|exists:doctors,id',
            'note' => 'nullable|string',
        ]);

        Submission::create($validated);

        return back()->with('success', 'Đặt lịch hẹn thành công! Chúng tôi sẽ liên hệ lại bạn để xác nhận sớm nhất.');
    }

    /**
     * Fetch all booked slots for calendar display.
     */
    public function getBookedSlots()
    {
        $bookings = Submission::whereNotNull('booking_date')
            ->where('status', '!=', 'Đã hủy')
            ->select('booking_date', 'booking_time', 'doctor_id', 'branch')
            ->get();
            
        return response()->json($bookings);
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
     * Update an existing consultation/booking submission.
     */
    public function update(Request $request, Submission $submission)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:50',
            'email' => 'nullable|email|max:255',
            'service' => 'nullable|string|max:255',
            'branch' => 'nullable|string|max:255',
            'booking_date' => 'nullable|date',
            'booking_time' => 'nullable|string|max:50',
            'doctor_id' => 'nullable|exists:doctors,id',
            'note' => 'nullable|string',
            'status' => 'nullable|string|max:50',
        ]);

        $submission->update($validated);

        return back()->with('success', 'Cập nhật lịch hẹn thành công.');
    }

    /**
     * Delete a submission.
     */
    public function destroy(Submission $submission)
    {
        $submission->delete();

        return back()->with('success', 'Xóa lượt đăng ký thành công.');
    }

    /**
     * Get a doctor's active weekly shifts and currently booked dates/times.
     */
    public function getDoctorSchedule(Request $request)
    {
        $doctorId = $request->query('doctor_id');
        $branch = $request->query('branch');

        if (!$doctorId) {
            return response()->json(['error' => 'Doctor ID is required'], 400);
        }

        // Fetch shifts
        $shifts = \App\Models\DoctorShift::where('doctor_id', $doctorId)
            ->when($branch, function($q) use ($branch) {
                return $q->where('branch', $branch);
            })
            ->get();

        // Fetch active bookings for this doctor to show taken slots
        $bookings = Submission::where('doctor_id', $doctorId)
            ->whereNotNull('booking_date')
            ->where('status', '!=', 'Đã hủy')
            ->select('booking_date', 'booking_time', 'branch')
            ->get();

        return response()->json([
            'shifts' => $shifts,
            'bookings' => $bookings
        ]);
    }

    /**
     * Submit a review for a service.
     */
    public function storeReview(Request $request)
    {
        $validated = $request->validate([
            'service_id' => 'required|exists:services,id',
            'name' => 'required|string|max:255',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|max:1000',
        ]);

        \App\Models\ServiceReview::create([
            'service_id' => $validated['service_id'],
            'name' => $validated['name'],
            'rating' => $validated['rating'],
            'comment' => $validated['comment'],
            'is_approved' => false, // Requires admin approval
        ]);

        return back()->with('success', 'Cảm ơn đánh giá của bạn! Đánh giá của bạn đang được kiểm duyệt trước khi hiển thị.');
    }
}
