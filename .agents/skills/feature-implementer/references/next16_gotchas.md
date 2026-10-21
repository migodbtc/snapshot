# Next.js 16, React 19 & Snapshot Portfolio Gotchas

A checklist of common breaking patterns in Next.js 16, React 19, and Snapshot's architecture:

### 1. Synchronous Dynamic Params, Cookies, or Headers Access
* **Issue**: In Next.js 16, accessing `params.id`, `searchParams`, `cookies()`, or `headers()` without `await` throws a type/runtime error.
* **Fix**: Type `params` as `Promise<{ id: string }>` and call `const { id } = await params;`, `const cookieStore = await cookies();`, `const headerList = await headers();`.

### 2. Unwrapped `useSearchParams()` in Client Components
* **Issue**: Calling `useSearchParams()` in a `'use client'` page (such as `app/v2/blog/page.tsx`) without wrapping the inner component in `<Suspense>` causes `next build` static generation to fail with a missing Suspense boundary error.
* **Fix**: Split the page into an inner `<BlogPageContent />` component that calls `useSearchParams()` and wrap it in `<Suspense fallback={...}>` inside the default exported page component.

### 3. Passing Non-Serializable Icon Functions Across Server-Client Boundaries
* **Issue**: Passing `LucideIcon` or `react-icons` (`IconType`) component functions directly in props from a Server Component to a Client Component or storing them in JSON fails serialization.
* **Fix**: Store string `iconKey` identifiers in `content/*.json` and map them to icon components on the client (`lib/content/icons.tsx` or `app/v2/landing/constants.ts`).

### 4. Unvalidated JSON Content Edits or Broken Asset Paths
* **Issue**: Editing `content/*.json` with a typo in field names or referencing an image path that does not exist in `public/`.
* **Fix**: Always run `pnpm content validate` (or `pnpm content sort`) after modifying any file in `content/`.

### 5. Direct Process Environment Leaks
* **Issue**: Referencing `RESEND_API_KEY` or `TURNSTILE_SECRET_KEY` in client components.
* **Fix**: Only variables prefixed with `NEXT_PUBLIC_` (e.g. `NEXT_PUBLIC_TURNSTILE_SITE_KEY`) are exposed to the browser. Keep all private credentials inside `"use server"` actions with `import "server-only"`.
