# Page Topology - ktbeauty.com.vn

This document outlines the visual sections, z-index layers, and page layout components from top to bottom.

## 1. Laying and Z-Index Layers
- **Sticky Header**: `z-index: 999` (stays on top of all page content during scroll).
- **Floating CTA Widget (Zalo/Hotline)**: `z-index: 9999` (floats at the bottom right).
- **Hero Slider / Overlay Content**: `z-index: 10`.
- **FAQ Accordion Content**: `z-index: 1`.

---

## 2. Component Layout Structure (Top-to-Bottom)

### Component 0: Global Layout Wrapper (`src/app/layout.tsx`)
- Configures global custom fonts and colors.
- Incorporates Floating Contact Widget.

### Component 1: Header / Navbar (`src/components/Header.tsx`)
- **Structure**: Brand logo + Desktop navigation links + Mobile toggle dropdown + "Đặt lịch tư vấn" Hotline button.
- **Interaction Model**: Scroll-triggered sticky mode, mobile collapsible menu.

### Component 2: Hero Banner (`src/components/Hero.tsx`)
- **Structure**: Responsive overlay text and CTA buttons ("Xem dịch vụ", "Đăng ký tư vấn").
- **Interaction Model**: Static image background responsive switch.

### Component 3: Three Pillars (`src/components/ThreePillars.tsx`)
- **Structure**: Row of 3 card badges detailing values ("Tiêu Chuẩn Y Khoa", "Công Nghệ Hiện Đại", "Chăm Sóc Cá Nhân Hóa").
- **Interaction Model**: Static layout.

### Component 4: Introduction (`src/components/Introduction.tsx`)
- **Structure**: Elegant title "KT BEAUTY MEDICAL CENTRE" + short bio + decorative details.
- **Interaction Model**: Static.

### Component 5: Highlight Services (`src/components/HighlightServices.tsx`)
- **Structure**: 3 large visual cards (Phẫu thuật thẩm mỹ, Da liễu thẩm mỹ, Phun xăm thẩm mỹ) with background images.
- **Interaction Model**: Hover image zoom and overlay color transition.

### Component 6: Mid Call-to-Action (`src/components/MidCTA.tsx`)
- **Structure**: Wide golden banner with heading "Bắt đầu thay đổi ngay hôm nay" + "Liên hệ tư vấn" button.
- **Interaction Model**: Hover transitions.

### Component 7: Doctors Carousel (`src/components/DoctorsCarousel.tsx`)
- **Structure**: Slider with doctor profile photos, titles, and descriptions.
- **Interaction Model**: Swiper.js responsive slider.

### Component 8: Middle Registration Form (`src/components/QuickForm.tsx`)
- **Structure**: Compact inline input fields + "Đăng ký ngay" button.
- **Interaction Model**: Form input validation and state management.

### Component 9: Why Choose Us (`src/components/WhyChooseUs.tsx`)
- **Structure**: Section with 4 key highlights: "Tiêu chuẩn Úc Châu", "Tư vấn cá nhân hóa", "Chuyên môn cao", "Công nghệ tiên tiến".
- **Interaction Model**: Hover highlight.

### Component 10: Expert Sharing (`src/components/ExpertSharing.tsx`)
- **Structure**: Row of 3 articles/news cards with thumbnail, date, and snippet.
- **Interaction Model**: Link hover animations.

### Component 11: Real Results Switcher (`src/components/RealResults.tsx`)
- **Structure**: Service tabs + Before/After slider layout containing real photo comparisons.
- **Interaction Model**: Click-to-switch tabs (fade transition).

### Component 12: FAQ Accordion (`src/components/FAQ.tsx`)
- **Structure**: List of 5 collapse/expand question cards.
- **Interaction Model**: Collapsible list elements with smooth slide height transition.

### Component 13: Consult & Locations (`src/components/ConsultLocations.tsx`)
- **Structure**: Left column with registration form, right column showing branch address, contact details, map links.
- **Interaction Model**: Form validation and branch switching map trigger.

### Component 14: Footer (`src/components/Footer.tsx`)
- **Structure**: Quick links grid + Social media badges + Ministry of Industry and Trade registration badge.
- **Interaction Model**: Hover states on links and social icons.
