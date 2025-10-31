## Why
The portfolio page displays 4 projects from the hardcoded portfolio manager, while the admin system shows 2 different projects from localStorage. This creates a data synchronization gap where the frontend and backend show different project lists, making content management inconsistent.

## What Changes
- Create data synchronization utility to migrate portfolio manager data to admin system
- Transform portfolio data structure to match admin Project interface
- Add one-time sync functionality to bridge existing portfolio data
- Ensure future portfolio updates flow through admin system

## Impact
- Affected specs: portfolio-management, admin-system
- Affected code: src/data/portfolio.ts, src/dataProvider.ts, new sync utility
- **BREAKING**: Portfolio manager will delegate to admin system data after sync