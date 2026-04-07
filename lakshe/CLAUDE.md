# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (Next.js)
npm run build    # Production build
npm run lint     # Run ESLint
npm run start    # Start production server
```

No test runner is configured.

## Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

## Architecture

**Next.js 16 App Router** with TypeScript, Tailwind CSS v4, shadcn/ui components, and Supabase for auth/data.

### Routes

| Route | Description |
|---|---|
| `/` | Landing page (marketing) |
| `/login` | Login form |
| `/sign-up` | Multi-step onboarding (4 steps: Account → Education → Skills → Experience) |
| `/dashboard` | Main user dashboard with job tracking |
| `/profile` | Profile editor (Personal Info / Work Experience / Education sections) |

### Supabase Client Pattern

Two separate clients must be used correctly:
- `lib/supabase/browser-client.ts` — `getSupabaseBrowserClient()` for `"use client"` components (singleton)
- `lib/supabase/server-client.ts` — `createSupabaseServerClient()` for Server Components and Server Actions (async, reads cookies)

### Context Providers

- `context/FormContext.tsx` — `FormProvider` / `useFormData()`: holds multi-step sign-up form state (email, password, education[], experiences[], skills[])
- `context/StepContext.tsx` — `StepProvider` / `useStep()`: tracks current step (1–4) in the sign-up flow; wraps the `/sign-up` layout

### Component Organization

- `components/ui/` — shadcn/ui primitives plus marketing/landing components (HeroBanner, Navbar, Footer, PricingSection, etc.)
- `components/dashboard/` — dashboard-specific components (DashBoardNav, GreetingCard, StatsCard, ApplicationTracker, etc.)
- `components/profile/` — profile editor sections (PersonalInfoSection/Form, ExperienceSection/DisplayCard, EducationSection/DisplayCard, SectionHeader, ProfileSidebar)

### Styling

- Tailwind CSS v4 (PostCSS-based, configured in `postcss.config.mjs`)
- `lib/utils.ts` exports `cn()` (clsx + tailwind-merge) — use this for all conditional class merging
- Fonts: Inter (`--font-inter`, default `font-sans`) and Bentham (`--font-bentham`) loaded via `next/font/google`
- Dark UI — most components use `text-white` on dark backgrounds

### UI Components

shadcn/ui components live in `components/ui/`. Add new shadcn components with:
```bash
npx shadcn add <component>
```
Config is in `components.json`.
