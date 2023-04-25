---
title: 'LINE Taiwan x Java 年度盛會：JCConf 2020'
tags:
  - LINE
  - DevRel
  - 研討會
categories: '研討會'
date: 2020-12-13 02:42:18
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

![](https://nijialin.com/images/2020/jcconf/booth.jpg)

# 前言

大家好，我是 LINE Taiwan Technology Evangelist – NiJia Lin。這次非常開心能以 LINER 身份參加 [JCConf 2020](https://jcconf.tw/2020/)，與各界 Java 高手們在**台大醫院國際會議中心**享受 Java 社群的強大動能與活力！而 LINE 身為黃金級贊助商之一，特別為 JCConf 準備 Keynote 議程，也有從眾多優秀的議程競爭者中脫穎而出的 LINER 講者，向與會者介紹最新服務與開發技術。並且也在大會現場設置了公司攤位，由多位充滿專業與熱忱的 LINE 開發人員定時為與會者提供短講，介紹 LINE SHOPPING、LINE SPOT、LINE TODAY、LINE Client、LINE Pay 等團隊的工作內容，接下來就來複習一下當天的內容吧！

<!-- more -->

其他同仁們的心得分享：

- [A trip to JCConf 2020](https://engineering.linecorp.com/zh-hant/blog/a-trip-to-jcconf-2020/)
- [JCConf 2020 大會心得分享 – RSocket 革命，為了 Reactive Programming 而生的高效率通訊協定](https://engineering.linecorp.com/zh-hant/blog/jcconf-2020-sharing-rsocket/)

# Keynote

![](https://nijialin.com/images/2020/jcconf/keynote.jpg)

於大會的 Keynote 時間由 LINE EC Lead - Ange 快速帶大家認識 LINE EC 主要負責的內容：

<script async class="speakerdeck-embed" data-slide="3" data-id="9f5b83bb0fec42ea9327750597018ff7" data-ratio="1.41436464088398" src="//speakerdeck.com/assets/embed.js"></script>

- [LINE 購物](https://buy.line.me/): 為一個**導購平台**，讓消費者可以在 LINE 的平台上即可同時搜尋與比較各大購物網站的價格，各大節慶時常有優惠活動，因此先 LINE 購物再購物！
  - 相關技術文章 : [LINE Shopping App with Flutter: 使用 Flutter 來打造 LINE 購物的手機雙平台應用](https://engineering.linecorp.com/zh-hant/blog/line-shopping-app-with-flutter/)
- [LINE 口袋商店](https://ezstore.line.me/): LINE 官方帳號內建的電子商務服務，認證帳號只需進一步完成 LINE Pay 註冊，即可快速打造在 LINE 上的電商平台！消費者只要在 LINE 平台上就可以輕鬆完成商品資訊問答、付款以及追蹤出貨狀況等等，大大簡化了消費者的購物流程！
- [LINE 酷券](https://giftshop-tw.line.me/): 以券類為主軸，讓大家可以在上面以划算的價格買到優惠券

<script async class="speakerdeck-embed" data-slide="5" data-id="9f5b83bb0fec42ea9327750597018ff7" data-ratio="1.41436464088398" src="//speakerdeck.com/assets/embed.js"></script>

因為 LINE 在各種節日時常會有大流量的問題，因此在日常開發上講者就快速整理了一些較大方向所需面對的挑戰。

<script async class="speakerdeck-embed" data-slide="6" data-id="9f5b83bb0fec42ea9327750597018ff7" data-ratio="1.41436464088398" src="//speakerdeck.com/assets/embed.js"></script>

同時也因為團隊是採用 Scrum，因此交付週期以兩個禮拜一個週期來快速交付新功能，讓平台可以持續推動更多優秀的功能給大家體驗。

當然除了吸引人的福利外(開放風氣、Training、Team building...等等)，若你的技能與下列有關(不用全部)，歡迎至 [LINE Career](https://career.linecorp.com/linecorp/career/list) 投遞履歷，同時也歡迎大家投遞不同的職缺喔！

<script async class="speakerdeck-embed" data-slide="8" data-id="9f5b83bb0fec42ea9327750597018ff7" data-ratio="1.41436464088398" src="//speakerdeck.com/assets/embed.js"></script>

## 大會快講 - Migrating to JUnit 5 / Joanna Hu

**為何整合到 JUnit5**

- 高度支援 IDE 與 build tool
- 容易從 JUnit4 移植
- 並且有相關新功能

<script async class="speakerdeck-embed" data-slide="1" data-id="e939086a95c2498f8f683bf4c944e3af" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

如果你是 JUnit4 的開發者，如何來 Migrating 到 JUnit5 呢？

- 升級你的 Maven 到 3.63 以上
- 升級你的 Gradle 到 4.6 以上
- 先寫一些使用 JUnit5 的測試案例
- 移植舊有 JUnit4 的測試
- Package 有更換過就可以繼續使用
- 根據 JUnit4 Rule 測試，改寫成 JUnit5 Extension
- 透過換名字方式即可，也可以使用 IntelliJ IDEA 的功能來置換

> 更詳細內容可參考 [2020/10/21 TWJUG@LINE](https://engineering.linecorp.com/zh-hant/blog/2020-10-21-twjug/#migrating-to-junit-5--joanna-hu)，裡有更多議程的介紹。

## 大會快講 - Introduction to AssertJ / Andy Chen

- AssertJ 可以更容易來陳述與表達 test case 原本的意思（語意上）
- AssertJ 可以更清楚表達 test failure 的狀況
- 更少的 code 可以有更精準的表達

> 更詳細內容可參考 [2020/10/21 TWJUG@LINE](https://engineering.linecorp.com/zh-hant/blog/2020-10-21-twjug/#introduction-to-assertj--andy-chen)，裡有更多議程的介紹。

<script async class="speakerdeck-embed" data-slide="1" data-id="62c0abf65c024c2190772278bb8a37fa" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

## 攤位快講 - [LINE SHOPPING(購物)](https://buy.line.me/)

![](https://nijialin.com/images/2020/jcconf/client2.jpg)

作為一個導購的入口整合了各大電商網站，在節慶時特別容易遇到流量問題，因此在系統結構上就會使用到一些技術或工具，如 CDN、Kubernetes、Cache Server...來確保流量進來時的穩定性：

<script async class="speakerdeck-embed" data-slide="14" data-id="50946b9cde9640ad979628de0eaa3919" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

除了在 Keynote 已經分享過的 Technology Stack 以外，團隊也有在 Scrum 上細分角色，以確保每人都有負責到屬於自己的區塊。

<script async class="speakerdeck-embed" data-slide="23" data-id="50946b9cde9640ad979628de0eaa3919" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

## 攤位快講 - TW Client team

![](https://nijialin.com/images/2020/jcconf/shopping.jpg)

Client Team 主要負責有以下部分，從頁籤分類、 SDK 到 TODAY 以及 SHOPPING APP:

<script async class="speakerdeck-embed" data-slide="4" data-id="3a683b91ae7d4b69880745496b168902" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

<script async class="speakerdeck-embed" data-slide="10" data-id="3a683b91ae7d4b69880745496b168902" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

> 在 12/18 的 [TECHPULSE 2020](https://engineering.linecorp.com/zh-hant/blog/line-taiwan-techpulse-2020/) 中也有許多 LINER 會在議程中分享 Client 相關主題(Flutter、螢幕長截圖)

## 攤位快講 - LINE TODAY

![](https://nijialin.com/images/2020/jcconf/today.jpg)

<script async class="speakerdeck-embed" data-slide="2" data-id="452c9831a78444178018170da6c26e0c" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

做為大家日常生活中都會用到的內容供應服務，TODAY 以`多樣化內容`、`Notification`、`Social`、`Live` 為主，以下簡單列一些常見提供的內容：

<script async class="speakerdeck-embed" data-slide="5" data-id="452c9831a78444178018170da6c26e0c" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

而身為一個大型的內容服務，架構上也整合了許多功能(推薦系統、CDN、CMS...)：

<script async class="speakerdeck-embed" data-slide="15" data-id="452c9831a78444178018170da6c26e0c" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

也因為 LINE TODAY 每天都會接收到許多流量，同時需要提供良好的系統給使用者，因此講者也很佛心的幫大家整理出來：

<script async class="speakerdeck-embed" data-slide="23" data-id="452c9831a78444178018170da6c26e0c" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

## 攤位快講 - LINE Pay

![](https://nijialin.com/images/2020/jcconf/pay.jpg)

作為一個與行動支付相關的服務，LINE Pay 提供了許多功能:

<script async class="speakerdeck-embed" data-slide="2" data-id="d9bd6ad263c64682893b5475d715469f" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

<script async class="speakerdeck-embed" data-slide="6" data-id="d9bd6ad263c64682893b5475d715469f" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

大家再熟悉不過的畫面

<script async class="speakerdeck-embed" data-slide="10" data-id="d9bd6ad263c64682893b5475d715469f" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

在開發上也是經過縝密的流程才能造就現今的 LINE Pay，也因為與支付有關，所以從 Plan -> Security -> Develop(FE, BE) -> QA 都會有層層把關來確保服務品質。

<script async class="speakerdeck-embed" data-slide="13" data-id="d9bd6ad263c64682893b5475d715469f" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

當然除了相關功能介紹外，上述也有相關開發的工具展示供大家參考，而若你對於更細節內容有興趣的話可以收看 LINE Developer Meetup 13 - LINE Pay Kevin Hsiao 的分享：

<iframe width="560" height="315" src="https://www.youtube.com/embed/u9gkqcTH6rM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 攤位快講 - LINE SPOT

![](https://nijialin.com/images/2020/jcconf/spot.jpg)

這部分有另一篇更詳細介紹，請[參考此篇](https://engineering.linecorp.com/zh-hant/blog/serving-location-based-data/)

<iframe width="560" height="315" src="https://www.youtube.com/embed/Dir0iUpAjH4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<script async class="speakerdeck-embed" data-slide="13" data-id="cc7a74a469d24aa0bbd8493d1df76926" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

## 攤位快講 - LINE Travel

![](https://nijialin.com/images/2020/jcconf/travel.jpg)

<script async class="speakerdeck-embed" data-slide="4" data-id="63a32ef2be4545e6aa6b4b6d704fd223" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

作為一個旅遊服務，LINE Travel 提供了許多與旅遊規劃相關功能，如 Co-editing、POI 介紹與推薦、地圖規劃...此外也提供了一個會員市集，深度整合了各大旅遊平台，讓大家可以如 [LINE 購物](https://buy.line.me/)一樣比價並且導向至相對應的平台上，讓大家的選擇可以更多樣性。

<script async class="speakerdeck-embed" data-slide="10" data-id="63a32ef2be4545e6aa6b4b6d704fd223" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

# 活動小結

以上攤位於 `12/18` 的 [LINE TAIWAN TECHPULSE 2020](https://techpulse.line.me/)皆會有展出，且會有許多相關團隊的同仁們會在大會議程上與大家分享主題，報名只到 **12/13** 晚上 23:59 為止，趕快手刀報名才不會錯過這千載難逢的機會！

立即加入「LINE 開發者官方社群」官方帳號，就能收到第一手 Meetup 活動，或與開發者計畫有關的最新消息的推播通知。▼

「LINE 開發者官方社群」官方帳號 ID：@line_tw_dev
![](https://www.evanlin.com/images/2020/line-tw-dev-qr.png)

# 關於「LINE 開發社群計畫」

LINE 今年年初在台灣啟動「LINE 開發社群計畫」，將長期投入人力與資源在台灣舉辦對內對外、線上線下的開發者社群聚會、徵才日、開發者大會等，已經舉辦 30 場以上的活動。歡迎讀者們能夠持續回來察看最新的狀況。詳情請看:

- [2019 年 LINE 開發社群計畫活動時程表](https://engineering.linecorp.com/zh-hant/blog/line-taiwan-developer-relations-2019-plan/)
- [LINE Taiwan Developer Relations 2019 回顧與 2019 開發社群計畫報告](https://engineering.linecorp.com/zh-hant/blog/line-taiwan-developer-relations-2019/)
- [2020 年 LINE 開發社群計畫活動時程表](https://engineering.linecorp.com/zh-hant/blog/2020-line-tw-devrel/)

# 參考

- [LINE for Business](https://tw.linebiz.com/column/lac-verified/)
- [LINE TAIWAN TECHPULSE 2020](https://engineering.linecorp.com/zh-hant/blog/line-taiwan-techpulse-2020/)
