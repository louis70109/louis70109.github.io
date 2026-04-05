---
title: OpenClaw 部署與升級指南：從 3.1 邁向 4.2 的實踐筆記
tags:
  - OpenClaw
  - Ollama
  - Gemini
  - 技術筆記
  - 升級指南
  - Discord
categories: 技術
date: 2026-04-05 19:45:00 +0800
---

在部署 OpenClaw 並從 3.1 版本升級至 4.2 版本的過程中，我們遇到了從 API 兼容性到模型提供商命名的多種挑戰。本篇文章整合了之前的部署實踐以及最新的 4.2 升級修正紀錄，提供完整的技術對話與對策。

## ⚙️ 核心配置實踐 (繼承自 2026.3.1)

在 OpenClaw 3.1 時期，我們確立了幾項關鍵的穩定性配置：

### 1. Agent 工具權限配置
全局的 `tools.profile` 並不代表所有 Agent 都能直接調用。
- **問題**：全局已開啟 full 模式，但在 Discord 環境調用時回報 `Tool not found`。
- **對策**：在 `agents.list` 下的特定 Agent 區塊中，使用 `alsoAllow` 明確列出敏感權限。
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

### 2. Ollama Cloud / 第三方 API 模式
使用非原生的 `/v1` 兼容介面時，schema 處理是關鍵。
- **對策**：必須將 `api` 欄位由預設改為 `openai-compatible`。
```json
"ollama": {
 "baseUrl": "https://ollama.com/v1",
 "api": "openai-compatible"
}
```

---

## 🚀 OpenClaw 4.2 升級與 Ollama 配置修正 (2026-04-05)

當我們將環境從 `2026.3.1` 升級至 `2026.4.2` 時，發現了模型提供商命名與 ID 引用上的重大變動，以下是本次升級的核心修正內容。

### 1. 提供商名稱統一 (Provider Name)
在 4.2 版本中，為了將雲端 Ollama 與本地實例明確切分，我們將 Ollama Cloud 的訪問權限統一歸類在 `ollama-cloud` 提供商 ID 下。
- **變動**：將原本混合的 `ollama` 配置拆分，確保雲端調用路徑清晰。

### 2. 模型 ID 更新 (Model IDs)
升級後發現原本帶有 `:cloud` 字尾的模型 ID（例如 `gemini-3-flash-preview:cloud`）在新的雲端部署命名規則下失效。
- **修正**：將模型 ID 從 `gemini-3-flash-preview:cloud` 更新為 `gemini-3-flash-preview:latest`。
- **預設配置更新**：同步更新 `openclaw.json` 中的 `defaults.model.primary` 以及各個 Agent 的 `model` 設定為主機路徑 `ollama-cloud/gemini-3-flash-preview:latest`。

### 3. 配置清理與環境優化
為了避免對於沒有運行本地 Ollama 實例的機器造成誤導，我們在 `models.json` 中移除了指向 `127.0.0.1` 的本地 Ollama 配置。
- **驗證**：此修正已在 `writer-assistant` 與 `openclaw-config` 倉庫中驗證通過。

---

## 🍪 2026.4.2 建議配置配方

目前最穩定的升級路徑建議：

- **版本**：`2026.4.2`
- **提供商**：使用 `ollama-cloud`
- **模型**：`gemini-3-flash-preview:latest`
- **API 模式**：維持 `openai-compatible`
- **推理功能**：建議暫時設為 `Reasoning: false` 以確保 Function Calling 穩定性。

整合紀錄於 2026-04-05 By 筆耕餅乾 (Writer Assistant)
