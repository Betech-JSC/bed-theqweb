# Consult & Locations Specification

## Overview
- **Target file**: `src/components/ConsultLocations.tsx`
- **Screenshot**: `docs/design-references/desktop_home.png`
- **Interaction model**: Form validation, submit feedback, map link clicks.

## DOM Structure
- **Section Wrapper**: `section` container.
  - **Grid Layout**: 2-column container.
    - **Left Column**: Consultation Form.
      - **Heading**: "Tư vấn cùng chuyên gia".
      - **Form**:
        - Input: Name (text).
        - Input: Phone number (tel).
        - Input: Service option (select dropdown).
        - Textarea: Note / message (optional).
        - Button: Submit ("ĐĂNG KÝ TƯ VẤN").
    - **Right Column**: Locations / Addresses.
      - **Heading**: "Hệ thống chi nhánh KT Beauty".
      - **Branch Card (x2 or x3)**:
        - **Branch Name**: e.g., "Chi nhánh Quận 1".
        - **Address Text**: Full street address.
        - **Hotline & Working Hours**: Contact phone, operational times.
        - **Map Link**: Button showing "Xem bản đồ" / "Chỉ đường".

## Computed Styles (exact values from getComputedStyle)

### Section Wrapper
- padding: 80px 10%
- background-color: rgb(241, 241, 241) (#F1F1F1)

### Grid Layout
- display: grid
- grid-template-columns: 1.2fr 1fr
- gap: 60px

### Form Inputs
- width: 100%
- padding: 14px 18px
- border: 1px solid rgb(221, 216, 213) (#DDD8D5)
- border-radius: 4px
- background-color: rgb(255, 255, 255) (#ffffff)
- font-size: 15px
- margin-bottom: 20px
- focus-border: 1px solid rgb(210, 191, 167) (#D2BFA7)

### Form Select Arrow
- Custom caret down SVG indicator on the right of select element.

### Submit Button
- background-color: rgb(23, 23, 23) (#171717)
- color: rgb(255, 255, 255) (#ffffff)
- font-size: 16px
- font-weight: 700
- padding: 16px
- border-radius: 4px
- width: 100%
- cursor: pointer
- hover: background-color: rgb(51, 51, 51) (#333333)

### Branch Card
- background-color: rgb(255, 255, 255) (#ffffff)
- padding: 24px
- border-radius: 6px
- margin-bottom: 20px
- border: 1px solid rgb(230, 225, 217) (#E6E1D9)

---

## States & Behaviors

### Form Validation
- Standard required checks for Name and Phone.
- Visual error borders when validation fails on submit.
- Success banner display upon successful mock submission.

## Text Content (verbatim)
- Left title: "Tư vấn cùng chuyên gia"
- Right title: "HỆ THỐNG CHI NHÁNH KT BEAUTY"
- Location 1: "KT Beauty Medical Centre - Sài Gòn"
  - Address: "386-388 Đường 3/2, Phường 12, Quận 10, TP. Hồ Chí Minh"
  - Hotline: "1900 5006"
- Location 2: "Văn phòng hợp tác Úc"
  - Address: "Suite 402, Level 4, 350 Collins Street, Melbourne, VIC 3000, Australia"

## Responsive Behavior
- **Desktop (1440px)**: 2 columns, form on left, locations on right.
- **Tablet (768px)**: Stacks vertically (2 columns -> 1 column).
- **Mobile (390px)**: Stacks vertically, input field paddings reduced, full screen widths.
- **Breakpoint**: Grid switches to 1 column at `991px`.
