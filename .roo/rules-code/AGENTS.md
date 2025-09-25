# Project Coding Rules (Non-Obvious Only)

## Mouse Tracking Implementation
- Mouse position constraints are calculated relative to content area boundaries, not viewport
- Homepage background parallax uses `movementStrength = 370` constant - changing this breaks visual effect
- Mobile detection must use `/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)` pattern
- CSS variables `--x`, `--y`, `--size` are dynamically updated on h1 elements during hover

## Animation Timing
- Skill bar animations use 250ms staggered delays (`250 * i` in `useSkillBarAnimation`)
- Text scramble effect runs at 20ms intervals with 0.5 character progression per iteration
- Portfolio caption animations have 250ms hover delay before triggering

## Component State Management
- `activePageId` state controls accordion layout - CSS classes alone don't determine visibility
- Detail pages (`/portfolio/:id`, `/blog/:id`) completely bypass accordion layout system
- Body classes are dynamically managed: `hr-loaded`, `nav-open`, `sidebar-open`, `detail-page`

## Performance Critical Code
- Mouse trailer MUST use `transform: translate3d()` instead of `left/top` for GPU acceleration
- `requestAnimationFrame` loop runs continuously - ensure proper cleanup in useEffect return
- Passive event listeners required: `{ passive: true }` for mousemove events

## CSS Architecture
- Desktop accordion layout: inactive pages = 80px width, active page = `calc(100% - 320px)`
- Mobile breakpoint at 960px switches to vertical scroll layout
- All page titles must be exactly 80px width with vertical text rotation
- Portfolio hover overlay uses 85% transparency default, 75% on hover

## Asset Loading
- Background image must be preloaded before showing content (250ms delay)
- External dependencies loaded via HTML script tags, not npm packages
- Font Awesome, jQuery, Magnific Popup, Shuffle.js, Tiny Slider are external dependencies