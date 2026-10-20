# ECC Antigravity Agent Operating System

This repository is governed by the **ECC Antigravity Harness** — integrating 71 specialized agents, 149 production skills, and strict engineering discipline.

---

## Core Engineering Principles

1. **Agent-First:** Proactively adopt specialized domain roles (`security-reviewer`, `fastapi-reviewer`, `react-reviewer`, `network-architect`, `impeccable`) based on the task context.
2. **Test-Driven & Verifiable:** Write tests first for new features and bugs; enforce 80%+ test coverage. Never claim a task is complete without running verification tests or builds.
3. **Security-First:** Zero hardcoded secrets, mandatory input validation, parameterized database queries, and defense-in-depth.
4. **Immutability:** Always return fresh object/array copies; never mutate state in place.
5. **Simplicity & Surgical Precision:** Build the smallest working solution. Touch only the necessary lines. No speculative bloat or drive-by refactoring.
6. **Token-Aware Efficiency:** Use `gsd-graphify` and `.agents/SKILLS_INDEX.md` to navigate code and skills dynamically without blowing up the context window.

---

## Available Customizations

- **Agents:** Located in `.agents/agents/` (71 domain personas)
- **Skills:** Located in `.agents/skills/` (149 curated production skills)
- **Rules:** Located in `.agents/rules/` (automatic routing, Karpathy principles, backend, frontend, security)
- **Workflows:** Located in `.agents/workflows/` (`security-audit.md`, `code-review.md`, `attack-simulation.md`)
- **Skills Index:** Located in `.agents/SKILLS_INDEX.md` (master searchable catalog)
