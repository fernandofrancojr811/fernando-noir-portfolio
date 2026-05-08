# Fernando Franco Jr. — Developer Dossier

A blacked-out luxury newspaper rendered inside a terminal shell. Personal portfolio built on Next.js 16, React 19, and Tailwind v4.

## Visual direction

`black-luxury-terminal-newspaper` — noir, editorial, serious, cinematic.

- Black / off-white / minimal red accent
- Sharp corners, thin borders, no soft shadows
- Serif (Playfair Display) for editorial headlines + Mono (JetBrains Mono) for everything system-level
- Subtle paper grain + scanlines
- Seamless infinite-scroll loop (disable via `app/lib/config.ts`)

## Stack

- **Next.js** 16.2.6 (App Router, RSC by default)
- **React** 19.2.4
- **Tailwind CSS** v4 (CSS-first `@theme` config in `app/globals.css`)
- **TypeScript** strict
- `framer-motion`, `lucide-react`, `class-variance-authority`, `clsx`, `tailwind-merge`

## Develop

```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck
npm run lint
npm run build
```

## File map

```
app/
  globals.css                 design tokens (noir palette, fonts, grain, scanlines)
  layout.tsx                  fonts (Playfair Display, JetBrains Mono, Geist)
  page.tsx                    composition entry point
  components/
    primitives/               reusable UI atoms (CommandButton, DossierCard, etc.)
    sections/                 Hero / Experience / Education / Projects / Hobbies / OldPortfolioPortal
    infinite-scroll-wrapper.tsx
  data/                       site copy (profile, experience, education, projects, hobbies)
  lib/                        cn() helper, site config / feature flags
```

## Editing content

All copy lives in `app/data/*.ts`. Edit those files to update what's
displayed; the design system stays consistent.

## Switching off the infinite-scroll loop

`app/lib/config.ts` → `siteConfig.infiniteScrollEnabled = false`.
