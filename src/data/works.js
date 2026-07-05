// Content lives in src/content/poems/*.md and src/content/prose/*.md
//
// To publish a new piece: drop a new .md file in one of those folders.
// The filename becomes the URL slug (e.g. "my-poem.md" -> /poems/my-poem).
// Each file needs frontmatter, then the piece body below the second `---`:
//
//   ---
//   title: My Poem
//   date: 2026-07-06
//   excerpt: One line teaser shown in the list.
//   ---
//   The poem or prose text goes here.
//
// In dev (`npm run dev`), adding a file triggers an automatic hot reload.
// In production, the static site is rebuilt with `docker compose up --build`.

const poemFiles = import.meta.glob('/src/content/poems/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
});

const proseFiles = import.meta.glob('/src/content/prose/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
});

function parseFrontmatter(raw) {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw.trim() };

  const [, frontmatter, body] = match;
  const meta = {};

  frontmatter.split('\n').forEach((line) => {
    const separator = line.indexOf(':');
    if (separator === -1) return;
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim().replace(/^["']|["']$/g, '');
    meta[key] = value;
  });

  return { meta, body: body.trim() };
}

function loadFiles(files, kind) {
  return Object.entries(files).map(([path, raw]) => {
    const slug = path.split('/').pop().replace(/\.md$/, '');
    const { meta, body } = parseFrontmatter(raw);
    return {
      slug,
      kind,
      title: meta.title || slug,
      date: meta.date || '1970-01-01',
      excerpt: meta.excerpt || '',
      body
    };
  });
}

export const works = [...loadFiles(poemFiles, 'poem'), ...loadFiles(proseFiles, 'prose')];

export const getWorkBySlug = (slug) => works.find((w) => w.slug === slug);

export const getWorksByKind = (kind) =>
  works
    .filter((w) => kind === 'all' || w.kind === kind)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
