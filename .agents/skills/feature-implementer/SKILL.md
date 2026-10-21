---
name: feature-implementer
description: >-
  Implements code changes, refactors, content updates, and feature additions cleanly and safely following Snapshot Portfolio's Next.js 16, React 19, Zod 4, and Dark Editorial UI conventions. Use when executing an approved plan or writing code.
---

# Feature Implementer Skill

This skill guides the safe application of code and content changes in **Snapshot Portfolio** (`snapshot-portfolio-project`).

## 1. Pre-Flight Checklist
1. Review the brief provided by the `feature-planner` skill.
2. Read [Next.js 16 Gotchas](./references/next16_gotchas.md) to avoid common build or runtime errors.
3. Verify whether the change touches JSON schemas (`lib/content/schemas.ts`), which requires synchronized updates to `content/*.json`, `.agents/scripts/content.ts`, and consumers.

## 2. Modification Rules
- Use `replace_file_content` for surgical, line-bounded edits.
- Use `pnpm content` CLI commands (`add`, `update`, `remove`, `sort`, `validate`) when mutating `content/*.json` collections.
- Maintain documentation integrity: do not strip existing comments or docstrings.
- Ensure cross-directory imports use `@/` path aliases (`@/lib/content`, `@/app/v2/...`, `@/content/...`).
- Keep `lib/content/index.ts` and `lib/content/schemas.ts` completely universal (zero `node:fs` imports) so both Server and Client Components can import them directly.

## 3. Post-Implementation Verification Handover
Immediately after writing code:
1. Do not declare the task done prematurely.
2. Trigger the `test-automator` skill to execute `pnpm content validate`, `pnpm typecheck` (`tsc --noEmit`), and `pnpm lint`.
3. If errors arise, resolve them immediately before notifying the user.
4. Do NOT execute `git commit` or `git push`. Version control is strictly user-owned. Leave all code changes in the working directory for user review and manual commit.
