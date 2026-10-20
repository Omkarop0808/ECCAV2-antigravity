# ECC for Google Antigravity (AGY-ECC) 🚀

> **The definitive agentic engineering harness for Google Antigravity IDE — bringing 71 specialized AI agents, 68 curated skills (including full 3D R3F & UI/UX Pro suites), enterprise architecture rules, and autonomous workflows from Everything Claude Code (ECC) into a native Antigravity environment.**

[![Antigravity Compatible](https://img.shields.io/badge/Harness-Google%20Antigravity-4285F4?logo=google&logoColor=white)](#overview)
[![Agents](https://img.shields.io/badge/Agents-71%20Specialized-00C853)](#-available-agents-catalog)
[![Skills](https://img.shields.io/badge/Skills-68%20Production%20Skills-38BDF8)](#-included-skills-catalog)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/Omkarop0808/ECC-antigravity?style=social)](https://github.com/Omkarop0808/ECC-antigravity)

---

## 📖 Overview

**ECC for Antigravity** transforms Google Antigravity into a coordinated multi-agent engineering powerhouse. While originally designed for Claude Code, Google Antigravity agents require specialized personas, strict prompt defenses, and modular rules to produce enterprise-grade software.

This repository provides a **turnkey adapter and distribution engine** that:

- 🛠️ **Translates Tool Primitives:** Automatically maps Claude tool calls (`Read`, `Write`, `Edit`, `Grep`, `Bash`) to native Antigravity tools (`view_file`, `write_to_file`, `replace_file_content`, `grep_search`, `run_command`).
- 🧠 **Aligns Model Tiers:** Maps model hierarchies (`haiku` ➔ `flash`, `sonnet`/`opus` ➔ `pro`).
- 🎨 **Built-In 3D & UI/UX Powerhouse:** Includes full React Three Fiber (12 R3F skills), Three.js, `ui-ux-pro-max`, `design-taste-frontend`, `liquid-glass-design`, and reference playbooks.
- 📁 **Standardized `.agents/` Layout:** Formats all assets into `.agents/rules`, `.agents/agents`, `.agents/skills`, and `.agents/workflows` for instant auto-discovery.

---

## 📥 How to Download (Windows, macOS, Linux)

### Option 1: Git Clone (Recommended)

Open your terminal or PowerShell and clone the repository:

```powershell
# Clone via HTTPS:
git clone https://github.com/Omkarop0808/ECC-antigravity.git

# Or clone via SSH:
git clone git@github.com:Omkarop0808/ECC-antigravity.git
```

### Option 2: Download ZIP

1. Click the green **Code** button at the top of the GitHub page.
2. Select **Download ZIP**.
3. Extract the folder (e.g. to `C:\dev\ECC-antigravity` or `~/dev/ECC-antigravity`).

---

## ⚡ How to Install in ANY Project

Once cloned, you can install the entire ECC Antigravity system into **any existing or new project** with a single command.

### Method A: Windows PowerShell (One-Click)

Navigate to the project you want to upgrade, and run:

```powershell
# 1. Open PowerShell in your target project directory (e.g. C:\dev\MyProject):
cd C:\dev\MyProject

# 2. Run the installer pointing from the cloned ECC-antigravity repository:
& "C:\dev\ECC-antigravity\install.ps1"
```

*Or install to a remote directory by specifying `-TargetPath`:*

```powershell
& "C:\dev\ECC-antigravity\install.ps1" -TargetPath "C:\dev\MyProject"
```

### Method B: macOS / Linux / WSL (One-Click)

```bash
# From anywhere, pass your project root as an argument:
/path/to/ECC-antigravity/install.sh /path/to/your/project
```

### Method C: Manual Drop-In

Copy the `.agents/` directory directly into the root of your project:

```text
YourProjectRoot/
├── .agents/
│   ├── plugin.json
│   ├── agents/      # 71 specialized agent personas
│   ├── rules/       # Modular engineering rules
│   ├── skills/      # 68 curated skills (3D, UI/UX, Security, Networks, Backend)
│   ├── references/  # R3F and Claude design playbooks
│   └── workflows/   # Autonomous workflows
├── src/
├── package.json
└── README.md
```

---

## 🩺 Verifying Your Installation

Run the built-in diagnostic doctor to verify that all frontmatter schemas, tools, rules, and skills are healthy:

```bash
node scripts/doctor.js
```

Expected output:

```text
=== ECC Antigravity Doctor ===

[PASS] plugin.json: ecc-antigravity v2.2.3
[PASS] Agents directory: 71 agents detected
[PASS] Agent frontmatter schema verification passed
[PASS] Rules directory: 5 engineering rules detected
[PASS] Skills directory: 68 skills packaged
[PASS] Workflows directory: 3 workflows defined

Diagnostics: 6 checks passed, 0 issues found.
✓ ECC Antigravity package is 100% healthy and ready for deployment!
```

---

## 🎯 How to Use in Google Antigravity

Once installed in your project, Google Antigravity immediately recognizes all components:

### 1. Automatic Rule Enforcement

Antigravity automatically reads the rules in `.agents/rules/` to guide every generation:

- `python-fastapi.md` — Enforces async patterns, non-blocking I/O, Pydantic v2 schemas, and CORS security.
- `react-typescript.md` — Enforces hook dependency arrays, render performance, and container/presentational split.
- `cyber-defense-security.md` — Enforces MITRE ATT&CK attribution, forensic immutability, and canary discipline.
- `web-design-system.md` — Enforces Liquid Glass styling, concentric radii, optical alignment, and 3D WebGL optimization.
- `anti-failure-patterns.md` — Enforces zero tolerance for empty catch blocks and silent failures.

### 2. Invoking Specialized Agents

In your conversation with Antigravity, ask it to adopt any specialized role:

- **Security Review:**  
  *"Please invoke `security-reviewer` to audit our auth endpoints for OWASP Top 10 vulnerabilities."*
- **Network Architecture:**  
  *"Act as `network-architect` and design a segmented VLAN topology for our endpoint monitoring server."*
- **React Performance & Hooks:**  
  *"Run `react-reviewer` on `frontend/src/components/ThreeSecurityGlobe.tsx` to check hook dependencies and WebGL memory leaks."*
- **Silent Error Detection:**  
  *"Run `silent-failure-hunter` across `src/engine/` to find swallowed exceptions or dangerous fallback returns."*
- **FastAPI Async Correctness:**  
  *"Review our REST routes in `src/api/` using `fastapi-reviewer`."*

### 3. Running Pre-Packaged Workflows

Direct Antigravity to run structured autonomous workflows located in `.agents/workflows/`:

- **Security Audit:** `security-audit.md` (Multi-phase static code, secrets, and auth audit)
- **Code Review:** `code-review.md` (Context gathering -> agent delegation -> synthesis)
- **Attack Simulation:** `attack-simulation.md` (APT kill-chain simulation and defensive telemetry validation)

---

## 🤖 Available Agents Catalog

| Agent Persona | Category | Core Specialty |
| :--- | :--- | :--- |
| **`security-reviewer`** | Security | OWASP Top 10, secrets detection, injection, SSRF, input validation |
| **`network-architect`** | Networking | Campus, enterprise, WAN topologies, routing domains, IP segmentation |
| **`network-troubleshooter`** | Networking | OSI-layer diagnostics, link flaps, packet drops, MTU issues |
| **`network-config-reviewer`** | Networking | Dangerous command detection, ACL syntax, pre-change review |
| **`fastapi-reviewer`** | Backend | Async correctness, Pydantic schemas, dependency injection, CORS |
| **`react-reviewer`** | Frontend | Hook rules, render performance, JSX security, state mutation |
| **`silent-failure-hunter`** | Quality | Uncaught promises, swallowed exceptions, dangerous fallbacks |
| **`performance-optimizer`** | Performance | Latency profiling, memory leak detection, bundle splitting |
| **`tdd-guide`** | Testing | Test-driven development enforcement (Red-Green-Refactor) |
| **`code-reviewer`** | Quality | Maintainability, immutability, naming, code smells |
| **`code-simplifier`** | Quality | Post-implementation clarity without changing behavior |
| **`architect`** | Architecture | High-level system design, distributed data flows, scalability |
| **`planner`** | Planning | Phased implementation blueprints and verification gates |
| **`spec-miner`** | Architecture | Extracting specifications from brownfield codebases |
| **`a11y-architect`** | Accessibility | WCAG 2.2 accessibility design, screen reader semantics |
| **`database-reviewer`** | Database | Query performance, schema indexes, migration safety |
| **`e2e-runner`** | Testing | Playwright end-to-end user flow testing |
| **`pr-test-analyzer`** | Testing | PR test coverage completeness before merging |
| *(+ 53 additional agents)* | Various | Full support for Go, Rust, Java, Python, Swift, Kotlin, Vue, and more |

---

## 📦 Included Skills Catalog (68 Skills)

### 1. React Three Fiber & 3D Web Suite (12 Skills)
- `threejs` — Three.js scene, camera, render loop, lighting, performance
- `r3f-fundamentals` — Canvas setup, typed JSX, hooks, resource ownership
- `r3f-animation` — useFrame, damping, GLTF clips, procedural motion
- `r3f-geometry` — Custom buffer geometries, instancing, points, lines
- `r3f-interaction` — Pointer events, picking, dragging, keyboard input
- `r3f-lighting` — Direct lights, environment maps, HDR, contact shadows
- `r3f-loaders` — useGLTF, useLoader, Draco compression, caching
- `r3f-materials` — PBR materials, transparency, transmission, glass
- `r3f-physics` — Rapier rigid bodies, colliders, forces, physics joints
- `r3f-postprocessing` — Bloom, selective glow, depth of field, chromatic aberration
- `r3f-shaders` — Custom GLSL/TSL shaders, uniforms, vertex displacement
- `r3f-textures` — sRGB color space, UV channels, video textures, render targets

### 2. UI/UX Design, Aesthetics & Motion (10 Skills)
- `ui-ux-pro-max` — Full professional UI/UX design heuristics & layouts
- `design-taste-frontend` — Aesthetic direction, distinctive visual craft
- `frontend-design` — Bespoke component composition & typography
- `frontend-design-direction` — Design systems & visual hierarchy
- `liquid-glass-design` — Apple-style frosted glass, dynamic blur, specular rims
- `make-interfaces-feel-better` — Optical alignment, font smoothing, easing
- `motion-advanced`, `motion-foundations`, `motion-patterns` — Fluid animation systems
- `accessibility` — WCAG 2.2 compliance, ARIA labels, focus states

### 3. Cybersecurity & Forensics (6 Skills)
- `security-bounty-hunter` — Remote exploit & vulnerability hunting
- `canary-watch` — Honeypot files & intrusion tripwires
- `security-review` — Full application security audit
- `security-scan` — Dependency & secret vulnerability detection
- `agent-security-hardening` — Prompt injection defense & sandboxing
- `safety-guard` — Defensive execution boundaries

### 4. Computer Networks & Infrastructure (8 Skills)
- `network-interface-health` — Drops, CRC errors, link flaps
- `network-config-validation` — Dangerous command detection
- `network-bgp-diagnostics` — Neighbor peering & route-policy analysis
- `homelab-network-setup`, `homelab-vlan-segmentation`, `homelab-wireguard-vpn`
- `homelab-network-readiness` — Pre-flight network assessment
- `netmiko-ssh-automation` — Automated network configuration review

### 5. Backend, API, Database & Frontend Frameworks (11 Skills)
- `fastapi-patterns`, `backend-patterns`, `api-design`
- `database-migrations`, `postgres-patterns`, `redis-patterns`, `docker-patterns`
- `react-patterns`, `react-performance`, `react-testing`, `vite-patterns`

### 6. Engineering Rigor & Multi-Agent Loops (21 Skills)
- `tdd-workflow`, `verification-loop`, `error-handling`, `coding-standards`, `e2e-testing`, `windows-desktop-e2e`
- `agentic-engineering`, `agent-architecture-audit`, `agent-harness-construction`, `agent-introspection-debugging`
- `continuous-learning`, `continuous-learning-v2`, `cost-aware-llm-pipeline`, `council`, `council-multi-model`
- `team-builder`, `deep-research`, `search-first`, `dashboard-builder`, `ui-demo`

---

## 🔧 Rebuilding from Source

If you wish to pull newer agents or update your local build:

```bash
# 1. Run the adapter compiler:
node scripts/build-adapter.js

# 2. Verify all components:
node scripts/doctor.js
```

---

## 📄 License

MIT License. Derived from and compatible with Everything Claude Code (ECC).
Distributed for use with the Google Antigravity IDE and ecosystem.
