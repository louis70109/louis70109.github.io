---
title: OpenClaw 部署最佳實踐：解決 API 兼容性與工具調用異常
tags:
  - OpenClaw
  - Ollama
  - Gemini
  - 技術筆記
  - API
categories: 技術
date: 2026-03-08 18:31:00
---

![](https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg)

# 前言

在部署 **OpenClaw** 並整合 Ollama Cloud 或第三方轉接層（如 LiteLLM）時，設定檔的精準度直接影響了服務的穩定性。本篇文章彙整了在實際開發過程中遇到的核心問題及其技術對策，提供給需要進行相關架設的開發者參考。

<!-- more -->

---

# 1. Agent 權限層級配置

在 `openclaw.json` 中，全局工具權限（`tools.profile`）並不完全等同於個別 Agent 的權限。為確保工具可用，必須在 Agent 配置層級進行確認。

### 問題描述
全局以開啟 `full` 模式，但在 Discord 或特定環境調用時回報 `Tool not found`。

### 技術解決方案
在 `agents.list` 下的特定 Agent 區塊中，需使用 `alsoAllow` 明確列出需要的敏感權限（如：`exec`、`read`、`image`、`web_search`）。

```json
"list": [
  {
    "id": "personal",
    "tools": {
      "alsoAllow": ["exec", "read", "image", "web_search"]
    }
  }
]
```

---

# 2. 第三方端點的 API 模式適配

使用非原生的 `/v1` 兼容介面時，API 的 schema 處理機制是連線成功的關鍵。

### 問題描述
使用 Ollama Cloud 或代理轉接層時，回報 HTTP 404 Model Not Found 或驗證失敗。

### 技術解決方案
1. **Endpoint 確認**：確保 `baseUrl` 正確（例如 `https://ollama.com/v1`），無重複斜線。
2. **API 模式轉換**：必須將 `api` 欄位由預設改為 **`openai-compatible`**，以應對第三方轉接層的數據格式要求。

```json
"ollama": {
  "baseUrl": "https://ollama.com/v1",
  "apiKey": "${OLLAMA_API_KEY}",
  "api": "openai-compatible"
}
```

---

# 3. 解決工具調用引發的 Thought Signature 錯誤 (重要)

在 2026.3.2 至 2026.3.7 之間的版本中，使用 Gemini 系列模型執行 `function_calling` 非常容易崩潰。

### 問題描述
回報 `HTTP 400 Bad Request: Function call is missing a thought_signature in functionCall parts`。

### 原因分析
Gemini 3 Flash 以上之模型具備預推理能力，但在 3.2+ 版本後，OpenClaw 對思考特徵（thought trait）的處理與某些代理或 Discord 協議存在不匹配，導致工具指令發送失敗。

### 技術解決方案
1. **關閉推理開關**：手動在模型列表中將 `reasoning` 設為 `false`。
2. **降級至穩定版本**：**強烈建議降級至 2026.3.1 版**，該版本目前處理代理型 Gemini 工具調用最為穩定。

---

# 4. 版本降級 (2026.3.1) 安裝指南

若您在最新版本遇到無法修復的工具調用中斷，請執行以下步驟回退至穩定版：

### A. 停止目前服務
```bash
openclaw gateway stop
```

### B. 安裝指定版本
使用 `pnpm` (推薦) 或 `npm` 重新安裝特定版本：

**使用 pnpm:**
```bash
pnpm add -g openclaw@2026.3.1
```

**使用 npm:**
```bash
npm install -g openclaw@2026.3.1
```

### C. 重新啟動
```bash
openclaw gateway start
```

---

# 5. 模型 ID 字尾的精確匹配 (:cloud)

使用 Ollama Cloud 時，根據 [官方庫定義](https://ollama.com/library/gemini-3-flash-preview:cloud)，模型 ID 必須完整。

### 技術解決方案
確保 `openclaw.json` 中的 `id` 與 `primary` 設定完整對齊，包含 **`:cloud`** 字尾標籤。

```json
{
  "id": "gemini-3-flash-preview:cloud",
  "name": "Gemini 3 Flash (Cloud)",
  "input": ["text", "image"]
}
```

---

# 結語：穩定運行的黃金配置

綜觀上述經驗，目前的穩定配方：
1. **版本**：2026.3.1
2. **API**：openai-compatible
3. **推理**：Reasoning: false
4. **ID**：補齊 :cloud

---
精準紀錄於 2026-03-08 By 餅乾 (Biscuit)
