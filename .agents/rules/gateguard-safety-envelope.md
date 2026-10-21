# GateGuard & Daytona Execution Safety Envelope

Inspired by Affaan's GateGuard hooks (`ECC/hooks/gateguard`) and Daytona's execution containment architecture (`daytona-v0`).

This rule governs **operational safety, execution containment, and sensitive target tripwires** across all Google Antigravity agent interactions.

---

## 1. Sensitive Target Tripwires (First-Touch Gating)

The following paths and file patterns represent high-risk attack surfaces. An agent **must never modify, overwrite, or expose** these targets without explicitly stating the exact rationale to the user beforehand:

* **Environment & Secrets:** `.env`, `.env.*`, `credentials*`, `secrets.*`, `*.pem`, `*.key`, `id_rsa*`
* **Authentication & Identity:** File paths containing `/auth/`, `/security/`, `/jwt/`, `/oauth/`
* **Financial & Billing:** File paths containing `/payment/`, `/payments/`, `/billing/`, `/stripe/`
* **Database State:** Production database migrations (`/migrations/`, `/alembic/`, `flyway`)
* **CI/CD Pipelines:** GitHub Actions workflows (`.github/workflows/*`), deployment pipelines

### Enforcement:
- If a task touches a sensitive target, the agent must perform a read-only diff audit first.
- Zero hardcoded API keys, bearer tokens, or database passwords may ever be written into any file. All secrets must use environment variable lookups.

---

## 2. Workspace Containment & Blast-Radius Boundaries (Daytona Invariant)

To guarantee host safety, all agent tool operations are bound by strict directory containment:

1. **Workspace Boundary:** The working directory (`Cwd:`) in all `run_command` calls **MUST** resolve inside the current project root. Execution in `/tmp`, `%TEMP%`, `C:\Windows`, or parent directories (`..`) is strictly prohibited unless explicitly requested.
2. **Never Pass Inline `cd` Commands:** Directory switches must always be declared via the `Cwd:` parameter.
3. **No Unmonitored Daemon Spawns:** Long-running processes (e.g. dev servers) must have bounded lifetimes or be managed through `manage_task`.
4. **Surgical Modification Rule:** Always use `replace_file_content` or `multi_replace_file_content` for editing existing files. `write_to_file` is reserved exclusively for brand-new files.

---

## 3. Read-Only Investigation Credit

To prevent unnecessary friction during troubleshooting:
- Read-only reconnaissance commands (`git status`, `git log`, `Get-ChildItem`, `view_file`, `grep_search`, `node scripts/doctor.js`) execute freely without gating.
- Agents are required to investigate *first* before proposing structural modifications. A change that was preceded by an accurate search/read earns "investigation credit" and passes review with highest confidence.

---

## 4. Self-Healing & Rollback Mandate

If an execution step results in broken tests or unexpected compilation failures:
1. Stop execution immediately; do NOT compound the failure with speculative edits.
2. Formulate a precise hypothesis based on the compiler/runtime stack trace.
3. If a 2nd attempt fails, immediately revert the unstaged changes (`git checkout -- .`) back to the verified checkpoint.
