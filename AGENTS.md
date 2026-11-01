<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Repo overview

Single Next.js 16.4.3 App Router app (React 19.3, TypeScript strict, ESM) — the **client** for a social event management project; the backend lives elsewhere (see Env). No `src/` dir: routes mount from `app/` (`layout.tsx`, `page.tsx`, `loading.tsx`, `not-found.tsx`). Path alias `@/*` → repo root.

## Commands

Use **npm** (a `package-lock.json` is committed; don't introduce yarn/pnpm).

- `npm run dev` — dev server
- `npm run lint` — ESLint 9 flat config (`eslint.config.mjs`)
- `npm run typecheck` — `tsc --noEmit`
- `npm run format` — Prettier `--write` on `**/*.{ts,tsx}`; run before committing
- `npm run build` — production build

There is **no test setup** (no runner, no fixtures, no CI). Verify changes with `lint` → `typecheck` → `build`.

## UI stack quirks

- shadcn/ui is configured with style **`base-nova`** (`components.json`): primitives come from **`@base-ui/react`, not Radix**. Add components with `npx shadcn@latest add <name>`; they land in `components/ui/`, helpers in `lib/utils.ts`, hooks in `hooks/`.
- `lib/utils.ts` only re-exports `cn` from the `cn` package (not the usual clsx + tailwind-merge).
- **Tailwind v4** via `@tailwindcss/postcss` — there is no `tailwind.config.*`. Theme/CSS lives in `app/globals.css` (imports `tailwindcss`, `tw-animate-css`, `shadcn/tailwind.css`). Brand colors are noted there: primary `#26AE60`, secondary `#FB8072`.
- `@heroui/react` / `@heroui/styles` are installed but unused (the styles import in `app/globals.css` is intentionally commented out).
- Theming: next-themes wrapped in `components/theme-provider.tsx`; `suppressHydrationWarning` on `<html>` in `app/layout.tsx` is required for it — don't remove.
- Prettier config: no semicolons, double quotes, LF, Tailwind class sorting via `prettier-plugin-tailwindcss`. Match this style when writing code by hand.

## Env

`.env` is gitignored and currently defines `lOCAL_URL` (note the unusual casing — lowercase `l`) holding the backend base URL. Read backend URLs from it when wiring up API calls; don't hardcode them.
