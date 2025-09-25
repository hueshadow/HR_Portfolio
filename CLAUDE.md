# CLAUDE.md - HR Portfolio Project Guide

## Project Overview

This is a personal portfolio website project with two parallel implementations:
- **WordPress Theme** (`mockup/`) - Original HueShadow WordPress theme (legacy)
- **React + TypeScript** (`mockup-react/`) - Modern React recreation (active development)

The React version faithfully recreates the WordPress theme's design and functionality using modern web technologies.

## Technology Stack

### Primary Stack (React Implementation)
- **Framework**: React 19.1.1 with TypeScript 5.8.3
- **Build Tool**: Vite 4.5+ with custom configuration
- **Bundler**: ES modules with bundler resolution
- **Routing**: React Router DOM 7.9.1
- **Styling**: CSS with custom properties, Font Awesome icons
- **Animations**: Custom CSS animations + JavaScript animations

### Key Dependencies
```json
{
  "react": "^19.1.1",
  "react-dom": "^19.1.1",
  "react-router-dom": "^7.9.1",
  "typescript": "~5.8.3",
  "vite": "^4.5.0",
  "@vitejs/plugin-react": "^4.0.0",
  "jquery": "^3.7.1",
  "magnific-popup": "^1.2.0",
  "shufflejs": "^6.1.2",
  "tiny-slider": "^2.9.4"
}
```

## Project Structure

```
HR_Portfolio/
├── mockup/                    # WordPress theme (legacy)
│   ├── functions.php         # Theme setup and plugin requirements
│   ├── framework/            # WordPress framework classes
│   └── assets/              # Shared CSS, JS, images
├── mockup-react/             # React implementation (active)
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── App.tsx      # Main app component with routing
│   │   │   ├── HomePage.tsx # Homepage component
│   │   │   ├── AboutPage.tsx # About page component
│   │   │   ├── PortfolioPage.tsx # Portfolio page
│   │   │   ├── BlogPage.tsx # Blog page
│   │   │   ├── ContactPage.tsx # Contact page
│   │   │   ├── PortfolioDetailPage.tsx # Project detail page
│   │   │   ├── BlogDetailPage.tsx # Blog detail page
│   │   │   ├── PortfolioFilter.tsx # Portfolio filter component
│   │   │   ├── ImagePreview.tsx # Image preview modal
│   │   │   ├── MouseTrailer.tsx # Mouse tracking effect
│   │   │   ├── DesktopNav.tsx # Desktop navigation
│   │   │   └── MobileNav.tsx # Mobile navigation
│   │   ├── hooks/           # Custom React hooks
│   │   │   └── useAnimations.ts # Animation hooks
│   │   ├── main.tsx        # App entry point
│   │   └── custom-styles.css # React-specific CSS overrides
│   ├── public/
│   │   └── assets/         # Static assets (shared with WordPress)
│   │       ├── css/        # Stylesheets
│   │       ├── js/         # JavaScript
│   │       └── img/        # Images
│   ├── package.json        # Dependencies and scripts
│   ├── vite.config.ts     # Vite configuration
│   ├── tsconfig.app.json   # TypeScript config
│   └── eslint.config.js   # ESLint configuration
├── src/                    # Additional source files
├── auto-dev.sh            # Automation scripts
├── auto-commit.sh         # Git automation
├── auto-preview.sh        # Dev server automation
├── netlify.toml          # Netlify deployment config
└── .npmrc               # npm configuration
```

## Build & Development Commands

### Automation Scripts (from project root)
```bash
./auto-dev.sh      # Auto-commit + start preview server
./auto-commit.sh   # Git add all, commit, push to origin/main
./auto-preview.sh  # Kill existing vite, start new dev server on :5173
```

### Standard Commands (from mockup-react/)
```bash
npm install        # Install dependencies
npm run dev        # Start Vite dev server (http://localhost:5173)
npm run build      # TypeScript check + Vite build
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

### Package.json Scripts
```json
{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview",
  "auto-dev": "../auto-dev.sh",
  "auto-commit": "../auto-commit.sh",
  "auto-preview": "../auto-preview.sh"
}
```

## Development Workflow

### Important: Development Habit
**Developer's preference**: Does NOT run local development server. After completing any task, always make a GitHub commit. This habit should be followed for all development work in this repository.

### Automated Development Process
1. **Make code changes**
2. **Run `./auto-commit.sh`** (from project root)
   - Automatically commits changes with generated message
   - Pushes to origin/main
3. **Alternative**: Use `./auto-dev.sh` to commit AND start preview server

### Git Workflow
- **Auto-commit**: Generates commit messages like "feat: update X files"
- **Auto-push**: Automatically pushes to origin/main branch
- **Manual workflow**: Standard git commands also supported
- **Important**: Always commit after completing tasks, do not keep dev server running

### Key Development Patterns

#### 1. Accordion Layout Architecture
- **Desktop**: Horizontal accordion with 80px collapsed pages
- **Mobile**: Vertical scroll layout below 960px breakpoint
- **State Management**: `activePageId` controls which page is expanded
- **Detail Pages**: Portfolio/Blog detail pages hide accordion completely

#### 2. Mouse Tracking System
- **Component**: `MouseTrailer.tsx` provides complex mouse tracking
- **Constraints**: Mouse position limited to content area boundaries
- **Performance**: Uses `requestAnimationFrame` for 60fps tracking
- **Mobile**: Automatically disabled on mobile devices
- **Background Effect**: Parallax movement with `movementStrength = 370`

#### 3. Animation System
- **Custom Hooks**: `useAnimations.ts` contains specialized animation logic
  - `useSkillBarAnimation`: Staggered reveals with 250ms delays
  - `useHeadingAnimation`: Text scramble effect with letter cycling
  - `usePortfolioCaptionAnimation`: Hover-triggered captions
- **CSS Variables**: Dynamic mouse position updates `--x`, `--y`, `--size`

#### 4. Detail Page Architecture
- **Routing**: React Router handles detail pages with dynamic routes
  - Portfolio details: `/portfolio/:id`
  - Blog details: `/blog/:id`
- **Fallback States**: Default pages for missing content
- **Conditional Rendering**: Detail pages hide accordion layout
- **Navigation**: Back navigation to parent pages

#### 5. CSS Custom Property System
- **Dynamic Backgrounds**: `--page-bg-color` controls page backgrounds
- **Mouse Position**: `--x`, `--y`, `--size` for interactive effects
- **Theme Variables**: `--px-theme-clr` and `--px-theme-bg` for consistent theming
- **Runtime Updates**: JavaScript can update CSS variables dynamically

#### 6. Performance Optimizations
- **Image Preloading**: Background image preloaded before content display
- **GPU Acceleration**: Mouse trailer uses `transform: translate3d()`
- **Event Listeners**: Passive event listeners for scroll performance
- **Lazy Loading**: Components load based on active page state
- **CSS Containment**: Limits browser reflow/repaint areas

## Deployment

### Netlify Configuration
- **Build Command**: `cd mockup-react && npm install && vite build`
- **Publish Directory**: `mockup-react/dist`
- **Node Version**: 20
- **SPA Routing**: All routes redirect to `index.html`
- **Configuration File**: `netlify.toml`

### Environment Requirements
- **Node.js**: Version 20+
- **TypeScript**: 5.8.3 with strict mode enabled
- **Vite**: 4.5+ with React plugin
- **ESLint**: Modern flat config with React plugins

## Critical Files & Components

### Core Architecture Files
- `/Users/hueshadow/Documents/GitHub/HR_Portfolio/mockup-react/src/App.tsx` - Main routing and layout
- `/Users/hueshadow/Documents/GitHub/HR_Portfolio/mockup-react/src/components/MouseTrailer.tsx` - Mouse tracking system
- `/Users/hueshadow/Documents/GitHub/HR_Portfolio/mockup-react/src/hooks/useAnimations.ts` - Animation hooks
- `/Users/hueshadow/Documents/GitHub/HR_Portfolio/mockup-react/src/components/PortfolioDetailPage.tsx` - Detail page implementation
- `/Users/hueshadow/Documents/GitHub/HR_Portfolio/mockup-react/src/components/PortfolioFilter.tsx` - Portfolio filtering system

### Configuration Files
- `/Users/hueshadow/Documents/GitHub/HR_Portfolio/mockup-react/vite.config.ts` - Vite configuration
- `/Users/hueshadow/Documents/GitHub/HR_Portfolio/mockup-react/tsconfig.app.json` - TypeScript config
- `/Users/hueshadow/Documents/GitHub/HR_Portfolio/mockup-react/eslint.config.js` - ESLint config
- `/Users/hueshadow/Documents/GitHub/HR_Portfolio/netlify.toml` - Deployment config

### Styling & Assets
- `/Users/hueshadow/Documents/GitHub/HR_Portfolio/mockup-react/src/components/custom-styles.css` - React-specific overrides
- `/Users/hueshadow/Documents/GitHub/HR_Portfolio/mockup-react/public/assets/` - Shared static assets

## Important Notes

### Asset Sharing
- React version reuses WordPress theme's CSS, JS, and image assets
- All assets served from `/public/assets/` directory
- Font Awesome icons included via CSS

### Plugin Dependencies (WordPress)
- WordPress theme requires 8 specific plugins including Elementor
- React version has no external plugin dependencies

### Mobile Responsiveness
- Breakpoint at 960px for mobile/desktop layouts
- Touch-friendly interactions on mobile devices
- Mouse tracking automatically disabled on mobile
- Navigation adapts to mobile screen sizes
- Responsive grid layouts for detail pages

### Browser Support
- Modern browsers with ES2022+ support
- Requires CSS Grid and Flexbox support
- Font Awesome 6+ icon support

## Common Development Tasks

### Adding New Pages
1. Create new component in `/src/components/`
2. Add to pages array in `App.tsx`
3. Update navigation components if needed
4. Add corresponding route for detail pages if applicable

### Styling Guidelines
- Use existing CSS classes from WordPress theme when possible
- Add React-specific overrides to `custom-styles.css`
- Maintain consistency with original design system

### Performance Considerations
- Use React's built-in optimizations (memo, useCallback, etc.)
- Leverage CSS transforms for animations
- Preload critical images and assets
- Minimize re-renders in mouse tracking components
- Use CSS custom properties for dynamic theming
- Implement proper error boundaries and fallback states

## Troubleshooting

### Port Conflicts
- Dev server runs on port 5173
- Scripts automatically kill existing Vite processes
- Use `pkill -f vite` to manually stop servers

### Build Issues
- Ensure Node.js 20+ is installed
- Run `npm install` in mockup-react directory
- Check TypeScript errors before building
- Verify all assets are in public directory

### Git Automation
- Auto-commit pushes to origin/main branch
- Ensure proper git permissions
- Manual git workflow always available as fallback

### Common Issues
- **Detail Page Not Found**: Check route configuration in App.tsx
- **Mouse Lag**: Verify `requestAnimationFrame` implementation
- **Style Conflicts**: Check both main.css and component-level styles
- **Asset Loading**: Verify all paths use `/assets/` prefix