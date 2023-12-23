---
title: 'Empowering Community-Driven Learning through Serverless Practice'
categories: 研討會
tags:
---

![](https://nijialin.com/images/2023/devfest/1.png)

# 前言

<!-- more -->

# 如何透過社群學習？

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/6b62f16e016244e9a9feca2057078f04?slide=6" title="Empowering Community-Driven Learning through Serverless Practice" allowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 100%; height: auto; aspect-ratio: 560 / 315;" data-ratio="1.7777777777777777"></iframe>

## Clone Knowledge

知識是可以複製的，開源社群另一個好處就是不用重複造輪子，初學時可能看了許多文件與文章，但終於找到當中了一些範例，這時候當然就先把他抓下來使用看看囉！

以自學角度來說，我會推薦經常去複製許多專案，了解自己正在研究的東西有哪些方案，但同步要記得 License 的問題唷！如果商用時要記得備註來源，尊重原作者 ✍️

## Build Example

<script defer class="speakerdeck-embed" data-slide="32" data-id="6b62f16e016244e9a9feca2057078f04" data-ratio="1.7777777777777777" src="//speakerdeck.com/assets/embed.js"></script>

當我們開始熟悉學習的內容(e.g. Public Cloud, LINE Bot, 程式語言...)，應該本機都有很多 Clone 下來的專案，藉由平日生活中有些週期性的事情，開始可以把前人的經驗拿來改寫，把它變成事宜些有趣的專案。

> 上圖範例為我近期為了玩滑板做的爬蟲 - [louis70109/skatepark-CCTV-line](https://github.com/louis70109/skatepark-CCTV-line)，也是幫我解決我在台北時時常下雨不能出去玩的問題

## Contribute Expertise

隨著範例越寫越多，會發現有些相依專案有些以下問題：

- 註解寫一半
- README label、格式沒對齊
- function name 有錯
- 駝峰語言用底線(`_`)
  - CamelCase(駝峰), JavaScript: 駝峰式居多
  - snake*case(蛇行用法), Python: 基本上都用 `*` 命名變數與 function，但 Class 會用`駝峰`，這都能送 PR 幫忙調整

不論專案的大小、公司內外，都會有很多以上的問題，順手幫忙一起修，讓每個專案越來越完整！

> 像前陣子我就剛好找到 nuxt.js 的範例註解沒寫完([PR #23999](https://github.com/nuxt/nuxt/pull/23999))，幫忙修正掉，雖然看起來只是小事，但開源專案也是需要細心的人來一起幫忙監督，才能讓開源圈子越來越好唷！

# 為什麼我要用 Cloud Run？

Serverless 是個概念，主要讓開發者可以專注在開發上，資源沒在用時可以先冷卻([Cold Start 文章](https://nijialin.com/2023/04/04/how-cloud-run-continuely-cronjob-background/))，而使用 Google 的 Cloud 又會有以下的優勢：

- 彈性
  - 流量計價，我個人專案大概部署五個服務在 Cloud Run 上，資料庫都用 Firebase，一個月大概花費一百塊以內，基本上費用都不會太高
  - 萬一專案真的紅了，Cloud Run 還能 auto scaling，Infra 的管理我們都不用管，這樣真的對於一個開發者來非常棒！
- 易用性
  - GCP 在開發者體驗上做得非常好，gcloud 指令方便文件也易讀，甚至部署上去不用寫一堆 config 設定，只要 deploy 上去接下來在介面上找問題即可！
- 區域性：雖然都知道文件看英文可以獲得一手資訊，但有時候抓蟲看中文還是比較快！
  - GCP 好處就是中文文件大部分都有支援
  - 台灣也有機房
  - 真的不行還可以找客服幫忙 (公司行號比較快)

# 佈署方式的選擇與適用情況

- gcloud 指令
- 一鍵部署 Cloud Shell
- GitHub 綁定自動部署

# 雲端資源整合

# 選擇適合的 Side Project

# 該帶走點什麼 ✍️

- 1st & 2nd Cloud Function 跟 Cloud Run 有什麼差嗎？
  - 1st 用的方式有點像是 [Open FaaS](https://docs.openfaas.com/cli/install/)
  - 2nd 用的 [Knative](https://knative.dev/docs/)
  - 差異：Knative 有 CNCF 認證，我想 Google 應該是想統一格式，

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
