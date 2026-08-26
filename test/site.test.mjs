import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import {
  copyStaticAssets,
  createSearchIndex,
  createPost,
  renderLayout,
  renderHomeSearch,
  renderMarkdown,
  summarizeMarkdown,
  taxonomySlug
} from '../scripts/site.mjs';

test('createPost parses front matter and preserves the published filename route', () => {
  const post = createPost('Python-operator.md', `---
title: Python - operator
tags:
  - Python
  - operator
categories: Python
abbrlink: 1458295714
date: 2020-01-07 23:12:22
---

Body
<!-- more -->
More`);

  assert.equal(post.title, 'Python - operator');
  assert.deepEqual(post.tags, ['Python', 'operator']);
  assert.equal(post.category, 'Python');
  assert.equal(post.url, '/2020/01/07/Python-operator/');
  assert.equal(post.excerpt.trim(), 'Body');
});

test('renderMarkdown keeps image URLs and adds native lazy loading', () => {
  const html = renderMarkdown([
    '![](/images/example.png)',
    '![](../uploads/avatar.jpg)',
    '![](https://i.imgur.com/example.png)'
  ].join('\n\n'));

  assert.match(html, /src="\/images\/example\.png"/);
  assert.match(html, /src="\.\.\/uploads\/avatar\.jpg"/);
  assert.match(html, /src="https:\/\/i\.imgur\.com\/example\.png"/);
  assert.equal((html.match(/loading="lazy"/g) ?? []).length, 3);
});

test('renderMarkdown creates stable anchors for existing section links', () => {
  const html = renderMarkdown('# 關於 Gemini API Price');

  assert.match(html, /<h1 id="關於-gemini-api-price">/);
});

test('taxonomySlug creates safe paths', () => {
  assert.equal(taxonomySlug('Pub/Sub'), 'Pub-Sub');
  assert.equal(taxonomySlug('JavaScript\\TypeScript'), 'JavaScript-TypeScript');
  assert.throws(() => taxonomySlug('..'), /invalid taxonomy/);
});

test('createSearchIndex produces compact searchable plain text', () => {
  const post = createPost('search-post.md', `---
title: LINE Bot 搜尋
tags: [LINE, JavaScript]
categories: 技術
date: 2026-08-26 10:00:00
---

# 前言

使用 **原生 JavaScript** 建立搜尋。`);

  assert.deepEqual(createSearchIndex([post]), [{
    title: 'LINE Bot 搜尋',
    url: '/2026/08/26/search-post/',
    date: '2026-08-26',
    category: '技術',
    tags: ['LINE', 'JavaScript'],
    text: '前言 使用 原生 JavaScript 建立搜尋。'
  }]);
});

test('renderHomeSearch submits queries to the search page', () => {
  const html = renderHomeSearch();

  assert.match(html, /action="\/search\/"/);
  assert.match(html, /name="q"/);
  assert.match(html, /role="search"/);
});

test('renderLayout includes Google Analytics on every page', () => {
  const html = renderLayout({ title: '文章', content: '<p>內容</p>' });

  assert.match(html, /G-FYYPR3Z2K3/);
  assert.match(html, /googletagmanager\.com\/gtag\/js/);
});

test('summarizeMarkdown returns a compact plain-text description', () => {
  const description = summarizeMarkdown(`
![](/images/example.png)

# 前言

使用 **JavaScript** 建立[網站](https://example.com)。
`);

  assert.equal(description, '前言 使用 JavaScript 建立網站。');
});

test('copyStaticAssets preserves nested image and upload paths', async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'nijia-site-'));
  const source = path.join(root, 'source');
  const output = path.join(root, 'public');

  await writeFile(path.join(root, 'placeholder'), '');
  await import('node:fs/promises').then(({ mkdir }) =>
    Promise.all([
      mkdir(path.join(source, 'images', 'nested'), { recursive: true }),
      mkdir(path.join(source, 'uploads'), { recursive: true })
    ])
  );
  await writeFile(path.join(source, 'images', 'nested', 'photo.jpg'), 'image');
  await writeFile(path.join(source, 'uploads', 'avatar.jpg'), 'avatar');
  await writeFile(path.join(source, 'CNAME'), 'nijialin.com\n');

  await copyStaticAssets(source, output);

  assert.equal(await readFile(path.join(output, 'images', 'nested', 'photo.jpg'), 'utf8'), 'image');
  assert.equal(await readFile(path.join(output, 'uploads', 'avatar.jpg'), 'utf8'), 'avatar');
  assert.equal(await readFile(path.join(output, 'CNAME'), 'utf8'), 'nijialin.com\n');
});
