<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ContentController extends Controller
{
    /**
     * Generate a unique slug for the given model.
     */
    private function uniqueSlug(string $modelClass, string $base, ?int $excludeId = null): string
    {
        $slug = Str::slug($base);
        if (empty($slug)) {
            $slug = 'item-' . time();
        }
        $original = $slug;
        $counter = 1;
        $query = $modelClass::where('slug', $slug);
        if ($excludeId) {
            $query->where('id', '!=', $excludeId);
        }
        while ($query->exists()) {
            $slug = $original . '-' . $counter;
            $counter++;
            $query = $modelClass::where('slug', $slug);
            if ($excludeId) {
                $query->where('id', '!=', $excludeId);
            }
        }
        return $slug;
    }

    // Article CRUD
    public function storeArticle(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'content' => 'required|string',
            'legacy_author' => 'nullable|string|max:255',
            'author_id' => 'nullable|exists:authors,id',
            'published_date' => 'required|string|max:100',
            'category' => 'required|string|max:255',
            'image_file' => 'nullable|image|max:5120',
            'image' => 'nullable|string|max:255',
            'image_alt' => 'nullable|string|max:255',
            'is_highlight' => 'nullable|integer',
            'status' => 'nullable|string|in:published,draft',
            'focus_keyword' => 'nullable|string|max:255',
            'related_urls' => 'nullable|string',
            'redirect_urls' => 'nullable|string',
            'slug' => 'nullable|string|max:255',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string|max:255',
            'meta_robots' => 'nullable|string|max:255',
            'canonical_link' => 'nullable|string|max:255',
            'meta_image' => 'nullable|string|max:255',
            'schema' => 'nullable|string',
        ]);

        $slug = $this->uniqueSlug(Article::class, $validated['slug'] ?? $validated['title']);

        $imagePath = '/images/default-blog.svg';
        if ($request->hasFile('image_file')) {
            $file = $request->file('image_file');
            $ext = strtolower($file->getClientOriginalExtension());
            $filename = $slug . '-' . time() . '.' . $ext;
            $file->move(public_path('images'), $filename);
            $imagePath = '/images/' . $filename;
        } elseif ($request->filled('image')) {
            $imagePath = $request->input('image');
        }

        Article::create([
            'title' => $validated['title'],
            'slug' => $slug,
            'description' => $validated['description'],
            'content' => $validated['content'],
            'legacy_author' => $validated['legacy_author'] ?? 'Ban Biên Tập',
            'author_id' => $validated['author_id'] ?? null,
            'published_date' => $validated['published_date'],
            'category' => $validated['category'],
            'image' => $imagePath,
            'image_alt' => $validated['image_alt'] ?? $validated['title'],
            'is_highlight' => $request->boolean('is_highlight'),
            'status' => $validated['status'] ?? 'published',
            'focus_keyword' => $validated['focus_keyword'] ?? null,
            'related_urls' => $validated['related_urls'] ?? null,
            'redirect_urls' => $validated['redirect_urls'] ?? null,
            'meta_title' => $validated['meta_title'] ?? null,
            'meta_description' => $validated['meta_description'] ?? null,
            'meta_keywords' => $validated['meta_keywords'] ?? null,
            'meta_robots' => $validated['meta_robots'] ?? null,
            'canonical_link' => $validated['canonical_link'] ?? null,
            'meta_image' => $validated['meta_image'] ?? null,
            'schema' => $validated['schema'] ?? null,
        ]);

        return back()->with('success', 'Thêm bài viết mới thành công.');
    }

    public function updateArticle(Request $request, Article $article)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'content' => 'required|string',
            'legacy_author' => 'nullable|string|max:255',
            'author_id' => 'nullable|exists:authors,id',
            'published_date' => 'required|string|max:100',
            'category' => 'required|string|max:255',
            'image_file' => 'nullable|image|max:5120',
            'image' => 'nullable|string|max:255',
            'image_alt' => 'nullable|string|max:255',
            'is_highlight' => 'nullable|integer',
            'status' => 'nullable|string|in:published,draft',
            'focus_keyword' => 'nullable|string|max:255',
            'related_urls' => 'nullable|string',
            'redirect_urls' => 'nullable|string',
            'slug' => 'nullable|string|max:255',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string|max:255',
            'meta_robots' => 'nullable|string|max:255',
            'canonical_link' => 'nullable|string|max:255',
            'meta_image' => 'nullable|string|max:255',
            'schema' => 'nullable|string',
        ]);

        $slug = $this->uniqueSlug(Article::class, $validated['slug'] ?? $validated['title'], $article->id);

        $data = [
            'title' => $validated['title'],
            'slug' => $slug,
            'description' => $validated['description'],
            'content' => $validated['content'],
            'legacy_author' => $validated['legacy_author'] ?? 'Ban Biên Tập',
            'author_id' => $validated['author_id'] ?? null,
            'published_date' => $validated['published_date'],
            'category' => $validated['category'],
            'image_alt' => $validated['image_alt'] ?? $validated['title'],
            'is_highlight' => $request->boolean('is_highlight'),
            'status' => $validated['status'] ?? ($article->status ?: 'published'),
            'focus_keyword' => $validated['focus_keyword'] ?? null,
            'related_urls' => $validated['related_urls'] ?? null,
            'redirect_urls' => $validated['redirect_urls'] ?? null,
            'meta_title' => $validated['meta_title'] ?? null,
            'meta_description' => $validated['meta_description'] ?? null,
            'meta_keywords' => $validated['meta_keywords'] ?? null,
            'meta_robots' => $validated['meta_robots'] ?? null,
            'canonical_link' => $validated['canonical_link'] ?? null,
            'meta_image' => $validated['meta_image'] ?? null,
            'schema' => $validated['schema'] ?? null,
        ];

        if ($request->hasFile('image_file')) {
            $file = $request->file('image_file');
            $ext = strtolower($file->getClientOriginalExtension());
            $filename = $slug . '-' . time() . '.' . $ext;
            $file->move(public_path('images'), $filename);
            $data['image'] = '/images/' . $filename;
        } elseif ($request->filled('image')) {
            $data['image'] = $request->input('image');
        } elseif ($request->exists('image')) {
            $data['image'] = '/images/default-blog.svg';
        }

        $article->update($data);

        return back()->with('success', 'Cập nhật bài viết thành công.');
    }

    public function destroyArticle(Article $article)
    {
        $article->delete();
        return back()->with('success', 'Xóa bài viết thành công.');
    }

    public function toggleHighlightArticle(Article $article)
    {
        $article->update([
            'is_highlight' => !$article->is_highlight
        ]);
        return back()->with('success', 'Cập nhật trạng thái nổi bật bài viết thành công.');
    }

    public function storeService(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'service_category_id' => 'nullable|exists:service_categories,id',
            'category' => 'nullable|string|max:255',
            'price' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'image_file' => 'nullable|image|max:2048',
            'image' => 'nullable|string|max:255',
            'banner_image' => 'nullable|string|max:255',
            'is_highlight' => 'nullable|boolean',
            'order' => 'nullable|integer',
            'slug' => 'nullable|string|max:255',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string|max:255',
            'meta_robots' => 'nullable|string|max:255',
            'canonical_link' => 'nullable|string|max:255',
            'meta_image' => 'nullable|string|max:255',
            'pillars' => 'nullable|array',
            'reviews' => 'nullable|array',
            'before_after' => 'nullable|array',
            'schema' => 'nullable|string',
        ]);

        $imagePath = '/images/default-service.jpg';
        if ($request->hasFile('image_file')) {
            $file = $request->file('image_file');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images'), $filename);
            $imagePath = '/images/' . $filename;
        } elseif ($request->filled('image')) {
            $imagePath = $request->input('image');
        }

        $slug = $this->uniqueSlug(Service::class, $validated['slug'] ?? $validated['name']);

        $categoryName = '';
        if (!empty($validated['service_category_id'])) {
            $cat = \App\Models\ServiceCategory::find($validated['service_category_id']);
            if ($cat) {
                $categoryName = $cat->name;
            }
        }

        Service::create([
            'name' => $validated['name'],
            'slug' => $slug,
            'service_category_id' => $validated['service_category_id'] ?? null,
            'category' => $categoryName,
            'price' => $validated['price'] ?? 'Liên hệ',
            'description' => $validated['description'],
            'image' => $imagePath,
            'banner_image' => $validated['banner_image'] ?? null,
            'is_highlight' => $request->boolean('is_highlight'),
            'order' => $validated['order'] ?? 0,
            'meta_title' => $validated['meta_title'] ?? null,
            'meta_description' => $validated['meta_description'] ?? null,
            'meta_keywords' => $validated['meta_keywords'] ?? null,
            'meta_robots' => $validated['meta_robots'] ?? null,
            'canonical_link' => $validated['canonical_link'] ?? null,
            'meta_image' => $validated['meta_image'] ?? null,
            'pillars' => $validated['pillars'] ?? null,
            'reviews' => $validated['reviews'] ?? null,
            'before_after' => $validated['before_after'] ?? null,
            'schema' => $validated['schema'] ?? null,
        ]);

        return back()->with('success', 'Thêm dịch vụ thành công.');
    }

    public function updateService(Request $request, Service $service)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'service_category_id' => 'nullable|exists:service_categories,id',
            'category' => 'nullable|string|max:255',
            'price' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'image_file' => 'nullable|image|max:2048',
            'image' => 'nullable|string|max:255',
            'banner_image' => 'nullable|string|max:255',
            'is_highlight' => 'nullable|boolean',
            'order' => 'nullable|integer',
            'slug' => 'nullable|string|max:255',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string|max:255',
            'meta_robots' => 'nullable|string|max:255',
            'canonical_link' => 'nullable|string|max:255',
            'meta_image' => 'nullable|string|max:255',
            'pillars' => 'nullable|array',
            'reviews' => 'nullable|array',
            'before_after' => 'nullable|array',
            'schema' => 'nullable|string',
        ]);

        $slug = $this->uniqueSlug(Service::class, $validated['slug'] ?? $validated['name'], $service->id);

        $categoryName = '';
        if (!empty($validated['service_category_id'])) {
            $cat = \App\Models\ServiceCategory::find($validated['service_category_id']);
            if ($cat) {
                $categoryName = $cat->name;
            }
        }

        $data = [
            'name' => $validated['name'],
            'slug' => $slug,
            'service_category_id' => $validated['service_category_id'] ?? null,
            'category' => $categoryName,
            'price' => $validated['price'] ?? 'Liên hệ',
            'description' => $validated['description'],
            'banner_image' => $validated['banner_image'] ?? null,
            'is_highlight' => $request->boolean('is_highlight'),
            'order' => $validated['order'] ?? 0,
            'meta_title' => $validated['meta_title'] ?? null,
            'meta_description' => $validated['meta_description'] ?? null,
            'meta_keywords' => $validated['meta_keywords'] ?? null,
            'meta_robots' => $validated['meta_robots'] ?? null,
            'canonical_link' => $validated['canonical_link'] ?? null,
            'meta_image' => $validated['meta_image'] ?? null,
            'pillars' => $validated['pillars'] ?? null,
            'reviews' => $validated['reviews'] ?? null,
            'before_after' => $validated['before_after'] ?? null,
            'schema' => $validated['schema'] ?? null,
        ];

        if ($request->hasFile('image_file')) {
            $file = $request->file('image_file');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images'), $filename);
            $data['image'] = '/images/' . $filename;
        } elseif ($request->filled('image')) {
            $data['image'] = $request->input('image');
        }

        $service->update($data);

        return back()->with('success', 'Cập nhật dịch vụ thành công.');
    }

    public function destroyService(Service $service)
    {
        $service->delete();
        return back()->with('success', 'Xóa dịch vụ thành công.');
    }

    public function toggleHighlightService(Service $service)
    {
        $service->update([
            'is_highlight' => !$service->is_highlight
        ]);
        return back()->with('success', 'Đã cập nhật trạng thái nổi bật.');
    }

    // Banner CRUD
    public function storeBanner(Request $request)
    {
        $validated = $request->validate([
            'eyebrow' => 'nullable|string|max:255',
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image_desktop_file' => 'required_without:image_desktop|nullable|image|max:3072',
            'image_desktop' => 'nullable|string|max:255',
            'image_mobile_file' => 'nullable|image|max:3072',
            'image_mobile' => 'nullable|string|max:255',
            'button_primary_text' => 'nullable|string|max:255',
            'button_primary_url' => 'nullable|string|max:255',
            'button_secondary_text' => 'nullable|string|max:255',
            'button_secondary_url' => 'nullable|string|max:255',
            'order' => 'required|integer',
            'is_active' => 'required|boolean',
        ]);

        $desktopPath = '';
        if ($request->hasFile('image_desktop_file')) {
            $file = $request->file('image_desktop_file');
            $filename = time() . '_desktop_' . $file->getClientOriginalName();
            $file->move(public_path('images'), $filename);
            $desktopPath = '/images/' . $filename;
        } elseif ($request->filled('image_desktop')) {
            $desktopPath = $request->input('image_desktop');
        }

        $mobilePath = null;
        if ($request->hasFile('image_mobile_file')) {
            $file = $request->file('image_mobile_file');
            $filename = time() . '_mobile_' . $file->getClientOriginalName();
            $file->move(public_path('images'), $filename);
            $mobilePath = '/images/' . $filename;
        } elseif ($request->filled('image_mobile')) {
            $mobilePath = $request->input('image_mobile');
        }

        \App\Models\Banner::create([
            'eyebrow' => $validated['eyebrow'],
            'title' => $validated['title'],
            'subtitle' => $validated['subtitle'],
            'description' => $validated['description'],
            'image_desktop' => $desktopPath,
            'image_mobile' => $mobilePath,
            'button_primary_text' => $validated['button_primary_text'] ?? 'Đặt Lịch Khám Ngay',
            'button_primary_url' => $validated['button_primary_url'] ?? '/dat-lich',
            'button_secondary_text' => $validated['button_secondary_text'] ?? 'Tìm Hiểu Dịch Vụ',
            'button_secondary_url' => $validated['button_secondary_url'] ?? '#services',
            'order' => $validated['order'],
            'is_active' => $validated['is_active'],
        ]);

        return back()->with('success', 'Thêm slide banner mới thành công.');
    }

    public function updateBanner(Request $request, \App\Models\Banner $banner)
    {
        $validated = $request->validate([
            'eyebrow' => 'nullable|string|max:255',
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image_desktop_file' => 'nullable|image|max:3072',
            'image_desktop' => 'nullable|string|max:255',
            'image_mobile_file' => 'nullable|image|max:3072',
            'image_mobile' => 'nullable|string|max:255',
            'button_primary_text' => 'nullable|string|max:255',
            'button_primary_url' => 'nullable|string|max:255',
            'button_secondary_text' => 'nullable|string|max:255',
            'button_secondary_url' => 'nullable|string|max:255',
            'order' => 'required|integer',
            'is_active' => 'required|boolean',
        ]);

        $data = [
            'eyebrow' => $validated['eyebrow'],
            'title' => $validated['title'],
            'subtitle' => $validated['subtitle'],
            'description' => $validated['description'],
            'button_primary_text' => $validated['button_primary_text'] ?? 'Đặt Lịch Khám Ngay',
            'button_primary_url' => $validated['button_primary_url'] ?? '/dat-lich',
            'button_secondary_text' => $validated['button_secondary_text'] ?? 'Tìm Hiểu Dịch Vụ',
            'button_secondary_url' => $validated['button_secondary_url'] ?? '#services',
            'order' => $validated['order'],
            'is_active' => $validated['is_active'],
        ];

        if ($request->hasFile('image_desktop_file')) {
            $file = $request->file('image_desktop_file');
            $filename = time() . '_desktop_' . $file->getClientOriginalName();
            $file->move(public_path('images'), $filename);
            $data['image_desktop'] = '/images/' . $filename;
        } elseif ($request->filled('image_desktop')) {
            $data['image_desktop'] = $request->input('image_desktop');
        }

        if ($request->hasFile('image_mobile_file')) {
            $file = $request->file('image_mobile_file');
            $filename = time() . '_mobile_' . $file->getClientOriginalName();
            $file->move(public_path('images'), $filename);
            $data['image_mobile'] = '/images/' . $filename;
        } elseif ($request->filled('image_mobile')) {
            $data['image_mobile'] = $request->input('image_mobile');
        }

        $banner->update($data);

        return back()->with('success', 'Cập nhật slide banner thành công.');
    }

    public function destroyBanner(\App\Models\Banner $banner)
    {
        $banner->delete();
        return back()->with('success', 'Xóa slide banner thành công.');
    }

    // Settings Update
    public function updateSettings(Request $request)
    {
        $validated = $request->validate([
            'settings' => 'required|array',
        ]);

        foreach ($validated['settings'] as $key => $value) {
            \App\Models\Setting::updateOrCreate(
                ['key' => $key],
                [
                    'value' => $value,
                    'label' => \App\Models\Setting::where('key', $key)->value('label') ?? ucwords(str_replace('_', ' ', $key))
                ]
            );
        }

        return back()->with('success', 'Cập nhật cấu hình hệ thống thành công.');
    }

    // Doctor CRUD
    public function storeDoctor(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'bio' => 'nullable|string',
            'full_bio' => 'nullable|string',
            'email' => 'nullable|string|max:255',
            'image_file' => 'nullable|image|max:3072',
            'image' => 'nullable|string|max:255',
            'order' => 'required|integer',
            'is_active' => 'nullable|boolean',
        ]);

        $imagePath = '/images/default-doctor.jpg';
        if ($request->hasFile('image_file')) {
            $file = $request->file('image_file');
            $filename = time() . '_doctor_' . $file->getClientOriginalName();
            $file->move(public_path('images'), $filename);
            $imagePath = '/images/' . $filename;
        } elseif ($request->filled('image')) {
            $imagePath = $request->input('image');
        }

        \App\Models\Doctor::create([
            'name' => $validated['name'],
            'role' => $validated['role'],
            'bio' => $validated['bio'] ?? '',
            'full_bio' => $validated['full_bio'] ?? null,
            'email' => $validated['email'] ?? null,
            'image' => $imagePath,
            'order' => $validated['order'],
            'is_active' => $request->boolean('is_active', true),
        ]);

        return back()->with('success', 'Thêm bác sĩ thành công.');
    }

    public function updateDoctor(Request $request, \App\Models\Doctor $doctor)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'bio' => 'nullable|string',
            'full_bio' => 'nullable|string',
            'email' => 'nullable|string|max:255',
            'image_file' => 'nullable|image|max:3072',
            'image' => 'nullable|string|max:255',
            'order' => 'required|integer',
            'is_active' => 'nullable|boolean',
        ]);

        $data = [
            'name' => $validated['name'],
            'role' => $validated['role'],
            'bio' => $validated['bio'] ?? '',
            'full_bio' => $validated['full_bio'] ?? null,
            'email' => $validated['email'] ?? null,
            'order' => $validated['order'],
            'is_active' => $request->boolean('is_active', true),
        ];

        if ($request->hasFile('image_file')) {
            $file = $request->file('image_file');
            $filename = time() . '_doctor_' . $file->getClientOriginalName();
            $file->move(public_path('images'), $filename);
            $data['image'] = '/images/' . $filename;
        } elseif ($request->filled('image')) {
            $data['image'] = $request->input('image');
        }

        $doctor->update($data);

        return back()->with('success', 'Cập nhật bác sĩ thành công.');
    }

    public function destroyDoctor(\App\Models\Doctor $doctor)
    {
        $doctor->delete();
        return back()->with('success', 'Xóa bác sĩ thành công.');
    }

    // FAQ CRUD
    public function storeFaq(Request $request)
    {
        $validated = $request->validate([
            'question' => 'required|string',
            'answer' => 'required|string',
            'order' => 'required|integer',
        ]);

        \App\Models\Faq::create($validated);

        return back()->with('success', 'Thêm FAQ thành công.');
    }

    public function updateFaq(Request $request, \App\Models\Faq $faq)
    {
        $validated = $request->validate([
            'question' => 'required|string',
            'answer' => 'required|string',
            'order' => 'required|integer',
        ]);

        $faq->update($validated);

        return back()->with('success', 'Cập nhật FAQ thành công.');
    }

    public function destroyFaq(\App\Models\Faq $faq)
    {
        $faq->delete();
        return back()->with('success', 'Xóa FAQ thành công.');
    }

    // Export Submissions to CSV
    public function exportSubmissionsCsv(Request $request)
    {
        $headers = [
            'Content-type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => 'attachment; filename=submissions_' . date('Ymd_His') . '.csv',
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0'
        ];

        $submissions = \App\Models\Submission::latest()->get();

        $callback = function() use($submissions) {
            $file = fopen('php://output', 'w');
            
            // Add UTF-8 BOM for correct Excel encoding of Vietnamese text
            fputs($file, chr(0xEF) . chr(0xBB) . chr(0xBF));
            
            // Headers
            fputcsv($file, ['ID', 'Họ Tên', 'Số Điện Thoại', 'Email', 'Dịch Vụ', 'Trạng Thái', 'Ngày Gửi']);

            foreach ($submissions as $sub) {
                fputcsv($file, [
                    $sub->id,
                    $sub->name,
                    $sub->phone,
                    $sub->email ?: 'N/A',
                    $sub->service ?: 'Chưa chọn',
                    $sub->status,
                    $sub->created_at->format('d/m/Y H:i:s')
                ]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    // Real Result CRUD
    public function storeRealResult(Request $request)
    {
        $validated = $request->validate([
            'category' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'detail' => 'required|string',
            'image_file' => 'nullable|image|max:3072',
            'image' => 'nullable|string|max:255',
            'video_file' => 'nullable|file|mimes:mp4,mov,avi,webm,ogg|max:51200',
            'is_video' => 'required|integer',
            'order' => 'required|integer',
            'slug' => 'nullable|string|max:255',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string|max:255',
            'meta_robots' => 'nullable|string|max:255',
            'canonical_link' => 'nullable|string|max:255',
            'meta_image' => 'nullable|string|max:255',
        ]);

        $imagePath = '/images/default-result.jpg';
        if ($request->hasFile('image_file')) {
            $file = $request->file('image_file');
            $filename = time() . '_result_' . $file->getClientOriginalName();
            $file->move(public_path('images'), $filename);
            $imagePath = '/images/' . $filename;
        } elseif ($request->filled('image')) {
            $imagePath = $request->input('image');
        }

        $videoPath = null;
        if ($request->hasFile('video_file')) {
            $file = $request->file('video_file');
            $filename = time() . '_result_' . $file->getClientOriginalName();
            $file->move(public_path('videos'), $filename);
            $videoPath = '/videos/' . $filename;
        }

        $slug = $this->uniqueSlug(\App\Models\RealResult::class, $validated['slug'] ?? $validated['title']);

        \App\Models\RealResult::create([
            'category' => $validated['category'],
            'title' => $validated['title'],
            'detail' => $validated['detail'],
            'image' => $imagePath,
            'video' => $videoPath,
            'is_video' => $validated['is_video'] === 1,
            'order' => $validated['order'],
            'slug' => $slug,
            'meta_title' => $validated['meta_title'] ?? null,
            'meta_description' => $validated['meta_description'] ?? null,
            'meta_keywords' => $validated['meta_keywords'] ?? null,
            'meta_robots' => $validated['meta_robots'] ?? null,
            'canonical_link' => $validated['canonical_link'] ?? null,
            'meta_image' => $validated['meta_image'] ?? null,
        ]);

        return back()->with('success', 'Thêm kết quả thành công.');
    }

    public function updateRealResult(Request $request, \App\Models\RealResult $realResult)
    {
        $validated = $request->validate([
            'category' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'detail' => 'required|string',
            'image_file' => 'nullable|image|max:3072',
            'image' => 'nullable|string|max:255',
            'video_file' => 'nullable|file|mimes:mp4,mov,avi,webm,ogg|max:51200',
            'is_video' => 'required|integer',
            'order' => 'required|integer',
            'slug' => 'nullable|string|max:255',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string|max:255',
            'meta_robots' => 'nullable|string|max:255',
            'canonical_link' => 'nullable|string|max:255',
            'meta_image' => 'nullable|string|max:255',
        ]);

        $slug = $this->uniqueSlug(\App\Models\RealResult::class, $validated['slug'] ?? $validated['title'], $realResult->id);

        $data = [
            'category' => $validated['category'],
            'title' => $validated['title'],
            'detail' => $validated['detail'],
            'is_video' => $validated['is_video'] === 1,
            'order' => $validated['order'],
            'slug' => $slug,
            'meta_title' => $validated['meta_title'] ?? null,
            'meta_description' => $validated['meta_description'] ?? null,
            'meta_keywords' => $validated['meta_keywords'] ?? null,
            'meta_robots' => $validated['meta_robots'] ?? null,
            'canonical_link' => $validated['canonical_link'] ?? null,
            'meta_image' => $validated['meta_image'] ?? null,
        ];

        if ($request->hasFile('image_file')) {
            $file = $request->file('image_file');
            $filename = time() . '_result_' . $file->getClientOriginalName();
            $file->move(public_path('images'), $filename);
            $data['image'] = '/images/' . $filename;
        } elseif ($request->filled('image')) {
            $data['image'] = $request->input('image');
        }

        if ($request->hasFile('video_file')) {
            $file = $request->file('video_file');
            $filename = time() . '_result_' . $file->getClientOriginalName();
            $file->move(public_path('videos'), $filename);
            $data['video'] = '/videos/' . $filename;
        }

        $realResult->update($data);

        return back()->with('success', 'Cập nhật kết quả thành công.');
    }

    public function destroyRealResult(\App\Models\RealResult $realResult)
    {
        $realResult->delete();
        return back()->with('success', 'Xóa kết quả thành công.');
    }

    // Author CRUD
    public function storeAuthor(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255',
            'avatar_file' => 'nullable|image|max:2048',
            'avatar' => 'nullable|string|max:255',
            'role' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'description' => 'nullable|string',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string|max:255',
            'meta_robots' => 'nullable|string|max:255',
            'canonical_link' => 'nullable|string|max:255',
            'meta_image' => 'nullable|string|max:255',
        ]);

        $avatarPath = '/images/default-blog.svg';
        if ($request->hasFile('avatar_file')) {
            $file = $request->file('avatar_file');
            $filename = time() . '_author_' . $file->getClientOriginalName();
            $file->move(public_path('images'), $filename);
            $avatarPath = '/images/' . $filename;
        } elseif ($request->filled('avatar')) {
            $avatarPath = $request->input('avatar');
        }

        $slug = $this->uniqueSlug(\App\Models\Author::class, $validated['slug'] ?? $validated['name']);

        \App\Models\Author::create([
            'name' => $validated['name'],
            'slug' => $slug,
            'avatar' => $avatarPath,
            'role' => $validated['role'] ?? null,
            'bio' => $validated['bio'] ?? null,
            'description' => $validated['description'] ?? null,
            'meta_title' => $validated['meta_title'] ?? null,
            'meta_description' => $validated['meta_description'] ?? null,
            'meta_keywords' => $validated['meta_keywords'] ?? null,
            'meta_robots' => $validated['meta_robots'] ?? null,
            'canonical_link' => $validated['canonical_link'] ?? null,
            'meta_image' => $validated['meta_image'] ?? null,
        ]);

        return back()->with('success', 'Thêm tác giả thành công.');
    }

    public function updateAuthor(Request $request, \App\Models\Author $author)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255',
            'avatar_file' => 'nullable|image|max:2048',
            'avatar' => 'nullable|string|max:255',
            'role' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'description' => 'nullable|string',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string|max:255',
            'meta_robots' => 'nullable|string|max:255',
            'canonical_link' => 'nullable|string|max:255',
            'meta_image' => 'nullable|string|max:255',
        ]);

        $slug = $this->uniqueSlug(\App\Models\Author::class, $validated['slug'] ?? $validated['name'], $author->id);

        $data = [
            'name' => $validated['name'],
            'slug' => $slug,
            'role' => $validated['role'] ?? null,
            'bio' => $validated['bio'] ?? null,
            'description' => $validated['description'] ?? null,
            'meta_title' => $validated['meta_title'] ?? null,
            'meta_description' => $validated['meta_description'] ?? null,
            'meta_keywords' => $validated['meta_keywords'] ?? null,
            'meta_robots' => $validated['meta_robots'] ?? null,
            'canonical_link' => $validated['canonical_link'] ?? null,
            'meta_image' => $validated['meta_image'] ?? null,
        ];

        if ($request->hasFile('avatar_file')) {
            $file = $request->file('avatar_file');
            $filename = time() . '_author_' . $file->getClientOriginalName();
            $file->move(public_path('images'), $filename);
            $data['avatar'] = '/images/' . $filename;
        } elseif ($request->filled('avatar')) {
            $data['avatar'] = $request->input('avatar');
        } elseif ($request->exists('avatar')) {
            $data['avatar'] = '/images/default-blog.svg';
        }

        $author->update($data);

        return back()->with('success', 'Cập nhật tác giả thành công.');
    }

    public function destroyAuthor(\App\Models\Author $author)
    {
        $author->delete();
        return back()->with('success', 'Xóa tác giả thành công.');
    }

    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:5120', // Up to 5MB
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $originalName = $file->getClientOriginalName();
            $safeBase = Str::slug(pathinfo($originalName, PATHINFO_FILENAME)) ?: 'blog-image';
            $ext = strtolower($file->getClientOriginalExtension());
            $filename = $safeBase . '-' . time() . '.' . $ext;
            $file->move(public_path('images'), $filename);
            $url = '/images/' . $filename;
            return response()->json(['url' => $url]);
        }

        return response()->json(['error' => 'File not found'], 400);
    }

    /**
     * Store a new doctor shift.
     */
    public function storeDoctorShift(Request $request)
    {
        $validated = $request->validate([
            'doctor_id' => 'required|exists:doctors,id',
            'day_of_week' => 'required|integer|min:1|max:7',
            'start_time' => 'required|string|max:50',
            'end_time' => 'required|string|max:50',
            'branch' => 'nullable|string|max:255',
        ]);

        \App\Models\DoctorShift::create($validated);

        return back()->with('success', 'Thêm lịch trực bác sĩ thành công.');
    }

    /**
     * Delete a doctor shift.
     */
    public function destroyDoctorShift(\App\Models\DoctorShift $shift)
    {
        $shift->delete();
        return back()->with('success', 'Xóa lịch trực bác sĩ thành công.');
    }

    /**
     * Toggle the approval status of a service review.
     */
    public function toggleReviewApproval(Request $request, \App\Models\ServiceReview $review)
    {
        $review->update([
            'is_approved' => !$review->is_approved
        ]);

        return back()->with('success', 'Cập nhật trạng thái duyệt đánh giá thành công.');
    }

    /**
     * Delete a review.
     */
    public function destroyReview(\App\Models\ServiceReview $review)
    {
        $review->delete();
        return back()->with('success', 'Xóa đánh giá thành công.');
    }

    /**
     * Store a new service category.
     */
    public function storeServiceCategory(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255',
            'order' => 'nullable|integer',
        ]);

        $slug = $this->uniqueSlug(\App\Models\ServiceCategory::class, $validated['slug'] ?? $validated['name']);

        \App\Models\ServiceCategory::create([
            'name' => $validated['name'],
            'slug' => $slug,
            'order' => $validated['order'] ?? 0,
        ]);

        return back()->with('success', 'Thêm danh mục dịch vụ thành công.');
    }

    /**
     * Update an existing service category.
     */
    public function updateServiceCategory(Request $request, \App\Models\ServiceCategory $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255',
            'order' => 'nullable|integer',
        ]);

        $slug = $this->uniqueSlug(\App\Models\ServiceCategory::class, $validated['slug'] ?? $validated['name'], $category->id);

        $category->update([
            'name' => $validated['name'],
            'slug' => $slug,
            'order' => $validated['order'] ?? 0,
        ]);

        // Automatically sync existing services category string name as well
        \App\Models\Service::where('service_category_id', $category->id)
            ->update(['category' => $validated['name']]);

        return back()->with('success', 'Cập nhật danh mục dịch vụ thành công.');
    }

    /**
     * Delete a service category.
     */
    public function destroyServiceCategory(\App\Models\ServiceCategory $category)
    {
        // Nullify relation and empty legacy string category
        \App\Models\Service::where('service_category_id', $category->id)
            ->update([
                'service_category_id' => null,
                'category' => ''
            ]);

        $category->delete();
        return back()->with('success', 'Xóa danh mục dịch vụ thành công.');
    }

    /**
     * Generate SEO article content via Gemini AI (with built-in structured SEO fallback).
     */
    public function generateArticleByAi(Request $request)
    {
        $validated = $request->validate([
            'topic' => 'required|string|max:1000',
            'tone' => 'nullable|string|max:100',
            'language' => 'nullable|string|max:10',
            'keywords' => 'nullable|string|max:500',
            'outline' => 'nullable|string|max:2000',
        ]);

        $topic = trim($validated['topic']);
        $tone = $validated['tone'] ?? 'chuyên nghiệp';
        $language = $validated['language'] ?? 'vi';
        $keywords = trim($validated['keywords'] ?? '');
        $outline = trim($validated['outline'] ?? '');
        $apiKey = env('GEMINI_API_KEY') ?: (\App\Models\Setting::where('key', 'gemini_api_key')->value('value') ?? '');

        if (!empty($apiKey)) {
            $prompt = "Bạn là chuyên gia nội dung SEO. Hãy viết bài blog chuẩn SEO bằng tiếng " . ($language === 'vi' ? 'Việt' : 'Anh') . " về chủ đề: \"{$topic}\". Giọng điệu: {$tone}.";
            if ($keywords !== '') $prompt .= " Từ khóa SEO cần lồng ghép tự nhiên: {$keywords}.";
            if ($outline !== '') $prompt .= " Bám sát dàn ý:\n{$outline}\n";
            $prompt .= "\nTrả về JSON thuần túy gồm: {\"title\":\"...\",\"description\":\"...(140-160 ký tự)\",\"content\":\"...(HTML dùng h2, h3, p, strong, ul, li, blockquote)\"}";

            try {
                $res = \Illuminate\Support\Facades\Http::timeout(45)->post(
                    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={$apiKey}",
                    [
                        'contents' => [['role' => 'user', 'parts' => [['text' => $prompt]]]],
                        'generationConfig' => ['temperature' => 0.7, 'maxOutputTokens' => 2048, 'responseMimeType' => 'application/json'],
                    ]
                );
                if ($res->successful()) {
                    $json = json_decode(trim($res->json('candidates.0.content.parts.0.text', '')), true);
                    if ($json && isset($json['content'])) {
                        return response()->json(['success' => true, 'data' => $json]);
                    }
                }
            } catch (\Throwable $e) {
                // Fall through to structured local SEO generator
            }
        }
        return $this->buildFallbackAiArticle($topic, $tone, $language, $keywords, $outline);
    }

    private function buildFallbackAiArticle(string $topic, string $tone, string $language, string $keywords, string $outline)
    {
        $kwList = array_values(array_filter(array_map('trim', explode(',', $keywords))));
        $primaryKw = $kwList[0] ?? $topic;
        $outlineLines = array_values(array_filter(array_map('trim', preg_split('/\r\n|\r|\n/', $outline))));

        if ($language === 'en') {
            $title = ucfirst($topic) . ' – Comprehensive Guide & Expert Insights';
            $desc = "Explore an in-depth analysis on {$primaryKw}. Discover key strategies, practical applications, and expert recommendations in this complete guide.";
            $html = "<p>In today's fast-evolving landscape, understanding <strong>{$primaryKw}</strong> is essential for achieving sustainable results. This article provides a {$tone} breakdown of <strong>{$topic}</strong>.</p>";
            $sections = !empty($outlineLines) ? $outlineLines : ["Core Fundamentals of {$primaryKw}", "Key Benefits & Practical Applications", "Best Practices & Expert Recommendations"];
            foreach ($sections as $idx => $sec) {
                $html .= "<h2>" . ($idx + 1) . ". " . e($sec) . "</h2><p>When evaluating <strong>{$primaryKw}</strong>, focusing on " . e($sec) . " ensures clarity, high efficiency, and measurable impact.</p><ul><li>Structured methodology tailored to real-world needs.</li><li>Optimization based on verified data and industry standards.</li></ul>";
            }
            $html .= "<blockquote>Key Takeaway: Mastering {$primaryKw} requires consistent execution and evidence-based decision-making.</blockquote>";
        } else {
            $title = ucfirst($topic) . ': Phân Tích Chuyên Sâu & Hướng Dẫn Toàn Diện';
            $desc = "Tìm hiểu chi tiết về {$primaryKw} với góc nhìn {$tone}. Tổng hợp kiến thức trọng tâm, quy trình thực hiện và kinh nghiệm thực tế chuẩn SEO.";
            $html = "<p>Trong bối cảnh thông tin ngày càng đa dạng, việc nắm vững kiến thức về <strong>{$primaryKw}</strong> đóng vai trò quan trọng giúp người đọc đưa ra quyết định chính xác. Bài viết dưới đây sẽ phân tích toàn diện chủ đề <strong>{$topic}</strong> theo phong cách {$tone}.</p>";
            $sections = !empty($outlineLines) ? $outlineLines : ["Tổng quan và tầm quan trọng của {$primaryKw}", "Các yếu tố cốt lõi cần lưu ý khi triển khai", "Kinh nghiệm tối ưu hiệu quả và lưu ý thực tế"];
            foreach ($sections as $idx => $sec) {
                $html .= "<h2>" . ($idx + 1) . ". " . e($sec) . "</h2><p>Khi tìm hiểu sâu về <strong>{$primaryKw}</strong>, khía cạnh <em>" . e($sec) . "</em> luôn được các chuyên gia đánh giá cao nhờ tính ứng dụng thực tiễn.</p><h3>Điểm nhấn quan trọng</h3><ul><li>Đảm bảo tính chính xác, minh bạch và bám sát nhu cầu thực tế về <strong>{$primaryKw}</strong>.</li><li>Tối ưu hóa quy trình giúp tiết kiệm thời gian và nâng cao chất lượng đầu ra.</li></ul>";
            }
            if (count($kwList) > 1) {
                $html .= "<p>Bên cạnh <strong>{$primaryKw}</strong>, bạn cũng nên kết hợp đồng bộ với các yếu tố như <strong>" . e(implode(', ', array_slice($kwList, 1))) . "</strong> để đạt hiệu quả tối đa.</p>";
            }
            $html .= "<blockquote>Tóm lại: Việc áp dụng đúng phương pháp đối với {$primaryKw} sẽ mang lại giá trị bền vững và lâu dài cho người thực hiện.</blockquote>";
        }

        return response()->json([
            'success' => true,
            'data' => ['title' => $title, 'description' => $desc, 'content' => $html],
        ]);
    }
}
