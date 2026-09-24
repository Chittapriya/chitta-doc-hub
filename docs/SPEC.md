# chittapriyamondal.com — Specification

Status: live · Stack: Astro 7 (static) · Hosting: GitHub Pages, custom domain `www.chittapriyamondal.com`

## 1. Purpose
A personal site for Chittapriya Mondal to publish long-form technical articles on AI, architecture, IoT, networking and developer tooling. Posts often include diagrams, so it should be easy to read them in detail.

**Audience:** engineers, architects and technical leaders, on desktop and mobile.

## 2. Functional requirements

### 2.1 Pages and routes
| Route | Content |
|---|---|
| `/` | Hero section (photo, one-line intro, links to Blog and About), the latest 3 posts as cards, and topic chips linking to tag pages |
| `/insights/` | All published posts as cards, newest first, with tag filter chips (menu label "Insights") |
| `/insights/<slug>/` | A single post (see 2.3) |
| `/tags/` | All tags with post counts |
| `/tags/<tag-slug>/` | Cards for posts with that tag |
| `/about/` | Author bio and photo |
| `/blog/YYYY/MM/DD/<old-slug>/`, `/blog/`, `/blog/<slug>/` | Redirects to the matching `/insights/…` page: first the old MkDocs URLs, then the addresses the section briefly used before it was renamed. They must keep working. |

### 2.2 Post cards
- **R-CARD-1** Each card shows the cover image, date, reading time, title, description and up to 3 tags.
- **R-CARD-2** The whole card is clickable and opens the post. It must be keyboard-focusable with a visible focus ring.
- **R-CARD-3** Cards are generated from front matter. Nothing is maintained by hand.
- **R-CARD-4** The grid is responsive: one column at 390px, several columns on desktop.

### 2.3 Post page
- **R-POST-1** Header: tags (linked), title, description, author, date and reading time.
- **R-POST-2** A cover image under the header, unless the same image already appears in the post body.
- **R-POST-3** An "On this page" contents list of `##`/`###` headings. It stays visible while scrolling on screens ≥1080px wide, is hidden on narrower screens, and only appears when a post has more than 2 headings.
- **R-POST-4** Links to the newer and older post at the bottom.
- **R-POST-5 Image zoom.** Every image in the post body opens in a full-screen viewer (PhotoSwipe) when clicked, or with Enter or Space on the keyboard. The viewer supports:
  - zoom in and out with toolbar +/− buttons, the `+`/`-` keys, the mouse wheel and pinch
  - dragging the image around
  - arrow keys between images in the post
  - `Esc` to close

  Maximum zoom is 5× the fitted size.
- **R-POST-6** Code blocks are syntax-highlighted with Shiki's `github-light` theme.

### 2.4 Blog filtering
- **R-FILTER-1** Tag chips on `/insights/` filter the cards on the page, with no reload.
- **R-FILTER-2** The selected filter is saved in the URL hash (`/insights/#ai`) and restored on load.
- **R-FILTER-3** When no card matches, a "no posts" message is shown.
- **R-FILTER-4** On narrow screens the chips sit in a single row that scrolls sideways.

### 2.5 Theme
- **R-THEME-1** The site uses a single light theme in blue tones, with no dark mode and no theme toggle. This is a deliberate choice by the site owner.

### 2.6 Authoring
- **R-AUTH-1** A post is a folder: `src/content/blog/<slug>/index.md` plus an `assets/` folder.
- **R-AUTH-2** Front matter is validated at build time (`src/content.config.ts`). Required fields: `title`, `date`, `description`, `cover`. Optional: `tags`, `author`, `coverFit` (`cover` or `contain`), `draft`.
- **R-AUTH-3** `draft: true` posts are left out of every page and every list.
- **R-AUTH-4** `npm run new-post` creates a draft post with a placeholder cover.
- **R-AUTH-5** Editable diagram sources (`.drawio`) live next to their exported images.

## 3. Non-functional requirements
- **NFR-1 Static only.** No server, database or runtime API. The output is plain HTML/CSS/JS in `dist/`.
- **NFR-2 Performance.** Images are optimised to WebP at build time. Below-the-fold images load lazily. Only two small scripts ship: the tag filter on `/insights/`, and the zoom viewer on post pages, which is loaded on demand.
- **NFR-3 Accessibility.** Semantic landmarks (`header`, `nav`, `main`, `article`, `footer`), alt text on content images, keyboard access for cards, filters and zoom, and `aria-pressed` on filter chips.
- **NFR-4 Responsive.** No horizontal scroll at 390px. The layout is tested at 390px and 1280px.
- **NFR-5 SEO.** Every page has a `<title>`, meta description, canonical URL and Open Graph title/description. URLs are stable, with trailing slashes.
- **NFR-6 Minimal dependencies.** Runtime dependencies are only `astro` and `photoswipe`. Adding a UI framework or CSS framework needs explicit approval.
- **NFR-7 Quality gate.** `npm test` (`astro check` + `astro build`) must pass with 0 errors. CI enforces this on every push and pull request.

## 4. Design system
- **Menu:** Home · Insights · About. The Insights section lives at `/insights/…`. Its posts are stored in `src/content/blog/`. A "Work" section for case studies is planned but not added yet.
- **Brand:** this is a personal brand site. The header shows the logo, then **Chittapriya Mondal** in bold with a small role line underneath ("Technology Leader · AI, Data & Autonomous Systems"). The role line is hidden below 720px and the name below 400px. "CHITTA Labs" is reserved as a possible future section or business name and is not used as the site name. The logo mark (`src/components/Logo.astro`, and `public/favicon.svg` with the same shape) is a white open "C" ring with a centre dot, on a rounded square with a sky-blue→cyan gradient (`#0284c7` → `#22d3ee`). The site name is set in one constant in `src/layouts/Base.astro`, which builds the page titles; the header and home page write it directly.
- Colors are CSS custom properties in `src/styles/global.css`, light theme only:
  - `--primary` `#0369a1` (deep sky blue) for links, buttons and active states
  - `--accent` `#0e7490` (cyan-teal) for small labels, blockquote borders and button hover
  - `--bg` `#f5faff`, a very pale blue page background
  - `--surface` white, for cards
  - `--glow-1` and `--glow-2`, the soft blue glows behind the home page hero

  Text colours pass WCAG AA contrast on white.
- Post covers use deep blue→cyan gradients to match.
- System font stack (Inter or Segoe UI), 17px base size, line-height 1.65.
- Cards: 14px radius, a soft shadow, and on hover they lift 4px, get a stronger shadow and the cover zooms in slightly.
- Content width is 760px for post text and 1160px for page containers. Side padding is 16px on mobile and 32px on desktop.

## 5. Build and deploy
- `npm ci` → `npm test` → `peaceiris/actions-gh-pages` publishes `dist/` to the `gh-pages` branch (orphan commit), in `.github/workflows/deploy.yml`.
- Pushes to `main` deploy. Pull requests are only built and tested.
- The GitHub Pages source is **Deploy from a branch: `gh-pages` / root**. The custom domain is `www.chittapriyamondal.com`; the workflow's `cname:` input and `public/CNAME` both provide it. `public/.nojekyll` stops GitHub's Jekyll step from dropping the `_astro/` folder.

## 6. Out of scope / future ideas
- RSS feed (`@astrojs/rss`)
- Comments (giscus)
- Generated social preview images
- Full-text search (e.g. Pagefind)
- Related posts
- Analytics
