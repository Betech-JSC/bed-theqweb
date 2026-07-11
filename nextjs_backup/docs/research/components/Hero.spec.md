# Hero Banner Specification

## Overview
- **Target file**: `src/components/Hero.tsx`
- **Screenshot**: `docs/design-references/desktop_home.png`
- **Interaction model**: Static with responsive background image swap.

## DOM Structure
- **Container**: `section` wrapper.
  - **Background Overlay**: Dark/gold tinted background image.
  - **Content Box**: Centered overlay.
    - **Eyebrow Text**: Small uppercase label.
    - **Main Heading**: Large elegant serif title.
    - **Subheading**: Descriptive text block.
    - **Action Buttons**: Row containing primary (Gold) and secondary (Outline white) buttons.

## Computed Styles (exact values from getComputedStyle)

### Container
- display: flex
- flex-direction: column
- justify-content: center
- align-items: flex-start
- min-height: 80vh (approx. 720px on desktop)
- padding: 0 10%
- position: relative
- background-size: cover
- background-position: center

### Background Image Source
- Desktop: `public/images/Ban-banner-web-3-1.png`
- Mobile: `public/images/size-4x5-phone-1-1.png`

### Heading (H1 / H2 overlay)
- font-family: "KT Beauty Font", serif
- font-size: 52px
- font-weight: 700
- line-height: 1.2
- color: rgb(255, 255, 255) (#ffffff)
- max-width: 600px
- margin-bottom: 24px

### Subheading
- font-family: "Nunito Sans", sans-serif
- font-size: 18px
- line-height: 1.6
- color: rgb(241, 241, 241) (#F1F1F1)
- max-width: 550px
- margin-bottom: 36px

### Primary CTA Button ("Đặt lịch tư vấn")
- background-color: rgb(210, 191, 167) (#D2BFA7)
- color: rgb(255, 255, 255) (#ffffff)
- font-size: 16px
- font-weight: 700
- padding: 14px 32px
- border-radius: 4px
- cursor: pointer
- hover: background-color: rgb(191, 168, 135) (#BFA887)

### Secondary CTA Button ("Xem dịch vụ")
- background-color: transparent
- border: 1.5px solid rgb(255, 255, 255)
- color: rgb(255, 255, 255) (#ffffff)
- font-size: 16px
- font-weight: 700
- padding: 14px 32px
- border-radius: 4px
- margin-left: 16px
- cursor: pointer
- hover: background-color: rgba(255,255,255,0.1)

---

## States & Behaviors
- **Hover effects**:
  - Primary button fades to a slightly darker gold.
  - Secondary button changes border opacity and gains subtle background tint.

## Assets
- Desktop Background: `public/images/Ban-banner-web-3-1.png`
- Mobile Background: `public/images/size-4x5-phone-1-1.png`

## Text Content (verbatim)
- Heading/Eyebrow: "KT Beauty Medical Centre"
- Subtitle: "Tiêu chuẩn y khoa - Kiến tạo vẻ đẹp độc bản"

## Responsive Behavior
- **Desktop (1440px)**: Desktop background active, text left-aligned, min-height 80vh.
- **Tablet (768px)**: Font size reduced to `38px`, min-height 60vh.
- **Mobile (390px)**: Mobile background active (`size-4x5-phone-1-1.png`), heading centered, font size `32px`, buttons stacked vertically (100% width) or smaller gap.
- **Breakpoint**: Background swap triggers at `768px`.
