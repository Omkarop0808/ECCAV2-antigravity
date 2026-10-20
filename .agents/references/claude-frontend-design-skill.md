# Claude Frontend Design & Art Direction Playbook

A comprehensive guide for distinctive, intentional visual design when building new web interfaces or reshaping existing ones. Engineered to eliminate templated AI aesthetics and enforce craft excellence.

---

## 1. Grounding Designs in the Subject Matter

Approach every interface as the design lead at a studio known for giving every project a distinct visual identity that cannot be mistaken for anyone else's.

- **Identify the Vernacular:** The subject's industry, physical materials, and culture are where distinctive visual choices originate. A dashboard for aerospace telemetry requires extreme density, monospaced numeric data, and high-contrast dark modes; an e-commerce platform for boutique ceramics demands organic palettes, generous whitespace, and tactile serif typography.
- **Avoid Generic Defaults:** If a brief lacks detailed visual specs, establish an intentional point of view rather than defaulting to generic SaaS components.
- **Lead with the Hero:** The hero element is the first impression. Open with the most characteristic artifact of the domain: a live interactive simulation, a dynamic data canvas, a high-impact typographic statement, or an orchestrated animation sequence.

---

## 2. Typographic Craft & Hierarchy

Typography carries the voice and personality of the entire application.

### Core Rules

- **Limit Type Families:** Use at most one or two type families. If using two, ensure strong contrast (e.g., an expressive display serif paired with a crisp neutral sans-serif).
- **Proportional Line Lengths:** Keep body text line lengths under 75–80 characters. Give serif body text slightly more line-height (1.6–1.7) than sans-serif (1.4–1.5).
- **Intentional Type Scales:** Define an explicit typographic scale based on classic proportions (12px, 14px, 16px, 20px, 24px, 32px, 48px, 64px) with deliberate weights, tracking, and leading.

### AI Typographic Tells to Eliminate

- Never accent just a single word in a headline with italic, bold, or an artificial neon gradient.
- Avoid excessive all-caps eyebrow labels (`FEATURE // 01`) above every heading.
- Avoid arbitrary spaced em-dashes (`WORD — fragment`) and unnecessary bullet separators (`A · B · C`).
- Do not append generic `→` arrows to every button and link.

---

## 3. Color Systems & Visual Palettes

### Strategic Palette Construction

Build palettes from 4 to 6 deliberate, named color tokens:

1. **Background Layer (`bg-base`):** Deep charcoal, warm off-white, or custom tinted neutral.
2. **Surface Layer (`bg-surface`):** Elevated container background providing clear visual separation.
3. **Primary Text (`text-primary`):** Maximum contrast reading color.
4. **Secondary Text (`text-muted`):** Supporting metadata and structural labels.
5. **Brand Accent (`accent`):** High-impact signature color used sparingly.
6. **Subtle Rim / Border (`border-subtle`):** Defined container edges with optical hierarchy.

### Cliché Palettes to Avoid

- The "Warm Clay / Terracotta" default (#F4F1EA background with #D97757 orange/clay accent).
- The "Acid Hacker" default (#000000 background with saturated neon green #00FF66).
- The "SaaS Card Kit": identical rounded cards, uniform border-radius on every element, and soft blurry grey shadows (`rgba(0, 0, 0, 0.1)`).

---

## 4. Layout, Structural Devices & Visual Density

Visual structure communicates hierarchy and relationship:

- **Structural Markers as Information:** Use outlines, borders, dividers, and numbering only when they convey real data. Numbered markers (01, 02, 03) belong exclusively on true sequential steps, not random feature lists.
- **Concentric Radii:** Inner elements must have a smaller border-radius than their parent containers:
  `r_inner = r_outer - padding`.
- **Rhythm & Spacing:** Use a strict 4px/8px spatial grid. Ensure component padding is proportional to viewport density and typographic scale.

---

## 5. Deliberate Motion & Restraint

- **Spend Boldness in One Place:** Pick one memorable moment on the page — an interactive hero moment, an entrance sequence, or a fluid transition — and keep the rest of the interface quiet and disciplined.
- **Response-Driven Motion:** Favor motion that responds directly to user actions (opening modals, expanding accordions, confirming states) over unsolicited loops.
- **Respect User Accessibility:** Always include `@media (prefers-reduced-motion: reduce)` to disable non-essential animations.

---

## 6. Copywriting as Design Content

Words in an interface are functional architecture, not decoration:

- **Active CTAs:** Buttons describe exact outcomes ("Deploy Cluster", "Download Artifact") rather than ambiguous verbs ("Submit", "Click Here").
- **Clear Direction on Failure:** Error messages specify what failed and how to resolve it without apologizing or using system jargon.
- **Direct Labeling:** Name controls by what the user understands in simple terms, not by internal backend naming conventions.
