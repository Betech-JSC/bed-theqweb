<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();
        // Tái sử dụng settings đã nạp ở CheckMaintenanceMode để tránh query trùng
        $settings = $request->attributes->get('site_settings')
            ?? \App\Models\Setting::pluck('value', 'key')->toArray();

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'settings' => $settings,
            // Chỉ truy vấn dữ liệu quản trị/phòng khám khi admin đã đăng nhập để tối ưu tốc độ blog công khai
            'doctors_count' => $user ? \App\Models\Doctor::count() : 0,
            'crm_submissions_count' => $user ? \App\Models\Submission::where('status', 'Đã liên hệ')->count() : 0,
            'doctors' => $user ? \App\Models\Doctor::where('is_active', true)->orderBy('order')->get() : [],
            'authors' => $user ? \App\Models\Author::orderBy('name')->get() : [],
            'doctor_shifts' => $user ? \App\Models\DoctorShift::with('doctor')->get() : [],
            'service_reviews' => $user ? \App\Models\ServiceReview::with('service')->latest()->get() : [],
            'menu_categories' => $user ? \App\Models\ServiceCategory::orderBy('order')->with('services')->get() : [],
        ];
    }
}
