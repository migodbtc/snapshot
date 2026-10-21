# Snapshot Portfolio — Living Project State (`PROJECT_STATE.md`)

> **Purpose**: Persistent macro-level architectural memory for the **Snapshot Portfolio** (`snapshot-portfolio-project`) repository. Updated by the Orchestrator upon completing major milestones.

---

## 1. Project Identity & Stack

- **Owner**: Miguel Justin Bunda (`@migodbtc`) — Software Engineer, BS Information Technology (Magna Cum Laude, Batch Valedictorian, Don Bosco Technical College), AWS Certified AI Practitioner.
- **Framework & Runtime**: Next.js 16.2.9 (App Router), React 19.2.4, TypeScript 5, Tailwind CSS v4, Framer Motion 13, Zod 4.
- **Visual Design System**: Dark Editorial Obsidian & Crimson (`bg-neutral-950`, `bg-neutral-900`, `text-white`, `text-slate-300`, `text-rose-600` accents, grayscale high-contrast photography with dark vignette overlays, 12-column asymmetrical grids).

---

## 2. Core Architectural Domains

1. **V2 Public Portfolio (`app/v2/landing/` & `app/page.tsx`)**:
   - Unified single-page V2 landing showcase (`V2HomePage` + `V2Navbar` + `V2Footer`) featuring:
     - **Hero**: Full-bleed grayscale portrait with scroll fade (`useScroll`/`useTransform`), bio, CTAs, and 3 quick-jump section cards.
     - **About Me**: 5/7 split with personal narrative, 3 interactive FYI cards, and framed portrait.
     - **Built Projects**: 3/9 split with chronological timeline (`ProjectTimelineItem` with year badges) and interactive showcase gallery (`mainImage` + 4 `ProjectThumbnailButton` items).
     - **Relevant Skills**: 4 architectural skill rows (`01` Languages, `02` Frameworks, `03` Cloud & DevOps, `04` AI & Tools) rendered via `SkillRow`.
     - **Blog Preview**: Infinite CSS marquee carousel (`BlogCarouselCard`) with pause-on-hover and links to `/blog?post=<id>`.
     - **Peer Testimonies**: 4/8 split with sticky title and 2x2 grid (`TestimonyCard` + `TestimonyModal`).
     - **Contact**: Grayscale Apollo backdrop with `ContactEmailCard` and structured Site / Social / Contact footer metadata.
2. **V2 Blog Reader (`app/v2/blog/` & `app/blog/page.tsx`)**:
   - 3/9 split master-detail reader wrapped in `<Suspense>` for `useSearchParams()`.
   - Left sidebar (`BlogSidebarItem`) lists Information (`intro`) and chronological Entries (`01`–`06`).
   - Right area splits into `BlogReaderContent` (`lg:col-span-8`) and sticky `BlogInspectorCard` (`lg:col-span-4`).
3. **Consolidated JSON Array Content & IDE CLI (`content/*.json`, `lib/content/`, `lib/constants/`, `.agents/scripts/content.ts`)**:
   - 6 flat JSON array collections (`content/projects.json`, `content/blog.json`, `content/skills.json`, `content/testimonies.json`, `content/experience.json`, `content/education.json`) and 2 singletons (`content/site-config.json`, `content/about.json`).
   - Validated by Zod 4 schemas in `lib/content/schemas.ts` and statically imported in `lib/content/index.ts` (universal client/server safe, zero `node:fs` runtime overhead).
   - Managed locally in the IDE via `pnpm content` (`.agents/scripts/content.ts` supporting `status`, `validate`, `list`, `show`, `add`, `update`, `remove`, `sort`).
4. **External Integrations (`app/actions/contact.ts`, `lib/supabase/`, Sentry)**:
   - Contact Server Action with Zod validation, Cloudflare Turnstile verification, and Resend email delivery.
   - Supabase SSR/browser client helpers (`lib/supabase/server.ts`, `lib/supabase/client.ts`) and Sentry error/performance monitoring (`@sentry/nextjs`).

---

## 3. Recent Milestones

- **[COMPLETED]** Consolidated V2 portfolio architecture (`app/v2/landing`, `app/v2/blog`) as primary root routes (`/` and `/blog`).
- **[COMPLETED]** Rolled back web-based `/admin` CMS & GitHub OAuth routes and overhauled `content/` into 6 flat JSON array collections + 2 singletons managed via the deterministic `pnpm content` IDE CLI.
- **[COMPLETED]** Adapted `.agents/` subsystem and `AGENTS.md` to Snapshot Portfolio's domains and 4 specialist subagents (`@softarch-agent`, `@design-agent`, `@app-agent`, `@content-agent`).
