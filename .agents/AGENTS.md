# ECC Antigravity Agent Operating System

This repository is governed by the **ECC Antigravity Harness** — integrating 75 specialized agents, 445 production skills, 11 engineering rules, 7 autonomous workflows, and strict engineering discipline.

---

## Core Engineering Principles

1. **Agent-First:** Proactively adopt specialized domain roles (`security-reviewer`, `fastapi-reviewer`, `react-reviewer`, `network-architect`, `impeccable`) based on the task context.
2. **Test-Driven & Verifiable:** Write tests first for new features and bugs; enforce 80%+ test coverage. Never claim a task is complete without running verification tests or builds.
3. **Security-First & Safety Envelope:** Zero hardcoded secrets, mandatory input validation, GateGuard tripwires on sensitive files, and Daytona workspace containment.
4. **Immutability & Domain Modeling:** Model invariants, discriminated unions, and state machines first; always return fresh object/array copies; never mutate state in place.
5. **Simplicity & Surgical Precision:** Build the smallest working solution. Touch only the necessary lines. No speculative bloat or drive-by refactoring.
6. **Token-Aware Efficiency:** Use `gsd-graphify` and `.agents/SKILLS_INDEX.md` to navigate code and skills dynamically without blowing up the context window.
7. **Long-Horizon Goal Resilience:** Multi-step executions leverage DeerFlow autonomous continuation loops with atomic checkpoints and Dify DAG error recovery.

---

## Available Customizations

- **Agents:** Located in `.agents/agents/` (75 domain personas)
- **Skills:** Located in `.agents/skills/` (445 curated production skills)
- **Rules:** Located in `.agents/rules/` (11 core engineering rules: codebase adaptation, automatic routing, Karpathy principles, anti-failure, backend, frontend, security, GateGuard safety envelope)
- **Workflows:** Located in `.agents/workflows/` (7 autonomous workflows including DeerFlow goal loops & Dify DAG refactors)
- **Skills Index:** Located in `.agents/SKILLS_INDEX.md` (master searchable catalog)
