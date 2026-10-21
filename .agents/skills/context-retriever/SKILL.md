---
name: context-retriever
description: >-
  Retrieves minimal, high-precision code slices and dependency maps without polluting conversational context with entire files. Covers all 3 core Snapshot Portfolio domains (app, content, integrations). Use before planning or implementing.
---

# Context Retriever Skill

This skill retrieves exact line ranges and symbol definitions using Snapshot's persistent state index and targeted file inspection.

## 1. Domain Coverage (All 3 Snapshot Tiers)
Before inspecting files, identify which of Snapshot's 3 domains apply to the task:
1. **`app`**: Public Next.js 16 App Router UI (`app/v2/landing/`, `app/v2/blog/`, `app/v2/_components/`, `app/page.tsx`, `app/blog/page.tsx`, `app/globals.css`).
2. **`content`**: Consolidated JSON array collections (`content/projects.json`, `content/blog.json`, `content/skills.json`, `content/testimonies.json`, `content/experience.json`, `content/education.json`) + singletons (`content/site-config.json`, `content/about.json`), Zod 4 schemas & universal loaders in `lib/content/`, static bridges in `lib/constants/`, and the IDE CLI (`.agents/scripts/content.ts`).
3. **`integrations`**: Contact email Server Action (`app/actions/contact.ts` with Cloudflare Turnstile + Resend API), Supabase SSR clients (`lib/supabase/`), and Sentry observability (`next.config.ts`, `instrumentation*.ts`, `sentry.*.config.ts`).

## 2. Fast Path: Inspect Persistent State
1. Inspect `.agents/state/index.json`.
2. If `.agents/state/index.json` is missing or outdated, regenerate it:
   `pnpm agents:sync`
3. Consult [Architecture Map](./references/architecture_map.md) for module connections.

## 3. Targeted Inspection Protocol
- Never view full files over 150 lines if only a specific function or export is needed.
- Use `view_file` with `StartLine` and `EndLine` to load bounded slices.
- Emit briefing context slices with line ranges (e.g., `lib/content/schemas.ts#L9-L33`).
