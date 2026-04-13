---
title: 把訊息整理進你的行事曆吧！透過 OpenAI 讓 LINE Bot 幫你建立行事曆連結
tags:
  - Google
  - LINE Bot
  - Calendar
  - 行事曆連結
categories: LINE
date: 2023-06-06 15:00:17
---


![](https://nijialin.com/images/2023/GAI/calendar.jpeg)

# TL;DR

- 透過 LINE Webhook 接收使用者的文字訊息。
- 利用 OpenAI API 處理接收到的文字，並轉換為 Google Calendar 的邀請網址。
- 將轉換後的網址回傳給使用者點選。

> [GitHub 專案 - 行事曆 LINE Bot](https://github.com/louis70109/calendar-linebot)

# 前言

隨著 ChatGPT 火熱了好一陣子，在 Google I/O 之後 ChatGPT 也開放了許多 plugin (被嚇到?)，因此在這電波很弱的時刻我就買了 ChatGPT plus ...🧐

與此同時公司也開了許多跟「生成式 AI(GAI)」的課程，學到了一些 prompt 的技巧之外，也從課程中開始想生活周遭的範例，也因此有今天行事曆 LINE Bot 的文章 🎉 (我好歹也是傳教士一員)

<!-- more -->

# 專案介紹

這是一個用 Python 撰寫的 FastAPI 應用程式，它運用 OpenAI 的 GPT-3 模型與 LINE Bot API 進行文字訊息處理，並將處理後的文字訊息轉換成 Google Calendar 給使用者，可以加入行事曆。

# 想解決什麼問題？

我們常常在各大通訊軟體中跟朋友/工作/社團...在約活動或吃飯時，經常會有一句沒一句的約，例如：

A: 這幾天好無聊喔
B: 對啊，那明天晚上七點吃飯嗎？
A: 吃哪
C: 信義區餐廳如何？
B: OK
A: 吃到八點可以嗎？

當然相關的對話還會有一大串，但隨著時程越做越多，開始會對於行事曆控管就好需要，也開始了我管理我個人行事曆。

## Q1: 我都用 Apple 行事曆？

![Apple 行事曆](https://nijialin.com/images/2023/GAI/apple.png)

蘋果很方便，可以在行事曆上加入自己的 Google 帳號，透過 iCloud 整合在 iPhone 行事曆上，因此這樣就能在手機上收到相關通知，非常方便。

## Q2: 為什麼選用 Google Calendar？

1. 我自己在業餘時上課的 Cambly 英語平台，預約課程完之後他都會放到 Google Calendar 上，並且會同步到我 Apple 行事曆上，就不會掉事情了～

### Google Calendar GET API 要怎麼弄？

參考[這篇文章](https://blog.pulipuli.info/2016/12/google-google-calendar-new-event-url.html)，只要把 Google Calendar 網址後面的 query string 加上去參數就可以了！

> 文章的大大還有寫工具，願意手動的話用他的很棒！

網址：https://calendar.google.com/calendar/event?action=TEMPLATE

在接下來的地方只要把以下的英文串上去，基本上就可以完成自己的行事曆了
title: 活動名稱
dates: 日期，需要換成 Timezone 的版本，用 `/` 區分開始與結束時間
location: 地點
text: 行事曆內容
add: email 邀請，如果有兩位以上，用 `+` 來串接

串接方法如下：

```
https://example.com?action=TEMPLATE&title=123&text=456
```

# 如何使用 - 請看 VCR

<iframe width="560" height="315" src="https://www.youtube.com/embed/5JTU15VtDAw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

> 使用時請把人、事、時、地、物都盡可能提供唷！跟誰，什麼事情，什麼時間(早上幾點)，地點

## 加入好友

![](https://raw.githubusercontent.com/louis70109/calendar-linebot/main/screenshot/qrcode..jpeg)

# 結論

在測試這次 OpenAI API 時，若給的內容太短或太模糊，他可能會給錯誤的行事曆，因此若有使用，建議把含有 `人事時地物` 都盡量貼進去喔！這樣他能更精確的判斷💪

當然這個 LINE Bot 只是一個小工具，如果你有更好的建議，歡迎留言或在 GitHub 中開 Issue 讓我知道唷！

> [GitHub 專案 - 行事曆 LINE Bot](https://github.com/louis70109/calendar-linebot)


# 其他參考資源


- [Google Extension - ChatGPT 萬能工具箱](https://chrome.google.com/webstore/detail/chatgpt-%E8%90%AC%E8%83%BD%E5%B7%A5%E5%85%B7%E7%AE%B1/fmijcafgekkphdijpclfgnjhchmiokgp/related?hl=zh-TW)