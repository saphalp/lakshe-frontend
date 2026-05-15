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
| `/verify-email` | Post-signup email verification prompt |
| `/dashboard` | Main user dashboard with job tracking |
| `/profile` | Profile editor (Personal Info / Work Experience / Education / Skills sections) |
| `/explore-jobs` | Job board with search, filters, and pagination (client component, fetches `jobs_listings` table) |
| `/resume-builder` | AI-powered resume builder; accepts `?jobId=`, `?jobTitle=`, `?company=` query params |

### Supabase Client Pattern

Two separate clients must be used correctly:
- `lib/supabase/browser-client.ts` — `getSupabaseBrowserClient()` for `"use client"` components (singleton)
- `lib/supabase/server-client.ts` — `createSupabaseServerClient()` for Server Components and Server Actions (async, reads cookies)

### Context Providers

- `context/FormContext.tsx` — `FormProvider` / `useFormData()`: holds multi-step sign-up form state (email, password, education[], experiences[], skills[])
- `context/StepContext.tsx` — `StepProvider` / `useStep()`: tracks current step (1–4) in the sign-up flow; wraps the `/sign-up` layout
- `context/ProfileUserContext.tsx` — `ProfileUserProvider` / `useProfileUser()`: wraps the `/profile` layout, exposes `{ userId, loading }` via `useFetchUser`

### Hooks

- `hooks/useFetchUser.ts` — `useFetchUser()`: browser-side hook that reads `supabase.auth.getSession()` and returns `{ userId, loading }`

### Component Organization

- `components/ui/` — shadcn/ui primitives (Button, Input, Dialog, Sheet, etc.)
- `components/landing/` — marketing page components (HeroBanner, Navbar, PricingSection, FAQ, etc.)
- `components/shared/` — shared layout components (Footer)
- `components/dashboard/` — dashboard-specific components (DashBoardNav, GreetingCard, StatsCard, ApplicationTracker, DashboardJobCard, NotesModal, etc.)
- `components/profile/` — profile editor sections (PersonalInfoSection/Form, ExperienceSection/DisplayCard, EducationSection/DisplayCard, ProfileSkillsForm, ProfileSidebar, SidebarProgressChart)
- `components/explore/` — job exploration components (ExploreJobCard, ExploreFiltersSidebar)
- `components/resume/` — resume builder components (ResumeBuilderLayout, ResumePreview, editor sub-components, types.ts, mockData.ts)
- `components/sign-up/` — multi-step sign-up form steps (SignInForm, EducationForm, ExperienceForm, SkillsForm, Stepper)
- `components/login/` — LoginForm

### Resume Builder Flow

1. Server page (`app/resume-builder/page.tsx`) fetches the user's profile and the target job listing from Supabase, then passes them to `ResumeBuilderClient` (a thin `"use client"` wrapper that lazy-loads `ResumeBuilderLayout` with `ssr: false`).
2. On mount, `ResumeBuilderLayout` checks the `resumes` table for an existing record for `(userId, jobId)`. If none exists (or the last attempt failed), it POSTs to an n8n webhook (`WEBHOOK_URL` in `ResumeBuilderLayout.tsx`) to trigger AI generation.
3. A Supabase Realtime channel (`resume-{userId}-{jobId}`) watches the `resumes` table for status changes (`pending` → `processing` → `done` / `failed`) and updates the UI accordingly.
4. Once `status === "done"`, the two-panel editor appears: left panel edits experience/education/skills; right panel renders a live `ResumePreview`.
5. Download uses `html-to-image` (PNG) + `jspdf` to produce a multi-page A4 PDF client-side.

### Supabase Tables (key ones)

- `profiles` — user profile data (`f_name`, `l_name`, `email`, `phone`, `headline`, `linkedin_url`, `github_url`, `skills[]`, `experiences[]`, `education[]`)
- `user_jobs` — tracks a user's job applications (`profile_id`, `job_id`, `status`, `notes`); status values: `saved`, `applied`, `interview`
- `jobs_listings` — scraped job postings (`job_title`, `company`, `location`, `role_type`, `description`, `salary`, `platform`, `apply_link`, `job_url`, etc.)
- `resumes` — AI-generated resume records (`user_id`, `job_id`, `status`, `data` JSON)

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
