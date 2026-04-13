---
title: 'LINE 開發社群計畫: 202103 Chatbot 社群心得與彈幕分享'
categories: 研討會
date: 2021-01-21 16:12:37
tags: ['LINE', 'Chatbot']
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

![](https://nijialin.com/images/2021/chatbot-27/0.jpg)

# 前言

大家好，我是 LINE Taiwan 的 Tech Evangelist - NiJia Lin。這次很開心受到 chatbot 社群的邀請，參加了 "[Chatbot meetup 聊天機器人小小聚 27 @ Onramp Studio](https://events.chatbot.tw/events/26)" 的聚會活動，並且分享 LINE API 更新與個人開發的心得。在此也跟各位分享本次參與的心得，並且也希望透過社群分享的力量能夠讓聊天機器人的開發動能更加的盛大。

- 社群 Chatbots Meetup： [https://www.facebook.com/groups/chatbot.tw](https://www.facebook.com/groups/chatbot.tw)
- 本次活動網頁: [活動網址](https://events.chatbot.tw/events/26)
- 本次活動的共筆紀錄： [https://hackmd.io/@chatbot-tw/meetups-027](https://hackmd.io/@chatbot-tw/meetups-027)

由於 Chatbots Meetup 本身屬於社群自主性的活動，裡面也有許多社群朋友所贊助的閃電秀。裡面的所有內容也是相當的難得與有趣。也希望能夠透過本篇文章讓大家稍微了解 Chatbots Meetup 社群閃電秀的魅力。

這次就由我用文章帶大家了解一下近期有什麼有趣的更新內容吧！

<!-- more -->

# 介紹

<iframe width="560" height="315" src="https://www.youtube.com/embed/OaX09Qp95Yw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## [Share Target Picker UI](<(https://developers.line.biz/zh-hant/news/2020/12/01/share-target-picker-ui-improve/)>)

<script async class="speakerdeck-embed" data-slide="3" data-id="72900f18058940949e021bbc93066200" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

過往將**一對一好友**的選項放在第一位，但在排版選擇上容易使用混淆，LIFF 開發團隊聽到各位開發者的心聲囉！調整了文案排版內容讓大家在使用中更 friendly。

## [Sticker 關鍵字訊息](https://developers.line.biz/zh-hant/news/2020/12/02/messaging-api-update-december-2020/)

<script async class="speakerdeck-embed" data-slide="4" data-id="72900f18058940949e021bbc93066200" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

貼圖是 LINE 其中一個很吸引人使用的功能，過去使用者在對談中使用貼圖時 Chatbot 無法辨別其用途，而在 2020/12 月發佈的更新中能夠讓 Chatbot 在 Webhook event 中收到 Keywords 的欄位，透過這個欄位可以讓你的 Chatbot 服務知道當前貼圖的用意，甚至可以透過文字辨識相關的服務來做更多的使用者預測/互動的功能喔！

> 目前[官方網站](https://developers.line.biz/zh-hant/)上的標題文字有修正囉！讓大家在查詢相關 API 時能更快找到相關地方。

![](https://nijialin.com/images/2021/chatbot-27/1.png)

## [Beacon - 請使用 Stay Event 取代 Leave Event](https://developers.line.biz/zh-hant/news/2021/01/07/deprecate-leave-event-for-beacon/)

<script async class="speakerdeck-embed" data-slide="10" data-id="72900f18058940949e021bbc93066200" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

再次提醒各位有在使用開發 Beacon 的用戶要注意自己是否有使用到 Leave Event，此功能目前已經停止支援。

![](https://nijialin.com/images/2021/chatbot-27/3.png)

建議能改成使用 Stay Event，但可能會有開發者問要使用 Stay 取代呢？

以台北捷運為例子，你會在等車時收到一個 LINE TODAY 的新聞，在`等車`(`Stay`)的用戶在此時一般情況都會使用手機，此時推播訊息給他有**較高的機率**點開；若同個情境下當用戶搭上捷運`離開`(`Leave`)時才推播訊息，可能在車上會遇到人潮無法打開手機等等的因素，那這個做法就會打不到預期的結果，因此還是推薦大家使用 `Stay Event` 取代會是比較好喔！

![](https://nijialin.com/images/2021/chatbot-27/2.png)

## LIFF 相關資訊

<script async class="speakerdeck-embed" data-slide="12" data-id="72900f18058940949e021bbc93066200" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

- [2.7.0 release](https://developers.line.biz/zh-hant/news/2021/01/14/release-liff-2-7-0/):
  - 加入 **RequireJS**: 讓您的 LIFF 能夠確保載入後在執行，避免出現非預期錯誤
  - 修正 `liff.getDecodedIDToken()`: 修正解開後名字亂碼的問題
- [2.7.1 release](https://developers.line.biz/zh-hant/news/2021/01/20/release-liff-2-7-1/) 修正了開啟外部瀏覽器會出錯的問題

> 若各位開發者有使用新版的需求請記得要升級至 `2.7.1` 喔！避免使用時遇到非預期錯誤。

### [更改您的 LIFF 至 Concatenate 模式](https://developers.line.biz/zh-hant/news/2021/01/18/remind-discontinue-replace-mode-announcement/)

<script async class="speakerdeck-embed" data-slide="6" data-id="72900f18058940949e021bbc93066200" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

筆者近期寫了[一篇教學文章](https://engineering.linecorp.com/zh-hant/blog/liff-replace-to-concatenate/)教大家如何轉移至 **Concatenate 模式**，避免在 **2021/03/01** 移除 Replace 模式時影響到您的 LIFF 應用程式喔！

## [一月平台更新資訊](https://developers.line.biz/zh-hant/news/2021/01/20/messaging-api-update-january-2021/)

### Narrowcast 訊息發送狀態參數

<script async class="speakerdeck-embed" data-slide="7" data-id="72900f18058940949e021bbc93066200" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

此次加入了這兩個屬性 `acceptedTime` & `completedTime`，讓使用 Narrowcast 的廠商可以透過這兩個屬性來得知服務`接收到的時間`與`訊息完成時間`(成功或失敗)，可以更加有效地從小地方得知狀態喔！

### 用 Mention API 得知群組/聊天室誰 tag 誰

<script async class="speakerdeck-embed" data-slide="9" data-id="72900f18058940949e021bbc93066200" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

這邊使用一個翻譯的 Chatbot 案例來呈現，過往 Chatbot 在收到句子時就會直接進行整串文字翻譯，但在不同語系對話中多少會有 Tag 對方的時候，過去名字會直接進入翻譯程序，會造成翻譯上的困擾。

現在透過這 API 不僅可以避免類似的問題，也能讓讀者們抓到相關的姓名位置做更多相關的應用，詳細使用方式可[參考文件](https://developers.line.biz/zh-hant/reference/messaging-api/#wh-text)。

## 彈幕範例

![](https://nijialin.com/images/2021/chatbot-27/demo.gif)

前一陣子我寫了一篇文章來介紹 - [開發結合 LINE Chatbot 的簡易彈幕系統](https://engineering.linecorp.com/zh-hant/blog/line-chatbot-screen-bullets/)，細節就不加贅述，筆者就在這次的分享中直接讓大家試玩這個功能，了解一下 Chatbot 究竟還有什麼有趣的心應用！ ：）

參考專案連結：[https://github.com/louis70109/Screen-LINE-Bullets](https://github.com/louis70109/Screen-LINE-Bullets)

# 結論

除了在社群上分享 LINE 平台的更新之外，當中也看到許多不同的應用(Bert、地方創生、旅遊 AA 小幫手、Swift SDK、LIFF 密室遊戲...)，在討論中也激發出許多不同應用的點子，若你也在做 Chatbot 相關的開發，不妨到 [Chatbot 的小聚](https://www.facebook.com/groups/chatbot.tw)中與各位分享吧！

# 活動小結

立即加入「LINE 開發者官方社群」官方帳號，就能收到第一手 Meetup 活動，或與開發者計畫有關的最新消息的推播通知。▼

「LINE 開發者官方社群」官方帳號 ID：@line_tw_dev
![](https://www.evanlin.com/images/2020/line-tw-dev-qr.png)

# 關於「LINE 開發社群計畫」

LINE 今年年初在台灣啟動「LINE 開發社群計畫」，將長期投入人力與資源在台灣舉辦對內對外、線上線下的開發者社群聚會、徵才日、開發者大會等，已經舉辦 30 場以上的活動。歡迎讀者們能夠持續回來察看最新的狀況。詳情請看:

- [2019 年 LINE 開發社群計畫活動時程表](https://engineering.linecorp.com/zh-hant/blog/line-taiwan-developer-relations-2019-plan/)
- [LINE Taiwan Developer Relations 2019 回顧與 2019 開發社群計畫報告](https://engineering.linecorp.com/zh-hant/blog/line-taiwan-developer-relations-2019/)
- [2020 年 LINE 開發社群計畫活動時程表](https://engineering.linecorp.com/zh-hant/blog/2020-line-tw-devrel/)
