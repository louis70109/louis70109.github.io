---
title: 【DevFest 2023】Empowering Community-Driven Learning through Serverless Practice
tags:
  - Google
  - DevFest
  - Side Project
  - Community
  - Cloud Run
  - Knative
categories: 研討會
date: 2024-02-18 16:25:01
---


![](https://nijialin.com/images/2023/devfest/1.png)

# 前言

經歷過連續兩週兩場 [DevFest 2023](https://gdg.community.dev/events/details/google-gdg-taipei-presents-devfest-taipei-2023/) 的經驗(12/9, 12/16)，真的是把我畢生所學都拿出來榨乾了😆，但也很高興有機會在台中以及台北跟大家分享我在業餘時間透過 Google Cloud 開發 Side Project 的經驗談，以下內容為台北場內容，有興趣的跟著一起往下看吧！

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
  - 真的不行還可以找客服幫忙，若是企業又會更快些 (畢竟有錢)

# 佈署方式的選擇與適用情況

以下三種是我常用來部署自己專案的方式：

## gcloud 指令 (速度: 快)

<script defer class="speakerdeck-embed" data-slide="16" data-id="6b62f16e016244e9a9feca2057078f04" data-ratio="1.7777777777777777" src="//speakerdeck.com/assets/embed.js"></script>

- 最直覺的操作方式，任何有部署經驗的人都會習慣的用法
- 通常公司電腦有資安阻擋，因此建議使用自己的電腦操作
- 多人團隊建議綁定自動部署

## 一鍵部署 Cloud Shell (速度: 中)

<script defer class="speakerdeck-embed" data-slide="21" data-id="6b62f16e016244e9a9feca2057078f04" data-ratio="1.7777777777777777" src="//speakerdeck.com/assets/embed.js"></script>

- 在 quicklab、Cloud Function...etc 很多 GCP 服務都可使用
- 主要讓開發者在任何已登入的瀏覽器上直接操作，無需再另外 ssh 進去
- 若有資安軟體阻擋，這方式可以直接線上操作，安全又 ~~衛生~~ 守規定

## GitHub 綁定自動部署 (速度: 慢)

<script defer class="speakerdeck-embed" data-slide="23" data-id="6b62f16e016244e9a9feca2057078f04" data-ratio="1.7777777777777777" src="//speakerdeck.com/assets/embed.js"></script>

- 不論團隊大小，都很適合的方式
- 通通交給機器處理，不會有手動上沒有參數導致錯誤的問題
- 介面直接設定又穩定

# 雲端資源整合

## 圖床功能比較

<script defer class="speakerdeck-embed" data-slide="25" data-id="6b62f16e016244e9a9feca2057078f04" data-ratio="1.7777777777777777" src="//speakerdeck.com/assets/embed.js"></script>

由於 Side Project 是閒暇時間實作，在求快下就使用 GitHub Repo 作為圖床，但建議別一次傳太大的檔案上去，如果是一些小圖片個人覺得很適合

如果專案上需要多些權限、階層控管，也需要做後續的整合，這邊就會建議使用 Cloud Storage 作為圖床

以上就看需求選擇，個人認為這費用不算高(當投資)，讓自己開發順手同時累積經驗比較重要喔！

## 資料儲存

<script defer class="speakerdeck-embed" data-slide="26" data-id="6b62f16e016244e9a9feca2057078f04" data-ratio="1.7777777777777777" src="//speakerdeck.com/assets/embed.js"></script>

打從職涯剛開始都是使用 RDBMS 習慣，很常會先以 MySQL、PostgreSQL 為主，如果是自己擁有主機架設這成本較低

但隨著現在服務都放 Public Cloud，而 SQL 的費用曾經體驗過會非常高 💰，在服務上還可以選擇另一個非常棒的 NoSQL 服務 - **Firebase** 作為資料儲存的地方，這上面不僅有資料儲存功能，同時也能部署網站、分析...etc，文件式的操作方法在 Side Project 上非常快速也方便(**畢竟沒啥邏輯**)，並且能用 JSON 的方式讀取，操作起來就很像呼叫個 API Server 吐資料，上圖比較表也提供給大家～

# 選擇適合的 Side Project

以下與大家分享在閒暇時間部署於 GCP 的幾個 Side Project：

<script defer class="speakerdeck-embed" data-slide="31" data-id="6b62f16e016244e9a9feca2057078f04" data-ratio="1.7777777777777777" src="//speakerdeck.com/assets/embed.js"></script>

由於用 LINE 是我每天必經之路，我製作了一個 LINE Bot 記錄我平常收集到的零碎資訊(網站、圖片、點子)，幫我儲存在 GitHub Repo 上，有時在搭交通工具時也會當**暫時的**部落格編輯器(回家再調格式)

<script defer class="speakerdeck-embed" data-slide="32" data-id="6b62f16e016244e9a9feca2057078f04" data-ratio="1.7777777777777777" src="//speakerdeck.com/assets/embed.js"></script>

近期因為愛上滑板 🛹，因此寫了一隻 LINE Bot 來擷取台北滑板場攝影機的畫面，畢竟台北市一個陰晴不定的都市，經常需要靠這隻 Bot 來幫我看看地板是否乾了沒，再決定要不要出門，避免浪費太多時間～

![CCTV LINE Bot](https://qr-official.line.me/sid/L/556trgib.png)

> 延伸閱讀：[如何設定 Cloud Function 2nd gen 來改善截圖爬蟲的效率！](https://nijialin.com/2024/02/13/gcp-cloud-function-gen2-with-line-bot/)

另外一隻則是 Calendar Bot，透過 OpenAI 幫我整理凌亂的資訊，變成 Google Calendar 可以使用的方式。

因為 Google Calendar 可以透過 GET 網址的方式在已登入的瀏覽器上直接加入行事曆，因為個人使用習慣都在手機上安排行事曆，因此在 LINE Bot 這邊需要加上 `?openExternalBrowser=1` 的參數，強制在外部瀏覽器(Safari)打開，如此才會跳到 App 上操作

<script defer class="speakerdeck-embed" data-slide="33" data-id="6b62f16e016244e9a9feca2057078f04" data-ratio="1.7777777777777777" src="//speakerdeck.com/assets/embed.js"></script>

講了那麼多 LINE Bot，當然也有 Web 的工具，過去因為活動需要，想把 QR Code 變得更好看，能夠在背景放上圖片，因此自己做了一個網站，讓我`上傳圖片`以及`網址`，就能變成一個漂亮個 QR Code，看起來吸引力十足也不用靠設計師了 😆

# 該帶走點什麼 ✍️

<script defer class="speakerdeck-embed" data-slide="34" data-id="6b62f16e016244e9a9feca2057078f04" data-ratio="1.7777777777777777" src="//speakerdeck.com/assets/embed.js"></script>

上述介紹了許多，因為是日常需要才使用，也就是有`事件`才會使用，因此個人認為在事件驅動開發的服務上就會很適合這些 Serverless 的雲服務，當然參數調整好也可以當一般常見的 SPA、CMS...etc

## 1st & 2nd Cloud Function 跟 Cloud Run 有什麼差嗎？

<script defer class="speakerdeck-embed" data-slide="36" data-id="6b62f16e016244e9a9feca2057078f04" data-ratio="1.7777777777777777" src="//speakerdeck.com/assets/embed.js"></script>

另外在 2023/8/10 Cloud Functions 也升級了，過往要做許多介接其他 GCP 服務大多都會使用 Cloud Run (Big Query、Cloud Storage、Eventarc..etc)，在這次的升級上讓 Functions 的底層置換成 Cloud Run，也就是說把底層都換成 Knative 的方式執行，如此一來 Google 能夠統一格式，用戶在操作上也不會搞混兩邊的 Container 差異

> - 1st 用的方式有點像是 [Open FaaS](https://docs.openfaas.com/cli/install/)
> - 2nd 用的 [Knative](https://knative.dev/docs/)
>   News: [Cloud Functions 2nd gen is GA, delivering more events, compute and control](https://cloud.google.com/blog/products/serverless/cloud-functions-2nd-generation-now-generally-available)

# 結論

最後再次感謝 GDG DevFest 2023 團隊給我這個演講機會來分享 - [Empowering Community-Driven Learning through Serverless Practice](https://speakerdeck.com/line_developers_tw/empowering-community-driven-learning-through-serverless-practice?slide=45)，藉由這次的演講跟大家分享我做 Side Project 以來的一些心路歷程以及看法，若有任何的建議與回饋，都歡迎下方留言讓我知道唷！

<script defer class="speakerdeck-embed" data-slide="45" data-id="6b62f16e016244e9a9feca2057078f04" data-ratio="1.7777777777777777" src="//speakerdeck.com/assets/embed.js"></script>
