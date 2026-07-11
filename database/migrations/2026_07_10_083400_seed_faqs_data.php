<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Faq;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $faqs = [
            [
                'question' => 'Quy trình thăm khám tại KT Beauty Medical Centre như thế nào?',
                'answer' => 'Tất cả khách hàng đến với KT Beauty đều được đón tiếp theo quy trình chuẩn y khoa. Bạn sẽ được Bác sĩ chuyên khoa trực tiếp soi da, tư vấn tình trạng và thiết kế phác đồ điều trị riêng biệt. Trung tâm cam kết tính minh bạch trong chỉ định và sử dụng các sản phẩm chính hãng.',
                'order' => 1,
            ],
            [
                'question' => 'KT Beauty Medical Centre có cam kết hiệu quả điều trị không?',
                'answer' => 'Chúng tôi luôn cam kết chất lượng điều trị bằng văn bản dựa trên tình trạng lâm sàng thực tế của khách hàng. Tất cả dịch vụ phẫu thuật hay điều trị công nghệ cao đều đi kèm chế độ bảo hành và chăm sóc hậu phẫu chu đáo.',
                'order' => 2,
            ],
            [
                'question' => 'Các công nghệ điều trị tại trung tâm có đạt chuẩn y khoa không?',
                'answer' => '100% máy móc và công nghệ tại KT Beauty Medical Centre đều được chứng nhận FDA (Hoa Kỳ) và CE (Châu Âu) về tính an toàn và hiệu quả, được chuyển giao chính hãng trực tiếp từ các tập đoàn y tế thẩm mỹ lớn.',
                'order' => 3,
            ],
            [
                'question' => 'Chi phí các dịch vụ tại KT Beauty như thế nào?',
                'answer' => 'Chi phí được công khai rõ ràng trong quá trình tư vấn và không phát sinh thêm bất kỳ khoản phụ thu nào trong suốt liệu trình. Chúng tôi cũng thường xuyên có các chương trình ưu đãi tri ân và hỗ trợ trả góp 0% lãi suất.',
                'order' => 4,
            ],
            [
                'question' => 'Tôi cần lưu ý gì sau khi thực hiện dịch vụ?',
                'answer' => 'Sau mỗi dịch vụ, điều dưỡng viên sẽ hướng dẫn chi tiết chế độ ăn uống, sinh hoạt và vệ sinh vùng điều trị. Bạn cũng sẽ nhận được cẩm nang hướng dẫn chăm sóc tại nhà và lịch hẹn tái khám định kỳ miễn phí.',
                'order' => 5,
            ],
        ];

        foreach ($faqs as $fq) {
            Faq::updateOrCreate(['question' => $fq['question']], $fq);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Faq::truncate();
    }
};
