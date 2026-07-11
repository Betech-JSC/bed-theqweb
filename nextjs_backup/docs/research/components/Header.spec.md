# Header Specification

## Overview
- **Target file**: `src/components/Header.tsx`
- **Screenshot**: `docs/design-references/desktop_home.png`
- **Interaction model**: Scroll-triggered sticky header, click-triggered mobile overlay menu.

## DOM Structure
- **Wrapper**: `header` element.
  - **Topbar**: Announcement area containing registration text and phone link.
  - **Navbar**: Main container.
    - **Logo Container**: Link containing responsive logo image.
    - **Nav Links**: List of links (Desktop only, hidden on mobile).
    - **CTA Button**: "Đặt lịch tư vấn" / Hotline `19005006` (Desktop only).
    - **Mobile Menu Trigger**: Hamburger menu button (Mobile only).
  - **Mobile Dropdown Menu**: Collapsible menu wrapper showing list links and CTA.

## Computed Styles (exact values from getComputedStyle)

### Wrapper / Topbar
- display: flex
- justify-content: space-between
- align-items: center
- background-color: rgb(23, 23, 23) (#171717)
- color: rgb(210, 191, 167) (#D2BFA7)
- font-size: 13px
- padding: 8px 10%

### Navbar (Default transparent/white)
- display: flex
- justify-content: space-between
- align-items: center
- padding: 20px 10%
- position: absolute (or fixed)
- width: 100%
- top: 40px (below topbar)
- z-index: 999
- transition: all 0.3s ease

### Sticky Navbar State
- position: fixed
- top: 0
- background-color: rgb(255, 255, 255) (#ffffff)
- box-shadow: 0 4px 12px rgba(0,0,0,0.05)
- padding: 12px 10%

### Nav Links
- display: flex
- gap: 24px
- list-style-type: none
- font-family: "KT Beauty Font", "Nunito Sans", sans-serif
- font-size: 15px
- font-weight: 600
- text-transform: uppercase

### Nav Link Hover State
- color: rgb(204, 51, 102) (#CC3366)
- transition: color 0.2s ease

### CTA Button ("19005006")
- background-color: rgb(210, 191, 167) (#D2BFA7)
- color: rgb(255, 255, 255) (#ffffff)
- font-size: 14px
- font-weight: 700
- padding: 10px 24px
- border-radius: 4px
- transition: background-color 0.2s ease

---

## States & Behaviors

### Scroll-Triggered Sticky
- **Trigger**: Scroll position > 50px.
- **State A (Initial)**: absolute top, transparent background, white text/links, white logo (`LOGO-KT-NGANG-WHITE-BAN-MOI-NHAT-05-1-2048x541-1.png`).
- **State B (Sticky)**: fixed top, white background, dark gray text (`rgb(51, 51, 51)`), dark logo (`LOGO-KT-NGANG-DEN-BAN-MOI-NHAT-07-2-1.png`), box shadow active.
- **Transition**: `transition: background-color 0.3s ease, padding 0.3s ease, box-shadow 0.3s ease`.

### Mobile Menu Dropdown
- **Trigger**: Click hamburger icon.
- **Behavior**: Toggles class showing dropdown block with slide-down / fade transition.
- **Icon switch**: Menu icon swaps to close icon (`eicon-close`).

## Assets
- Light Logo: `public/images/LOGO-KT-NGANG-WHITE-BAN-MOI-NHAT-05-1-2048x541-1.png`
- Dark Logo: `public/images/LOGO-KT-NGANG-DEN-BAN-MOI-NHAT-07-2-1.png`
- Icons: Menu icon (lucide `Menu`), Close icon (lucide `X`), Phone icon.

## Text Content (verbatim)
- Topbar: "Đặt lịch tư vấn ngay"
- Hotline: "19005006"
- Menu Items: "Phẫu thuật thẩm mỹ", "Cấy tóc y khoa", "Da liễu", "Thẩm mỹ nội khoa", "Công nghệ cao", "Phun xăm thẩm mỹ"

## Responsive Behavior
- **Desktop (1440px)**: Desktop Navbar visible, mobile trigger hidden.
- **Tablet (768px)**: Hidden desktop links, show mobile trigger.
- **Mobile (390px)**: Stacked logo and trigger, padding reduced to `10px 16px`.
