<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Article;
use App\Models\Service;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Seed Admin User
        User::updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Administrator',
                'password' => Hash::make('admin123'),
                'email_verified_at' => now(),
            ]
        );

        // 2. Seed Articles (News)
        $articles = [
            [
                'title' => 'Điều gì tạo nên một trải nghiệm trẻ hóa thực sự khác biệt?',
                'description' => 'Tìm hiểu các tiêu chí quan trọng để đánh giá một dịch vụ trẻ hóa toàn diện chuẩn y khoa hiện đại.',
                'content' => '<p>Lĩnh vực trẻ hóa da đang phát triển mạnh mẽ với hàng loạt công nghệ mới ra đời. Tuy nhiên, một trải nghiệm trẻ hóa da thực sự khác biệt và hiệu quả không chỉ nằm ở máy móc mà là sự kết hợp của nhiều yếu tố y khoa chuẩn chỉnh.</p><h2>Các yếu tố tạo nên sự khác biệt trong trẻ hóa da</h2><h3>1. Phác đồ điều trị cá nhân hóa</h3><p>Mỗi làn da có cấu trúc và mức độ lão hóa khác nhau. Do đó, việc xây dựng phác đồ riêng biệt cho từng khách hàng là chìa khóa mang lại hiệu quả trẻ hóa da tối ưu nhất.</p><h3>2. Sự kết hợp công nghệ đa tầng</h3><p>Kết hợp giữa sóng siêu âm hội tụ hội tụ cường độ cao (HIFU) và sóng vô tuyến đơn cực (RF) giúp tác động sâu từ lớp cơ nông đến thượng bì, mang lại hiệu quả nâng cơ toàn diện.</p><h3>3. Tay nghề của bác sĩ chuyên khoa</h3><p>Bác sĩ chuyên ngành da liễu thẩm mỹ trực tiếp đo vẽ, thiết kế vector nâng cơ và điều chỉnh mức năng lượng phù hợp cho từng vùng da nhạy cảm.</p><h2>KT Beauty Cam Kết Trải Nghiệm Khác Biệt</h2><p>Chúng tôi tự hào kiến tạo chuẩn mực làm đẹp an toàn, hiệu quả:</p><ul><li>100% trang thiết bị chính hãng đạt chứng nhận FDA Hoa Kỳ.</li><li>Không gian điều trị VIP sang trọng, riêng tư và thư giãn.</li><li>Chế độ chăm sóc hậu phẫu chu đáo, chuyên nghiệp 24/7.</li></ul>',
                'image' => '/images/740467726_122234365430447416_4726582498491420090_n.jpg',
                'published_date' => '08/07/2026',
                'author' => 'Bác Sĩ CKI Ngọc Nữ',
                'category' => 'Chuyên môn'
            ],
            [
                'title' => 'Thẩm mỹ vùng mắt: Khi nào cần can thiệp? Giải pháp phù hợp',
                'description' => 'Phân tích khoa học về lão hóa vùng mắt, sụp mí mắt và các công nghệ can thiệp mí hiện đại nhất.',
                'content' => '<p>Đôi mắt được mệnh danh là cửa sổ tâm hồn, nhưng cũng là vùng da mỏng manh và dễ chịu ảnh hưởng nhất bởi quá trình lão hóa. Theo thời gian, những khuyết điểm vùng mắt không chỉ ảnh hưởng đến thẩm mỹ mà còn gây cản trở chức năng nhìn của mắt.</p><h2>4 Trường hợp cần can thiệp thẩm mỹ mắt ngay</h2><h3>1. Sụp mí mắt gây sụt giảm tầm nhìn</h3><p>Tình trạng cơ nâng mi bị yếu hoặc da chùng nhão chảy xệ che lấp đồng tử. Điều này làm khuôn mặt trông u buồn, mệt mỏi và hạn chế tầm nhìn nghiêm trọng.</p><h3>2. Bọng mắt lớn và da chùng chảy xệ</h3><p>Lượng mỡ tích tụ ở bọng mắt dưới kết hợp da chùng nhão mí trên do tuổi tác làm đôi mắt trông già nua, nặng nề.</p><h3>3. Mắt một mí, mí lót không cân đối</h3><p>Mắt nhỏ hoặc hai bên không đều nhau làm mất đi sự hài hòa của tổng thể khuôn mặt.</p><h3>4. Khuyết điểm góc mắt và nếp rẻ quạt hẹp</h3><p>Góc mắt bị che phủ khiến mắt trông ngắn, nhỏ và thiếu linh hoạt.</p><h2>Các phương pháp can thiệp chuẩn y khoa tại KT Beauty</h2><p>Tại KT Beauty Medical Centre, chúng tôi cung cấp các phác đồ độc bản giúp khắc phục hoàn hảo mọi khuyết điểm vùng mắt:</p><ul><li><strong>Cắt mí Double Eyeluxe:</strong> Tạo nếp mí đôi sắc nét, tự nhiên đồng thời loại bỏ da chùng, mỡ thừa.</li><li><strong>Lấy mỡ bọng mắt nội soi:</strong> Khắc phục bọng mắt dưới mà không để lại sẹo.</li><li><strong>Chỉnh hình cơ nâng mi:</strong> Phục hồi chức năng cơ nâng mi bị sụp.</li></ul><blockquote>Tất cả quy trình tại KT Beauty đều được thực hiện trực tiếp bởi đội ngũ bác sĩ chuyên khoa I giàu kinh nghiệm, đảm bảo an toàn tuyệt đối chuẩn y khoa.</blockquote>',
                'image' => '/images/725593428_122164685762677110_2827496772101167778_n.jpg',
                'published_date' => '05/07/2026',
                'author' => 'Hội Đồng Bác Sĩ KT',
                'category' => 'Chuyên môn'
            ],
            [
                'title' => 'KT Beauty chào đón công nghệ trẻ hóa thế hệ mới trong tháng 07/2026',
                'description' => 'Chuyển giao độc quyền công nghệ nâng cơ trẻ hóa Ultherapy Prime thế hệ mới đem lại hiệu quả vượt trội.',
                'content' => '<p>KT Beauty Medical Centre chính thức ký kết chuyển giao độc quyền công nghệ trẻ hóa nâng cơ cao cấp thế hệ mới, mở ra kỷ nguyên mới cho ngành thẩm mỹ nội khoa.</p><h2>Đột phá công nghệ trẻ hóa Ultherapy Prime thế hệ mới</h2><h3>1. Hiệu quả nâng cơ tầng sâu vượt trội</h3><p>Tác động chính xác vào lớp cân cơ nông SMAS ở độ sâu 4.5mm, giúp tái tạo collagen và elastin tự nhiên, nâng đỡ các vùng cơ chảy xệ hiệu quả.</p><h3>2. Rút ngắn thời gian điều trị</h3><p>Hệ thống đầu tuýp thông minh giúp phân phối năng lượng nhanh và đồng đều hơn, giảm thiểu cảm giác châm chích tối đa cho khách hàng.</p><h3>3. An toàn tuyệt đối chuẩn FDA</h3><p>Màn hình siêu âm trực quan giúp bác sĩ quan sát rõ ràng các lớp da đang điều trị, tránh tổn thương các mô lân cận.</p><h2>Sự kiện chuyển giao công nghệ đặc biệt</h2><p>Lễ ký kết sẽ diễn ra tại trung tâm hội nghị của KT Beauty với sự tham gia của các chuyên gia đầu ngành trong và ngoài nước:</p><ul><li>Gặp gỡ và tư vấn trực tiếp cùng Hội đồng bác sĩ chuyên môn.</li><li>Nhận ngay ưu đãi trải nghiệm công nghệ mới lên đến 50%.</li><li>Quà tặng chăm sóc da độc quyền dành riêng cho khách hàng đăng ký trước.</li></ul><blockquote>Đừng bỏ lỡ cơ hội sở hữu làn da tươi trẻ không tuổi cùng Ultherapy Prime tại KT Beauty trong tháng 7 này.</blockquote>',
                'image' => '/images/web.png',
                'published_date' => '01/07/2026',
                'author' => 'Ban Biên Tập KT',
                'category' => 'Sự kiện'
            ],
            [
                'title' => 'KT Beauty đồng hành thiện nguyện “Yêu thương cho em”, trao tặng 300 triệu',
                'description' => 'Hoạt động thiện nguyện ý nghĩa hỗ trợ các bệnh nhân có hoàn cảnh khó khăn điều trị tại bệnh viện.',
                'content' => 'Trách nhiệm xã hội luôn được KT Beauty chú trọng. Ban lãnh đạo cùng tập thể nhân viên đã có chuyến đi thiện nguyện đầy ý nghĩa tại bệnh viện Nhi Đồng...',
                'image' => '/images/DNG_3069.png',
                'published_date' => '28/06/2026',
                'author' => 'Đoàn Thiện Nguyện KT',
                'category' => 'Hoạt động'
            ],
            [
                'title' => 'Private VIP Workshop “The Science of Youth” – Luxury Wellness',
                'description' => 'Không gian workshop kết nối khoa học làm đẹp độc bản và trải nghiệm chăm sóc sức khỏe thượng lưu.',
                'content' => 'Buổi workshop riêng tư quy tụ các khách hàng VIP và những chia sẻ từ chuyên gia thẩm mỹ về xu hướng chăm sóc sắc đẹp chủ động bền vững...',
                'image' => '/images/Workshop-1.png',
                'published_date' => '22/06/2026',
                'author' => 'Ban Tổ Chức KT',
                'category' => 'Sự kiện'
            ],
            [
                'title' => 'CEO Khánh Tôn tham dự Ultherapy Prime APAC 2026 tại Malaysia',
                'description' => 'Cập nhật xu hướng trẻ hóa nâng cơ thế hệ mới cùng các chuyên gia đầu ngành khu vực Châu Á - Thái Bình Dương.',
                'content' => 'Hội nghị quy tụ các đại diện spa y khoa hàng đầu khu vực để thảo luận và cập nhật những phác đồ điều trị trẻ hóa tiên tiến nhất năm nay...',
                'image' => '/images/ultherapy-APAC.jpg',
                'published_date' => '15/06/2026',
                'author' => 'CEO Khánh Tôn',
                'category' => 'Sự kiện'
            ],
            [
                'title' => 'Đại diện KT Beauty tham dự Hội thảo Enhancing Safety & Precision',
                'description' => 'Nâng cao độ an toàn và độ chính xác trong tạo hình thẩm mỹ nội khoa cùng các chuyên gia quốc tế.',
                'content' => 'Sự an toàn của khách hàng luôn là tôn chỉ hàng đầu của KT Beauty. Hội thảo lần này tập trung vào các quy trình tiêm filler, botox an toàn tuyệt đối...',
                'image' => '/images/1-size-web-1.png',
                'published_date' => '08/06/2026',
                'author' => 'Hội Đồng Bác Sĩ KT',
                'category' => 'Chuyên môn'
            ],
            [
                'title' => 'MasterClass: Nâng cao chuyên môn cùng các bác sĩ đầu ngành',
                'description' => 'Chương trình đào tạo và chia sớ kinh nghiệm cùng các chuyên gia đầu ngành trong lĩnh vực thẩm mỹ y khoa.',
                'content' => '<p>KT Beauty tự hào tổ chức buổi MasterClass nâng cao tay nghề y khoa với sự góp mặt của các bác sĩ uy tín hàng đầu...</p>',
                'image' => '/images/Masterclass-1.jpg',
                'published_date' => '01/06/2026',
                'author' => 'Hội đồng Bác sĩ KT',
                'category' => 'Sự kiện'
            ]
        ];

        foreach ($articles as $idx => $art) {
            Article::updateOrCreate(
                ['title' => $art['title']],
                [
                    'slug' => $art['slug'] ?? Str::slug($art['title']),
                    'description' => $art['description'],
                    'content' => $art['content'],
                    'image' => $art['image'],
                    'published_date' => $art['published_date'],
                    'legacy_author' => $art['author'],
                    'category' => $art['category'],
                    'is_highlight' => $idx < 3,
                ]
            );
        }

        // 3. Seed Services (Services Catalog)
        $services = [
            [
                'name' => 'Cắt mí Double Eyeluxe',
                'category' => 'Phẫu thuật thẩm mỹ',
                'price' => 'Liên hệ',
                'description' => 'Kiến tạo nếp mí đôi sâu dài tự nhiên, loại bỏ bọng mỡ thừa và da chùng tối ưu.',
                'image' => '/images/EyeLuxe.jpg',
                'is_highlight' => true,
                'pillars' => [
                    [
                        'title' => 'Đo vẽ tỷ lệ nếp mí',
                        'desc' => 'Đo vẽ chính xác độ cao nếp mí phù hợp và hài hòa nhất với cấu trúc mắt khách hàng.',
                        'img' => '/images/white-placeholder.png',
                    ],
                    [
                        'title' => 'Gây tê và can thiệp nhẹ',
                        'desc' => 'Thực hiện bóc tách lấy bọng mỡ thừa và căng da chùng ở mí mắt trên.',
                        'img' => '/images/white-placeholder.png',
                    ],
                    [
                        'title' => 'Khâu đóng thẩm mỹ',
                        'desc' => 'Khâu khéo léo bằng chỉ thẩm mỹ chuyên dụng nhập khẩu không để lại sẹo xấu.',
                        'img' => '/images/white-placeholder.png',
                    ],
                    [
                        'title' => 'Chăm sóc hậu phẫu',
                        'desc' => 'Chiếu tia giảm sưng nề và hướng dẫn chế độ ăn uống, vệ sinh tại nhà chi tiết.',
                        'img' => '/images/white-placeholder.png',
                    ]
                ],
                'reviews' => [
                    '/images/white-placeholder.png',
                ],
                'before_after' => [
                    [
                        'title' => 'Khách hàng H.T.M',
                        'before' => '/images/white-placeholder.png',
                        'after' => '/images/white-placeholder.png',
                        'desc' => 'Tạo nếp mí đôi sâu rõ tự nhiên, trẻ hóa đôi mắt toàn diện sau 1 tháng.',
                    ]
                ]
            ],
            [
                'name' => 'Nâng mũi cấu trúc Gold-Line',
                'category' => 'Phẫu thuật thẩm mỹ',
                'price' => 'Liên hệ',
                'description' => 'Tái lập dáng mũi S-Line hoặc L-Line thanh tú, hài hòa với cấu trúc gương mặt Á Đông.',
                'image' => '/images/Phau-Thuat-Tham-My2x-1.png',
                'is_highlight' => true,
                'pillars' => [
                    [
                        'title' => 'Tư vấn dáng mũi vàng',
                        'desc' => 'Thiết kế dáng mũi S-Line hoặc L-Line phù hợp với nhân tướng học gương mặt.',
                        'img' => '/images/white-placeholder.png',
                    ],
                    [
                        'title' => 'Tạo hình sụn tự thân',
                        'desc' => 'Lấy sụn tai hoặc sụn vách ngăn để bọc đầu mũi, chống bóng đỏ lộ sóng sau này.',
                        'img' => '/images/white-placeholder.png',
                    ],
                    [
                        'title' => 'Dựng trụ mũi cấu trúc',
                        'desc' => 'Nâng cao sống mũi bằng sụn sinh học cao cấp nhập khẩu Hàn Quốc/Hoa Kỳ.',
                        'img' => '/images/white-placeholder.png',
                    ],
                    [
                        'title' => 'Chăm sóc định hình',
                        'desc' => 'Đeo nẹp cố định sống mũi và theo dõi lịch tái khám, cắt chỉ định kỳ.',
                        'img' => '/images/white-placeholder.png',
                    ]
                ],
                'reviews' => [
                    '/images/white-placeholder.png',
                ],
                'before_after' => [
                    [
                        'title' => 'Khách hàng N.V.A',
                        'before' => '/images/white-placeholder.png',
                        'after' => '/images/white-placeholder.png',
                        'desc' => 'Dáng mũi cao thanh tú, đầu mũi tròn mềm mại hài hòa gương mặt.',
                    ]
                ]
            ],
            [
                'name' => 'Cấy tóc y khoa tự thân DHI',
                'category' => 'Cấy tóc y khoa',
                'price' => 'Liên hệ',
                'description' => '<p class="mb-4">Cấy tóc tự thân là phương pháp sử dụng chính nang tóc khỏe mạnh sau gáy của khách hàng để phục hồi các vùng tóc thưa, hói hoặc hạ đường chân tóc thiếu cân đối. Tại KT Beauty, mỗi nang tóc sau cấy được định hướng hài hòa và mọc theo hướng tự nhiên nhất.</p><p>Quy trình cấy tóc được thực hiện trong môi trường chuẩn y khoa với định hướng hạn chế xâm lấn tối thiểu, chú trọng độ chính xác cao trong quá trình tách lọc và cấy nang tóc.</p>',
                'image' => '/images/Hinh-web-3-1.png',
                'slug' => 'cay-toc-y-khoa',
                'is_highlight' => false,
                'pillars' => [
                    [
                        'title' => 'Thiết kế đường tóc cá nhân hóa',
                        'desc' => 'Đường tóc được thiết kế riêng biệt dựa trên tỷ lệ trán, khuôn mặt, độ tuổi và hướng mọc tự nhiên giúp tạo cảm giác cân đối lâu dài.',
                        'img' => '/images/Hinh-web-3-1.png',
                    ],
                    [
                        'title' => 'Phân tích nang tóc chuyên sâu',
                        'desc' => 'Đánh giá chất lượng nang tóc và mật độ vùng hiến tóc nhằm tối ưu hóa tỷ lệ sinh trưởng và mật độ phân bổ sau cấy.',
                        'img' => '/images/Hinh-web-1-1.png',
                    ],
                    [
                        'title' => 'Quy trình xử lý nang tóc chuẩn xác',
                        'desc' => 'Nang tóc sau tách được bảo quản trong dung dịch nuôi dưỡng chuyên biệt dưới kính hiển vi điện tử độ phóng đại cao.',
                        'img' => '/images/Hinh-web-6-1.png',
                    ],
                    [
                        'title' => 'Theo dõi phục hồi sau cấy',
                        'desc' => 'Khách hàng được hướng dẫn chăm sóc chuyên biệt từng ngày và theo dõi sát sao tiến độ mọc tóc định kỳ 1-3-6-9-12 tháng.',
                        'img' => '/images/Hinh-web-8-1.png',
                    ],
                    [
                        'title' => 'Đồng hành dài hạn',
                        'desc' => 'Không gian phòng khám vô trùng riêng tư, chuyên nghiệp. KT Beauty cam kết đồng hành từ tư vấn tới hậu phẫu trọn đời.',
                        'img' => '/images/Hinh-web-9-1.png',
                    ],
                ],
                'reviews' => [
                    '/images/Review-cay-toc-DHI-3-1.png',
                    '/images/Review-cay-toc-DHI-5-1.png',
                    '/images/Review-cay-toc-DHI-2-1.png',
                ],
                'before_after' => [
                    [
                        'title' => 'Khách hàng L.H.N',
                        'before' => '/images/before-LHN-1-1.png',
                        'after' => '/images/after-LHN-1-1.png',
                        'desc' => 'Cấy tóc vùng trán hói chữ M, khôi phục đường tóc dày dặn nam tính sau 6 tháng.',
                    ],
                    [
                        'title' => 'Khách hàng N.T.T',
                        'before' => '/images/before-NTT-1-1.png',
                        'after' => '/images/after-NTT-1-1.png',
                        'desc' => 'Cải thiện mật độ tóc đỉnh đầu thưa rụng nhiều, nang tóc mọc dày ổn định.',
                    ],
                    [
                        'title' => 'Khách hàng Nữ - Cấy hạ đường chân tóc',
                        'before' => '/images/before-custumor-1-1.png',
                        'after' => '/images/after-custumor-1-1.png',
                        'desc' => 'Hạ đường chân tóc trán sân bay tạo tỷ lệ mặt thanh thoát mềm mại nữ tính.',
                    ],
                ],
            ],
            [
                'name' => 'Cấy tinh chất Meso căng bóng',
                'category' => 'Da liễu & Trẻ hóa',
                'price' => 'Liên hệ',
                'description' => 'Cung cấp trực tiếp các dưỡng chất, hyaluronic acid nuôi dưỡng làn da căng bóng mịn màng.',
                'image' => '/images/da-lieu-tham-my2x-1.png',
                'is_highlight' => true,
                'pillars' => [
                    [
                        'title' => 'Làm sạch và ủ tê',
                        'desc' => 'Làm sạch sâu da mặt, ủ tê giúp tạo sự thoải mái nhẹ nhàng nhất.',
                        'img' => '/images/white-placeholder.png',
                    ],
                    [
                        'title' => 'Cấy tinh chất Meso vi điểm',
                        'desc' => 'Cấy dưỡng chất HA, vitamin và peptide đều khắp các vùng da cần hồi sinh.',
                        'img' => '/images/white-placeholder.png',
                    ],
                    [
                        'title' => 'Điện di làm dịu da',
                        'desc' => 'Sử dụng đầu lạnh điện di giúp se khít lỗ chân lông, làm dịu da tức thì.',
                        'img' => '/images/white-placeholder.png',
                    ],
                    [
                        'title' => 'Đắp mặt nạ tế bào gốc',
                        'desc' => 'Khóa ẩm và tăng cường dưỡng chất nuôi dưỡng tế bào da từ sâu bên trong.',
                        'img' => '/images/white-placeholder.png',
                    ]
                ],
                'reviews' => [
                    '/images/white-placeholder.png',
                ],
                'before_after' => [
                    [
                        'title' => 'Khách hàng T.T.L',
                        'before' => '/images/white-placeholder.png',
                        'after' => '/images/white-placeholder.png',
                        'desc' => 'Làn da căng bóng mướt mịn, cải thiện đáng kể nếp nhăn li ti sau 3 buổi.',
                    ]
                ]
            ],
            [
                'name' => 'Nâng cơ trẻ hóa Ultherapy',
                'category' => 'Da liễu & Trẻ hóa',
                'price' => 'Liên hệ',
                'description' => 'Công nghệ nâng cơ không xâm lấn hàng đầu thế giới được FDA Hoa Kỳ chứng nhận.',
                'image' => '/images/web.png',
                'is_highlight' => false,
                'pillars' => [
                    [
                        'title' => 'Thiết kế vector nâng cơ',
                        'desc' => 'Xác định các vùng cơ chùng nhão chảy xệ để đi năng lượng sóng siêu âm phù hợp.',
                        'img' => '/images/white-placeholder.png',
                    ],
                    [
                        'title' => 'Tiến hành đi máy Ultherapy',
                        'desc' => 'Tác động sâu vào lớp cân cơ nông SMAS 4.5mm giúp co thắt cơ nâng đỡ cấu trúc da.',
                        'img' => '/images/white-placeholder.png',
                    ],
                    [
                        'title' => 'Dưỡng chất làm dịu bề mặt',
                        'desc' => 'Thoa kem dưỡng ẩm dịu mát và bảo vệ bề mặt da ngay sau điều trị.',
                        'img' => '/images/white-placeholder.png',
                    ]
                ],
                'reviews' => [
                    '/images/white-placeholder.png',
                ],
                'before_after' => [
                    [
                        'title' => 'Khách hàng L.T.H',
                        'before' => '/images/white-placeholder.png',
                        'after' => '/images/white-placeholder.png',
                        'desc' => 'Nâng cao cung chân mày, thon gọn viền hàm rõ rệt sau 1 liệu trình.',
                    ]
                ]
            ],
            [
                'name' => 'Tiêm Filler/Botox tạo hình',
                'category' => 'Da liễu & Trẻ hóa',
                'price' => 'Liên hệ',
                'description' => 'Tái cấu trúc tỷ lệ gương mặt hài hòa tự nhiên với chất làm đầy chính hãng chất lượng cao.',
                'image' => '/images/white-placeholder.png',
                'is_highlight' => false,
                'pillars' => [
                    [
                        'title' => 'Thăm khám và đo vẽ tỷ lệ vàng',
                        'desc' => 'Bác sĩ kiểm tra cấu trúc cơ mặt và tư vấn liều lượng Filler/Botox chuẩn xác.',
                        'img' => '/images/white-placeholder.png',
                    ],
                    [
                        'title' => 'Xác định điểm tiêm và ủ tê',
                        'desc' => 'Ủ tê và sát khuẩn cẩn thận vùng điều trị để đảm bảo an toàn y khoa.',
                        'img' => '/images/white-placeholder.png',
                    ],
                    [
                        'title' => 'Tiến hành đưa tinh chất',
                        'desc' => 'Bác sĩ chuyên khoa trực tiếp tiêm tạo hình tỉ mỉ giúp lấp đầy hóp má, thái dương.',
                        'img' => '/images/white-placeholder.png',
                    ]
                ],
                'reviews' => [
                    '/images/white-placeholder.png',
                ],
                'before_after' => [
                    [
                        'title' => 'Khách hàng M.P.Q',
                        'before' => '/images/white-placeholder.png',
                        'after' => '/images/white-placeholder.png',
                        'desc' => 'Làm đầy thái dương hóp sâu, tạo cằm V-line tự nhiên quyến rũ.',
                    ]
                ]
            ],
            [
                'name' => 'Điều trị nám Laser công nghệ cao',
                'category' => 'Da liễu & Trẻ hóa',
                'price' => 'Liên hệ',
                'description' => 'Loại bỏ tận gốc các hắc sắc tố nám, tàn nhang sâu dưới da bằng Laser xung siêu ngắn.',
                'image' => '/images/white-placeholder.png',
                'is_highlight' => false,
                'pillars' => [
                    [
                        'title' => 'Soi da phân tích sắc tố',
                        'desc' => 'Xác định chính xác loại nám nông hay nám chân sâu để lên phác đồ điều trị.',
                        'img' => '/images/white-placeholder.png',
                    ],
                    [
                        'title' => 'Bắn Laser trị liệu vi điểm',
                        'desc' => 'Phát năng lượng laser chọn lọc nhằm phá hủy chân melanin không tổn thương mô lành.',
                        'img' => '/images/white-placeholder.png',
                    ],
                    [
                        'title' => 'Cấp tinh chất phục hồi da',
                        'desc' => 'Điện di tinh chất tế bào gốc làm dịu và kích thích tăng sinh da mới sáng mịn.',
                        'img' => '/images/white-placeholder.png',
                    ]
                ],
                'reviews' => [
                    '/images/white-placeholder.png',
                ],
                'before_after' => [
                    [
                        'title' => 'Khách hàng K.O.N',
                        'before' => '/images/white-placeholder.png',
                        'after' => '/images/white-placeholder.png',
                        'desc' => 'Mờ hơn 85% chân nám sâu cứng đầu, da căng mướt và đều màu.',
                    ]
                ]
            ],
            [
                'name' => 'Điêu khắc lông mày Aurora',
                'category' => 'Da liễu & Trẻ hóa',
                'price' => 'Liên hệ',
                'description' => 'Kiến tạo dáng mày phong thủy, sợi mày sắc nét chân thực bằng kỹ nghệ điêu khắc vi chạm.',
                'image' => '/images/white-placeholder.png',
                'is_highlight' => false,
                'pillars' => [
                    [
                        'title' => 'Đo tỷ lệ và vẽ dáng mày',
                        'desc' => 'Phác thảo dáng lông mày phù hợp với nhân tướng học gương mặt khách hàng.',
                        'img' => '/images/white-placeholder.png',
                    ],
                    [
                        'title' => 'Ủ tê và đi khắc sợi vi điểm',
                        'desc' => 'Đi sợi siêu mảnh đan xen lông mày tự nhiên mà hoàn toàn không đau rát.',
                        'img' => '/images/white-placeholder.png',
                    ],
                    [
                        'title' => 'Thoa dưỡng màu bảo vệ',
                        'desc' => 'Thoa tinh chất dưỡng màu thảo dược giúp da bong mịn màng và giữ màu đẹp nhất.',
                        'img' => '/images/white-placeholder.png',
                    ]
                ],
                'reviews' => [
                    '/images/white-placeholder.png',
                ],
                'before_after' => [
                    [
                        'title' => 'Khách hàng N.H.Y',
                        'before' => '/images/white-placeholder.png',
                        'after' => '/images/white-placeholder.png',
                        'desc' => 'Tái tạo dáng lông mày nhạt thưa, cân đối sắc sảo làm bừng sáng gương mặt.',
                    ]
                ]
            ]
        ];

        foreach ($services as $srv) {
            Service::updateOrCreate(
                ['name' => $srv['name']],
                [
                    'category' => $srv['category'],
                    'price' => $srv['price'],
                    'description' => $srv['description'],
                    'image' => $srv['image'],
                    'slug' => $srv['slug'] ?? Str::slug($srv['name']),
                    'is_highlight' => $srv['is_highlight'],
                    'pillars' => $srv['pillars'] ?? null,
                    'reviews' => $srv['reviews'] ?? null,
                    'before_after' => $srv['before_after'] ?? null,
                ]
            );
        }

        // 4. Seed Banners
        \App\Models\Banner::updateOrCreate(
            ['title' => 'Kiến tạo'],
            [
                'eyebrow' => 'KT Beauty Medical Centre',
                'subtitle' => 'Vẻ đẹp độc bản',
                'description' => 'KT Beauty Medical Centre mang đến dịch vụ thẩm mỹ chuẩn y khoa hàng đầu Việt Nam, giúp bạn tự tin sở hữu vẻ đẹp độc bản, chuẩn tự nhiên.',
                'image_desktop' => '/images/Ban-banner-web-3-1.png',
                'image_mobile' => '/images/size-4x5-phone-1-1.png',
                'button_primary_text' => 'Đặt Lịch Khám Ngay',
                'button_primary_url' => '/dat-lich',
                'button_secondary_text' => 'Tìm Hiểu Dịch Vụ',
                'button_secondary_url' => '#services',
                'order' => 0,
                'is_active' => true,
            ]
        );

        // 5. Seed Settings
        $settings = [
            ['key' => 'site_hotline', 'value' => '19005006', 'label' => 'Hotline Chăm Sóc Khách Hàng'],
            ['key' => 'site_email', 'value' => 'info@ktbeauty.vn', 'label' => 'Email Liên Hệ'],
            ['key' => 'site_address', 'value' => '33 Trần Hưng Đạo, Quận 1, TP. Hồ Chí Minh', 'label' => 'Địa Chỉ Phòng Khám'],
            ['key' => 'site_logo_dark', 'value' => '/images/LOGO-KT-NGANG-DEN-BAN-MOI-NHAT-07-2-1.png', 'label' => 'Logo tối màu (Dùng cho nền sáng/trắng)'],
            ['key' => 'site_logo_light', 'value' => '/images/LOGO-KT-NGANG-WHITE-BAN-MOI-NHAT-05-1-2048x541-1.png', 'label' => 'Logo sáng màu (Dùng cho nền tối/trong suốt)'],
            ['key' => 'site_logo_square', 'value' => '/images/Favicon_KT.png', 'label' => 'Logo vuông (Favicon / Icon đại diện)'],
            ['key' => 'site_logo_square_light', 'value' => '/images/Favicon_KT.png', 'label' => 'Logo vuông sáng màu (Dùng cho nền tối)'],
            ['key' => 'facebook_url', 'value' => 'https://facebook.com/ktbeauty.vn', 'label' => 'Liên Kết Facebook'],
            ['key' => 'zalo_url', 'value' => 'https://zalo.me/19005006', 'label' => 'Liên Kết Zalo'],
            ['key' => 'youtube_url', 'value' => 'https://youtube.com', 'label' => 'Liên Kết YouTube'],
            [
                'key' => 'policy_dieu_khoan_su_dung',
                'value' => '<div><h2 class="text-xl font-serif font-bold text-dark-bg mb-4">1. Chấp thuận điều khoản</h2><p class="mb-4">Bằng việc truy cập, duyệt website hoặc sử dụng bất kỳ dịch vụ trực tuyến nào do KT Beauty Medical Centre cung cấp, người dùng đồng ý tuân thủ toàn bộ các điều khoản, điều kiện và thông báo được quy định tại đây. Nếu bạn không đồng ý với các điều khoản này, vui lòng ngừng sử dụng website.</p></div><div class="mt-8"><h2 class="text-xl font-serif font-bold text-dark-bg mb-4">2. Sở hữu trí tuệ</h2><ul class="list-disc list-inside pl-4 space-y-2 text-gray-600"><li>Toàn bộ nội dung trên website bao gồm nhưng không giới hạn ở: văn bản, hình ảnh, video, đồ họa, logo, thiết kế và giao diện thuộc quyền sở hữu hợp pháp của KT Beauty Medical Centre (CÔNG TY TNHH KHÁNH MINH GROUP).</li><li>Mọi hành vi sao chép, trích dẫn, phân phối hoặc sử dụng thương mại các tài nguyên trên website khi chưa có sự đồng ý bằng văn bản của chúng tôi đều là vi phạm pháp luật.</li></ul></div><div class="mt-8"><h2 class="text-xl font-serif font-bold text-dark-bg mb-4">3. Giới hạn trách nhiệm và bản chất thông tin</h2><ul class="list-disc list-inside pl-4 space-y-2 text-gray-600"><li>Các kiến thức, bài viết hướng dẫn chăm sóc da hoặc thông tin dịch vụ trên website mang tính chất tham khảo, không thể thay thế cho việc thăm khám, chẩn đoán, tư vấn và phác đồ điều trị chuyên môn trực tiếp từ bác sĩ.</li><li>KT Beauty Medical Centre nỗ lực đảm bảo tính chính xác của thông tin trên website nhưng không chịu trách nhiệm pháp lý đối với bất kỳ hậu quả nào phát sinh từ việc người dùng tự ý áp dụng thông tin mà không qua tư vấn y khoa chuyên môn.</li></ul></div><div class="mt-8"><h2 class="text-xl font-serif font-bold text-dark-bg mb-4">4. Quy định về hành vi của người dùng</h2><p class="mb-4">Người dùng cam kết không thực hiện các hành vi sau khi truy cập website:</p><ul class="list-disc list-inside pl-4 space-y-2 text-gray-600"><li>Sử dụng bất kỳ thiết bị, phần mềm nào nhằm can thiệp, phá hoại hoặc làm gián đoạn hoạt động của website.</li><li>Đăng tải, truyền bá các nội dung vi phạm pháp luật, thuần phong mỹ tục, hoặc bôi nhọ uy tín của tổ chức, cá nhân khác.</li><li>Thu thập thông tin của người dùng khác trên website khi chưa được sự đồng ý của họ.</li></ul></div><div class="mt-8"><h2 class="text-xl font-serif font-bold text-dark-bg mb-4">5. Thay đổi điều khoản</h2><p class="mb-4">KT Beauty Medical Centre có quyền chỉnh sửa, cập nhật nội dung Điều khoản sử dụng này vào bất kỳ lúc nào mà không cần thông báo trước. Các thay đổi sẽ có hiệu lực ngay khi được đăng tải trên website.</p></div>',
                'label' => 'Điều Khoản Sử Dụng'
            ],
            [
                'key' => 'policy_chinh_sach_bao_mat',
                'value' => '<div><h2 class="text-xl font-serif font-bold text-dark-bg mb-4">1. Mục đích và phạm vi thu thập thông tin</h2><p class="mb-4">KT Beauty Medical Centre (thuộc sở hữu của CÔNG TY TNHH KHÁNH MINH GROUP) thực hiện việc thu thập thông tin cá nhân của khách hàng khi khách hàng tương tác, đăng ký tư vấn hoặc đặt lịch dịch vụ trên website.</p><ul class="list-disc list-inside pl-4 space-y-2 text-gray-600"><li>Phạm vi dữ liệu thu thập bao gồm: Họ và tên, số điện thoại, địa chỉ email, nhu cầu tư vấn hoặc các thông tin khác do khách hàng chủ động cung cấp qua biểu mẫu trực tuyến.</li><li>Mọi thông tin cung cấp phải đảm bảo tính chính xác và hợp pháp. KT Beauty Medical Centre không chịu trách nhiệm liên quan đến pháp luật của thông tin khai báo.</li></ul></div><div class="mt-8"><h2 class="text-xl font-serif font-bold text-dark-bg mb-4">2. Phạm vi sử dụng thông tin</h2><p class="mb-4">Website sử dụng thông tin khách hàng cung cấp để:</p><ul class="list-disc list-inside pl-4 space-y-2 text-gray-600"><li>Liên hệ xác nhận lịch hẹn, tư vấn dịch vụ theo nhu cầu của khách hàng.</li><li>Cung cấp các thông tin chăm sóc khách hàng, chương trình ưu đãi (nếu có sự đồng ý của khách hàng).</li><li>Giải quyết các khiếu nại, thắc mắc hoặc các vấn đề phát sinh liên quan đến việc sử dụng dịch vụ.</li><li>Nâng cao chất lượng dịch vụ và tối ưu hóa trải nghiệm trên website.</li></ul></div><div class="mt-8"><h2 class="text-xl font-serif font-bold text-dark-bg mb-4">3. Thời gian lưu trữ thông tin</h2><p class="mb-4">Dữ liệu cá nhân của khách hàng sẽ được lưu trữ bảo mật trên hệ thống nội bộ của KT Beauty Medical Centre cho đến khi có yêu cầu hủy bỏ từ phía khách hàng hoặc khi mục đích thu thập không còn phù hợp với quy định của pháp luật.</p></div><div class="mt-8"><h2 class="text-xl font-serif font-bold text-dark-bg mb-4">4. Những người hoặc tổ chức có thể được tiếp cận thông tin</h2><p class="mb-4">KT Beauty Medical Centre cam kết không bán, chia sẻ hay trao đổi thông tin cá nhân của khách hàng cho bất kỳ bên thứ ba nào khác, ngoại trừ các trường hợp sau:</p><ul class="list-disc list-inside pl-4 space-y-2 text-gray-600"><li>Các nhân viên nội bộ thuộc hệ thống KT Beauty Medical Centre được phân công trách nhiệm chăm sóc khách hàng.</li><li>Cung cấp theo yêu cầu bằng văn bản của cơ quan Nhà nước có thẩm quyền theo quy định của pháp luật Việt Nam.</li></ul></div><div class="mt-8"><h2 class="text-xl font-serif font-bold text-dark-bg mb-4">5. Địa chỉ của đơn vị thu thập và quản lý thông tin</h2><ul class="list-none pl-4 space-y-2 text-gray-600"><li><strong class="text-dark-bg font-semibold">Tên đơn vị:</strong> CÔNG TY TNHH KHÁNH MINH GROUP</li><li><strong class="text-dark-bg font-semibold">Mã số thuế:</strong> 0318660537</li><li><strong class="text-dark-bg font-semibold">Địa chỉ trụ sở:</strong> Số 1, Đường Sương Nguyệt Ánh, Phường Bến Thành, Quận 1, Thành phố Hồ Chí Minh, Việt Nam.</li><li><strong class="text-dark-bg font-semibold">Hotline:</strong> 19005006</li><li><strong class="text-dark-bg font-semibold">Email:</strong> cskh@ktbeautycentre.com.vn</li></ul></div><div class="mt-8"><h2 class="text-xl font-serif font-bold text-dark-bg mb-4">6. Phương thức để người dùng tiếp cận và chỉnh sửa dữ liệu</h2><p class="mb-4">Khách hàng có quyền yêu cầu kiểm tra, cập nhật, điều chỉnh hoặc hủy bỏ thông tin cá nhân của mình bằng cách:</p><ul class="list-disc list-inside pl-4 space-y-2 text-gray-600"><li>Gọi điện trực tiếp đến hotline: 19005006</li><li>Gửi email yêu cầu về địa chỉ: cskh@ktbeautycentre.com.vn. Ban quản trị website có trách nhiệm hỗ trợ khách hàng thực hiện các quyền này sớm nhất.</li></ul></div><div class="mt-8"><h2 class="text-xl font-serif font-bold text-dark-bg mb-4">7. Cam kết bảo mật thông tin cá nhân khách hàng</h2><p class="mb-4">Thông tin cá nhân của khách hàng trên website được cam kết bảo mật tuyệt đối theo chính sách bảo vệ thông tin cá nhân này và quy định của pháp luật.</p><p class="mb-4">Chúng tôi áp dụng các biện pháp kỹ thuật phù hợp nhằm hạn chế tối đa các rủi ro về truy cập trái phép hoặc rò rỉ dữ liệu. Tuy nhiên, trong trường hợp máy chủ lưu trữ thông tin bị hacker tấn công dẫn đến mất mát dữ liệu cá nhân, chúng tôi sẽ có trách nhiệm thông báo vụ việc cho cơ quan chức năng điều tra xử lý kịp thời và thông báo cho khách hàng được biết.</p></div>',
                'label' => 'Chính Sách Bảo Mật'
            ],
            [
                'key' => 'policy_chinh_sach_thanh_toan',
                'value' => '<p class="mb-4">KT Beauty Medical Centre hướng tới việc mang lại sự thuận tiện và an tâm nhất cho khách hàng. Hiện tại, website của chúng tôi hoạt động với tính năng cung cấp thông tin và hỗ trợ đặt lịch hẹn trực tuyến, không yêu cầu khách hàng phải thanh toán trực tuyến hoặc đặt cọc trước trên website.</p><p class="mb-6">Quy trình thanh toán chi phí dịch vụ được thực hiện hoàn toàn trực tiếp tại trung tâm theo các bước sau:</p><div><h2 class="text-xl font-serif font-bold text-dark-bg mb-4">1. Các hình thức thanh toán được chấp nhận</h2><p class="mb-4">Khi sử dụng dịch vụ trực tiếp tại KT Beauty Medical Centre, khách hàng có thể lựa chọn các hình thức thanh toán linh hoạt bao gồm:</p><ul class="list-disc list-inside pl-4 space-y-2 text-gray-600"><li><strong class="text-dark-bg">Tiền mặt:</strong> Thanh toán trực tiếp tại quầy thu ngân của trung tâm.</li><li><strong class="text-dark-bg">Chuyển khoản Ngân hàng:</strong> Khách hàng chuyển khoản vào tài khoản ngân hàng chính thức của CÔNG TY TNHH KHÁNH MINH GROUP (Thông tin tài khoản sẽ được nhân viên thu ngân cung cấp trực tiếp tại quầy).</li><li><strong class="text-dark-bg">Thanh toán bằng thẻ (POS):</strong> Chấp nhận các loại thẻ nội địa (ATM) và thẻ quốc tế (Visa, Mastercard,…) theo hệ thống máy POS tại trung tâm.</li></ul></div><div class="mt-8"><h2 class="text-xl font-serif font-bold text-dark-bg mb-4">2. Xác nhận chi phí và hóa đơn</h2><ul class="list-disc list-inside pl-4 space-y-2 text-gray-600"><li>Mọi chi phí dịch vụ đều được tư vấn rõ ràng, công khai và có sự đồng ý của khách hàng trước khi tiến hành thực hiện dịch vụ.</li><li>Sau khi hoàn tất thanh toán, khách hàng sẽ nhận được hóa đơn/phiếu thu hợp lệ từ KT Beauty Medical Centre. Đối với khách hàng có nhu cầu xuất hóa đơn giá trị gia tăng (VAT), vui lòng thông báo với nhân viên thu ngân tại thời điểm thanh toán để được hỗ trợ theo quy định pháp luật.</li></ul></div>',
                'label' => 'Chính Sách Thanh Toán'
            ],
            [
                'key' => 'policy_chinh_sach_hoan_tien',
                'value' => '<div><h2 class="text-xl font-serif font-bold text-dark-bg mb-4">1. Nguyên tắc chung</h2><p class="mb-4">Do đặc thù các dịch vụ tại KT Beauty Medical Centre là dịch vụ chăm sóc sức khỏe và thẩm mỹ được thực hiện trực tiếp, chúng tôi không áp dụng chính sách hoàn trả tiền mặt hoặc hủy ngang đối với các dịch vụ đã được thực hiện xong dựa trên sự đồng ý trước đó của khách hàng.</p></div><div class="mt-8"><h2 class="text-xl font-serif font-bold text-dark-bg mb-4">2. Các trường hợp được xem xét giải quyết hoàn tiền/đổi dịch vụ</h2><p class="mb-4">KT Beauty Medical Centre sẽ tiếp nhận và xử lý hoàn tiền hoặc chuyển đổi giá trị dịch vụ tương đương trong các trường hợp đặc biệt sau:</p><ul class="list-disc list-inside pl-4 space-y-2 text-gray-600"><li><strong class="text-dark-bg">Lỗi giao dịch tài chính:</strong> Khách hàng chuyển khoản thừa, chuyển khoản trùng lặp do lỗi hệ thống ngân hàng hoặc nhầm lẫn trong quá trình thao tác.</li><li><strong class="text-dark-bg">Lý do bất khả kháng từ phía Trung tâm:</strong> Lịch hẹn bị hủy từ phía trung tâm mà không thể sắp xếp được lịch thay thế phù hợp với khách hàng, hoặc trung tâm không đáp ứng được đúng dịch vụ như đã cam kết trong hợp đồng gói dịch vụ (nếu có).</li><li><strong class="text-dark-bg">Lý do y khoa từ phía khách hàng:</strong> Khách hàng đã mua gói dịch vụ nhưng phát sinh tình trạng sức khỏe đột xuất (có xác nhận của bác sĩ chuyên khoa) chỉ định không thể tiếp tục sử dụng liệu trình thẩm mỹ đó.</li></ul></div><div class="mt-8"><h2 class="text-xl font-serif font-bold text-dark-bg mb-4">3. Quy trình và thời gian xử lý hoàn tiền</h2><ul class="list-decimal list-inside pl-4 space-y-2 text-gray-600"><li><strong class="text-dark-bg">Bước 1:</strong> Khách hàng gửi yêu cầu hỗ trợ qua Hotline: 19005006 hoặc đến trực tiếp trung tâm để lập biên bản xác nhận.</li><li><strong class="text-dark-bg">Bước 2:</strong> Bộ phận kế toán và CSKH của KT Beauty Medical Centre sẽ tiến hành xác minh thông tin giao dịch trong vòng 03 đến 05 ngày làm việc.</li><li><strong class="text-dark-bg">Bước 3:</strong> Nếu yêu cầu hợp lệ, tiền sẽ được hoàn trả lại cho khách hàng thông qua hình thức chuyển khoản ngân hàng trong vòng 07 ngày làm việc tiếp theo.</li></ul></div>',
                'label' => 'Chính Sách Hoàn Tiền'
            ],
            [
                'key' => 'policy_tuyen_bo_mien_tru_trach_nhiem',
                'value' => '<div><h2 class="text-xl font-serif font-bold text-dark-bg mb-4">1. Về mặt thông tin trên Website</h2><p class="mb-4">Mọi thông tin, bài viết, hình ảnh tư vấn khoa học được đăng tải trên website này chỉ mang tính chất tham khảo, chia sẻ kiến thức phổ thông và không được coi là lời khuyên, chẩn đoán, phác đồ điều trị thay thế cho các văn bản y khoa chính thức. Người dùng không được tự ý áp dụng các thông tin trên website để tự điều trị tại nhà khi chưa có sự thăm khám và chỉ định từ bác sĩ chuyên môn. KT Beauty Medical Centre hoàn toàn miễn trừ trách nhiệm pháp lý đối với bất kỳ hậu quả nào do việc tự ý áp dụng thông tin của người dùng gây ra.</p></div><div class="mt-8"><h2 class="text-xl font-serif font-bold text-dark-bg mb-4">2. Về hiệu quả và kết quả dịch vụ</h2><p class="mb-4">Y khoa và thẩm mỹ là những lĩnh vực phụ thuộc lớn vào yếu tố cơ địa. Kết quả thực tế của các liệu trình chăm sóc, điều trị da hoặc thẩm mỹ tại KT Beauty Medical Centre có thể khác nhau tùy thuộc vào:</p><ul class="list-disc list-inside pl-4 space-y-2 text-gray-600"><li>Cơ địa, thể trạng và cấu trúc da riêng biệt của mỗi khách hàng.</li><li>Mức độ tuân thủ hướng dẫn chăm sóc sau dịch vụ tại nhà của khách hàng.</li><li>Chế độ ăn uống, sinh hoạt và các yếu tố môi trường tác động ngoài tầm kiểm soát của trung tâm. Chúng tôi không đưa ra các cam kết mang tính chất tuyệt đối 100% cho tất cả các trường hợp khách hàng.</li></ul></div><div class="mt-8"><h2 class="text-xl font-serif font-bold text-dark-bg mb-4">3. Về các liên kết ngoài (External Links)</h2><p class="mb-4">Website có thể chứa các liên kết dẫn đến các website thuộc bên thứ ba nhằm mục đích cung cấp thêm nguồn tham khảo hữu ích cho người đọc. KT Beauty Medical Centre không quản lý, không chịu trách nhiệm về nội dung, tính chính xác hay chính sách bảo mật của các website bên ngoài này.</p></div>',
                'label' => 'Tuyên Bố Miễn Trừ Trách Nhiệm'
            ],
        ];

        foreach ($settings as $setting) {
            \App\Models\Setting::updateOrCreate(
                ['key' => $setting['key']],
                [
                    'value' => $setting['value'],
                    'label' => $setting['label'],
                ]
            );
        }

        // 6. Seed Doctors
        $doctors = [
            [
                'name' => 'Bs. CKI Ngọc Nữ',
                'role' => 'Bác Sĩ CKI Da Liễu Thẩm Mỹ',
                'image' => '/images/Anh-dai-dien-Bac-si-Nu-1.png',
                'bio' => 'Hơn 10 năm kinh nghiệm điều trị da liễu, trực tiếp tư vấn phác đồ và thực hiện cấy tinh chất Meso, trẻ hóa nâng cơ.',
                'order' => 0,
            ],
            [
                'name' => 'Bs. CKI Nguyễn Thị Hảo',
                'role' => 'Bác Sĩ CKI Thẩm Mỹ Nội Khoa',
                'image' => '/images/Anh-dai-dien-Bac-Si-Hao-1.png',
                'bio' => 'Chuyên môn cao về kỹ thuật tiêm Filler/Botox tạo hình khuôn mặt, trẻ hóa xóa nhăn và trẻ hóa sinh học chuyên sâu.',
                'order' => 1,
            ],
            [
                'name' => 'Bs. CKI Hồ Việt Trinh',
                'role' => 'Bác Sĩ CKI Phẫu Thuật Thẩm Mỹ',
                'image' => '/images/559443567_122144185118677110_5751359661921085413_n-2-1.jpg',
                'bio' => 'Chuyên gia cắt mí Double Eyeluxe, nâng mũi cấu trúc và tạo hình vi phẫu thẩm mỹ chuẩn tỷ lệ vàng.',
                'order' => 2,
            ],
            [
                'name' => 'Ths. Bs. Nguyễn Vũ Huân',
                'role' => 'Thạc Sĩ - Bác Sĩ Thẩm Mỹ Công Nghệ Cao',
                'image' => '/images/Ban-sao-BS-Huan-web-1-1-1-scaled-1.jpg',
                'bio' => 'Trưởng khoa công nghệ cao, chuyên sâu điều trị nám, sẹo rỗ, tàn nhang bằng Laser thế hệ mới.',
                'order' => 3,
            ],
            [
                'name' => 'Ths. Bs. CKI Hoàng Nga',
                'role' => 'Thạc Sĩ - Bác Sĩ CKI Phun Xăm Thẩm Mỹ',
                'image' => '/images/Anh-dai-dien-BS-Nga-Aurora-1.png',
                'bio' => 'Hơn 8 năm giảng dạy và thực hiện kỹ nghệ phun thêu điêu khắc lông mày vi chạm đỉnh cao.',
                'order' => 4,
            ],
        ];

        foreach ($doctors as $doc) {
            \App\Models\Doctor::updateOrCreate(
                ['name' => $doc['name']],
                [
                    'role' => $doc['role'],
                    'image' => $doc['image'],
                    'bio' => $doc['bio'],
                    'order' => $doc['order'],
                ]
            );
        }

        // 7. Seed FAQs
        $faqs = [
            [
                'question' => 'Quy trình thăm khám tại KT Beauty Medical Centre như thế nào?',
                'answer' => 'Tất cả khách hàng đến với KT Beauty đều được đón tiếp theo quy trình chuẩn y khoa. Bạn sẽ được Bác sĩ chuyên khoa trực tiếp soi da, tư vấn tình trạng và thiết kế phác đồ điều trị riêng biệt. Trung tâm cam kết tính minh bạch trong chỉ định và sử dụng các sản phẩm chính hãng.',
                'order' => 0,
            ],
            [
                'question' => 'KT Beauty Medical Centre có cam kết hiệu quả điều trị không?',
                'answer' => 'Chúng tôi luôn cam kết chất lượng điều trị bằng văn bản dựa trên tình trạng lâm sàng thực tế của khách hàng. Tất cả dịch vụ phẫu thuật hay điều trị công nghệ cao đều đi kèm chế độ bảo hành và chăm sóc hậu phẫu chu đáo.',
                'order' => 1,
            ],
            [
                'question' => 'Các công nghệ điều trị tại trung tâm có đạt chuẩn y khoa không?',
                'answer' => '100% máy móc và công nghệ tại KT Beauty Medical Centre đều được chứng nhận FDA (Hoa Kỳ) và CE (Châu Âu) về tính an toàn và hiệu quả, được chuyển giao chính hãng trực tiếp từ các tập đoàn y tế thẩm mỹ lớn.',
                'order' => 2,
            ],
            [
                'question' => 'Chi phí các dịch vụ tại KT Beauty như thế nào?',
                'answer' => 'Chi phí được công khai rõ ràng trong quá trình tư vấn và không phát sinh thêm bất kỳ khoản phụ thu nào trong suốt liệu trình. Chúng tôi cũng thường xuyên có các chương trình ưu đãi tri ân và hỗ trợ trả góp 0% lãi suất.',
                'order' => 3,
            ],
            [
                'question' => 'Tôi cần lưu ý gì sau khi thực hiện dịch vụ?',
                'answer' => 'Sau mỗi dịch vụ, điều dưỡng viên sẽ hướng dẫn chi tiết chế độ ăn uống, sinh hoạt và vệ sinh vùng điều trị. Bạn cũng sẽ nhận được cẩm nang hướng dẫn chăm sóc tại nhà và lịch hẹn tái khám định kỳ miễn phí.',
                'order' => 4,
            ],
        ];

        foreach ($faqs as $faq) {
            \App\Models\Faq::updateOrCreate(
                ['question' => $faq['question']],
                [
                    'answer' => $faq['answer'],
                    'order' => $faq['order'],
                ]
            );
        }

        // 8. Seed Authors
        $authors = [
            [
                'name' => 'Bác Sĩ CKI Ngọc Nữ',
                'slug' => 'dr-ngoc-nu',
                'role' => 'Bác sĩ chuyên khoa I Da liễu',
                'bio' => 'Bác sĩ Ngọc Nữ có hơn 10 năm kinh nghiệm trong lĩnh vực trẻ hóa da và thẩm mỹ nội khoa.',
                'description' => 'Bác sĩ Chuyên khoa I Ngọc Nữ tốt nghiệp Đại học Y Dược TP.HCM, là chuyên gia hàng đầu về phác đồ cá nhân hóa trẻ hóa da bằng công nghệ cao tại Việt Nam.',
                'avatar' => '/images/Bs-Nga-Aurora-1.png',
            ],
            [
                'name' => 'Ths. Bác sĩ CKI Hoàng Nga',
                'slug' => 'dr-hoang-nga',
                'role' => 'Thạc sĩ - Bác sĩ Thẩm mỹ',
                'bio' => 'Bác sĩ Hoàng Nga chuyên sâu về tạo hình mí mắt và điêu khắc chân mày vi chạm.',
                'description' => 'Bác sĩ Hoàng Nga sở hữu nhiều chứng chỉ đào tạo thẩm mỹ quốc tế tại Hàn Quốc, Pháp và là thành viên hội phẫu thuật thẩm mỹ châu Á.',
                'avatar' => '/images/Anh-dai-dien-BS-Nga-Aurora-1.png',
            ],
        ];

        foreach ($authors as $auth) {
            \App\Models\Author::updateOrCreate(
                ['slug' => $auth['slug']],
                $auth
            );
        }

        // Link existing articles to seeded authors
        $authorNu = \App\Models\Author::where('slug', 'dr-ngoc-nu')->first();
        if ($authorNu) {
            Article::where('legacy_author', 'like', '%Ngọc Nữ%')->update(['author_id' => $authorNu->id]);
        }

        // 9. Seed Doctor Shifts
        $docNu = \App\Models\Doctor::where('name', 'like', '%Ngọc Nữ%')->first();
        if ($docNu) {
            \App\Models\DoctorShift::updateOrCreate(
                ['doctor_id' => $docNu->id, 'day_of_week' => 1],
                ['start_time' => '08:30', 'end_time' => '17:30', 'branch' => 'KT Beauty - Sài Gòn']
            );
            \App\Models\DoctorShift::updateOrCreate(
                ['doctor_id' => $docNu->id, 'day_of_week' => 3],
                ['start_time' => '08:30', 'end_time' => '17:30', 'branch' => 'KT Beauty - Sài Gòn']
            );
            \App\Models\DoctorShift::updateOrCreate(
                ['doctor_id' => $docNu->id, 'day_of_week' => 5],
                ['start_time' => '08:30', 'end_time' => '17:30', 'branch' => 'KT Beauty - Sài Gòn']
            );
        }

        $docTrinh = \App\Models\Doctor::where('name', 'like', '%Việt Trinh%')->first();
        if ($docTrinh) {
            \App\Models\DoctorShift::updateOrCreate(
                ['doctor_id' => $docTrinh->id, 'day_of_week' => 2],
                ['start_time' => '08:30', 'end_time' => '17:30', 'branch' => 'KT Beauty - Sài Gòn']
            );
            \App\Models\DoctorShift::updateOrCreate(
                ['doctor_id' => $docTrinh->id, 'day_of_week' => 4],
                ['start_time' => '08:30', 'end_time' => '17:30', 'branch' => 'KT Beauty - Sài Gòn']
        }
    }
}
