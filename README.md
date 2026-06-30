# Portfolio

Personal portfolio site for **Vladimir Kirilyuk** — Product Design Lead.

Hosted on [GitHub Pages](https://pages.github.com/). Live site: [kirilyukvv.github.io/Portfolio](https://kirilyukvv.github.io/Portfolio/)

## About

Static site showcasing selected product design work, case studies, and a CV. Built with plain HTML and CSS. A tiny `build.mjs` injects shared snippets (e.g. analytics) into every page.

## Structure

| Path | Description |
|------|-------------|
| `index.html` | Home — intro and project grid |
| `cv.html` | CV |
| `projects/` | Case study pages |
| `assets/` | Images and media |
| `styles.css` | Shared styles |
| `js/analytics.js` | Google Analytics / Tag Manager code (single edit point) |
| `partials/head-analytics.html` | Loader snippet injected into every page by the build |
| `build.mjs` | Injects shared head snippets into all HTML files |

## Analytics

1. Edit **`js/analytics.js`** when the measurement ID or gtag/GTM logic changes.
2. Edit **`partials/head-analytics.html`** only if the loader itself needs to change.
3. Run `node build.mjs` — it updates every `.html` file automatically. New pages only need the standard `<head>` block; the build adds analytics if it is missing.

On push to `main`, GitHub Actions runs the same build and commits updated HTML when needed.

## Local preview

Serve the repo root with any static file server, for example:

```bash
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

## License

All case study content and visuals belong to their respective clients and employers unless stated otherwise on the case page.
