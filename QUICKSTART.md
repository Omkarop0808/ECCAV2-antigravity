# 🚀 Quickstart: ECC for Google Antigravity

Add 71 specialized AI agents, production rules, and skills to **ANY project** in 60 seconds.

---

## 1. Instant Installation

### Option A: PowerShell (Windows)
Open a terminal in any repository or project root, and run:
```powershell
# From your target repository:
& "C:\dev\CNminiproject\ecc-antigravity\install.ps1"

# Or specifying the target path explicitly:
& "C:\dev\CNminiproject\ecc-antigravity\install.ps1" -TargetPath "C:\path\to\your\project"
```

### Option B: Bash / macOS / Linux / WSL
```bash
/path/to/ecc-antigravity/install.sh /path/to/your/project
```

### Option C: Manual Drop-In
Simply copy the `.agents/` folder from `ecc-antigravity/` into the root of your target project:
```
YourProject/
├── .agents/
│   ├── plugin.json
│   ├── agents/      # 71 specialized agent personas
│   ├── rules/       # Modular engineering rules
│   ├── skills/      # Curated high-value skills
│   └── workflows/   # Autonomous workflow routines
├── src/
└── ...
```

---

## 2. Verify Installation
Run the doctor diagnostic from the `ecc-antigravity` directory:
```bash
node scripts/doctor.js
```
You should see:
```text
[PASS] plugin.json: ecc-antigravity v2.2.3
[PASS] Agents directory: 71 agents detected
[PASS] Agent frontmatter schema verification passed
[PASS] Rules directory: 5 engineering rules detected
[PASS] Skills directory: 15 skills packaged
[PASS] Workflows directory: 3 workflows defined
```

---

## 3. How to Use in Antigravity

Once installed in your project:
1. **Antigravity automatically discovers** all rules in `.agents/rules/` and skills in `.agents/skills/`.
2. **Invoke specialized subagents** during tasks:
   - Ask Antigravity: *"Please run a security review using `security-reviewer` on my API routes"*
   - Ask Antigravity: *"Review this React component using `react-reviewer`"*
   - Ask Antigravity: *"Check for silent errors or swallowed exceptions using `silent-failure-hunter`"*
   - Ask Antigravity: *"Design our network topology using `network-architect`"*
3. **Execute Workflows:**
   - Run the security audit workflow: `.agents/workflows/security-audit.md`
   - Run the code review gate: `.agents/workflows/code-review.md`
