import { constants } from 'node:fs';
import { copyFile, mkdir, open, unlink } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// slug 允許英數、Unicode 字母數字、點、底線、連字號，但不得是 . 或 ..
const SLUG_RE = /^[\p{L}\p{N}._-]+$/u;

function validateSlug(slug) {
  if (!SLUG_RE.test(slug) || slug === '.' || slug === '..') {
    throw new Error(`invalid slug: "${slug}"`);
  }
}

function formatDate(date) {
  // Asia/Taipei = UTC+8，固定格式 YYYY-MM-DD HH:mm:ss +0800
  const pad = (n) => String(n).padStart(2, '0');
  const offset = 8 * 60; // minutes
  const local = new Date(date.getTime() + offset * 60 * 1000);
  const Y = local.getUTCFullYear();
  const M = pad(local.getUTCMonth() + 1);
  const D = pad(local.getUTCDate());
  const h = pad(local.getUTCHours());
  const m = pad(local.getUTCMinutes());
  const s = pad(local.getUTCSeconds());
  return `${Y}-${M}-${D} ${h}:${m}:${s} +0800`;
}

function draftPath(root, slug) {
  return path.join(root, 'source', '_drafts', `${slug}.md`);
}

function postPath(root, slug) {
  return path.join(root, 'source', '_posts', `${slug}.md`);
}

export async function createDraft(root, slug, title, now = new Date()) {
  validateSlug(slug);

  const file = draftPath(root, slug);
  await mkdir(path.dirname(file), { recursive: true });

  const dateStr = formatDate(now);
  const template = `---\ntitle: ${JSON.stringify(String(title || slug))}\ntags: []\ncategories:\ndate: ${dateStr}\n---\n\n<!-- more -->\n`;

  // wx: 若檔案已存在則拋錯
  let fh;
  try {
    fh = await open(file, 'wx');
  } catch (err) {
    if (err.code === 'EEXIST') throw new Error(`already exists: ${file}`);
    throw err;
  }
  await fh.writeFile(template, 'utf8');
  await fh.close();

  return file;
}

export async function publishDraft(root, slug) {
  validateSlug(slug);

  const src = draftPath(root, slug);
  const dst = postPath(root, slug);

  await mkdir(path.dirname(dst), { recursive: true });
  try {
    await copyFile(src, dst, constants.COPYFILE_EXCL);
  } catch (err) {
    if (err.code === 'ENOENT') throw new Error(`draft not found: ${src}`);
    if (err.code === 'EEXIST') throw new Error(`already exists: ${dst}`);
    throw err;
  }
  await unlink(src);

  return dst;
}

// CLI 入口
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [, , command, slug, title] = process.argv;
  const root = process.cwd();

  if (command === 'new') {
    if (!slug) {
      console.error('usage: content.mjs new <slug> [title]');
      process.exit(1);
    }
    try {
      const file = await createDraft(root, slug, title);
      console.log(file);
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  } else if (command === 'publish') {
    if (!slug) {
      console.error('usage: content.mjs publish <slug>');
      process.exit(1);
    }
    try {
      const file = await publishDraft(root, slug);
      console.log(file);
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  } else {
    console.error('usage: content.mjs <new|publish> <slug> [title]');
    process.exit(1);
  }
}
