# 忍者工坊靜態網站

## 概述

這個專案已由 Hexo 重寫為原生 JavaScript + Less 的靜態網站產生器。

- 產生器：`scripts/site.mjs`
- 樣式：`assets/main.less`
- 前端腳本：`assets/main.js`
- 建置輸出：`public/`

## 安裝

需要 Node.js 20 或更新版本。

```bash
npm install
```

## 內容位置

- `source/_posts/`：已發布文章的 Markdown
- `source/_drafts/`：草稿文章
- `source/images/`：站內圖片素材
- `source/uploads/`：文章附件與上傳檔案

## 文章工作流

### 1. 建立新草稿

```bash
npm run new '<slug>'
```

- `slug` 會對應檔名 `source/_drafts/<slug>.md`
- `slug` 不可包含空白或斜線
- 預設使用 `slug` 作為標題，可在建立後編輯 front matter
- 指令會建立草稿模板，內容包含：

```md
---
title: "標題"
tags:
  - JavaScript
categories: 技術
date: YYYY-MM-DD HH:mm:ss +0800
---

<!-- more -->
```

`<!-- more -->` 是文章摘要分隔線，分隔線前的內容會作為摘要。

### 2. 編輯文章與圖片

- 在 `source/_drafts/<slug>.md` 編輯草稿
- 圖片放在 `source/images/` 或 `source/uploads/`
- 文章內用站內路徑引用，例如：`/images/example.png`、`/uploads/file.pdf`

### 3. 發布草稿

```bash
npm run p '<slug>'
```

- 草稿會從 `source/_drafts/<slug>.md` 移到 `source/_posts/<slug>.md`
- 若同名已發布文章存在，指令不會覆寫，會直接失敗
- `npm run publish '<slug>'` 也可使用，效果相同

## 測試

```bash
npm test
```

## 建置

```bash
npm run build
```

建置完成後，靜態檔案會輸出到 `public/`。

## GitHub Pages 自動部署

將變更 push 到 `main` 分支後，GitHub Pages 會自動執行建置並部署 `public/`。

## 開發流程

1. 執行 `npm run new '<slug>'` 建立草稿
2. 在 `source/_drafts/<slug>.md` 撰寫內容
3. 將圖片放在 `source/images/` 或 `source/uploads/`
4. 執行 `npm run p '<slug>'` 發布文章
5. 執行 `npm test`
6. 執行 `npm run build`
7. 確認 `public/` 內容後 push 到 `main`
