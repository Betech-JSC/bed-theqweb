# FAQ Accordion Specification

## Overview
- **Target file**: `src/components/FAQ.tsx`
- **Screenshot**: `docs/design-references/desktop_home.png`
- **Interaction model**: Click to expand/collapse details. Multiple items can be open or single items only.

## DOM Structure
- **Section Wrapper**: `section` container.
  - **Header**: "FAQ – Quyền lợi & Cam kết" title.
  - **Accordion List**: Vertical stack of items.
    - **Accordion Item**:
      - **Trigger Header**: Button/div showing Question text + Expand indicator icon (+/-).
      - **Content Panel**: Expanding wrapper showing Answer text block.

## Computed Styles (exact values from getComputedStyle)

### Section Wrapper
- padding: 80px 10%
- background-color: rgb(255, 255, 255) (#ffffff)
- max-width: 900px
- margin: 0 auto

### Accordion Item
- border-bottom: 1px solid rgb(221, 216, 213) (#DDD8D5)
- padding: 20px 0

### Trigger Header
- display: flex
- justify-content: space-between
- align-items: center
- width: 100%
- font-family: "KT Beauty Font", serif
- font-size: 18px
- font-weight: 700
- color: rgb(23, 23, 23) (#171717)
- cursor: pointer
- text-align: left

### Expand Icon (+ / -)
- color: rgb(210, 191, 167) (#D2BFA7)
- font-size: 20px
- transition: transform 0.3s ease

### Content Panel (Collapsed)
- max-height: 0
- opacity: 0
- overflow: hidden
- transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)

### Content Panel (Expanded)
- max-height: 500px (dynamic in React)
- opacity: 1
- padding-top: 12px
- font-family: "Nunito Sans", sans-serif
- font-size: 15px
- line-height: 1.6
- color: rgb(109, 109, 109) (#6D6D6D)

---

## States & Behaviors

### Accordion Collapse / Expand
- **Trigger**: Click Accordion Item header.
- **Behavior**:
  - Toggles the panel visibility. If active, changes icon from plus `+` (`e-closed`) to minus `-` (`e-opened`).
  - Animates heights smoothly.
  - Optional: Closing other panels when one opens.

## Text Content (verbatim)
- Header: "FAQ – Quyền lợi & Cam kết"
- Typical Questions:
  1. "Quy trình thăm khám tại KT Beauty Medical Centre như thế nào?"
  2. "KT Beauty Medical Centre có cam kết hiệu quả điều trị không?"
  3. "Các công nghệ điều trị tại trung tâm có đạt chuẩn y khoa không?"
  4. "Chi phí các dịch vụ tại KT Beauty như thế nào?"
  5. "Tôi cần lưu ý gì sau khi thực hiện dịch vụ?"

## Responsive Behavior
- **Desktop (1440px)**: Max width 900px, font sizes at default.
- **Tablet / Mobile**: Font size reduced to `16px`, trigger header padding adjusted, full width layout.
- **Breakpoint**: None (behaves gracefully via max-width).
