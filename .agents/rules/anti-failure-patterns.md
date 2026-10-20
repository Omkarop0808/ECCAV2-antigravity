# Anti-Failure & Silent Error Hunting Standards

Derived from ECC's `silent-failure-hunter` persona and Karpathy-style engineering principles.

## 1. Zero Tolerance for Silent Failures

- Never write empty catch blocks (`try { ... } catch (e) {}` or `except: pass`).
- Never return empty fallback arrays or `null` without logging warning diagnostics explaining why the fallback was triggered.
- If an OS syscall, registry query, or database transaction fails, record:
  - Exact error code / Win32 error number
  - Target key path or resource name
  - Timestamp and calling thread context

## 2. Immutability & Safe State Transitions

- Never mutate state objects or arrays in-place (`state.push(item)` or `dict[key] = val` in reactive stores).
- Always return fresh object copies (`[...prev, newItem]`, `{ ...prev, key: val }`).
- For database writes in SQLite, always operate inside explicit transactions with rollback on exception.

## 3. Surgical Code Edits

- Preserve existing style, indentation, and docstrings.
- Avoid wholesale rewrites when a localized, surgical patch satisfies the requirement.
- Verify every change with automated tests or concrete runtime evidence before declaring completion.

## 4. Antigravity Tooling & Shell Discipline

- **NEVER use `cd` in commands:** Always set the target directory via the `Cwd:` parameter in `run_command`. Calling `cd path` causes tool failure or silent context loss.
- **PowerShell Native Syntax:** Target OS is Windows; default shell is PowerShell. Avoid Unix bashisms (`export`, `source`, `cat file | grep text`). Use PowerShell equivalents (`$env:KEY="val"`, `Select-String`, `Remove-Item -Recurse -Force`).
- **Surgical Edit Primitives:** Use `replace_file_content` (for single contiguous blocks) or `multi_replace_file_content` (for multiple non-contiguous blocks). Reserve `write_to_file` exclusively for creating brand-new files.
- **Dynamic Skill Index Fallback:** When a skill is excluded due to context budget limits, read `.agents/SKILLS_INDEX.md` and load `.agents/skills/<name>/SKILL.md` via `view_file` before generating code.
- **Markdown Link Standard:** Format clickable links with `[basename.ext](file:///path/to/file)` syntax so IDE navigations resolve instantly.
