# Giai Đoạn 1: Định Vị Thương Hiệu (NAP), Cấu Trúc Website & Bộ 30 Từ Khóa Ngách

## 1. Thông Tin Thương Hiệu Chuẩn Hóa (NAP - Đồng Bộ On-page & Social Entity)
Thông tin dưới đây được cài đặt đồng nhất tại Footer của website `bed-theqweb` và toàn bộ tài khoản Social Entity ở Giai đoạn 2:

- **Tên thương hiệu (Name):** Học Viện Đào Tạo Spa & Thẩm Mỹ Quốc Tế TheQ (TheQ Spa Academy)
- **Địa chỉ (Address):** 386-388 Đường 3/2, Phường 12, Quận 10, TP. Hồ Chí Minh
- **Số điện thoại (Phone/Hotline):** 1900 5006
- **Email liên hệ:** contact@theq.vn
- **Mô tả ngắn (Bio 160 ký tự):** Học Viện Đào Tạo Spa & Thẩm Mỹ TheQ chuyên đào tạo nghề Chăm sóc da, Phun xăm thẩm mỹ, Massage trị liệu và Quản lý Spa chuẩn y khoa, cam kết 100% việc làm.

---

## 2. Sơ Đồ Cấu Trúc Website (Site Architecture trên `bed-theqweb`)
Website vận hành theo mô hình **Flat Topic Cluster (Cấu trúc phẳng tối đa 2 cấp click từ trang chủ)** giúp Googlebot thu thập dữ liệu và lập chỉ mục nhanh nhất trong 14 ngày:

- **Trang chủ (`/`) & Chuyên trang Cẩm nang (`/tin-tuc`):**
  - Hiển thị bài viết tiêu điểm (Featured Post), bộ lọc theo 4 chuyên mục đào tạo cốt lõi và thanh tìm kiếm nội bộ.
- **4 Chuyên mục Đào tạo Trụ cột (Categories lọc tại `/?category=...`):**
  1. `Đào tạo Chăm sóc da` (Basic & Advanced Facial)
  2. `Đào tạo Massage Trị liệu` (Body & Cổ vai gáy)
  3. `Đào tạo Phun xăm thẩm mỹ` (Công nghệ vi chạm hiện đại)
  4. `Kinh nghiệm & Quản lý Spa` (Mở tiệm, chứng chỉ hành nghề, lộ trình nghề)
- **Hệ thống Bài viết Chuẩn SEO On-page (`/tin-tuc/{slug}`):**
  - Mỗi bài có duy nhất 1 thẻ `<h1>`, tự động sinh Mục lục (TOC) từ `<h2>`/`<h3>`, tự sinh Schema JSON-LD (`BlogPosting` + `BreadcrumbList`), liên kết tới trang Tác giả E-E-A-T (`/tac-gia/{slug}`).
- **Tệp kỹ thuật cho Bot tìm kiếm:**
  - Sitemap động: `/sitemap.xml` (tự động cập nhật `<lastmod>`, `<changefreq>`, `<priority>`).
  - Robots: `/robots.txt` (cho phép `User-agent: *`, chặn `/admin`, `/dashboard`, khai báo `/sitemap.xml`).

---

## 3. Bảng Nghiên Cứu 30 Từ Khóa Ngách Ngành Đào Tạo Spa (Theo Search Intent)
- **Phương pháp & Công cụ nghiên cứu (Phụ trách: Nguyễn Lâm Minh Thư):** Kết hợp **Google Keyword Planner**, **Google Suggest (Autocomplete)** và **People Also Ask** để lọc ra 30 từ khóa đuôi dài (6–10 chữ) có lượng tìm kiếm ổn định (70–720 lượt/tháng) nhưng độ cạnh tranh thấp, phù hợp để lên Top và ghi nhận Impressions/Clicks trong 14 ngày.

### 3.1. Nhóm Informational – Tìm Kiếm Thông Tin (15 Từ Khóa)
Nhóm từ khóa giải đáp thắc mắc về học phí, thời gian, điều kiện và kỹ thuật nghề cho người mới bắt đầu:

| STT | Từ khóa ngách (Long-tail Keyword) | Search Intent | Volume/tháng | Độ khó (KD) | Trang đích / Bài viết dự kiến (URL chuẩn SEO) |
| :-- | :--- | :--- | :--- | :--- | :--- |
| 1 | `học nghề spa mất bao lâu ra nghề` | Informational | 590 | Thấp | Bài 1: `/tin-tuc/hoc-nghe-spa-mat-bao-lau-ra-nghe` |
| 2 | `khóa học spa cấp tốc bao nhiêu tháng` | Informational | 210 | Thấp | Bài 1: `/tin-tuc/hoc-nghe-spa-mat-bao-lau-ra-nghe` (H2) |
| 3 | `học phí học nghề spa trọn gói bao nhiêu tiền` | Informational | 720 | Thấp | Bài 2: `/tin-tuc/hoc-phi-hoc-nghe-spa-tron-goi` |
| 4 | `chi phí học chăm sóc da cơ bản đến nâng cao` | Informational | 320 | Thấp | Bài 2: `/tin-tuc/hoc-phi-hoc-nghe-spa-tron-goi` (H2) |
| 5 | `học nghề spa cho người mới bắt đầu từ đâu` | Informational | 480 | Thấp | Bài 3: `/tin-tuc/lo-trinh-hoc-nghe-spa-cho-nguoi-moi` |
| 6 | `lộ trình học kỹ thuật viên spa chuyên nghiệp` | Informational | 260 | Thấp | Bài 3: `/tin-tuc/lo-trinh-hoc-nghe-spa-cho-nguoi-moi` (H2) |
| 7 | `mở spa cần bằng cấp và chứng chỉ gì` | Informational | 390 | Thấp | Bài 4: `/tin-tuc/mo-spa-can-bang-cap-chung-chi-gi` |
| 8 | `chứng chỉ hành nghề chăm sóc da sở lao động` | Informational | 210 | Thấp | Bài 4: `/tin-tuc/mo-spa-can-bang-cap-chung-chi-gi` (H2) |
| 9 | `học nghề spa có cần bằng cấp 3 không` | Informational | 320 | Rất thấp | Bài 5: `/tin-tuc/hoc-nghe-spa-co-can-bang-cap-3-khong` |
| 10 | `độ tuổi phù hợp để học nghề thẩm mỹ spa` | Informational | 140 | Rất thấp | Bài 5: `/tin-tuc/hoc-nghe-spa-co-can-bang-cap-3-khong` (H2) |
| 11 | `học nghề spa có tương lai không` | Informational | 480 | Thấp | Bài 6: `/tin-tuc/hoc-nghe-spa-co-tuong-lai-khong` |
| 12 | `mức lương kỹ thuật viên spa mới ra trường` | Informational | 390 | Thấp | Bài 6: `/tin-tuc/hoc-nghe-spa-co-tuong-lai-khong` (H2) |
| 13 | `kỹ thuật massage cổ vai gáy trị liệu chuẩn y khoa` | Informational | 260 | Thấp | Bài 7: `/tin-tuc/ky-thuat-massage-co-vai-gay-tri-lieu` |
| 14 | `quy trình bấm huyệt giải cơ cổ vai gáy` | Informational | 170 | Rất thấp | Bài 7: `/tin-tuc/ky-thuat-massage-co-vai-gay-tri-lieu` (H2) |
| 15 | `quy trình chăm sóc da mặt chuyên sâu 12 bước tại spa` | Informational | 210 | Rất thấp | Bài 3: `/tin-tuc/lo-trinh-hoc-nghe-spa-cho-nguoi-moi` (H2) |

### 3.2. Nhóm Commercial Investigation – So Sánh & Đánh Giá (8 Từ Khóa)
Nhóm từ khóa dành cho học viên đang cân nhắc chọn ngành học hoặc chọn học viện đào tạo uy tín:

| STT | Từ khóa ngách (Long-tail Keyword) | Search Intent | Volume/tháng | Độ khó (KD) | Trang đích / Bài viết dự kiến (URL chuẩn SEO) |
| :-- | :--- | :--- | :--- | :--- | :--- |
| 16 | `nên học nghề spa hay phun xăm thẩm mỹ` | Commercial | 390 | Thấp | Bài 8: `/tin-tuc/nen-hoc-nghe-spa-hay-phun-xam` |
| 17 | `so sánh thu nhập nghề spa và nghề phun xăm` | Commercial | 170 | Rất thấp | Bài 8: `/tin-tuc/nen-hoc-nghe-spa-hay-phun-xam` (H2) |
| 18 | `kinh nghiệm chọn trung tâm đào tạo spa uy tín tphcm` | Commercial | 320 | Thấp | Bài 9: `/tin-tuc/kinh-nghiem-chon-trung-tam-dao-tao-spa-uy-tin` |
| 19 | `học nghề spa ở đâu tốt nhất tại tphcm` | Commercial | 480 | Trung bình | Bài 9: `/tin-tuc/kinh-nghiem-chon-trung-tam-dao-tao-spa-uy-tin` (H2) |
| 20 | `tiêu chí đánh giá học viện đào tạo thẩm mỹ chuẩn y khoa` | Commercial | 110 | Rất thấp | Bài 9: `/tin-tuc/kinh-nghiem-chon-trung-tam-dao-tao-spa-uy-tin` (H3) |
| 21 | `nên học nghề spa ở trung tâm hay vừa học vừa làm` | Commercial | 140 | Rất thấp | Bài 6: `/tin-tuc/hoc-nghe-spa-co-tuong-lai-khong` (H2) |
| 22 | `review khóa học quản lý vận hành spa thực chiến` | Commercial | 90 | Rất thấp | Bài 10: `/tin-tuc/khoa-hoc-quan-ly-va-mo-spa-thuc-chien` (H2) |
| 23 | `so sánh khóa học chăm sóc da cơ bản và chuyên sâu` | Commercial | 110 | Rất thấp | Bài 2: `/tin-tuc/hoc-phi-hoc-nghe-spa-tron-goi` (H3) |

### 3.3. Nhóm Transactional – Chuyển Đổi & Đăng Ký Khóa Học (7 Từ Khóa)
Nhóm từ khóa mang ý định đăng ký học trực tiếp tại Học viện TheQ (100% trỏ về URL tĩnh nằm trong `/sitemap.xml`):

| STT | Từ khóa ngách (Long-tail Keyword) | Search Intent | Volume/tháng | Độ khó (KD) | Trang đích / Bài viết dự kiến (URL chuẩn SEO) |
| :-- | :--- | :--- | :--- | :--- | :--- |
| 24 | `khóa học quản lý và mở spa thực chiến tại tphcm` | Transactional | 210 | Thấp | Bài 10: `/tin-tuc/khoa-hoc-quan-ly-va-mo-spa-thuc-chien` |
| 25 | `khóa học chăm sóc da chuyên sâu chuẩn y khoa` | Transactional | 260 | Thấp | Bài 3: `/tin-tuc/lo-trinh-hoc-nghe-spa-cho-nguoi-moi` (Pillar) |
| 26 | `khóa học massage body trị liệu cổ vai gáy cấp tốc` | Transactional | 170 | Rất thấp | Bài 7: `/tin-tuc/ky-thuat-massage-co-vai-gay-tri-lieu` (Pillar) |
| 27 | `khóa học phun xăm thẩm mỹ công nghệ mới bao ra nghề` | Transactional | 210 | Thấp | Bài 8: `/tin-tuc/nen-hoc-nghe-spa-hay-phun-xam` (Pillar) |
| 28 | `đăng ký học nghề spa cam kết việc làm tại tphcm` | Transactional | 140 | Thấp | Trang chủ `/` & Bài 9: `/tin-tuc/kinh-nghiem-chon-trung-tam-dao-tao-spa-uy-tin` |
| 29 | `tuyển sinh khóa học kỹ thuật viên spa chuyên nghiệp` | Transactional | 110 | Rất thấp | Trang chủ `/` & Bài 1: `/tin-tuc/hoc-nghe-spa-mat-bao-lau-ra-nghe` |
| 30 | `ưu đãi học phí khóa học spa trọn gói tại theq` | Transactional | 70 | Rất thấp | Bài 2: `/tin-tuc/hoc-phi-hoc-nghe-spa-tron-goi` (Branded Keyword) |
