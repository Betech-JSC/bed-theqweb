
# Kế Hoạch Tổng Quan Đồ Án Cuối Kỳ: Website Đào Tạo Spa (SEO & Analytics)

## 1. Thông Tin Chung & Sản Phẩm Bàn Giao
- **Chủ đề:** Website dịch vụ & cẩm nang chuyên đề **Đào Tạo Nghề Spa** (Học viện Spa).
- **Quy mô nhóm:** 3 thành viên.
- **Thời hạn nộp:** 01 tuần sau khi kết thúc môn học (Chấm điểm Online).
- **Sản phẩm bắt buộc phải nộp:**
  1. **Website hoạt động thực tế công khai:** Có tên miền/subdomain (host miễn phí hoặc tương đương).
  2. **Tài khoản đo lường:** Cài đặt **Google Search Console (GSC)** & **Google Analytics 4 (GA4)**, cấp quyền **Viewer** cho email giảng viên.
  3. **Báo cáo kỹ thuật (01 file PDF):** Đại diện nhóm nộp, tổng hợp minh chứng của cả 3 thành viên.

> **Quy tắc thời gian bắt buộc:** Website phải chạy công khai, gắn GSC/GA4 và đăng bài **ít nhất 14 ngày (2 tuần)** trước ngày xuất báo cáo để có dữ liệu thực tế đối chiếu.

---

## 2. Phân Công Vai Trò Bắt Buộc (3 Thành Viên – Tối Ưu Cho Vấn Đáp Online)

| Thành viên | Vai trò trong Báo cáo | Nhiệm vụ cốt lõi & Phối hợp bảo vệ đồ án |
| :--- | :--- | :--- |
| **1. Nguyễn Lâm Minh Thư**<br>*(Nhóm Trưởng)* | **Keyword & On-page Specialist** | • Quản lý tiến độ nhóm; nắm bảng **30 từ khóa ngách** chia theo **Search Intent**.<br>• Lập cấu trúc website (Flat Topic Cluster) và **Content Plan 10 bài**.<br>• Phụ trách chuẩn On-page 10 bài: `Title`, `Meta Description`, `H1-H2`, `Alt ảnh`, `Internal link` *(trực quan, dễ trình bày khi vấn đáp)*. |
| **2. Lê Văn**<br>*(Thành Viên)* | **Off-page & Data Analyst** | • Tạo dựng bộ **6 Social Entity** đồng nhất thông tin NAP thương hiệu.<br>• Đi **10 backlink thực tế** từ nguồn miễn phí hợp lệ + chụp ảnh minh chứng.<br>• Trình bày bảng đối chiếu số liệu GSC/GA4 **sau 2 tuần** *(do Duy Khanh hỗ trợ trích xuất)* & tổng hợp **01 file PDF** báo cáo chung. |
| **3. Lê Duy Khanh**<br>*(Thành Viên)* | **Technical & Analytics Lead** | • **Phụ trách toàn bộ kỹ thuật khó:** Quản trị CMS/Code `bed-theqweb`, hosting, tên miền.<br>• Cấu hình chuẩn `/sitemap.xml` động và `/robots.txt`.<br>• Cài đặt **GSC, GA4**; cấp quyền `Viewer` cho giảng viên; chụp 5 ảnh Baseline Tuần 0 & hỗ trợ kỹ thuật số liệu cho cả nhóm. |

---

## 3. Định Hướng Chuyên Môn Cho Chủ Đề "Đào Tạo Spa"

### 3.1. Cấu trúc Website Phẳng (Flat Topic Cluster trên `bed-theqweb`)
- **Trang chủ (`/`) & Chuyên trang Cẩm nang (`/tin-tuc`)**: Trang đích trung tâm giới thiệu Học Viện Đào Tạo Spa & Thẩm Mỹ Quốc Tế TheQ, tích hợp thanh tìm kiếm và bộ lọc 4 chuyên mục đào tạo.
- **4 Chuyên mục Đào tạo Trụ cột (Chia đều 10 bài viết để tránh Thin Category):**
  1. `Đào tạo Chăm sóc da` (2 bài) | 2. `Đào tạo Massage Trị liệu` (2 bài)
  3. `Đào tạo Phun xăm thẩm mỹ` (2 bài) | 4. `Kinh nghiệm & Quản lý Spa` (4 bài)
- **Hệ thống 10 Bài viết Pillar & Cluster (`/tin-tuc/{slug}`)**: Toàn bộ 30 từ khóa (kể cả Transactional) đều trỏ về các URL tĩnh `/tin-tuc/{slug}` và `/` nằm trong `/sitemap.xml` (tuyệt đối không SEO vào URL tham số `?category=`).
- **Trang Tác giả E-E-A-T (`/tac-gia/{slug}`) & Footer NAP**: Đồng bộ Name – Address – Phone (`1900 5006`) xuyên suốt toàn trang.

### 3.2. Bộ 30 Từ Khóa Ngách (Chia theo Search Intent)
- **Informational (Tìm kiếm thông tin - ~15 từ):**
  - Ví dụ: *học nghề spa mất bao lâu, học phí học nghề spa, học spa có cần bằng cấp 3 không, mở spa cần chứng chỉ gì, lộ trình học nghề spa cho người mới, nghề spa có tương lai không...*
- **Commercial Investigation (So sánh/Đánh giá - ~8 từ):**
  - Ví dụ: *nên học nghề spa hay phun xăm, kinh nghiệm chọn trung tâm đào tạo spa uy tín, học nghề spa ở đâu tốt TPHCM/Hà Nội...*
- **Transactional (Chuyển đổi/Đăng ký học - ~7 từ):**
  - Ví dụ: *khóa học chăm sóc da chuyên nghiệp, khóa học massage trị liệu cấp tốc, đăng ký khóa học quản lý spa...*

### 3.3. Checklist Kỹ Thuật Từng Bài Viết On-page (10 Bài)
1. **Title SEO:** Chứa từ khóa chính ở đầu, độ dài 50–60 ký tự.
2. **Meta Description:** Chứa từ khóa chính/phụ, 145–160 ký tự, có kêu gọi hành động (CTA).
3. **Heading:** Duy nhất 1 thẻ `H1`, tối thiểu 3–4 thẻ `H2` và các thẻ `H3` phân bổ từ khóa phụ.
4. **Hình ảnh:** Tên file không dấu nối gạch ngang (`hoc-nghe-spa-uy-tin.jpg`) + thuộc tính `alt` đầy đủ.
5. **Internal Link:** Mỗi bài trỏ tối thiểu 2–3 link nội bộ (về trang Khóa học chính và các bài cùng chủ đề).

### 3.4. Kế Hoạch Chi Tiết Off-page (6 Social Entity & 10 Backlink Miễn Phí Cho Lê Văn)
- **6 Kênh Social Entity đồng bộ NAP (`Học Viện Đào Tạo Spa TheQ - 386-388 Đường 3/2, Q.10 - 1900 5006`):**
  1. Facebook Fanpage | 2. Pinterest Business | 3. Medium Profile | 4. Tumblr Blog | 5. LinkedIn Page | 6. YouTube / Behance Profile.
- **Danh sách 10 Backlink miễn phí hợp lệ (Lập bảng theo dõi + chụp màn hình bài đăng đưa vào PDF vì GSC cần 3–4 tuần mới cập nhật tab Links):**
  1. **Google Sites** (Trang giới thiệu khóa học trỏ về `/`)
  2. **Medium.com** (Bài tóm tắt lộ trình nghề Spa trỏ về Bài 3)
  3. **WordPress.com** (Bài chia sẻ học phí Spa trỏ về Bài 2)
  4. **Blogger / Blogspot** (Bài thời gian học Spa trỏ về Bài 1)
  5. **Tumblr** (Bài kỹ thuật massage cổ vai gáy trỏ về Bài 7)
  6. **Pinterest Pin** (Ghim Infographic 12 bước chăm sóc da trỏ về Bài 6)
  7. **Notion Public Page** (Sổ tay chứng chỉ mở Spa trỏ về Bài 4)
  8. **Telegra.ph** (Bài so sánh nghề Spa & Phun xăm trỏ về Bài 8)
  9. **Hashnode / Substack** (Bài kinh nghiệm chọn học viện uy tín trỏ về Bài 9)
  10. **About.me / Linktree** (Hồ sơ Bio Học viện trỏ về Bài 10 & `/`)
- **Chiến lược "Branded Long-tail" đảm bảo có Clicks & Impressions trên GSC sau 14 ngày:**
  - Kết hợp chia sẻ link lên Social Entity và hướng dẫn người dùng tìm kiếm trên Google theo cụm **Từ khóa ngách + Thương hiệu `TheQ`** (VD: *học nghề spa mất bao lâu theq*, *học phí học nghề spa theq*, *khóa học massage cổ vai gáy theq*) rồi click vào bài viết để GSC ghi nhận Queries, Clicks, CTR và Top 1–5 thực tế.

---

## 4. Lộ Trình 4 Giai Đoạn Thực Hiện (Checklist Tiến Độ)

### Giai đoạn 1: Khởi tạo Kỹ thuật & Lập Kế hoạch Từ khóa (Ngày 1 – Ngày 3)
- [x] Chốt tên thương hiệu Học viện Spa, thông tin liên hệ (NAP) và tên miền/subdomain.
- [x] Hoàn thiện bảng **30 từ khóa ngách** + phân loại Search Intent + sơ đồ cấu trúc web + **Content Plan 10 bài**.
- [x] Dựng Website công khai, cấu hình chuẩn `sitemap.xml` và `robots.txt` *(đã hoàn tất mã nguồn trên `bed-theqweb`, chờ deploy tên miền thật)*.
- [ ] Cài đặt **GSC** & **GA4**, submit `sitemap.xml`, cấp quyền `Viewer` cho email giảng viên.
- [ ] Chụp màn hình và lưu lại **số liệu nền (Baseline Tuần 1 - Bảng 4.1, 4.2)**.

### Giai đoạn 2: Sản xuất 10 Bài On-page & Đi Link Off-page (Tuần 1 – Tuần 2)
- [x] Soạn thảo & nạp Seeder **10 bài viết chuẩn SEO On-page** (Title, Meta, H1-H2, Alt ảnh, Internal link; ảnh bài viết sẽ do người dùng tự upload trong CMS).
- [ ] Sử dụng tính năng *URL Inspection (Kiểm tra URL)* trên GSC để yêu cầu lập chỉ mục (Request Indexing) cho cả 10 bài.
- [ ] Tạo bộ **6 Social Entity** đồng bộ thông tin thương hiệu NAP.
- [ ] Triển khai đủ **10 Backlink thực tế** từ các nguồn miễn phí hợp lệ, kiểm tra link sống và lập `Bảng 3.2`.

### Giai đoạn 3: Thu thập Dữ liệu & Theo dõi Index (Tuần 2 – Tuần 3)
- [ ] Chia sẻ bài viết lên các kênh Social Entity để kéo lượt truy cập thực tế (Social/Referral Traffic).
- [ ] Kiểm tra định kỳ trạng thái Index của 10 bài viết trên GSC, xử lý ngay nếu có URL chưa được lập chỉ mục.

### Giai đoạn 4: Phân tích Số liệu Tuần 3 & Hoàn thiện Báo cáo PDF (Cuối Tuần 3)
- [ ] Xuất dữ liệu **GSC** (Clicks, Impressions, CTR, Position, Queries) và **GA4** (Users, Sessions, Traffic Sources) ở **Tuần 3 (`Bảng 5.1, 5.2`)**.
- [ ] Đối chiếu với số liệu **Baseline Tuần 1 (`Bảng 4.1, 4.2`)**, phân tích nguyên nhân tăng/giảm và đề xuất giải pháp tối ưu tiếp theo.
- [x] Khởi tạo sẵn bộ bảng biểu kỹ thuật (`Bảng 1.1` → `Bảng 5.2`), cẩm nang Copy-Paste 10 Backlink và file Word gốc `docs/seo-plan/Lop_Nhom_XX_Bao_Cao_SEO_TheQ.docx` chuẩn Times New Roman 13, giãn dòng 1.15, lề 2.0cm *(chờ điền số liệu thực tế & dán ảnh minh chứng để xuất `Lop_Nhom_XX.pdf`)*.

---

## 5. Bố Cục File Báo Cáo PDF (`Lop_Nhom_XX.pdf`) & Cẩm Nang Vấn Đáp Nhanh

### 5.1. Bố Cục 01 File PDF Báo Cáo Kỹ Thuật (Chuẩn Đề Bài: Times New Roman 13, Giãn dòng 1.15, Lề 2.0cm)
1. **Trang bìa độc lập:** Tên trường, khoa, môn học, tên đề tài/dự án, URL website, thông tin lớp, giảng viên hướng dẫn.
2. **Trang 2 – Bảng phân công nhiệm vụ & Tự đánh giá đóng góp:** Họ tên, MSSV, vai trò chính, đầu mục công việc đã hoàn thành, tỷ lệ `%` đóng góp thực tế và **chữ ký xác nhận của cả 3 thành viên**.
3. **Từ trang 3 trở đi – Nội dung kỹ thuật và minh chứng (Gồm 5 Phần theo đúng biểu mẫu thực hành):**
   - **Phần 1 – Khởi tạo hạ tầng (Duy Khanh):** `Bảng 1.1` (So sánh nền tảng) & `Bảng 1.2` (Thông tin web đã triển khai).
   - **Phần 2 – Từ khóa & Kế hoạch nội dung (Minh Thư):** `Bảng 2.1` (Nghiên cứu 30 từ khóa), `Bảng 2.2` (Cấu trúc site), `Bảng 2.3` (Content Plan 10 bài).
   - **Phần 3 – Tối ưu On-page & Off-page (Minh Thư & Lê Văn):** `Bảng 3.1` (Audit On-page trước/sau tối ưu) & `Bảng 3.2` (Danh sách 10 URL backlink thực tế còn sống).
   - **Phần 4 – Đo lường & Đánh giá (Lê Văn & Duy Khanh):** `Bảng 4.1, 4.2` (Số liệu Baseline Tuần 1) và `Bảng 5.1, 5.2` (So sánh kết quả Tuần 3, phân tích nguyên nhân, đề xuất giải pháp).
   - **Phần 5 – Phụ lục ảnh chụp minh chứng:** Ảnh trang chủ, ảnh bài viết chuẩn SEO, ảnh minh chứng link backlink, ảnh màn hình Dashboard GSC/GA4 và ảnh mục cấp quyền (`Users and permissions`) cho email giảng viên.

### 5.2. Kịch Bản Trả Lời Vấn Đáp Dành Riêng Cho Minh Thư & Lê Văn
- **Câu hỏi cho Nguyễn Lâm Minh Thư (Keyword & On-page):**
  - *Hỏi: "Em lấy 30 từ khóa bằng cách nào và chia Search Intent ra sao?"* $\rightarrow$ **Trả lời:** Nhóm dùng Google Keyword Planner kết hợp Google Suggest chọn 30 từ khóa ngách dài (6–9 chữ) có độ cạnh tranh thấp, chia làm 3 nhóm: **Informational** (15 từ hỏi thời gian, học phí, điều kiện), **Commercial** (8 từ so sánh, chọn nơi học uy tín) và **Transactional** (7 từ đăng ký khóa học cụ thể).
  - *Hỏi: "Tối ưu On-page 10 bài gồm những gì?"* $\rightarrow$ **Trả lời:** Mỗi bài đều đảm bảo 5 chuẩn: `Title` 55–59 ký tự chứa từ khóa chính ở đầu; `Meta Description` ~150 ký tự có CTA; duy nhất 1 thẻ `H1` và 3–4 thẻ `H2` tự động sinh Mục lục (TOC); ảnh có tên file không dấu + thẻ `alt` chứa từ khóa; và tối thiểu 2 `Internal link` trỏ chéo về bài cùng chuyên mục.
- **Câu hỏi cho Lê Văn (Off-page & Data Analyst):**
  - *Hỏi: "Social Entity và 10 Backlink của nhóm làm thế nào?"* $\rightarrow$ **Trả lời:** Nhóm tạo 6 trang MXH đồng bộ 100% thông tin NAP (Tên Học viện TheQ, Địa chỉ 386-388 Đường 3/2 Q.10, Hotline 1900 5006) để xác thực thực thể với Google, sau đó đăng bài tóm tắt lên 10 nền tảng Web 2.0 miễn phí (Google Sites, Medium, WordPress, Blogger, Pinterest...) đặt Anchor Text trỏ về đúng 10 bài viết trên web.
  - *Hỏi: "Sau 2 tuần số liệu GSC và GA4 thay đổi thế nào?"* $\rightarrow$ **Trả lời:** So với Tuần 0 (Clicks = 0, Impressions = 0), sau 14 ngày nhờ Submit Sitemap, Request Indexing và kéo traffic từ Social Entity, GSC đã ghi nhận lượt hiển thị (Impressions) và lượt nhấp (Clicks) ở nhóm từ khóa ngách + thương hiệu, GA4 ghi nhận người dùng thực từ kênh Organic Search và Referral.

---

## 6. Quy Tắc "Thư Ký Dự Án" (Bắt Buộc Ở Mọi Phiên Làm Việc)

> **Chỉ thị cố định cho AI ở mọi phiên làm việc (Session):**
> Khi người dùng yêu cầu làm bất kỳ giai đoạn hay hạng mục nào của dự án này, AI phải đóng vai trò là **Thư ký dự án** và thực hiện nghiêm ngặt 3 bước sau:

1. **Đọc ngữ cảnh trước khi làm:** Luôn đọc cả 2 file `PROJECT_PLAN.md` và `WORK_LOG.md` ở đầu phiên để nắm rõ dự án đã làm tới đâu.
2. **Ghi nhật ký sau mỗi hạng mục hoàn thành:** Ngay khi xong một đầu việc, bắt buộc ghi nối tiếp (append) vào `D:\git\bed-theqweb\WORK_LOG.md` đầy đủ:
   - **Ngày & Giờ thực hiện** (`YYYY-MM-DD HH:mm`).
   - **Giai đoạn & Vai trò phụ trách** (Technical Lead / On-page Specialist / Off-page & Data Analyst).
   - **Nội dung công việc đã hoàn thành trong buổi đó**.
   - **Danh sách File / URL / Hình ảnh minh chứng** đã tạo ra.
3. **Đánh dấu Checklist:** Cập nhật trạng thái `- [x]` cho hạng mục tương ứng tại Mục 4 của `PROJECT_PLAN.md` để chuẩn bị dữ liệu xuất **01 file Báo cáo PDF** cuối kỳ.
