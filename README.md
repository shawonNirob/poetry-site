# afterglow

A minimal, dark, glowing sky-blue React site for publishing poems and prose.
No backend, no database — every piece is its own Markdown file.

## Project structure

```
src/
  components/       Header, Footer, WorkList (shared UI)
  pages/            Home (list), WorkPage (single piece), About
  content/
    poems/*.md       One file per poem
    prose/*.md       One file per prose piece
  data/works.js      Loads & parses the markdown files — nothing to edit here
  App.jsx            Routes
  main.jsx           Entry point
  index.css          Design tokens + styling (dark / glowing sky-blue theme)
```

## Publish a new poem or prose piece

Add a file to `src/content/poems/` (or `src/content/prose/`). The filename
becomes the URL, so `winter-light.md` becomes `/poems/winter-light`.

```md
---
title: Winter Light
date: 2026-07-06
excerpt: One line that hints at the piece, shown in the list view.
---
The body of your poem or prose goes here,
line by line, exactly as you want it to read.
```

That's it — no code changes, no rebuild step to write by hand.

## Writing workflow (live reload, recommended while drafting)

```bash
docker compose -f docker-compose.dev.yml up --build
```

Open **http://localhost:5173**. This runs the Vite dev server with your
`src/content` folder bind-mounted into the container. Drop in a new `.md`
file and the site updates in your browser automatically — no restart, no
manual rebuild.

Without Docker:

```bash
npm install
npm run dev
```

## Production deployment

The dev server is for writing; for a real deployment you build a static
site and serve it with nginx:

```bash
docker compose up --build
```

Open **http://localhost:8080**. Because this is a static build, adding a
new `.md` file afterwards means running `docker compose up --build` again
to bake it into the served files — there's no live server-side rendering
in production. That single command is the entire "rebuild."

To stop either setup:

```bash
docker compose down
docker compose -f docker-compose.dev.yml down
```

## Build manually without Docker

```bash
npm install
npm run build
npm run preview
```
