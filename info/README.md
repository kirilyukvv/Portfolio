# Info

Content/source version of the site. Mirrors the live structure but in plain markdown so it is easy to write, edit, and keep alongside reference images.

Use this folder to:

- Draft and store the canonical text for every page on the site
- Collect raw and final pictures for each project
- Keep notes, briefs, and references that should not ship in HTML

The live site (`index.html`, `cv.html`, `projects/*.html`, `assets/*`) is built from this folder. **`info.md` is the source of truth** — the HTML is the published copy.

## Sync with the live site

Whenever you change an `info.md`, **update the connected web page in the same edit** so the site stays in sync. Do not leave info and HTML diverged.

| Info source | Live page |
|-------------|-----------|
| [`home/info.md`](home/info.md) | [`index.html`](../index.html) |
| [`cv/info.md`](cv/info.md) | [`cv.html`](../cv.html) |
| [`projects/<slug>/info.md`](projects/) | [`projects/<slug>.html`](../projects/) |

For projects, the slug in the `info.md` header (and in [`projects/README.md`](projects/README.md)) must match the HTML filename. Each project `info.md` links to its page at the top — e.g. `projects/campaign-creation.html` ← `info/projects/Touch — Campaign creation/info.md`.

**What to port when info changes:**

- **Text** — title, meta line, lead, snapshot rows, narrative sections, captions → matching blocks in the HTML page.
- **Images** — new or replaced screenshots in the project folder → copy/export to `assets/projects/<slug>/` (and card `@1x` / `@2x` if the hero or home card changed).
- **Home grid** — if title, domain, or card blurb changed, update the matching project card in `index.html` (source row in [`home/info.md`](home/info.md)).

## Convention

**Every page is a folder. Every folder has an `info.md`.**

The `info.md` holds all the text that will appear on the page. Pictures, notes, references, and drafts live next to it in the same folder.

## Structure

```text
info/
├── README.md                  ← you are here
├── home/
│   └── info.md                ← text for index.html (hero + project grid)
├── cv/
│   └── info.md                ← clean markdown CV (source for cv.html)
└── projects/
    ├── README.md              ← index of all projects
    └── <project-slug>/
        ├── info.md            ← all the text that will be on the project page
        ├── <slug>.png         ← pictures live next to info.md
        ├── <slug>@2x.png
        └── notes.md           ← optional: extra notes, briefs, drafts
```

## Adding a new project

1. Create `info/projects/<slug>/` (slug matches the eventual HTML filename, e.g. `touch-content-production`).
2. Copy the structure from [`../project-page-structure.md`](../project-page-structure.md) into a new `info.md` inside that folder and fill it in.
3. Drop pictures into the same folder. Keep `@1x` and `@2x` versions next to each other.
4. Add a row in [`projects/README.md`](projects/README.md).
5. Add a row to [`home/info.md`](home/info.md) so the card shows up on the home grid.
6. When ready to ship, create `projects/<slug>.html` and the matching `assets/projects/<slug>*.png` from this source.

## Conventions

- One `info.md` per page folder (not `README.md`) — it represents page text, not folder docs.
- Folder and file names use kebab-case and match the project slug.
- Images: PNG for UI screenshots; keep `<slug>.png` and `<slug>@2x.png` (same pair the HTML cards reference).
- Cross-link with relative paths so the folder also reads cleanly on disk.
