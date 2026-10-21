---
name: agent-observer
description: >-
  Inspects the health, observability posture, rule compliance, and registration status of the Snapshot Portfolio agentic system (.agents/). Use when checking workflow health, diagnosing agent misbehavior, or verifying rules budget.
---

# Agent Observer Skill

This skill provides operational visibility into the `.agents/` subsystem for **Snapshot Portfolio** (`snapshot-portfolio-project`).

---

## 1. Fast Diagnostic Execution
To view the live status of rules, subagents, skills, state cache, and evaluation logs:

```bash
pnpm agents:status
```

The script runs a deterministic, 0-token file audit using Snapshot's terminal dashboard (`node .agents/scripts/status.ts`).

---

## 2. Interpreting Diagnostic Indicators

- **Invariant Rules**:
  - `PASS`: Rules exist and are strictly within Antigravity's 24KB per-file limit.
  - `WARN`: Rule file exceeds 24KB, risking automatic demotion to file pointers.
- **Specialized Subagents**:
  - `PASS`: Both `system_prompt.md` and `contract.json` exist for `@softarch-agent`, `@design-agent`, `@app-agent`, and `@content-agent`.
- **Skills Registry**:
  - `PASS`: `SKILL.md` contains valid YAML frontmatter (`name`, `description`).
- **State & Caching**:
  - `PASS`: `PROJECT_STATE.md` and `index.json` are present and populated.
  - `WARN`: State is uninitialized or pending synchronization.
- **Evaluation & Regressions**:
  - `PASS`: `regressions.json` is valid JSON and tracking invariants.

---

## 3. Resolving Reported Warnings
- If `PROJECT_STATE.md` or `index.json` shows `WARN`: Run `pnpm agents:sync` to regenerate.
- If a skill shows `WARN`: Inspect the YAML frontmatter in `.agents/skills/<name>/SKILL.md`.
