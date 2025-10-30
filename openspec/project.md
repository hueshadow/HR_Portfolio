# HR Portfolio Project

Personal portfolio website showcasing professional work, skills, and experience with parallel WordPress and React implementations.

## Purpose

Create a modern, interactive personal portfolio website that demonstrates professional capabilities through innovative design and technical implementation. The project serves as both a portfolio piece and a platform for showcasing web development skills.

## Tech Stack

### Primary Implementation (React)
- **Framework**: React 19.1.1 with TypeScript 5.8.3
- **Build Tool**: Vite 4.5+ with React plugin
- **Routing**: React Router DOM 7.9.1
- **Styling**: CSS with custom properties, Font Awesome icons
- **Admin Panel**: React Admin 5.11.4 with Material-UI components
- **Data Storage**: localStorage for projects and authentication

### Legacy Implementation (WordPress)
- **Platform**: WordPress with custom theme
- **Plugins**: Elementor and 7 additional plugins
- **Styling**: Custom CSS with shared assets

### Development Environment
- **TypeScript**: Strict mode with ES2022 target
- **ESLint**: Modern flat config with React hooks and refresh rules
- **Node Version**: 20+ (required for Netlify deployment)
- **Package Manager**: npm with custom script automation

## Project Conventions

### Code Style
- **TypeScript**: Strict mode enabled, comprehensive type coverage
- **Components**: Functional components with hooks, PascalCase naming
- **Files**: kebab-case for utilities, camelCase for variables
- **CSS**: BEM methodology with kebab-case classes
- **Constants**: UPPER_SNAKE_CASE

### Architecture Patterns
- **Accordion Layout**: Horizontal accordion with 80px collapsed pages
- **Mobile Responsive**: Vertical scroll layout below 960px breakpoint
- **Component-First**: Modular, reusable components with single responsibility
- **Performance-First**: 60fps animations, GPU acceleration, optimized loading

### Testing Strategy
- **Unit Tests**: Component testing for critical functionality
- **Integration Tests**: User workflow validation
- **Performance Testing**: Animation smoothness and load times
- **Cross-Browser**: Compatibility across modern browsers

### Git Workflow
- **Main Branch**: Direct commits to main branch
- **Auto-Commit**: Automated commits after task completion
- **Automation**: `./auto-commit.sh` for commit and push workflow
- **Conventional Commits**: `type: description` format

## Domain Context

### Portfolio Website Requirements
- **Professional Presentation**: Showcase work, skills, and experience
- **Interactive Design**: Mouse tracking, animations, and micro-interactions
- **Content Management**: Admin panel for portfolio project management
- **Mobile Optimization**: Touch-friendly interactions and responsive design

### User Experience Goals
- **Visual Impact**: Memorable first impression with unique accordion layout
- **Smooth Interactions**: 60fps animations and transitions
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Fast loading and smooth operation

## Important Constraints

### Technical Constraints
- **No External APIs**: All functionality runs client-side
- **Browser Compatibility**: Modern browsers with ES2022+ support
- **Asset Limits**: 5MB images, 50MB videos for uploads
- **Storage**: localStorage-based data persistence

### Performance Requirements
- **Animation Target**: 60fps for all animations
- **Mobile Performance**: Touch-optimized with reduced motion support
- **Load Performance**: Optimized asset loading and caching

### Design Constraints
- **WordPress Parity**: Maintain visual consistency with original theme
- **Shared Assets**: Reuse CSS, JS, and images from WordPress version
- **Responsive Design**: Desktop and mobile layouts

## External Dependencies

### Development Dependencies
- **Vite**: Build tool and development server
- **ESLint**: Code quality and formatting
- **TypeScript**: Type safety and development experience

### Runtime Dependencies
- **React**: UI framework and component model
- **React Router**: Client-side routing
- **React Admin**: Admin panel framework
- **Font Awesome**: Icon system

### Deployment Dependencies
- **Netlify**: Hosting and continuous deployment
- **Node.js 20+**: Build environment requirement
- **Git**: Version control and deployment
