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
                'key' => 'doctors_intro_eyebrow',
                'value' => 'ĐỘI NGŨ CHUYÊN GIA',
                'label' => 'Nhãn phụ phần bác sĩ (Trang Giới thiệu)',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'doctors_intro_title',
                'value' => 'Hội Đồng Bác Sĩ Đầu Ngành',
                'label' => 'Tiêu đề phần bác sĩ (Trang Giới thiệu)',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'doctors_carousel_eyebrow',
                'value' => 'ĐỘI NGŨ BÁC SĨ',
                'label' => 'Nhãn phụ phần bác sĩ (Carousel dùng chung)',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'doctors_carousel_title',
                'value' => 'Đội Ngũ Chuyên Gia Làm Đẹp',
                'label' => 'Tiêu đề phần bác sĩ (Carousel dùng chung)',
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
            'doctors_intro_eyebrow',
            'doctors_intro_title',
            'doctors_carousel_eyebrow',
            'doctors_carousel_title',
        ];

        DB::table('settings')->whereIn('key', $keys)->delete();
    }
};
