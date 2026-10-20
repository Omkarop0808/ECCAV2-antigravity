# Automatic Routing Policy & Intent Classification

Every user prompt or engineering task received in this environment must be classified into one of the following intent types (A-J). Execute the lightest sufficient workflow for simple tasks, and the full phased workflow for complex tasks.

---

## 1. Intent Classification Matrix

| Intent | Category | Scope / Trigger | Required Engine / Skills |
| :--- | :--- | :--- | :--- |
| **A** | **Trivial Fix / Typo** | Single-line fix, typo, variable rename | Direct surgical edit + verify syntax/build |
| **B** | **New Feature / Component** | Adding new capabilities, UI screens, API endpoints | `superpowers:brainstorming` -> `impeccable` design review -> `test-driven-development` -> implement -> verify |
| **C** | **Major Architecture / System** | Multi-file refactor, new subsystem, database migration | `gsd-plan-phase` -> `gsd-graphify` -> spec ADR -> `gsd-execute-phase` -> verify |
| **D** | **3D WebGL / WebGPU / R3F** | Canvas setup, TSL shaders, compute passes, 3D meshes | `threejs` -> `threejs-tsl-webgpu` -> `r3f-fundamentals` -> `r3f-shaders` |
| **E** | **Security / Vulnerability / Auth** | Handling secrets, input validation, encryption, JWT | `security-reviewer` agent -> `canary-watch` -> OWASP Top 10 checklist |
| **F** | **Networking & Telemetry** | Packet inspection, routing, sockets, interface health | `network-architect` / `network-troubleshooter` -> `network-interface-health` |
| **G** | **Code Review & Branch Finishing** | PR preparation, diff review, merge readiness | `code-reviewer` agent -> `verification-before-completion` -> `finishing-a-development-branch` |
| **H** | **Refactoring & Dead Code** | Code cleanup without changing external behavior | `code-simplifier` agent -> regression test verification |
| **I** | **Bug Investigation & Crash** | Test failure, runtime exception, unexpected state | `systematic-debugging` (reproduce -> root cause -> surgical fix -> regression test) |
| **J** | **UI/UX Polish & Visual Audit** | Visual hierarchy, spacing, contrast, motion | `impeccable` -> `make-interfaces-feel-better` -> `liquid-glass-design` |

---

## 2. Dynamic Skill Discovery Policy

When a required skill is excluded from the agent's initial context window due to context budget limits:

1. **Never guess or invent APIs.**
2. Inspect `.agents/SKILLS_INDEX.md` or `.agents/skills/<skill-name>/SKILL.md`.
3. Use `view_file` to read the skill instructions into context before writing code.
4. Execute strictly within the patterns defined in that skill's playbook.

---

## 3. Edge-Case Engineering Guards

- **Proportionality:** Do not invoke full GSD planning for a 3-line bugfix. Do not write code blindly for a multi-service architecture change without a spec.
- **Verification Mandate:** Never conclude any task with "Done" without executing verification (automated tests, build, lint, or runtime checks) and presenting the concrete evidence.
- **Zero Silent Errors:** Catch blocks must never swallow exceptions or return unlogged default values.
