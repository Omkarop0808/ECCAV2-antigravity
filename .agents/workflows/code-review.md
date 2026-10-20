# Comprehensive Code Review Workflow

Multi-perspective code review pipeline combining architecture, quality, performance, and security checks.

## Phase 1: Context & Diff Gathering

- Identify modified files using git status or diff.
- Classify touched domains: Backend (Python/FastAPI), Frontend (React/TSX), Telemetry/OS, or Database.

## Phase 2: Agent Delegations

- For Python/FastAPI changes -> Run `fastapi-reviewer` checks.
- For React/TSX changes -> Run `react-reviewer` checks.
- For Security or Auth changes -> Run `security-reviewer` checks.
- For Error handling & fallbacks -> Run `silent-failure-hunter` checks.

## Phase 3: Synthesis & Verification

- Compile actionable review items with exact file and line references.
- Verify that changes include corresponding automated unit/integration tests.
- Ensure zero regression in build or lint checks.
