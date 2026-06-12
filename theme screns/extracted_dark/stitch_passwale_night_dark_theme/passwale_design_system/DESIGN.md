---
name: Passwale Design System
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#37393a'
  surface-container-lowest: '#0c0f0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#282a2b'
  surface-container-highest: '#333535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#c6c6cf'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#8f9099'
  outline-variant: '#45464e'
  surface-tint: '#b9c5f2'
  primary: '#b9c5f2'
  on-primary: '#222f53'
  primary-container: '#0d1b3e'
  on-primary-container: '#7784ad'
  inverse-primary: '#515d84'
  secondary: '#ffe083'
  on-secondary: '#3c2f00'
  secondary-container: '#eec200'
  on-secondary-container: '#645000'
  tertiary: '#ccc6b6'
  on-tertiary: '#333025'
  tertiary-container: '#1f1d13'
  on-tertiary-container: '#898577'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b9c5f2'
  on-primary-fixed: '#0b1a3d'
  on-primary-fixed-variant: '#39456b'
  secondary-fixed: '#ffe083'
  secondary-fixed-dim: '#eec200'
  on-secondary-fixed: '#231b00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#e9e2d2'
  tertiary-fixed-dim: '#ccc6b6'
  on-tertiary-fixed: '#1e1c12'
  on-tertiary-fixed-variant: '#4a473b'
  background: '#121414'
  on-background: '#e2e2e2'
  surface-variant: '#333535'
typography:
  display-xl:
    fontFamily: Anton
    fontSize: 80px
    fontWeight: '400'
    lineHeight: 80px
    letterSpacing: 0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 52px
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
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
  label-mono:
    fontFamily: Space Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.1em
  cta:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  grid-margin: 20px
  grid-gutter: 16px
---

## Brand & Style
The design system captures the raw, kinetic energy of the Indian live events scene—from underground techno bunkers to sprawling Garba grounds. The brand personality is unapologetically bold, cultural, and youthful, positioned as the definitive gateway to high-octane experiences.

The visual style is a "Mixed Morphism" approach. It rejects flat minimalism in favor of a maximalist, multi-layered aesthetic that mimics physical festival collateral. The system leverages:
- **Glassmorphism** for overlays and "backstage pass" elements.
- **Neomorphism** for tactile controls set against deep navy backgrounds.
- **Skeuomorphism** for realistic ticket textures, including perforations and holographic foils.
- **Claymorphism** for playful, puffy 3D iconography that adds a sense of friendliness to the "underground" grit.

The interface is underpinned by a dynamic, diagonal striped background logic (15-degree tilt) that creates a constant sense of forward motion and rhythmic intensity.

## Colors
The color palette is built on a high-contrast foundation of Deep Navy and Electric Yellow. This combination ensures maximum legibility and "vibe" consistency across high-energy environments like concert venues or outdoor festivals.

- **Primary Navy (#0D1B3E):** Used for the base environment and neomorphic "wells."
- **Accent Yellow (#FACC15):** The "action" color. Used for primary CTAs, highlight text, and interactive focal points.
- **Pure White & Soft Cream:** Used for high-priority information and textural depth, respectively.
- **Scene Palette:** These are event-specific identifiers. When a user navigates to a specific category (e.g., Techno), the UI accents, glass blurs, and ticket highlights transition to the corresponding scene color to provide instant cognitive mapping.

## Typography
Typography is the primary driver of the "Festival Poster" aesthetic.
- **Anton** is reserved for massive, impactful hero headlines. It should feel loud and urgent.
- **Space Grotesk** handles the secondary hierarchy, providing a technical yet expressive feel. 
- **Inter** provides high-readability for event descriptions and transactional details, ensuring the "cool" factor doesn't sacrifice usability.
- **Space Mono** is used for "technical" data points (Dates, QR code labels, Seat numbers) to evoke a retro ticketing system or boarding pass feel.

**Strict Rule:** All headers, sub-headers, and call-to-action buttons must be set in ALL CAPS to maintain the high-energy brand voice.

## Layout & Spacing
The layout follows a **Fluid Grid** model with high-density spacing. 
- **The Diagonal Grid:** While content aligns to a standard 12-column grid, the background and specific layout blocks use 15-degree diagonal slashes. Elements often "break the box" to feel less static.
- **Mobile First:** Given the youth demographic, the system prioritizes one-handed interactions.
- **Margins:** Large 40px vertical margins are used between event categories to give the "Mixed Morphism" layers room to breathe without feeling cluttered.

## Elevation & Depth
This design system uses a stack-based elevation model to organize the "Mixed Morphism" layers:

1.  **Level 0 (Base):** Deep Navy (#0D1B3E) with subtle 15-degree stripes.
2.  **Level 1 (The Pit):** Neomorphic wells. Inset shadows (15% opacity Black / 10% opacity White) carved into the navy background for input fields and passive containers.
3.  **Level 2 (The Stage):** Skeuomorphic cards. Elements that look like physical tickets with drop shadows (40% opacity Navy, 20px blur) and "paper" textures.
4.  **Level 3 (The VIP):** Glassmorphic overlays. Floating headers or navigation bars with 20px backdrop-blur and 1px Soft Cream borders.
5.  **Level 4 (The Spotlight):** Claymorphic 3D icons. Puffy, high-specular elements that float above everything else, casting soft, colored shadows (tinted by the Scene Colors).

## Shapes
The shape language is a mix of industrial geometry and organic softness. 
- **Standard UI elements** (Inputs, small buttons) use `rounded-md` (8px).
- **Primary Cards and Ticket containers** use `rounded-xl` (24px) to emphasize the "object-like" quality of a physical pass.
- **The "Punch-Out"**: Interactive ticket components should feature semi-circle notches on the sides to mimic a perforated tear-off stub.

## Components
- **The "Power Pass" Button:** Primary CTAs use Accent Yellow (#FACC15) with an Anton-style typeface. They feature a slight 3D "clay" puffiness on hover and a high-contrast black border (2px).
- **The Ticket Card:** A complex skeuomorphic component. It includes a glossy "security strip" overlay, a monospaced "Space Mono" serial number, and a physical-looking perforation line separating the QR code from the event details.
- **Glass Navigation:** A bottom-fixed navigation bar using heavy backdrop blur and Soft Cream text. Active states are indicated by a "Claymorphic" yellow dot underneath the icon.
- **Scene Chips:** Small, pill-shaped category labels (e.g., "TECHNO"). These use the Scene Colors with 20% opacity backgrounds and 100% opacity borders, creating a vibrant, neon-tube effect.
- **Input Fields:** Neomorphic "wells" that appear sunken into the Navy background. Upon focus, the border glows with the Startup Cyan (#0891B2) or the primary Accent Yellow.
- **3D Floating Icons:** Custom-rendered icons (Ticket, Location, User) that have a soft, inflated "Clay" look to add a tactile, friendly contrast to the sharp typography.