---
title: 【COSCUP Throwback】LINE Fukuoka 團隊分享
categories: 研討會
date: 2021-08-12 15:35:29
tags: ['LINE', 'COSCUP']
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

![](https://nijialin.com/images/2021/coscup/lfk/1.png)

# 前言

相信在螢幕前觀看此篇文章得你一定對 LINE 貼圖小舖不陌生(畢竟都要買貼圖跟朋友"交流")，因為背後的技術與流量其實是需要非常龐大的架構才支撐的下，本次 COSCUP 的 LINE 攤位上就邀請到福岡的前端與 CSI 團隊來分享相關的內容！

<!-- more -->
<iframe width="560" height="315" src="https://www.youtube.com/embed/iq0nSph2ZNk?start=11268" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 前端團隊分享

![](https://nijialin.com/images/2021/coscup/lfk/2.png)

<script async class="speakerdeck-embed" data-slide="4" data-id="ed0d168dda894f92831ab078fa6fd106" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

大家在購買貼圖時可能會在 LINE APP 中直接進行，也可能透過網頁的方式去購買，當然兩者的入口不一樣，背後所需要處理的技術內容也就不同。
在 Web 的貼圖小舖中，需要了解現在用戶正在使用的平台為何，可能是 PC、手機 app 中的瀏覽器、LINE Web Browser，因為用戶當前所在的購買位置不同，許多內容中都需要很仔細的內部討論並更新，讓用戶不管在電腦或是手機上購買貼圖的體驗都會一致。

> 過去講者也有在 JSDC 分享 - [從開發 LINE 隨你填貼圖來談](<https://engineering.linecorp.com/zh-hant/blog/line-jsdc-2019/#JSDC2019%E6%B4%BB%E5%8B%95%E5%BF%83%E5%BE%97%E5%88%86%E4%BA%AB(@zh)-%E5%BE%9E%E9%96%8B%E7%99%BCLINE%E9%9A%A8%E4%BD%A0%E5%A1%AB%E8%B2%BC%E5%9C%96%E4%BE%86%E8%AB%87/Tzu-LinHuang>)

<script async class="speakerdeck-embed" data-slide="6" data-id="ed0d168dda894f92831ab078fa6fd106" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

當然會因為公司活動需求需要建立許多的 Campaign 頁面，與活動需求結合並讓活動中的用戶可以有入口能夠使用，畢竟前端與使用者是第一線接觸的地方，在當中也有人詢問：

> Q: 日文排版上會不會有什麼問題呢？
> A: 漢字與日文有筆畫問題，上頁面時需要再多跟設計確認版型。

<script async class="speakerdeck-embed" data-slide="8" data-id="ed0d168dda894f92831ab078fa6fd106" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

最近新出的貼圖訂閱服務，在日本上線時就非常的火紅，而近期也到了台灣以及印尼，若大家還在考慮想要購買哪個貼圖，不妨先訂閱看看來使用貼圖用飽飽～

- 貼圖訂閱介紹：https://store.line.me/stickers-premium/landing/zh-Hant

<script async class="speakerdeck-embed" data-slide="11" data-id="ed0d168dda894f92831ab078fa6fd106" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

隨著服務的成長，當然有些過往的程式碼就會需要維護，而在貼圖這部分都是 hybrid app 的方式，同時會有 iOS 與 Android 相關作業系統上的內容需要支援，並且讓使用體驗一致。

當然身為工程師的各位最需要的就是把更多重複性的內容自動化，除了增加大家開發上的效率，也讓往後的維護上可以更加有彈性喔！

> 補充：由於需要跟設計師、PM 等等的同仁一起工作，多少還是會用到日文溝通，大家對此工作有興趣也務必準備日文喔！

#### Tech Stacks

- React + Redux
- Styled Component
- Webpack
- Sentry
- Drone CI

> 如果你對福岡前端團隊有興趣，歡迎參考 [Front-end Engineer](https://linefukuoka.co.jp/en/career/list/engineer/2331)

## CSI 團隊 (Communication Service Integration)

<iframe width="560" height="315" src="https://www.youtube.com/embed/iq0nSph2ZNk?start=12031" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<script async class="speakerdeck-embed" data-slide="5" data-id="f5d9a47bbef44f418fdfe2ab7d1c9834" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

成員非常多元，當然除了本地的日本人之外，也有許多來自各地的人，大家看上圖就知道多多元了吧！基本上也都是用英文在討論事情，當然會日文也更好啦～(在議程後的討論也有分享不同國家的趣事)。

<script async class="speakerdeck-embed" data-slide="8" data-id="f5d9a47bbef44f418fdfe2ab7d1c9834" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

團隊中也負責到各式**貼圖系列**/**聊天室樣式**/**表情貼**的內容，畢竟大家 LINE 打開後與朋友聊天都會使用到各種貼圖，其背後負責技術的團隊就是他們啦～

其中在此團隊中還會負責到與各地 Family Service 串接的內容，上圖中除了貼圖之外，以台灣用戶來說會看到許多如 LINE 購物、熱點、禮物等等的服務入口，也是由 CSI 團隊透過 Proxy API 整合完之後，再傳輸給 LINE 的本體去渲染出服務的入口。

<script async class="speakerdeck-embed" data-slide="9" data-id="f5d9a47bbef44f418fdfe2ab7d1c9834" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

在錢包頁面中近期也持續在增進與與優化內容，需要與許多國家合作打造不同區域的入口，同時也要調整 CMS 的的內部流程，降低開發者介入查詢資料的部分。

<script async class="speakerdeck-embed" data-slide="11" data-id="f5d9a47bbef44f418fdfe2ab7d1c9834" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

挑戰的內容在每個正在成長的團隊中都會遇到，但如何面對問題產生時的做法也是時常需要演練的，資源調度也是需要處理的部分，演練遇到問題時所需要克服的障礙(如：成立專職 SRE 來協助團隊演練)，以及升級與維護一些技術服務，減少未來的維護成本。

當然做到跨國/服務的團隊在整合上就會有許多需要在整合上就會有許多需要挑戰以及更新的內容，相信在這邊大家不管對於國際觀、程式碼的理解應該都可以更上一層樓。

# 結論

![](https://nijialin.com/images/2021/coscup/resume.png)

最後在攤位的小角落安排履歷健檢的環節，意外的發現大家對於海外工作與相關履歷問題都非常有興趣，詢問度都非常高，甚至 COSCUP 活動都結束了大家都還在討論，重疊的人數都甚至達到 30、40 人左右，非常的踴躍！未來 LINE 的相關活動也歡迎大家前來與我們討論想了解的問題喔！

> 若對海外職缺有興趣，歡迎參考此連結：https://linefukuoka.co.jp/en/career/

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
