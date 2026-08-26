import assert from 'node:assert/strict';
import { mkdtemp, readFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { createDraft, publishDraft } from '../scripts/content.mjs';

test('createDraft creates a ready-to-edit article template', async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'nijia-content-'));
  const now = new Date('2026-08-26T12:34:56+08:00');

  const file = await createDraft(root, 'new-article', '新的文章', now);
  const content = await readFile(file, 'utf8');

  assert.equal(file, path.join(root, 'source', '_drafts', 'new-article.md'));
  assert.match(content, /^---\ntitle: "新的文章"\ntags: \[\]\ncategories:\ndate: 2026-08-26 12:34:56 \+0800\n---/);
  assert.match(content, /<!-- more -->/);
});

test('createDraft safely quotes YAML titles', async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'nijia-content-'));
  const file = await createDraft(root, 'yaml-title', 'LINE Bot: 設定\n指南');

  assert.match(await readFile(file, 'utf8'), /title: "LINE Bot: 設定\\n指南"/);
});

test('createDraft defaults the title to the slug', async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'nijia-content-'));
  const file = await createDraft(root, 'article-title');

  assert.match(await readFile(file, 'utf8'), /title: "article-title"/);
});

test('createDraft rejects unsafe slugs and existing drafts', async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'nijia-content-'));

  await assert.rejects(() => createDraft(root, '../article', '文章'), /invalid slug/);
  await createDraft(root, 'article', '文章');
  await assert.rejects(() => createDraft(root, 'article', '文章'), /already exists/);
});

test('publishDraft moves a draft without overwriting published content', async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'nijia-content-'));
  await createDraft(root, 'article', '文章');

  const file = await publishDraft(root, 'article');

  assert.equal(file, path.join(root, 'source', '_posts', 'article.md'));
  assert.match(await readFile(file, 'utf8'), /title: "文章"/);
  await assert.rejects(() => publishDraft(root, 'article'), /draft not found/);
});

test('publishDraft keeps the draft when a published article exists', async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'nijia-content-'));
  const draft = await createDraft(root, 'article', '新文章');
  const published = path.join(root, 'source', '_posts', 'article.md');
  await import('node:fs/promises').then(async ({ mkdir, writeFile }) => {
    await mkdir(path.dirname(published), { recursive: true });
    await writeFile(published, 'existing');
  });

  await assert.rejects(() => publishDraft(root, 'article'), /already exists/);
  assert.match(await readFile(draft, 'utf8'), /新文章/);
  assert.equal(await readFile(published, 'utf8'), 'existing');
});
