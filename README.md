# Portfolio

Personal portfolio website showcasing my projects and skills as an Android Engineer & Software Architect. Built with performance, accessibility, and clean architecture in mind.

## Technologies

- **React 18** - UI library with Concurrent features
- **TypeScript** - Strict type safety
- **Vite** - High-performance build tool
- **Tailwind CSS** - Utility-first styling
- **Shadcn/UI** - Accessible component primitives
- **React Router v6** - Client-side routing with state management

## Key Features & Optimizations

### ⚡️ Performance
- **Zero-Layout Shift**: Optimized image loading with explicit dimensions, `decoding="async"`, and `loading="lazy"`.
- **Bundle Optimization**: Manual chunk splitting in Vite to separate vendor/UI libraries.
- **Efficient Rendering**: Throttled scroll listeners and `IntersectionObserver` for scroll-spy navigation.

### 🛡️ Type Safety & Reliability
- **Strict TypeScript**: Full strict mode enabled (`noImplicitAny`, `strictNullChecks`).
- **Error Boundaries**: Global error catching with graceful fallback UI.
- **Robust Navigation**: Deep-linking support and scroll position restoration on reload.

### 🎨 UX & Theming
- **System Theme Sync**: Auto-detects OS theme preference with manual override support.
- **Smooth Animations**: GPU-accelerated transitions and reduced-motion support.
- **Touch Gestures**: Custom swipe hooks for touch-optimized carousels.

### ♿️ Accessibility
- **Keyboard Navigation**: Full keyboard support for menus, carousels, and interactive elements.
- **Semantic HTML**: Proper sectioning and ARIA attributes for screen readers.

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or bun

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd "My Portfolio Website"

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run test` | Run unit tests (Vitest) |
| `npm run test:e2e` | Run end-to-end tests (Playwright) |
| `npm run lint` | Run ESLint |

## Testing

The project uses a dual testing strategy:
- **Unit/Integration**: Vitest + React Testing Library for component logic.
- **E2E**: Playwright for full browser automation and critical flow verification.

## Project Structure

```
src/
├── components/     # UI components & sections
│   ├── layout/     # Structural components (Navbar, MainLayout)
│   ├── sections/   # Landing page sections
│   └── ui/         # Reusable primitives
├── pages/          # Route pages (Index, ProjectDetail)
├── hooks/          # Custom hooks (useTheme, useSwipe, etc.)
├── data/           # Content & Data models
├── constants/      # Shared configuration
├── lib/            # Utilities
└── main.tsx        # Entry point
```

## License

MIT
