# personal-portfolio

Robert Herber's personal portfolio site — [rwherber.com](https://rwherber.com).

A modern, dev-focused single-page portfolio with a dark/light theme toggle, built with
**Vite + React 19 + TypeScript**. Content is data-driven (see `src/data/`), styled with a
custom glassmorphism theme (no UI framework).

## Develop

```bash
npm install
npm run dev      # http://localhost:5210
```

## Build & preview

```bash
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build
```

## Structure

- `src/data/` — all site content (experience, projects, skills, education, awards, highlights)
- `src/App.tsx` — page sections and layout
- `src/theme.tsx` — dark/light theme (persisted, respects system preference)
- `src/index.css` — theme tokens and styles
- `public/` — profile image, résumé/project PDFs, and favicon

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
