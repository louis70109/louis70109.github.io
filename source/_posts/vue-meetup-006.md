---
title: Vue.js Taiwan 006 小聚花絮分享
tags:
  - Vue
  - LINE
categories: 研討會
date: 2020-08-20 12:31:04
---

![](https://i.imgur.com/BSwS13h.jpg)

# 前言

大家好，我是 LINE Taiwan Technology Evangelist - NiJia Lin，身為場地提供方也很感謝 Vue.js Taiwan 的大家配合相關防疫流程並座無虛席，在此也跟各位分享本次參與的心得，並且也希望透過社群分享的力量能夠讓聊天機器人的開發動能更加的盛大。(熊大也表示有新朋友來了 😆)

- Vue.js Taiwan 社群：https://www.facebook.com/groups/vuejs.tw/
- 活動報名頁面：https://vuejs.kktix.cc/events/v-tw-meetup-006
<!-- more -->

![](https://i.imgur.com/XU0u7k3.jpg)

# 開場

![](https://i.imgur.com/g6MUhEK.jpg)
一開始由我們 DelRel Team 的 Evan 快速跟大家講解 LINE Tech Fresh 的相關計畫與申請流程，若是學生身份的朋友歡迎參考[這個連結](https://engineering.linecorp.com/zh-hant/blog/tech-fresh-2020/)，LINE 裡面不只高手雲集，且擁有很棒的環境！趕快來加入我們吧 🙂。

# Nuxt i18n 實戰經驗分享

![](https://i.imgur.com/6WJkYGp.jpg)

首先由 LINE Today 的前端工程師 - Abel 為大家帶來在實際上線產品中使用 i18n 的甘苦談。

<script async class="speakerdeck-embed" data-id="19960efd47314fba932e8403a9466108" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

一開始帶了一個簡單的範例介紹設定檔與如何讓 i18n 知道要切換什麼語系，但隨著專案的成長與支援的語系越來越多情況下就會造成 loading 很重，以 LINE Today 來說他就支援了來說他就支援了 **4 種語系**並有 **2500** 多個訊息需要切換，因此就需要使用 lazy loading 來幫忙。

<script async class="speakerdeck-embed" data-slide="6" data-id="19960efd47314fba932e8403a9466108" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

接著講者提到因為 LINE Today 中有許多不同的 `模組(Module)`，會隨著不同區域的需求而導入，而載入時為了不影響原本的渲染而會使用 `Async`的方式來導入模組至 Component 中。

<script async class="speakerdeck-embed" data-slide="8" data-id="19960efd47314fba932e8403a9466108" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

在前面的條件都滿足的情況下就遇到了第一個問題，網頁載入速度太慢(效能只有 60 分)，並且知道哪些檔案拖慢的載入速度。

<script async class="speakerdeck-embed" data-slide="11" data-id="19960efd47314fba932e8403a9466108" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

雖然前面提到使用 lazy loading 來增加使用速度，但也因為訊息量太多(4 語系、2500 訊息) 讓 import 時特別慢，在這種情況下就需要將訊息量批次處理，這邊講者也分別講解了各個 Task 放的數量的 Performance 比較，雖然劃分不同的 Task 可以讓載入加快，但也因為 JSON 需要 merge 而速度不見得比整包快，在簡報中 case 範例中的權衡制宜下最好情況就是 100x7 是 best practice，數量在低效率影響有不多。

<script async class="speakerdeck-embed" data-slide="12" data-id="19960efd47314fba932e8403a9466108" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

接著提到的第二個問題則 `Server Side Rendering`(`SSR`) 語系切換時 Render 的問題，因為是 Async Component 的關係導致在第二個請求進入時因為沒有進入 `import message` 的環節而讓文字出錯。

<script async class="speakerdeck-embed" data-slide="22" data-id="19960efd47314fba932e8403a9466108" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

由於一開始尚未切分 Task 時直接 SSR 即可，但現行已劃分 Task 的情況下會出錯，因此這部分則是讓 `Client Side Rendering`(`CSR`) 來協助處理。

> 簡報中都有隨著 sample code，大家可以參考看看 🎁。

<script async class="speakerdeck-embed" data-slide="23" data-id="19960efd47314fba932e8403a9466108" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

最後分享的部分則是在寫 Javascript 都需要注意的部分，Object literal & JSON parse 的速度比較，這部分較多是與 V8 引擎相關實作上的問題([參考](https://v8.dev/blog/cost-of-javascript-2019))，簡單來說若有使用 i18n 儲存相關訊息時記得使用 JSON 來處理。

<script async class="speakerdeck-embed" data-slide="28" data-id="19960efd47314fba932e8403a9466108" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

# 活動小結

參加社群活動除了認識朋友以外還能讓腦力激盪一下，可以讓大家使用更低的成本學到自己尚未習得的技能，台灣擁有這麼多這麼棒的社群何不來參加學習一下新技能呢 😊？

![](https://i.imgur.com/RJnjJ7r.jpg)

立即加入「LINE 開發者官方社群」官方帳號，就能收到第一手 Meetup 活動，或與開發者計畫有關的最新消息的推播通知。▼

「LINE 開發者官方社群」官方帳號 ID：@line_tw_dev
![](https://i.imgur.com/gxHgAzB.png)

# 關於「LINE 開發社群計畫」

LINE 今年年初在台灣啟動「LINE 開發社群計畫」，將長期投入人力與資源在台灣舉辦對內對外、線上線下的開發者社群聚會、徵才日、開發者大會等，已經舉辦 30 場以上的活動。歡迎讀者們能夠持續回來察看最新的狀況。詳情請看:

- [2019 年 LINE 開發社群計畫活動時程表](https://engineering.linecorp.com/zh-hant/blog/line-taiwan-developer-relations-2019-plan/)
- [LINE Taiwan Developer Relations 2019 回顧與 2019 開發社群計畫報告](https://engineering.linecorp.com/zh-hant/blog/line-taiwan-developer-relations-2019/)
- [2020 年 LINE 開發社群計畫活動時程表](https://engineering.linecorp.com/zh-hant/blog/2020-line-tw-devrel/)
