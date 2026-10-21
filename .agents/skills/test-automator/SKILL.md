---
name: test-automator
description: >-
  Executes and debugs verification gates in Snapshot Portfolio using TypeScript (pnpm typecheck / tsc --noEmit), ESLint (pnpm lint), content schema & asset validation (pnpm content validate), state alignment (pnpm agents:sync), and Next.js production build checks (pnpm build). Use when verifying code or content changes.
---

# Verification & Quality Gate Skill (`test-automator`)

This skill enforces **Snapshot Portfolio's** (`snapshot-portfolio-project`) verification gates across TypeScript compilation, ESLint static analysis, Zod content schema & asset validation, and Next.js 16 production builds.

---

## 1. Tiered Verification Protocol (Fastest First)

Always run verification checks in order of speed and specificity to conserve time and context budget:

### Gate 1: Content Schema & Asset Validation (`< 1s`)
```bash
pnpm content validate
```
- Validates all 8 JSON files in `content/*.json` against Zod 4 schemas (`lib/content/schemas.ts`), verifies unique IDs/slugs, checks canonical sort orders, and ensures every referenced image path exists in `public/`.

### Gate 2: TypeScript Typecheck (`< 5s`)
```bash
pnpm typecheck
```
*(Alias for `pnpm tsc --noEmit`)*
- Verifies strict TypeScript types across `app/`, `lib/`, and `.agents/scripts/`.
- Catches unawaited Next.js 16 `params`/`searchParams` Promises, missing props, and Zod schema type mismatches.

### Gate 3: ESLint Static Analysis (`< 5s`)
```bash
pnpm lint
```
- Enforces `eslint-config-next` (Next.js 16 + React 19 rules), hook dependencies, `<Image>` best practices, and unused variable checks.

### Gate 4: State Index Validation (`< 2s`)
```bash
pnpm agents:sync
```
- Scans `app/`, `content/*.json`, and `lib/` and updates `.agents/state/index.json`.

### Gate 5: Next.js Production Build Gate (Pre-Ship / Route Changes)
```bash
pnpm build
```
- Run when modifying route structures, `<Suspense>` boundaries (`useSearchParams`), Server Actions, or `next.config.ts` / Sentry instrumentation to ensure static/dynamic rendering succeeds without bailout errors.

---

## 2. Automated Stop Hook (`quality-gate.ps1`)
Whenever TypeScript/TSX source files are modified in the working tree, `.agents/scripts/quality-gate.ps1` automatically runs `pnpm lint` and `pnpm tsc --noEmit` before concluding the agent turn.

---

## 3. Optional Future Unit Testing Reference
If unit tests are introduced in the future, see [Sample Validation Pattern](./examples/sample_test.ts) for testing Zod schemas in `lib/content/schemas.ts`.
