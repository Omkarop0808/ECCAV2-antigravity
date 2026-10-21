# 🚀 Quickstart: ECC for Google Antigravity

Unify **75 specialized AI agents**, **445 production skills**, **11 engineering rules**, and **7 autonomous workflows** into any project in 60 seconds.

---

## 1. Instant Installation

### Option A: Global Plugin (Cleanest & Recommended for All Projects)

Installs ECC as a dedicated, isolated Antigravity plugin (`~/.gemini/config/plugins/ecc-antigravity`). Once installed, ECC is automatically active across **every single workspace** opened in Google Antigravity with zero configuration:

```bash
# Clone directly as a global plugin (macOS / Linux / Windows Git Bash):
git clone https://github.com/Omkarop0808/ECCAV2-antigravity.git ~/.gemini/config/plugins/ecc-antigravity
```

Or if you already cloned the repository:

```powershell
# Windows (PowerShell):
& "C:\path\to\ECC-antigravity\install.ps1" -Plugin
```

```bash
# Linux / macOS / WSL:
/path/to/ECC-antigravity/install.sh --plugin
```

---

### Option B: Project-Level Install (Per-Repository for Teams & Hackathons)

Installs ECC directly into a specific project repository (`.agents/`), ideal for teams or sharing with colleagues:

```powershell
# Open terminal in target repository and run:
& "C:\path\to\ECC-antigravity\install.ps1"

# Or specify target path explicitly:
& "C:\path\to\ECC-antigravity\install.ps1" -TargetPath "C:\path\to\your\project"
```

```bash
# Linux / macOS / WSL:
/path/to/ECC-antigravity/install.sh /path/to/your/project
```

---

### Option C: One-Prompt Instant Setup (In Any Antigravity Chat)

When you open **any brand-new or existing project** in Antigravity IDE, simply paste this prompt into the Antigravity chat:

> **"Set up ECC Antigravity in this workspace: Clone `https://github.com/Omkarop0808/ECCAV2-antigravity.git` into a temporary folder, copy `.agents/`, `.gemini/`, `AGENTS.md`, and `GEMINI.md` to this workspace root, clean up the temporary folder, and run `node scripts/doctor.js` to verify that all 75 specialized agents and 445 production skills are active."**

---

### Option D: Manual Drop-In

Copy the `.agents/` and `.gemini/` folders from `ecc-antigravity/` into the root of your target project:

```text
YourProject/
├── .agents/
│   ├── plugin.json
│   ├── AGENTS.md        # Operating contract
│   ├── GEMINI.md        # Baseline rules
│   ├── SKILLS_INDEX.md  # Dynamic 445 skills catalog
│   ├── agents/          # 75 specialized agent personas
│   ├── rules/           # 11 core engineering rules (GateGuard safety, Karpathy, routing)
│   ├── skills/          # 445 curated skills (Google SWE, STORM, Matt Pocock, Impeccable, 3D)
│   ├── references/      # 11 deep architecture handbooks
│   └── workflows/       # 7 autonomous workflow routines (DeerFlow goals, Dify DAGs)
├── .gemini/
│   └── commands/        # 12 Gemini slash commands (/goal, /storm, /domain-model, /build...)
├── src/
└── README.md
```

---

## 2. Verify Installation

Run the built-in diagnostic doctor from the `ecc-antigravity` repository:

```bash
npm run doctor
# Or: node scripts/doctor.js
```

Expected output:

```text
==========================================================
   ECC Antigravity Diagnostic & Health Check Engine       
==========================================================

[PASS] plugin.json: ecc-antigravity v2.4.0
[PASS] Operating Contract: .agents/AGENTS.md detected
[PASS] Operating Contract: .agents/GEMINI.md detected
[PASS] Operating Contract: Root AGENTS.md detected
[PASS] Operating Contract: Root GEMINI.md detected
[PASS] Operating Contract: .agents/SKILLS_INDEX.md detected
[PASS] Agents directory: 75 specialized agents detected
[PASS] Agent frontmatter schema: 100% of agents (75/75) valid
[PASS] Rules directory: 11 engineering rules detected
[PASS] Found all 11 core engineering and routing rules
[PASS] Skills directory: 445 curated skills packaged
[PASS] Dynamic Index: All 445 skills indexed in SKILLS_INDEX.md
[PASS] Workflows directory: 7 workflows defined
[PASS] Installer: install.ps1 verified
[PASS] Installer: install.sh verified
[PASS] References directory: 11 playbooks & architecture handbooks verified
[PASS] Zero-Byte Audit: 0 empty files detected across entire .agents harness

==========================================================
Diagnostics Summary: 17 checks passed, 0 issues.
All edge cases, agents, skills, and rules are 100% operational!
```

---

## 3. How to Use in Google Antigravity

Once installed, **you don't have to configure anything manually**. Any instruction you give is automatically classified into the **Intent A–J Matrix**:

- **Autonomous Goals:** Antigravity triggers the `autonomous-goal` workflow with up to 8 continuations and transactional checkpoints (DeerFlow pattern).
- **Deep Technical Research:** Antigravity triggers `storm-research` to simulate a multi-expert interrogation panel and draft an RFC before writing code.
- **Domain Modeling & Invariants:** Antigravity triggers Matt Pocock's `domain-modeling` and `to-spec` before coding.
- **Building Features:** Antigravity triggers `planner` ➔ `superpowers:brainstorming` ➔ `impeccable` design review ➔ `test-driven-development` ➔ verification.
- **Debugging Bugs:** Antigravity triggers `systematic-debugging` ➔ `silent-failure-hunter` (reproduce ➔ root cause ➔ surgical fix ➔ proof).
- **3D Graphics & WebGPU:** Antigravity triggers `threejs` ➔ `threejs-tsl-webgpu` ➔ `r3f-fundamentals` ➔ `r3f-shaders`.
- **Security Audits & Safety Envelopes:** Antigravity triggers `security-reviewer` ➔ `gateguard-safety-envelope` ➔ OWASP Top 10 checklist.
- **Token Efficiency:** When planning large features, Antigravity uses `gsd-graphify` to index codebase graphs in `.planning/graphs/`, saving 70%+ prompt tokens.
