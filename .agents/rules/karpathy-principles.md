# Karpathy-Style Engineering Principles

Core engineering operating model to eliminate common AI coding mistakes, prevent speculative bloat, and maintain extreme code quality.

---

## 1. Think Before Coding

- **State Assumptions Explicitly:** Before touching code, write down what is assumed about the environment, libraries, and user intent.
- **Clarify Material Ambiguity:** If an architectural choice has divergent tradeoffs, present concrete options rather than making assumptions.
- **Identify Edge Cases Early:** Consider null states, empty collections, network timeouts, disconnections, and concurrency races.

---

## 2. Simplicity First

- **Smallest Working Solution:** Favor the minimal, readable, maintainable implementation that solves the problem.
- **No Speculative Bloat:** Do not add configuration flags, abstract factory layers, or future-proofing hooks that are not strictly requested or needed.
- **Prefer Standard Libraries & Built-ins:** Avoid adding new third-party npm or pip dependencies when clean native implementations exist.

---

## 3. Surgical Changes

- **Scoped Edits:** Touch only the lines strictly necessary to fulfill the requirement or fix the bug.
- **Preserve Existing Style:** Respect the codebase's existing indentation, naming conventions, and docstrings.
- **No Drive-by Refactoring:** Do not reformat or clean up unrelated code during a bugfix; keep diffs clean, readable, and easy to review.

---

## 4. Goal-Driven Execution & Verification Mandate

- **Define Success Criteria Upfront:** Know exactly what command or check proves the task succeeded before starting work.
- **Evidence Before Completion:** Never claim "Done", "Fixed", or "Passing" without executing the verification command (`pytest`, `npm test`, `tsc`, `vite build`, or runtime curl) and displaying the actual terminal output as proof.
