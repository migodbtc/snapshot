# Command Access Control & Service Policy

This document defines the terminal command access control policy across all specialist subagents in the **Snapshot Portfolio** (`snapshot-portfolio-project`) workspace. Each subagent is granted execute permissions exclusively for commands matching its domain authority.

---

## Command Access Matrix

| Subagent | Service / Domain | Allowed `package.json` Scripts & CLI Commands |
| :--- | :--- | :--- |
| **`@softarch-agent`** | Software Architecture & Planning | `pnpm agents:status`, `pnpm agents:sync`, `pnpm content status`, `pnpm content validate`, `pnpm kanban status`, `pnpm kanban ls`, `pnpm kanban show` |
| **`@design-agent`** | Design & UX Architecture | Read-only inspection (`view_file`); no terminal mutations required |
| **`@app-agent`** | Frontend UI, V2 Routes & Actions | `pnpm dev`, `pnpm build`, `pnpm lint`, `pnpm typecheck`, `pnpm kanban tick`, `pnpm kanban block` |
| **`@content-agent`** | Content JSON Arrays, Schemas & CLI | `pnpm content`, `pnpm typecheck`, `pnpm lint`, `pnpm agents:sync`, `pnpm kanban tick`, `pnpm kanban block` |

---

## Operating Invariants

1. **Subagent Command Isolation**: Subagents must never invoke commands outside their allocated perimeter:
   - Neither `@app-agent` nor `@content-agent` may execute production deployment commands (`pnpm deploy:prod`) or git commits (`git commit`, `git push`).
   - Only the parent **Orchestrator** may execute Kanban board transitions (`pnpm kanban start`, `test`, `review`, `done`, `add`, `drop`).
2. **Handoff Protocol**: When a task crosses domain boundaries (e.g., adding a new content field requires updating Zod schemas in `lib/content/schemas.ts`, JSON arrays in `content/*.json`, and UI rendering in `app/v2/`), the Orchestrator sequences execution:
   1. `@softarch-agent` maps the cross-domain impact across `content/*.json`, `lib/content/`, and `app/v2/`.
   2. `@design-agent` specifies the visual hierarchy, typography, and responsive grid tokens if UI layout changes are involved.
   3. `@content-agent` updates the Zod schema (`lib/content/schemas.ts`), loader (`lib/content/index.ts`), and JSON arrays (`content/*.json` via `pnpm content`), verifying with `pnpm content validate`.
   4. `@app-agent` updates the public portfolio components (`app/v2/`) and verifies with `pnpm typecheck` and `pnpm lint`.
