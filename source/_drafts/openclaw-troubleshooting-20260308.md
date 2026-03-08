---
title: OpenClaw 部署最佳實踐：解決 API 兼容性與工具調用異常
tags:
  - OpenClaw
  - Ollama
  - Gemini
  - 技術筆記
  - API
  - Discord
categories: 技術
date: 2026-03-08 19:02:00
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
2. **API 模式轉換**：必須將 `api` 欄位由預設改為 **`openai-compatible`**。

```json
"ollama": {
  "baseUrl": "https://ollama.com/v1",
  "api": "openai-compatible"
}
```

---

# 3. Discord Gateway 與頻道特定設定

針對 Discord 平台的部署，必須注意頻道規則與觸發機制，否則 Agent 會出現「已連線但無反應」的現象。

### 技術細節
1. **提到 (Mention) 規則**：在群組頻道中，若 `requireMention` 設為 `true`，Agent 僅在被標註時才會回應。
2. **Guild 選項配置**：
   ```json
   "guilds": {
     "YOUR_GUILD_ID": {
       "requireMention": true,
       "channels": {
         "ALLOWED_CHANNEL_ID": { "allow": true }
       }
     }
   }
   ```
3. **權限回傳**：確保 Discord Bot 在該伺服器擁有足夠的「嵌入連結」與「上傳檔案」權限，否則分析結果（如看圖或搜尋網址）將無法正確顯示。

---

# 4. 解決 Thought Signature 錯誤 (重要)

在 2026.3.2 至 2026.3.7 之間的版本中，Gemini 3 Flash 在執行 `function_calling` 時會觸發傳輸協定衝突。

### 解決方案
1. **關閉推理開關**：模型列表中將 `reasoning` 設為 `false`。
2. **版本回退**：強烈建議使用 **2026.3.1** 穩定版本。

---

# 5. 版本降級 (2026.3.1) 安裝指令

```bash
openclaw gateway stop
pnpm add -g openclaw@2026.3.1
openclaw gateway start
```

---

# 6. 模型 ID 字尾的精確匹配 (:cloud)

使用 Ollama Cloud 時，確保 `openclaw.json` 中的 `id` 與 `primary` 設定完整包含 **`:cloud`** 字尾。

---

# 結語：穩定運行的黃金配置

目前的穩定配方：
1. **版本**：2026.3.1
2. **API**：openai-compatible
3. **推理**：Reasoning: false
4. **Discord**：明確標註 Guild 權限與白名單頻道。

---
精準紀錄於 2026-03-08 By 餅乾 (Biscuit)
