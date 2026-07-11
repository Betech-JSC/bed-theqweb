<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\RealResult;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('real_results', function (Blueprint $table) {
            $table->id();
            $table->string('category');
            $table->string('title');
            $table->text('detail');
            $table->string('image');
            $table->boolean('is_video')->default(false);
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        // Seed initial static before/after items
        $initialResults = [
            [
                'category' => 'eyeluxe',
                'title' => 'KT Eyeluxe - Cắt mí Double Eyeluxe',
                'detail' => 'Khắc phục tình trạng sụp mí, mỡ thừa mắt cho đôi mắt hai mí tự nhiên rạng ngời.',
                'image' => '/images/EyeLuxe.jpg',
                'is_video' => false,
                'order' => 1
            ],
            [
                'category' => 'eyeluxe',
                'title' => 'KT Eyeluxe - Xóa thâm quầng bọng mắt',
                'detail' => 'Tạo hình nếp mí đều đẹp, loại bỏ hoàn toàn bọng mắt thâm quầng mệt mỏi.',
                'image' => '/images/EyeLuxe-3.png',
                'is_video' => true,
                'order' => 2
            ],
            [
                'category' => 'eyeluxe',
                'title' => 'KT Eyeluxe - Kiến tạo mí mắt sắc nét',
                'detail' => 'Kết quả sau 30 phút thực hiện cắt mí kết hợp lấy mỡ mí mắt trên.',
                'image' => '/images/Eyeluxe-_7.png',
                'is_video' => false,
                'order' => 3
            ],
            [
                'category' => 'sylfirm',
                'title' => 'Sylfirm X - Điều trị sẹo rỗ chuyên sâu',
                'detail' => 'Công nghệ kim vi sóng giúp lấp đầy sẹo rỗ, tái cấu trúc biểu bì da căng bóng mịn màng.',
                'image' => '/images/Celeb_Sylfirm.png',
                'is_video' => false,
                'order' => 1
            ],
            [
                'category' => 'meso',
                'title' => 'Cocktail Infusion - Cấy Meso căng bóng',
                'detail' => 'Khắc phục làn da xỉn màu, cấp ẩm sâu tức thì giúp làn da mướt mịn như sương.',
                'image' => '/images/Celeb_Meso.png',
                'is_video' => false,
                'order' => 1
            ],
            [
                'category' => 'pro-lift',
                'title' => 'KT Pro-Lift - Nâng cơ trẻ hóa Profhilo',
                'detail' => 'Nâng cơ xóa nhăn, phục hồi độ đàn hồi săn chắc và thon gọn đường viền hàm.',
                'image' => '/images/Celeb_Pro-Lift.png',
                'is_video' => false,
                'order' => 1
            ],
            [
                'category' => 'pro-lift',
                'title' => 'KT Pro-Lift - Trẻ hóa vùng má & rãnh cười',
                'detail' => 'Làm đầy rãnh cười sâu và nâng đỡ các vùng cơ chảy xệ hiệu quả.',
                'image' => '/images/Pro-Lift.png',
                'is_video' => true,
                'order' => 2
            ],
            [
                'category' => 'hya',
                'title' => 'Hya Reshape - Tiêm filler tạo hình',
                'detail' => 'Tạo hình cằm V-line, nâng cao sống mũi tự nhiên không phẫu thuật.',
                'image' => '/images/Hya-4.png',
                'is_video' => false,
                'order' => 1
            ]
        ];

        foreach ($initialResults as $res) {
            RealResult::create($res);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('real_results');
    }
};
