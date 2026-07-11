# Highlight Services Specification

## Overview
- **Target file**: `src/components/HighlightServices.tsx`
- **Screenshot**: `docs/design-references/desktop_home.png`
- **Interaction model**: Hover zoom background, text translation animation.

## DOM Structure
- **Section Wrapper**: `section` container.
  - **Header Area**: "Dịch vụ nổi bật" title + subtitle.
  - **Grid Container**: 3-column wrapper.
    - **Service Card (x3)**:
      - **Image Wrapper**: Absolute background image.
      - **Overlay Mask**: Color tint layer.
      - **Content Box**: Positioned at the bottom of card.
        - **Number Label**: "01", "02", "03" decoration.
        - **Card Title**: Large elegant bold text.
        - **Description**: Hidden or visible on hover.
        - **Learn More Button**: Text + Arrow icon.

## Computed Styles (exact values from getComputedStyle)

### Section Wrapper
- padding: 80px 10%
- background-color: rgb(247, 247, 247) (#F7F7F7)

### Grid Container
- display: grid
- grid-template-columns: repeat(3, 1fr)
- gap: 30px

### Service Card
- display: flex
- flex-direction: column
- justify-content: flex-end
- height: 480px
- border-radius: 8px
- overflow: hidden
- position: relative
- padding: 40px
- cursor: pointer

### Card Background Image (zooms on hover)
- position: absolute
- top: 0
- left: 0
- width: 100%
- height: 100%
- object-fit: cover
- z-index: 1
- transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)

### Image Sources:
- Card 1: `public/images/Phau-Thuat-Tham-My2x-1.png`
- Card 2: `public/images/da-lieu-tham-my2x-1.png`
- Card 3: `public/images/phun-xam-tham-my2x-1.png`

### Card Overlay Mask
- position: absolute
- top: 0
- left: 0
- width: 100%
- height: 100%
- background: linear-gradient(to top, rgba(23, 23, 23, 0.85) 0%, rgba(23, 23, 23, 0.2) 60%, rgba(23, 23, 23, 0) 100%)
- z-index: 2
- transition: opacity 0.3s ease

### Card Title
- font-family: "KT Beauty Font", serif
- font-size: 24px
- font-weight: 700
- color: rgb(255, 255, 255) (#ffffff)
- margin-bottom: 12px
- z-index: 3

---

## States & Behaviors

### Hover Zoom & Slide Text
- **Trigger**: Mouse hover over a card.
- **Image Scale**: The background image scales to `scale(1.08)`.
- **Text Translation**: The title and description shift slightly upward (`transform: translateY(-8px)`).
- **Overlay Tint**: The gradient overlay becomes slightly darker/richer.
- **Transition**: `transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), all 0.3s ease`.

## Assets
- Card 1 Background: `public/images/Phau-Thuat-Tham-My2x-1.png`
- Card 2 Background: `public/images/da-lieu-tham-my2x-1.png`
- Card 3 Background: `public/images/phun-xam-tham-my2x-1.png`
- Icons: Arrow right (`ArrowRight` or custom SVG).

## Text Content (verbatim)
- Section Title: "Dịch vụ nổi bật"
- Card 1: "Phẫu thuật thẩm mỹ"
- Card 2: "Da liễu thẩm mỹ"
- Card 3: "Phun xăm thẩm mỹ"

## Responsive Behavior
- **Desktop (1440px)**: 3 columns, card height 480px.
- **Tablet (768px)**: 3 columns, card height reduced to 380px, padding inside card 24px.
- **Mobile (390px)**: Stacks into 1 column (3 columns -> 1 column), card height 420px.
- **Breakpoint**: Grid switches to 1 column at `768px`.
