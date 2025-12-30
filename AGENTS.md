# Repository Guidelines

## Project Structure & Module Organization
- `src/` holds all application code.
- `src/main.tsx` boots the React app and mounts `src/App.tsx`.
- `src/components/` contains feature components (example: `TravelRecap.tsx`).
- `src/components/ui/` contains reusable UI primitives (Radix-based).
- `src/styles/` and `src/index.css` hold global styles.
- `src/guidelines/Guidelines.md` documents design or content guidance.
- `index.html` is the Vite entry template.

## Build, Test, and Development Commands
- `npm i` installs dependencies.
- `npm run dev` starts the Vite dev server for local development.
- `npm run build` creates a production build in `dist/`.

## Coding Style & Naming Conventions
- Use TypeScript and React function components (`.tsx`).
- Indentation is 2 spaces; follow the existing import order and formatting style.
- Component files use PascalCase (example: `TravelRecap.tsx`).
- UI primitives live under `src/components/ui/` and should stay small and reusable.
- No formatter or linter is configured; keep changes minimal and consistent with nearby code.

## Testing Guidelines
- No automated test framework is configured yet.
- Validate changes by running `npm run dev` and checking the relevant screens manually.
- If you add tests, place them alongside components (example: `src/components/TravelRecap.test.tsx`).

## Commit & Pull Request Guidelines
- This workspace does not include Git history, so no commit message convention is enforced.
- Use short, imperative commit subjects (example: `Add booking summary card`).
- For pull requests, include a brief description, a list of key changes, and screenshots for UI updates.

## Configuration & Assets
- Environment-specific config is not present; keep any new secrets out of the repo.
- If you add assets, place them under `src/` and reference them with relative imports.
