# Context Drift Checklist

Use this checklist during drift synchronization to verify that `.agents/` reflects current **Snapshot Portfolio** code reality:

### 1. Routes & Server Actions (`app/`)
- [ ] Are all active `app/**/page.tsx` routes recorded in `index.json`?
- [ ] Are Client Components using `useSearchParams()` wrapped in `<Suspense>`?
- [ ] Are dynamic route `params` and `searchParams` properly typed as `Promise`?

### 2. Consolidated JSON Content & Schemas (`content/*.json` & `lib/content/`)
- [ ] Do all 8 JSON files (`projects.json`, `blog.json`, `skills.json`, `testimonies.json`, `experience.json`, `education.json`, `site-config.json`, `about.json`) pass `pnpm content validate`?
- [ ] Do all referenced `imageRef` / `avatar` / `image` paths exist on disk under `public/`?
- [ ] Are any new `iconKey` strings registered in `lib/content/icons.tsx` and `app/v2/landing/constants.ts`?

### 3. Verification Gates
- [ ] Does `pnpm content validate` pass with 0 errors and 0 warnings?
- [ ] Does `pnpm typecheck` (`tsc --noEmit`) pass with 0 errors?
- [ ] Does `pnpm lint` pass cleanly?
