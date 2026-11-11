---
name: Oz Coastal Surf
colors:
  surface: '#fff9ed'
  surface-dim: '#e0d9ca'
  surface-bright: '#fff9ed'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#faf3e3'
  surface-container: '#f4eddd'
  surface-container-high: '#efe8d8'
  surface-container-highest: '#e9e2d2'
  on-surface: '#1e1c12'
  on-surface-variant: '#46464c'
  inverse-surface: '#333026'
  inverse-on-surface: '#f7f0e0'
  outline: '#77767c'
  outline-variant: '#c7c5cc'
  surface-tint: '#5d5d6b'
  primary: '#363744'
  on-primary: '#ffffff'
  primary-container: '#4d4e5b'
  on-primary-container: '#c0c0cf'
  inverse-primary: '#c5c5d5'
  secondary: '#8f4d27'
  on-secondary: '#ffffff'
  secondary-container: '#fda77a'
  on-secondary-container: '#773a16'
  tertiary: '#003f41'
  on-tertiary: '#ffffff'
  tertiary-container: '#1f5759'
  on-tertiary-container: '#95cbcd'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e1f1'
  primary-fixed-dim: '#c5c5d5'
  on-primary-fixed: '#191b26'
  on-primary-fixed-variant: '#454653'
  secondary-fixed: '#ffdbcb'
  secondary-fixed-dim: '#ffb691'
  on-secondary-fixed: '#341100'
  on-secondary-fixed-variant: '#723612'
  tertiary-fixed: '#b5ecee'
  tertiary-fixed-dim: '#9ad0d2'
  on-tertiary-fixed: '#002021'
  on-tertiary-fixed-variant: '#134e51'
  background: '#fff9ed'
  on-background: '#1e1c12'
  surface-variant: '#e9e2d2'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
  title-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.25rem
---

## Brand & Style

This design system channels the sun-soaked, salt-aired ease of Australian surf culture—blending functional rental logistics with effortless coastal hospitality. The personality is grounded, breezy, adventurous, and distinctly approachable. It targets local surfers, traveling wave chasers, and casual beachgoers seeking equipment rentals, tide condition updates, and direct surf shop concierge support.

The visual style combines **Minimalism** and **Tactile Coastal Utility**: generous negative space evocative of open beaches, warm sandstone undertones, soft organic pill containers, and deeply grounded coastal slate tones. Interactions feel natural and tactile rather than hyper-digital, steering clear of stark neon accents in favor of baked earth, sunlit gold, and weathered ocean minerals.

## Colors

The palette is pulled directly from the coastal terrain and beachside workshop surfaces:

- **Primary Slate Navy (`#4D4E5B`)**: Anchors primary interface headers, brand text, dark message bubbles, and primary interactive containers.
- **Secondary Warm Terracotta / Surf Leather (`#8D4B26`)**: Direct callout color, active user speech bubbles, primary action highlights, and focused rental confirmations.
- **Tertiary Muted Seafoam (`#5A8F91`)**: Oceanic status indicators (e.g., "online", swell conditions, gear availability badges, active states).
- **Sun Gold Accent (`#DF9B38`)**: Micro-accents, rating stars, alert chips, and rental promo highlights.
- **Neutral Sand Canvas (`#EFE8D8`)**: Soft, sand-toned surface base that eliminates cold digital white in favor of warm outdoor parchment.

### Role Mapping
- **Canvas / Background**: `#EFE8D8`
- **Surface Elevation High**: `#FFFFFF` (for bright card containers and popovers)
- **Surface Elevation Contrast**: `#4D4E5B` (inverted toolbars, chat header banners, dark utility panels)
- **Text on Sand**: `#2D2E36` (high-contrast deep charcoal derived from slate)
- **Text on Slate / Terracotta**: `#FFFFFF` / `#F8F5EE`
- **Subtle Stroke / Dividers**: `rgba(77, 78, 91, 0.12)`

## Typography

Typography relies on **Plus Jakarta Sans** across all levels to balance clean modern utility with rounded, friendly humanist geometry.

- **Headlines & Display**: Strong weights (600/700) with slight negative tracking create grounded, punchy signage suitable for surfboard spec sheets, board categories (Fish, Longboard, High Performance), and beach location banners.
- **Body & Chat Copy**: Set at 14px to 16px with comfortable line height (1.45–1.5x) to maintain effortless legibility across conversational UI bubbles and inventory descriptions.
- **Labels & Micro-copy**: Elevated slightly in letter spacing for badges, swell heights, and quick status pills.

## Layout & Spacing

The layout model uses a responsive fluid grid system designed for effortless handheld booking at the beach as well as relaxed desktop trip planning:

- **Desktop (≥ 1024px)**: 12-column grid, max content constraint of 1200px, 32px (`margin`) outer canvas margins, and 20px (`gutter`) column gutters.
- **Tablet (768px - 1023px)**: 8-column grid with 24px outer margins and 16px gutters.
- **Mobile (< 768px)**: 4-column layout, 16px (`margin-mobile`) margins, and 12px (`gutter-mobile`) gutters. 

Chat widgets, booking panels, and gear showcases rely on relaxed internal component padding (`space-md` to `space-lg`) to evoke open, uncluttered breathing room.

## Elevation & Depth

This design system favors **tonal layering** and **warm ambient shadows** over synthetic neon glow or deep digital drops:

- **Layering**: Depth is achieved by placing deep slate navy (`#4D4E5B`) or crisp white containers onto the foundational warm sand background (`#EFE8D8`). 
- **Ambient Shadows**: When surfaces lift (e.g., interactive gear preview cards, floating input fields, active dialogs), shadows feature high blur radius, minimal spread, and a slight terracotta or warm slate tint: `box-shadow: 0 8px 24px -4px rgba(77, 78, 91, 0.12), 0 2px 6px -1px rgba(141, 75, 38, 0.06)`.
- **Borders & Dividers**: Low-contrast strokes using translucent slate `rgba(77, 78, 91, 0.1)` keep surfaces clearly demarcated without rigid visual barriers.

## Shapes

The shape system adopts a relaxed curvature (`roundedness: 2`), reflecting the smooth lines of surfboard rails, polished beach pebbles, and conversational UI bubbles:

- **Default Elements & Cards**: 8px (`0.5rem`) to 16px (`1rem`) border radius.
- **Chat Bubbles & Floating Input Bars**: Soft, pronounced corner rounding (16px to 24px) for human warmth and friendly cadence.
- **Badges, Buttons & Avatars**: Full pill curves (`9999px`) for touch targets, filter tags, and quick-reply chips.

## Components

### Buttons
- **Primary Action (Rental & Booking)**: Background in rich terracotta `#8D4B26`, text in `#FFFFFF`, pill-shaped (`rounded-full`), height 44px (48px mobile), subtle lift on hover.
- **Secondary Action (Inquire / Chat)**: Background in slate `#4D4E5B`, text in `#FFFFFF`, pill-shaped.
- **Ghost / Tertiary**: Sand canvas background with a 1px border of `rgba(77, 78, 91, 0.25)` and text in `#4D4E5B`.

### Chat & Message Bubbles
- **Bot / Staff Concierge**: Solid Slate Navy `#4D4E5B` bubble with white typography, rounded 16px corners, anchored on the left accompanied by a 36px seafoam or slate brand avatar.
- **Customer / User**: Solid Terracotta `#8D4B26` bubble with white typography, rounded 16px corners, anchored on the right accompanied by customer avatar.
- **Chat Input Bar**: Rounded pill container (`rounded-full`), slate `#4D4E5B` surface with muted placeholder text (`rgba(255, 255, 255, 0.6)`) and an integrated terracotta round send button.

### Chips & Filter Tags
- Used for board length, fin setup (Single, Twin, Thruster), and beach zones:
- **Default**: Sand background (`#EFE8D8`) with thin slate border.
- **Selected**: Solid Seafoam `#5A8F91` with white text.
- **Live Status Chip**: Seafoam dot with 8px diameter and label `#5A8F91` indicating "In Stock" or "Surf Guide Online".

### Cards (Surfboard & Gear Inventory)
- Clean container with white or sand-tone background, 16px corner radius, 1px subtle slate stroke.
- Image area showcasing board profile with warm natural lighting.
- Card footers feature gold accent badges for customer rating (`#DF9B38`) and clear terracotta rate tags (e.g., "$45/day").

### Input Fields
- Enclosed with 12px corner radius or pill styles, background in `#FFFFFF` or translucent sand overlay, border `1.5px solid rgba(77, 78, 91, 0.2)`. Active focus transitions border to `#5A8F91` seafoam with zero harsh glow.