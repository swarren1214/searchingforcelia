# Searching for Celia Website Implementation Plan

## 1. Goals and Success Criteria

### Primary goals
- Build a visually striking, black-and-white band website for **Searching for Celia**.
- Represent all 6 members clearly:
	- Guitarist 1
	- Guitarist 2
	- Bassist
	- Drummer
	- Violinist
	- Cellist
- Keep the site fast, responsive, and easy to maintain.
- Deploy on **GitHub Pages** with an automated CI/CD flow.

### Success criteria
- Mobile and desktop layouts feel intentional and polished.
- Core pages load quickly and pass Lighthouse with strong scores.
- Easy content updates (shows, media links, bios) without major code edits.
- Fully automated deployment from `main` branch.

## 2. Technical Stack and Constraints

### Recommended stack
- **Framework:** Next.js (App Router) with static export
- **Language:** TypeScript
- **UI:** shadcn/ui + Tailwind CSS
- **Theme direction:** black-and-white standard style (high contrast)
- **Icons:** lucide-react
- **Animation:** framer-motion (core animation system for smooth, expressive transitions)

### Why this stack
- shadcn + Tailwind gives a clean, modern UI baseline and reusable components.
- Next.js static export supports GitHub Pages hosting well.
- TypeScript improves maintainability as content grows.

## 3. Information Architecture

### Site map
- **Home**
	- Hero with band name + tagline
	- Quick intro
	- Next show CTA
	- Featured track/video section
- **About**
	- Band story and style
	- Influences / identity
- **Members**
	- 6 profile cards (role + short bio + photo)
- **Music**
	- Embedded Spotify/YouTube/Bandcamp (as available)
	- Optional lyrics/liner notes for featured songs
- **Shows**
	- Upcoming shows list
	- Past shows archive
- **Gallery**
	- Press/performance photos
- **Contact**
	- Booking email
	- Social links
	- Optional newsletter signup link (external)

### Navigation
- Sticky top nav with section links
- Mobile sheet menu
- Footer with socials and copyright

## 4. Design System Plan (Black-and-White)

### Visual direction
- Strong monochrome palette:
	- Background: near-black + white sections
	- Text: high-contrast black/white
	- Borders/dividers: grayscale
- Editorial typography pairing (bold display + readable body).
- Large photography with dramatic contrast.

### shadcn component set
- Button, Card, Badge, Separator, Sheet, Dialog, Accordion, Tabs
- Optional Carousel for gallery highlights
- Toast for form feedback (if contact form later uses API)

### UX details
- Use generous spacing and clear rhythm.
- Keep motion subtle:
	- Fade/slide on section reveal
	- Hover states on cards/buttons
- Use framer-motion patterns consistently:
	- Shared motion presets for section enter, stagger, and hover interactions
	- Route/page transitions that stay smooth but quick
	- `prefers-reduced-motion` support for accessibility
- Prioritize accessibility:
	- Semantic headings
	- Keyboard navigation
	- Color contrast compliance

## 5. Content Model and Source Files

### Content approach
- Start with local structured data files (easy for GitHub Pages).
- Keep content in `src/content/*.ts` or `src/content/*.json`:
	- `members`
	- `shows`
	- `music`
	- `gallery`
	- `siteConfig`

### Member schema (example fields)
- `name`
- `role`
- `bioShort`
- `photo`
- `socials` (optional)

### Show schema
- `date`
- `venue`
- `city`
- `ticketUrl` (optional)
- `status` (`upcoming` | `past`)

## 6. Build Phases and Task Breakdown

### Phase 0: Project bootstrap (Day 1)
1. Initialize Next.js + TypeScript + Tailwind.
2. Configure shadcn/ui.
3. Set up global black-and-white theme tokens in CSS variables.
4. Add base layout, typography, and navigation shell.
5. Configure framer-motion foundation (`MotionConfig`, easing/duration tokens, reusable animation variants).

### Phase 1: Core pages + reusable sections (Day 1-2)
1. Build Home, About, Members page scaffolds.
2. Create reusable components:
	 - `SectionHeader`
	 - `MemberCard`
	 - `ShowList`
	 - `MediaEmbed`
3. Add responsive behavior for all breakpoints.

### Phase 2: Content integration (Day 2)
1. Populate all six member profiles.
2. Add initial show data and music embeds.
3. Add gallery assets and captions.
4. Run all new media through the optimization workflow before merge.

### Phase 3: Polish and accessibility (Day 3)
1. Finalize framer-motion animations and stagger timing across sections.
2. Validate keyboard navigation and focus states.
3. Validate reduced-motion behavior and avoid motion overload.
4. Run Lighthouse + fix major performance/a11y issues.

### Phase 4: Deployment and docs (Day 3)
1. Configure static export for GitHub Pages.
2. Add GitHub Actions workflow for automated deploy.
3. Write `README.md` with update instructions.

## 7. GitHub Pages Deployment Plan

### Repository setup
- Create repo: `searchingforcelia-site` (or preferred name).
- Use `main` as default branch.

### Next.js static export configuration
- Configure `next.config.*` for static output.
- Set `basePath`/`assetPrefix` only if publishing to project pages (e.g., `username.github.io/repo-name`).
- For custom domain, keep root path and add `CNAME`.

### CI/CD workflow
- GitHub Actions workflow:
	- Install dependencies
	- Build static export
	- Deploy to Pages artifact
- Trigger on push to `main`.

### Domain options
- Option A: `username.github.io/repo-name`
- Option B: custom domain (recommended for branding)

## 8. Proposed Folder Structure

```text
/
	src/
		app/
			page.tsx
			about/page.tsx
			members/page.tsx
			music/page.tsx
			shows/page.tsx
			gallery/page.tsx
			contact/page.tsx
		components/
			layout/
			sections/
			ui/            # shadcn components
		content/
			members.ts
			shows.ts
			music.ts
			gallery.ts
			siteConfig.ts
				mediaManifest.ts
		lib/
			utils.ts
			scripts/
				optimize-media.mjs
	public/
		images/
			members/
			gallery/
			videos/
				posters/
		favicon.ico
	.github/
		workflows/
			deploy.yml
```

## 9. QA Checklist Before Launch

### Functional
- All routes load successfully.
- Nav links and CTAs work.
- External media embeds render correctly.

### Responsive
- Verify at small phone, large phone, tablet, desktop widths.
- Ensure typography scales cleanly.

### Accessibility
- Heading order is valid.
- Keyboard-only nav works.
- Images include alt text.
- Focus indicators are visible.

### Performance
- Verify all images are converted to optimized formats and responsive sizes.
- Ensure videos use compressed web-friendly formats and include poster images.
- Lazy-load offscreen media and use `loading="lazy"` where appropriate.
- Avoid oversized JS bundles.
- Recheck Lighthouse after optimizations.

## 10. Media Optimization Workflow (Required for New Assets)

### Image workflow
1. Add source images to `assets/raw/images` (not directly to `public/images`).
2. Run optimization script (Sharp-based) to generate:
	- AVIF and WebP variants
	- Multiple responsive widths (example: 640, 960, 1280, 1920)
	- Optional fallback JPEG/PNG where needed
3. Move generated outputs to `public/images/...` with stable naming.
4. Reference assets via `next/image` with explicit `sizes`.

### Video workflow
1. Add source videos to `assets/raw/videos`.
2. Transcode with FFmpeg to web-friendly output (H.264 MP4 baseline).
3. Generate a compressed poster frame image per video.
4. Keep videos out of hero autoplay by default on mobile.
5. Load videos lazily and use `preload="metadata"` unless a stronger reason exists.

### CI guardrails
- Add a CI check that fails if raw media is committed to `public/` without optimization.
- Add a max file size threshold warning for images/videos.
- Include a `README` section with one command for contributors, e.g. `npm run media:optimize`.

### Ownership
- Any PR that adds media must include:
	- Optimized derivatives
	- Updated `mediaManifest` entry
	- Before/after file-size summary in PR notes

## 11. Content Collection Checklist (Needed From Band)

- Final band bio (short + long versions)
- Each member:
	- Name spelling
	- Preferred role label
	- 2-4 sentence bio
	- Profile photo
- Show list (upcoming + notable past)
- Music links (Spotify, YouTube, Bandcamp, etc.)
- Social profile URLs
- Contact/booking email

## 12. Future Enhancements (Post-v1)

- Lightweight CMS (e.g., Decap CMS) for no-code updates.
- Mailing list integration (Buttondown/Substack/Mailchimp).
- Press kit download page.
- Merch page linking to external storefront.
- Basic analytics (privacy-friendly option).

## 13. Estimated Timeline

- **Total initial build:** ~3 focused days
- **If content is delayed:** technical build can still complete with placeholders in ~2 days
- **Final polish + launch:** 0.5-1 day after final assets are provided

