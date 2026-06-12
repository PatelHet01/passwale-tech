---
name: Nexus Secure
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#434655'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#525657'
  on-tertiary: '#ffffff'
  tertiary-container: '#6b6e70'
  on-tertiary-container: '#eff1f3'
  error: '#EF4444'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#e0e3e5'
  tertiary-fixed-dim: '#c4c7c9'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#444749'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
  success: '#10B981'
  warning: '#F59E0B'
  surface-border: '#E2E8F0'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 40px
  margin-mobile: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

This design system is built for a security-focused, modern utility platform. The brand personality is professional, highly reliable, and streamlined, aiming to instill confidence and ease of use in a high-stakes environment like credential management.

The design style follows a **Corporate / Modern** aesthetic with a lean toward **Minimalism**. It prioritizes clarity through heavy use of whitespace, a constrained color palette, and a focus on functional typography. The interface uses subtle tonal shifts to indicate hierarchy rather than loud decorative elements, ensuring the user's data remains the focal point.

## Colors

The color strategy uses a deep "Digital Blue" as the primary action color to signal trust and technology. The secondary color is a "Slate Navy," used primarily for text and high-contrast UI elements to provide a grounded, sophisticated feel.

The neutral palette is extensive, relying on cool greys to maintain a clean and airy interface. Backgrounds use the tertiary off-white to reduce eye strain, while borders and dividers are kept light and unobtrusive to define space without creating visual clutter.

## Typography

This design system utilizes **Inter** exclusively to lean into its systematic and utilitarian strengths. The type scale is designed for high legibility in data-dense environments.

Headlines use tighter tracking and heavier weights to create clear entry points for the eye. Body text is optimized with generous line heights to ensure readability during long sessions. Labels use a slightly heavier weight to distinguish them from body content, providing clear metadata and navigation cues.

## Layout & Spacing

The layout is based on a **12-column fluid grid** for desktop and a **4-column grid** for mobile. The system uses an 8px base unit to maintain a consistent rhythmic scale across all padding, margins, and component heights.

Alignment should be strict; elements should snap to the grid to emphasize the "secure and organized" brand pillar. Content is housed in a centered container on large screens to prevent excessively long line lengths, while spacing between sections (stack-lg) is generous to allow the design to breathe.

## Elevation & Depth

Visual hierarchy is established primarily through **Tonal Layers** and **Low-contrast outlines**. 

The background uses the tertiary color, while primary content areas (like cards and forms) sit on a pure white surface. To create a sense of subtle elevation, components use a 1px solid border in the `surface-border` color. 

Shadows are used sparingly, reserved only for "floating" elements like dropdowns, modals, or active states. These shadows should be extremely soft, with a large blur radius and low opacity (e.g., `0px 4px 20px rgba(0, 0, 0, 0.05)`), creating a natural, ambient lift rather than a harsh drop.

## Shapes

The design system utilizes a "Rounded" shape language (0.5rem base) to soften the professional aesthetic, making the security-focused UI feel approachable rather than intimidating.

Buttons and input fields share this consistent corner radius. Large containers and cards may use `rounded-lg` (1rem) to further distinguish them as primary structural blocks. Interactive elements like tags or "Copy" buttons should use the same roundedness to maintain a unified visual language.

## Components

### Buttons
Buttons are solid and high-contrast. The primary button uses the `primary_color` with white text. Secondary buttons use a `surface-border` outline or a subtle tonal shift from the background. Interaction states (hover/active) should be represented by a 10% darkening of the fill.

### Input Fields
Inputs utilize the `body-md` type scale. They feature a 1px border that shifts to the primary color upon focus. Labels are positioned above the field using `label-md` for maximum clarity.

### Cards
Cards are the primary container for data entries. They feature white backgrounds, a 1px `surface-border`, and `rounded-lg` corners. Padding inside cards should follow the `stack-md` or `stack-lg` rules depending on content density.

### Lists & Items
Lists use horizontal dividers in `surface-border`. Each list item should have a clear hover state using a subtle tint of the primary color at 5% opacity.

### Chips & Badges
Small, rounded elements used for status (e.g., "High Strength", "Secure"). These should use a low-saturation background of the status color (success/warning/error) with high-contrast text for accessibility.