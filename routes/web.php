<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ConsultController;
use App\Http\Controllers\ContentController;
use App\Http\Controllers\MediaController;
use App\Models\Article;
use App\Models\Service;
use App\Models\Submission;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// 1. Client-facing Spa Routes
Route::get('/', function () {
    return Inertia::render('Home', [
        'articles' => Article::where('is_highlight', true)->latest()->get(),
        'services' => Service::latest()->get(),
        'banners' => \App\Models\Banner::where('is_active', true)->orderBy('order')->get(),
        'doctors' => \App\Models\Doctor::orderBy('order')->get(),
        'faqs' => \App\Models\Faq::orderBy('order')->get(),
        'realResults' => \App\Models\RealResult::latest()->get(),
    ]);
});

Route::get('/dich-vu', function () {
    return Inertia::render('DichVu', [
        'services' => \App\Models\Service::latest()->get(),
        'categoriesList' => \App\Models\ServiceCategory::orderBy('order')->pluck('name')->toArray(),
    ]);
});

Route::get('/gioi-thieu', function () {
    return Inertia::render('GioiThieu', [
        'doctors' => \App\Models\Doctor::orderBy('order')->get(),
        'realResults' => \App\Models\RealResult::orderBy('order')->latest()->get(),
    ]);
});

Route::get('/phau-thuat-tham-my', function () {
    $category = \App\Models\ServiceCategory::where('slug', 'phau-thuat-tham-my')->first();
    return Inertia::render('PhauThuatThamMy', [
        'doctors' => \App\Models\Doctor::orderBy('order')->get(),
        'services' => $category ? $category->services()->latest()->get() : collect(),
    ]);
});

Route::get('/da-lieu-tre-hoa', function () {
    $category = \App\Models\ServiceCategory::where('slug', 'da-lieu-tre-hoa')->first();
    return Inertia::render('DaLieuTreHoa', [
        'doctors' => \App\Models\Doctor::orderBy('order')->get(),
        'services' => $category ? $category->services()->latest()->get() : collect(),
    ]);
});

Route::get('/cay-toc-y-khoa', function () {
    $service = \App\Models\Service::where('slug', 'cay-toc-y-khoa')->firstOrFail();
    $reviews = $service->serviceReviews()->where('is_approved', true)->latest()->get();
    return Inertia::render('DichVuDetail', [
        'service' => array_merge($service->toArray(), [
            'db_reviews' => $reviews
        ])
    ]);
});

Route::get('/ket-qua', function () {
    return Inertia::render('KetQua', [
        'faqs' => \App\Models\Faq::orderBy('order')->get(),
        'realResults' => \App\Models\RealResult::latest()->get(),
    ]);
});

Route::get('/tin-tuc', function () {
    return Inertia::render('TinTuc', [
        'initialArticles' => Article::latest()->get()
    ]);
});

Route::get('/tin-tuc/{slug}', function ($slug) {
    $article = Article::where('slug', $slug)->firstOrFail();
    
    // Parse TOC in PHP
    $content = $article->content;
    $toc = [];
    if ($content) {
        $index = 0;
        $content = preg_replace_callback('/<(h[23])(.*?)>(.*?)<\/h[23]>/i', function ($matches) use (&$toc, &$index) {
            $tag = strtolower($matches[1]);
            $text = strip_tags($matches[3]);
            $id = "toc-heading-{$index}";
            $index++;
            
            $level = ($tag === 'h2') ? 2 : 3;
            $toc[] = [
                'id' => $id,
                'text' => $text,
                'level' => $level
            ];
            
            $class = ($tag === 'h2') 
                ? 'text-2xl md:text-3xl font-serif font-bold text-gray-800 mt-12 mb-6 border-l-4 border-gold pl-4 scroll-mt-28' 
                : 'text-xl md:text-2xl font-serif font-bold text-gray-800 mt-8 mb-4 scroll-mt-28';
                
            return "<{$tag} id=\"{$id}\" class=\"{$class}\">{$matches[3]}</{$tag}>";
        }, $content);
        
        $content = preg_replace('/<p(.*?)>/i', '<p class="text-lg md:text-[20px] text-gray-700 leading-[1.8] font-light mb-6">', $content);
        $content = preg_replace('/<ul(.*?)>/i', '<ul class="list-disc pl-6 mb-6 space-y-3 text-lg md:text-[20px] text-gray-700 font-light leading-[1.8]">', $content);
        $content = preg_replace('/<ol(.*?)>/i', '<ol class="list-decimal pl-6 mb-6 space-y-3 text-lg md:text-[20px] text-gray-700 font-light leading-[1.8]">', $content);
        $content = preg_replace_callback('/<img(.*?)src=["\'](.*?)["\'](.*?)>/i', function ($m) {
            return "<img class=\"rounded-[24px] shadow-md my-8 w-full object-cover max-h-[550px]\" src=\"{$m[2]}\" {$m[3]}>";
        }, $content);
        $content = preg_replace('/<blockquote(.*?)>/i', '<blockquote class="border-l-4 border-gold pl-5 py-3 my-8 italic text-xl md:text-2xl text-gray-650 bg-gold/5 rounded-r-2xl font-serif font-light leading-relaxed">', $content);
    }
    
    $related = Article::where('id', '!=', $article->id)->latest()->take(3)->get();
    
    return Inertia::render('TinTucDetail', [
        'article' => array_merge($article->toArray(), [
            'content' => $content
        ]),
        'toc' => $toc,
        'relatedArticles' => $related
    ]);
})->name('tin-tuc.detail');

Route::get('/dich-vu/{slug}', function ($slug) {
    $service = Service::where('slug', $slug)->firstOrFail();
    $reviews = $service->serviceReviews()->where('is_approved', true)->latest()->get();
    return Inertia::render('DichVuDetail', [
        'service' => array_merge($service->toArray(), [
            'db_reviews' => $reviews
        ])
    ]);
})->name('dich-vu.detail');

Route::get('/lien-he', function () {
    return Inertia::render('LienHe');
});

Route::get('/chinh-sach-bao-mat', function () { return Inertia::render('ChinhSachBaoMat'); });
Route::get('/dieu-khoan-su-dung', function () { return Inertia::render('DieuKhoanSuDung'); });
Route::get('/chinh-sach-thanh-toan', function () { return Inertia::render('ChinhSachThanhToan'); });
Route::get('/chinh-sach-hoan-tien', function () { return Inertia::render('ChinhSachHoanTien'); });
Route::get('/tuyen-bo-mien-tru-trach-nhiem', function () { return Inertia::render('TuyenBoMienTruTrachNhiem'); });

// Consultation signup POST route
Route::post('/consult', [ConsultController::class, 'store'])->name('consult.store');
Route::get('/api/booked-slots', [ConsultController::class, 'getBookedSlots'])->name('api.booked-slots');
Route::post('/api/reviews', [ConsultController::class, 'storeReview'])->name('api.reviews.store');
Route::get('/api/doctor-schedule', [ConsultController::class, 'getDoctorSchedule'])->name('api.doctor-schedule');

Route::get('/tac-gia/{slug}', function ($slug) {
    $author = \App\Models\Author::where('slug', $slug)->firstOrFail();
    $articles = Article::where('author_id', $author->id)->latest()->get();
    return Inertia::render('TacGiaDetail', [
        'author' => $author,
        'articles' => $articles
    ]);
})->name('author.detail');

Route::get('/dat-lich', function () {
    return Inertia::render('DatLich', [
        'doctors' => \App\Models\Doctor::where('is_active', true)->orderBy('order')->get(),
    ]);
})->name('booking.page');

// 2. Admin CMS Dashboard Routes (Protected)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/admin', function () {
        return redirect()->route('dashboard');
    });

    Route::get('/dashboard', function () {
        // Generate daily registration counts for the last 7 days for the interactive SVG chart
        $days = collect();
        for ($i = 6; $i >= 0; $i--) {
            $days->put(now()->subDays($i)->format('d/m'), 0);
        }

        $submissionsDaily = Submission::where('created_at', '>=', now()->subDays(6)->startOfDay())
            ->get()
            ->groupBy(function ($submission) {
                return \Carbon\Carbon::parse($submission->created_at)->format('d/m');
            })
            ->map(fn ($group) => $group->count());

        $chartData = [];
        foreach ($days as $date => $count) {
            $chartData[] = [
                'date' => (string)$date,
                'count' => (int)$submissionsDaily->get($date, 0)
            ];
        }

        return Inertia::render('Dashboard', [
            'submissions' => Submission::latest()->get(),
            'articles' => Article::latest()->get(),
            'services' => Service::latest()->get(),
            'serviceCategories' => \App\Models\ServiceCategory::orderBy('order')->get(),
            'banners' => \App\Models\Banner::orderBy('order')->get(),
            'doctors' => \App\Models\Doctor::orderBy('order')->get(),
            'faqs' => \App\Models\Faq::orderBy('order')->get(),
            'realResults' => \App\Models\RealResult::latest()->get(),
            'authors' => \App\Models\Author::latest()->get(),
            'analytics' => [
                'daily_trends' => $chartData,
            ],
        ]);
    })->name('dashboard');

    // Consult Submission management
    Route::patch('/admin/submissions/{submission}/status', [ConsultController::class, 'updateStatus'])->name('admin.submissions.status');
    Route::patch('/admin/submissions/{submission}', [ConsultController::class, 'update'])->name('admin.submissions.update');
    Route::delete('/admin/submissions/{submission}', [ConsultController::class, 'destroy'])->name('admin.submissions.destroy');
    Route::get('/admin/submissions/export', [ContentController::class, 'exportSubmissionsCsv'])->name('admin.submissions.export');

    // Article management CRUD
    Route::post('/admin/articles', [ContentController::class, 'storeArticle'])->name('admin.articles.store');
    Route::post('/admin/articles/{article}', [ContentController::class, 'updateArticle'])->name('admin.articles.update'); // POST due to multipart/form-data upload bugs in PUT
    Route::delete('/admin/articles/{article}', [ContentController::class, 'destroyArticle'])->name('admin.articles.destroy');
    Route::patch('/admin/articles/{article}/toggle-highlight', [ContentController::class, 'toggleHighlightArticle'])->name('admin.articles.toggle-highlight');

    // Service management CRUD
    Route::post('/admin/services', [ContentController::class, 'storeService'])->name('admin.services.store');
    Route::post('/admin/services/{service}', [ContentController::class, 'updateService'])->name('admin.services.update'); // POST due to multipart/form-data upload bugs in PUT
    Route::delete('/admin/services/{service}', [ContentController::class, 'destroyService'])->name('admin.services.destroy');
    Route::patch('/admin/services/{service}/toggle-highlight', [ContentController::class, 'toggleHighlightService'])->name('admin.services.toggle-highlight');

    // Service Category management CRUD
    Route::post('/admin/service-categories', [ContentController::class, 'storeServiceCategory'])->name('admin.service-categories.store');
    Route::post('/admin/service-categories/{category}', [ContentController::class, 'updateServiceCategory'])->name('admin.service-categories.update');
    Route::delete('/admin/service-categories/{category}', [ContentController::class, 'destroyServiceCategory'])->name('admin.service-categories.destroy');

    // Banner management CRUD
    Route::post('/admin/banners', [ContentController::class, 'storeBanner'])->name('admin.banners.store');
    Route::post('/admin/banners/{banner}', [ContentController::class, 'updateBanner'])->name('admin.banners.update');
    Route::delete('/admin/banners/{banner}', [ContentController::class, 'destroyBanner'])->name('admin.banners.destroy');

    // Doctor management CRUD
    Route::post('/admin/doctors', [ContentController::class, 'storeDoctor'])->name('admin.doctors.store');
    Route::post('/admin/doctors/{doctor}', [ContentController::class, 'updateDoctor'])->name('admin.doctors.update');
    Route::delete('/admin/doctors/{doctor}', [ContentController::class, 'destroyDoctor'])->name('admin.doctors.destroy');

    // FAQ management CRUD
    Route::post('/admin/faqs', [ContentController::class, 'storeFaq'])->name('admin.faqs.store');
    Route::post('/admin/faqs/{faq}', [ContentController::class, 'updateFaq'])->name('admin.faqs.update');
    Route::delete('/admin/faqs/{faq}', [ContentController::class, 'destroyFaq'])->name('admin.faqs.destroy');

    // Real Results management CRUD
    Route::post('/admin/real-results', [ContentController::class, 'storeRealResult'])->name('admin.real-results.store');
    Route::post('/admin/real-results/{realResult}', [ContentController::class, 'updateRealResult'])->name('admin.real-results.update');
    Route::delete('/admin/real-results/{realResult}', [ContentController::class, 'destroyRealResult'])->name('admin.real-results.destroy');

    // System Settings management
    Route::post('/admin/settings', [ContentController::class, 'updateSettings'])->name('admin.settings.update');

    // Author management CRUD
    Route::post('/admin/authors', [ContentController::class, 'storeAuthor'])->name('admin.authors.store');
    Route::post('/admin/authors/{author}', [ContentController::class, 'updateAuthor'])->name('admin.authors.update');
    Route::delete('/admin/authors/{author}', [ContentController::class, 'destroyAuthor'])->name('admin.authors.destroy');

    // Editor Image Upload
    Route::post('/admin/upload-image', [ContentController::class, 'uploadImage'])->name('admin.upload-image');

    // Media Library Routes
    Route::get('/admin/media', [MediaController::class, 'index'])->name('admin.media.index');
    Route::post('/admin/media/folder', [MediaController::class, 'createFolder'])->name('admin.media.folder.create');
    Route::delete('/admin/media/folder/{folder}', [MediaController::class, 'deleteFolder'])->name('admin.media.folder.destroy');
    Route::post('/admin/media/upload', [MediaController::class, 'upload'])->name('admin.media.upload');
    Route::delete('/admin/media/file/{file}', [MediaController::class, 'destroy'])->name('admin.media.file.destroy');
    Route::post('/admin/media/files/bulk-delete', [MediaController::class, 'bulkDestroy'])->name('admin.media.files.bulk-delete');

    // Doctor Shifts CRUD
    Route::post('/admin/doctor-shifts', [ContentController::class, 'storeDoctorShift'])->name('admin.doctor-shifts.store');
    Route::delete('/admin/doctor-shifts/{shift}', [ContentController::class, 'destroyDoctorShift'])->name('admin.doctor-shifts.destroy');

    // Review moderation CRUD
    Route::post('/admin/reviews/{review}/toggle-approval', [ContentController::class, 'toggleReviewApproval'])->name('admin.reviews.toggle-approval');
    Route::delete('/admin/reviews/{review}', [ContentController::class, 'destroyReview'])->name('admin.reviews.destroy');
});

// Profile settings (Laravel default)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Dynamic fallback route for service category slugs
Route::get('/{slug}', function ($slug) {
    $category = \App\Models\ServiceCategory::where('slug', $slug)->first();
    if ($category) {
        return redirect()->to('/dich-vu?category=' . urlencode($category->name));
    }
    abort(404);
});

require __DIR__.'/auth.php';
