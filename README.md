# Searching for Celia Website

Official website for Searching for Celia, built with Next.js, shadcn, Tailwind CSS, and Framer Motion.

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
```

The app is configured for static export (`out/`) for GitHub Pages.

## Media Workflow

Raw files are not committed directly into public folders.

1. Add source images to `assets/raw/images`.
2. Run optimization:

```bash
npm run media:optimize
```

3. Commit generated files in `public/images`.
4. For videos, transcode to `.mp4` or `.webm` and place optimized assets in `public/videos`.

CI media checks:

```bash
npm run media:check
```

## GitHub Pages Deployment

Deployment is automated with `.github/workflows/deploy.yml`.

- Push to `main`.
- GitHub Actions runs lint/build and deploys static output.
- Workflow sets `NEXT_PUBLIC_BASE_PATH` to repo name for project pages.

If using a custom domain, set base path behavior accordingly and configure `CNAME`.
