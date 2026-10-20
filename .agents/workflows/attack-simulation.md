# Multi-Stage APT Attack Simulation & Defense Validation

Autonomous cyber range workflow for executing controlled persistence scenarios and verifying defensive telemetry.

## Stages

### Stage 1: Initial Ingress & Infiltration
- Stream simulated adversary network packets across the perimeter towards the target host node.
- Verify packet sniffer captures IP, port, protocol, and payload size.

### Stage 2: Privilege Escalation & Defense Tampering
- Execute controlled registry modification against Windows Defender realtime monitoring policies.
- Verify that Win32 watcher intercepts the mutation and normalizer flags the event.

### Stage 3: Persistence Mechanism Installation
- Inject decoy Run key or IFEO Debugger Hijack persistence configuration.
- Verify Rule Engine triggers detection matching MITRE ATT&CK `T1547.001` or `T1546.012`.
- Verify Alert Manager produces a `CRITICAL` alert and broadcasts over WebSockets.

### Stage 4: Honeypot & Canary Tripwire
- Trigger file modifications on active honeypot canary files.
- Verify Ransomware Guard detects rapid burst rate and triggers lockdown alarm.

### Stage 5: Forensic Proof & Automated Rollback
- Query SQLite WAL storage to confirm full forensic audit trail.
- Verify CIA integrity ledger hash verification.
- Revert all decoy registry keys and restore pristine baseline state.
