# Project Documentation Rules (Non-Obvious Only)

## Project Structure Misconceptions
- `src/` contains the React app, not source files for the WordPress theme
- WordPress theme is in `mockup/`, React recreation is in `mockup-react/`
- External JS libraries are loaded via HTML script tags, not npm packages
- CSS files have complex override hierarchy with `!important` flags

## Hidden Dependencies
- React version reuses WordPress theme's CSS, JS, and image assets
- Background image URL is hardcoded: `https://photosave.net/2025/09/fa0d5a10405bfab5931f038d97c545e6.png`
- Font loading order affects layout calculations and animations
- Mouse tracking requires specific mobile detection regex pattern

## Animation System Complexity
- Text scramble uses 20ms intervals with 0.5 character progression
- Skill bars animate with 250ms staggered delays per element
- Portfolio caption animations have 250ms hover delay before triggering
- CSS variables `--x`, `--y`, `--size` are dynamically updated during hover

## Layout Architecture
- Desktop accordion: inactive pages = 80px, active page = `calc(100% - 320px)`
- Mobile switches to vertical scroll at 960px breakpoint
- Page activation controlled by React state, not just CSS classes
- Detail pages (`/portfolio/:id`, `/blog/:id`) bypass accordion system

## Performance Considerations
- Mouse trailer uses `requestAnimationFrame` for 60fps performance
- Transform properties use GPU acceleration (`translate3d()`)
- Background image preloading delays content display by 250ms
- Passive event listeners required for mousemove events

## Build System Quirks
- Custom automation scripts in root: `auto-dev.sh`, `auto-commit.sh`, `auto-preview.sh`
- Netlify builds from `mockup-react/` directory, not root
- TypeScript uses project references with separate configs
- Vite config is minimal - only React plugin configured

## WordPress Integration
- Theme requires 8 specific plugins including Elementor
- Custom post types for portfolio and blog functionality
- Asset paths assume shared directory structure between WordPress and React
- PHP functions handle plugin registration and theme setup