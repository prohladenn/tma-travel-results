# Repository Guidelines

## Project Structure & Module Organization
- `src/` contains all application code.
- `src/main.tsx` bootstraps the React app and mounts `src/App.tsx`.
- `src/components/` holds feature components (example: `TravelRecap.tsx`).
- `src/components/ui/` contains reusable UI primitives (Radix-based).
- `src/styles/` and `src/index.css` hold global styling and utilities.
- `src/guidelines/Guidelines.md` documents design/content guidance.
- `index.html` is the Vite entry template.
- Assets should live under `src/` and be imported via relative paths.

## Build, Test, and Development Commands
- `npm i` installs dependencies.
- `npm run dev` starts the Vite dev server for local development.
- `npm run build` generates a production build in `dist/`.

## Coding Style & Naming Conventions
- Use TypeScript with React function components (`.tsx`).
- Indentation is 2 spaces; keep formatting consistent with nearby code.
- Components use PascalCase (example: `TravelRecapEditor.tsx`).
- UI primitives live under `src/components/ui/` and should remain small and reusable.
- No formatter or linter is configured; avoid large reformatting changes.

## Testing Guidelines
- No automated test framework is configured yet.
- Manually validate changes by running `npm run dev` and checking the relevant screens.
- If you add tests, place them alongside components (example: `src/components/TravelRecap.test.tsx`).

## Commit & Pull Request Guidelines
- Git history is not included in this workspace, so no enforced commit conventions exist.
- Use short, imperative commit subjects (example: `Add booking summary card`).
- For pull requests, include a brief description, list key changes, and add screenshots for UI updates.

## Configuration & Security Notes
- No environment-specific config is present; keep secrets out of the repo.
- Prefer explicit, minimal changes and avoid introducing new dependencies unless required.
