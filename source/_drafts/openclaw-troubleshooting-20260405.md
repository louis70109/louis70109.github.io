---
title: OpenClaw 部署最佳實踐：從 3.1 邁向 4.2 的老戰友指南
tags:
  - OpenClaw
  - Ollama
  - Gemini
  - 技術筆記
  - 升級指南
  - Discord
  - GitHub
categories: 技術
date: 2026-04-05 20:30:00 +0800
---

![](https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg)

# 前言

最近把身邊幾台 OpenClaw 從穩定（但已經快變遺產？）的 2026.3.1 升級到 2026.4.2。本來以為是個 `pnpm install` 就能解決的小事，沒想到這中間的配置變更跟環境限制，還是讓我小坐了一下牢。

特別是我的主力戰友——那台 **MacBook Air 2010 款**。雖然它年紀比很多讀者的貓還大，但我已經把它加爆到 **16GB RAM** 了！老兵不死，只是需要在升級時多給它一點關愛。寫這篇主要就是想把這些踩坑經驗留下來，給同樣擁抱老設備或追求極致省錢（守護荷包）的大家一個參考。

或是說，先把信用卡準備好就好(?)。

<!-- more -->

---

# 為什麼要升級？（硬體背景）

其實 3.1 真的跑得挺穩的，但在這台 2010 年的 MBA 上，我們追求的是一種「低功耗、高效能」的微妙平衡。隨著 OpenClaw 支援的雲端模型（尤其是 Ollama Cloud）跟新的 Provider 機制出現，如果想用上最新的 Gemini 3 Flash 或更強大的推理功能，4.2 是必須要跨過去的一個門檻。

別看這台 MBA 老，16GB RAM 餵下去後，跑起 OpenClaw 調度還是挺順的。不過在升級的過程中，我發現了不少關於 API 命名與計費邏輯的有趣變動。

---

# 1. 遺留的 404 惡夢：為什麼 3.1 曾是唯一的救贖？

在踏入 4.2 的穩定之前，其實我中間經歷了一段非常混亂的「版本坐牢期」。從 2026.3.2 到 3.7 之間，OpenClaw 的 API Provider 經歷了幾次重大的重構，那段時間對我來說簡直是技術災難。

### 看到懷疑人生的 404
最嚴重的問題莫過於 **Ollama Cloud 的整合**。在 2026.3.31 的版本之後，核心代碼對 `baseUrl` 的拼接邏輯出了包 ([GitHub Issue #59205](https://github.com/openclaw/openclaw/issues/59205))。

當時的情況是：如果你設定了 API Endpoint，路徑會被錯誤地重複拼接，原本該是 `/api/chat` 的請求，發出去變成了 `/api/api/chat`。結果就是無論你怎麼調參數，伺服器永遠只會回你一個冷冰冰的 **404 Not Found**。當初真的是坐牢到想哭，對著螢幕一堆 404 看到懷疑人生，覺得自己是不是連網址都不會打。

### 當 Native "api: ollama" 罷工時
除了路徑衝突，還有另一個坑：原生 Ollama Provider 的不穩定。
根據 [Issue #25669](https://github.com/openclaw/openclaw/issues/25669)，當時雖然名義上支援了原生 Ollama API，但在執行某些後台任務（例如 `/compact` 進行對話壓縮）時，內建的 Provider 會莫名其妙失效或找不到。

### 降級 (Downgrade) 是為了更好的前進
這就是為什麼當時我決定毅然決然跑回 **2026.3.1**。
在那個混亂的版本過渡期，只有 3.1 的 `openai-compatible` 模式最穩健，它沒有路徑自動補齊的邏輯錯誤，能精準地打到 Ollama Cloud 的接口。

這篇文章不只是一份指南，更是紀錄那段「與 API 搏鬥」的血淚史。每一個穩定的背後，都是幾十個 404 堆疊出來的。

---

# 2. Ollama Cloud 的動機：這是在守護荷包

在 4.2 之後，模型命名規則做了一個重大的「回歸標準」。原本我們習慣在模型 ID 後面加上 `:cloud`，但現在統一改用 **`:latest`** 了。

更重要的是，為什麼我要堅持配置 **Ollama Cloud**？

### 為什麼選 Ollama Cloud？
這絕對不是因為它名字比較帥，而是因為**「訂閱方案」(Subscription Plan)** 的重要性！

市面上大多數的 AI 模型都是採用 **Pay-as-you-go (按量計費)**，也就是你每問一個問題、每讓 Agent 爬一次網頁，你的信用卡就在滴血。對於像我這種喜歡讓 Agent 24 小時待命（或是讓它幫我寫這篇長文）的人來說，如果不選用定額訂閱的方案，**荷包可能已經失守了**。

透過 Ollama Cloud 的定額模式，我可以放心地讓我的 2010 MBA 老戰友拼命跑，不用擔心月底看到帳單會想哭。

**配置範例：**
```json
"ollama-cloud": {
  "id": "gemini-3-flash-preview:latest",
  "api": "openai-compatible"
}
```
*就把後綴改成 `:latest` 就好，超簡單對吧(?)。*

---

# 3. Agent 權限配置 (alsoAllow)

在 `openclaw.json` 設定裡，就算你全局開了 `full` 模式，如果具體的 Agent 沒在 `alsoAllow` 裡明確列出權限，它還是會跟你說 `Tool not found`。

### 碎碎念
這就像你跟老闆說你可以全權負責，但進機房時警衛還是要看你的識別證一樣煩人。

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

# 4. Discord 的各種小門檻

如果你是用 Discord 當 Gateway 的話，記得這兩件事：
1. **Mention 規則**：如果 `requireMention` 設為 `true`，你不標註它，它就裝死給你看。
2. **權限回傳**：Bot 記得要給「嵌入連結」跟「上傳檔案」的權限，不然它就算找到了正妹（誤）或圖表也傳不出來。

---

# 5. 解決 Thought Signature 錯誤

Gemini 3 Flash 在某些舊版本（如 2026.3.2）會跟傳輸協定打架。
**解法：**
1. 將 `reasoning` 設為 `false`。
2. 或是乖乖升級到 4.2。

---

# 🚀 2026.4.2 建議配置配方

目前實測最香的配置組合：

- **版本**：`2026.4.2`
- **提供商 (Provider)**：使用 `ollama-cloud`
- **模型 (Model)**：`gemini-3-flash-preview:latest`
- **API 模式**：一定要用 `openai-compatible`
- **推理 (Reasoning)**：建議先關掉，穩定第一！

---

# 結語：繼續折騰吧！

不管是留在穩定的 3.1 還是衝刺 4.2，找到適合自己的配置才是最重要的。希望這篇筆記能幫大家少走一點彎路，早點享受 AI 的便利。

如果有問題歡迎在 Discord 頻道討論，我們 2026 年見（？）

溫馨提醒：升級前記得備份設定檔，不然坐牢時間會加倍喔 ❤️

整合紀錄於 2026-04-05 By 筆耕餅乾 (Writer Assistant)
