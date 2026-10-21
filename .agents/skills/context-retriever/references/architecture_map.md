# Snapshot Portfolio Architecture Map

> **Auto-Verification Note**: This map is aligned with Snapshot's directory structure and validated by `.agents/scripts/sync-state.ts`. Whenever new routes, content collections, or library modules are added, running `pnpm agents:sync` updates `.agents/state/index.json`.

---

## The Core Architectural Domains

| Domain | Root Paths | Primary Entry Points | Core Responsibility |
| :--- | :--- | :--- | :--- |
| **1. Public UI & Routing (`app`)** | `app/`, `app/v2/` | `app/page.tsx`, `app/v2/landing/page.tsx`, `app/v2/blog/page.tsx` | Next.js 16 App Router views, dark editorial + `rose-600` UI, Framer Motion animations |
| **2. Content & IDE CLI (`content`)** | `content/`, `lib/content/`, `lib/constants/`, `.agents/scripts/content.ts` | `lib/content/schemas.ts`, `lib/content/index.ts`, `.agents/scripts/content.ts` | 6 flat JSON array collections + 2 singletons, Zod 4 schemas, universal loaders, `pnpm content` CLI |
| **3. Integrations (`integrations`)** | `app/actions/`, `lib/supabase/`, `sentry.*.ts` | `app/actions/contact.ts`, `lib/supabase/server.ts`, `next.config.ts` | Cloudflare Turnstile + Resend contact dispatch, Supabase SSR clients, Sentry telemetry |

---

## Inter-Module Dependency Flows

```text
[IDE Terminal: pnpm content CLI (.agents/scripts/content.ts)]
      │
      ├─── Atomic Write + Canonical Sort + Read-Time Calc
      ▼
[Consolidated JSON Collections: content/*.json]
  (projects.json, blog.json, skills.json, testimonies.json,
   experience.json, education.json, site-config.json, about.json)
      │
      ├─── Validated by [Zod 4 Schemas: lib/content/schemas.ts]
      ▼
[Universal Content & Constants Layer: lib/content/index.ts & lib/constants/*]
      │
      ▼
[Public UI: app/v2/landing & app/v2/blog]
```
