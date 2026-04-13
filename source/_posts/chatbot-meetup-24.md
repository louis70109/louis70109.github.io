---
title: 'LINE 開發社群計畫: 202010 Chatbot 社群心得分享'
tags:
  - LINE
  - Flex Message
  - LIFF
  - Chatbot
categories: 研討會
date: 2020-10-29 22:02:04
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

大家好，我是 LINE Taiwan 的 Tech Evangelist - NiJia Lin。這次很開心受到 chatbot 社群的邀請，參加了 "[Chatbot meetup 聊天機器人新手小聚 24 @ Gandi](https://chatbots.kktix.cc/events/meetup-024)" 的聚會活動，並且分享 LINE API 更新與個人開發的心得。在此也跟各位分享本次參與的心得，並且也希望透過社群分享的力量能夠讓聊天機器人的開發動能更加的盛大。

- 社群 Chatbots Meetup： [https://chatbots.kktix.cc/](https://chatbots.kktix.cc/)
- 本次活動網頁: [活動網址](https://chatbots.kktix.cc/events/meetup-024)
- 本次活動的共筆紀錄： [https://hackmd.io/@chatbot-tw/meetups-024](https://hackmd.io/@chatbot-tw/meetups-024)

由於 Chatbots Meetup 本身屬於社群自主性的活動，所有內容也是相當的難得與有趣。也希望能夠透過本篇文章讓大家稍微了解 Chatbots Meetup 社群的魅力，讓更多朋友了解到打造自己的聊天機器人是如此讓人開心的事情。

<!-- more -->

# LINE Platform Update 2020/10

<iframe width="560" height="315" src="https://www.youtube.com/embed/ZFPN5inMtM8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

在九月與十月這兩個月中釋出了許多資訊，以下就一一帶大家了解一下究竟釋出了什麼新的強大 API 吧！

## LIFF 釋出 v.2.4.1

<script async class="speakerdeck-embed" data-slide="4" data-id="deb0906716b845a3a132cbafbc1074e8" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

由於在 2.4 版釋出時可以透過 LIFF 開啟另一個 LIFF，讓使用體驗不中斷(不會關閉在打開)，但有時可能因為另一個頁面不是 LIFF 而導致出錯，在這次的版本釋出這個新功能可以在打開前確認欲前往的網址是否是可使用的 LIFF 才導過去，

並且在此版本修復了當開發者呼叫兩次 `liff.init()` 時會出現的錯誤，若大家有遇到此問題若有寫相關的 workaround 的話可以在之後升版本將相關 workaround 移除試看看囉！

> 但是以上功能必須要 LINE App `10.18.0` 版本以上才可以喔！大家需要多多注意！

## 管理 LINE Bot 相關資訊

開發者們在建立 LINE bot 時大多都是從 [LINE Developer Console](https://developers.line.biz/zh-hant/) 裡去設定相關參數，使用情境大多像是開發者在開發 Chatbot 時都會使用 ngrok 之類的服務建立一個暫時性 Domain，抑或是版本升級需要改網域(址)名稱，不管是哪種用途，最終需要都確認的 Bot 資訊、更改 Webhook 網址、測試 Webhook 網址是否有效，這次的更新一次釋出許多相關資訊的 API，詳細請參考下方。

### Get bot info

<script async class="speakerdeck-embed" data-slide="7" data-id="deb0906716b845a3a132cbafbc1074e8" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

若開發者因為開發不同環境的 Chatbot 時需要管理前，一定需要取得相關資訊在 UI 上才有辦法管控，大家可使用[此 API](https://developers.line.biz/en/reference/messaging-api/#get-bot-info) 取得相關資訊。

### Webhook Settings

這個 API 是許多開發者敲碗許久的功能，大家請參考以下說明：

<script async class="speakerdeck-embed" data-slide="8" data-id="deb0906716b845a3a132cbafbc1074e8" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

- [GET Webhook URL](https://developers.line.biz/en/reference/messaging-api/#get-webhook-endpoint-information)
  - 取得當前 Webhook 的網址，可得知當前 Chatbot 所設定之 URL。
- [Set Webhook URL](https://developers.line.biz/en/reference/messaging-api/#set-webhook-endpoint-url)
  - 透過此 API 可以使用 `PUT` 來更新 Chatbot 的 Webhook URL，可透過前一個 API 先取得網址確認後再使用此 API 來更新。
- [Verify(Test) URL](https://developers.line.biz/en/reference/messaging-api/#test-webhook-endpoint)
  - 不管 `GET` 或 `PUT`，都需要確認當前的 URL 是否真的可行，透過此 API 即可 Verify 你的 Webhook URL。

三個 API 皆是基於 `CHANNEL_ACCESS_TOKEN` 做相關使用，大家再使用時務必確認是否有使用到對應的 Token 喔！

## TLS 支援度

<script async class="speakerdeck-embed" data-slide="18" data-id="deb0906716b845a3a132cbafbc1074e8" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

在接下來的日子裡，LINE 將會開始支援 `TLS1.3`，並且開始停止支援 `TLS1.1` 以及 `TLS1.0`。HTTP 版本的部分也會開始支援 `HTTP/2`，讓開發者們的服務可以建構在更快、更安全的協定上。

這邊就會有個問題產生，那我該如何測試才知道我的主機有沒有支援到呢？答案就是使用 Webhook 的 [Verify(Test) API](https://developers.line.biz/en/reference/messaging-api/#test-webhook-endpoint) 即可得知當前服務是否支援協定，而只要收到 Http 狀態碼(status code) 是 `200` 即是成功，而 Body 內容則如下方投影片所示。

<script async class="speakerdeck-embed" data-slide="20" data-id="deb0906716b845a3a132cbafbc1074e8" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

> 轉換時間 2020/10~2021/01，有使用到 LINE 服務的大家要注意時間，記得 migration！

## Flex Message Update 2

距離上次 `Update 1` 也經過一年了(參考[這篇文章](https://engineering.linecorp.com/zh-hant/blog/flex-message-update1/))，以下帶大家了解這次更新的部分！

### 1. Carousel 的數量從 `10` ➡️ `12`

### 2. 增加排版相關參數

<script async class="speakerdeck-embed" data-slide="24" data-id="deb0906716b845a3a132cbafbc1074e8" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

如同一年前的 [Update 1 文章](https://engineering.linecorp.com/zh-hant/blog/flex-message-update1/)，Flex Message 是一種對話介面，可使用 [CSS Flexible Box (CSS Flexbox)](https://www.w3.org/TR/css-flexbox-1/) 的基礎知識，自由客製化版面。既然使用 `flex` 這個名詞，勢必得加入更多支援讓 Flex Message 更像的 Flexbox，以下就增加了兩個參數讓排版的支援度更高：

- `justifyContent`
- `alignItems`

以及加了 `linearGradient`，此參數讓讓背景顏色可以使用`漸層`，讓 Designer 可以更好的使用之配色。

> 詳細樣式請參考上方投影片。

### 3. 開發者福音：Flex Message `content` 參數可為空值！

<script async class="speakerdeck-embed" data-slide="26" data-id="deb0906716b845a3a132cbafbc1074e8" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

在寫 Flex Message 時會因為一些情境的判斷式讓 `content` 的值為一個空陣列，過往在解析時遇到`空值`會無法顯示(出錯)，隨著這次更新中已經可以讓 `content` 參數為空值，若開發者們有因為這個參數多寫的許多判斷式，現今已可開始試著將程式相關判斷式看看，可以更減省你的 code 喔！

### 4. 新增 Image, Icon, Text 三種 `size` 的參數

<script async class="speakerdeck-embed" data-slide="28" data-id="deb0906716b845a3a132cbafbc1074e8" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

這次更新中三個參數皆可使用 `px` 來設定大小，讓 Designer 們可以更有效地控制 Flex Message 的視覺，且 Image 還能以`百分比`(`percentages`) 表示，可以讓圖片更能適應各種手機尺寸。

### 5. 增加參數讓按鈕文字不會被吃字

<script async class="speakerdeck-embed" data-slide="29" data-id="deb0906716b845a3a132cbafbc1074e8" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

如同投影片敘述，在之前長度過長時 APP 會自動將文字變成 `...` 的形式，這次的更新中只要在 `adjustMode` 屬性裡加入 `shrink-to-fit` 參數，如同字面上的意思，讓`收縮`的樣子轉變成 `適應` Flex Message，讓你的 Button 的文字不會被 APP 轉換，詳細請[參考文件](https://developers.line.biz/en/docs/messaging-api/flex-message-layout/#adjusts-fontsize-to-fit)。

> 支援在 LINE 10.13.0 以上(含) for iOS and Android。

## 小結

若要使用 Flex Message 的開發者們記得使用 [Simulator](https://developers.line.biz/flex-simulator)，以及在 LINE Bot 中若有管理版本，大家可以使用 Webhook API 去做相關建制以及使用，或許可以讓你省下取多工喔！

# 從 0~17 萬使用者，我的第一支 LINE Bot side project - 地方爸爸

<iframe width="560" height="315" src="https://www.youtube.com/embed/4HvMQA4LuPk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

講者從爸爸的角度出發，如何使用 LINE Bot 解決小孩子課堂的需求，並提到如何使用擴散讓 Chatbot 可以持續地吸收粉絲，講解了許多種為了適應各個課程做出來的 Chatbot(國語、數學...)，當中也提到開發者別因為開發的功能與市面上產品衝突而停止開發，更應該是將它開發出來，再更進一步的優化，或許你擁有的功能比市面上更親近使用者，讓你的 Chatbot 可以有更多人使用！

# 閃電秀

<iframe width="560" height="315" src="https://www.youtube.com/embed/ovi8lkfGZ8I" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- 【用 .NET 打造 LINE 婚禮聊天機器人經驗分享】- Kyle Shen

分享了許多使用 .NET 寫鐵人賽的相關經驗，並也為了婚禮打造客制的機器人，包括 LINE Messaging API、LIFF、Notify、Pay...，在這三十天中釐清了許多串接上的問題，以及搭配 Azure 許多功能做組合的三十天系列文章，最後講者提到了一段話很重要，「技術文章不難，難的是養成<mark>堅持</mark>的習慣」，將你學到的東西記錄下來，一個系列、一個文章、一個段落都行，記錄會讓你受用無窮的！

# 結論

希望透過詳細的介紹除了讓大家更了解最近 API 的大更新之外，也讓大家透過認識到不同講者所帶來精彩的分享，開發出更多更有創意的 Chatbot 服務，也歡迎大家持續來到社群分享，讓社群可以更活絡並能碰撞出新的想法與點子 😁。

# 活動小結

立即加入「LINE 開發者官方社群」官方帳號，就能收到第一手 Meetup 活動，或與開發者計畫有關的最新消息的推播通知。▼

「LINE 開發者官方社群」官方帳號 ID：@line_tw_dev
![](https://www.evanlin.com/images/2020/line-tw-dev-qr.png)

# 關於「LINE 開發社群計畫」

LINE 今年年初在台灣啟動「LINE 開發社群計畫」，將長期投入人力與資源在台灣舉辦對內對外、線上線下的開發者社群聚會、徵才日、開發者大會等，已經舉辦 30 場以上的活動。歡迎讀者們能夠持續回來察看最新的狀況。詳情請看:

- [2019 年 LINE 開發社群計畫活動時程表](https://engineering.linecorp.com/zh-hant/blog/line-taiwan-developer-relations-2019-plan/)
- [LINE Taiwan Developer Relations 2019 回顧與 2019 開發社群計畫報告](https://engineering.linecorp.com/zh-hant/blog/line-taiwan-developer-relations-2019/)
- [2020 年 LINE 開發社群計畫活動時程表](https://engineering.linecorp.com/zh-hant/blog/2020-line-tw-devrel/)
