---
title: 【Playwright】打造更聰明瀏覽器自動化測試 | Model Context Protocol 入門
tags:
  - Playwright
  - MCP
  - 自動化測試
  - LLM
  - 瀏覽器自動化
categories: 學習紀錄
date: 2025-04-22 14:30:01
---



![](https://nijialin.com/images/common.jpeg)


# 前言

近期在開發 LLM 應用時，常需要讓模型與網頁進行互動，無論是自動填寫表單、爬取資料或執行測試。過去這類任務往往依賴於截圖或視覺模型，不僅效率低下且易出錯。今天要介紹的 Playwright Model Context Protocol (MCP) 提供了一個全新的解決方案，讓 LLM 能夠直接透過結構化的方式與瀏覽器互動，大幅提升自動化效率。

<!-- more -->

# 介紹

## 什麼是 Playwright MCP？

Playwright MCP 是一個提供瀏覽器自動化功能的協議伺服器，它基於 Microsoft 的 [Playwright](https://playwright.dev/) 開發。與傳統的瀏覽器自動化方法不同，MCP 不依賴截圖或視覺模型，而是透過結構化的 accessibility tree 讓 LLM 能夠理解和操作網頁內容。

![](https://nijialin.com/images/2024/playwright/mcp.png)

> [參考來自 GitHub](https://github.com/microsoft/playwright-mcp)

## 核心優勢

1. **高效輕量**：利用 Playwright 的 accessibility tree，而非像素級輸入，大幅降低資源消耗
2. **對 LLM 友好**：不需要視覺模型，純粹基於結構化資料運作
3. **確定性工具應用**：避免截圖方法常見的模糊性問題
4. **易於整合**：與各種 LLM 和開發環境相容

## 安裝 Playwright MCP

在 VS Code 中安裝 Playwright MCP 非常簡單，只需在終端機中執行以下指令：

```bash
code --add-mcp '{"name":"playwright","command":"npx","args":["@playwright/mcp@latest"]}'
```

## 使用案例

Playwright MCP 能夠幫助我們在以下場景中提升效率：

1. **網頁導航與表單填寫**：自動化登入流程、問卷填寫等
2. **結構化內容的資料擷取**：從網頁中擷取特定資訊
3. **LLM 驅動的自動化測試**：讓 AI 協助執行 UI 測試
4. **為 AI 代理提供瀏覽器互動能力**：使 AI 助手能夠執行網頁操作

## 工作原理

Playwright MCP 的工作原理主要基於以下步驟：

1. **啟動伺服器**：MCP 啟動一個本地伺服器，與 Playwright 通訊
2. **建立會話**：建立一個瀏覽器會話，用於網頁互動
3. **取得結構化快照**：從頁面取得 accessibility tree，包含網頁的結構化資訊
4. **LLM 分析**：將結構化資訊發送給 LLM 進行分析
5. **執行操作**：根據 LLM 的建議透過 MCP 執行瀏覽器操作
6. **收集回饋**：取得操作後的頁面狀態，繼續與 LLM 互動

## 與傳統截圖方法的比較

傳統的基於截圖的自動化方法存在幾個問題：

1. **資源消耗大**：處理圖像需要更多計算資源
2. **精確度問題**：視覺模型可能誤解UI元素
3. **延遲高**：圖像處理通常需要更長時間

Playwright MCP 透過直接提供結構化資料解決了這些問題：

| 特性 | 基於截圖方法 | Playwright MCP |
|------|-------------|----------------|
| 資源消耗 | 高 | 低 |
| 精確度 | 受限於視覺模型 | 高（結構化資料） |
| 速度 | 慢 | 快 |
| 依賴視覺模型 | 是 | 否 |
| 結構化資料 | 無 | 有 |

# 實際應用


## 自動化測試

在自動化測試中，Playwright MCP 可以讓 LLM 理解頁面結構並產生測試案例，甚至可以自動驗證 UI 元素的正確性與可訪問性。

## 資料擷取

對於資料擷取任務，Playwright MCP 能夠幫助 LLM 精確定位需要的資訊，並以結構化的方式擷取，無需複雜的 CSS 選擇器或 XPath。

## AI 助手增強

將 Playwright MCP 與 AI 助手結合，可以讓助手直接與網頁互動，幫助使用者完成表單填寫、訂票、預約等任務。

# 結論

Playwright MCP 為 LLM 與瀏覽器的互動提供了一種全新的範式，不再依賴截圖或視覺模型，而是透過結構化的 accessibility tree 實現更高效、更準確的自動化。無論是進行網頁爬取、表單填寫、自動化測試還是建構智能代理，Playwright MCP 都提供了強大而靈活的工具。

透過以上的內容為一些範例，在完成之後接可以請 Agent 幫忙把 playwright script 寫出來，如此一來只要靠打字就可以做自動測試，然後等測試完成之後再請 AI 幫忙寫出來，如此一來真的很方便！

而隨著 LLM 在軟體開發和測試中的應用日益廣泛，Playwright MCP 這類工具將成為連接 AI 與網頁世界的重要橋樑。我期待看到更多創新的應用案例出現，也歡迎大家分享使用 Playwright MCP 的經驗與心得！


<style>
  section.compact {
    font-size: 150%  
  }
  img[alt~="center"] {
    display: block;
    margin: 0 auto;
  }
</style>