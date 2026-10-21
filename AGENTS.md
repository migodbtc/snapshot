<!-- BEGIN:snapshot-agentic-workflow -->

# Snapshot Portfolio Agentic System Instructions

This repository (`snapshot-portfolio-project`) is governed by the deterministic agentic system configured in `.agents/`. All agents operating in this workspace must follow these protocols:

## 1. Zero-Exploration Fast Path (Context Efficiency)
- **Do NOT recursively scan directories or open files blindly.**
- **First Action**: Always check `.agents/state/index.json` to look up App Router routes, consolidated JSON array files in `content/*.json`, Zod schemas in `lib/content/`, Server Actions, and library modules in a single read.
- **Active Sprint Context**: Inspect `.agents/kanban/02_in_progress.json` to load the active sprint micro-task and acceptance criteria.
- **Kanban & Ideation Intake**: Whenever inspecting Kanban or planning sprints, always check `.agents/kanban/00_suggestions.json` alongside `.agents/kanban/01_planning.json` (via `pnpm kanban status` or `pnpm kanban ls`) to review user ideas, UI/UX refinements, and content updates.
- **Living Memory**: Inspect `.agents/state/PROJECT_STATE.md` to understand macro milestones, architecture decisions, and current priorities before planning tasks.

## 2. Invariant Rules & Security
- Read and adhere strictly to `.agents/rules/safety_policy.md` (no destructive git commands, no unauthorized deletion of `content/*.json` or `public/images/`, strict secret protection).
- Read and adhere strictly to `.agents/rules/nextjs_conventions.md` (Next.js 16 async `params`/`searchParams`, `<Suspense>` boundaries for `useSearchParams()`, React 19 Server/Client boundaries, `import 'server-only'`, and Zod 4 validation).
- **IDE-Only Content Management (No Web Admin / OAuth)**:
  - Portfolio content is stored exclusively in flat JSON array files (`content/projects.json`, `content/blog.json`, `content/skills.json`, `content/testimonies.json`, `content/experience.json`, `content/education.json`) plus `content/site-config.json` and `content/about.json`.
  - All content edits are performed locally in the IDE via the deterministic CLI (`pnpm content status|validate|list|show|add|update|remove|sort`) or direct JSON editing followed by `pnpm content validate`. Never create web-based `/admin` or OAuth routes.
- **Strict User Version Control Exclusivity (Zero AI Commits)**:
  - Agents (including Orchestrator and all specialist subagents) must NEVER execute `git commit`, `git push`, or `git merge`.
  - Version control is strictly reserved for the human user. Agents apply code/content edits, verify with `pnpm content validate`, `pnpm typecheck` (`tsc --noEmit`), and `pnpm lint`, and leave all changes in the working directory for user review and manual commit.
- **Kanban Governance & Authority Boundaries**:
  - Agents must NEVER edit `.agents/kanban/*.json` files manually with text replacement tools.
  - **Orchestrator Authority**: Exclusively owns column transitions (`pnpm kanban start`, `test`, `review`, `done`, `add`, `drop`).
  - **Specialist Authority**: Subagents (`@app-agent`, `@content-agent`, etc.) are STRICTLY limited to `pnpm kanban tick <id> <criteria_id>` and `pnpm kanban block <id> "<reason>"`.
  - **WIP=1 Discipline**: Never start or queue concurrent tasks in `02_in_progress.json`.
  - **Continuous Suggestion Awareness**: Always inspect `00_suggestions.json` when evaluating backlog, grooming tasks, or running `pnpm kanban ls`/`status`.
  - **Memory Separation**: Kanban is ephemeral operational execution memory. Permanent architectural milestones and blockers must be recorded in `.agents/state/PROJECT_STATE.md`.

## 3. Specialist Subagents & Skills
- **Planning & Architecture (`@softarch-agent`)**: Use `.agents/agents/softarch-agent/system_prompt.md`. In sessions where custom subagents are registered via `define_subagent(name: "softarch-agent", enable_write_tools: false)`, invoke with `TypeName: "softarch-agent"`; otherwise dispatch via `TypeName: "research"` with role `"Software Architect Specialist"`. Performs read-only codebase analysis across Snapshot's architectural domains (`app`, `content`, `integrations`) and produces structured implementation briefs.
- **Design & UX Architecture (`@design-agent`)**: Use `.agents/agents/design-agent/system_prompt.md`. In sessions where custom subagents are registered via `define_subagent(name: "design-agent", enable_write_tools: false)`, invoke with `TypeName: "design-agent"`; otherwise dispatch via `TypeName: "research"` with role `"Design & UX Specialist"`. Owns Snapshot's dark editorial aesthetic (`bg-neutral-950`, crimson `rose-600` accents, grayscale vignette photography, 12-column asymmetrical splits, Framer Motion choreography) and directs `@app-agent` on execution.
- **Frontend & Public UI (`@app-agent`)**: Use `.agents/agents/app-agent/system_prompt.md`. In sessions where custom subagents are registered via `define_subagent(name: "app-agent", enable_write_tools: true)`, invoke with `TypeName: "app-agent"`; otherwise dispatch via `TypeName: "self"` with role `"Frontend & Application Specialist"`. Owns public portfolio routes (`app/v2/`, `app/page.tsx`, `app/blog/`, `app/_components/`), animations, and contact Server Actions (`app/actions/contact.ts`).
- **Content, Schema & IDE CLI (`@content-agent`)**: Use `.agents/agents/content-agent/system_prompt.md`. In sessions where custom subagents are registered via `define_subagent(name: "content-agent", enable_write_tools: true)`, invoke with `TypeName: "content-agent"`; otherwise dispatch via `TypeName: "self"` with role `"Content & Schema Specialist"`. Owns the consolidated JSON array collections in `content/*.json`, Zod 4 schemas & universal loaders in `lib/content/`, static bridges in `lib/constants/`, and the IDE CLI controller (`.agents/scripts/content.ts` via `pnpm content`).
- **On-Demand Skills**: Activate progressive runbooks under `.agents/skills/`:
  - `context-retriever`: Line-bounded code slices across Snapshot's architectural domains.
  - `feature-planner`: 4-step feature decomposition and verification briefs.
  - `feature-implementer`: Surgical code and content edits adhering to Next.js 16 and Snapshot conventions.
  - `test-automator`: Verification runner for Content & Asset validation (`pnpm content validate`), TypeScript (`pnpm typecheck`), ESLint (`pnpm lint`), and Next.js build checks (`pnpm build`).
  - `context-aligner`: Repository drift detection (`pnpm agents:sync`).
  - `agent-observer`: Operational health dashboard (`pnpm agents:status`).

<!-- END:snapshot-agentic-workflow -->

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
