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

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website project with two parallel implementations:
- **WordPress Theme** (`mockup/`) - Original HueShadow WordPress theme (legacy)
- **React + TypeScript** (`mockup-react/`) - Modern React recreation (active development)

The React version faithfully recreates the WordPress theme's design and functionality using modern web technologies, including a React Admin dashboard for content management.

## Technology Stack

### Primary Stack (React Implementation)
- **Framework**: React 19.1.1 with TypeScript 5.8.3
- **Build Tool**: Vite 4.5+ with React plugin
- **Bundler**: ES modules with bundler resolution
- **Routing**: React Router DOM 7.9.1
- **Styling**: CSS with custom properties, Font Awesome icons
- **Animations**: Custom CSS animations + JavaScript animations
- **Admin Panel**: React Admin 5.11.4 with Material-UI components
- **Data Storage**: localStorage for projects and authentication

### Development Environment
- **TypeScript**: Strict mode with ES2022 target
- **ESLint**: Modern flat config with React hooks and refresh rules
- **Node Version**: 20+ (required for Netlify deployment)
- **Package Manager**: npm with custom script automation

## Build & Development Commands

### Core Commands (from mockup-react/)
```bash
npm install        # Install dependencies
npm run dev        # Start Vite dev server (finds available port)
npm run build      # TypeScript check + Vite build
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

### Automation Scripts (from project root)
```bash
./auto-dev.sh      # Auto-commit + start preview server
./auto-commit.sh   # Git add all, commit, push to origin/main
./auto-preview.sh  # Kill existing vite, start new dev server
```

### Development Workflow Commands (from mockup-react/)
```bash
npm run auto-dev      # Auto-commit + start preview server
npm run auto-commit   # Git add all, commit, push to origin/main
npm run auto-preview  # Kill existing vite, start new dev server
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

### Automatic Commit Rule
**🤖 Claude's Auto-Commit Rule**: After completing any task or making code changes, automatically run `./auto-commit.sh` to push changes to GitHub. Do not wait for the user to remind you. This ensures all changes are properly tracked and versioned.

## Admin System

### Admin Authentication
- **Default Credentials**: `admin@example.com` / `admin123`
- **Login URL**: `/admin/login`
- **Admin Dashboard**: `/admin`
- **Session Duration**: 24 hours
- **Storage**: localStorage-based authentication

### Admin Features
- **Project Management**: Full CRUD operations for portfolio projects
- **File Upload**: Support for images (5MB max) and videos (50MB max)
- **Base64 Storage**: Files converted to base64 and stored in localStorage
- **Quick Create**: Dialog for rapid project creation
- **Data Validation**: Comprehensive form validation with error handling

### Data Architecture
- **Projects Data Structure**:
  - Basic fields: title, description, category, date, featured
  - Media: image, thumb, video (base64 encoded)
  - Links: projectUrl, githubUrl
  - Metadata: tags, createdAt, updatedAt
- **Storage**: All data stored in localStorage under keys like `projectsData`
- **Provider**: Custom localStorageDataProvider for React Admin

## Key Development Patterns

### 1. Accordion Layout Architecture
- **Desktop**: Horizontal accordion with 80px collapsed pages
- **Mobile**: Vertical scroll layout below 960px breakpoint
- **State Management**: `activePageId` controls which page is expanded
- **Detail Pages**: Portfolio/Blog detail pages hide accordion completely
- **Admin Pages**: Admin routes use separate layout with `ReactAdminDashboard`

### 2. Mouse Tracking System
- **Component**: `MouseTrailer.tsx` provides complex mouse tracking
- **Constraints**: Mouse position limited to content area boundaries
- **Performance**: Uses `requestAnimationFrame` for 60fps tracking
- **Mobile**: Automatically disabled on mobile devices
- **Background Effect**: Parallax movement with `movementStrength = 370`

### 3. Animation System
- **Custom Hooks**: `useAnimations.ts` contains specialized animation logic
  - `useSkillBarAnimation`: Staggered reveals with 250ms delays
  - `useHeadingAnimation`: Text scramble effect with letter cycling
  - `usePortfolioCaptionAnimation`: Hover-triggered captions
- **CSS Variables**: Dynamic mouse position updates `--x`, `--y`, `--size`

### 4. Detail Page Architecture
- **Routing**: React Router handles detail pages with dynamic routes
  - Portfolio details: `/portfolio/:id`
  - Blog details: `/blog/:id`
- **Fallback States**: Default pages for missing content
- **Conditional Rendering**: Detail pages hide accordion layout
- **Navigation**: Back navigation to parent pages

### 5. CSS Custom Property System
- **Dynamic Backgrounds**: `--page-bg-color` controls page backgrounds
- **Mouse Position**: `--x`, `--y`, `--size` for interactive effects
- **Theme Variables**: `--px-theme-clr` and `--px-theme-bg` for consistent theming
- **Runtime Updates**: JavaScript can update CSS variables dynamically

### 6. Admin System Architecture
- **Authentication**: localStorage-based with 24-hour sessions
- **Authorization**: React Admin authProvider with permission system
- **Data Management**: localStorageDataProvider for full CRUD operations
- **File Handling**: Base64 conversion with size validation
- **UI Components**: Material-UI based admin interface

## Critical Architecture Patterns

### 1. Accordion Layout System
- **Desktop Layout**: Horizontal accordion with 80px collapsed pages
- **Mobile Layout**: Vertical scroll layout below 960px breakpoint
- **State Management**: Single `activePageId` state controls page expansion
- **Detail Pages**: Portfolio/Blog detail pages completely hide accordion layout
- **Performance**: Components lazy-load based on active page state

### 2. Mouse Tracking & Animation System
- **Component**: `MouseTrailer.tsx` provides complex 60fps mouse tracking
- **Constraints**: Mouse position limited to content area boundaries
- **Performance**: Uses `requestAnimationFrame` and GPU acceleration
- **Mobile**: Automatically disabled on mobile devices
- **CSS Variables**: Real-time updates to `--x`, `--y`, `--size` for effects
- **Background Parallax**: Movement strength of 370 pixels

### 3. Animation Architecture
- **Custom Hooks**: `useAnimations.ts` contains specialized animation logic
  - `useSkillBarAnimation`: Staggered reveals with 250ms delays
  - `useHeadingAnimation`: Text scramble effect with letter cycling
  - `usePortfolioCaptionAnimation`: Hover-triggered captions
- **Performance**: CSS transforms and GPU acceleration for smooth animations

### 4. Detail Page Routing
- **Routing**: React Router handles dynamic routes with fallback states
  - Portfolio details: `/portfolio/:id`
  - Blog details: `/blog/:id`
- **Conditional Rendering**: Detail pages hide accordion completely
- **Navigation**: Back navigation to parent pages with proper state management

### 5. CSS Custom Property System
- **Dynamic Backgrounds**: `--page-bg-color` controls page backgrounds
- **Mouse Position**: `--x`, `--y`, `--size` for interactive effects
- **Theme Variables**: `--px-theme-clr` and `--px-theme-bg` for consistent theming
- **Runtime Updates**: JavaScript can update CSS variables dynamically

### 6. Admin System Architecture
- **Authentication**: localStorage-based with 24-hour session timeout
- **Authorization**: React Admin authProvider with role-based permissions
- **Data Management**: localStorageDataProvider with full CRUD operations
- **File Storage**: Base64 encoding for images and videos with size limits
- **UI Framework**: Material-UI components with custom theming

## Critical Files & Components

### Core Architecture Files
- `/Users/hueshadow/Documents/GitHub/HR_Portfolio/mockup-react/src/App.tsx` - Main routing and layout
- `/Users/hueshadow/Documents/GitHub/HR_Portfolio/mockup-react/src/components/MouseTrailer.tsx` - Mouse tracking system
- `/Users/hueshadow/Documents/GitHub/HR_Portfolio/mockup-react/src/hooks/useAnimations.ts` - Animation hooks
- `/Users/hueshadow/Documents/GitHub/HR_Portfolio/mockup-react/src/components/PortfolioDetailPage.tsx` - Detail page implementation
- `/Users/hueshadow/Documents/GitHub/HR_Portfolio/mockup-react/src/components/PortfolioFilter.tsx` - Portfolio filtering system

### Admin System Files
- `/Users/hueshadow/Documents/GitHub/HR_Portfolio/mockup-react/src/components/ReactAdminDashboard.tsx` - Admin dashboard
- `/Users/hueshadow/Documents/GitHub/HR_Portfolio/mockup-react/src/authProvider.ts` - Authentication provider
- `/Users/hueshadow/Documents/GitHub/HR_Portfolio/mockup-react/src/dataProvider.ts` - Data management provider
- `/Users/hueshadow/Documents/GitHub/HR_Portfolio/mockup-react/src/utils/fileUtils.ts` - File handling utilities

### Configuration Files
- `/Users/hueshadow/Documents/GitHub/HR_Portfolio/mockup-react/vite.config.ts` - Vite configuration
- `/Users/hueshadow/Documents/GitHub/HR_Portfolio/mockup-react/tsconfig.app.json` - TypeScript config
- `/Users/hueshadow/Documents/GitHub/HR_Portfolio/mockup-react/eslint.config.js` - ESLint config
- `/Users/hueshadow/Documents/GitHub/HR_Portfolio/netlify.toml` - Deployment config

### Styling & Assets
- `/Users/hueshadow/Documents/GitHub/HR_Portfolio/mockup-react/src/components/custom-styles.css` - React-specific overrides
- `/Users/hueshadow/Documents/GitHub/HR_Portfolio/mockup-react/public/assets/` - Shared static assets

## Configuration Files

### TypeScript Configuration
- **Target**: ES2022 with strict mode enabled
- **Module Resolution**: Bundler mode with ESNext modules
- **Linting**: No unused locals/parameters, no unchecked side effects
- **JSX**: React JSX transform with TypeScript support

### ESLint Configuration
- **Config Style**: Modern flat config (not legacy .eslintrc)
- **Rules**: React hooks, react-refresh, TypeScript ESLint
- **Globals**: Browser environment with ES2020 support
- **Ignores**: dist/ build directory

### Vite Configuration
- **Plugin**: @vitejs/plugin-react for React support
- **Server**: Default development server on port 5173
- **Build**: Optimized production build with ES modules

### Netlify Deployment
- **Build Command**: `cd mockup-react && npm install && npx vite build`
- **Publish Directory**: `mockup-react/dist`
- **Node Version**: 20
- **SPA Routing**: All routes redirect to `index.html`

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

### Admin System Features
- Full CRUD operations for portfolio projects
- File upload with size validation (5MB images, 50MB videos)
- Base64 encoding for local storage
- Role-based access control
- Session management with 24-hour timeout

## Common Development Tasks

### Adding New Pages
1. Create new component in `/src/components/`
2. Add to pages array in `App.tsx`
3. Update navigation components if needed
4. Add corresponding route for detail pages if applicable

### Enabling Scroll for Accordion Pages
To enable vertical scrolling on a page in the accordion layout (e.g., Portfolio, Blog):

**1. Add CSS to `custom-styles.css`:**
```css
.page#<page-id> .content {
  overflow-y: auto !important;
  max-height: calc(100vh - 80px) !important;
  padding-right: 10px !important;
}

/* Custom scrollbar styles */
.page#<page-id> .content::-webkit-scrollbar {
  width: 6px;
}
.page#<page-id> .content::-webkit-scrollbar-thumb {
  background: var(--px-theme-clr);
  border-radius: 3px;
}
```

**2. Add padding to page header in component:**
```jsx
<div className="page-header c12" style={{ paddingBottom: '40px' }}>
```

### Styling Guidelines
- Use existing CSS classes from WordPress theme when possible
- Add React-specific overrides to `custom-styles.css`
- Maintain consistency with original design system
- Leverage CSS custom properties for dynamic theming

### Admin Development
- Use React Admin components and patterns
- Implement proper validation in forms
- Handle file uploads with size validation
- Store data using localStorageDataProvider patterns
- Implement proper error handling and user feedback

### Performance Considerations
- Use React's built-in optimizations (memo, useCallback, etc.)
- Leverage CSS transforms for animations over JavaScript
- Preload critical images and assets
- Minimize re-renders in mouse tracking components
- Use CSS custom properties for dynamic theming
- Implement proper error boundaries and fallback states

## Troubleshooting

### Port Conflicts
- Dev server automatically finds available port (starts at 5173)
- Scripts automatically kill existing Vite processes
- Use `pkill -f vite` to manually stop servers

### Build Issues
- Ensure Node.js 20+ is installed
- Run `npm install` in mockup-react directory
- Check TypeScript errors before building (strict mode enabled)
- Verify all assets are in public directory

### Git Automation
- Auto-commit pushes to origin/main branch
- Scripts generate commit messages like "feat: update X files"
- Ensure proper git permissions
- Manual git workflow always available as fallback

### Admin System Issues
- **Login Problems**: Check localStorage auth data and session timeout
- **Data Persistence**: Verify localStorage is enabled and not cleared
- **File Upload Issues**: Check file size limits and base64 conversion
- **Routing Issues**: Verify React Router configuration and admin routes

### Common Issues
- **Detail Page Not Found**: Check route configuration in App.tsx
- **Mouse Lag**: Verify `requestAnimationFrame` implementation
- **Style Conflicts**: Check both main.css and component-level styles
- **Asset Loading**: Verify all paths use `/assets/` prefix
- **TypeScript Errors**: Strict mode may require additional type annotations
- **Admin Access**: Verify authentication state and localStorage data