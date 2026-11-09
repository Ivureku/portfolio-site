# Working notes — portfolio-site

Working context for Claude Code sessions. Tracked in git deliberately, so it
travels to whatever machine Kervi is on — that was the whole point of writing it.

## What this is

Kervi Kent Asombrado's single-page portfolio. React 18 + TypeScript + Vite +
Tailwind, Zustand for the small amount of shared UI state. No router, no test
suite, no CI. `README.md` is the authoritative guide to routine edits — read it
before changing content, it maps "I want to change X" to the file that owns X.

```bash
npm run dev      # vite dev server
npm run build    # tsc -b && vite build  — the only check that exists
npm run format   # prettier
```

## Design constraints that are easy to violate

These are deliberate. Breaking one should be a decision, not an accident.

- **Single page.** One scrolling document, no routes, no navigation away.
- **Typographic, not pictorial.** Until the FYLP archive below, the site had
  **zero images** — no `public/`, no `src/assets/`, no image references in any
  component. Work is an index of rows, not a grid of cards.
  **Project previews are a deliberate exception, by Kervi's request:** a small
  looping sketch per project of its main feature (`Project.preview`,
  `src/components/visual/previews/`). They stay in the site's own vocabulary —
  hairlines, 2px corners, mono labels, accent for what moves, bars standing in
  for text — never a screenshot, a device frame or the `live` ochre, which is
  reserved for "live now".
- **Hairline rules and mono captions** carry the structure. Border radius stays
  at 1–2px. `font-data` (Spline Sans Mono) is the caption/label face.
- **Both themes always.** Dark is the default and applies with no `data-theme`
  at all; light is opt-in via `:root[data-theme='light']`. Colours are CSS
  custom properties in `src/index.css` — change those and the site re-skins.
- **Reduced motion is handled in CSS**, not in components. The global block at
  the bottom of `index.css` already neutralises animation; don't re-implement
  it per component.

## FYLP 2024 — the archive, and why it exists

**fylp2024.com is gone.** Not a hosting outage: the domain lapsed and now
resolves to an Amazon Registrar parking lander.

```
https://www.fylp2024.com/  →  200, Content-Length 114
<script>window.onload=function(){window.location.href="/lander"}</script>
DNS → 13.248.213.45 / 76.223.67.189
```

The portfolio used to link there, which sent visitors to a domain-for-sale
page. That link is now **replaced** by a screenshot archive:

- `Project.archive` in `src/data/projects.ts` — `{ note, shots[] }`. A project
  has an `archive` **or** a `link`, never both; `ProjectTail` in `Work.tsx`
  picks. `note` explains why there's nothing to click.
- `src/components/ui/ArchiveViewer.tsx` — trigger plus a lightbox portalled to
  `<body>` (the collapsed accordion row has `overflow: hidden` and would clip
  it). Escape closes, arrows navigate, focus is trapped and returned, body
  scroll is locked with scrollbar compensation.
- `public/archive/fylp/{home,register,home-mobile}.png` — first images ever
  committed to this repo.

Two things learned the hard way while building it, both fixed — don't
reintroduce:

1. **The overlay must be opaque** (`bg-paper`, not `bg-paper/95`). At any
   transparency the work section reads straight through the screenshot and
   looks like a rendering fault. Verified in both themes.
2. **The image must shrink-wrap inside its box**, not fill it. With
   `flex-1 object-contain` the hairline border traced the letterboxed dead
   space instead of the screenshot — very visible on the portrait shot.

Source repo for the site itself: `SAMAHAN-Systems-Development/FYLP-frontend-2024`
(org-owned, not Kervi's). A clone sits at `../FYLP-frontend-2024`. A redeploy
would render but the forms would fail — `.env.example` wants Google Sheets
service-account credentials (`CLIENT_EMAIL`, `PRIVATE_KEY`, `*_SPREADSHEET_ID`)
and Gmail app credentials, none of which are still available.

## Deploying

Not deployed anywhere yet — the repo has no homepage and no Pages site.

- **Public paths carry no leading slash** in TS data (`archive/fylp/home.png`,
  `Asombrado-Resume.pdf`). Whatever renders one prefixes
  `import.meta.env.BASE_URL`, so the same data works at `/` and under a
  subpath. Anything new that points into `public/` must follow this.
- **`plugins/siteUrl.ts` fills `__SITE_URL__` in `index.html`** for the
  canonical, `og:url`, `og:image` and `twitter:image` tags, which scrapers
  need absolute. It reads `VITE_SITE_URL`, then Vercel's
  `VERCEL_PROJECT_PRODUCTION_URL`, then Netlify's `URL` (only when
  `NETLIFY=true`). With none, it drops those tags and warns at build time —
  deliberately, since a canonical naming the wrong host is worse than none.
  It runs with `order: 'pre'` so Vite's HTML pass never sees the bare token in
  a `<link href>` and tries to resolve it as an asset.
- **GitHub Pages project site:** `npm run build:pages` (base
  `/portfolio-site/`). Verified end to end in a browser: icons, archive images
  and the résumé all resolve under the subpath.

- **Vercel is the chosen host, and needs zero config.** The Vite preset builds
  with `npm run build` into `dist/`, new projects default to Node 24.x (same as
  local), and there is no `vercel.json` because there is no client-side router
  to rewrite for. Verified in a clean room: `npm ci` plus a build of only the
  files git will ship, with Vercel's variables set, emitted the right tags and
  every filename matched its import casing (Vercel builds on Linux). Three
  things to know:
  - **The commit author must be Kervi.** On the Hobby plan Vercel blocks a
    deployment whose commit author email isn't verified on the GitHub account
    connected to Vercel. Commit as
    `75526695+Ivureku@users.noreply.github.com`, the noreply address the first
    commit already used.
  - **The site URL is baked in at build time.** After adding a custom domain,
    redeploy, or the canonical and preview tags keep naming `*.vercel.app`. A
    `[site-url]` line in the build log means the tags were dropped — usually
    because system environment variables are switched off in project settings.
  - **Share the production domain, never a deployment URL.** Standard
    Protection puts previews and per-deployment URLs behind a Vercel login;
    only the production domain is public.

## Before shipping — unresolved

- **The résumé PDF publishes a street address and a phone number.** The README
  keeps the phone off the page on purpose, since a public page invites
  scrapers, and the PDF undoes that. Pushed to this public repo, it stays in
  git history even if removed later. Kervi to decide before the first push.
- **The résumé itself has two errors:** the phone number looks one digit short
  for a Philippine mobile, and it still links fylp2024.com, now a parked
  domain. Both are fixes in the source document, not in this repo.
- No automated tests. `npm run build` (tsc + vite) is the only gate.

## Icons and link previews

`public/favicon.svg` is the source of truth for the mark — the intro map's
route polyline cut down to two turns and a terminus, knocked out of a solid
accent tile. The tile is deliberate: a bare mint mark disappears against half
the tab-bar colours in the wild.

The rasters are **generated from that SVG, not drawn separately** — keep them in
sync by re-rendering, never by editing a PNG:

- `favicon.ico` — 16/32/48 PNG-in-ICO, hand-assembled (see below)
- `apple-touch-icon.png` — 180px, square corners and opaque, because iOS
  applies its own rounded mask and composites transparency to black
- `og-image.png` — 1200×630, real Bricolage Grotesque

All of it was rendered by pointing headless Edge at scratch HTML and
screenshotting at exact device metrics, which is how the OG card gets the real
webfont instead of a local substitute. Wait on `document.fonts.ready` before
capturing. For the ICO there is no tooling here, so it is assembled by hand: an
`ICONDIR` header, one 16-byte `ICONDIRENTRY` per size, then the PNG payloads
concatenated. Browsers accept PNG-in-ICO and pick the largest entry.

## Verifying UI changes

There is no Playwright and no browser dep in this project, and adding one just
to look at the page isn't worth it. Node 24 ships a global `WebSocket` and Edge
is installed, so CDP works with zero installs:

```bash
"/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" \
  --headless=new --disable-gpu --remote-debugging-port=9222 \
  --user-data-dir=<scratch>/edge-profile --no-first-run --hide-scrollbars about:blank
```

Then fetch `http://127.0.0.1:9222/json/list`, open the page target's
`webSocketDebuggerUrl`, and drive with `Page.navigate`, `Runtime.evaluate`,
`Input.dispatchKeyEvent`, `Page.captureScreenshot`. Check both themes — the
profile persists the theme toggle between runs, which is easy to misread as a
bug. **Look at the screenshots.** Both overlay bugs above passed every
programmatic assertion and were only visible by eye.

## Cloud workspace (Claude Code on the web)

There are two workspaces: the Windows machine at home, and Claude Code cloud
sessions (Linux). Cloud sessions should run on the personal `portfolio-site`
environment. Its setup script installs Node 24 (the container ships 22),
runs `npm ci`, and sets this repo's commit author to the noreply address
above. Each container is thrown away afterwards, so anything not pushed is lost.

- **Verify UI with Playwright there, not Edge.** Chromium and Playwright come
  preinstalled in the container (`require('playwright')` works from any
  directory), so the CDP recipe above is home-only. The rules don't change:
  wait on `document.fonts.ready`, check both themes, look at the screenshots.
- The Git Bash path-rewriting gotcha below is Windows-only.

## Project previews — in progress

Work happens on `claude/gallant-heisenberg-3h767m`, which is not merged into
`main` yet. Each project in Selected work gets a small looping sketch of its
main feature, shown last in its panel (see the design-constraint exception
near the top).

**How Kervi wants it done:** one project at a time. Brief him first, in plain
words and kept simple: one action, one result, made-up data, no real names.
Build only after his go. Have an agent that didn't write it check it, fix
what it finds, send him a GIF of the loop, then brief the next project.

| Project | Sketch | State |
|---|---|---|
| QA Hub | `kanban`: ticket #12 In progress → Fixed → Done, after his real board | done, checked |
| ERP systems | `reading`: a meter reading lower than the last one flagged, then fixed | done, checked |
| HR ERP system | `search`: "014" narrows four employee rows to two | done, checked |
| Emergency tracking | `dispatch`: Unit 7 follows its route to the pin; Assigned → En route → On scene | done, checked |
| FYLP 2024 | — | next: brief him first |
| Palaro 2024 | — | not started |
| Concept paper approval | — | not started |

**Adding one:**
1. Add a name to `PreviewSketch` and `preview: { sketch, caption }` to the
   project in `src/data/projects.ts`.
2. Write a component in `src/components/visual/previews/` and register it in
   `ProjectPreview.tsx`.
3. Put the motion in `index.css` as `<name>-*` rules plus keyframes on one
   8s loop.
4. Its base classes are the still frame shown under reduced motion: pick the
   frame that shows the feature.

The frame is a fixed `h-44` (rem, so it grows with text size). Each sketch
has to fit it from 300px wide, including at a 20px root font.

**Check every one for:**
- **Timing:** sample the loop with `document.getAnimations()`, using
  `pause()` and then setting `currentTime`. Every label, count and flag must
  match what the drawing shows at that moment. Five bugs came from this kind
  of mismatch, such as a count changing before its rows did.
- **Sizes:** 300, 320 at a 20px root, 390, 768, 1024×768 and 1280. The
  desktop panel must stay at or under 656px at 1024×768.
- Both themes, and reduced motion.
- **Selecting a row:** open a project other than the featured one by keyboard
  (focus, then Enter). With a mouse, hover intent swaps the panel to whatever
  row the pointer ends up over.

**Don't:**
- **Hide an animated element with `display:none`.** It restarts that
  element's animation on its own; collapse it with visibility and width
  instead.
- **Let an invisible spacer copy carry `sm:visible`.**
- **Count wrapped lines from element boxes.** Count text-node rects instead.

**Waiting on Kervi:**
- **His local edits to `projects.ts`** on the home machine: review them and
  merge them into this branch.
- **The intro and Path wording.** Should the intro's "Most recently" become
  "Currently", and the Path role become "October 2025 – present", now that
  ERP systems is ongoing? He has the alternatives commented out already.
- **The tracking preview's look.** It looks a lot like the intro map: a grid,
  a green route, a moving dot.
- **No pause control.** The previews loop with nothing to stop them except the
  OS reduced-motion setting (WCAG 2.2.2). RouteMap is the same.
- **Merging into `main`** once he's happy.

## Gotchas that have already bitten once

- **`tsc -b` short-circuits.** If `tsconfig.tsbuildinfo` looks current, build
  mode skips the project without fully validating `tsconfig.json` — so a
  genuinely broken compiler option can pass three builds in a row and only
  surface once something forces a rebuild. When changing `tsconfig.json`,
  verify with `npx tsc -b --force`, not `npm run build`.
- **Don't accept the editor's `baseUrl` quick-fix.** VS Code offers to add
  `"ignoreDeprecations": "6.0"`, which TypeScript 5.9.3 rejects outright
  (TS5103) and which breaks the build. `baseUrl` was removed instead: `paths`
  resolves relative to `tsconfig.json` without it since TS 4.4, and Vite
  resolves `@` from its own `resolve.alias` regardless.
- **`tsconfig.tsbuildinfo` is ignored — don't commit it again.** It used to be
  tracked, and every build dirtied the tree. Worse, it differed between
  machines: Windows records its source paths lowercased (`./src/app.tsx`) and
  Linux keeps their case (`./src/App.tsx`). A build on one machine always
  showed a diff against a commit made on the other.
- **`npx` rewrites `package-lock.json`**, adding `"peer": true` annotations
  with no version changes. Harmless, but revert it so diffs stay honest.

- **Git Bash rewrites POSIX-looking arguments.** `--base=/portfolio-site/`
  passed by hand becomes `/Program Files/Git/portfolio-site/` before Vite sees
  it. Use the `build:pages` script (npm runs scripts through cmd, which leaves
  it alone), or prefix `MSYS_NO_PATHCONV=1` for one-offs.
- **The header has no width to spare.** At phone widths the toolbar needs
  about 318px of content. Below 360px `StatusBar.tsx` tightens gutter, gaps and
  nav text with `max-[359px]:` so it fits 320px, the WCAG reflow width. Adding
  any header control means re-measuring at 320, 340 and 360.
- **Measure gutters, not overflow.** `scrollWidth` leaves out a flex
  container's end padding, so a toolbar can report zero overflow while its last
  button sits flush against the viewport edge. Check each control's distance
  from the edge instead.
- **Closed disclosure rows are `inert`**, set through a callback ref in
  `Work.tsx` because React 18 has no `inert` prop. Without it, content hidden by
  `grid-template-rows: 0fr` stays in the tab order.
