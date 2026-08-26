import {
  cp,
  mkdir,
  readFile,
  readdir,
  rm,
  writeFile
} from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import less from 'less';
import { marked } from 'marked';
import { parse as parseYaml } from 'yaml';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = path.join(ROOT, 'source');
const OUTPUT = path.join(ROOT, 'public');
const SITE_URL = 'https://nijialin.com';
const SITE_TITLE = '忍者工坊';
const GA_ID = 'G-FYYPR3Z2K3';
const POSTS_PER_PAGE = 10;

marked.use({ gfm: true });

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function parseDocument(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { attributes: {}, body: source };
  return { attributes: parseYaml(match[1]) ?? {}, body: match[2] };
}

function values(value) {
  if (Array.isArray(value)) return value.map(String);
  return value ? [String(value)] : [];
}

export function taxonomySlug(value) {
  const slug = String(value).trim().replace(/[\\/]+/g, '-');
  if (!slug || slug === '.' || slug === '..') throw new Error(`invalid taxonomy: ${value}`);
  return slug;
}

function formatDate(date) {
  return date.slice(0, 10);
}

export function createPost(filename, source) {
  const { attributes, body } = parseDocument(source);
  const date = String(attributes.date ?? '').slice(0, 19);
  if (!attributes.title || !/^\d{4}-\d{2}-\d{2}/.test(date)) {
    throw new Error(`${filename} requires title and date front matter`);
  }

  const [year, month, day] = date.slice(0, 10).split('-');
  const slug = path.basename(filename, path.extname(filename));
  const [excerpt] = body.split(/\s*<!--\s*more\s*-->\s*/i);

  return {
    title: String(attributes.title),
    date,
    displayDate: formatDate(date),
    tags: values(attributes.tags),
    category: values(attributes.categories)[0] ?? '',
    url: `/${year}/${month}/${day}/${slug}/`,
    body: body.replace(/<!--\s*more\s*-->/gi, ''),
    excerpt
  };
}

export function renderMarkdown(markdown) {
  return marked.parse(markdown)
    .replace(
      /<img(?![^>]*\bloading=)([^>]*)>/gi,
      '<img loading="lazy" decoding="async"$1>'
    )
    .replace(/<h([1-6])>([\s\S]*?)<\/h\1>/gi, (_, depth, content) => {
      const id = content
        .replace(/<[^>]+>/g, '')
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~]/g, '');
      return `<h${depth} id="${escapeHtml(id)}">${content}</h${depth}>`;
    });
}

export function summarizeMarkdown(markdown, length = 160) {
  return renderMarkdown(markdown)
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<\/(?:h[1-6]|p|li|blockquote)>|<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, length);
}

export function createSearchIndex(posts) {
  return posts.map(post => ({
    title: post.title,
    url: post.url,
    date: post.displayDate,
    category: post.category,
    tags: post.tags,
    text: summarizeMarkdown(post.body, 2000)
  }));
}

export function renderHomeSearch() {
  return `<form class="home-search" action="/search/" method="get" role="search">
    <label for="home-search-input" class="home-search__label">搜尋文章</label>
    <div class="home-search__wrap">
      <input id="home-search-input" class="home-search__input" name="q" type="search" placeholder="搜尋文章、標籤或分類" autocomplete="off" spellcheck="false">
      <button class="home-search__btn" type="submit" aria-label="送出搜尋">
        <svg aria-hidden="true" focusable="false" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="17" y1="17" x2="22" y2="22"/></svg>
      </button>
    </div>
  </form>`;
}

function analytics() {
  return `<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');</script>`;
}

export function renderLayout({ title, content, description = 'You are what you do.', canonical = '/' }) {
  const pageTitle = title === SITE_TITLE ? SITE_TITLE : `${escapeHtml(title)} | ${SITE_TITLE}`;
  return `<!doctype html>
<html lang="zh-Hant">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="description" content="${escapeHtml(description)}">
  <title>${pageTitle}</title>
  <link rel="canonical" href="${SITE_URL}${canonical}">
  <link rel="icon" href="/images/favicon-32x32-next.png">
  <link rel="stylesheet" href="/assets/main.css">
  ${analytics()}
</head>
<body>
  <a class="skip-link" href="#content">跳到主要內容</a>
  <header class="site-header">
    <a class="brand" href="/">${SITE_TITLE}<small>You are what you do.</small></a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">選單</button>
    <nav id="site-nav" aria-label="主要導覽">
      <a href="/">首頁</a><a href="/archives/">歸檔</a><a href="/tags/">標籤</a><a href="/categories/">分類</a><a href="/search/">搜尋</a><a href="/about/">關於</a>
    </nav>
  </header>
  <main id="content" class="content">${content}</main>
  <footer>© ${new Date().getFullYear()} NiJia Lin</footer>
  <script src="/assets/main.js" defer></script>
</body>
</html>`;
}

async function writePage(url, html) {
  const target = path.join(OUTPUT, url.replace(/^\//, ''), 'index.html');
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, html);
}

function postMeta(post) {
  const category = post.category
    ? ` · <a href="/categories/${encodeURIComponent(taxonomySlug(post.category))}/">${escapeHtml(post.category)}</a>`
    : '';
  return `<time datetime="${post.date.replace(' ', 'T')}">${post.displayDate}</time>${category}`;
}

function postCard(post) {
  return `<article class="post-card">
    <p class="post-meta">${postMeta(post)}</p>
    <h2><a href="${encodeURI(post.url)}">${escapeHtml(post.title)}</a></h2>
    <div class="excerpt">${renderMarkdown(post.excerpt)}</div>
    <a class="read-more" href="${encodeURI(post.url)}">繼續閱讀</a>
  </article>`;
}

function pagination(page, pages) {
  if (pages < 2) return '';
  const links = [];
  for (let index = 1; index <= pages; index += 1) {
    const href = index === 1 ? '/' : `/page/${index}/`;
    links.push(index === page
      ? `<span aria-current="page">${index}</span>`
      : `<a href="${href}">${index}</a>`);
  }
  return `<nav class="pagination" aria-label="分頁">${links.join('')}</nav>`;
}

function taxonomyList(items, base) {
  return `<div class="taxonomy">${items.map(([name, posts]) =>
    `<a href="/${base}/${encodeURIComponent(taxonomySlug(name))}/">${escapeHtml(name)} <span>${posts.length}</span></a>`
  ).join('')}</div>`;
}

function groupPosts(posts, field) {
  const groups = new Map();
  for (const post of posts) {
    const names = field === 'tags' ? post.tags : post.category ? [post.category] : [];
    for (const name of names) groups.set(name, [...(groups.get(name) ?? []), post]);
  }
  return [...groups.entries()].sort(([left], [right]) => left.localeCompare(right, 'zh-Hant'));
}

async function renderTaxonomy(posts, field, base, title) {
  const groups = groupPosts(posts, field);
  const slugs = new Map();
  for (const [name] of groups) {
    const slug = taxonomySlug(name);
    if (slugs.has(slug)) throw new Error(`taxonomy path collision: ${slugs.get(slug)} and ${name}`);
    slugs.set(slug, name);
  }
  await writePage(`/${base}/`, renderLayout({
    title,
    canonical: `/${base}/`,
    content: `<header class="page-heading"><p>${groups.length} 個主題</p><h1>${title}</h1></header>${taxonomyList(groups, base)}`
  }));

  for (const [name, entries] of groups) {
    const url = `/${base}/${taxonomySlug(name)}/`;
    const list = entries.map(postCard).join('');
    await writePage(url, renderLayout({
      title: name,
      canonical: encodeURI(url),
      content: `<header class="page-heading"><p>${title}</p><h1>${escapeHtml(name)}</h1></header>${list}`
    }));
  }
}

export async function copyStaticAssets(source = SOURCE, output = OUTPUT) {
  await mkdir(output, { recursive: true });
  for (const name of ['images', 'uploads', 'diagrams']) {
    try {
      await cp(path.join(source, name), path.join(output, name), { recursive: true });
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
  }
  await cp(path.join(source, 'CNAME'), path.join(output, 'CNAME'));
}

async function build() {
  await rm(OUTPUT, { recursive: true, force: true });
  const filenames = (await readdir(path.join(SOURCE, '_posts'))).filter(name => name.endsWith('.md'));
  const posts = await Promise.all(filenames.map(async filename =>
    createPost(filename, await readFile(path.join(SOURCE, '_posts', filename), 'utf8'))
  ));
  posts.sort((left, right) => right.date.localeCompare(left.date));

  for (const post of posts) {
    const tags = post.tags.map(tag =>
      `<a href="/tags/${encodeURIComponent(taxonomySlug(tag))}/">${escapeHtml(tag)}</a>`
    ).join('');
    const content = `<article class="post">
      <header><p class="post-meta">${postMeta(post)}</p><h1>${escapeHtml(post.title)}</h1></header>
      <div class="post-body">${renderMarkdown(post.body)}</div>
      ${tags ? `<footer class="post-tags">${tags}</footer>` : ''}
    </article>`;
    await writePage(post.url, renderLayout({
      title: post.title,
      canonical: encodeURI(post.url),
      description: summarizeMarkdown(post.excerpt),
      content
    }));
  }

  const pages = Math.ceil(posts.length / POSTS_PER_PAGE);
  for (let page = 1; page <= pages; page += 1) {
    const start = (page - 1) * POSTS_PER_PAGE;
    const url = page === 1 ? '/' : `/page/${page}/`;
    const search = page === 1 ? renderHomeSearch() : '';
    const content = `${search}${posts.slice(start, start + POSTS_PER_PAGE).map(postCard).join('')}${pagination(page, pages)}`;
    await writePage(url, renderLayout({ title: page === 1 ? SITE_TITLE : `第 ${page} 頁`, canonical: url, content }));
  }

  const archives = posts.map(post =>
    `<li><time>${post.displayDate}</time><a href="${encodeURI(post.url)}">${escapeHtml(post.title)}</a></li>`
  ).join('');
  await writePage('/archives/', renderLayout({
    title: '歸檔', canonical: '/archives/',
    content: `<header class="page-heading"><p>${posts.length} 篇文章</p><h1>歸檔</h1></header><ol class="archive">${archives}</ol>`
  }));
  await renderTaxonomy(posts, 'tags', 'tags', '標籤');
  await renderTaxonomy(posts, 'category', 'categories', '分類');
  await writePage('/search/', renderLayout({
    title: '搜尋',
    canonical: '/search/',
    content: `<section class="search-page">
      <header class="page-heading"><p>搜尋 ${posts.length} 篇文章</p><h1>搜尋</h1></header>
      <div class="search-field">
        <label for="search-input">關鍵字</label>
        <input id="search-input" type="search" inputmode="search" autocomplete="off" placeholder="輸入標題、分類、標籤或內容" autofocus>
      </div>
      <p id="search-status" role="status" aria-live="polite">輸入關鍵字開始搜尋</p>
      <ol id="search-results" class="search-results"></ol>
    </section>`
  }));

  for (const [folder, url] of [['about', '/about/'], ['Privacy-Policy', '/Privacy-Policy/']]) {
    const page = parseDocument(await readFile(path.join(SOURCE, folder, 'index.md'), 'utf8'));
    await writePage(url, renderLayout({
      title: page.attributes.title,
      canonical: url,
      content: `<article class="post"><header><h1>${escapeHtml(page.attributes.title)}</h1></header><div class="post-body">${renderMarkdown(page.body)}</div></article>`
    }));
  }

  await copyStaticAssets();
  await mkdir(path.join(OUTPUT, 'assets'), { recursive: true });
  const styles = await less.render(await readFile(path.join(ROOT, 'assets', 'main.less'), 'utf8'), { compress: true });
  await writeFile(path.join(OUTPUT, 'assets', 'main.css'), styles.css);
  await cp(path.join(ROOT, 'assets', 'main.js'), path.join(OUTPUT, 'assets', 'main.js'));
  await writeFile(path.join(OUTPUT, 'search.json'), JSON.stringify(createSearchIndex(posts)));

  const sitemap = posts.map(post => `${SITE_URL}${encodeURI(post.url)}`)
    .concat(['/','/archives/','/tags/','/categories/','/search/','/about/'].map(url => `${SITE_URL}${url}`));
  await writeFile(path.join(OUTPUT, 'sitemap.txt'), `${sitemap.join('\n')}\n`);
  console.log(`Built ${posts.length} posts into public/`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await build();
