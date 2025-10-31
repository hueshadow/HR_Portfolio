## Context
The system has two parallel project data sources:
- Portfolio Manager (src/data/portfolio.ts) - Hardcoded 4 projects + localStorage
- Admin System (src/dataProvider.ts) - Pure localStorage-based projects

Users see different project lists depending on which system they interact with, creating data inconsistency.

## Goals / Non-Goals
- Goals: Sync all existing portfolio projects to admin system for unified management
- Goals: Preserve all project data including images, descriptions, metadata
- Goals: Maintain backward compatibility during transition
- Non-Goals: Modify existing portfolio display logic initially
- Non-Goals: Change admin system data structure

## Decisions
- Decision: Create sync utility that transforms PortfolioItem → Project format
- Decision: Use admin system as source of truth after migration
- Decision: Preserve existing portfolio IDs and timestamps
- Decision: Handle field mapping (technologies → tags, projectDate → date)
- Alternatives considered: Manual data entry (error-prone), database migration (overkill)

## Data Structure Mapping
```typescript
// PortfolioItem → Project mapping
{
  id: number          → id: string (number → string)
  title              → title
  description        → description
  category           → category
  projectDate        → date
  featured           → featured
  projectUrl         → projectUrl
  githubUrl          → githubUrl
  image              → image
  thumb              → thumb
  technologies       → tags (array → string)
  createdAt          → createdAt
  updatedAt          → updatedAt
}
```

## Migration Plan
1. Create sync utility with data transformation logic
2. Add sync button to admin dashboard
3. Validate data integrity after transformation
4. Update portfolio manager to read from admin data
5. Remove duplicate data after successful sync

## Open Questions
- Should we preserve the original portfolio data structure for backward compatibility?
- How should we handle duplicate projects (same title/description)?
- Should the sync be automatic on first admin login or manual?