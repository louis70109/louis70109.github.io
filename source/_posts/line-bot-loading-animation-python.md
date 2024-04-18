---
title: 幫 LINE Bot 加點回覆動畫魔法：Loading Animation 功能解析
tags:
  - LINE
  - LINE Bot
  - Animation
categories: LINE
date: 2024-04-18 11:32:12
---


![](https://developers.line.biz/assets/img/loading-animation.7aad3d6c.gif)

# 前言

大家好！今天我們要聊聊 LINE Bot 最近更新的一個超酷炫的功能——Loading Animation。對於那些經常與 LINE 官方帳號互動的朋友來說，這一定是個期待已久的更新！

想象一下，當你向一個 LINE Bot 發送訊息，等待回應的時候，畫面上出現一個動畫效果，在視覺上告訴用戶 “訊息處理中，請稍等片刻”，是不是感覺整個用戶體驗都提升了呢？接下來來仔細看看這個功能的細節和如何實現它。

<!-- more -->

# 為什麼需要 Loading Animation？

在過去，當用戶向 LINE Bot 發送訊息後，可能需要等待一段時間才能收到回應。這段等待時間可能是因為後端正在處理複雜的查詢(或是搭配各種生成式 AI)。在這個等待過程中，用戶端缺乏足夠的回饋，可能會讓人感到焦慮或不確定是否需要重新發送訊息。

有了 Loading Animation，我們可以在這個等待時間內給用戶一個明確的視覺回饋，讓他們知道系統正在處理中，增強用戶等待時的體驗。

# 功能概述

根據[2024 年 4 月 17 日發布的新聞](https://developers.line.biz/en/news/2024/04/17/loading-indicator/)，Messaging API 新增了一個 endpoint，允許開發者在用戶與 LINE 官方帳號互動時顯示 Loading Animation。這個動畫會在**指定的秒數**後自動消失，或者當你的 LINE 官方帳號**發送了一則新訊息時消失**。

> 要使用這個功能，你需要確保用戶的 LINE 版本至少為 iOS 或 Android 的 13.16.0 版或更高版本。

# 如何實現？

我們來看一個簡單的 Python 範例，展示如何在你的 LINE Bot 中實現這個功能。首先，確保你已經安裝了 LINE Messaging API 的 Python SDK，然後按照以下步驟操作：

- 引入所需的模組和設定 LINE Bot 的 Access Token
- 建立一個 AsyncApiClient 以及 AsyncMessagingApi 的實例
  - 此為選項，依照使用 Python 框架調整
- 使用 show_loading_animation 方法來顯示 loading animation，並指定要顯示的秒數

> 參考官方的文件：[GitHub URL](https://github.com/line/line-bot-sdk-python/pull/622/files#diff-05cb5d307ecf35c70df85c3f7252bd9c90f6ec2155b743b26d7e4e4be019ed86)

```python
from linebot.v3.messaging import ShowLoadingAnimationRequest

...

configuration = Configuration(
    access_token=channel_access_token
)

async_api_client = AsyncApiClient(configuration)
line_bot_api = AsyncMessagingApi(async_api_client)

...

await line_bot_api.show_loading_animation(ShowLoadingAnimationRequest(chatId=event.source.user_id, loadingSeconds=5))

...
```

這個 Python 範例假設你已經有一個處理 LINE 訊息的程式，當 LINE Bot 接收到 webhook 訊息時，它會向用戶顯示一個持續 5 秒的 loading animation，`chatId` 則使用 `user_id` 為主。

> Loading 秒數需為 5 的倍數，目前最多 60 秒，預設為 20 秒 ([參考文件](https://developers.line.biz/en/reference/messaging-api/#display-a-loading-indicator-request-body))

是不是很簡單呢？這個功能不僅可以提升用戶體驗，讓用戶在等待過程中感到更加舒適，也為你的 LINE Bot 增添了一點互動的趣味性。

# 結論

想了解更多細節，別忘了查看[官方文檔](https://developers.line.biz/en/reference/messaging-api/#display-a-loading-indicator)和[官方 SDK 的 release note](https://github.com/line/line-bot-sdk-python/releases/tag/3.11.0)。這次的更新真的很酷，我們非常期待看到大家如何在自己的 LINE Bot 中利用這個新功能來創造出更棒的用戶體驗！

就這樣，希望這篇文章能夠幫助大家更好地理解和使用 LINE Bot 的 Loading Animation 功能！

# 活動小結

立即加入「LINE 開發者官方社群」官方帳號，就能收到第一手 Meetup 活動，或與開發者計畫有關的最新訊息的推播通知。▼

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
