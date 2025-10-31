# Reorder Pages to Portfolio First

## Why

The current page ordering places the Home page first, followed by About, then Portfolio. To better showcase the impressive Huawei Cloud project and other portfolio work as the primary content, we need to reorder the pages so that Portfolio appears first. This change prioritizes the core portfolio content and provides immediate access to project showcase, which is typically the primary reason visitors explore a portfolio website.

## Overview

Reorder the accordion layout pages so that the Portfolio page (currently #03) becomes the first page (#01), shifting all other pages down one position while maintaining their relative order and functionality.

## User Story

As a portfolio owner, I want the Portfolio section to appear first so that visitors immediately see my project showcase when they visit the website, improving first impressions and engagement with my core work.

## Context

### Current State
The accordion layout currently displays pages in this order:
1. **Home (#01)** - Introduction and overview
2. **About (#02)** - Personal information and skills
3. **Portfolio (#03)** - Project showcase (contains Huawei Cloud case study)
4. **Blog (#04)** - Articles and thoughts
5. **Contact (#05)** - Contact information and form

### Problem Addressed
- **Portfolio content is buried**: Users must navigate through two other sections before reaching the main project showcase
- **Reduced engagement**: Key project content may not be seen by visitors who don't navigate deeply
- **Poor first impression**: Initial experience focuses on general content rather than impressive work
- **Navigation friction**: Users interested in projects must click multiple times to reach relevant content

### Integration Points
- **App.tsx pages array**: Central configuration for page order and routing
- **Accordion layout CSS**: Position-based animations and transitions
- **Navigation components**: Desktop and mobile navigation systems
- **Animation system**: Timing delays based on page positions
- **Page numbering**: Visual page numbers that need to be updated

### Success Criteria

- Portfolio page appears as the first (#01) page in the accordion
- All other pages shift down one position while maintaining functionality
- Page numbers update correctly (Home → #02, About → #03, etc.)
- Animation timing adjusts appropriately to new page order
- Navigation components reflect the new order correctly
- Mobile and desktop layouts both work correctly
- No existing functionality is broken

## Constraints

- **CSS Position Dependencies**: Animation delays use `:nth-child` selectors based on DOM position
- **Hardcoded Page Numbers**: Each page has manually assigned numbers
- **Width Calculations**: Accordion width calculations assume specific page count
- **Routing Dependencies**: React Router routes may depend on page order
- **WordPress Parity**: Should maintain consistency with original theme structure where applicable

## Dependencies

- **App.tsx pages array**: Central configuration for page ordering
- **Custom styles CSS**: Animation delays and layout calculations
- **Navigation components**: DesktopNav and MobileNav components
- **Animation system**: useAnimations.ts timing configurations
- **Page components**: All existing page components remain unchanged

## Related Work

References existing page configuration and layout systems:
- `accordion-layout` spec for page positioning rules
- Current `App.tsx` pages array configuration
- CSS animation system with position-based delays
- Navigation component implementations

## Out of Scope

- Creating new pages or removing existing ones
- Changing page content or functionality
- Modifying the accordion layout behavior (only order changes)
- Affecting WordPress theme (parallel implementation)
- Changing mobile/desktop breakpoint behavior