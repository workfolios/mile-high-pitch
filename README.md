# Mile High Pitch 2019 — Historical Event Archive

## 1. Website Identity & Purpose

Mile High Pitch 2019 is a contemporary editorial historical-event archive documenting the startup pitch competition held on November 21, 2019 in Denver, Colorado. Presented by WorkAbility and The Bank of Denver, the competition gave five selected Colorado startups a presentation platform before an experienced judging panel, competing for a meaningful prize package and community recognition.

This application serves as an authoritative, restrained, and accessible public record of:
- The 2019 competition and historical context.
- The winning company (Boogaloo Beds / Cubby Beds).
- The five finalist companies (Boogaloo Beds, EVmatch, AET Automotive, Slope Threads, and Etta Epidermis / cysto.ai) and their business continuity.
- The seven contributors and co-producers behind the event.
- The five historical judges.
- Stewardship colophon and archive inquiry channels.

## 2. Approved Architecture & Foundation

The website is built on the approved **Remix 3 — Adopted Enhancement Integration** baseline, which incorporates two core interaction systems:
1. **Remix 1 — Section-Aware Archive Navigation**: Deterministic, hysteresis-stabilized section tracking (`#competition`, `#finalists`, `#behind`, `#judges`) with no active state in the Hero or Footer, synchronized desktop and mobile menus, and `aria-current="location"`.
2. **Remix 2 — Record-to-Record Dossier Traversal**: Previous/Next traversal across Finalist, Contributor, and Judge rosters with finite non-wrapping boundaries, synchronized active selection, restrained viewport repositioning, and accessible heading focus management.

## 3. Runtime & Node.js Engine Contract

- **Resolved Dependency Engine Requirement:** Node.js `^20.19.0 || >=22.12.0` (mandated by `@vitejs/plugin-react@5.2.0` in the resolved dependency graph).
- **Verified Implementation Environment:** Node.js `v22.23.3` with npm `10.9.9`. (Compatibility across other untested Node ranges within the engine specification is not claimed).
- **Client Application:** Static Single Page Application (SPA) built with Vite, React 19, and Tailwind CSS.
- **Backend Requirements:** None. Static client bundle served directly; inquiry submissions route to external Formspree endpoint.

## 4. Package Manager & Deterministic Installation Contract

- **Authoritative Package Manager:** `npm` (governed authoritatively by `package-lock.json` v3).
- **Authoritative Clean Installation Command:**
  ```bash
  npm ci
  ```
  This command performs a deterministic install strictly from `package-lock.json`.

> *Source-of-truth:* `package-lock.json` is the sole governing lockfile for this GitHub release. The approved Google AI Studio export retains the historical `bun.lock` as source evidence; it is intentionally excluded from the public deployment repository.

## 5. Development & Verification Commands

All commands align directly with scripts declared in `package.json`:

- **Local Development:**
  ```bash
  npm run dev
  ```
  Starts the Vite dev server on `http://localhost:3000`.

- **Type Checking & Linting:**
  ```bash
  npm run lint
  ```
  Executes `tsc --noEmit` to validate strict TypeScript types without emitting artifacts.

- **Production Build:**
  ```bash
  npm run build
  ```
  Executes `vite build` to generate the production client bundle in `dist/`.

- **Local Preview of Production Build:**
  ```bash
  npm run preview
  ```
  Spins up the Vite preview server against the compiled `dist/` directory.

- **Workspace Clean:**
  ```bash
  npm run clean
  ```
  Removes the `dist/` build output.

## 6. Environment Variables & Base Path Guidance

- **No Runtime Environment Variables Required:** The client application does not consume any custom environment variables at runtime.
- **Unsupported Guidance Removed:** The application build does **not** consume `VITE_BASE_URL`.
- **Base Path Resolution:** Asset paths and internal routing reference Vite's built-in `import.meta.env.BASE_URL`, supplied directly by Vite's configuration (defaulting to `/`). The eventual production base path will be established during the later hosting/deployment architecture decision.
- **AI Studio Workspace Distinction:** AI Studio platform starter variables (`GEMINI_API_KEY`, `APP_URL`) are not consumed by the client bundle and are not required to build or execute the website.

## 7. Formspree Inquiry Integration

Archive inquiries submitted via the Archive Inquiry dialog in the site footer are routed directly to Formspree using the `@formspree/react` hook with endpoint ID:
```
xwlealvn
```
Submissions require:
- Full Name (`name`)
- Email Address (`email`)
- Inquiry Classification (`inquiryType`)
- Inquiry Body (`message`)

Upon verified successful submission, keyboard focus programmatically transitions to the confirmation landmark heading ("Inquiry Submitted") with subsequent Tab navigation proceeding to the Close control. (Actual assistive-technology screen-reader speech synthesis behavior requires live screen-reader testing and is not certified solely by DOM focus tree verification).

## 8. Current Status & Release Boundaries

- **Source authority:** Approved Export Lock declared by the owner on October 22, 2026. The authoritative AI Studio ZIP SHA-256 is `147110b0277430ad55b28542df376527539646714e28c7ac5e2546b491ca5846`.
- **Release repository:** `workfolios/mile-high-pitch`; this repository packaging excludes internal recovery snapshots, unused scripts, AI Studio-only metadata, and the seven malformed, non-runtime source copies. These remain preserved in the locked ZIP.
- **Intended host:** GitHub Pages project site at `https://workfolios.github.io/mile-high-pitch/`, subject to owner Pages configuration and successful public deployment.
- **Pages base path:** For this project-site release, build with `npm run build -- --base=/mile-high-pitch/`; the application uses Vite's `import.meta.env.BASE_URL` for public assets. The source default `/` remains unchanged for local development.
- **Release control:** `.github/workflows/validate.yml` validates pull requests and `main` pushes without deploying. `.github/workflows/pages.yml` deploys only on an explicit `workflow_dispatch` from `main`, after build validation, and publishes only the validated `dist/` artifact.
- **Deployment status:** Must be established from an actual GitHub Actions deployment run and direct public URL verification; do not infer success from repository source presence.
- **Scope:** SEO optimization and Search Console administration are not included. The existing source metadata is preserved without new SEO targeting.
