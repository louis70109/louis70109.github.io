---
title: Chatbot Developer Meetup - LINE API Platform Update Sharing
tags:
  - LINE
  - Chatbot
categories: 研討會
date: 2021-04-29 11:28:01
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

# 前言

透過每個月持續的分享，將 LINE 平台上有更新的內容透過更生活化的方式整理給大家，希望透過此篇文章讓大家認識一樣 LINE API 的魅力！如果已經有正在開發的聊天機器人，抑或是有不同的搭配技巧，都歡迎至[社群](https://www.facebook.com/groups/linebot/)或是各大討論區分享你的技術吧！

<!-- more -->

# 貼圖清單(Sticker)更新

在 LINE 平台上最有名的其中一個功能就是「**貼圖**」，時常在聊天室對話時都會使用有趣的貼圖回應對方，藉此讓對話變得生動有趣。而在近期的平台更新中將 LINE Chatbot 可使用的[貼圖清單](https://developers.line.biz/en/docs/messaging-api/sticker-list/#specify-sticker-in-message-object)再度更新釋出

<script async class="speakerdeck-embed" data-slide="3" data-id="b4de0b8800ae44b3bd652e3beadfb7c3" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

並且剛好搭上前一陣子的平台更新中 [Sticker Event](https://developers.line.biz/en/reference/messaging-api/#wh-sticker) 加入的**關鍵字**(Keywords)的參數， 透過使用此參數可以讓服務猜出使用者想表達的含義，而在本次的分享中使用 Messaging API + LINE Notify 實作出搶答小遊戲

- [範例專案](https://github.com/louis70109/line-sticker-lottery-example)：https://github.com/louis70109/line-sticker-lottery-example
  - Messaging API: 負責接收與判斷來自用戶的貼圖是否為熊大或是愛德華(綠毛蟲)
  - LINE Notify: 猜對的用戶透過 Notify 通知 admin (講者)

以下則是除了搶答小遊戲以外的貼圖小應用，常見如 [LINE Taxi](https://linetaxi.com.tw/) 在使用優惠卷時需要在聊天室內輸入相關資訊，讓伺服器可以判斷優惠卷是否存在，當用戶兌換完之後不論成功與否，都可以透過貼圖的方式並搭配一些生動的文字，也有助於增加使用者對於服務的依賴度。

<script async class="speakerdeck-embed" data-slide="8" data-id="b4de0b8800ae44b3bd652e3beadfb7c3" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

## LINE Login PKCE

LINE Login 本身支援 Web 以及 APP 的操作，因此在 Developer Console 中設定 Endpoint URI 時會有類似以下兩種寫法：

- https://example.com (Web 版)
- myapp://example.com (APP 版)

而在當 LINE Login 打回手機 APP 時，手機可以同時有 1~N 個 APP 同時監聽同一個 URI，這也導致可能有其他的 APP 在同時監聽時將使用者的 code (授權碼)拿去換取 access_token，透過其他手法獲取 Client id 與 Client Secret 後藉此操作使用者的資料以達到仿冒的步驟。

<script async class="speakerdeck-embed" data-slide="10" data-id="b4de0b8800ae44b3bd652e3beadfb7c3" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

而引入 PKCE 後，首先透過產生第一組亂數，並將亂數透過 SHA-256 的方式轉換成不可逆的私鑰，並將私鑰傳送給 LINE Server，接著再傳送剛剛產生的亂數給 LINE Server，讓 LINE Server 可以在內部比對這兩個值是否對等。在這個過程中順序非常的重要，若相反過來使用則會造成資訊外洩的問題。

<script async class="speakerdeck-embed" data-slide="11" data-id="b4de0b8800ae44b3bd652e3beadfb7c3" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

> 若對 LINE Login 裡使用 PKCE 的細節想更了解朋友請[參考官方網站](https://developers.line.biz/en/news/2021/04/09/line-login-pkce-support/)

## [LIFF v1 deprecated](https://developers.line.biz/en/news/2021/04/05/liff-v1-deprecated/)

隨著 LIFF v2 出了一段時間，在許多的社群分享已經文章中都建議大家從 v1 升級到 v2，除了使用既有的功能外也可以持續使用更多新的功能。而在近期的新聞當中，LIFF 團隊將不再繼續開發新功能於 v1 的版本上，但開發者們也無須擔心，目前僅進入**維護模式**，但在此還是建議大家安排時間將您的 v1 LIFF 版本改至 v2 吧！避免後續的問題產生～

- [轉移你的 LIFF: 從 Replace 到 Concatenate 模式](https://engineering.linecorp.com/zh-hant/blog/liff-replace-to-concatenate/)

<script async class="speakerdeck-embed" data-slide="12" data-id="b4de0b8800ae44b3bd652e3beadfb7c3" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

## [API 使用案例](https://lineapiusecase.com/en/top.html)

許多開發者(包含我)在初期開始接觸 LINE API 時總會覺得功能這麼多，常常都會有疑問，到底市面上的產品都是如何運行？有沒有使用案例？

本月釋出了[使用案例的網站](https://lineapiusecase.com/en/top.html)，讓各位開發者能夠在官方平台上看到許多的使用案例，讓大家可以透過 LINE 所提供的範例發想出更多更有趣的案例！屆時也歡迎大家來[社群分享](https://www.facebook.com/groups/linebot)～(貼文、GitHub、部落格都歡迎)

<script async class="speakerdeck-embed" data-slide="13" data-id="b4de0b8800ae44b3bd652e3beadfb7c3" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

## [LINE API 狀態查詢網站](https://api.line-status.info/)

當服務可能因為各種因素導致問題產生時，需要排除是否為自身服務或是介接的服務是否有發生什麼問題藉此排除狀態。因此在這次釋出了 [LINE API 狀態查詢的網站](https://api.line-status.info/) 供大家在不確定專案狀態時可以查詢做第一線的排除，大家可以使用 RSS 相關軟體訂閱它～

<script async class="speakerdeck-embed" data-slide="14" data-id="b4de0b8800ae44b3bd652e3beadfb7c3" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

> 更多資訊起參閱網站內說明

# 結論

<script async class="speakerdeck-embed" data-slide="17" data-id="b4de0b8800ae44b3bd652e3beadfb7c3" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

看了上述的內容是否想更了解 LINE 的工作呢？除了可以直接至 [LINE Career](<(https://careers.linecorp.com/jobs?co=Taiwan)>) 上投履歷之外，LINE 也即將在 **5/22** 的[招募日](https://engineering.linecorp.com/zh-hant/blog/2021-line-taiwan-developers-recruitment-day/)與大家見面，現場會有許多工程團隊的同仁來為大家介紹，歡迎大家來[報名頁面報名](https://linegroup.kktix.cc/events/20210522-devel)參加本次盛會！

### 【學生票申請方法】

請先翻拍或掃描學生證
寄送至 dl_dev_meetup@linecorp.com
資格符合後即可獲得邀請碼

### 【轉職邀請票申請方法】

寄送履歷至 dl_dev_meetup@linecorp.com
資格符合後即可獲得邀請碼

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
