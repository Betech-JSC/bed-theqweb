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
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'settings' => \App\Models\Setting::pluck('value', 'key')->toArray(),
            'doctors_count' => \App\Models\Doctor::count(),
            'crm_submissions_count' => \App\Models\Submission::where('status', 'Đã liên hệ')->count(),
            'doctors' => \App\Models\Doctor::where('is_active', true)->orderBy('order')->get(),
            'authors' => \App\Models\Author::orderBy('name')->get(),
            'doctor_shifts' => $request->user() ? \App\Models\DoctorShift::with('doctor')->get() : [],
            'service_reviews' => $request->user() ? \App\Models\ServiceReview::with('service')->latest()->get() : [],
            'menu_categories' => \App\Models\ServiceCategory::orderBy('order')->with('services')->get(),
        ];
    }
}
