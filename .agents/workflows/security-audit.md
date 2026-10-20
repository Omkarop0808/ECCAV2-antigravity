# Security Audit Workflow

Multi-agent automated security audit pipeline for the repository.

## Execution Sequence

1. **Static Secrets & Vulnerability Scan:**
   - Scan codebase for hardcoded API keys, tokens, unparameterized queries, and unsafe deserialization.
   - Run `npm audit` or `pip check` to find vulnerable dependencies.

2. **Endpoint & Authorization Audit:**
   - Review all FastAPI endpoints in `src/api/` or equivalent controllers.
   - Verify input validation using Pydantic v2 schemas.
   - Verify CORS origin restrictions and rate limiting.

3. **Telemetry & Forensic Verification:**
   - Verify registry and event normalization pipelines handle corrupted or adversarial input without crashing.
   - Verify honeypots, canary watches, and integrity ledgers detect unauthorized modifications.

4. **Output Report:**
   - Produce a markdown findings table categorized by severity: `CRITICAL`, `HIGH`, `MEDIUM`, `LOW`.
   - Provide concrete code remediations for each finding.
