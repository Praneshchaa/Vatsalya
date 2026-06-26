# Vatsalya Sewa Griha — Design System

> **Where care meets joy.**
> A warm, community-first, dignified brand for an elder care **home** in Kumaripati Ward-5, Lalitpur, Nepal. A home, not a hospital. A community, not a facility.

This design system lets design and engineering teams produce on-brand interfaces, marketing, and assets for Vatsalya Sewa Griha — for production or throwaway mocks.

## Sources
- `uploads/vatsalya_design_system.md` — the original brand spec (colors, type, tone & voice). This is the single source of truth provided; there was **no codebase, Figma file, or photography**. Everything here is built faithfully from that spec.
- Website referenced in the spec: `vatsalyasewagriha.com` (not accessed — recorded for the reader who may have access).

## Who we speak to
The audience is the **adult child** of an elder — the decision maker — not the elder. Speak to their guilt and reframe it as love: choosing Vatsalya is an act of care, never abandonment.

---

## Index / manifest

**Root**
- `styles.css` — global entry point (consumers link this one file). `@import` lines only.
- `readme.md` — this guide.
- `SKILL.md` — Agent-Skill manifest for downloadable use.

**`tokens/`** — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `base.css`

**`assets/`** — official logos: `logo-horizontal.png` (primary lockup), `logo-stacked.png` (vertical), `logo-white.png` (reverse, for dark backgrounds), `logo-black.jpg` (monochrome). The mark is a tree whose gold trunk forms a house, sheltering two elders — one knitting, one waving — under green leaves.

**`components/core/`** — reusable React primitives:
`Button`, `Badge`, `Card`, `Avatar`, `Input`, `Switch` (each with `.jsx` + `.d.ts` + `.prompt.md`; one `core.card.html` specimen).

**`guidelines/`** — foundation specimen cards (Colors, Type, Spacing, Brand) shown in the Design System tab.

**`ui_kits/website/`** — full marketing homepage recreation (`index.html` + section JSX). See its `README.md`.

---

## CONTENT FUNDAMENTALS

**Voice:** every word feels like it comes from a caring family member — warm, honest, never a medical brochure.

- **Person:** Write **to "you"** (the adult child), **about "they/them"** (the parents). "While *you're* at work, *they're* never on their own."
- **Casing:** **Sentence case, always.** Never ALL CAPS, never Title Case In Every Word. Even buttons: "Book a visit", not "Book A Visit".
- **Sentence length:** Short. One idea per sentence.
- **Bilingual:** Mix Nepali and English naturally — this is how the audience actually thinks and speaks (e.g. "Aama has friends and warm food", "chai and the morning paper"). Devanagari sets in Noto Sans Devanagari at the same size scale.
- **Emotional register:** Honest and warm, never dramatic or manipulative. Reframe guilt as love.
- **Emoji:** **Not used.** The warmth comes from words and photography, not emoji.

**Words to USE:** Home · Family · Community · Together · Joy · Warmth · Dignity · Respect · Care · Safe · Comfortable · Active · Engaged · Happy · Belonging · Peace

**Words to AVOID:** Facility · Institution · Patient · Admitted · Case · Nursing home · Medical · Clinical · Bedridden · Abandoned · Alone · Burden

**Before → After**
| Avoid | Use instead |
|---|---|
| "Your parents need nursing care" | "Your parents deserve company and joy every day" |
| "Admitted residents receive medical attention" | "Everyone here is looked after — and they have friends" |
| "State-of-the-art elder care facility" | "A real home in Kumaripati, Lalitpur" |
| "Don't leave your parents alone" | "While you're at work, they're never on their own" |

---

## VISUAL FOUNDATIONS

**Overall vibe:** warm, soft, unhurried, dignified. Sunlight-on-a-courtyard, not fluorescent-on-a-ward.

**Color**
- **Primary — Forest Green** (`#2D7A3A`): grounding, alive, growing. Buttons, links, icons, key UI. Hover deepens to `#246731`/`#1f5a29`.
- **Secondary — Warm Gold** (`#E8A020`): joy and warmth. CTAs, highlights, featured elements. The gold is used sparingly as the "joy" accent.
- **Neutrals:** warm-leaning greys — surface `#fafafa`, background `#f2f2f2`, text `#1a1a1a`, muted `#6b6b6b`, border `#e5e5e5`.
- **Tinted surfaces:** `--color-primary-50` (pale green) and `--color-secondary-50` (pale gold) for soft section fills — this is the dominant background treatment.
- **Danger** is a **warm terracotta** (`#c0492f`), never a clinical red — even errors stay human.

**Type**
- **Poppins** for everything (rounded, friendly, humane). **Noto Sans Devanagari** for Nepali.
- **Two weights only: 400 & 500.** Never 600/700 — too heavy, too corporate.
- Scale: H1 32 / H2 22 / H3 16 / body 15 / caption 13. Body line-height a generous **1.7**; body max width **640px**.
- Slight negative tracking on large headings; otherwise neutral.

**Spacing & layout**
- 4px base grid (`--space-1`…`--space-9`). Generous whitespace; sections breathe (64–96px vertical padding).
- Container max `1120px`, 24px gutters.

**Corners & cards**
- Soft, friendly radii: inputs/tags 8px, buttons 12px, **cards 16px**, feature panels 24px, pills 999px.
- Cards: white surface, 1px `#e5e5e5` border, soft **warm-tinted** shadow (`--shadow-md`), optional 4px top accent stripe (green or gold).

**Shadows**
- Warm-tinted (green-black `rgba(15,48,21,…)`), soft and low-spread — gentle elevation, never harsh. A dedicated `--shadow-gold` glow sits under gold CTAs.

**Backgrounds**
- Mostly flat tinted fills and white. One soft **vertical gradient** in the hero (pale green → page). Forest-green and gold full-bleed bands break up long pages. **No** heavy gradients, no noise/grain, no busy patterns. Photography (warm, candid, real people) carries the emotion — use `<image-slot>` placeholders until real photos arrive.

**Motion**
- Calm and soft. `--ease-soft` `cubic-bezier(0.32,0.72,0,1)`, 140–220ms. Fades and gentle lifts. **No bounces**, no springy overshoot.

**Interaction states**
- **Hover:** buttons darken one step; cards lift `translateY(-2px)` + deepen shadow; nav items get a pale-green pill.
- **Press:** subtle `scale(0.97)` on buttons. No color flash.
- **Focus:** 3px `--focus-ring` (pale green) outline, 2px offset — always visible, accessible.
- **Disabled:** 45% opacity, `not-allowed`.

**Transparency / blur**
- Used once, intentionally: the sticky header is `rgba(255,255,255,0.86)` + `backdrop-filter: blur(10px)`. Otherwise surfaces are solid.

**Imagery vibe**
- Warm, candid, natural light. Real elders and families, togetherness, hands, food, garden, music. Not stock-clinical, not black & white, not cold.

---

## ICONOGRAPHY

The provided spec did **not** define an icon set, and no icon assets, font, or sprite were supplied.

- **Recommendation / substitution (FLAGGED):** use **[Lucide](https://lucide.dev)** via CDN — its rounded stroke caps and ~1.75px weight match Poppins' humane, friendly character. This is a substitution, not a confirmed brand choice. `<script src="https://unpkg.com/lucide@latest"></script>` then `lucide.createIcons()`, or the React package.
- **Style rules if/when adopted:** line icons (not filled), stroke ~1.75–2px, rounded caps & joins, `currentColor` so they inherit text color (forest green on light, white on dark). Size 16–24px inline with text.
- **Emoji:** not used anywhere in the brand.
- **Unicode marks:** a simple `✓` is used for the form success tick; status is otherwise shown with small colored dots, not glyphs.
- **Logo (official):** the tree-house-elders mark in `assets/`. The motif — a sheltering tree, a home, and elders enjoying company — is the heart of the brand; lean on it for empty states, watermarks, and section dividers rather than inventing new illustration.

> ⚠️ **Photography still needed.** Logos are now the real brand assets. Please share real photos of the home and members so the marketing site can replace its `<image-slot>` placeholders. The icon set (Lucide) remains a substitution pending confirmation.

---

## Using this system

Link the global stylesheet, then use tokens and components:

```html
<link rel="stylesheet" href="styles.css" />
```

```jsx
const { Button, Card, Badge } = window.VatsalyaSewaGrihaDesignSystem_1b6a10;
<Button variant="gold" size="lg">Book a visit</Button>
```

All colors, spacing, type, radii, and shadows are CSS custom properties (`--color-primary-500`, `--space-5`, `--radius-lg`, …). Reference tokens — never hard-code hex values.
