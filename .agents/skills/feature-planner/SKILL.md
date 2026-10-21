---
name: feature-planner
description: >-
  Translates user requests into a bounded, schema-validated technical implementation brief. Analyzes cross-cutting domain impacts across Snapshot Portfolio (app, content, integrations), specifies verification gates, and flags Next.js 16 invariants before any code is written.
---

# Feature Planner Skill

This skill translates high-level user requests into a concrete, executable blueprint for **Snapshot Portfolio** (`snapshot-portfolio-project`). It prevents "hallucinated development" where agents start editing files without understanding cross-module impacts.

---

## The 4-Step Planning Process

```text
User Intent ──► [1. Scope Analysis] ──► [2. Cross-Domain Impact] ──► [3. Invariants Check] ──► [4. Executable Brief]
```

### Step 1: Scope Analysis
1. Parse the user request to determine the primary goal (new portfolio section, V2 UI polish, JSON content update via `pnpm content`, or integration change).
2. Inspect Kanban (`.agents/kanban/00_suggestions.json` and `.agents/kanban/01_planning.json`) to incorporate related user ideas and task dependencies.
3. Activate `context-retriever` (`.agents/state/index.json`) to inspect existing code rather than assuming file structures.

### Step 2: Cross-Domain Impact Assessment
Evaluate impact across all 3 Snapshot Portfolio domains:
- **Public UI & Routing (`app/`)**: Does this require changes to `app/v2/landing/`, `app/v2/blog/`, `app/v2/_components/`, or Framer Motion transitions? $\rightarrow$ `@app-agent` (with `@design-agent` specification).
- **Content, Zod Schemas & IDE CLI (`content/` & `lib/content/` & `lib/constants/` & `.agents/scripts/content.ts`)**: Does this add/modify JSON fields in `content/*.json`, Zod schemas in `lib/content/schemas.ts`, universal loaders in `lib/content/index.ts`, or icon mappings in `lib/content/icons.tsx`? $\rightarrow$ `@content-agent`.
- **External Integrations (`app/actions/contact.ts`, `lib/supabase/`, Sentry)**: Does this affect contact email delivery, Turnstile verification, or Supabase/Sentry configs? $\rightarrow$ `@app-agent`.

### Step 3: Invariants Verification
Before writing the plan, verify against `.agents/rules/`:
- **Next.js 16 Rules**: Are `params`, `searchParams`, `cookies()`, and `headers()` awaited? Are `useSearchParams()` consumers wrapped in `<Suspense>`? Are `lib/content/index.ts` and `lib/content/schemas.ts` kept universal (zero `node:fs` imports)?
- **Visual Design Identity**: Does the UI adhere to Snapshot's dark editorial aesthetic (`bg-neutral-950`, `text-rose-600` accents, grayscale vignette photography, 12-column asymmetrical grids)?
- **Safety Policy**: Does the plan avoid destructive commands and keep git commits strictly user-owned?

### Step 4: Constructing the Implementation Brief
Every plan must emit four concrete components:
1. **Target File Matrix**: Exact list of files to `CREATE` or `MODIFY` with assigned specialist owner (`@app-agent` or `@content-agent`).
2. **Invariants & Schema Checklist**: Confirmation of Zod 4 schema parity (`pnpm content validate`), Server/Client boundary isolation, and dark editorial styling tokens.
3. **Verification Gates**:
   - Content Validation: `pnpm content validate`
   - Typecheck: `pnpm typecheck` (`pnpm tsc --noEmit`)
   - Lint: `pnpm lint`
   - Production Build Check (for routing/Suspense/SSR changes): `pnpm build`
4. **Rollback Strategy**: How to revert cleanly if build or verification gates fail.

Consult [Sample Implementation Brief](./examples/sample_brief.md) for the required output format.
