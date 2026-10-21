---
name: context-aligner
description: >-
  Detects and resolves context drift between the actual Snapshot Portfolio codebase and the .agents/ configuration. Use when new routes, JSON content files, Zod schemas, or packages have been added to update the state index, architecture map, and skill references.
---

# Context Aligner Skill

This skill synchronizes the `.agents/` intelligence layer with changes in the physical **Snapshot Portfolio** repository, eliminating "drift" across sessions.

---

## 1. When to Trigger
Activate this skill when:
- New pages, components, or Server Actions have been created under `app/`.
- Consolidated JSON content files have been updated under `content/*.json`.
- Zod schemas, universal content loaders, or `pnpm content` CLI commands have been updated in `lib/content/` or `.agents/scripts/content.ts`.
- Dependencies have been added or removed in `package.json`.

---

## 2. Alignment Protocol

Follow the [Drift Checklist](./references/drift_checklist.md) across three stages:

### Stage 1: Detect Drift
1. Inspect `git status` to identify recent file additions, modifications, or deletions.
2. Compare newly discovered files against `.agents/state/index.json`.

### Stage 2: Regenerate Machine State & Validate Content
Run the centralized sync and content validation scripts:
```bash
pnpm content validate
pnpm agents:sync
```
This validates all 8 `content/*.json` files and updates `.agents/state/index.json` with fresh routes, content collections, library modules, and Server Actions at zero LLM token cost.

### Stage 3: Align Architecture Map & Skill References
If any new top-level architectural domains or core patterns were created:
1. Update [Architecture Map](../context-retriever/references/architecture_map.md) to record the new module.
2. If new framework gotchas were discovered, append them to [Next.js 16 Gotchas](../feature-implementer/references/next16_gotchas.md).

---

## 3. Completion Check
Run the observer to confirm clean alignment:
```bash
pnpm agents:status
```
