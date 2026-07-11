# personal-portfolio

Robert Herber's personal portfolio site — [rwherber.com](https://rwherber.com).

A modern, dev-focused single-page portfolio with a dark/light theme toggle, built with
**Vite + React 19 + TypeScript**. Content is data-driven (see `src/data/`), styled with a
custom glassmorphism theme (no UI framework).

It also ships an optional **interactive 3D experience** at `/interactive/` — a scroll-driven
flight through space (react-three-fiber + three.js) that presents the same résumé content.

## Develop

```bash
npm install
npm run dev      # main site: http://localhost:5210/  ·  3D: http://localhost:5210/interactive/
```

## Build & preview

```bash
npm run build    # type-check + production build to dist/ (both entries)
npm run preview  # serve the production build
```

## Structure

- `src/data/` — all main-site content (experience, projects, skills, education, awards)
- `src/App.tsx` — main-site sections and layout
- `src/theme.tsx` — dark/light theme (persisted, respects system preference)
- `src/index.css` — main-site theme tokens and styles
- `interactive/index.html` + `src/experience/` — the 3D experience (own Vite entry; content in
  `src/experience/lib/data.ts`; Tailwind v4 + custom HUD styles, scoped to this entry only)
- `public/` — profile image, résumé PDFs, favicon, and the 3D assets (`models/`, `textures/`, `hdri/`)

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and
`rsync`s `dist/` to `/var/www/html` on the `rwherber.com` VM (nginx), served at
[rwherber.com](https://rwherber.com). The sync does **not** delete unrelated files, so the
legacy sub-projects hosted alongside the site are preserved.

### Required repository secrets

Set these under **Settings → Secrets and variables → Actions**:

| Secret            | Value                                              |
| ----------------- | -------------------------------------------------- |
| `DEPLOY_HOST`     | `rwherber.com`                                     |
| `DEPLOY_USER`     | `root`                                             |
| `DEPLOY_SSH_KEY`  | Private key whose public key is in the server's `authorized_keys` |

## Credits (3D experience)

The `/interactive/` experience was adapted from Abhishek Badar's open-source
[3D portfolio](https://github.com/AbhishekBadar/portfolio). Asset credits:

- **Planet textures** — [Solar System Scope](https://www.solarsystemscope.com/textures/) (CC BY 4.0)
- **HDRI lighting** — "Dikhololo Night" from [Poly Haven](https://polyhaven.com) (CC0)
- **3D models** (astronaut, spaceship) — [Quaternius](https://quaternius.com) (CC0)
- **ISS model** — [NASA 3D Resources](https://github.com/nasa/NASA-3D-Resources) (public domain)
