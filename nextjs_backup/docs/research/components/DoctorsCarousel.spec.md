# Doctors Carousel Specification

## Overview
- **Target file**: `src/components/DoctorsCarousel.tsx`
- **Screenshot**: `docs/design-references/desktop_home.png`
- **Interaction model**: Swipe/drag carousel slide transitions with prev/next buttons.

## DOM Structure
- **Section Wrapper**: `section` container.
  - **Header Area**: "ĐỘI NGŨ CHUYÊN GIA LÀM ĐẸP" title + description.
  - **Slider Container**: Swiper wrapper.
    - **Slide Card (x5)**:
      - **Image Container**: Doctor's headshot.
      - **Details Container**:
        - **Doctor Name**: Bold header (H1 / H3).
        - **Doctor Role**: Small subtitle (e.g., "Bác sĩ CKI").
        - **Description**: Biography / specialties text.
    - **Slider Navigation**: Previous / Next arrow buttons.

## Computed Styles (exact values from getComputedStyle)

### Section Wrapper
- padding: 80px 10%
- background-color: rgb(255, 255, 255) (#ffffff)

### Slide Card
- display: flex
- flex-direction: column
- background-color: rgb(247, 247, 247) (#F7F7F7)
- border-radius: 8px
- overflow: hidden
- border: 1px solid rgb(230, 225, 217) (#E6E1D9)

### Doctor Image
- width: 100%
- height: 400px
- object-fit: cover

### Details Container
- padding: 24px
- display: flex
- flex-direction: column

### Doctor Name
- font-family: "KT Beauty Font", serif
- font-size: 22px
- font-weight: 700
- color: rgb(23, 23, 23) (#171717)
- margin-bottom: 8px

### Doctor Role
- font-family: "Nunito Sans", sans-serif
- font-size: 14px
- font-weight: 600
- color: rgb(210, 191, 167) (#D2BFA7)
- text-transform: uppercase
- margin-bottom: 12px

### Description
- font-family: "Nunito Sans", sans-serif
- font-size: 14px
- line-height: 1.5
- color: rgb(109, 109, 109) (#6D6D6D)

---

## States & Behaviors

### Swiper Carousel Slide
- **Responsive items**:
  - Desktop: 3 visible slides.
  - Tablet: 2 visible slides.
  - Mobile: 1 visible slide.
- **Controls**: Prev/Next buttons slide items. Pagination dots at the bottom.

## Assets
- Dr. Ngoc Nu: `public/images/Anh-dai-dien-Bac-si-Nu-1.png`
- Dr. Nguyen Thi Hao: `public/images/Anh-dai-dien-Bac-Si-Hao-1.png`
- Dr. Ho Viet Trinh: `public/images/559443567_122144185118677110_5751359661921085413_n-2-1.jpg`
- Dr. Nguyen Vu Huan: `public/images/Ban-sao-BS-Huan-web-1-1-1-scaled-1.jpg`
- Dr. Hoang Nga: `public/images/Anh-dai-dien-BS-Nga-Aurora-1.png`

## Text Content (verbatim)
- Section Title: "ĐỘI NGŨ CHUYÊN GIA LÀM ĐẸP"
- Bios (summarized or extracted):
  - Bs. CKI Ngọc Nữ: Bác sĩ da liễu thẩm mỹ giàu kinh nghiệm.
  - Bs. CKI Nguyễn Thị Hảo: Chuyên gia thẩm mỹ nội khoa.
  - Bs. CKI Hồ Việt Trinh: Chuyên gia phẫu thuật tạo hình thẩm mỹ.
  - Ths. Bs. Nguyễn Vũ Huân: Chuyên khoa thẩm mỹ công nghệ cao.
  - Ths. Bs. CKI Hoàng Nga: Chuyên gia phun xăm và thẩm mỹ nội khoa.

## Responsive Behavior
- **Desktop**: 3 cards visible, navigation arrows on left/right outer bounds.
- **Tablet**: 2 cards visible.
- **Mobile**: 1 card visible, arrows hidden or positioned bottom.
