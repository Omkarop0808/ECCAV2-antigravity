# High-Aesthetic Web Design & Interactive 3D Experience Standards

These standards govern UI/UX engineering, visual design hierarchy, glassmorphism, and 3D WebGL scenes.

---

## 1. Visual Hierarchy & Deep Canvas Palette

- **Canvas:** Never use stark, unstyled backgrounds (plain `#000` or `#fff`). Use rich, atmospheric midnight dark palettes (`#0b0f19`, `#111827`, `#0f172a`) with subtle radial glow highlights or grid backdrops.
- **Accents:** Use curated high-contrast cyber colors:
  - Electric Lime: `#c2ef4e` / `#a3e635` (Active states, safe telemetry)
  - Cyber Cyan: `#00f5ff` / `#38bdf8` (Network packets, streaming data)
  - Threat Amber: `#f59e0b` / `#fbbf24` (Medium/High alerts)
  - Critical Crimson: `#ef4444` / `#f43f5e` (Security breaches, canary trips)

## 2. Liquid Glass & Concentric Surfaces

- Implement multi-layered frosted glass panels: `backdrop-blur-xl bg-slate-900/60 border border-slate-700/50`.
- **Concentric Radius Rule:**

```text
outer_radius = inner_radius + padding
```

- Use 1px subtle hairline borders rather than heavy outer lines.
- Always apply `text-wrap: balance` to headings and `font-variant-numeric: tabular-nums` to updating metrics, timestamps, and packet rates.

## 3. Interactive 3D WebGL & R3F Standards

- **Resource Ownership:** Always dispose of Three.js geometries, materials, textures, and render targets when components unmount.
- **Render Loop Discipline:** Use `useFrame` for continuous animations (rotations, orbiting curves, particle drifts); avoid unnecessary React state updates inside the render loop.
- **Pointer Picking & Raycasting:** Optimize raycasting by testing bounding spheres or dedicated collision proxy meshes rather than complex full-detail geometries.
- **Responsive Camera:** Adapt camera FOV and distance to viewport width to prevent clipping on mobile or narrow windows.
