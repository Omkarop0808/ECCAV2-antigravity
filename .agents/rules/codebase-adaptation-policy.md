# Autonomous Codebase Adaptation & Decision Protocol

A comprehensive operational standard that instructs AI agents how to analyze, adapt to, and make optimal engineering decisions in ANY codebase (fresh start, legacy brownfield, design-to-code, or production incident).

---

## 1. Phase 0: Environment & Stack Triaging

Before generating code or proposing architectural changes, the agent must perform stack detection in the target workspace:

1. **Detect Stack Manifest:** Check for `package.json`, `pyproject.toml`, `requirements.txt`, `Cargo.toml`, `go.mod`, or `pom.xml`.
2. **Identify Package Manager:** Detect whether the project uses `pnpm`, `npm`, `yarn`, `bun`, `uv`, or `poetry`. Never execute `npm install` in a `pnpm` or `yarn` workspace.
3. **Discover Test & Build Harness:** Find existing test scripts (`npm test`, `pytest`, `cargo test`, `vitest`) and build commands (`vite build`, `tsc`, `next build`).
4. **Determine Architecture Paradigm:** Identify whether the project is a Next.js App Router, Vite SPA, FastAPI backend, microservice, or CLI tool.

---

## 2. Situation-Specific Decision Matrix

The agent must classify the project situation and adapt its operating strategy accordingly:

| Codebase Situation | Observed Environment | Autonomous Strategy to Adopt |
| :--- | :--- | :--- |
| **A. Greenfield (Fresh Start / 0 to 1)** | Empty directory or minimal scaffold | Scaffold clean, modular directory structure. Set up testing framework early (`pytest` or `vitest`). Use `impeccable` to establish 4–6 design tokens upfront. |
| **B. Brownfield (Large / Legacy / Monorepo)** | Existing multi-file codebase with established patterns | **Surgical changes only.** Mirror existing naming conventions (camelCase vs snake_case). Run `gsd-graphify` to map dependencies without burning context. Never perform drive-by refactoring. |
| **C. Design-to-Code (Figma / PSD / Mockup)** | User provides image, screenshot, or UI spec | Activate `impeccable` + `frontend-design`. Extract exact color tokens, concentric radii (`r_inner = r_outer - padding`), and typographic scales. Avoid generic AI templates. |
| **D. 3D / Realtime / WebGPU** | Three.js, R3F, Canvas, WebGL/WebGPU | Activate `threejs-tsl-webgpu`. Clamp DPR (`Math.min(window.devicePixelRatio, 2)`). Ensure comprehensive memory cleanup (`geometry.dispose()`, `material.dispose()`). |
| **E. Incident / Bug Fix** | Failing test, runtime crash, unhandled exception | Activate `systematic-debugging`. Formulate a falsifiable hypothesis, isolate the exact root cause, and apply a minimal surgical fix with reproduction test proof. |

---

## 3. Pattern Matching & Style Preservation

- **Never Impose Foreign Paradigms:**
  - Do not introduce class-based components in modern React hooks codebases.
  - Do not introduce raw SQL string concatenation in ORM (Prisma/SQLAlchemy) codebases.
  - Do not introduce synchronous blocking I/O (`requests.get`) into async (`async def`) event loops.
- **Respect Existing Formatting:** Match the codebase's existing indentation (spaces vs tabs), quote preferences, trailing commas, and docstring formats.
- **Dependency Conservatism:** Prefer standard library solutions and established project utilities before introducing new third-party dependencies.

---

## 4. Verification & Evidence Mandate

Regardless of codebase type, no task is complete until verified against the project's actual toolchain:

1. **Syntax & Type Check:** Run `tsc --noEmit`, `mypy`, or language linter if present.
2. **Automated Tests:** Execute the relevant unit or regression test suite.
3. **Build Integrity:** Run the project build command (`npm run build`, `vite build`) to confirm zero bundling errors.
4. **Concrete Evidence:** Present the terminal output proof in the final response.
