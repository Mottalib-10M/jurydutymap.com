# Adding or editing a page

One page = one file `src/content/pages/<id>.ts` exporting `definePage({...})` (types in `src/lib/guide-types.ts`).
The file name must equal `id`, and the id must be listed in `PLANNED` (`src/lib/helpers.ts`). The page is built at
`/en/<en.slug>/`; menus, footer, home lists, llms.txt and sitemap follow. English only (en-US spelling).

State pages are not files: one page per entry of `src/data/states.json` (50 states, DC, federal courts), rendered by
`src/components/StatePage.astro` with the handwritten notes of `src/content/state-notes.ts`. Link one with `h.st('CA')`
or the id `st-CA`.

## Fields

- `group`: `pay`, `excuse`, `serve` or `states`; `order`: position in its group.
- `tool`: the main tool, right under the H1 (first screen, RECETTE §5): `pay`, `excuse`, `compare`, `scam`, `checklist`,
  `letter`, or `mini:<spec>` (specs in `src/lib/mini-specs.ts`, always computed by `src/lib/engine/jury.ts`).
- `mini`: a second tool under the citable block. In a body, `<!--tool:mini:employer-->` places one.
- `related`: 3 to 5 page ids, `st-<code>` or `home`. `sources`: keys of `src/data/params-2026.json` → `sources`.

## Data

- `src/data/states.json`: every rule with `law`, `src` (official page) and the reading date. Unknown = `null`, shown as
  "not specified by the state". Never fill a gap from a legal database, a law firm or a news story (RECETTE §12.1).

## Text rules (checked by `npx vitest run`, then `npm run check`)

- `title` 50 to 60 characters, key term first, never a question word, a country or "Calculator" first.
  `description` 150 to 160 characters.
- `resume(h)`: ONE paragraph of at least 120 words answering the page's query with figures read through `h`.
- `faqs(h)`: 3 to 5 questions unique across the site, answers 40 to 90 words, plain text.
- `body(h)`: HTML with at least three `<h2>`. No `<h1>`, no em dash.
- Never help anyone mislead a court or dodge a summons: only grounds the law provides. Never present the site as a court.
