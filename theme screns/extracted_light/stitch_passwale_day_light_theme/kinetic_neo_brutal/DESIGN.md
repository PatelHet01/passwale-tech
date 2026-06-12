---
name: Kinetic Neo-Brutal
colors:
  surface: '#fff8f0'
  surface-dim: '#e1d9cb'
  surface-bright: '#fff8f0'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fbf3e4'
  surface-container: '#f5edde'
  surface-container-high: '#f0e7d9'
  surface-container-highest: '#eae2d3'
  on-surface: '#1f1b12'
  on-surface-variant: '#4d4635'
  inverse-surface: '#343026'
  inverse-on-surface: '#f8f0e1'
  outline: '#7f7662'
  outline-variant: '#d0c6ae'
  surface-tint: '#735c00'
  primary: '#735c00'
  on-primary: '#ffffff'
  primary-container: '#fcd34d'
  on-primary-container: '#715b00'
  inverse-primary: '#eac33e'
  secondary: '#545f73'
  on-secondary: '#ffffff'
  secondary-container: '#d5e0f8'
  on-secondary-container: '#586377'
  tertiary: '#5d5f5f'
  on-tertiary: '#ffffff'
  tertiary-container: '#d6d7d7'
  on-tertiary-container: '#5c5d5e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffe086'
  primary-fixed-dim: '#eac33e'
  on-primary-fixed: '#231b00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#d8e3fb'
  secondary-fixed-dim: '#bcc7de'
  on-secondary-fixed: '#111c2d'
  on-secondary-fixed-variant: '#3c475a'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#fff8f0'
  on-background: '#1f1b12'
  surface-variant: '#eae2d3'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '900'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '800'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '800'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Montserrat
    fontSize: 20px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Montserrat
    fontSize: 18px
    fontWeight: '500'
    lineHeight: '1.6'
  body-md:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: '500'
    lineHeight: '1.5'
  label-bold:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  caption:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-margin: 20px
  gutter: 16px
---

## Brand & Style
The design system is built for the high-energy world of nightlife and youth culture. It adopts a **Neo-Brutalist** aesthetic characterized by high-contrast color blocking, thick structural borders, and hard-edged shadows. The brand personality is unapologetic, urban, and vibrant. It moves away from soft gradients and subtle transitions in favor of "loud" UI elements that feel physical and immediate, mirroring the tactile nature of event tickets and physical club environments. 

Key visual principles:
- **High-Contrast Impact:** Using pure white and deep navy against a saturated yellow to direct attention instantly.
- **Structural Integrity:** Heavy 2px - 3px black/navy strokes on all containers and interactive elements.
- **Graphic Depth:** Using hard, non-blurred "drop shadows" (offsets) to create a layered, sticker-like depth.

## Colors
The palette is restricted and functional, designed to remain legible under the strobe-heavy or dark-mode conditions of event venues while popping on mobile screens.

- **Primary (Vibrant Yellow):** Used for primary actions, highlight states, and key brand moments. It signals "energy" and "access."
- **Secondary (Deep Navy):** The structural anchor. Used for primary text, thick borders, and dark backgrounds to provide better contrast than pure black.
- **Neutral (White):** Used for card surfaces and secondary input areas to ensure the layout doesn't become visually overwhelming.
- **Functional Accent (Black):** Reserved specifically for hard shadows and the thickest borders to create the "Neo-Brutal" punch.

## Typography
Montserrat is used across all levels to maintain a geometric, modern, and punchy feel. Headlines are intentionally set with tight tracking and heavy weights (ExtraBold/Black) to mimic concert posters and street wear branding.

- **Display & Headlines:** Must use Uppercase transformation to maximize the "brand-first" impact.
- **Body Text:** Uses Medium (500) weight rather than Regular to ensure legibility against high-contrast backgrounds and thick borders.
- **Labels:** Heavily tracked (letter spacing) and uppercase, used for navigation, tags, and metadata to create a distinct functional layer.

## Layout & Spacing
The layout follows a **Rigid Grid** philosophy. Elements should feel "locked" into place. 

- **Desktop:** 12-column grid with a fixed max-width of 1280px. Gutters are kept tight (16px) to maintain a dense, high-energy feel.
- **Mobile:** 4-column fluid grid. Margins are consistent at 20px to prevent content from touching the screen edges while maximizing real estate for event imagery.
- **Rhythm:** All spacing (padding/margin) must be multiples of 8px. Use larger gaps (48px+) between distinct sections to allow the bold typography breathing room.

## Elevation & Depth
Depth is not achieved through light and shadow (skeuomorphism) but through **Offset Geometry**.

- **Level 1 (Default):** Flat surface with a 2px stroke.
- **Level 2 (Interactive):** A hard, 4px shadow offset to the bottom-right (4px 4px 0px 0px #000000). 
- **Level 3 (Floating/Active):** An increased 8px shadow offset.
- **The "Press" Effect:** When an element is clicked/active, the shadow offset should reduce to 0px, moving the element 4px down and 4px right to simulate a physical button being pushed into the page.

## Shapes
The shape language balances the aggression of brutalism with the accessibility of modern app design.

- **Corners:** Components use a consistent `1rem` (16px) radius for containers and cards to keep the UI friendly. 
- **Borders:** Every container, input field, and button must have a solid 2px or 3px border in Deep Navy or Black.
- **Buttons:** Use "Pill" shapes only for tags or chips; main CTA buttons should remain standard rounded-rectangles for a more structural look.

## Components

### Buttons
- **Primary:** Vibrant Yellow background, 2px Navy border, Black 4px hard offset shadow. Text is Uppercase Bold.
- **Secondary:** White background, 2px Navy border, Black 4px hard offset shadow.
- **Tertiary/Ghost:** No background, underline on hover, 0px shadow.

### Input Fields
- **Default:** White background, 2px Navy border. 
- **Focus:** Vibrant Yellow background (as seen in the reference), signaling the active field with high visibility.
- **Placeholder:** Deep Navy at 50% opacity, Uppercase Label font.

### Cards (Events/Passes)
- White background with a 2px Navy border. 
- Image at the top should have a bottom border separating it from the content.
- Must include the hard 4px shadow to lift it from the background.

### Chips & Tags
- Pill-shaped with a 1px border. Use Vibrant Yellow for "Trending" or "Live" statuses.

### Checkboxes & Radios
- Square-edged with thick borders. When checked, the inner fill should be the Primary Yellow with a heavy "X" or "Check" mark in Navy.