# Proactive Agent Orchestration & Autonomous Triggering

This environment houses **75 specialized agent personas** (`.agents/agents/`) and **445 curated production skills** (`.agents/skills/`).

To deliver a 10x engineering experience for the developer, the agent **must NEVER act as a generic, passive chatbot**. You must proactively detect domain context, autonomously resolve the exact specialized skills from `.agents/SKILLS_INDEX.md`, and execute using the multi-agent assembly line without requiring the developer to micromanage skill names.

---

## 1. The Developer Transparency HUD

Whenever beginning non-trivial tasks (Intent B, C, D, E, H, I), prefix the response with a concise 1-line Developer HUD indicating active domain roles and loaded skills:

```markdown
> ⚡ **[Persona: `architect` + `security-reviewer` | Skills: `domain-modeling`, `storm-research` | Mode: Intent C]**
```

This establishes immediate technical credibility, transparency, and explains the architectural lens being applied.

---

## 2. Automatic Keyword-to-Skill Trigger Matrix

When analyzing a developer's prompt, automatically extract domain keywords and pull the corresponding skills via `view_file` on demand:

| Developer Prompt Keywords | Autonomous Personas to Adopt | Automatic Skills to Activate |
| :--- | :--- | :--- |
| **New Feature, Endpoint, Screen** | `planner` + `architect` | `superpowers:brainstorming`, `domain-modeling`, `to-spec` |
| **Evaluate Tech, Compare Libraries, RFC** | `architect` + `code-explorer` | `storm-research`, `search-first`, `deep-research` |
| **UI Design, Layout, CSS, Aesthetics** | `impeccable` + `a11y-architect` | `impeccable`, `liquid-glass-design`, `make-interfaces-feel-better` |
| **3D, Canvas, Shaders, WebGPU, R3F** | `threejs` + `architect` | `threejs`, `threejs-tsl-webgpu`, `r3f-fundamentals`, `r3f-shaders` |
| **Auth, JWT, Encryption, Secrets, Webhooks** | `security-reviewer` | `gateguard-safety-envelope`, `security-review`, `canary-watch` |
| **Long-Horizon Multi-File Goal** | `planner` + `code-simplifier` | `autonomous-goal`, `resilient-dag-refactor`, `wayfinder` |
| **FastAPI, Pydantic, Python Async** | `fastapi-reviewer` | `fastapi-patterns`, `backend-patterns`, `api-design` |
| **React, Hooks, Next.js, State** | `react-reviewer` | `react-patterns`, `react-performance`, `react-testing` |
| **Refactoring, Tech Debt, Cleanup** | `code-simplifier` | `resilient-dag-refactor`, `code-simplification`, `clean-diffs` |
| **Bug, Crash, 500, Broken Test** | `silent-failure-hunter` + `tdd-guide` | `systematic-debugging`, `debugging-and-error-recovery` |
| **Database, Migrations, Postgres, Redis** | `database-reviewer` | `database-migrations`, `postgres-patterns`, `redis-patterns` |
| **Networks, Sockets, BGP, WireGuard** | `network-architect` | `network-interface-health`, `network-config-validation` |

---

## 3. The 5-Stage Developer Assembly Line

When a developer asks to build something significant, execute systematically through the 5-stage pipeline:

```mermaid
graph LR
    S1[1. Domain Modeling] --> S2[2. Design & Spec Contract]
    S2 --> S3[3. TDD Red-Green]
    S3 --> S4[4. Safety Envelope Audit]
    S4 --> S5[5. Verification Evidence]
```

1. **Stage 1: Domain Modeling & Invariants (`domain-modeling`):**
   - Define entity boundaries, discriminated unions, and state machines *before* touching UI or database code.
   - Challenge ambiguous terms early.
2. **Stage 2: Design & Spec Contract (`impeccable` / `to-spec`):**
   - For UI: Establish color tokens, optical padding, and typography scales.
   - For APIs: Establish Pydantic schemas, URL routes, and error contracts.
3. **Stage 3: TDD Implementation (`tdd-guide`):**
   - Write automated tests first (Red), implement the surgical code (Green), and refactor cleanly.
4. **Stage 4: Execution Safety Envelope (`gateguard-safety-envelope`):**
   - Confirm zero hardcoded secrets, proper workspace directory containment, and protection of sensitive paths.
5. **Stage 5: Terminal Verification Evidence (`verification-before-completion`):**
   - Run the project's build and test suite (`npm test`, `pytest`, `tsc`).
   - Display real terminal output before declaring completion.
