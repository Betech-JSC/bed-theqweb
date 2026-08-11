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
                'key' => 'intro_image',
                'value' => '/images/574583363_122251875866080096_1777622189448333941_n-1.jpg',
                'label' => 'Ảnh đại diện khối giới thiệu',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'intro_story_title',
                'value' => 'Triết Lý Làm Đẹp Chuẩn Y Khoa & Vẻ Đẹp Độc Bản',
                'label' => 'Tiêu đề câu chuyện nhà sáng lập',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'intro_story_desc_1',
                'value' => 'Tại Theq Medical Centre, chúng tôi tin rằng mỗi người đều sở hữu một vẻ đẹp độc bản riêng biệt. Sự tự tin của bạn là món quà quý giá nhất, và sứ mệnh của chúng tôi là giúp bạn khám phá và gìn giữ nét riêng đó thông qua các giải pháp y khoa thẩm mỹ tiên tiến, an toàn.',
                'label' => 'Mô tả câu chuyện - Đoạn 1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'intro_story_desc_2',
                'value' => 'Được thành lập bởi đội ngũ bác sĩ chuyên khoa I, Theq đã không ngừng nâng cấp hệ thống phòng khám, chuyển giao độc quyền các công nghệ từ Hàn Quốc, Mỹ và châu Âu. Chúng tôi coi sự an toàn và hiệu quả thực tế của khách hàng là kim chỉ nam tối thượng.',
                'label' => 'Mô tả câu chuyện - Đoạn 2',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'intro_story_quote',
                'value' => 'Chúng tôi không thay đổi diện mạo của bạn, chúng tôi tôn vinh và khôi phục những nét đẹp độc bản tự nhiên nhất.',
                'label' => 'Trích dẫn câu chuyện',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'intro_story_quote_author',
                'value' => 'CEO Khánh Tôn',
                'label' => 'Tác giả trích dẫn',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'intro_story_image_1',
                'value' => '/images/Workshop-1.png',
                'label' => 'Ảnh câu chuyện 1 (Hội thảo)',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'intro_story_image_2',
                'value' => '/images/ultherapy-APAC.jpg',
                'label' => 'Ảnh câu chuyện 2 (Nhỏ)',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'intro_story_image_3',
                'value' => '/images/1-size-web.png',
                'label' => 'Ảnh câu chuyện 3 (Toàn cảnh)',
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
            'intro_image',
            'intro_story_title',
            'intro_story_desc_1',
            'intro_story_desc_2',
            'intro_story_quote',
            'intro_story_quote_author',
            'intro_story_image_1',
            'intro_story_image_2',
            'intro_story_image_3',
        ];

        DB::table('settings')->whereIn('key', $keys)->delete();
    }
};
