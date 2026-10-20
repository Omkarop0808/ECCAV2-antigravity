# 🚀 Quickstart: ECC for Google Antigravity

Unify **71 specialized AI agents**, **149 production skills**, and strict engineering rules into any project in 60 seconds.

---

## 1. Instant Installation

### Option A: Global Install (Recommended for All Projects)

Installs ECC globally to your user-level Gemini configuration (`~/.gemini/config/`). Once installed, ECC is automatically active across **every single workspace** opened in Google Antigravity:

```powershell
# In PowerShell:
& "C:\path\to\ECC-antigravity\install.ps1" -Global
```

Or on Linux / macOS / WSL:

```bash
/path/to/ECC-antigravity/install.sh --global
```

---

### Option B: Project-Level Install (Per-Repository)

Installs ECC directly into a specific project repository (`.agents/`), ideal for teams or sharing with colleagues:

```powershell
# Open terminal in target repository and run:
& "C:\path\to\ECC-antigravity\install.ps1"

# Or specify target path explicitly:
& "C:\path\to\ECC-antigravity\install.ps1" -TargetPath "C:\path\to\your\project"
```

Or on Linux / macOS / WSL:

```bash
/path/to/ECC-antigravity/install.sh /path/to/your/project
```

---

### Option C: Manual Drop-In

Copy the `.agents/` folder from `ecc-antigravity/` into the root of your target project:

```text
YourProject/
├── .agents/
│   ├── plugin.json
│   ├── AGENTS.md        # Operating contract
│   ├── GEMINI.md        # Baseline rules
│   ├── SKILLS_INDEX.md  # Dynamic 149 skills catalog
│   ├── agents/          # 71 specialized agent personas
│   ├── rules/           # 9 core engineering rules (codebase adaptation, Karpathy, security)
│   ├── skills/          # 149 curated skills
│   ├── references/      # 3 deep architecture handbooks
│   └── workflows/       # 5 autonomous workflow routines
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

[PASS] plugin.json: ecc-antigravity v2.2.3
[PASS] Operating Contract: .agents/AGENTS.md detected
[PASS] Operating Contract: .agents/GEMINI.md detected
[PASS] Operating Contract: Root AGENTS.md detected
[PASS] Operating Contract: Root GEMINI.md detected
[PASS] Operating Contract: .agents/SKILLS_INDEX.md detected
[PASS] Agents directory: 71 specialized agents detected
[PASS] Agent frontmatter schema: 100% of agents (71/71) valid
[PASS] Rules directory: 9 engineering rules detected
[PASS] Found all 9 core engineering and routing rules
[PASS] Skills directory: 149 curated skills packaged
[PASS] Dynamic Index: All 149 skills indexed in SKILLS_INDEX.md
[PASS] Workflows directory: 5 workflows defined
[PASS] Installer: install.ps1 verified
[PASS] Installer: install.sh verified
[PASS] References directory: 3 playbooks & architecture handbooks verified
[PASS] Zero-Byte Audit: 0 empty files detected across entire .agents harness

==========================================================
Diagnostics Summary: 17 checks passed, 0 issues.
All edge cases, agents, skills, and rules are 100% operational!
```

---

## 3. How to Use in Google Antigravity

Once installed, **you don't have to configure anything manually**. Any instruction you give is automatically classified into the **Intent A–J Matrix**:

- **Building Features:** Antigravity triggers `planner` ➔ `superpowers:brainstorming` ➔ `impeccable` design review ➔ `test-driven-development` ➔ verification.
- **Debugging Bugs:** Antigravity triggers `systematic-debugging` ➔ `silent-failure-hunter` (reproduce ➔ root cause ➔ surgical fix ➔ proof).
- **3D Graphics & WebGPU:** Antigravity triggers `threejs` ➔ `threejs-tsl-webgpu` ➔ `r3f-fundamentals` ➔ `r3f-shaders`.
- **Security Audits:** Antigravity triggers `security-reviewer` ➔ `canary-watch` ➔ OWASP Top 10 checklist.
- **Token Efficiency:** When planning large features, Antigravity uses `gsd-graphify` to index codebase graphs in `.planning/graphs/`, saving 70%+ prompt tokens.
