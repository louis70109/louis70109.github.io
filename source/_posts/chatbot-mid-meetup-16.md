---
title: 'LINE 開發社群計畫: 中部人的聊天機器人小小聚第 16 場心得分享'
tags:
  - LINE
  - Chatbot
categories: 研討會
date: 2021-07-18 23:34:33
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

![](https://nijialin.com/images/2021/chatbot-mid-16/1.png)

# 前言

大家好，我是 LINE Taiwan DevRel 團隊的 NiJia Lin，感覺已經許久沒有在社群上與大家分享相關的內容，本次受邀請參加「[2021/07/14 中部人的聊天機器人小小聚 第 16 場](https://chatbots.kktix.cc/events/chatbots-meetup-in-central-taiwan-016)」，能夠透過線上的方式帶各位會眾分享從最基本的 LINE Bot 操作開始認識，到一些大家常常會需要的 API 範例，再接著 Platform API 的更新內容，對於當天內容想回味的讀者們，趕快往下繼續看吧！

- 社團頁面：https://www.facebook.com/groups/chatbot.tw
- 活動報名頁面：https://chatbots.kktix.cc/events/chatbots-meetup-in-central-taiwan-016
- 共同筆記：https://hackmd.io/@chatbot-tw/chatbots-meetup-in-central-taiwan-016
- 活動簡報：https://speakerdeck.com/line_developers_tw/line-bot-ru-men-jie-shao-yu-platorm-api-geng-xin-zi-xun-202107
- 整場影片：https://www.youtube.com/watch?v=rZJ0yBSLaMc

<iframe width="560" height="315" src="https://www.youtube.com/embed/rZJ0yBSLaMc?start=386" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<!-- more -->

# LINE Bot 入門介紹與 Platform API 更新資訊

![](https://nijialin.com/images/2021/chatbot-mid-16/2.png)

---

<script async class="speakerdeck-embed" data-slide="6" data-id="d06175338bb24488b51bbd7bfcd0e32a" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

我們的服務要怎麼收到來自用戶的訊息呢？用戶會在 LINE 通訊軟體中輸入訊息，會打到 LINE Platform 中，接著再透過 Webhook 的方式打到你的服務(Server)上，而當中各位的所建立的 Channel 則是在 Platform 與 Server 之間，更多內容可以參考近期釋出的三篇指南：

- [LINE Bot 開發者指南詳解 1. 關於 LINE Bot](https://engineering.linecorp.com/zh-hant/blog/line-bot-guideline-1/)
- [LINE Bot 開發者指南詳解 – 2. 使用 Webhook URL 接收請求時的注意事項](https://engineering.linecorp.com/zh-hant/blog/line-bot-guideline-2/)
- [LINE Bot 開發者指南詳解 – 3 發送 API 請求時的注意事項](https://engineering.linecorp.com/zh-hant/blog/line-bot-guideline-3/)

<script async class="speakerdeck-embed" data-slide="9" data-id="d06175338bb24488b51bbd7bfcd0e32a" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

Provider 是各位需要注意的部分，它代表的是個人、公司或是一個組織，這部分大家在建立是要非常注意這個部分([Policy 參考](https://line.me/en/terms/policy/))，各位所建立的 Channel(可能是一隻 Bot、LINE Login...)是不能切換 Provider，因為在建立 Channel 時是當中有說明 Channel 是與當前 Provider 綁定相關資訊保護大家當中 Channel 的資訊，因此大家要建立時要再三注意當前 Provider 是誰喔！

接著提到了初階的 LINE Bot 事件介紹，相關內容大家可以參考下方兩篇文章：

- [開發 LINE 聊天機器人不可不知的十件事](https://engineering.linecorp.com/zh-hant/blog/line-device-10/)
- Flex Message 相關介紹 - [藉由 Flex Message Simulator 實現並發送測試用 Flex Message](https://engineering.linecorp.com/zh-hant/blog/how-to-send-flex-message-on-simulator/)

<script async class="speakerdeck-embed" data-slide="13" data-id="d06175338bb24488b51bbd7bfcd0e32a" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

這部分的內容介紹了引用內容 [NYCU Glocal Digital Service & Innovation Competition 黑客松活動紀錄](https://engineering.linecorp.com/zh-hant/blog/nycu-glocal-digital-innovation-competition-2021/#line-bot-apis-introduction-and-demonstration)中的部分：

- [取得使用者資訊](https://developers.line.biz/en/reference/messaging-api/#get-profile)
- [取得貼圖關鍵字範例](https://github.com/louis70109/MIT_flask-line-bot-demo/blob/master/reply_message/sticker_keywords.py)
- [更換 LINE Bot 頭像](https://developers.line.biz/en/docs/messaging-api/icon-nickname-switch/#specifying-icon-and-display-name) 讓使用者快速辨認當前身份
- 讓使用者在手機介面上快速回答的功能 – [Quick Reply](https://github.com/louis70109/MIT_flask-line-bot-demo/blob/master/reply_message/quick_reply_echo_bot.py)
- 強大而樸實無華，讓你可以建立選單給使用者滿滿的視覺饗宴 – [Rich Menu](https://developers.line.biz/en/docs/messaging-api/using-rich-menus/)
  - [建立步驟程式碼](https://github.com/louis70109/MIT_flask-line-bot-demo/tree/master/richmenu)

<script async class="speakerdeck-embed" data-slide="36" data-id="d06175338bb24488b51bbd7bfcd0e32a" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

Rich Menu 作為 LINE Bot 中很重要的一個圖文選單，能夠讓使用者可以快速點選服務功能按鈕，而當一隻 LINE Bot 功能越來越多時， Rich Menu 就需要切換。但過去在切換時需要透過較長的步驟才有辦法切換，在 [2021/06/21](https://developers.line.biz/en/news/2021/06/21/switch-between-multiple-rich-menus/) 的更新中透過 alias 的方式來加速切換 Rich Menu 的速度，詳細內容請大家泰國同事所分享的內容 - [透過 Rich Menu Switch Action 快速地切換 LINE 的個人化的 Rich Menu](https://engineering.linecorp.com/zh-hant/blog/rich-menu-alias-switch-action/)，當中接一步一步帶大家實作喔！

![](https://engineering.linecorp.com/wp-content/uploads/2021/07/7.gif)

<script async class="speakerdeck-embed" data-slide="40" data-id="d06175338bb24488b51bbd7bfcd0e32a" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

LIFF 近期釋出了 v2.11 版本，在之前的版本中二次跳轉後(`liff.init()`後)也會帶著 access_token 以及相關參數在路徑上，而在這次新版本訊息中 `liff.init()` 執行之後會將相關參數放入 local storage，避免開發者在用第三方追蹤工具追蹤時代上許多不必要的參數且不會洩漏使用者的 access_token 之類的參數導致資安問題產生。

<script async class="speakerdeck-embed" data-slide="41" data-id="d06175338bb24488b51bbd7bfcd0e32a" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

另一則更新則是小修正，修正了路徑中 `/` 在跳轉後會被 url encode 的問題，大家若有遇到類似的問題就麻煩將版本更新上來囉！

# 結論

許久沒有透過社群與大家分享相關平台更新資訊及相關內容，帶了一些在 [NYCU Glocal Digital Service & Innovation Competition 黑客松活動紀錄](https://engineering.linecorp.com/zh-hant/blog/nycu-glocal-digital-innovation-competition-2021/#line-bot-apis-introduction-and-demonstration) 中分享的內容，讓剛開始接觸 LINE Bot 的開發者可以更快速加入開發行列中，並帶到近期的平台的相關更新內容，後半段則由 LINE API Expert 們的分享

-  均民 - [Flex 開發人員工具與 richmenuswitch 新功能範例](https://hackmd.io/@taichunmin/chatbot-tw-202107)
- 佳新 - [Flex訊息真的很有彈性，文字也可以有紅字](https://www.slideshare.net/jarsing/flex-message-with-red-words-20210714)
- David Tung - [使用bash/cmd發送LINE訊息](https://hackmd.io/@chatbot-tw/chatbots-meetup-in-central-taiwan-016#%E9%96%83%E9%9B%BB%E7%A7%801%EF%BC%9A%E4%BD%BF%E7%94%A8bashcmd%E7%99%BC%E9%80%81LINE%E8%A8%8A%E6%81%AF---David-Tung)

最後歡迎大家踴躍分享你所開發的 LINE API 範例至[社群上](https://www.facebook.com/groups/linebot)吧！那我們就下次再見囉！
# 活動小結

立即加入「LINE 開發者官方社群」官方帳號，就能收到第一手 Meetup 活動，或與開發者計畫有關的最新消息的推播通知。▼

「LINE 開發者官方社群」官方帳號 ID：@line_tw_dev
![](https://www.evanlin.com/images/2020/line-tw-dev-qr.png)

# 關於「LINE 開發社群計畫」

LINE 今年年初在台灣啟動「LINE 開發社群計畫」，將長期投入人力與資源在台灣舉辦對內對外、線上線下的開發者社群聚會、徵才日、開發者大會等，已經舉辦 30 場以上的活動。歡迎讀者們能夠持續回來察看最新的狀況。詳情請看:

- [2019 年 LINE 開發社群計畫活動時程表](https://engineering.linecorp.com/zh-hant/blog/line-taiwan-developer-relations-2019-plan/)
- [LINE Taiwan Developer Relations 2019 回顧與 2019 開發社群計畫報告](https://engineering.linecorp.com/zh-hant/blog/line-taiwan-developer-relations-2019/)
- [2020 年 LINE 開發社群計畫活動時程表](https://engineering.linecorp.com/zh-hant/blog/2020-line-tw-devrel/)
- [2021 年 LINE 開發社群計畫活動時程表 (持續更新)](https://engineering.linecorp.com/zh-hant/blog/2021-line-tw-devrel/)
