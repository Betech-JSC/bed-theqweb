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
                'key' => 'intro_title',
                'value' => 'THEQ MEDICAL CENTRE',
                'label' => 'Tiêu đề khối giới thiệu',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'intro_subtitle',
                'value' => 'Về Chúng Tôi',
                'label' => 'Nhãn phụ khối giới thiệu',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'intro_desc_1',
                'value' => 'Tọa lạc tại vị trí đắc địa ở Thành phố Hồ Chí Minh, Theq Medical Centre tự hào là một trong những trung tâm thẩm mỹ hàng đầu cung cấp trọn gói các dịch vụ chăm sóc sắc đẹp từ Da liễu thẩm mỹ, Thẩm mỹ nội khoa, Phẫu thuật tạo hình thẩm mỹ cho đến Phun xăm nghệ thuật.',
                'label' => 'Mô tả giới thiệu - Đoạn 1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'intro_desc_2',
                'value' => 'Với triết lý làm đẹp chuẩn tự nhiên, tôn vinh nét riêng của từng cá nhân, đội ngũ Bác sĩ, chuyên gia đầu ngành tại Theq cam kết đồng hành cùng quý khách hàng trên hành trình khám phá và hoàn thiện phiên bản sắc đẹp hoàn hảo nhất của chính mình.',
                'label' => 'Mô tả giới thiệu - Đoạn 2',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'intro_stats_doctors_mode',
                'value' => 'auto',
                'label' => 'Chế độ đếm số lượng Bác sĩ (auto / manual)',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'intro_stats_doctors_manual',
                'value' => '5',
                'label' => 'Số lượng Bác sĩ hiển thị (khi chọn manual)',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'intro_stats_customers_mode',
                'value' => 'crm_auto',
                'label' => 'Chế độ đếm số lượng Khách hàng (crm_auto / manual)',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'intro_stats_customers_base',
                'value' => '10000',
                'label' => 'Số lượng Khách hàng cơ sở (Cộng dồn CRM)',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'intro_stats_customers_manual',
                'value' => '10k+',
                'label' => 'Số lượng Khách hàng hiển thị (khi chọn manual)',
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
            'intro_title',
            'intro_subtitle',
            'intro_desc_1',
            'intro_desc_2',
            'intro_stats_doctors_mode',
            'intro_stats_doctors_manual',
            'intro_stats_customers_mode',
            'intro_stats_customers_base',
            'intro_stats_customers_manual',
        ];

        DB::table('settings')->whereIn('key', $keys)->delete();
    }
};
