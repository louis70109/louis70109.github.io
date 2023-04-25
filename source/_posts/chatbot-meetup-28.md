---
title: 'LINE 開發社群計畫: 202103 LINE Platform API 更新與 Chatbot 社群心得分享'
tags:
  - LINE
  - Chatbot
categories: 研討會
date: 2021-03-19 17:00:05
---


<style>
  section.compact {
    font-size: 150%  
  }
  img[alt~="center"] {
    display: block;
    margin: 0 auto;
  }
</style>

![](https://nijialin.com/images/chatbot.png)

# 前言

大家好，我是 LINE Taiwan 的 Tech Evangelist - NiJia Lin。這次很開心受到 chatbot 社群的邀請，參加了 "[Chatbot meetup 聊天機器人小小聚 28 @ Onramp Studio](https://events.chatbot.tw/events/27)" 的聚會活動，過了一個農曆年，相信很多人也很期待三月 LINE Platform API 的新功能，藉由在社群上與大家分享 LINE API 更新與個人開發的心得，也希望透過社群分享的力量能夠讓聊天機器人的開發動能更加的盛大。

- 社群 Chatbots Meetup： [https://www.facebook.com/groups/chatbot.tw](https://www.facebook.com/groups/chatbot.tw)
- 本次活動網頁: [活動網址](https://events.chatbot.tw/events/27)

由於 Chatbot Meetup 本身屬於社群自主性的活動，裡面也有許多社群朋友所贊助的閃電秀。裡面的所有內容也是相當的難得與有趣。也希望能夠透過本篇文章讓大家稍微了解 Chatbot Meetup 社群閃電秀的魅力。

這次就由我用文章帶大家了解一下近期有什麼有趣的更新內容吧！

<!-- more -->

# 介紹

![](https://nijialin.com/images/2021/chatbot-28/2.JPG)

## Quick Reply URI Action

過往在做 Chatbot 時我們時常會依賴於 Rich menu 來幫助用戶更快速的使用我們所建立服務。如下圖所示，Chatbot 會提供許多功能讓用戶透過快速點擊觸發我們希望用戶所達到的行為。

<script async class="speakerdeck-embed" data-slide="3" data-id="fc4da12ffb4c4f779be22900e3268f67" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

但以上功能是基於用戶與 Chatbot 是一對一互動狀態才能使用 Rich menu，如今天第二位講者聖佑所提到的讀書會小幫手，讀書會群組基本上都是以 **一個群組(Group)** 為單位，若在群組中 Chatbot 則無法使用 Rich menu，會讓一些原本優秀的功能瞬間失去，因此這時候使用 Image map 或者 Quick Reply 來幫忙處理群組相關訊息。以下有些案例提供讀者們參考：

<script async class="speakerdeck-embed" data-slide="10" data-id="fc4da12ffb4c4f779be22900e3268f67" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

在應用許多 Chatbot 功能之後，相信開發者們都會漸漸的開始嘗試使用 [LIFF](https://developers.line.biz/en/docs/liff/overview/) 去做更多變化的組合應用，但以往在群組中要開啟 Chatbot 的 LIFF 是需要讓 Chatbot 多回應一則訊息，在對話中就會多了一則訊息是為了讓用戶可以點選並觸發相關事件。

然後現在可以透過在群組中使用 Quick Reply 來減少多餘的訊息，讓 Chatbot 可以輸出相關選項讓使用者可以在下方選擇後開啟對應的 LIFF 功能，達到快速觸發的功能，以下是 URI Action 的 Demo：

![](https://nijialin.com/images/2021/chatbot-28/1.gif)

> 對於寫法有興趣的朋友可以[參考這邊](https://github.com/louis70109/PLeagueBot/blob/master/controller/line_controller.py#L49)

這邊建議僅使用以下三種方式，[文件參考](https://developers.line.biz/en/docs/messaging-api/using-line-url-scheme/):

- https://line.me/R/
- https://liff.line.me/
- tel:09001234567 (手機用戶可以支援打電話)

## LIFF to LIFF

<script async class="speakerdeck-embed" data-slide="12" data-id="fc4da12ffb4c4f779be22900e3268f67" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

既然提到 LIFF 了，當然要提一下在 LINE v11.3.0 之後更新的功能。當用戶在 LIFF 的 A 頁面要轉到 B 頁面時 LIFF 會在視窗中間出現一個以切換的提示，為了提升用戶的使用體驗，在 v11.3.0 之後將更改至最底端，讓用戶在使用上不僅可以收到換頁提醒，必且也不會影響使用，更多細節請[參閱新聞](https://developers.line.biz/en/news/2021/03/01/liff-on-line-11-3-0/#change-toast)。

> LIFF to LIFF [參考範例](https://github.com/louis70109/LIFF-to-LIFF-Example)

## LIFF 更新 for iPadOS

<script async class="speakerdeck-embed" data-slide="15" data-id="fc4da12ffb4c4f779be22900e3268f67" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

另一個改善開發者體驗的改動則是讓 LIFF 在 iPadOS 上的顯示方式更友善，讓前端的畫面排版上可以更擁有良好的排版而不會拉寬設計樣式，更多細節請[參閱新聞](https://developers.line.biz/en/news/#ipad-window-size)。

<script async class="speakerdeck-embed" data-slide="17" data-id="fc4da12ffb4c4f779be22900e3268f67" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

在 3/1 時正式移除掉 LIFF 的 Replace Mode，若您有在使用 LIFF 的話請參考 ➡️ [轉移你的 LIFF: 從 Replace 到 Concatenate 模式](https://engineering.linecorp.com/zh-hant/blog/liff-replace-to-concatenate/)

## TECH FRESH 實習生計畫

目前 2021 年的 TECH FRESH 實習生計畫招募通道已經開啟了，我們正在尋找對技術有熱情、積極解決問題、勇於接受挑戰的優秀同學，馬上手刀申請送出履歷，下一位 TECH FRESH 就是你！[招募連結](https://careers.linecorp.com/jobs/83)

<script async class="speakerdeck-embed" data-slide="20" data-id="fc4da12ffb4c4f779be22900e3268f67" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

## 其他議程分享

- 讀書會小幫手
  - 需求：
    - 每週報名通知
    - 發會議室網址
    - 發每週筆記
  - 使用 Chatbot 的考量點：
    - Email Server 維護的成本
    - 不夠即時
    - 在群組中歡迎新加入的夥伴(增加成員連結度)

現在也使用 [Kotlin](https://kotlinlang.org/) 帶來 Live demo，詳細內容可以參考以下簡報：

<iframe src="//www.slideshare.net/slideshow/embed_code/key/p3koZ9vmuFJz9" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/shengyou/building-chatbot-using-kotlin" title="用 Kotlin 打造讀書會小幫手" target="_blank">用 Kotlin 打造讀書會小幫手</a> </strong> from <strong><a href="https://www.slideshare.net/shengyou" target="_blank">Shengyou Fan</a></strong> </div>

- LINE Bot + LINE Pay 實作自動購物流程
  - 分享一個可以在 Chatbot 的對話中讓使用者快速結帳的範例
- 聊天機器人框架 Bottender 與 Kamigo 的設計
  - 將長議程的簡報濃縮在濃縮，用五分鐘快速介紹精華的部分讓大家了解框架的實作流程與說明
  - [簡報](https://docs.google.com/presentation/d/1BbfW8ZkDS1lt-uzFXop6k2PmXg30OcQI35NCeH-S9AY/edit#slide=id.ga39021286c_0_523)
  - 框架：
    - Ruby: [Kamigo](https://github.com/etrex/kamigo)
    - NodeJS: [Bottender](https://github.com/Yoctol/bottender)

# 結論

透過參加每一場社群小聚的分享並與參加者交流都可以讓我學到許多不同的新知，未來也會持續分享更多有關於 LINE Platform 相關的新知與應用，歡迎各位持續關注「LINE 開發者官方社群」官方帳號，就能收到第一手 Meetup 活動與平台更新新知，或與開發者計畫有關的最新消息的推播通知。▼

「LINE 開發者官方社群」官方帳號 ID：@line_tw_dev
![](https://www.evanlin.com/images/2020/line-tw-dev-qr.png)

# 關於「LINE 開發社群計畫」

LINE 今年年初在台灣啟動「LINE 開發社群計畫」，將長期投入人力與資源在台灣舉辦對內對外、線上線下的開發者社群聚會、徵才日、開發者大會等，已經舉辦 30 場以上的活動。歡迎讀者們能夠持續回來察看最新的狀況。詳情請看:

- [2019 年 LINE 開發社群計畫活動時程表](https://engineering.linecorp.com/zh-hant/blog/line-taiwan-developer-relations-2019-plan/)
- [LINE Taiwan Developer Relations 2019 回顧與 2019 開發社群計畫報告](https://engineering.linecorp.com/zh-hant/blog/line-taiwan-developer-relations-2019/)
- [LINE Taiwan Developer Relations 2020 回顧與 2020 開發社群計畫報告](https://engineering.linecorp.com/zh-hant/blog/line-taiwan-developer-relations-2020)
- [2021 年 LINE 開發社群計畫活動時程表](https://engineering.linecorp.com/zh-hant/blog/2021-line-tw-devrel/)
