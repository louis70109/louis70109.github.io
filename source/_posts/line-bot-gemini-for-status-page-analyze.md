---
title: 只有 Status page 還不夠！講人話才知道 Infra 發生什麼事
tags:
  - Status Page
  - AI
  - LINE Bot
  - Gemini
  - Uptime Kuma
categories: 研討會
date: 2024-08-05 19:10:13
---


# 前言

大家好，以下是我在 [COSCUP 2024](https://coscup.org/2024/zh-TW/session/AEJHAC) 所分享的內容，帶大家了解在日常開發之餘，Side Project 也能夠透過 Status Page 來了解監控的重要性，以及如何透過 AI 來初步分析錯誤的發生原因，接著就一起往下看吧！

<!-- more -->

# 什麼是 Status Page?

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/09271d7b0369482d8046a13ff93550a0?slide=17" title="只有 Status page 還不夠！講人話才知道 Infra 發生什麼事" allowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 100%; height: auto; aspect-ratio: 560 / 315;" data-ratio="1.7777777777777777"></iframe>

Status Page 是一個專門用來確認與查看系統、服務或是各種應用程式執行狀態的網頁。除了監測狀態，大部分也都能接上各家通知系統，當服務出現狀況時，可以即時通知服務開發者，通常 Status Page 的功能包括：

- 即時狀態：顯示當前服務的執行狀態，大致份為「正常」、「部分中斷」、「完全中斷」...etc
- 歷史記錄：記錄過去的服務中斷事件、維護活動和其他相關事件，更多可以往後推算 SLA、SLO...etc
- 通知：讓用戶訂閱狀態更新通知，透過電子郵件、通訊軟體或其他方式接收通知

## 使用 Status Page 的優點

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/09271d7b0369482d8046a13ff93550a0?slide=21" title="只有 Status page 還不夠！講人話才知道 Infra 發生什麼事" allowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 100%; height: auto; aspect-ratio: 560 / 315;" data-ratio="1.7777777777777777"></iframe>
- 對內部開發團隊來說，它能即時更新狀態、防止問題擴大、降低維護成本、提高跨團隊的資訊共享和透明度，並節省溝通時間

- 對外部客戶來說，狀態頁面能幫助他們確認問題來源、提高對服務的信任度、提供透明度和可追溯性，並減少對客服的依賴

> 每當服務越來越多時，很多時候都分身乏術，或許大家可以考慮架設一個 Status Page 來監控自家服務，幫忙分攤一些 effort

## 為什麼要自架 Uptime Kuma？他又是什麼？

Uptime Kuma 是一個開源且能夠自行管理的監控工具，專門用來監控各種網站和服務的可用性。以下簡單列出一些使用 Uptime Kuma 的優點：

- 開源和免費：開源的監控系統，任何人都可以根據自家需求免費使用和調整
- 自主管理：你可以在自己的伺服器上運行 Uptime Kuma，完全掌控數據和配置，確保數據隱私和安全。
- 簡單易用：Uptime Kuma 提供直觀的用戶界面，易於設置和使用，適合各種技術水平的用戶。
- 多種監控選項：支援多種監控類型，包括 HTTP(s)、TCP、Ping、DNS、Push 等，滿足不同的監控需求
- 各種通知管道：如電子郵件、Slack、LINE Messaging API、Webhook...etc，確保重要的狀態變更能夠及時傳達
- 歷史數據和報告：提供詳細的歷史數據和報告，幫助你分析服務性能和可用性

## 架設建議

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/09271d7b0369482d8046a13ff93550a0?slide=27" title="只有 Status page 還不夠！講人話才知道 Infra 發生什麼事" allowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 100%; height: auto; aspect-ratio: 560 / 315;" data-ratio="1.7777777777777777"></iframe>

很多時候服務都會放在同一家的雲上(ex: Verda, GCP, AWS..)，但很多時候發生問題時都會是在不同的網路下發生，為了讓監控上能夠更有說服力，會建議將 Status Page 架設在不同的雲上，即便今天雲發生了任何事件，都不會影響到監控系統。

> 以我自己來說，個人的 Side Project 都放在 GCP 上，而 Status Page 則是放在 fly.io 上面，如果想試看看可以參考[我的 GitHub](https://github.com/louis70109/uptime-kuma-fly)

# 如何整合？怎麼讓他人聽懂工程師的語言？

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/09271d7b0369482d8046a13ff93550a0?slide=34" title="只有 Status page 還不夠！講人話才知道 Infra 發生什麼事" allowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 100%; height: auto; aspect-ratio: 560 / 315;" data-ratio="1.7777777777777777"></iframe>

對比我工作經驗，以及周遭朋友的工作上，很多時候工作內容都會透過 LINE 傳來傳去，很多時候除了公司最大的群組之外，另外都會有各式小群組去討論不一樣的事情，因此很多時候需要有個 LINE Bot 自動化消化一些錯誤處理，讓第一線工程師可以趕快滅火，以下快速說明可以如何整合

## 想像中 Status Page 能幫到的地方

![](https://nijialin.com/images/2024/status-page/1.png)

當服務遇到任何問題時

1. 先透過 webhook 傳進 LINE Bot Server
2. Server 依照相關 log 查詢服務的倉庫裡面是否有囤放其他 log (prometheus, loki, SQL...etc)
3. 將相關資料傳送給 Server 去分析 ([prompt URL](https://github.com/louis70109/line-bot-status-analyze/blob/main/controller/kuma_controller.py#L37)) 並傳到 LINE 群組裡
4. 依照嚴重程度決定要轉發到哪個群組
   1. 分享案例：Error Log 也可以依照嚴重程度決定讓 Bot 自動發到指定群組，普遍會有 1~3 個群組，大的服務有機會到 5 個
   2. 適時的接上 oncall 系統也是不錯
5. 人手一個 LINE，透過 LINE Bot 來推送訊息可以做更多客製化的內容

# 結論

普遍的 Error log 在網路上通常都會有解法，同等來說 AI 在訓練時應該也都有放入相關的材料，因此依照這些日常系統出現的錯誤來說，都可以透過 AI 有條理的幫忙分析，更直接點可以幫忙 Senior 去教育 Junior 對於錯誤分析的體感，讓團隊對於系統的熟悉程度能夠更快 ✍️

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/09271d7b0369482d8046a13ff93550a0?slide=38" title="只有 Status page 還不夠！講人話才知道 Infra 發生什麼事" allowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 100%; height: auto; aspect-ratio: 560 / 315;" data-ratio="1.7777777777777777"></iframe>

有鑒於最近許多 Vision 的 AI 分析越來越多，個人用起來的體感真的滿不錯，雖然費用不便宜，但各家 AI 也應該都還有免費方案可以用

最後，有些跟資安或是個資的東西其實不適合透過 API 打給雲端廠商，有些開發者應該會被要求要自架 AI model([Gemma](https://ai.google.dev/gemma?hl=zh-tw) || [Llama](https://llama.meta.com/))，這時可以透過 [GROQ](https://groq.com/) 這個服務測試看看，雖然在串接上還是透過 API 實驗，但至少可以先測測 model 帶來的火力，再決定要不要花時間架起來～

如果以上的內容對你有幫助，歡迎各位分享出去！

[在 Fly.io 上架設 Uptime Kuma 監控 Side Project](https://nijialin.com/2024/03/24/flyio-deploy-uptime-kuma/)

# 活動小結

立即加入「LINE 開發者官方社群」官方帳號，就能收到第一手 Meetup 活動，或與開發者計畫有關的最新消息的推播通知。▼

「LINE 開發者官方社群」官方帳號 ID：[@line_tw_dev](https://qr-official.line.me/gs/M_908lugfe_BW.png)

<img src="https://qr-official.line.me/gs/M_908lugfe_BW.png" width="200" height="200">

# 關於「LINE 開發社群計畫」

LINE 於 2019 年開始在台灣啟動「LINE 開發社群計畫」，將長期投入人力與資源在台灣舉辦對內對外、線上線下的開發者社群聚會、徵才日、開發者大會等，已經舉辦 30 場以上的活動。歡迎讀者們能夠持續回來查看最新的狀況。詳情請看:

- [2021 年 LINE 開發社群計畫活動時程表](https://engineering.linecorp.com/zh-hant/blog/2021-line-tw-devrel/)
- [2020 年 LINE 開發社群計畫活動時程表](https://engineering.linecorp.com/zh-hant/blog/2020-line-tw-devrel/)
- [2019 年 LINE 開發社群計畫活動時程表](https://engineering.linecorp.com/zh-hant/blog/line-taiwan-developer-relations-2019-plan/)
- [LINE Taiwan Developer Relations 2019 回顧與 2019 開發社群計畫報告](https://engineering.linecorp.com/zh-hant/blog/line-taiwan-developer-relations-2019/)

<style>
  section.compact {
    font-size: 150%  
  }
  img[alt~="center"] {
    display: block;
    margin: 0 auto;
  }
</style>
