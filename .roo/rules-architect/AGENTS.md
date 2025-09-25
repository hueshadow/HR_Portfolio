# Project Architecture Rules (Non-Obvious Only)

## Dual Implementation Strategy
- **WordPress Theme** (`mockup/`) serves as the canonical reference
- **React Recreation** (`mockup-react/`) must maintain pixel-perfect fidelity
- Asset sharing between implementations requires careful path management
- CSS overrides in `custom-styles.css` must respect original theme hierarchy

## Accordion Layout Constraints
- **Desktop**: Mathematical precision required - inactive pages = 80px, active = `calc(100% - 320px)`
- **Mobile**: 960px breakpoint triggers complete layout transformation
- **State Management**: React state controls visibility, CSS handles presentation
- **Detail Pages**: Portfolio/Blog routes bypass accordion system entirely

## Mouse Tracking Architecture
- **Performance Critical**: Uses `requestAnimationFrame` with continuous animation loop
- **Viewport Constraints**: Mouse position limited to content boundaries, not viewport
- **GPU Acceleration**: Transform properties use `translate3d()` exclusively
- **Mobile Detection**: Hardcoded regex pattern disables tracking on mobile devices

## Animation System Design
- **Custom Hooks**: Centralized animation logic in `useAnimations.ts`
- **Timing Precision**: 20ms intervals for text scramble, 250ms delays for skill bars
- **CSS Variables**: Dynamic updates to `--x`, `--y`, `--size` during hover states
- **Performance**: Passive event listeners prevent scroll blocking

## Asset Management Strategy
- **External Dependencies**: jQuery, Magnific Popup, Shuffle.js loaded via HTML scripts
- **Background Preloading**: 250ms delay ensures smooth content reveal
- **Font Loading**: Google Fonts preconnect affects layout calculations
- **Image Assets**: Shared between WordPress and React implementations

## Build System Architecture
- **Automation Scripts**: Custom shell scripts handle development workflow
- **Netlify Integration**: Builds from subdirectory with SPA routing configuration
- **TypeScript Setup**: Project references with separate app/node configurations
- **Vite Configuration**: Minimal setup - only React plugin required

## Responsive Design Philosophy
- **Breakpoint Precision**: 960px threshold triggers fundamental layout changes
- **Mobile-First**: Desktop accordion transforms to vertical scroll layout
- **Performance**: GPU-accelerated transforms maintain 60fps animations
- **State Synchronization**: React state mirrors CSS class changes

## Plugin Integration Requirements
- **WordPress Dependencies**: 8 required plugins including Elementor
- **Asset Path Assumptions**: Shared directory structure between implementations
- **Custom Post Types**: Portfolio and blog functionality built into theme
- **PHP Functions**: Theme setup handles plugin registration automatically