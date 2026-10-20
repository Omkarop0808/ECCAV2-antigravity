# Systematic Debugging Workflow

A zero-guesswork, evidence-first troubleshooting methodology for diagnosing and fixing runtime crashes, unexpected behavior, and flaky tests.

---

## Phase 1: Reproduction & State Capture

- **Persona:** `systematic-debugging`
- **Active Skills:** `systematic-debugging`, `error-handling`
- **Actions:**
  - Create a minimal reproducible test case or capture exact curl/CLI commands.
  - Record the exact stack trace, error code, and calling thread/process context.
  - Never guess or modify code before observing the failure deterministically.

---

## Phase 2: Scientific Hypothesis Formulation

- **Persona:** `silent-failure-hunter`
- **Active Skills:** `agent-introspection-debugging`
- **Actions:**
  - Formulate a falsifiable hypothesis explaining why the bug occurs.
  - Trace input data flow from ingress through transformations to failure point.
  - Check for common failure modes: unhandled `null`, race conditions, unawaited promises, stale closures, or unlogged catch blocks.

---

## Phase 3: Root Cause Isolation

- **Persona:** `performance-optimizer` / `database-reviewer`
- **Actions:**
  - Add temporary diagnostic logging or run localized test cases to test the hypothesis.
  - Distinguish between symptoms (e.g. timeout, 500 error) and actual root causes (e.g. unclosed DB connection, deadlock).
  - Verify if external dependencies or environment variables are involved.

---

## Phase 4: Surgical Patch Application

- **Persona:** `code-simplifier`
- **Active Skills:** `karpathy-principles`, `anti-failure-patterns`
- **Actions:**
  - Implement the smallest scoped fix that directly resolves the root cause.
  - Preserve existing code conventions, indentation, and docstrings.
  - Avoid drive-by refactoring or altering unrelated logic.

---

## Phase 5: Regression Proof & Evidence

- **Persona:** `tdd-guide`
- **Active Skills:** `verification-before-completion`
- **Actions:**
  - Run the reproduction test to prove the fix resolves the failure.
  - Run the entire test suite to guarantee zero unintended regressions.
  - Show the actual terminal execution output as concrete proof.
