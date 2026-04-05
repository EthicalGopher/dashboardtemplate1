# Landing Page Overrides

> **PROJECT:** GopherBase
> **Generated:** 2026-04-05 11:40:35
> **Page Type:** Dashboard / Data View

> ⚠️ **IMPORTANT:** Rules in this file **override** the Master file (`design-system/MASTER.md`).
> Only deviations from the Master are documented here. For all other rules, refer to the Master.

---

## Page-Specific Rules

### Layout Overrides

- **Max Width:** 1200px (standard)
- **Layout:** Full-width sections, centered content
- **Sections:** 1. Hero with device mockup, 2. Screenshots carousel, 3. Features with icons, 4. Reviews/ratings, 5. Download CTAs

### Spacing Overrides

- No overrides — use Master spacing

### Typography Overrides

- No overrides — use Master typography

### Color Overrides

- **Strategy:** Dark/light matching app store feel. Star ratings in gold. Screenshots with device frames.

### Component Overrides

- Avoid: Use arbitrary large z-index values
- Avoid: Load everything upfront
- Avoid: No caching strategy

---

## Page-Specific Components

- No unique components for this page

---

## Recommendations

- Effects: Smooth scroll reveal, fade-in animations on hero, subtle background parallax, CTA glow/pulse effect
- Layout: Define z-index scale system (10 20 30 50)
- Performance: Lazy load below-fold images and content
- Performance: Set appropriate cache headers
- CTA Placement: Download buttons prominent (App Store + Play Store) throughout
