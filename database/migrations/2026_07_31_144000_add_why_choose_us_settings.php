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
                'key' => 'why_choose_us_1_title',
                'value' => 'Tiêu chuẩn Úc Châu',
                'label' => 'Thẻ 1 - Tiêu đề',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'why_choose_us_1_desc',
                'value' => 'Các quy trình chăm sóc sắc đẹp tại KT Beauty Medical Centre tuân thủ theo tiêu chuẩn thẩm mỹ nghiêm ngặt của Úc Châu, đảm bảo an toàn và hiệu quả cho khách hàng',
                'label' => 'Thẻ 1 - Mô tả',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'why_choose_us_1_image',
                'value' => '/images/why-choose-us/banner-web-5-1.png',
                'label' => 'Thẻ 1 - Hình ảnh',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'why_choose_us_2_title',
                'value' => 'Tư vấn cá nhân hóa',
                'label' => 'Thẻ 2 - Tiêu đề',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'why_choose_us_2_desc',
                'value' => 'Mỗi khách hàng đều có nét đẹp riêng biệt. KT Beauty Medical Centre luôn lắng nghe và đưa ra những lời khuyên tốt nhất để tôn lên vẻ đẹp tự nhiên của từng người, đảm bảo mỗi kết quả đều được cá nhân hóa hoàn toàn',
                'label' => 'Thẻ 2 - Mô tả',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'why_choose_us_2_image',
                'value' => '/images/why-choose-us/banner-web-2-1.png',
                'label' => 'Thẻ 2 - Hình ảnh',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'why_choose_us_3_title',
                'value' => 'Chuyên môn cao',
                'label' => 'Thẻ 3 - Tiêu đề',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'why_choose_us_3_desc',
                'value' => 'Quy tụ đội ngũ bác sĩ có chuyên môn cao, được đào tạo bài bản và chuyên sâu trong lĩnh vực thẩm mỹ, am hiểu sâu rộng, kinh nghiệm dày dặn và không ngừng cập nhật những phương pháp tiên tiến nhất',
                'label' => 'Thẻ 3 - Mô tả',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'why_choose_us_3_image',
                'value' => '/images/why-choose-us/banner-web-4-1.png',
                'label' => 'Thẻ 3 - Hình ảnh',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'why_choose_us_4_title',
                'value' => 'Công nghệ tiên tiến',
                'label' => 'Thẻ 4 - Tiêu đề',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'why_choose_us_4_desc',
                'value' => 'Ứng dụng công nghệ và kỹ thuật hiện đại, KT Beauty Medical Centre cung cấp nhiều phương án thẩm mỹ từ phẫu thuật đến không phẫu thuật với kết quả tự nhiên, giảm tối đa biến chứng, phù hợp nhu cầu và tình trạng cá nhân',
                'label' => 'Thẻ 4 - Mô tả',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'why_choose_us_4_image',
                'value' => '/images/why-choose-us/banner-web-3-1.png',
                'label' => 'Thẻ 4 - Hình ảnh',
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
            'why_choose_us_1_title',
            'why_choose_us_1_desc',
            'why_choose_us_1_image',
            'why_choose_us_2_title',
            'why_choose_us_2_desc',
            'why_choose_us_2_image',
            'why_choose_us_3_title',
            'why_choose_us_3_desc',
            'why_choose_us_3_image',
            'why_choose_us_4_title',
            'why_choose_us_4_desc',
            'why_choose_us_4_image',
        ];

        DB::table('settings')->whereIn('key', $keys)->delete();
    }
};
