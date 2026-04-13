---
title: 開發結合 LINE Chatbot 的簡易彈幕系統
categories: 應用
date: 2021-01-11 12:50:28
tags: ['LINE', 'Chatbot', 'Vue3', 'OBS']
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

![](https://nijialin.com/images/2021/bullets/bullets-sample1.gif)

去年下半年時於 [COSCUP 2020](https://coscup.org/2020/) 的閉幕閃電秀中與 [Chatbot 社群小聚](https://github.com/Chatbot-Taiwan/meetups/blob/master/taipei/2020.md#chatbot-meetup-23-at-onramp-studio)看到社群朋友展示使用 LIFF 來發射彈幕覺得有趣又回憶滿滿，從以前在看**ニコニコ動画**時就很常看到彈幕出現在影片中(甚至有時候彈幕還比影片還好笑)，而透過這樣的互動讓觀眾並及時回饋，拉近活動(影片、直播、演唱會...)與觀眾的距離。想到去年因為疫情需要把社群聚會改成線上，剛好在前一陣子搜尋到[這篇文章](https://qiita.com/youtoy/items/051dc658025a3b21c7f0)，以下就使用 Chatbot 搭配文章在使用 OBS 來使用它！

<!-- more -->

> 完整專案: [louis70109/Screen-LINE-Bullets](https://github.com/louis70109/Screen-LINE-Bullets)

# 介紹

## [GSAP](https://greensock.com/docs/v3/Installation)

對於一個動畫苦手卻又喜歡看特效的人有工具就再好不過了，除了可以自己寫 CSS Animation 以外，還可以使用 GSAP 這個套件來輔助，以下就使用參考文章中的範例來大概解釋一下運作原理

<script src="https://gist.github.com/louis70109/886d43a4a5b8ca1a24429c147fa35baa.js"></script>

- 建立一個 `createText()` 函式讓 Javascript 產生`個別彈幕的 HTML`
- 用`id="button01"`按鈕監聽 **click 事件**來啟動 createText() 函式
- 24, 25 行: 使用亂數並以`視窗上方`(`Top`)為起點建立一個`隨機位置`
- 26, 27 行: 加入文字於`子節點`(`子彈`)，再將整個 div 加入於 <body> 中(整個畫面)
- 針對特定 id 的 `<div>子彈` 進行動畫(右至左)，`duration` 則是移動速度
- 31 行: 跑到最左邊後要把`子彈`刪除

## 讓 Websocket 連結 Chatbot 跟前端吧！

## Chatbot + API

首先先說明一下 Chatbot 這部分，一般來說寫 Chatbot 都是使用 Web API 的形式接收 Webhook 事件，但因為彈幕是即時性的且現在需求無需儲存文字，因此就使用 Websocket 來溝通前後端啦！

> NodeJS Webhook 寫法參考這篇: [JavaScript | WebSocket 讓前後端沒有距離](https://medium.com/enjoy-life-enjoy-coding/javascript-websocket-%E8%AE%93%E5%89%8D%E5%BE%8C%E7%AB%AF%E6%B2%92%E6%9C%89%E8%B7%9D%E9%9B%A2-34536c333e1b)

那我是怎麼讓 Chatbot Webhook 事件透過 Websocket 送出去呢？答案很簡單，參考[這份程式碼](https://github.com/louis70109/Screen-LINE-Bullets/blob/master/chatbot/index.js)或`下方 Gist`

<script src="https://gist.github.com/louis70109/fa0ae938a4b6f141e95191ff910a959e.js"></script>

- 第**14、15 行**，我設定了`BULLETS`、`USER_AVATAR` 兩個全域變數
- **45 行** 則是使用 [Quick Reply](https://developers.line.biz/en/docs/messaging-api/using-quick-reply/) 功能讓用戶可以快速發送訊息
- 透過 **65 行**把 Socket Server 與 API Server 綁在一起
- 接著第 **67~82 行**的 Websocket 中使用 `setInterval()` 來週期性地送文字出去
- 發送後需要把`全域變數`清空，否則前端會出現 undefined

> 或許讀者已經注意到一開始的圖片是使用手機點選 [Quick Reply](https://developers.line.biz/en/docs/messaging-api/using-quick-reply/)，這部分初步考量是為了避免來賓亂打字導致現場不可收拾，讀者若有照著實作請斟酌使用囉！

## 彈幕程式碼解析

這邊為了方便我使用了 Vue 3，參考[這頁的程式碼](https://github.com/louis70109/Screen-LINE-Bullets/blob/master/frontend/src/components/Barrage.vue)並引入了 `{ onMounted, onUnmounted }` 來協助網頁生命週期當眾的`掛載`以及`卸載`，以下就來敘述一下程式碼區塊的用途：

<script src="https://gist.github.com/louis70109/308be6a80d2e7977926ae099bb6471b8.js"></script>

- 12 行: 從環境變數中取得 `VUE_APP_WEBSOCKET_URL`並建立 Websocket 連線
- 19 行: 把 Websocket 的 `onmessage` 監聽事件掛載起來
- 29 行: createText() 為建立一個`子彈`的函式，當中除了上述有提到的隨機位置，因為訊息是從 Chatbot 來並夾帶著用戶的大頭貼 CDN 連結，因此在 `42 行` 就建立一個使用 Bootstrap 的**元素**(**Element**)
- 由於因為 Chatbot 是週期性發送訊號，會有沒內容的情況，因此需要加判斷式(Condition)來避免錯誤的產生

## 在本地端啟動專案

- 先開三個終端機
- 第一個進入前端(frontend)資料夾，先`npm install`後`npm run dev`執行程式
- 第二個進入 chatbot 資料夾，一樣`npm install`後`npm run dev`執行程式
- 第三個使用 `npx ngrok http -region=ap --host-header=rewrite 3000` 來建立一個暫時含有 SSL 的網址
  - npx 在安裝 NodeJS 時就安裝的工具，可以遠端執行一個終端指令，在用完之後會刪除，不會污染環境
  - 使用 ap 這個區域
  - 覆蓋網址的 Header，避免前端呼叫時 Header 是 localhost
  - 使用的 Port = 3000

> 你也可以部署上 Heroku，效果會是一樣的喔！

## 彈幕與 OBS 融合

> 若你正在照著本篇實作，請先[下載 OBS](https://obsproject.com/download)

![](https://nijialin.com/images/2021/bullets/1.png)

- 開啟 OBS 後，先建立一個場景，這邊我先放一張圖片跟視訊鏡頭讓畫面別那麼乾

![](https://nijialin.com/images/2021/bullets/2.png)

- 因為是使用瀏覽器來建立彈幕，因此接著按下面的`+`並選擇`瀏覽器`

![](https://nijialin.com/images/2021/bullets/3.png)

- 接著會彈出這樣的視窗，可以改成你喜歡的名字後確定

![](https://nijialin.com/images/2021/bullets/4.png)

- 確認後會出現這個頁面，由於是在**本地端 Localhost**操作，因此網址部分輸入`http://localhost:8080/`，且由於視窗關係，我選擇寬度 1200 x 高度 600

![](https://nijialin.com/images/2021/bullets/5.png)

- 因為會隨著建立順序，會讓瀏覽器的**排序層級**在下方，因此需要將它**移至最上層**，畢竟彈幕就是要最先讓使用者看到呀！

![](https://nijialin.com/images/2021/bullets/6.png)

## 成果

- 最後就可以在 Chatbot 中按下 Quick Reply 來跑彈幕囉！這樣是不是很好玩呢：）
- 最後你可以錄影或是透過串流來與觀眾玩玩看喔！

# 結論

目前這個彈幕系統還只是很陽春的版本，未來可以加上後台調整各種內容(文字、速度...)，若你對於前端有較深的理解或是想練練手，歡迎送 [Pull Request](https://github.com/louis70109/Screen-LINE-Bullets/pulls) 給我的 [Screen-LINE-Bullets](https://github.com/louis70109/Screen-LINE-Bullets)，同時也歡迎大家拿去玩玩，之後有個多應用會再分享給大家！

> 若對直播設定有興趣，請參考[如何只使用一台 Mac 進行直播 feat. SoundFlower, OBS, Youtube](https://nijialin.com/2020/11/29/mac-stream-soundflower/)

# 小結

立即加入「LINE 開發者官方社群」官方帳號，就能收到第一手 Meetup 活動，或與開發者計畫有關的最新消息的推播通知。▼

「LINE 開發者官方社群」官方帳號 ID：@line_tw_dev
![](https://www.evanlin.com/images/2020/line-tw-dev-qr.png)

# 關於「LINE 開發社群計畫」

LINE 今年年初在台灣啟動「LINE 開發社群計畫」，將長期投入人力與資源在台灣舉辦對內對外、線上線下的開發者社群聚會、徵才日、開發者大會等，已經舉辦 30 場以上的活動。歡迎讀者們能夠持續回來察看最新的狀況。詳情請看:

- [2019 年 LINE 開發社群計畫活動時程表](https://engineering.linecorp.com/zh-hant/blog/line-taiwan-developer-relations-2019-plan/)
- [LINE Taiwan Developer Relations 2019 回顧與 2019 開發社群計畫報告](https://engineering.linecorp.com/zh-hant/blog/line-taiwan-developer-relations-2019/)
- [2020 年 LINE 開發社群計畫活動時程表](https://engineering.linecorp.com/zh-hant/blog/2020-line-tw-devrel/)
