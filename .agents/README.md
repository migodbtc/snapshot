# Snapshot Agentic System (`.agents/`)

This directory houses the deterministic, token-efficient agentic architecture for the **Snapshot Portfolio** (`snapshot-portfolio-project`) codebase. Developed by @migodbtc with Google Antigravity harness patterns.

## Directory Topology

- **`rules/`**: Invariant policies loaded automatically by Antigravity (workspace safety boundaries, command permissions, and Next.js 16 / React 19 / Zod 4 conventions).
- **`agents/`**: Specialist subagent profiles, briefing/debriefing JSON contracts, and the standardized system prompt template (`_template/`).
- **`skills/`**: Progressive runbooks triggered on-demand with executable scripts and reference documentation.
- **`scripts/`**: Zero-dependency Node.js/TypeScript CLI scripts powering IDE content management (`content.ts`), state indexing (`sync-state.ts`), health observability (`status.ts`), deterministic Kanban (`kanban.ts`), and lifecycle hooks (`safety-guard.cjs`, `quality-gate.ps1`).
- **`state/`**: Hybrid persistent state ledger (`PROJECT_STATE.md` and `index.json`) preventing repetitive codebase re-exploration across sessions.
- **`evaluation/`**: Lean incident recorder (`regressions.json`) capturing framework and architectural invariants to prevent repeated mistakes.

## Architectural Domains Covered

1. **`app` (Frontend UI & Public Portfolio Routes)**: Next.js 16 App Router (`app/v2/landing`, `app/v2/blog`, `app/page.tsx`, `app/blog/page.tsx`, `app/v2/_components/`).
2. **`content` (Consolidated JSON Arrays, Zod 4 Layer & IDE CLI)**:
   - 6 flat JSON array collections (`content/projects.json`, `content/blog.json`, `content/skills.json`, `content/testimonies.json`, `content/experience.json`, `content/education.json`) and 2 singletons (`content/site-config.json`, `content/about.json`).
   - Universal client/server Zod 4 schemas and loaders in `lib/content/` (`schemas.ts`, `index.ts`, `icons.tsx`), bridged via `lib/constants/`.
   - Managed locally in the IDE via `.agents/scripts/content.ts` (`pnpm content status|validate|list|show|add|update|remove|sort`).
3. **`integrations` (Contact Actions, Supabase & Observability)**: Contact form Server Action (`app/actions/contact.ts` with Cloudflare Turnstile + Resend API), Supabase SSR clients (`lib/supabase/`), and Sentry instrumentation (`@sentry/nextjs`).

## Workflow Execution (The Specialist Model)

1. **Orchestrator** inspects `.agents/state/PROJECT_STATE.md`, `.agents/state/index.json`, and Kanban (`pnpm kanban status` / `pnpm kanban ls`).
2. **Software Architect Specialist** (`@softarch-agent`) retrieves bounded context slices and constructs a structured implementation brief.
3. **Design & UX Specialist** (`@design-agent`) reviews visual changes against Snapshot's dark editorial aesthetic (`bg-neutral-950`, crimson `rose-600` accents, grayscale vignette imagery, 12-column asymmetrical layouts).
4. **Domain Specialist Subagents** execute bounded modifications:
   - `@app-agent`: Public portfolio routes, V2 components, Framer Motion transitions, responsive layouts, and contact Server Actions.
   - `@content-agent`: Consolidated JSON array collections (`content/*.json`), Zod 4 schemas (`lib/content/`), constants (`lib/constants/`), and `pnpm content` CLI operations.
5. **Verification Gate** executes `pnpm content validate`, `pnpm typecheck` (`tsc --noEmit`), `pnpm lint`, and `pnpm build` before concluding or transitioning Kanban tasks.
6. **Orchestrator** updates `.agents/state/PROJECT_STATE.md` and syncs `.agents/state/index.json` (`pnpm agents:sync`) upon completion.
