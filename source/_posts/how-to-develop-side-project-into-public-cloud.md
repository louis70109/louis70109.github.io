---
title: 【從零開始養】讓 Public Cloud 增加你的能見度！
tags:
  - GCP
  - Google
  - LINE
categories: 研討會
date: 2023-07-29 16:26:06
---


![](https://nijialin.com/images/2023/coscup/1.jpg)

# 前言

大家好，我是 LINE Taiwan 的技術傳教士 Nijia (a.k.a 忍者)，這次很榮幸可以來 [COSCUP 2023 分享](https://coscup.org/2023/zh-TW/session/PT8VT7)業餘時間作 Side project 的一些心得，這次透過文章跟大家分享經驗談！

簡報：https://speakerdeck.com/line_developers_tw/how-to-develop-side-project-to-public-cloud

<!-- more -->

# 介紹

以下透過我這幾年收到也是我過去的各種疑問，分享給大家一些經驗談。

## 為什麼要做 Side Project ⁉️

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/778f40dcaf544983b4027d68aaccd9be?slide=5" title="【從零開始養】讓 Public Cloud 增加你的能見度！" allowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 100%; height: auto; aspect-ratio: 560 / 314;" data-ratio="1.78343949044586"></iframe>

這題在我接觸社群前，是很排斥的，其因怕被電、程式寫不乾淨、沒內容...etc，直到開始參與社群後與許多前輩請教相關問題，大家普遍都會建議透過以下四點，解決前面遇到的這些疑問：

- 技術實驗
- 解決日常問題
- 累積作品
- 擦亮履歷

我們會在開發 side project 時，參考許多網路上的專案，從 try & error、看到各種不同寫法，來增進自己對於程式品質這件事，畢竟我認為萬是都是從「**模仿**」開始，沒有一開始就可以把東西寫的又好、、有創意、又有創意(如果有請介紹)，我也是透過 side project 逐步增進自己對於該領域的熟悉度，一旦熟悉了，很多東西都會越來越上手！

## 我做完了！要怎麼放出去(佈署)呢？

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/778f40dcaf544983b4027d68aaccd9be?slide=10" title="【從零開始養】讓 Public Cloud 增加你的能見度！" allowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 100%; height: auto; aspect-ratio: 560 / 314;" data-ratio="1.78343949044586"></iframe>

從個人與身邊的大大們經驗，過往都會從許多的雲服務平台去架設自己的服務，初期都會先找許多的免費方案先操作，很多網路上的資源也都有許多的文件，讓大家在使用時可以更無痛，尤其身在台灣的我們其實有很多服務是很方便的，也有中文化，推薦大家創意點子做出來後，可以嘗試各種雲端平台，找到自己順手的使用～

## 關於付錢開發 Side Project 這檔事...

老實說這事我也掙扎很久，但當你有自己架設 Linux、Nginx、防火牆、DNS、proxy...etc，會知道花這些時間的成本是很大的(除非有興趣)，但一般來說，我們想的點子或是實驗性專案，初期流量不高的情況下，不需要這麼複雜的基礎設施，尤其像是在開發 LINE Bot 時，我們只需要一個有 HTTPS 的 callback URL 就好。

因此這個時候就可以善用這些雲平台，普遍會有的優點就是：

- 流量計價，會有一定額度的免費
- 提供 HTTPS
- 不用處理基礎設施，安裝指令即可上線
- 依照不同雲服務，會提供各種好用的工具，例如：
  - 介面上即可設定觸發條件，整合更多的服務
  - 跨平台搬家支援！ (Knative)

光這幾點，就足夠掏出魔法小卡下去使用了！不論是否為實驗行專案，或是公司專案要先上線，都推薦可以嘗試使用各種雲服務來把點子送進市場檢驗！

## 不用 Dockerfile 也能佈署，真香！

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/778f40dcaf544983b4027d68aaccd9be?slide=16" title="【從零開始養】讓 Public Cloud 增加你的能見度！" allowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 100%; height: auto; aspect-ratio: 560 / 314;" data-ratio="1.78343949044586"></iframe>

[Buildpacks](https://buildpacks.io/) 是一個
可以幫助開發者將應用程式部署到雲端平台上，最早是起源於 Heroku。

Buildpacks 可以自動偵測應用程式所需的語言、框架和相依性，並將其轉換成可執行的容器映像檔。讓開發者可以專注於撰寫程式碼，而不用擔心部署的細節。

同時也越來越多雲服務也陸續支援 Buildpacks，透過它，我們在初期就不用苦惱專案到底要怎麼上這些 Cloud，交給它，許多事情都會被神奇的魔法完成！

> 那邊可以參考範例呢？歡迎參考我的專案: [FastAPI-Cloud-Run-Sample](https://github.com/louis70109/FastAPI-Cloud-Run-Sample)

## 我沒想法，可以做什麼題目？

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/778f40dcaf544983b4027d68aaccd9be?slide=25" title="【從零開始養】讓 Public Cloud 增加你的能見度！" allowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 100%; height: auto; aspect-ratio: 560 / 314;" data-ratio="1.78343949044586"></iframe>

身處台灣的你我，一定知道 LINE，因此可以先從 [LINE Bot](https://developers.line.biz/en/services/messaging-api/) 開始著手，嘗試把些創意發想從這邊開始實作，省去許多的畫面開發的工作，先讓點子可以讓周遭朋友先試用！

另一方面，LINE Bot 與許多雲服務的特性很像，都是 Event-Driven 的特性，當 request 進來時才會觸發功能，在屬性相像的平台，就很適合把他們串接起來 🛠️！且許多的文章都有介紹要如何串接，大家可以到網路上搜尋一下許多鐵人賽文章喔！

# 結論

很高興在 COSCUP 2023 有機會實體跟這麼多有興趣的開發者分享我的經驗，希望透過每次的分享，讓軟體生態裡的各位能夠更了解不同階段遇到的挑戰，以及哪些服務能被更好的應用，如果喜歡這邊文章，歡迎分享給更多朋友知道唷！

明天(7/30 11：20 ~ 11：50)還有一場演講 - 【[寶可夢苦難日：結局不是重點，重點是我爬不上大師啊](https://coscup.org/2023/zh-TW/session/VAHKVH)】，歡迎大家持續關注，感謝大家！

# 活動小結

立即加入「LINE 開發者官方社群」官方帳號，就能收到第一手 Meetup 活動，或與開發者計畫有關的最新消息的推播通知。▼

「LINE 開發者官方社群」官方帳號 ID：[@line_tw_dev](https://qr-official.line.me/gs/M_908lugfe_BW.png)

<img src="https://qr-official.line.me/gs/M_908lugfe_BW.png" width="200" height="200">

# 關於「LINE 開發社群計畫」

LINE 於 2019 年開始在台灣啟動「LINE 開發社群計畫」，將長期投入人力與資源在台灣舉辦對內對外、線上線下的開發者社群聚會、徵才日、開發者大會等，已經舉辦 30 場以上的活動。歡迎讀者們能夠持續回來查看最新的狀況。詳情請看:

- [2021 年 LINE 開發社群計畫活動時程表](https://engineering.linecorp.com/zh-hant/blog/2021-line-tw-devrel/)
- [2020 年 LINE 開發社群計畫活動時程表](https://engineering.linecorp.com/zh-hant/blog/2020-line-tw-devrel/)
- [2019 年 LINE 開發社群計畫活動時程表](https://engineering.linecorp.com/zh-hant/blog/line-taiwan-developer-relations-2019-plan/)
- [LINE Taiwan Developer Relations 2019 回顧與 2019 開發社群計畫報告](https://engineering.linecorp.com/zh-hant/blog/line-taiwan-developer-relations-2019/)

<style>
  section.compact {
    font-size: 150%  
  }
  img[alt~="center"] {
    display: block;
    margin: 0 auto;
  }
</style>
