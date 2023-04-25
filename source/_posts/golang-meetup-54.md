---
title: "LINE 開發社群計畫: Golang #54 場社群小聚心得"
tags:
  - DevRel
  - 研討會
  - Golang
  - LINE
categories: 研討會
date: 2020-09-26 00:42:06
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

![](https://nijialin.com/images/2020/golang-54/go-logo.jpg)

# 前言

大家好，我是 LINE Taiwan 的 Tech Evangelist - NiJia Lin。這次很開心再度參加了<mark>Golang 社群第 54 場</mark>的聚會活動，繼上次參加 53 場精彩的社群小聚之後這次總算來到 LINE 的辦公室舉辦，辛苦社群夥伴們的舉辦此次的活動，在此也跟各位分享本次參與的心得，並且也希望透過社群分享的力量能夠讓開發動能更加的盛大！

- Golang 社群活動頁面： [https://www.meetup.com/golang-taipei-meetup/events/272926722/](https://www.meetup.com/golang-taipei-meetup/events/272926722/)

九月的社群邀請到 Golang Taipei Gathering 社群的朋友來到 LINE 台北辦公室，並且一起來分享與討論 LINE 內部開發流程上針對 Golang 使用上的心得分享。這次的相關資訊可以在 [Golang Taipei Gathering #54](https://www.meetup.com/golang-taipei-meetup/events/272926722/) 找到所有的內容介紹。

今晚的 Golang meetup 由 Tech Evangelist － Evan (同時負責本次的社群) 開場，介紹了什麼是 LINE TECH FRESH 校園新星人才計劃。什麼是 LINE TECH FRESH ? LINE 台灣工程團隊每年透過 [LINE TECH FRESH – 技術新星人才計劃](https://career.linecorp.com/linecorp/career/detail/20000111/704/5570?classId=&locationCd=TW&page=)，招募資訊科技相關科系，或對此領域有所涉略的大學生 / 研究生加入 LINE 團隊進行長期實習 (一年期)，讓同學們能在國際級科技公司中觀摩學習。

更多內容，可以參考這篇文章： [LINE TECH FRESH – 技術新星人才計劃，實習經驗大公開](https://engineering.linecorp.com/zh-hant/blog/tech-fresh-2020/)

<!-- more -->

## 整場活動影片

<iframe width="560" height="315" src="https://www.youtube.com/embed/ShZsxFl0Ph4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

# 介紹

<script async class="speakerdeck-embed" data-id="2865bb1c091b4210b4852bb76828a769" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

LINE MUSIC 是一個強大且應用許多工具的服務，講者 - Wei 在本次社群分享中 Focus 在使用 Golang 的細節

> 很多人會很好奇 LINE MUSIC 有什麼長處？可以參考官方部落格的這篇([【LINE MUSIC】獨家去人聲跟唱 歌神換你當！](http://official-blog.line.me/tw/archives/83474706.html))。

<script async class="speakerdeck-embed" data-slide="28" data-id="6e0e7afe98124bf08f13f200f1b45010" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

> 此投影片為其他分享會中提到的部分

<script async class="speakerdeck-embed" data-slide="3" data-id="2865bb1c091b4210b4852bb76828a769" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

從 Agenda 中即可得知 MUSIC 為了讓整題服務更加順暢並因應不同的使用情境而套用相當多的工具，在這次的分享中也一一介紹每個工具是如何選擇且應用於當前的微服務。

<script async class="speakerdeck-embed" data-slide="5" data-id="2865bb1c091b4210b4852bb76828a769" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

在這張架構圖中清楚的展示在使用 golang 的微服務中，每個服務是透過何種流程去達到互相溝通的階段

外部的部分則分有<mark>Web</mark>、<mark>APP</mark>、<mark>External Resource</mark>(第三方資源)

- Web: 由於介面上相較 APP 來說比較複雜，因此在大部分的情況下會選用 GraphQL 增加彈性提供介面讓前端開發者可以有較多的選項去索取資源。
  - 推薦套件: [99designs/gqlgen](https://github.com/99designs/gqlgen)，並且很快地整合進 Gin 當中
- App: 因為介面大小較受限，因此大部分情況下是提供 RESTful API 讓 App 開發者去介接。
- External Resource: 當合作廠商更新了資源(ex: 音樂、歌手)時，為了確保資源的完整度則選擇透過 WebSocket 讓兩邊的 Server 溝通。

內部部分：

- 使用 [Gin] 框架來當作 API Gateway 介接前端的需求。
  - 在 Routing 可以很快速的劃分 Group 讓 Controller 共用。
  - 客製化 Middleware 很方便。
- 使用 gRPC 溝通內部服務降低 Response time([grpc-go](https://github.com/grpc/grpc-go))。
- 因為是為微服務，因此相呼叫 API 是必要的，講者推薦使用 [resty](https://github.com/go-resty/resty)，且還能客製化 Before & After 的 Middleware。

<script async class="speakerdeck-embed" data-slide="19" data-id="2865bb1c091b4210b4852bb76828a769" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

- Database 的部分使用 [GORM](https://github.com/go-gorm/gorm) 來介接 MySQL 加速開發，在使用 Preload、hook、Auto Migration 相關的都很方便。
- Redis 部分因為會因應場景處理 cookie、Session、Cache 的部分，這裡推薦使用 [go-redis](https://github.com/go-redis/redis)。
- Kafka 大多處理 Event log 的部分，因為已 Log 的使用情境不需要即時進資料庫，因此使用 Queue 當作 Middleware 降低資料庫的負擔，這裡推薦使用 [Shopify/sarama](https://github.com/Shopify/sarama)，使用情境的流程圖參考以下簡報：

<script async class="speakerdeck-embed" data-slide="41" data-id="2865bb1c091b4210b4852bb76828a769" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

- 前面提到了有使用 WebSocket 來介接資源，而 Server 端則是使用 [melody](https://github.com/olahol/melody) 來起服務。

在這個微服務剛起的時候講者是參考 [golang-standards/project-layout](https://github.com/golang-standards/project-layout) 結構來建立所有的目錄檔案，藉由集結眾人意志貢獻的 project 也可以代表 LINE 是很重視參與 Open Source 的相關使用。

每段程式中會有生命週期，當開發者在使用特定程式去相依注入(Dependency Injection)讓 Code 可以處理事件前後所需要做的相關功能(ex: 顯示錯誤 log 時可以發送 [Sentry](https://sentry.io/welcome/))，以下兩個套件可以參考 👍

- dig: https://github.com/uber-go/dig
- fix: https://github.com/uber-go/fx

上述介紹了許多在開發上使用工具的套件，最後一定要寫測試來確保自己交付的程式碼是具有可靠性，這邊講者就推薦 [testify 套件](https://github.com/stretchr/testify) 與 [goconvey](https://github.com/smartystreets/goconvey) 來操作測試相關的操作。

## 小結

雖然以上介紹了在 LINE MUSIC 裡使用的各種套件，但在 LINE 裡面審查 Open Source 是很嚴格的，會有相關專業同仁確保 Source code 沒有資安上的問題才可以使用，因此在這次 LINE MUSIC 的講者一次提供這個大補包介紹服務中的套件，若你也有介接相關的應用不妨參考一下 LINE MUSIC 參考過的套件吧！🙂

> 大家也來使用 [LINE MUSIC](https://music-tw.line.me/) 體驗一下由我們自己打造的音樂平台服務吧！

# 結論

因為有大家對於社群的支持才有這麼精彩的議程可以聆聽，身為場地提供方也很開心看到大家如此熱情地交流與享用美食，讓整個場地都熱絡了起來！歡迎大家踴躍參加不同的社群讓開發者文化風氣可以更加的活躍！😊

而在這次的 Keynote 中這次好不容易可以聽到 LINE MUSIC 團隊的成員為大家來分享服務如何運作以及已上線服務服役的套件們，相信對於來參加的開發者們可以帶來不小的幫助，尤其這些套件也是經由專業的 LINE 同仁的審查才可以使用，希望透過本篇的介紹能讓大家可以更快速的了解為什麼要使用它們。

若對相關服務還有興趣的話請大家持續關注我們喔！立即加入「LINE 開發者官方社群」官方帳號，就能收到第一手 Meetup 活動，或與開發者計畫有關的最新消息的推播通知。▼

「LINE 開發者官方社群」官方帳號 ID：@line_tw_dev
![](https://www.evanlin.com/images/2020/line-tw-dev-qr.png)

# 關於「LINE 開發社群計畫」

LINE 今年年初在台灣啟動「LINE 開發社群計畫」，將長期投入人力與資源在台灣舉辦對內對外、線上線下的開發者社群聚會、徵才日、開發者大會等，已經舉辦 30 場以上的活動。歡迎讀者們能夠持續回來察看最新的狀況。詳情請看:

- [2019 年 LINE 開發社群計畫活動時程表](https://engineering.linecorp.com/zh-hant/blog/line-taiwan-developer-relations-2019-plan/)
- [LINE Taiwan Developer Relations 2019 回顧與 2019 開發社群計畫報告](https://engineering.linecorp.com/zh-hant/blog/line-taiwan-developer-relations-2019/)
- [2020 年 LINE 開發社群計畫活動時程表](https://engineering.linecorp.com/zh-hant/blog/2020-line-tw-devrel/)
