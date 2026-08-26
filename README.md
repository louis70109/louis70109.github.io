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

1. 將文章寫在 `source/_posts/` 或 `source/_drafts/`
2. 將圖片放在 `source/images/` 或 `source/uploads/`
3. 執行 `npm test`
4. 執行 `npm run build`
5. 確認 `public/` 內容後 push 到 `main`
