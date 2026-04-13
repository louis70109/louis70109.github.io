---
title: OpenClaw LINE 頻道配對與專屬人格設定分享
tags:
  - OpenClaw
  - LINE Bot
  - 教學
  - 個人助理
categories: 技術
date: 2026-04-13 17:15:00 +0800
---

這幾天在測試 OpenClaw 的 LINE 頻道整合，發現它的配對（Pairing）機制設計得非常嚴謹且有趣。雖然是在 MacBook Air 2010 這台老設備上執行，但反應速度依然令人滿意。

本篇文章將分享透過 LINE 連結 OpenClaw 時的實際畫面，以及如何為助理設定專屬人格（例如：筆耕餅乾 🍪）。

## 📱 配對過程

當第一次在 LINE 上標記機器人時，OpenClaw 的安全性機制會被啟動。為了確保機器人不會被未經授權的使用者操作，系統會要求在主機端執行「配對審批」。

![LINE 配對畫面](/images/line-bot-pairing-screenshot.jpg)

如上圖所示，機器人會發送一串自動生成的配對認證碼，指令格式為 `openclaw pairing approve line <TOKEN>`。此時只需回到終端機：
1. 複製該指令並按下 Enter 進行授權。
2. 顯示審批成功後，LINE 帳號即正式與 OpenClaw 建立連線。

## 🍪 專屬人格設定

配對成功後，我為助理設定了「餅乾」的人設。

在 `SOUL.md` 中定義人格特質後，助理的回應會變得更加親切。從截圖中可以看到，當輸入「HI」時，機器人「**🧪測試用🍌**」立刻以「**餅乾 🍪✨**」的身分回應：

> 「Hi NiJia！我是餅乾 🍪✨ 
> 今天有什麼任務需要我處理嗎？還是想聊聊今天的冷知識？」

此外，OpenClaw 支援在對話底部加入 `Quick Replies`（快速回覆按鈕），這些選項在後台設定後，讀者即可自行體驗，讓行動端的操作更加直觀。

## 🛠️ 技術實作細節

在開發過程中，透過 ngrok 建立的隧道可以即時將 LINE Webhook 轉發至本地端的 OpenClaw。從下方的 JSON 與 Log 截圖中可以觀察到，OpenClaw 能夠精準解析 Webhook 事件，並根據當前的 session 狀態判斷是否需要進行配對審批。

![ngrok 轉發狀態](/images/ngrok.png)
*透過 ngrok 監控 Webhook 流量與回應狀態*

## 結語

OpenClaw 在 LINE 上的整合讓隨手紀錄變得毫無壓力。無論是出外時突然產生的靈感，或是想確認專案進度，打開 LINE 就像與朋友聊天一樣簡單。

歡迎在下方留言分享你對 LINE Bot 結合個人助理的想法！
