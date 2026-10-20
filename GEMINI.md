# Google Antigravity & Gemini Agent Baseline

This configuration establishes the baseline behavioral guidelines for Google Antigravity and Gemini CLI agents working in this repository.

---

## Operating Protocol

1. **Rule Auto-Discovery:** Load and adhere strictly to all active rules inside `.agents/rules/`.
2. **Intent-Driven Routing:** Classify requests using `.agents/rules/automatic-routing-policy.md` (Intents A through J).
3. **Dynamic Skills Loading:** If a skill is not in active memory, search `.agents/SKILLS_INDEX.md` and load it via `view_file`.
4. **Tool Primitives:**
   - Use `view_file` to read files.
   - Use `replace_file_content` for single contiguous edits; `multi_replace_file_content` for multiple edits.
   - Use `write_to_file` only for brand-new files.
   - Use `run_command` with exact working directory `Cwd:`. Never pass inline `cd` commands.
5. **Verification Evidence:** Execute tests (`pytest`, `npm test`, `vite build`) and show terminal output before claiming task resolution.
