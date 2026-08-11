<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $settings = [
            [
                'key' => 'about_carousel_eyebrow',
                'value' => 'THEQ MEDICAL CENTRE',
                'label' => 'Nhãn phụ phần Model Carousel (Trang Giới thiệu)',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'about_carousel_title',
                'value' => 'Kiến tạo - Vẻ đẹp độc bản',
                'label' => 'Tiêu đề phần Model Carousel (Trang Giới thiệu)',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($settings as $setting) {
            DB::table('settings')->updateOrInsert(
                ['key' => $setting['key']],
                [
                    'value' => $setting['value'],
                    'label' => $setting['label'],
                    'created_at' => $setting['created_at'],
                    'updated_at' => $setting['updated_at'],
                ]
            );
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $keys = [
            'about_carousel_eyebrow',
            'about_carousel_title',
        ];

        DB::table('settings')->whereIn('key', $keys)->delete();
    }
};
