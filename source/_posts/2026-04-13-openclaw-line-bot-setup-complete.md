---
title: 'OpenClaw 與 LINE Bot 串接實戰：從基礎對接到專屬人格設定'
tags:
  - OpenClaw
  - LINE Bot
  - AI
  - 實戰
  - 教學
categories: 技術
date: 2026-04-13 18:25:00
---

# 前言

最近在研究 **OpenClaw**，這是一個專為個人工程師打造的 AI Gateway，能把各種強大的模型整合進日常使用的通訊軟體裡。今天終於把 LINE Bot 給串起來了！這中間其實有不少細節（尤其是身分驗證部分），比起一般的 Bot 稍微多了一點安全機制。

雖然我是在 MacBook Air 2010 這台老戰友身上跑，但反應速度依然讓我很滿意。這篇就來記錄一下如何從零開始，把你的 OpenClaw 搬到 LINE 上面，並打造一個專屬的 AI 助理！

<!-- more -->

# 第一階段：LINE Developers 的基礎建設

首先，你得去 [LINE Developers](https://developers.line.biz/) 把頻道開好。

1. **建立 Messaging API Channel**：這部分跟一般開發 Bot 一樣，建立一個 Provider 後新增頻道。
2. **拿憑證**：
   - **Channel access token (long-lived)**：在 Messaging API 標籤最下面 Issue 出來。
   - **Channel secret**：在 Basic settings 裡面。
3. **回應設定 (關鍵)**：
   去 LINE Official Account Manager 的「回應設定」，模式要改成 **「聊天機器人」**，並且 **「啟用 Webhook」**。記得要把內建的「自動回應」關掉，不然 AI 說話時官帳會在那邊亂入 😅。

# 第二階段：OpenClaw 環境變數與設定

拿到 Token 後，回到你的伺服端。

1. **更新 .env**：
   在 `~/.openclaw/.env` 裡面補上這兩行：
   ```bash
   LINE_CHANNEL_ACCESS_TOKEN=你的TOKEN
   LINE_CHANNEL_SECRET=你的SECRET
   ```
2. **調整 openclaw.json**：
   確保 `line` 的欄位有正確啟用，並引用剛才的變數。另外最重要的就是 `gateway.bind` 要設為 `lan` 或 `0.0.0.0`，不然封包可是進不來的。

# 第三階段：利用 ngrok 打通任督二脈

如果你是在本機開發，肯定需要一個公開的 HTTPS 地址。這時候就是 **ngrok** 大大出場的時候啦！

```bash
ngrok http 18789
```

> ⚠️ **重要提醒**：`ngrok` 僅供開發測試使用。建議讀者若要長期穩定執行，還是要使用正式的 DNS 配置（例如 Cloudflare Tunnel 或固定 IP + 域名），避免每次重開 ngrok 都要去 LINE Console 改 Webhook URL 的尷尬情況。

指令敲下去之後，你會看到 ngrok 跳出連線資訊：

![ngrok 啟動畫面](https://nijialin.com/images/2026-04-13_3.38.00.jpg)

接著把得到的網址填回 LINE Console 的 Webhook URL 欄位：`https://[你的隨機代碼].ngrok-free.app/webhook/line`。
最緊張的一刻來了，按一下 **Verify**！只要看到綠色的 **Success**，這代表你的網路門戶已經正式跟 LINE 執事接軌，基礎設施搞定！

![Webhook 驗證 Success](https://nijialin.com/images/2026-04-13_4.51.11.jpg)

# 第四階段：最特別的高層批准機制（Pairing）

這是我覺得 OpenClaw 做得最讚的地方。它為了防範未經授權的使用，不會讓隨便一個路人加了 Bot 就能瘋狂消耗你的 AI 額度。加了好友後，你還得進行一個「配對」加「批准」的手續。

當你第一次在 LINE 上傳訊息給機器人時，系統會要求你在主機端執行「配對審批」。

![Pairing 成功：手機端批准](https://nijialin.com/images/2026-04-13_12.16.10.jpg)

如上圖所示，機器人會丟出一串自動生成的配對認證碼，指令格式如 `openclaw pairing approve line XU...XH`。

> 💡 **小撇步**：當 LINE 官方帳號回覆這串指令時，這不是在 LINE 裡面回覆，而是要真的 **「另外開一個電腦上的終端機」**，把這串指令貼進去執行。執行完這個「外部審批」動作之後，LINE 的通訊才會真正被打通。這是一個非常紮實的安全防護機制！

看到手機畫面跳出「Pairing completed」或「設備已批准」之類的提示，這就算是正式成家立業了！🤖

# 專屬人格設定篇

配對成功後，你可以幫你的助理設定一個專屬人格。我幫我的助理設定了一個 **「餅乾」** 的人設。

在 `SOUL.md` 裡設定好人格特質後，助理的回應會變得非常親切。當我輸入「HI」時，機器人立刻以「**餅乾 🍪✨**」的身分打招呼：

> 「Hi NiJia！我是餅乾 🍪✨ 
> 今天有什麼精準回擊的任務需要我處理嗎？還是想聊聊今天的冷知識？」

此外，OpenClaw 還支援在對話底部加入 `quick_replies`（快速回覆按鈕），讓手機端操作起來更直觀，選項包括：
- **安排今日任務**
- **聽聽歷史上的今天**
- **沒事閒聊**

這些快速回覆按鈕讓你在通勤或忙碌時，只需動動手指就能與 AI 互動，非常方便。

# #結語

OpenClaw 在通訊軟體上的整合真的讓「隨手記」這件事變得無壓力。不管是人在外面突然有個靈感，還是想查部落格的部署狀況，打開 LINE 像在跟朋友聊天一樣簡單。

**溫馨提醒：設備老舊沒關係，配置對了、RAM 加滿了，2010 年的 MBA 依然可以跑出很潮的 AI 助理！ ❤️**

推薦大家到 GitHub 給 [OpenClaw](https://github.com/openclaw/openclaw) 一個 Star 🌟 支持一下這個超酷的專案！
