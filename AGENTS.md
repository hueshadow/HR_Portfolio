<!-- OPENSPEC:START -->
# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

# Repository Guidelines

## Project Structure & Module Organization
The WordPress reference theme lives in `mockup/` and remains the source for shared assets. React development happens in `mockup-react/`; page shells sit in `src/components/`, motion logic in `src/hooks/useAnimations.ts`, and theme overrides in `src/components/custom-styles.css`. Static images and legacy scripts are mirrored in `public/assets/`, while root-level `auto-*.sh` scripts coordinate dev, preview, and auto-commit tasks.

## Build, Test, and Development Commands
Inside `mockup-react/`, run `npm install` once per environment. `npm run dev` launches the Vite dev server with hot reload. `npm run build` performs the TypeScript project build plus production bundle; treat it as the release gate. `npm run preview` serves the built assets for manual QA, and `npm run lint` runs ESLint via `eslint.config.js`. Use `./auto-dev.sh`, `./auto-preview.sh`, or `./auto-commit.sh` when you want the scripted workflow from the repo root.

## Coding Style & Naming Conventions
Stick to TypeScript with explicit prop and hook typings. Follow the two-space indentation, trailing commas where applicable, and single-quote imports seen across existing files. Components and hooks use PascalCase (`PortfolioPage`, `useSkillBarAnimation`); utility functions stay camelCase. Extend animations or pointer behaviour inside `useAnimations.ts` or dedicated hooks, and keep CSS tweaks in `custom-styles.css` unless they are page-specific.

## Testing Guidelines
There is no automated test suite yet; rely on `npm run lint` and `npm run build` before every PR. Document manual checks in the PR body—cover desktop (≥960px) and mobile views, the accordion navigation, and mouse trailer responsiveness. When changing motion or media, attach a short screen capture or GIF for reviewers.

## Commit & Pull Request Guidelines
Follow Conventional Commit prefixes such as `feat:`, `fix:`, `chore:`, and `style:`; the auto-commit helpers produce messages in that format. Keep commits focused and rebase or squash noisy iterations before opening a PR. Pull requests should include a concise summary, linked issue or task, any UI screenshots or clips, and notes on the manual verification you completed. Call out Netlify or deployment-impacting adjustments explicitly.

## Environment & Deployment Notes
Target Node.js 20 (`nvm use 20` is recommended). Netlify builds run from `mockup-react/` using `npm run build`, so confirm asset paths resolve relative to that directory. Third-party libraries (jQuery, Magnific Popup, Shuffle.js, Tiny Slider) are expected at runtime; do not remove their script references from `index.html` without providing an equivalent replacement.
