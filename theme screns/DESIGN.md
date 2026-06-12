---
name: Kinetic Event OS
colors:
  surface: '#f8f9fb'
  surface-dim: '#d9dadc'
  surface-bright: '#f8f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f6'
  surface-container: '#edeef0'
  surface-container-high: '#e7e8ea'
  surface-container-highest: '#e1e2e4'
  on-surface: '#191c1e'
  on-surface-variant: '#46464c'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f3'
  outline: '#76777c'
  outline-variant: '#c7c6cc'
  surface-tint: '#5a5e6c'
  primary: '#040711'
  on-primary: '#ffffff'
  primary-container: '#1b1f2b'
  on-primary-container: '#838695'
  inverse-primary: '#c3c6d6'
  secondary: '#735c00'
  on-secondary: '#ffffff'
  secondary-container: '#fcd34d'
  on-secondary-container: '#725b00'
  tertiary: '#060808'
  on-tertiary: '#ffffff'
  tertiary-container: '#1e2020'
  on-tertiary-container: '#868788'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dfe2f3'
  primary-fixed-dim: '#c3c6d6'
  on-primary-fixed: '#171b27'
  on-primary-fixed-variant: '#434654'
  secondary-fixed: '#ffe086'
  secondary-fixed-dim: '#eac33e'
  on-secondary-fixed: '#231b00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#f8f9fb'
  on-background: '#191c1e'
  surface-variant: '#e1e2e4'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 64px
    fontWeight: '900'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 40px
    fontWeight: '800'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '800'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
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
    fontWeight: '400'
    lineHeight: '1.6'
  label-bold:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
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
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

This design system is built on the principles of **Kinetic Neo-Brutalism**. It is designed for high-energy event management, capturing the excitement of live experiences while maintaining the structural integrity of an "operating system." The aesthetic prioritizes clarity through heavy-handed strokes, high-contrast color blocking, and a sense of physical weight.

The brand personality is authoritative yet vibrant—treating every interaction as a "pass" to something bigger. It rejects the softness of typical SaaS interfaces in favor of bold geometry and intentional "loudness." It targets event organizers and attendees who value efficiency but want a platform that feels as dynamic as the events they produce.

## Colors

The palette is restricted to a high-impact trio. **Bold Navy (#1B1F2B)** serves as the primary structural color, used for borders, heavy shadows, and typography to provide a grounded, professional feel. **Vibrant Yellow (#FCD34D)** is the kinetic driver, used for calls-to-action, highlights, and active states to inject energy. **Crisp White** provides the necessary breathing room and "clean" canvas.

Border colors should almost exclusively use the Navy or pure Black to maintain the Neo-Brutalism aesthetic. Large surfaces can utilize the Yellow for "sticker-like" visual interest.

## Typography

The design system exclusively utilizes **Montserrat** to achieve a geometric, modern, and high-impact feel. 

- **Headlines:** Use heavy weights (800-900) for "Display" and "Headline" roles. These should feel like physical posters—tight tracking and significant weight.
- **Labels:** Use uppercase for functional labels (Forgot Password, Create Account) to reinforce the industrial, ticket-like aesthetic.
- **Hierarchy:** Contrast is achieved through weight jumps rather than just size jumps.

## Layout & Spacing

The layout follows a **Fluid Grid** model with strict 8px incremental spacing. 

- **Desktop:** A 12-column grid with generous 64px outer margins to allow the "Neo-Brutalism" cards to breathe. 
- **Mobile:** A 4-column grid with 16px margins. 
- **Rhythm:** Elements should feel "stacked." Use 24px (md) spacing between related components and 48px (lg) between distinct sections.
- **Alignment:** Content is typically center-aligned for login/splash views, but switches to left-aligned for data-heavy dashboard views.

## Elevation & Depth

In this design system, depth is not simulated with light and blur; it is represented through **Hard Shadows and Thick Borders.**

1.  **Hard Shadows:** Use "offset" shadows rather than blurs. A card should have a 4px or 8px offset shadow in the Primary Navy color (#1B1F2B) at 100% opacity.
2.  **Stroke Weight:** All interactive containers must have a minimum 2px solid border. Primary containers or "hero" elements use a 3px or 4px border.
3.  **Tonal Stacking:** Use the "Stripe" background pattern (alternating Navy/Yellow/White) as the lowest layer, with White or Yellow containers floating above it via hard offsets.

## Shapes

While the style is Brutalist, we use **Rounded (0.5rem)** corners to keep the UI approachable and contemporary. 

- **Standard Containers:** 16px (1rem) corner radius.
- **Buttons & Inputs:** 8px (0.5rem) corner radius.
- **Decorative Elements:** Occasional use of 100% round (pills) for status tags or "passes."

The combination of thick black borders and rounded corners creates a "sticker" or "physical badge" aesthetic.

## Components

### Buttons
- **Primary:** Vibrant Yellow background, 2px Navy border, 4px Hard Navy shadow. Text in Bold Navy.
- **Secondary:** White background, 2px Navy border, no shadow (until hover).
- **Interaction:** On click, the button should "press" down by removing the shadow offset and moving the element 4px down/right.

### Input Fields
- **Container:** White or Yellow background with a 2px Navy border.
- **Typography:** Placeholder text in Navy (50% opacity), user text in Navy (100% Bold).
- **Active State:** The border weight increases to 3px, and the field gains a subtle 2px hard shadow.

### Cards
- Always framed in a 2px or 3px Navy border.
- Use White for content-heavy cards and Yellow for highlight/promo cards.
- Header sections of cards should be separated by a solid horizontal 2px line.

### Chips & Tags
- Rectangular with 4px radius. 
- High contrast background-to-text ratio (e.g., Navy tag with White text).

### Lists
- Separated by thick 2px dividers. 
- Each list item should have a hover state that turns the background to Yellow.