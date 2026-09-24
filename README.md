# CHITTA Labs

Personal blog of Chittapriya Mondal, live at **[www.chittapriyamondal.com](https://www.chittapriyamondal.com)**.
It is a static site built with [Astro](https://astro.build) and deployed to GitHub Pages.

## Prerequisites

- **Node.js 22.12 or newer.** The repo pins version 24 in `.nvmrc`; run `nvm use` if you use nvm.
- npm (comes with Node).
- Optional: the [draw.io](https://www.drawio.com/) desktop app, to edit and export diagrams.

## Quick start

```bash
npm install        # first time only
npm run dev        # http://localhost:4321, reloads as you edit
```

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server at http://localhost:4321 with live reload |
| `npm run build` | Build the production site into `dist/` |
| `npm run preview` | Serve the built `dist/` locally, to check the real output |
| `npm run check` | Type-check `.astro`/`.ts` files and validate post front matter |
| `npm test` | `check` and then `build`. CI runs the same thing, so run it before pushing |
| `npm run new-post -- <slug> "<Title>"` | Create a new post from a template (starts as a draft) |

### Test locally before pushing

```bash
npm test           # type check + build; must pass
npm run preview    # open http://localhost:4321 and click through
```

Things to check in the browser:
- Home, **Blog** and **About** load (tag pages are reached from post tags and the home page's Topics).
- Cards open their posts.
- Tag filters on `/blog/` work.
- Clicking an image in a post opens the zoom viewer: `+`/`−` buttons, mouse wheel, `Esc` to close.

## Writing a post

```bash
npm run new-post -- my-topic "My Topic Title"
```

This creates `src/content/blog/my-topic/index.md` and a placeholder `assets/cover.svg`. Then:

1. Write the post in Markdown. Start sections at `##`; the page title comes from front matter.
2. Put images in `src/content/blog/my-topic/assets/` and reference them as `![Alt text](./assets/diagram.png)`.
3. Replace the cover image, or point `cover:` at one of your images.
4. Set `draft: false` to publish, then run `npm test` and push to `main`.

Front matter reference:

```yaml
---
title: "My Topic Title"          # required
date: 2026-09-24                 # required; controls sort order
description: "Shown on cards."   # required; 1–2 sentences
cover: ./assets/cover.svg        # required; card + post header image
coverFit: cover                  # optional; use "contain" for diagrams/screenshots
tags: [AI, Architecture]         # optional
author: Chittapriya Mondal       # optional (this is the default)
draft: false                     # optional; true hides the post
---
```

The post is published at `/blog/<folder-name>/`.

### Diagrams

Keep the editable `.drawio` file next to its exported PNG in the post's `assets/` folder. To export from the command line:

```bash
"C:\Program Files\draw.io\draw.io.exe" -x -f png -s 2 -b 10 -o diagram.png diagram.drawio
```

## Deployment

Every push to `main` runs [.github/workflows/deploy.yml](.github/workflows/deploy.yml). It runs `npm ci` and `npm test`, then publishes `dist/` to the **`gh-pages` branch**, which GitHub Pages serves. Pull requests are built and tested but not deployed. You can also start a deploy manually from the *Actions* tab ("Run workflow").

GitHub Pages settings (already configured): *Settings → Pages → Source: Deploy from a branch → `gh-pages` / (root)*, custom domain `www.chittapriyamondal.com`. The workflow writes `CNAME` and `.nojekyll` into every deploy. `.nojekyll` is needed, or GitHub's Jekyll step would drop the `_astro/` folder of scripts and images.

## Project layout

```
.github/workflows/deploy.yml   CI: test + deploy to GitHub Pages
docs/SPEC.md                   Requirements and design decisions
public/                        Copied as-is to the site root (CNAME, favicon)
scripts/new-post.mjs           Post scaffolding
src/
  assets/                      Site images (profile photo)
  components/                  Header, PostCard
  content/blog/<slug>/         One folder per post: index.md + assets/
  content.config.ts            Post front-matter schema
  layouts/Base.astro           HTML shell: head, header, footer
  lib/posts.ts                 Post helpers: sorting, tags, reading time, dates
  pages/                       Routes (index, about, blog/, tags/)
  styles/global.css            Design tokens (light blue theme), shared styles
astro.config.mjs               Site URL, redirects for old URLs, code theme
```

See [AGENTS.md](AGENTS.md) for conventions and [docs/SPEC.md](docs/SPEC.md) for requirements.
