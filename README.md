# Wine Library — Frontend

Frontend part of the **Wine Library** team project — a web application for browsing and managing a wine collection.

## Tech Stack

- **React** + **Vite**
- **React Router** — client-side routing
- **Redux Toolkit** — state management
- **CSS Modules** + **SCSS** — styling
- **ESLint** + **Prettier** — code quality and formatting
- **Husky** + **lint-staged** — pre-commit checks

## Project Structure

```
src/
  ├── assets/         # images, icons, fonts
  ├── components/     # reusable UI components
  ├── pages/          # route-level page components
  ├── store/          # Redux Toolkit slices and store config
  ├── styles/         # global SCSS styles, variables, mixins
  ├── App.jsx
  └── main.jsx
```

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm

### Installation

```bash
git clone https://github.com/OlhaLishenko/wine-library-frontend.git
cd wine-library-frontend
npm install
```

### Running locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173` by default.

## Available Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the development server         |
| `npm run build`   | Build the app for production         |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint checks                    |

## Styling Conventions

- Component-specific styles live next to the component as `ComponentName.module.scss` (CSS Modules).
- Shared variables, mixins, and global styles live in `src/styles/`.

## State Management

Global state is managed with **Redux Toolkit**. Each feature/domain has its own slice under `src/store/`.

## Branching Strategy

- `main` — stable, production-ready code
- `develop` — active development branch
- `feature/*` — individual feature branches, merged into `develop` via Pull Request

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add wine card component
fix: correct routing on wine details page
docs: update README
style: format code with prettier
refactor: simplify redux slice logic
```

## Deployment

The app is automatically deployed to **Vercel** on every push to `main`.

- Production: [wine-library-frontend.vercel.app](https://wine-library-frontend.vercel.app/)
- Preview deployments are generated automatically for each Pull Request.

## Contributing

1. Create a feature branch from `develop`: `git checkout -b feature/your-feature-name`
2. Commit your changes following the commit convention above
3. Push your branch and open a Pull Request into `develop`
4. Make sure `npm run lint` passes before requesting a review
