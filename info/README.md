# Info

Content/source version of the site. Mirrors the live structure but in plain markdown so it is easy to write, edit, and keep alongside reference images.

Use this folder to:

- Draft and store the canonical text for every page on the site
- Collect raw and final pictures for each project
- Keep notes, briefs, and references that should not ship in HTML

The live site (`index.html`, `cv.html`, `projects/*.html`, `assets/*`) is generated/maintained separately. When the info changes here, port the relevant bits into the HTML.

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

1. Create `info/projects/<slug>/` (slug matches the eventual HTML filename, e.g. `transfers-abroad`).
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
