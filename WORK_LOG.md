# Nhật Ký Triển Khai Dự Án (Work Log) – Website Đào Tạo Spa TheQ

> **Mục đích:** Lưu vết toàn bộ lịch sử làm việc của 3 thành viên theo kế hoạch chuẩn mới. Dữ liệu trong file này dùng để tổng hợp và xuất **01 File PDF Báo Cáo Kỹ Thuật** cuối kỳ.

## 1. Danh Sách Thành Viên & Phân Công Vai Trò (Tối Ưu Vấn Đáp Online)

| STT | Họ và Tên | Chức vụ | Vai trò phụ trách theo Đề bài | Nhiệm vụ cốt lõi & Phối hợp bảo vệ |
| :--- | :--- | :--- | :--- | :--- |
| 01 | **Nguyễn Lâm Minh Thư** | Nhóm Trưởng | **Keyword & On-page Specialist** | Quản lý tiến độ chung; nghiên cứu **30 từ khóa ngách** theo Search Intent; lập cấu trúc web & **Content Plan 10 bài**; tối ưu On-page (`Title`, `Meta`, `H1-H2`, `Alt ảnh`, `Internal link`). |
| 02 | **Lê Văn** | Thành Viên | **Off-page & Data Analyst** | Tạo bộ **6 Social Entity** đồng bộ NAP; đi **10 Backlink thực tế** từ nguồn miễn phí hợp lệ; đối chiếu số liệu GSC/GA4 sau 2 tuần và tổng hợp **01 file PDF** báo cáo chung. |
| 03 | **Lê Duy Khanh** | Thành Viên | **Technical & Analytics Lead** | **Gánh toàn bộ kỹ thuật khó:** Quản trị code/CMS `D:\git\bed-theqweb`, hosting, tên miền; cấu hình `/sitemap.xml` & `/robots.txt`; gắn mã **GSC/GA4**, cấp quyền `Viewer` cho giảng viên, chụp 5 ảnh Baseline Tuần 0 & hỗ trợ trích xuất số liệu. |

---

## 2. Bảng Tóm Tắt Tiến Độ Theo Kế Hoạch Mới

| Buổi | Ngày & Giờ | Giai đoạn | Người thực hiện | Tóm tắt hạng mục đã hoàn thành | File / Minh chứng |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **#01** | `2026-10-23 17:50` | Giai đoạn 1 | Minh Thư, Lê Văn, Duy Khanh | Rà soát toàn diện theo chuẩn Chuyên viên SEO, cập nhật phân công 3 thành viên, chuẩn hóa bảng 30 từ khóa + Content Plan 10 bài và đồng bộ giao diện/SEO Website `bed-theqweb`. | `PROJECT_PLAN.md`, `docs/seo-plan/*.md`, `routes/web.php`, `TinTuc.tsx`, `Footer.tsx` |
| **#02-P1** | `2026-11-03 19:37` | Giai đoạn 1 | Minh Thư, Lê Văn, Duy Khanh | **Phần việc 1:** Đối chiếu Đề bài PDF gốc và chuẩn hóa lại `PROJECT_PLAN.md` theo đúng khung 5 Phần báo cáo (`Bảng 1.1` → `Bảng 5.2`), mốc đo lường Baseline Tuần 1 – Kết quả Tuần 3 và quy chuẩn định dạng `Lop_Nhom_XX.pdf` (Times New Roman 13, giãn dòng 1.15, lề 2.0cm). | `PROJECT_PLAN.md` |
| **#02-P2** | `2026-11-03 19:44` | Giai đoạn 2 | Minh Thư, Duy Khanh | **Phần việc 2:** Xây dựng `SpaSeoArticlesSeeder.php` và tích hợp vào `DatabaseSeeder.php`: đồng bộ chuẩn NAP trong bảng `settings`, khởi tạo hồ sơ Tác giả E-E-A-T và nạp trọn bộ 10 bài viết Đào tạo Spa chuẩn SEO On-page (để `image => null` theo yêu cầu để người dùng tự upload ảnh sau, giữ sẵn `image_alt`, `focus_keyword`, `meta_title`, `meta_description`, `H2/H3`, `Internal Link`). | `database/seeders/SpaSeoArticlesSeeder.php`, `database/seeders/DatabaseSeeder.php` |
| **#02-P3** | `2026-11-03 19:48` | Giai đoạn 4 | Minh Thư, Lê Văn, Duy Khanh | **Phần việc 3:** Tạo mới tài liệu `docs/seo-plan/bao-cao-cac-bang-ky-thuat.md` tổng hợp đầy đủ Trang 2 (Bảng phân công & `% đóng góp` + chữ ký) và các bảng kỹ thuật (`Bảng 1.1`, `1.2`, `3.1` Audit On-page Trước/Sau tối ưu, `Bảng 3.2` 10 Backlink, khung `Bảng 4.1, 4.2, 5.1, 5.2` kèm phân tích & đề xuất giải pháp) khớp 100% với Đề bài PDF. | `docs/seo-plan/bao-cao-cac-bang-ky-thuat.md`, `PROJECT_PLAN.md` |
| **#03-PA** | `2026-11-03 19:59` | Giai đoạn 1 | Lê Duy Khanh | **Phần việc A:** Chuyển `/robots.txt` sang route động trong `routes/web.php` tự động kết xuất Full URL `Sitemap: https://<domain>/sitemap.xml` theo tên miền thật và xóa file tĩnh `public/robots.txt`. | `routes/web.php` |
| **#03-PB** | `2026-11-03 20:01` | Giai đoạn 2 | Lê Văn | **Phần việc B:** Biên soạn tài liệu `docs/seo-plan/giai-doan-2-noi-dung-backlink-entity.md` chứa sẵn hồ sơ NAP chuẩn hóa cho 6 kênh Social Entity và 10 bài viết ngắn (Spin độc lập, gắn sẵn Anchor Text + URL đích) để Copy & Paste lên 10 nền tảng Web 2.0 miễn phí. | `docs/seo-plan/giai-doan-2-noi-dung-backlink-entity.md` |
| **#03-PC** | `2026-11-03 20:09` | Giai đoạn 4 | Minh Thư, Lê Văn, Duy Khanh | **Phần việc C:** Tổng hợp toàn bộ dữ liệu dự án, lịch sử `WORK_LOG.md` và hệ thống `Bảng 1.1 → Bảng 5.2` kết xuất thành file Word hoàn chỉnh `docs/seo-plan/Lop_Nhom_XX_Bao_Cao_SEO_TheQ.docx` chuẩn định dạng Đề bài (Font Times New Roman 13pt, giãn dòng 1.15, căn lề 4 cạnh 2.0cm, Trang bìa độc lập + Trang 2 + 5 Phần). | `docs/seo-plan/Lop_Nhom_XX_Bao_Cao_SEO_TheQ.docx`, `PROJECT_PLAN.md` |

---

## 3. Nhật Ký Chi Tiết Phiên Làm Việc

### 📅 Ngày 2026-10-23 (17:45 – 17:55) | Giai đoạn 1: Tái Cấu Trúc Kế Hoạch SEO & Chuẩn Hóa Website Đào Tạo Spa TheQ
- **Người thực hiện:** Nguyễn Lâm Minh Thư (Nhóm Trưởng), Lê Văn, Lê Duy Khanh.
- **Công việc đã hoàn thành:**
  1. **Cập nhật Kế hoạch & Phân công (`PROJECT_PLAN.md`):** Phân bổ vai trò phù hợp năng lực vấn đáp (Duy Khanh nắm toàn bộ phần kỹ thuật code/hosting/GSC-GA4; Minh Thư nắm bộ 30 từ khóa & On-page; Lê Văn nắm 6 Social Entity, 10 Backlink Web 2.0 & tổng hợp PDF) kèm kịch bản trả lời giảng viên.
  2. **Chuẩn hóa 30 Từ khóa & Content Plan 10 bài (`docs/seo-plan/`):** Bổ sung cột Search Volume tham khảo, xóa bỏ lỗi trỏ từ khóa Transactional vào URL tham số `?category=`, cân đối lại 10 bài viết vào 4 chuyên mục Đào tạo Spa và quy định rõ `Alt ảnh` + `Anchor Text` cho từng Internal Link.
  3. **Tối ưu & Đồng bộ Website (`D:\git\bed-theqweb`):** Bổ sung SSR Meta (`title`, `description`, `canonical`) cho trang chủ `/` và `/tin-tuc` trong `routes/web.php`; đồng bộ thương hiệu **Học Viện Đào Tạo Spa & Thẩm Mỹ Quốc Tế TheQ** và 4 chuyên mục đào tạo trên `TinTuc.tsx`, `TinTucDetail.tsx`, `Footer.tsx`, `BlogHeaderAndCategoriesEditor.tsx`, `FooterSettingsEditor.tsx` và CSDL.
- **Việc tiếp theo (Giai đoạn 2):** Biên soạn nội dung chi tiết 10 bài viết chuẩn SEO On-page nạp vào CSDL, deploy lên tên miền công khai, gắn mã GSC/GA4 thực tế và chụp 5 ảnh Baseline Tuần 0.

### 📅 Ngày 2026-11-03 (19:37) | Phần việc 1 (Giai đoạn 1): Chuẩn Hóa Kế Hoạch Đồ Án Khớp 100% Đề Bài PDF
- **Vai trò phụ trách:** Nguyễn Lâm Minh Thư (Nhóm Trưởng), Lê Văn (Off-page & Data Analyst), Lê Duy Khanh (Technical Lead).
- **Nội dung công việc đã hoàn thành:**
  1. Cập nhật Mục 4 & Mục 5.1 trong `PROJECT_PLAN.md` khớp hoàn toàn với yêu cầu Đề bài PDF: bổ sung Trang bìa độc lập, Trang 2 (Bảng phân công, `% đóng góp`, chữ ký xác nhận 3 thành viên) và 5 Phần nội dung kỹ thuật theo đúng mã biểu mẫu thực hành (`Bảng 1.1`, `1.2`, `2.1`, `2.2`, `2.3`, `3.1`, `3.2`, `4.1`, `4.2`, `5.1`, `5.2`).
  2. Đồng bộ mốc thời gian đo lường thành **Baseline Tuần 1** và **Kết quả Tuần 3**, kèm quy chuẩn trình bày (Times New Roman 13, giãn dòng 1.15, lề 2.0cm, tên file `Lop_Nhom_XX.pdf`) và lưu ý để người dùng tự nhập liệu ảnh bài viết.
- **File minh chứng:** `D:\git\bed-theqweb\PROJECT_PLAN.md`.

### 📅 Ngày 2026-11-03 (19:44) | Phần việc 2 (Giai đoạn 2): Xây Dựng Seeder 10 Bài Viết Chuẩn SEO Đào Tạo Spa & Đồng Bộ NAP
- **Vai trò phụ trách:** Nguyễn Lâm Minh Thư (Keyword & On-page Specialist), Lê Duy Khanh (Technical & Analytics Lead).
- **Nội dung công việc đã hoàn thành:**
  1. Tạo mới `database/seeders/SpaSeoArticlesSeeder.php` và tích hợp vào cuối `database/seeders/DatabaseSeeder.php`: tự động ghi đè cấu hình NAP chuẩn (`386-388 Đường 3/2, Phường 12, Quận 10, TP.HCM - 1900 5006 - contact@theq.vn`) và 4 chuyên mục đào tạo Spa vào bảng `settings`.
  2. Khởi tạo hồ sơ Tác giả E-E-A-T (`ThS. Nguyễn Lâm Minh Thư - Giám Đốc Đào Tạo Học Viện Thẩm Mỹ TheQ`) tại `/tac-gia/master-minh-thu-theq`.
  3. Biên soạn và nạp 10 bài viết chuẩn SEO On-page khớp 100% với `docs/seo-plan/giai-doan-1-content-plan.md`: có đủ `focus_keyword`, `meta_title` (56–59 ký tự), `meta_description` (149–155 ký tự), cấu trúc `H2/H3` tự sinh TOC, `Internal Link` chéo đúng Anchor Text, điền sẵn `image_alt` chuẩn SEO và để `image => null` để quản trị viên tự tải ảnh thực tế lên sau.
- **File minh chứng:** `D:\git\bed-theqweb\database\seeders\SpaSeoArticlesSeeder.php`, `D:\git\bed-theqweb\database\seeders\DatabaseSeeder.php`.

### 📅 Ngày 2026-11-03 (19:48) | Phần việc 3 (Giai đoạn 4): Biên Soạn Bộ Bảng Biểu Kỹ Thuật Xuất Báo Cáo PDF (`Bảng 1.1` → `Bảng 5.2`)
- **Vai trò phụ trách:** Lê Văn (Off-page & Data Analyst), Nguyễn Lâm Minh Thư (On-page Specialist), Lê Duy Khanh (Technical Lead).
- **Nội dung công việc đã hoàn thành:**
  1. Tạo mới `docs/seo-plan/bao-cao-cac-bang-ky-thuat.md` chứa sẵn toàn bộ khung biểu mẫu bắt buộc của Đề bài PDF: Trang 2 (Bảng phân công nhiệm vụ, tỷ lệ `%` đóng góp & cột chữ ký xác nhận của 3 thành viên), `Bảng 1.1` (So sánh nền tảng CMS), `Bảng 1.2` (Thông tin kỹ thuật web triển khai), `Bảng 3.1` (Audit On-page Trước và Sau tối ưu cho 10 bài), `Bảng 3.2` (Danh sách 6 Social Entity & 10 URL Backlink miễn phí hợp lệ).
  2. Thiết lập sẵn khung đối chiếu số liệu `Bảng 4.1, 4.2` (Baseline Tuần 1) và `Bảng 5.1, 5.2` (Kết quả Tuần 3 trên GSC & GA4) kèm mục Phân tích nguyên nhân và Đề xuất giải pháp cải tiến giúp nhóm đạt trọn 3.0 điểm phần Đo lường & 1.0 điểm trình bày Báo cáo.
- **File minh chứng:** `D:\git\bed-theqweb\docs/seo-plan/bao-cao-cac-bang-ky-thuat.md`, `D:\git\bed-theqweb\PROJECT_PLAN.md`.

### 📅 Ngày 2026-11-03 (19:59) | Phần việc A (Giai đoạn 1): Tối Ưu Route Động `/robots.txt` Chuẩn Google Search Console
- **Vai trò phụ trách:** Lê Duy Khanh (Technical & Analytics Lead).
- **Nội dung công việc đã hoàn thành:**
  1. Bổ sung route động `GET /robots.txt` tại `routes/web.php` tự động lấy `url('/sitemap.xml')` theo `APP_URL` / tên miền thực tế để trả về dòng `Sitemap: https://<domain>/sitemap.xml` chuẩn tuyệt đối theo khuyến nghị của Googlebot.
  2. Xóa tệp tĩnh `public/robots.txt` (vốn chỉ chứa đường dẫn tương đối `/sitemap.xml`) để Laravel xử lý hoàn toàn động.
- **File minh chứng:** `D:\git\bed-theqweb\routes\web.php`.

### 📅 Ngày 2026-11-03 (20:01) | Phần việc B (Giai đoạn 2): Soạn Trọn Bộ Nội Dung Copy-Paste 6 Social Entity & 10 Bài Backlink Web 2.0
- **Vai trò phụ trách:** Lê Văn (Off-page & Data Analyst).
- **Nội dung công việc đã hoàn thành:**
  1. Tạo mới `docs/seo-plan/giai-doan-2-noi-dung-backlink-entity.md` chuẩn hóa bộ hồ sơ NAP đồng nhất 100% cho 6 kênh Social Entity (Facebook, Pinterest, Medium, Tumblr, LinkedIn, About.me).
  2. Biên soạn sẵn 10 bài viết ngắn (Spin độc lập, không trùng lặp văn bản gốc) đã gắn sẵn đúng 10 cặp Anchor Text và URL đích (`/`, `/tin-tuc/{slug}`) tương ứng với 10 nền tảng Web 2.0 miễn phí trong `Bảng 3.2`.
- **File minh chứng:** `D:\git\bed-theqweb\docs\seo-plan\giai-doan-2-noi-dung-backlink-entity.md`.

### 📅 Ngày 2026-11-03 (20:09) | Phần việc C (Giai đoạn 4): Tổng Hợp & Xuất File Word Báo Cáo Kỹ Thuật (`Lop_Nhom_XX_Bao_Cao_SEO_TheQ.docx`)
- **Vai trò phụ trách:** Lê Văn (Tổng hợp Báo cáo), Nguyễn Lâm Minh Thư (Nhóm Trưởng), Lê Duy Khanh (Technical Lead).
- **Nội dung công việc đã hoàn thành:**
  1. Kết xuất toàn bộ nội dung báo cáo kỹ thuật của cả 3 thành viên (Trang bìa độc lập + Trang 2 Bảng phân công & `% đóng góp` + Phần 1 `Bảng 1.1–1.2` + Phần 2 `Bảng 2.1–2.3` + Phần 3 `Bảng 3.1–3.2` + Phần 4 `Bảng 4.1–5.2` + Phần 5 Phụ lục & Nhật ký `WORK_LOG.md`) thành file Word `docs/seo-plan/Lop_Nhom_XX_Bao_Cao_SEO_TheQ.docx`.
  2. Định dạng chuẩn 100% theo yêu cầu trình bày của Đề bài PDF: khổ giấy A4, Font **Times New Roman cỡ 13pt**, **khoảng cách dòng 1.15**, **lề Trái – Phải – Trên – Dưới đều 2.0cm**.
- **File minh chứng:** `D:\git\bed-theqweb\docs\seo-plan\Lop_Nhom_XX_Bao_Cao_SEO_TheQ.docx`.
