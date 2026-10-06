# Seminar series website

A Jekyll site for a weekly seminar series, built for GitHub Pages.
Talks are markdown files with YAML front matter in `_talks/`; the
team, links, and site identity live in small YAML files in `_data/`.
The design is adapted from
[fiu-bio-seminar.github.io](https://github.com/fiu-bio-seminar/fiu-bio-seminar.github.io).

All names and talks currently in the repository are sample content.

## Layout

- `_talks/` — one markdown file per talk (see `_talks/TEMPLATE.md`)
- `_data/site.yml` — name, year, venue, time, contact, flyer toggle,
  flyer banner text and logo
- `_data/team.yml`, `_data/links.yml` — the Team and Links pages
- `_layouts/default.html` — shared chrome and all CSS (brand colors
  are the five tokens at the top of the stylesheet)
- `index.html` — schedule page; Liquid renders the ledger and composes
  the flyer card from the next talk's front matter (banner, photo,
  speaker, affiliation, title, date/room), and a small script applies
  date-relative state (past rows, the "Next up" highlight, and which
  talk the flyer shows) at page load
- `_layouts/flyer.html` — the printable letter-size flyer generated for
  each talk at `flyers/<talk-file>.html` (title, subtitle, date/time,
  speaker photo, abstract, link; prints to a one-page PDF)
- `.github/workflows/flyer-pdfs.yml` — on pushes to `main` that touch
  talks, the flyer layout, settings, or images, builds the site, renders
  each talk's flyer to `flyers/<talk-file>.pdf` with headless Chromium
  (`.github/scripts/render-flyers.mjs`), and commits new or changed
  PDFs. Unchanged flyers are skipped using `flyers/.hashes.json`; it can
  also be run by hand from the Actions tab
- `images/` — speaker and team photos, and the flyer logo

## Deploying

Push to the default branch of a repository with GitHub Pages enabled
(Settings → Pages → Deploy from a branch). GitHub Pages builds Jekyll
natively; the only Actions workflow is the optional flyer-PDF one,
which needs Settings → Actions → General → Workflow permissions set to
"Read and write" if the organization defaults to read-only.

Editing instructions for committee members are in
[CONTRIBUTING.md](CONTRIBUTING.md).

## Local preview (optional)

```
gem install jekyll
jekyll serve
```
