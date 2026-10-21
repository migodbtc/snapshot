# Next.js 16, React 19 & Zod 4 Architectural Invariants

Snapshot (`snapshot-portfolio-project`) runs on **Next.js 16.2.9**, **React 19.2.4**, **Tailwind CSS v4**, and **Zod 4**. Training data defaults often rely on legacy Next.js 14/15 patterns that cause breaking bugs. All agents must enforce the following invariants:

---

## 1. Asynchronous Request APIs (Breaking Next.js 15/16 Change)
- `params`, `searchParams`, `cookies()`, and `headers()` in Page props, Layout props, Server Actions, and Route Handlers are **Promises**.
- **Rule**: You MUST `await params`, `await searchParams`, `await cookies()`, and `await headers()` before accessing their properties or methods.
- **Client Component `useSearchParams()`**: Any Client Component calling `useSearchParams()` (such as `app/v2/blog/page.tsx`) MUST be wrapped in a `<Suspense>` boundary to prevent static prerendering bailout errors during `next build`.

---

## 2. Server Component vs. Client Component Boundaries & Universal Content Layer
- **Universal JSON Array Content Layer (`content/*.json` & `lib/content/`)**:
  - All portfolio content lives in 6 flat JSON array files (`projects.json`, `blog.json`, `skills.json`, `testimonies.json`, `experience.json`, `education.json`) and 2 singletons (`site-config.json`, `about.json`).
  - `lib/content/index.ts` imports these JSON files statically without `node:fs`, making `lib/content` and `lib/constants` safe to import in both Server Components and `'use client'` Components.
- **Serializable Icon Keys**:
  - Because React component functions (`LucideIcon`, `IconType`) are not serializable in JSON or across Server-to-Client boundaries, store icon identifiers as string keys (`iconKey`) in `content/*.json` and resolve them via icon maps (`lib/content/icons.tsx` or `app/v2/landing/constants.ts`).
- **Server-Only Isolation**:
  - Modules that use `next/headers` or private environment variables (`RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`, `SUPABASE_PUBLISHABLE_KEY`) must NEVER be imported into `'use client'` components. Use `import "server-only"` in Server Actions (`app/actions/contact.ts`).

---

## 3. IDE-First Content Mutations & Server Actions
- **No Web Admin / OAuth Routes**: Content is never mutated at runtime on the web server. All content additions, updates, sorting, and validations are executed locally in the IDE via `pnpm content` (`.agents/scripts/content.ts`) and validated against `lib/content/schemas.ts`.
- **Contact Server Action (`app/actions/contact.ts`)**: Must begin with `"use server";` and `import "server-only";`, validate payloads with Zod 4 (`ContactSubmissionSchema`), verify Cloudflare Turnstile tokens when configured, and return structured `{ success: boolean; error?: string }` responses.

---

## 4. Module Import Aliases
- Use the configured TypeScript path alias `@/*` (mapped to `./*` in `tsconfig.json`):
  - `@/app/*`
  - `@/lib/content` and `@/lib/content/schemas`
  - `@/lib/constants/*`
  - `@/lib/supabase/*`
  - `@/content/*.json`
- Avoid deeply nested relative paths across top-level directories.
