# Website Behaviors - ktbeauty.com.vn

This document specifies the interactive and responsive behaviors of the KT Beauty Medical Centre website.

## 1. Global Page Layout & Smooth Scroll
- **Viewport Behavior**: The page scrolls normally, but has smooth scrolling enabled.
- **Back to Top**: A floating action button (or Zalo/Hotline floats) overlay is positioned in the bottom-right corner.
  - Hotline icon: Float button in bottom-right.
  - Zalo / Messengers icon: Float button in bottom-right.

## 2. Header & Sticky Navbar
- **Layout**: Contains a topbar with "Đặt lịch tư vấn ngay" and hotline `19005006` or registration form trigger, and a main menu block.
- **Scroll Behavior**:
  - Initial State: Background is transparent or white depending on section, with a white/dark logo.
  - Sticky State: After scrolling past `50px`, the header attaches to the top of the viewport (`position: fixed`), gains a white background (`background: #ffffff`), and a box shadow (`box-shadow: 0 4px 10px rgba(0,0,0,0.05)`). Logo switches to the dark version (`LOGO-KT-NGANG-DEN-BAN-MOI-NHAT-07-2-1.png`).
- **Mobile Menu**:
  - Hamburger menu icon (`eicon-menu-bar` SVG) toggles the responsive menu.
  - Open state shows a full-screen or slide-down navigation block. Close button is `eicon-close` SVG.

## 3. Responsive Banner / Hero Section
- **Desktop (1440px)**: Uses the wide banner image `public/images/Ban-banner-web-3-1.png` as background.
- **Mobile (390px)**: Uses the portrait banner image `public/images/size-4x5-phone-1-1.png` to fit phone screens beautifully.

## 4. Highlight Services Hover Cards
- Under "Dịch vụ nổi bật":
  - 3 columns with background images:
    - Phẫu thuật thẩm mỹ (`Phau-Thuat-Tham-My2x-1.png`)
    - Da liễu thẩm mỹ (`da-lieu-tham-my2x-1.png`)
    - Phun xăm thẩm mỹ (`phun-xam-tham-my2x-1.png`)
  - **Hover Action**: Smooth scaling up of background image (`transform: scale(1.05)`) with an overlay color transition. The card text/details animate slightly upwards.

## 5. Doctor Team Slider
- **Interaction**: A carousel/slider showcasing the team of doctors.
  - Cards transition using Swiper.js.
  - Contains navigation buttons (prev/next chevron icons).
  - Dragging/swiping support on touch screen.

## 6. Real Results Tabbed Switcher (Kiến tạo - Vẻ đẹp độc bản)
- **Interaction**: Tabbed navigation switching before/after slider cards.
- **Tabs**:
  - `KT EYELUXE`
  - `KT YOUTH LINE`
  - `SYLFIRM X`
  - `KT COCKTAIL INFUSION`
  - `KT PRO LIFT`
  - `KT HYA RESHAPE`
- **Behavior**: Clicking a tab switches the visible set of before/after images and customer case studies. The transition is a clean fade (opacity `0` -> `1`).
- Each slide has a before/after split or side-by-side layout, with a play button overlay if it has a video/testimonial.

## 7. Registration Consult Forms
- Located in: Main Content body and Footer.
- **Form Fields**: Full name, Phone number, Service interested in, Location.
- **Interaction**:
  - Inputs have subtle border color change on focus (gold color `rgb(210, 191, 167)`).
  - Submit button hover has brightness adjustment or gold fill swap.

## 8. FAQ Accordion
- **Interaction**: Click-to-expand list of questions.
- **State A (Collapsed)**: Shows question text and a plus `+` icon (`e-closed` SVG). Answer is hidden (`max-height: 0`, `opacity: 0`, `overflow: hidden`).
- **State B (Expanded)**: Shows question, answer text, and a minus `-` icon (`e-opened` SVG). Answer expands smoothly with transitions.
