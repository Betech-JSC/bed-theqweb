# Giai Đoạn 1: Hướng Dẫn Cài Đặt GSC, GA4 & Chụp Baseline Tuần 0 Trên `bed-theqweb`

## 1. Cách Gắn Mã Google Search Console (GSC) & Google Analytics 4 (GA4) Vào Web TheQ

File giao diện gốc `resources/views/app.blade.php` của dự án `bed-theqweb` đã được tích hợp sẵn bộ đọc tự động 2 khóa cấu hình `gsc_verification` và `ga4_measurement_id` từ bảng `settings`.

### Bước 1.1: Lấy mã xác minh GSC và Measurement ID của GA4
1. **Trên Google Analytics 4 (`analytics.google.com`):**
   - Tạo Tài khoản (Account) & Thuộc tính (Property): `TheQ Spa Academy`.
   - Tạo Luồng dữ liệu Web (Web Data Stream) với URL công khai của website.
   - Sao chép mã **Measurement ID** (ví dụ: `G-1234567890`).
2. **Trên Google Search Console (`search.google.com/search-console`):**
   - Chọn hình thức **Tiền tố URL (URL Prefix)** và nhập đúng URL website (ví dụ: `https://your-domain.com/`).
   - Chọn phương thức xác minh **Thẻ HTML (HTML Tag)**: `<meta name="google-site-verification" content="MA_XAC_MINH_CUA_BAN" />`.
   - Sao chép phần chuỗi bên trong `content="..."`.

### Bước 1.2: Nạp mã vào `bed-theqweb`
Chạy lệnh Artisan sau trên máy chủ (thay bằng mã thực tế của bạn) để nạp thẳng vào bảng `settings` (có kèm trường `label` bắt buộc của bảng `settings`):
```bash
php artisan tinker --execute="\App\Models\Setting::updateOrCreate(['key'=>'gsc_verification'],['label'=>'GSC Verification','value'=>'MA_XAC_MINH_GSC']); \App\Models\Setting::updateOrCreate(['key'=>'ga4_measurement_id'],['label'=>'GA4 Measurement ID','value'=>'G-XXXXXXXXXX']);"
```
- Sau khi chạy xong, mở trang chủ website bấm `Ctrl + U` (*View Page Source*) sẽ thấy ngay thẻ `<meta name="google-site-verification" ...>` và `<script async src="https://www.googletagmanager.com/gtag/js..."></script>` nằm trong `<head>`.
- Quay lại Google Search Console bấm **Xác minh (Verify)** $\rightarrow$ Nhận thông báo màu xanh **Đã xác minh quyền sở hữu (Ownership verified)**.

### Bước 1.3: Gửi Sitemap & Cấp Quyền `Viewer` Cho Giảng Viên
1. **Gửi Sitemap trên GSC:** Vào menu **Sơ đồ trang web (Sitemaps)** $\rightarrow$ Nhập `sitemap.xml` $\rightarrow$ Bấm **Gửi (Submit)** $\rightarrow$ Đảm bảo cột Trạng thái hiện **Thành công (Success)**.
2. **Cấp quyền trên GSC:** Vào **Cài đặt (Settings)** $\rightarrow$ **Người dùng và quyền (Users and permissions)** $\rightarrow$ **Thêm người dùng (Add user)** $\rightarrow$ Nhập email giảng viên với quyền **Người dùng bị hạn chế / Người xem (Restricted / Viewer)**.
3. **Cấp quyền trên GA4:** Vào **Quản trị (Admin)** $\rightarrow$ **Quản lý quyền truy cập thuộc tính (Property Access Management)** $\rightarrow$ Bấm dấu `+` $\rightarrow$ Nhập email giảng viên với vai trò **Người xem (Viewer)**.

---

## 2. Checklist 5 Bức Ảnh Chụp Màn Hình Số Liệu Nền (Baseline Tuần 0)

Thành viên 1 (Technical & Analytics Lead) cần chụp toàn màn hình (thấy rõ thanh địa chỉ URL và ngày giờ máy tính) ngay trong Ngày 3 và lưu vào thư mục báo cáo để đối chiếu sau 14 ngày:

- [ ] **Ảnh 1 – Minh chứng `robots.txt` và `sitemap.xml` hoạt động:**
  - Chụp màn hình trình duyệt mở `https://<domain>/robots.txt` và `https://<domain>/sitemap.xml` hiển thị đầy đủ danh sách URL bài viết.
- [ ] **Ảnh 2 – Minh chứng mã nguồn HTML gắn thẻ GSC & GA4:**
  - Chụp màn hình cửa sổ `view-source:https://<domain>/` làm nổi bật thẻ `<meta name="google-site-verification" ...>` và đoạn script `gtag.js`.
- [ ] **Ảnh 3 – Minh chứng Sitemap `Success` trên Google Search Console:**
  - Chụp màn hình mục **Sitemaps** trên GSC thể hiện tệp `/sitemap.xml` có trạng thái **Thành công (Success)** kèm ngày gửi và số URL đã phát hiện.
- [ ] **Ảnh 4 – Số liệu nền (Baseline Tuần 0) trên GSC & GA4:**
  - **GSC:** Màn hình **Hiệu suất (Performance / Search results)** ở ngày đầu tiên (Total Clicks = 0, Total Impressions = 0).
  - **GA4:** Màn hình **Thời gian thực (Realtime)** ghi nhận ít nhất `1 người dùng đang hoạt động` (khi nhóm tự truy cập kiểm tra) và màn hình **Thu nạp lưu lượng (Traffic acquisition)** ở Tuần 0.
- [ ] **Ảnh 5 – Minh chứng cấp quyền `Viewer` cho email giảng viên:**
  - Chụp 2 ảnh màn hình bảng **Users and permissions** của GSC và **Property Access Management** của GA4 có hiển thị email giảng viên ở quyền `Viewer`.
