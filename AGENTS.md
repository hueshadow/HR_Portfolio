# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Project Overview

This is a portfolio website project with two implementations:
- **WordPress Theme** (`mockup/`) - Original HueShadow WordPress theme
- **React Version** (`mockup-react/`) - React + TypeScript recreation of the WordPress theme

## Non-Obvious Build Commands

### React Version (mockup-react/)
```bash
# Custom automation scripts (run from project root)
./auto-dev.sh      # Auto-commit + start preview server
./auto-commit.sh   # Git add all, commit with auto-generated message, push
./auto-preview.sh  # Kill existing vite, start new dev server on :5173

# Standard commands (run from mockup-react/ directory)
npm run dev        # Standard Vite dev server
npm run build      # TypeScript check + Vite build
npm run preview    # Vite preview server
```

### Deployment
- **Netlify**: Configured via `netlify.toml` - builds from `mockup-react/` directory
- **SPA Routing**: All routes redirect to `index.html` for React Router

## Critical Non-Obvious Patterns

### Mouse Tracking System
- **MouseTrailer Component**: Complex mouse tracking with viewport constraints
  - Mouse position limited to content area boundaries on homepage
  - Background parallax effect with `movementStrength = 370`
  - Uses `requestAnimationFrame` for 60fps performance
  - Mobile detection disables tracking entirely

### Accordion Layout Architecture
- **Desktop**: 80px inactive pages, active page = `calc(100% - 320px)`
- **Mobile**: Switches to vertical scroll layout, all pages visible
- **Page Activation**: Controlled by `activePageId` state, not CSS classes alone
- **Detail Pages**: Portfolio/Blog detail routes hide accordion layout completely

### Animation System
- **Custom Hooks**: `useAnimations.ts` contains specialized animation logic
  - `useSkillBarAnimation`: Staggered skill bar reveals with 250ms delays
  - `useHeadingAnimation`: Text scramble effect using random letter cycling
  - `usePortfolioCaptionAnimation`: Hover-triggered caption text animation
- **CSS Variables**: Dynamic mouse position updates `--x`, `--y`, `--size` on h1 elements

### Performance Optimizations
- **Image Preloading**: Background image preloaded before showing content
- **Transform vs Position**: Mouse trailer uses `transform: translate3d()` for GPU acceleration
- **Passive Event Listeners**: Mouse events use `{ passive: true }` for scroll performance

### WordPress Theme Integration
- **Asset Sharing**: React version reuses WordPress theme's CSS, JS, and image assets
- **Plugin Dependencies**: WordPress theme requires 8 specific plugins including Elementor
- **Custom Post Types**: Portfolio and blog functionality built into WordPress theme

## Critical File Locations
- **Main Styles**: `mockup-react/src/components/custom-styles.css` (overrides and React-specific styles)
- **Mouse Tracking**: `mockup-react/src/components/MouseTrailer.tsx`
- **Animation Hooks**: `mockup-react/src/hooks/useAnimations.ts`
- **Build Config**: `mockup-react/vite.config.ts` (minimal React plugin only)
- **WordPress Functions**: `mockup/functions.php` (theme setup and plugin requirements)

## Environment Requirements
- **Node.js**: Version 20 (specified in netlify.toml)
- **TypeScript**: Uses project references with separate configs for app/node
- **Vite**: Version 4.5+ with React plugin
- **External Dependencies**: jQuery, Magnific Popup, Shuffle.js, Tiny Slider imported via HTML