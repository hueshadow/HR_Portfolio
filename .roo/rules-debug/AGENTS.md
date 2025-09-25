# Project Debug Rules (Non-Obvious Only)

## Mouse Tracking Issues
- Mouse trailer position calculations fail if `movementStrength` constant is changed from 370
- Mobile detection regex must match exactly: `/Android|webOS|iPhone|iPad|iPod|BlackBerry/i`
- Background parallax breaks if window resize events aren't handled properly
- Content boundary constraints only apply when home page is active

## Animation Debugging
- Text scramble animations use 20ms intervals - too fast causes performance issues
- Skill bar animations require `isVisible()` check before triggering
- Portfolio caption animations have 250ms delay - check hover state timing
- CSS transitions on page headers have staggered delays (0.1s increments)

## Layout Issues
- Accordion layout breaks if inactive page width != 80px exactly
- Active page width must be `calc(100% - 320px)` for 5-page layout
- Mobile breakpoint at 960px - test both sides of boundary
- Detail pages bypass accordion system completely

## Performance Bottlenecks
- `requestAnimationFrame` loop runs continuously - memory leak if not cleaned up
- Mouse move events use passive listeners - don't call preventDefault()
- Background image preloading delays content display by 250ms
- Transform calculations should use GPU-accelerated properties only

## State Management Gotchas
- `activePageId` controls visibility, not CSS classes alone
- Body class management is critical: `hr-loaded`, `nav-open`, `sidebar-open`, `detail-page`
- Detail page detection must check both `/portfolio/` and `/blog/` paths
- Page activation triggers scroll-to-top on mobile only

## CSS Specificity Wars
- Custom styles use `!important` extensively - overrides are difficult
- Page-specific selectors have high specificity (e.g., `.page#portfolio`)
- Mobile styles override desktop styles with `!important` flags
- Animation classes are added/removed by JavaScript, not CSS

## External Dependency Issues
- jQuery, Magnific Popup, Shuffle.js loaded via HTML script tags
- Type definitions may not match actual library versions
- CSS conflicts between main.css and custom-styles.css
- Font loading order affects layout calculations