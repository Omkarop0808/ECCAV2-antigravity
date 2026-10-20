# Feature Development Workflow

An end-to-end engineering pipeline for building robust, high-craft, and thoroughly tested features.

---

## Phase 1: Brainstorming & Requirements Clarification

- **Persona:** `planner` / `architect`
- **Active Skills:** `superpowers:brainstorming`, `api-design`
- **Actions:**
  - Explore user intent and state explicit assumptions before touching any code.
  - Clarify material ambiguity and outline concrete technical tradeoffs.
  - Define upfront success criteria and measurable acceptance conditions.

---

## Phase 2: Design Direction & Craft Review

- **Persona:** `impeccable` / `a11y-architect`
- **Active Skills:** `impeccable`, `frontend-design`, `make-interfaces-feel-better`
- **Actions:**
  - Establish a cohesive token palette (4–6 named colors) and clear typographic scale.
  - Ensure layout follows concentric border-radius and responsive grid rules.
  - Check WCAG 2.2 accessibility, ARIA labels, focus states, and keyboard navigation.

---

## Phase 3: Architecture & Phase Planning

- **Persona:** `architect` / `planner`
- **Active Skills:** `gsd-plan-phase`, `gsd-graphify`
- **Actions:**
  - Query `.planning/graphs/` to navigate dependencies without burning context tokens.
  - Decompose work into discrete, single-responsibility files and modules.
  - Identify potential edge cases (empty states, race conditions, network failures).

---

## Phase 4: Test-Driven Development (TDD) Implementation

- **Persona:** `tdd-guide`
- **Active Skills:** `test-driven-development`, `fastapi-patterns` / `react-patterns`
- **Actions:**
  - **Red:** Write failing automated tests covering core logic and boundary edge cases.
  - **Green:** Implement the minimal surgical code required to make tests pass.
  - **Refactor:** Clean up structure while preserving immutability and existing style.

---

## Phase 5: Verification & Quality Gate

- **Persona:** `code-reviewer` / `silent-failure-hunter`
- **Active Skills:** `verification-before-completion`, `finishing-a-development-branch`
- **Actions:**
  - Run the full test suite (`pytest`, `npm test`, `vite build`, or typecheck).
  - Verify zero swallowed errors or unlogged catch blocks.
  - Present concrete terminal output evidence before declaring completion.
