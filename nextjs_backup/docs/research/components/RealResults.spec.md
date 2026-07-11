# Real Results Switcher Specification

## Overview
- **Target file**: `src/components/RealResults.tsx`
- **Screenshot**: `docs/design-references/desktop_home.png`
- **Interaction model**: Click-to-switch tabs showing dynamic grid of before/after case studies.

## DOM Structure
- **Section Wrapper**: `section` container.
  - **Header**: "Kết quả thực tế từ khách hàng KT Beauty".
  - **Tabs Bar**: Row of tab buttons (`KT EYELUXE`, `KT YOUTH LINE`, `SYLFIRM X`, `KT COCKTAIL INFUSION`, `KT PRO LIFT`, `KT HYA RESHAPE`).
  - **Results Grid**: Grid container containing cards.
    - **Result Card (x4 per tab)**:
      - **Image Container**: Side-by-side Before/After image comparison.
        - Left: Before label & photo.
        - Right: After label & photo.
      - **Details**:
        - **Service Name**: e.g., "KT EYELUXE".
        - **Customer / Title**: Case detail description.

## Computed Styles (exact values from getComputedStyle)

### Section Wrapper
- padding: 80px 10%
- background-color: rgb(247, 247, 247) (#F7F7F7)

### Tabs Bar
- display: flex
- justify-content: center
- flex-wrap: wrap
- gap: 12px
- margin-bottom: 40px

### Tab Button (Inactive)
- background-color: transparent
- border: 1px solid rgb(210, 191, 167) (#D2BFA7)
- color: rgb(23, 23, 23) (#171717)
- padding: 10px 20px
- font-size: 14px
- font-weight: 600
- border-radius: 99px
- cursor: pointer
- transition: all 0.3s ease

### Tab Button (Active / Hovered)
- background-color: rgb(210, 191, 167) (#D2BFA7)
- color: rgb(255, 255, 255) (#ffffff)
- border-color: rgb(210, 191, 167)

### Results Grid
- display: grid
- grid-template-columns: repeat(4, 1fr) (or 3, 1fr depending on viewport)
- gap: 24px

### Result Card
- background-color: rgb(255, 255, 255) (#ffffff)
- border-radius: 8px
- overflow: hidden
- border: 1px solid rgb(230, 225, 217) (#E6E1D9)
- box-shadow: 0 4px 6px rgba(0,0,0,0.02)
- transition: transform 0.3s ease, box-shadow 0.3s ease

### Result Card Hover
- transform: translateY(-4px)
- box-shadow: 0 8px 16px rgba(0,0,0,0.06)

---

## States & Behaviors

### Tab Navigation
- **Trigger**: Click tab button.
- **Behavior**: Switches active tab state. The active cards fade out, swap content, and fade in smoothly using a CSS fade transition (`opacity: 0` to `1` over `0.3s`).

### Before/After Slide comparison (Optional / Emulated)
- The images are pre-made split files (e.g. `EyeLuxe.jpg` containing a combined view, or we can use separate before/after files side-by-side with vertical labels overlay).
- Let's support a clean overlay label: "Trước" (Before) on left, "Sau" (After) on right.

## Assets
- Tab `KT EYELUXE`: `public/images/EyeLuxe.jpg`, `public/images/EyeLuxe-3.png`, `public/images/Eyeluxe-_7.png`
- Tab `SYLFIRM X`: `public/images/Celeb_Sylfirm.png`
- Tab `KT COCKTAIL INFUSION`: `public/images/Celeb_Meso.png`
- Tab `KT PRO LIFT`: `public/images/Celeb_Pro-Lift.png`, `public/images/Pro-Lift.png`
- Tab `KT HYA RESHAPE`: `public/images/Hya-4.png`

## Text Content (verbatim)
- Tabs: "KT EYELUXE", "KT YOUTH LINE", "SYLFIRM X", "KT COCKTAIL INFUSION", "KT PRO LIFT", "KT HYA RESHAPE"

## Responsive Behavior
- **Desktop (1440px)**: 4 columns or 3 columns grid.
- **Tablet (768px)**: 2 columns.
- **Mobile (390px)**: 1 column. Tabs wrap or overflow horizontally.
