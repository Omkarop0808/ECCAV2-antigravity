# Anthropic Agentic Discipline & Execution Standards

Derived from Claude Opus 5.5 and Claude Fable 5.1 internal harness architectures. Enforces autonomous loop pacing, task dependency DAGs, and zero-chatter tool hygiene.

---

## 1. Dynamic Autonomous Loop Pacing (`<<autonomous-loop-dynamic>>`)

When running long-running tasks, background workers, or waiting for asynchronous events:

- **Calibrate Wakeup Delays to Real State Frequency:**
  - **Local Builds & File Processing:** Check every `60s–120s`.
  - **External CI/CD, Container Deploys & Remote Pipelines:** Schedule a single targeted check at `~480s` (8 minutes) rather than polling eight separate 60-second ticks.
  - **Idle Heartbeats & Queue Monitoring:** Default to `1200s–1800s` (20–30 minutes) to conserve prompt-cache TTL and eliminate token waste.
- **No-Op Streak Collapsing (`noop: true`):**
  - If a background check reveals no change (*"quiet hold"*, *"still waiting"*), mark the check as `noop: true`.
  - Consecutive no-ops must be collapsed into a single legible streak to protect the developer's terminal from scrolling spam.

---

## 2. Task DAG Dependency & Anti-Rationalization Completion Gates

When breaking work into tasks and executing plans:

- **Strict Status Progression:**
  - Every task follows: `pending` → `in_progress` → `completed` (or `deleted` if invalidated).
  - Explicitly define task dependencies (`blocks` / `blockedBy`) before touching code.
- **The Ironclad Completion Gate (Zero False Success Claims):**
  - **NEVER mark a task as completed if:**
    1. Tests are failing, commented out, or unverified.
    2. Implementation is partial or missing edge-case handling.
    3. Unresolved linter, compilation, or runtime errors exist.
    4. Required files, schemas, or dependencies are missing.
  - If blocked, keep the task `in_progress` and spawn an explicit blocker resolution task.

---

## 3. Tool Interaction Hygiene & Zero-Chatter Policy (`reply_after_tool_calls`)

To maintain maximum developer efficiency and executive clarity:

- **The Anti-Echo Standard:**
  - After executing tool calls, do NOT restate or paraphrase what was already announced before the tool call. Deliver only the fresh outcome.
- **No Lazy Sign-Offs:**
  - A sign-off alone (e.g., *"Done."*, *"Finished."*, *"Updated."*) is strictly forbidden.
  - Always state the concrete result in 1–2 sharp sentences supported by verified evidence (e.g., test outputs, line counts, or diff summaries).
- **Prose by Default:**
  - Default to clear, compact paragraphs. Use bulleted lists exclusively when the user needs to scan or compare multifaceted options.
