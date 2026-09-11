# Kervi Kent Asombrado — Portfolio

A single-page scrolling portfolio. React + TypeScript + Vite + Tailwind CSS, with
Zustand for the small amount of shared UI state.

```bash
npm install
npm run dev      # local dev server
npm run build    # typecheck + production build into dist/
npm run preview  # serve the built output
```

## Where to change things

Everything you'll want to edit routinely lives in `src/data/`. None of these
files import React, so you can edit them without touching a component.

| I want to change…                     | Edit                        |
| ------------------------------------- | --------------------------- |
| Name, intro paragraph, email, GitHub, LinkedIn | `src/data/profile.ts`       |
| The email tooltip joke                | `emailNote` in `src/data/profile.ts` |
| The résumé the contact CTA downloads  | `public/Asombrado-Resume.pdf` (path set in `profile.ts`) |
| The CTA wording                       | `CTA_REST` / `CTA_HOVER` in `src/components/sections/Contact.tsx` |
| A job, its bullets, or its tech stack | `src/data/experience.ts`    |
| A project, its blurb, or its link     | `src/data/projects.ts`      |
| Skills and how they're grouped        | `src/data/toolkit.ts`       |
| Section order and nav labels          | `src/data/sections.ts`      |
| Colours (both themes), fonts, spacing | `src/index.css` + `tailwind.config.js` |

**Things to know:**

- Roles in `experience.ts` are listed **oldest first** — the section is read as a
  progression, so order matters.
- The project marked `featured: true` in `projects.ts` is the one that starts
  open in the work section. Only mark one.
- **Bold a phrase** in any description by wrapping it in double asterisks:
  `'Own front-end development for **multiple ERP systems**.'` This works in the
  intro statement, section ledes, role summaries and highlights, project
  details, toolkit notes, and the contact blurb. It's rendered by
  `components/ui/RichText.tsx` — no HTML, so nothing else in the string is
  interpreted.

## Structure

```
src/
├── data/          Content. Edit here first.
├── store/         useUiStore.ts — all shared UI state.
├── hooks/         Scroll, viewport, and theme sync. Each one does a single job.
├── components/
│   ├── layout/    StatusBar, Section wrapper, SiteFooter
│   ├── ui/        Reveal, SectionHeading, StackList, RichText, GitHubBadge, LinkedInBadge, ThemeToggle, ArchiveViewer
│   ├── sections/  One file per section of the page
│   └── visual/    RouteMap — the animated map behind the intro
├── App.tsx        Section order + the four page-level hooks
└── index.css      Design tokens, animations, tooltip, reduced-motion rules
```

## Design notes

**Identity.** The palette and layout come from the kind of software in the
résumé — civic and operational systems — rather than from a generic portfolio
template. Cool mineral paper, deep slate-green ink, one accent green for
anything interactive, and one ochre reserved strictly for "live now" (the map
marker and the current-role badge). Seven CSS variables at the top of
`index.css` control all of it.

**Themes.** Dark is the default: its tokens sit on bare `:root`, so the page is
dark even before JavaScript runs. `:root[data-theme='light']` holds the light
palette. The toggle in the header flips `theme` in the store; `useThemeSync`
writes it to `<html data-theme>` and `localStorage`, and a tiny inline script
in `index.html` re-applies a saved light choice before first paint so there's
no dark flash. Both palettes pass WCAG AA for body and muted text.

**Work section.** On desktop (`lg` and up) the projects are a list with a sticky
detail panel beside it. Resting the mouse on a row for 140ms swaps the panel;
clicking does too, for keyboards and touch laptops. The rows never change
height, which is why it isn't a hover-to-expand accordion — that version shoves
rows out from under the cursor as you move down the list. Below `lg` the rows
open in place as before.

**Contact CTA.** "Interested?" rises in letter by letter when the section
scrolls into view, and each letter rolls over to "Work with me." on hover or
keyboard focus. Touch screens can't hover, so there the two phrases take turns
on a slow loop. Clicking downloads the résumé. The styles are the `.cta-*`
rules in `index.css`.

**Type.** Bricolage Grotesque for display, Instrument Sans for reading,
Spline Sans Mono for real data only (dates, coordinates, tech names) — never as
decoration. Loaded from Google Fonts in `index.html`; swap the link and the
`fontFamily` block in `tailwind.config.js` to change them.

**The map.** The intro sits on an abstract street grid with a vehicle tracing a
route, echoing the capstone project. It's `aria-hidden` and masked so it fades
out behind the headline. Adjust the route by editing the `ROUTE` path string in
`components/visual/RouteMap.tsx`.

## How motion works

There's no animation library. Two mechanisms cover everything:

1. **`<Reveal>`** sets `data-visible="true"` once, via IntersectionObserver.
   The fade and lift are pure CSS in `index.css`. Nothing re-renders. Stagger
   siblings with `<Reveal delay={index * 60}>`.
2. **Sticky + observer** — the year rail in the trajectory section pins in place
   and swaps content as `activeRoleId` updates in the store.

Reduced motion is handled in one place: the `@media (prefers-reduced-motion:
reduce)` block at the bottom of `index.css` neutralises every transition, and
`RouteMap` reads `prefersReducedMotion` from the store to skip the moving marker
entirely. The contact CTA drops its rise-in and auto-cycling too; hover still
swaps the phrase, just without the roll.

To slow everything down or speed it up, change the two `700ms` durations in the
`[data-reveal]` rule.

## State

All shared UI state is in `src/store/useUiStore.ts`: active section, scroll
progress, active role, open project, reduced-motion preference, and theme.
There is no local component state anywhere — anything that needs to change goes
in the store, or is handled by CSS. (The work section keeps its hover-intent
timer in a ref, which never renders.)

## Before you deploy

- [x] **Add your résumé as `public/Asombrado-Resume.pdf`.** The contact CTA
      links to it. To use a different filename, change `resume` in
      `src/data/profile.ts`.
- [ ] Decide whether to add your phone number. It's deliberately left off — a
      public page invites scrapers — but it's a one-line addition to
      `profile.ts` and `Contact.tsx` if you want it.
- [x] Add a favicon and an Open Graph image to `public/`, then link them in
      `index.html`.
- [ ] **Tell the build your site's URL**, unless you deploy to Vercel or
      Netlify. Link previews and the canonical tag need an absolute URL.

`npm run build` outputs a static `dist/`.

- **Vercel or Netlify:** deploys as-is. The site URL is read from the host's
  own build variables when the site builds, so after adding a custom domain,
  redeploy once to pick it up.
- **Anywhere else:** set `VITE_SITE_URL=https://your-domain.com` in the build
  environment. Without it the build still succeeds, but it leaves out the
  canonical and link-preview tags and prints a warning saying so.
- **GitHub Pages project site** (served from `/portfolio-site/`): build with
  `npm run build:pages` instead. Every asset path already respects the base,
  so nothing else needs changing. Don't pass `--base` by hand from Git Bash —
  it rewrites `/portfolio-site/` into a Windows path before Vite sees it.
