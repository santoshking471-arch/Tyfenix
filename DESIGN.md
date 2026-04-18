# Design Brief

**Purpose**: Premium all-in-one ecommerce platform (storefront + admin dashboard) with hyper-slime aesthetic for brands seeking bold visual differentiation.

**Tone**: Maximalist, futuristic, energetic, premium-tech. Neon gradients paired with glassmorphism for depth.

**Differentiation**: Animated neon gradient borders, floating card entrance, pulsing glow on hover, organic blob background shapes. Not minimalist, not corporate—distinctly memorable.

---

## Color Palette

| Token | OKLCH | Purpose |
|-------|-------|---------|
| `--primary` | 0.68 0.25 150° | Neon green (#00ff88 equivalent), primary actions, brand highlight |
| `--secondary` | 0.62 0.28 270° | Neon purple (#b700ff equivalent), secondary actions, gradient accent |
| `--background` | 0.08 0 0 | Dark navy (#0a0e27 equivalent), page backdrop |
| `--card` | 0.12 0 0 | Darker navy, glassmorphism card surface |
| `--foreground` | 0.95 0 0 | Off-white, high contrast text |
| `--accent` | 0.75 0.22 145° | Bright lime, accent highlights, hover states |
| `--muted` | 0.2 0 0 | Subtle dark grey, secondary UI elements |
| `--destructive` | 0.55 0.22 25 | Red-orange warning/error state |

---

## Typography

| Role | Font | Scale | Weight | Usage |
|------|------|-------|--------|-------|
| Display | General Sans | 48–64px | 700 | Page headings, hero text (with gradient) |
| Body | DM Sans | 16px | 400 | Paragraphs, UI labels, forms |
| Mono | System | 14px | 400 | Code snippets, product SKUs, pricing |

Headings use gradient text: `--gradient-primary` (green→purple, 135deg).

---

## Elevation & Depth

| Zone | Surface | Border | Shadow | Purpose |
|------|---------|--------|--------|---------|
| Background | `bg-background` | None | None | Page backdrop, animated blob grid |
| Card | `glass-card` (backdrop blur 20px) | `border-white/10` | `shadow-glow-md` | Product tiles, dashboard cards |
| Hover | Same + `shadow-glow-lg` | `glow-neon-primary` | Animated pulse | Interactive states |
| Header | `bg-card` | `border-b border-white/5` | None | Navigation, sticky top |
| Footer | `bg-card/30` | `border-t border-white/5` | None | Links, copyright |

---

## Structural Zones

| Zone | Desktop | Mobile | Notes |
|------|---------|--------|-------|
| Header | Sticky top, 80px height, logo + nav + auth | Sticky top, 64px, hamburger menu | Dark navy card with white text |
| Hero | Full-width banner, gradient text heading, CTA buttons | Stack text + buttons, 100% width | Animated background blobs, floating animation |
| Product Grid | 4-col, 32px gap, hover lift + glow | 1-col, 16px gap | Glass cards, gradient border on hover |
| Admin Dashboard | 3-col grid (charts + metrics) | 1-col stack | Chart cards with accent borders |
| Footer | 4-col grid (links), 60px min height | 1-col stack, 40px | Muted text, subtle borders |

---

## Component Patterns

- **Card**: `.glass-card` + `.hover-lift` + `.float-entrance` → backdrop blur, animated entry, lift on hover
- **Button Primary**: `bg-primary` text-white rounded-2xl, hover `shadow-glow-md` scale-105
- **Button Secondary**: `border-accent` text-accent, hover `border-primary` shadow-glow-sm
- **Gradient Text**: `.glow-neon-primary` or `.glow-neon-accent` on headings
- **Input Fields**: `bg-input` border-white/10 backdrop-blur, focus ring-primary
- **Badge**: `bg-primary/20` text-primary rounded-full px-3 py-1, `.pulsing-glow` on new/alert

---

## Motion & Animation

| Animation | Duration | Easing | Applied To |
|-----------|----------|--------|------------|
| `.float-entrance` | 500ms | cubic-bezier(0.34, 1.56, 0.64, 1) | Cards on initial load |
| `.hover-lift` | 300ms | ease-out | All interactive elements |
| `.pulsing-glow` | 2s | ease-in-out, infinite | Badge/alert hover state |
| `.gradient-rotate` | 4s | linear, infinite | Gradient border accent |
| `.blob-animate` | 6s | ease-in-out, infinite | Background blob shapes |
| `.transition-smooth` | 300ms | ease-out | Standard state changes |

Orchestration: Stagger card entries by 100ms per tile (`.float-entrance` delay).

---

## Signature Detail

**Animated Gradient Borders**: Active cards display `.glow-border` with a rotating green→purple gradient border. On hover, shadow pulses between green glow and purple glow (`.pulsing-glow`). Combined with 3px lift + scale 1.02 (`.hover-lift`), creates a premium interactive feel distinctly different from flat UI.

---

## Constraints

- Avoid flat fills; prioritize depth via glassmorphism + glow shadows
- No decorative icons unless semantic (e.g., cart, user, settings)
- Neon gradients only on CTA buttons and heading text; use sparingly
- All animations must be 300–600ms for fluidity; nothing snappier or slower
- Border radius: 24–32px for large surfaces (cards, buttons); 12–16px for tight elements (badges, chips)
- Accessibility: Ensure 7:1 contrast on text; neon colors are saturated, test in WCAG tools

---

## Assets

- Fonts: General Sans (display), DM Sans (body) — copied to `/assets/fonts/`
- Images: Animated blob SVG backgrounds (via CSS gradients, no static assets needed)
- Icons: shadcn/ui + Lucide React (imported as needed)

---

## Learnings & Future Edits

- Glassmorphism + animated blobs = high visual polish but can feel overwhelming on small screens; use mobile breakpoints to simplify card elevation
- Neon gradients render beautifully on dark navy; test colors against `#0a0e27` in final QA
- Glow shadows (box-shadow with rgba) are CPU-light compared to filter blur on individual cards

