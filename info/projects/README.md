# Projects

Index of every case study. Each project lives in its own folder with an `info.md` (the page text) and its pictures.

Template used for each per-project `info.md`: [`../../project-page-structure.md`](../../project-page-structure.md).

## Info ↔ live page

Each project folder is paired with one case study HTML file. **If you edit a project's `info.md`, update that HTML page (and `index.html` if the card text changed) in the same pass** — see [sync rules in `../README.md`](../README.md#sync-with-the-live-site).

| Slug | `info.md` | Live page |
|------|-----------|-----------|
| `touch-campaign-flow` | [`project-1 Campaign/info.md`](project-1%20Campaign/info.md) | [`../../projects/touch-campaign-flow.html`](../../projects/touch-campaign-flow.html) |
| `transfers-abroad` | [`transfers-abroad/info.md`](transfers-abroad/info.md) | [`../../projects/transfers-abroad.html`](../../projects/transfers-abroad.html) |

## Live projects

| Slug | Title | Client / Domain | Status | Folder |
|------|-------|------------------|--------|--------|
| `touch-campaign-flow` | Touch — Campaign Creation Flow | Tinkoff · FinTech · Marketing automation | Shipped (2022–Present) | [`project-1 Campaign/`](project-1%20Campaign/) |
| `transfers-abroad` | Transfers to other countries | Tinkoff · FinTech · In-app marketing | Shipped (2024–2025) | [`transfers-abroad/`](transfers-abroad/) |

## Blank slots

Empty placeholder folders ready to be filled in. Each contains a generic `info.md` template — no client, no domain, no lead pre-filled. Rename the folder to your real slug when you start a project.

| Slot | Folder |
|------|--------|
| 1 | [`project-1/`](project-1/) |
| 2 | [`project-2/`](project-2/) |
| 3 | [`project-3/`](project-3/) |
| 4 | [`project-4/`](project-4/) |
| 5 | [`project-5/`](project-5/) |

Promote a slot to **Live projects** once you've renamed the folder, written the `info.md`, dropped in pictures, and shipped the HTML page at `projects/<slug>.html`.

## Backlog ideas

Themes from [`../../ideas.md`](../../ideas.md) that may become projects or site-wide features (team avatars, manager experience page, etc.) — add a folder here when one becomes a real case.

## How to add a project

1. Pick a slug (kebab-case, matches future `projects/<slug>.html`).
2. `mkdir info/projects/<slug>` and drop in:
   - `info.md` — copy the structure from [`../../project-page-structure.md`](../../project-page-structure.md) (or any existing project's `info.md` as a starting point).
   - `<slug>.png` and `<slug>@2x.png` — the same images the home card and the case page will use.
   - Optional: `notes.md`, `brief.md`, extra screenshots and references.
3. Add a row in the **Blank / drafts** table above.
4. Add a row to [`../home/info.md`](../home/info.md) project grid so it shows on the home page.
5. When the case is shipped, move the row to **Live projects** and add a row to the **Info ↔ live page** table above.
6. Keep `info.md` and `projects/<slug>.html` in sync on every content change — the info file is canonical.
