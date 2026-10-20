# ECC for Google Antigravity (AGY-ECC)

> **71 Specialized AI Agents, Enterprise Architecture Rules, Curated Skills, and Workflows tailored specifically for Google Antigravity IDE and Agent Harnesses.**

[![Antigravity Compatible](https://img.shields.io/badge/Harness-Google%20Antigravity-4285F4?logo=google&logoColor=white)](#)
[![Agents](https://img.shields.io/badge/Agents-71%20Specialized-00C853)](#available-agents)
[![Skills](https://img.shields.io/badge/Skills-Curated%20Production-blue)](#included-skills)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## What is ECC for Antigravity?

**ECC (Everything Claude Code)** is one of the most comprehensive agentic operating systems in the AI engineering ecosystem. While originally authored for Claude Code, Google Antigravity agents share a similar need for specialized personas, strict defensive baselines, and modular domain rules.

This repository provides a **native Antigravity Adapter & Distribution Engine** that:
1. **Translates Tool Primitives:** Automatically maps Claude tool definitions (`Read`, `Write`, `Edit`, `Grep`, `Bash`) to native Antigravity primitives (`view_file`, `write_to_file`, `replace_file_content`, `grep_search`, `run_command`).
2. **Aligns Model Profiles:** Maps model hierarchies (`haiku` -> `flash`, `sonnet`/`opus` -> `pro`).
3. **Packages Modular `.agents/` Structure:** Prepares turnkey `agents/`, `rules/`, `skills/`, and `workflows/` that can be dropped into **ANY codebase** to immediately upgrade Antigravity's capabilities.

---

## Repository Structure

```text
ecc-antigravity/
├── .agents/                                # The ready-to-deploy Antigravity package
│   ├── plugin.json                         # Antigravity Plugin manifest
│   ├── agents/                             # 71+ Converted Antigravity Agent Personas
│   │   ├── security-reviewer.md            # OWASP, secrets, injection, AST verification
│   │   ├── network-architect.md            # Enterprise topologies, VLANs, routing
│   │   ├── network-troubleshooter.md       # OSI-layer connectivity & packet diagnosis
│   │   ├── network-config-reviewer.md      # Router/switch/firewall config validation
│   │   ├── fastapi-reviewer.md             # Async correctness, Pydantic v2 schemas
│   │   ├── react-reviewer.md               # Hook correctness, render performance, JSX
│   │   ├── silent-failure-hunter.md        # Swallowed exceptions & dangerous fallbacks
│   │   ├── performance-optimizer.md        # Bottlenecks, memory leaks, latency
│   │   ├── tdd-guide.md                    # Test-driven development enforcement
│   │   ├── code-reviewer.md                # Multi-point code quality & maintainability
│   │   ├── architect.md                    # System architecture & scalability
│   │   ├── planner.md                      # Phased implementation planning
│   │   └── ... (71 total agents)
│   ├── rules/                              # Enforced Modular Rules
│   │   ├── python-fastapi.md               # Backend API standards
│   │   ├── react-typescript.md             # Frontend React 18/19 standards
│   │   ├── cyber-defense-security.md       # Telemetry, MITRE ATT&CK & canary rules
│   │   ├── web-design-system.md            # Liquid glass, concentric radii, 3D
│   │   └── anti-failure-patterns.md        # Zero silent failures & immutability
│   ├── skills/                             # Curated Domain Skills (SKILL.md)
│   │   ├── liquid-glass-design/            # Frosted glass, dynamic blur, specular rims
│   │   ├── make-interfaces-feel-better/    # Optical alignment, font smoothing, easing
│   │   ├── security-bounty-hunter/         # Remote exploit & vulnerability hunting
│   │   ├── canary-watch/                   # Honeypot files & intrusion tripwires
│   │   ├── network-interface-health/       # Drops, CRC errors, link flaps
│   │   ├── network-config-validation/      # Dangerous command detection
│   │   ├── fastapi-patterns/               # Async patterns & DI recipes
│   │   ├── react-patterns/                 # Server/client boundary & state split
│   │   ├── react-performance/              # Memoization, bundle splitting, WebGL
│   │   ├── tdd-workflow/                   # Red-Green-Refactor test cycle
│   │   └── verification-loop/              # Nyquist verification & proof gates
│   └── workflows/                          # Repeatable Autonomous Workflows
│       ├── security-audit.md               # Automated vulnerability & secret scan
│       ├── code-review.md                  # Multi-agent PR review pipeline
│       └── attack-simulation.md            # APT intrusion & honeypot cyber range
├── scripts/
│   ├── build-adapter.js                    # Zero-dependency compiler converting ECC -> Antigravity
│   └── doctor.js                           # Health-checker verifying frontmatter & tools
├── install.ps1                             # 1-click Windows PowerShell installer
├── install.sh                              # 1-click Unix/Linux/macOS installer
├── package.json                            # Package manifest
├── QUICKSTART.md                           # 60-second setup guide
├── LICENSE                                 # MIT License
└── .gitignore                              # Clean Git ignore file
```

---

## ⚡ 1-Click Installation in Any Project

### Windows (PowerShell)
```powershell
# In your target project root:
& "C:\path\to\ecc-antigravity\install.ps1"

# Or from anywhere specifying TargetPath:
& "C:\path\to\ecc-antigravity\install.ps1" -TargetPath "C:\dev\MyNewProject"
```

### Linux / macOS / WSL
```bash
/path/to/ecc-antigravity/install.sh /path/to/target/project
```

Once installed, your project contains a populated `.agents/` folder that Google Antigravity recognizes automatically.

---

## Available Agents Catalog (Selected Core)

| Agent | Domain | Role & Purpose |
| :--- | :--- | :--- |
| **`security-reviewer`** | Security | Flags secrets, injection, SSRF, unsafe deserialization, and OWASP Top 10 vulnerabilities. |
| **`network-architect`** | Networks | Designs enterprise/campus topologies, IP addressing, segmentation, and routing domains. |
| **`network-troubleshooter`**| Networks | Diagnoses OSI-layer connectivity, dropped packets, DNS delays, and routing loops. |
| **`fastapi-reviewer`** | Backend | Audits FastAPI routes, async correctness, Pydantic schemas, and dependency injection. |
| **`react-reviewer`** | Frontend | Verifies React hook dependency arrays, render performance, and JSX security. |
| **`silent-failure-hunter`**| Quality | Detects swallowed exceptions, empty catch blocks, and dangerous fallback values. |
| **`performance-optimizer`**| Performance | Analyzes bundle sizes, memory leaks, latency bottlenecks, and query costs. |
| **`tdd-guide`** | Testing | Enforces Test-Driven Development (Red-Green-Refactor) with 80%+ test coverage. |
| **`architect`** | Architecture| High-level system design, distributed data flows, and scalability planning. |
| **`planner`** | Planning | Decomposes complex features into phased, verifiable milestones. |

---

## Rebuilding or Updating from Upstream ECC

If you clone newer updates of [affaan-m/ECC](https://github.com/affaan-m/ECC):
```bash
node scripts/build-adapter.js
node scripts/doctor.js
```
The build script automatically re-transforms all agents, maps tools, and verifies health diagnostics.

---

## License

MIT License. Derivative work based on Everything Claude Code (ECC).
