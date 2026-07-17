<?php
$file = __DIR__ . '/database/seeders/DatabaseSeeder.php';
$content = file_get_contents($file);

// Find the start of the services array
$startMarker = '        // 3. Seed Services (Services Catalog)';
$endMarker = '        // 4. Seed Banners';

$startPos = strpos($content, $startMarker);
$endPos = strpos($content, $endMarker);

if ($startPos === false || $endPos === false) {
    die("Error: Could not find services array bounds!\n");
}

$newServicesCode = '        // 3. Seed Services (Services Catalog)
        $services = [
            [
                \'name\' => \'Cắt mí Double Eyeluxe\',
                \'category\' => \'Phẫu thuật thẩm mỹ\',
                \'price\' => \'Liên hệ\',
                \'description\' => \'Kiến tạo nếp mí đôi sâu dài tự nhiên, loại bỏ bọng mỡ thừa và da chùng tối ưu.\',
                \'image\' => \'/images/EyeLuxe.jpg\',
                \'is_highlight\' => true,
                \'pillars\' => [
                    [
                        \'title\' => \'Đo vẽ tỷ lệ nếp mí\',
                        \'desc\' => \'Đo vẽ chính xác độ cao nếp mí phù hợp và hài hòa nhất với cấu trúc mắt khách hàng.\',
                        \'img\' => \'/images/white-placeholder.png\',
                    ],
                    [
                        \'title\' => \'Gây tê và can thiệp nhẹ\',
                        \'desc\' => \'Thực hiện bóc tách lấy bọng mỡ thừa và căng da chùng ở mí mắt trên.\',
                        \'img\' => \'/images/white-placeholder.png\',
                    ],
                    [
                        \'title\' => \'Khâu đóng thẩm mỹ\',
                        \'desc\' => \'Khâu khéo léo bằng chỉ thẩm mỹ chuyên dụng nhập khẩu không để lại sẹo xấu.\',
                        \'img\' => \'/images/white-placeholder.png\',
                    ],
                    [
                        \'title\' => \'Chăm sóc hậu phẫu\',
                        \'desc\' => \'Chiếu tia giảm sưng nề và hướng dẫn chế độ ăn uống, vệ sinh tại nhà chi tiết.\',
                        \'img\' => \'/images/white-placeholder.png\',
                    ]
                ],
                \'reviews\' => [
                    \'/images/white-placeholder.png\',
                ],
                \'before_after\' => [
                    [
                        \'title\' => \'Khách hàng H.T.M\',
                        \'before\' => \'/images/white-placeholder.png\',
                        \'after\' => \'/images/white-placeholder.png\',
                        \'desc\' => \'Tạo nếp mí đôi sâu rõ tự nhiên, trẻ hóa đôi mắt toàn diện sau 1 tháng.\',
                    ]
                ]
            ],
            [
                \'name\' => \'Nâng mũi cấu trúc Gold-Line\',
                \'category\' => \'Phẫu thuật thẩm mỹ\',
                \'price\' => \'Liên hệ\',
                \'description\' => \'Tái lập dáng mũi S-Line hoặc L-Line thanh tú, hài hòa với cấu trúc gương mặt Á Đông.\',
                \'image\' => \'/images/Phau-Thuat-Tham-My2x-1.png\',
                \'is_highlight\' => true,
                \'pillars\' => [
                    [
                        \'title\' => \'Tư vấn dáng mũi vàng\',
                        \'desc\' => \'Thiết kế dáng mũi S-Line hoặc L-Line phù hợp với nhân tướng học gương mặt.\',
                        \'img\' => \'/images/white-placeholder.png\',
                    ],
                    [
                        \'title\' => \'Tạo hình sụn tự thân\',
                        \'desc\' => \'Lấy sụn tai hoặc sụn vách ngăn để bọc đầu mũi, chống bóng đỏ lộ sóng sau này.\',
                        \'img\' => \'/images/white-placeholder.png\',
                    ],
                    [
                        \'title\' => \'Dựng trụ mũi cấu trúc\',
                        \'desc\' => \'Nâng cao sống mũi bằng sụn sinh học cao cấp nhập khẩu Hàn Quốc/Hoa Kỳ.\',
                        \'img\' => \'/images/white-placeholder.png\',
                    ],
                    [
                        \'title\' => \'Chăm sóc định hình\',
                        \'desc\' => \'Đeo nẹp cố định sống mũi và theo dõi lịch tái khám, cắt chỉ định kỳ.\',
                        \'img\' => \'/images/white-placeholder.png\',
                    ]
                ],
                \'reviews\' => [
                    \'/images/white-placeholder.png\',
                ],
                \'before_after\' => [
                    [
                        \'title\' => \'Khách hàng N.V.A\',
                        \'before\' => \'/images/white-placeholder.png\',
                        \'after\' => \'/images/white-placeholder.png\',
                        \'desc\' => \'Dáng mũi cao thanh tú, đầu mũi tròn mềm mại hài hòa gương mặt.\',
                    ]
                ]
            ],
            [
                \'name\' => \'Cấy tóc y khoa tự thân DHI\',
                \'category\' => \'Cấy tóc y khoa\',
                \'price\' => \'Liên hệ\',
                \'description\' => \'<p class="mb-4">Cấy tóc tự thân là phương pháp sử dụng chính nang tóc khỏe mạnh sau gáy của khách hàng để phục hồi các vùng tóc thưa, hói hoặc hạ đường chân tóc thiếu cân đối. Tại KT Beauty, mỗi nang tóc sau cấy được định hướng hài hòa và mọc theo hướng tự nhiên nhất.</p><p>Quy trình cấy tóc được thực hiện trong môi trường chuẩn y khoa với định hướng hạn chế xâm lấn tối thiểu, chú trọng độ chính xác cao trong quá trình tách lọc và cấy nang tóc.</p>\',
                \'image\' => \'/images/Hinh-web-3-1.png\',
                \'slug\' => \'cay-toc-y-khoa\',
                \'is_highlight\' => false,
                \'pillars\' => [
                    [
                        \'title\' => \'Thiết kế đường tóc cá nhân hóa\',
                        \'desc\' => \'Đường tóc được thiết kế riêng biệt dựa trên tỷ lệ trán, khuôn mặt, độ tuổi và hướng mọc tự nhiên giúp tạo cảm giác cân đối lâu dài.\',
                        \'img\' => \'/images/Hinh-web-3-1.png\',
                    ],
                    [
                        \'title\' => \'Phân tích nang tóc chuyên sâu\',
                        \'desc\' => \'Đánh giá chất lượng nang tóc và mật độ vùng hiến tóc nhằm tối ưu hóa tỷ lệ sinh trưởng và mật độ phân bổ sau cấy.\',
                        \'img\' => \'/images/Hinh-web-1-1.png\',
                    ],
                    [
                        \'title\' => \'Quy trình xử lý nang tóc chuẩn xác\',
                        \'desc\' => \'Nang tóc sau tách được bảo quản trong dung dịch nuôi dưỡng chuyên biệt dưới kính hiển vi điện tử độ phóng đại cao.\',
                        \'img\' => \'/images/Hinh-web-6-1.png\',
                    ],
                    [
                        \'title\' => \'Theo dõi phục hồi sau cấy\',
                        \'desc\' => \'Khách hàng được hướng dẫn chăm sóc chuyên biệt từng ngày và theo dõi sát sao tiến độ mọc tóc định kỳ 1-3-6-9-12 tháng.\',
                        \'img\' => \'/images/Hinh-web-8-1.png\',
                    ],
                    [
                        \'title\' => \'Đồng hành dài hạn\',
                        \'desc\' => \'Không gian phòng khám vô trùng riêng tư, chuyên nghiệp. KT Beauty cam kết đồng hành từ tư vấn tới hậu phẫu trọn đời.\',
                        \'img\' => \'/images/Hinh-web-9-1.png\',
                    ],
                ],
                \'reviews\' => [
                    \'/images/Review-cay-toc-DHI-3-1.png\',
                    \'/images/Review-cay-toc-DHI-5-1.png\',
                    \'/images/Review-cay-toc-DHI-2-1.png\',
                ],
                \'before_after\' => [
                    [
                        \'title\' => \'Khách hàng L.H.N\',
                        \'before\' => \'/images/before-LHN-1-1.png\',
                        \'after\' => \'/images/after-LHN-1-1.png\',
                        \'desc\' => \'Cấy tóc vùng trán hói chữ M, khôi phục đường tóc dày dặn nam tính sau 6 tháng.\',
                    ],
                    [
                        \'title\' => \'Khách hàng N.T.T\',
                        \'before\' => \'/images/before-NTT-1-1.png\',
                        \'after\' => \'/images/after-NTT-1-1.png\',
                        \'desc\' => \'Cải thiện mật độ tóc đỉnh đầu thưa rụng nhiều, nang tóc mọc dày ổn định.\',
                    ],
                    [
                        \'title\' => \'Khách hàng Nữ - Cấy hạ đường chân tóc\',
                        \'before\' => \'/images/before-custumor-1-1.png\',
                        \'after\' => \'/images/after-custumor-1-1.png\',
                        \'desc\' => \'Hạ đường chân tóc trán sân bay tạo tỷ lệ mặt thanh thoát mềm mại nữ tính.\',
                    ],
                ],
            ],
            [
                \'name\' => \'Cấy tinh chất Meso căng bóng\',
                \'category\' => \'Da liễu & Trẻ hóa\',
                \'price\' => \'Liên hệ\',
                \'description\' => \'Cung cấp trực tiếp các dưỡng chất, hyaluronic acid nuôi dưỡng làn da căng bóng mịn màng.\',
                \'image\' => \'/images/da-lieu-tham-my2x-1.png\',
                \'is_highlight\' => true,
                \'pillars\' => [
                    [
                        \'title\' => \'Làm sạch và ủ tê\',
                        \'desc\' => \'Làm sạch sâu da mặt, ủ tê giúp tạo sự thoải mái nhẹ nhàng nhất.\',
                        \'img\' => \'/images/white-placeholder.png\',
                    ],
                    [
                        \'title\' => \'Cấy tinh chất Meso vi điểm\',
                        \'desc\' => \'Cấy dưỡng chất HA, vitamin và peptide đều khắp các vùng da cần hồi sinh.\',
                        \'img\' => \'/images/white-placeholder.png\',
                    ],
                    [
                        \'title\' => \'Điện di làm dịu da\',
                        \'desc\' => \'Sử dụng đầu lạnh điện di giúp se khít lỗ chân lông, làm dịu da tức thì.\',
                        \'img\' => \'/images/white-placeholder.png\',
                    ],
                    [
                        \'title\' => \'Đắp mặt nạ tế bào gốc\',
                        \'desc\' => \'Khóa ẩm và tăng cường dưỡng chất nuôi dưỡng tế bào da từ sâu bên trong.\',
                        \'img\' => \'/images/white-placeholder.png\',
                    ]
                ],
                \'reviews\' => [
                    \'/images/white-placeholder.png\',
                ],
                \'before_after\' => [
                    [
                        \'title\' => \'Khách hàng T.T.L\',
                        \'before\' => \'/images/white-placeholder.png\',
                        \'after\' => \'/images/white-placeholder.png\',
                        \'desc\' => \'Làn da căng bóng mướt mịn, cải thiện đáng kể nếp nhăn li ti sau 3 buổi.\',
                    ]
                ]
            ],
            [
                \'name\' => \'Nâng cơ trẻ hóa Ultherapy\',
                \'category\' => \'Da liễu & Trẻ hóa\',
                \'price\' => \'Liên hệ\',
                \'description\' => \'Công nghệ nâng cơ không xâm lấn hàng đầu thế giới được FDA Hoa Kỳ chứng nhận.\',
                \'image\' => \'/images/web.png\',
                \'is_highlight\' => false,
                \'pillars' => [
                    [
                        \'title\' => \'Thiết kế vector nâng cơ\',
                        \'desc\' => \'Xác định các vùng cơ chùng nhão chảy xệ để đi năng lượng sóng siêu âm phù hợp.\',
                        \'img\' => \'/images/white-placeholder.png\',
                    ],
                    [
                        \'title\' => \'Tiến hành đi máy Ultherapy\',
                        \'desc\' => \'Tác động sâu vào lớp cân cơ nông SMAS 4.5mm giúp co thắt cơ nâng đỡ cấu trúc da.\',
                        \'img\' => \'/images/white-placeholder.png\',
                    ],
                    [
                        \'title\' => \'Dưỡng chất làm dịu bề mặt\',
                        \'desc\' => \'Thoa kem dưỡng ẩm dịu mát và bảo vệ bề mặt da ngay sau điều trị.\',
                        \'img\' => \'/images/white-placeholder.png\',
                    ]
                ],
                \'reviews\' => [
                    \'/images/white-placeholder.png\',
                ],
                \'before_after\' => [
                    [
                        \'title\' => \'Khách hàng L.T.H\',
                        \'before\' => \'/images/white-placeholder.png\',
                        \'after\' => \'/images/white-placeholder.png\',
                        \'desc\' => \'Nâng cao cung chân mày, thon gọn viền hàm rõ rệt sau 1 liệu trình.\',
                    ]
                ]
            ],
            [
                \'name\' => \'Tiêm Filler/Botox tạo hình\',
                \'category\' => \'Da liễu & Trẻ hóa\',
                \'price\' => \'Liên hệ\',
                \'description\' => \'Tái cấu trúc tỷ lệ gương mặt hài hòa tự nhiên với chất làm đầy chính hãng chất lượng cao.\',
                \'image\' => \'/images/white-placeholder.png\',
                \'is_highlight\' => false,
                \'pillars\' => [
                    [
                        \'title\' => \'Thăm khám và đo vẽ tỷ lệ vàng\',
                        \'desc\' => \'Bác sĩ kiểm tra cấu trúc cơ mặt và tư vấn liều lượng Filler/Botox chuẩn xác.\',
                        \'img\' => \'/images/white-placeholder.png\',
                    ],
                    [
                        \'title\' => \'Xác định điểm tiêm và ủ tê\',
                        \'desc\' => \'Ủ tê và sát khuẩn cẩn thận vùng điều trị để đảm bảo an toàn y khoa.\',
                        \'img\' => \'/images/white-placeholder.png\',
                    ],
                    [
                        \'title\' => \'Tiến hành đưa tinh chất\',
                        \'desc\' => \'Bác sĩ chuyên khoa trực tiếp tiêm tạo hình tỉ mỉ giúp lấp đầy hóp má, thái dương.\',
                        \'img\' => \'/images/white-placeholder.png\',
                    ]
                ],
                \'reviews\' => [
                    \'/images/white-placeholder.png\',
                ],
                \'before_after\' => [
                    [
                        \'title\' => \'Khách hàng M.P.Q\',
                        \'before\' => \'/images/white-placeholder.png\',
                        \'after\' => \'/images/white-placeholder.png\',
                        \'desc\' => \'Làm đầy thái dương hóp sâu, tạo cằm V-line tự nhiên quyến rũ.\',
                    ]
                ]
            ],
            [
                \'name\' => \'Điều trị nám Laser công nghệ cao\',
                \'category\' => \'Da liễu & Trẻ hóa\',
                \'price\' => \'Liên hệ\',
                \'description\' => \'Loại bỏ tận gốc các hắc sắc tố nám, tàn nhang sâu dưới da bằng Laser xung siêu ngắn.\',
                \'image\' => \'/images/white-placeholder.png\',
                \'is_highlight\' => false,
                \'pillars\' => [
                    [
                        \'title\' => \'Soi da phân tích sắc tố\',
                        \'desc\' => \'Xác định chính xác loại nám nông hay nám chân sâu để lên phác đồ điều trị.\',
                        \'img\' => \'/images/white-placeholder.png\',
                    ],
                    [
                        \'title\' => \'Bắn Laser trị liệu vi điểm\',
                        \'desc\' => \'Phát năng lượng laser chọn lọc nhằm phá hủy chân melanin không tổn thương mô lành.\',
                        \'img\' => \'/images/white-placeholder.png\',
                    ],
                    [
                        \'title\' => \'Cấp tinh chất phục hồi da\',
                        \'desc\' => \'Điện di tinh chất tế bào gốc làm dịu và kích thích tăng sinh da mới sáng mịn.\',
                        \'img\' => \'/images/white-placeholder.png\',
                    ]
                ],
                \'reviews\' => [
                    \'/images/white-placeholder.png\',
                ],
                \'before_after\' => [
                    [
                        \'title\' => \'Khách hàng K.O.N\',
                        \'before\' => \'/images/white-placeholder.png\',
                        \'after\' => \'/images/white-placeholder.png\',
                        \'desc\' => \'Mờ hơn 85% chân nám sâu cứng đầu, da căng mướt và đều màu.\',
                    ]
                ]
            ],
            [
                \'name\' => \'Điêu khắc lông mày Aurora\',
                \'category\' => \'Da liễu & Trẻ hóa\',
                \'price\' => \'Liên hệ\',
                \'description\' => \'Kiến tạo dáng mày phong thủy, sợi mày sắc nét chân thực bằng kỹ nghệ điêu khắc vi chạm.\',
                \'image\' => \'/images/white-placeholder.png\',
                \'is_highlight\' => false,
                \'pillars\' => [
                    [
                        \'title\' => \'Đo tỷ lệ và vẽ dáng mày\',
                        \'desc\' => \'Phác thảo dáng lông mày phù hợp với nhân tướng học gương mặt khách hàng.\',
                        \'img\' => \'/images/white-placeholder.png\',
                    ],
                    [
                        \'title' => 'Ủ tê và đi khắc sợi vi điểm',
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

        foreach ($services as $idx => $srv) {
            Service::updateOrCreate(
                [\'name\' => $srv[\'name\']],
                [
                    \'category\' => $srv[\'category\'],
                    \'price\' => $srv[\'price\'],
                    \'description\' => $srv[\'description\'],
                    \'image\' => $srv['image'],
                    \'slug\' => $srv[\'slug\'] ?? Str::slug($srv[\'name\']),
                    \'is_highlight\' => $srv[\'is_highlight\'],
                    \'pillars\' => $srv[\'pillars\'] ?? null,
                    \'reviews\' => $srv[\'reviews\'] ?? null,
                    \'before_after\' => $srv[\'before_after\'] ?? null,
                    \'order\' => $idx,
                ]
            );
        }

';

$patchedContent = substr($content, 0, $startPos) . $newServicesCode . substr($content, $endPos);

if (file_put_contents($file, $patchedContent)) {
    echo "DatabaseSeeder.php successfully patched with rich services data!\n";
} else {
    echo "Failed to write updated seeder file!\n";
}
