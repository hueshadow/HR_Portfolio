# Flow cover contract

Two writers must not share a path.

| Writer | Owns | Must not touch |
| --- | --- | --- |
| Grok Bot (News flow) | `briefings.ts` text: date, title, tldr, why, sources, todos | `image` fields, `public/assets/flow/`, `public/assets/flow-og/`, `coverOverrides.ts` |
| Cover pipeline (this script / GitHub Action / Hermes) | `public/assets/flow-og/` + `coverOverrides.ts` | briefing prose |

Product UI (`resolveCover`) reads the overlay only.

- Intel: source `og:image` / `twitter:image`, hosted locally
- Taste / interviews: same if the source has OG; otherwise no thumb (no dark title cards)
- Todos: never
- Existing overlay files are never overwritten
