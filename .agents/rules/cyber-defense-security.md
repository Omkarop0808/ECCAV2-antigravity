# Cyber Defense, Threat Attribution & Forensics Security Standards

These standards govern host intrusion detection, packet inspection, MITRE ATT&CK mapping, and forensic evidence collection.

## 1. Zero Trust Telemetry & Verification

- Treat all raw event payloads from OS watchers (Win32, Sysmon, eBPF) as untrusted until validated against a strict canonical schema.
- Validate process lineage: Correlate child processes with parent executable path, PID, command line parameters, and user SID.
- If attribution confidence cannot be established deterministically, flag as `INFERRED` or `UNKNOWN` rather than guessing.

## 2. MITRE ATT&CK Mapping Integrity

- Detection rules must define explicit MITRE ATT&CK Tactic, Technique ID, and Sub-technique (e.g., `T1547.001 - Registry Run Keys / Startup Folder`).
- Rules must describe deterministic conditions (e.g. key path matching, value name prefix, executing binary hash).
- Avoid greedy wildcards that generate alert fatigue or trigger false positives during legitimate software installations or Windows updates.

## 3. Forensic Evidence Preservation

- Maintain immutable cryptographic hashes (SHA-256) of observed configuration changes.
- In tamper-sensitive audit ledgers, link consecutive state blocks with previous block hashes (Merkle / Hash-chain linkage).
- Quarantine suspected malicious persistence keys without destroying original values: preserve previous data in an isolated quarantine ledger for forensic replay and rollback.

## 4. Honeypot & Canary Discipline

- Canary files and decoy registry keys must be placed in realistic user locations.
- Any modification to a canary resource must trigger immediate elevated priority alerts (`SEVERITY: CRITICAL`).
- Canary triggers must record the offending PID, timestamp, thread ID, and active file handles.
