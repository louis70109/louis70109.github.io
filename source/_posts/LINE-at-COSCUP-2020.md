---
title: COSCUP 2020 年會 - LINER 工程團隊的議程分享
tags:
  - Verda
  - LINE
  - Lotify
  - Clojure
categories: 研討會
date: 2020-08-06 12:10:29
---

![](https://i.imgur.com/1hFoD0h.jpg)

# 什麼是 COSCUP？

大家好，我是 LINE Taiwan Technology Evangelist – NiJia Lin。很高興這次能以 LINER 身份於 8/1、8/2 參加 COSCUP 2020，並體驗開源社群充滿熱忱與活力的氛圍！[COSCUP](https://coscup.org/2019/)  是亞洲最大的開源會議之一，自 2006 年開始由開源社群舉行的年度會議，也是台灣自由開源軟體運動 (FOSSM) 的主要倡導者。COSCUP 包含演講、贊助商、社群攤位，以及 BoF 社群同樂會等，COSCUP 的宗旨在於提供一個聯結開放原始碼開發者、使用者與推廣者的平台。

> 感謝台灣的防疫英雄們的努力讓大家有機會參加線下的研討會，也辛苦大會在行前的各種宣導與措施，讓這次 COSCUP 可以圓滿結束！

- 2019 COSCUP 文章參考：https://engineering.linecorp.com/zh-hant/blog/line-coscup-2019/

以下為大家帶來這次 LINE 的三個講者分別為大家帶來的內容分享 😃

<!-- more -->

# [How We Integrate and Develop Private Cloud in LINE](https://coscup.org/2020/zh-TW/agenda/PZPMCR) - Gene Kuo

![](https://i.imgur.com/XpyZt4Z.jpg)

<script async class="speakerdeck-embed" data-id="efd3904c14f7400cbbd4e62553e3976b" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

由我們 Verda Platform Development Team 的 LINEr - Gene Kuo 在 Cloud Native Hub 分享一個遠端的議程。

首先提到了為什麼 LINE 需要選擇自己的 private cloud(LINE 裡稱為 Verda)，並且對比 public cloud 相對應的問題：

| Question | Private        | Public      |
| -------- | -------------- | ----------- |
| 花費     | 可掌控         | 不易掌控    |
| 靈活度   | 高             | 低          |
| 開發     | As a developer | As a proxy  |
| 需求處理 | 討論價值在哪   | 只能 Yes/No |

## Verda 的 High Level Architecture:

這部分講者快速講解了 IaaS、PaaS、FaaS 個別在層級上使用的用途。

<script async class="speakerdeck-embed" data-slide="11" data-id="efd3904c14f7400cbbd4e62553e3976b" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

## LINE 擁有 2000+ Hypervisor, 50000+ VMs, 20000~ 實體主機

早期的服務已經擁有許多的主機群，因此運用既有的資源建立 private cloud，搭配軟硬體可以取得更多的好處。

<script async class="speakerdeck-embed" data-slide="12" data-id="efd3904c14f7400cbbd4e62553e3976b" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

## 困難點

<script async class="speakerdeck-embed" data-slide="14" data-id="efd3904c14f7400cbbd4e62553e3976b" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

接下來提到了整合 OpenStack 到 Verda 時帶來的挑戰與困難點，這裡提到的是與普羅大眾的 open source 一樣會遇到的問題，以下大概列出這次提到的困難點部分：

- Feature
- 政策問題
- 內部元件整合
- 版本升級
- 開發與除錯複雜度
- 在大架構下的效能問題

在使用中上沒辦法 100% 相容，因此需要自己開發 patch 來支援，例如： Quota 控制(eg. GPU / MEM / CPU allocation)，但開發有一定數量的 patch 後很有可能會在下次改版是 conflict，所以因此要降低客製化的需求避免衝突問題，同時也需要管理 patches 並分類它們。

使用大量的 solution 讓大家知道解法帶來的效益：

<script async class="speakerdeck-embed" data-slide="20" data-id="efd3904c14f7400cbbd4e62553e3976b" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

最後帶大家了解團隊內開發 Openstack 時的 workflow：

<script async class="speakerdeck-embed" data-slide="29" data-id="efd3904c14f7400cbbd4e62553e3976b" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

在這個議程中充分的說明 private & public cloud 優劣，並用大量的範例來說明 Verda 在 private cloud 裡所會遇到的困難與挑戰，最後就快速 Demo 帶大家了解 custom-source 的存放以及 git review 上的功能展示。

若有興趣的朋友歡迎參閱我們的文章： https://engineering.linecorp.com/en/blog/verda-platform-team/

# [The productivity brought by Clojure](https://coscup.org/2020/zh-TW/agenda/CFSTWL) - Laurence Chen

<iframe src="//www.slideshare.net/slideshow/embed_code/key/hFD5ddH6NrHXUX" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/humorless/the-productivity-brought-by-clojure-149170292" title="The productivity brought by Clojure" target="_blank">The productivity brought by Clojure</a> </strong> from <strong><a href="https://www.slideshare.net/humorless" target="_blank">Laurence Chen</a></strong> </div>

Clojure 有以下特性：

1. REPL-driven development
2. Immutable data structure
3. Composable functions
4. Immutable database

## 語言比較

講者接著以 JS 為例說明在大部分 [M-expression](https://en.wikipedia.org/wiki/M-expression) 語言特性中與 [S-expression](https://en.wikipedia.org/wiki/S-expression) 的差異，並用 tree 的方式為大家快速介紹。

- 由於 Clojure 是 immutable data structure，因此大部分狀況下都是 copy on write。

![](https://i.imgur.com/5nevVHF.png)

- 若有更動到 tree 上的 node，則改動的部分會生成新的 node，其他沒有更動到的則直接 reference。
- 相對減省許多 memory。

接著講解了其他語言有不一致的相關 function name 會讓開發者在記憶時比較痛苦，再使用 Clojure 的範例帶大家了解這部分是如何處理這部分。

![](https://i.imgur.com/iLIIEEF.png)

## Record function time

以往為了量測 function 執行時間時則需放入兩個 Timer 才可以計算出執行時間，而 Clojure 只需要在 vim 上輸入 `(time doSomething)` 即可馬上算出 function 執行時間(真的很方便)。

![](https://i.imgur.com/MZZGvxl.jpg)

> 開發上若是括號上的問題並是使用 vim 開發的話可以[參考這篇](http://irongateinfo.blogspot.com/2017/02/clojure-vim-rainbow-parentheses-cljfmt.html)

## Demo

使用範例帶大家快速的認識 Clojure 的好處：
![](https://i.imgur.com/MoXAea0.jpg)

![](https://i.imgur.com/UDACfbi.jpg)

## 小結

藉由講者深入淺出的敘述讓我在議程中能夠快速的了解 Clojure，並且從分享中可以感覺到若已經習慣兩種生態的開發者其實若使用 Clojure 開發產品的話產出說不定真的比其他語言的開發速度快上許多，增加 30% productivity 一定是不為過的，且在這場演講中講者用很實際的例子帶大家了解兩邊的差異，之後有機會不妨到 [Clojure.tw](https://clojure.tw/) 找講者討論吧！

# [Lotify: a python SDK for LINE Notify](https://coscup.org/2020/zh-TW/agenda/KNJDWQ) - NiJia Lin (就是我)

![](https://i.imgur.com/tuGOdi1.jpg)

<script async class="speakerdeck-embed" data-id="733b207481c441adab9cac7d241efc29" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

## 介紹

既然這次演講是實作 LINE Notify SDK，那一定得先了解一下 LINE Notify 究竟含有什麼功能。

<script async class="speakerdeck-embed" data-slide="6" data-id="733b207481c441adab9cac7d241efc29" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

並且搭配著一些在開源環境下適合使用場景的範例：

<script async class="speakerdeck-embed" data-slide="8" data-id="733b207481c441adab9cac7d241efc29" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

LINE Notify 可以送以下四種類型的訊息：

- Text
- Sticker
- Image url
- Image file

接著比較 Lotify 與其他 Pypi 上的 LINE Notify packages 差異，許多套件只實作出發送功能卻沒做模組化發送訊息、認證流程、單元測試，因此我在 SDK 上將這些功能加入進去，並且借鏡 [line-bot-sdk-python](https://github.com/line/line-bot-sdk-python) 的測試手法來確保 SDK 品質。

<script async class="speakerdeck-embed" data-slide="21" data-id="733b207481c441adab9cac7d241efc29" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

## 做一個 open source 需要注意的細節

- 版本控制：讓關注專案的人可以清楚知道在每次 release 中修改了什麼內容，讓專案的管理有可控性。
- 上傳至 Pypi 的設定檔：在這次的開發中於此部分卡了許久，分享步驟讓大家少走點冤望路。

<script async class="speakerdeck-embed" data-slide="43" data-id="733b207481c441adab9cac7d241efc29" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

- 切割 requirements.txt 環境帶來的好處：若專案越來越大時切割環境是必要的，否則很容易污染貢獻者的環境導致開發不順。
- 整合 Tox 與 Travis 確保 SDK 品質：Lotify 中整合了 Travis 來跑每次 commit 時的單元測試，避免改壞程式影響到其他專案。

- Badge 帶來的重要性 - 以 Travis 為例：透過 Badge 讓使用者可以再看 README 時就清楚知道訊息，支援版本、LICENSE、測試狀態...

<script async class="speakerdeck-embed" data-slide="51" data-id="733b207481c441adab9cac7d241efc29" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

- LICENSE 的重要性：保護專案與增加可信度。

- 使用 Heroku 做一鍵式部署：讓有興趣的朋友可以快速上手你的 SDK，增加活躍度。

<script async class="speakerdeck-embed" data-slide="58" data-id="733b207481c441adab9cac7d241efc29" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

## 小結

透過這次的議程希望可以讓聽眾從 `遇到問題`、`分析問題`、`解決問題`到`文件細節`的每個步驟的重要性，若你現在使用 python 並也在開發 LINE Notify，不妨試試看 [lotify](https://github.com/louis70109/lotify) 並用星星支持它吧！

![](https://i.imgur.com/zP6BRFT.png)

# 活動總結

![](https://i.imgur.com/JAPBjX7.jpg)

因為擁有這些熱情的社群議程讓 COSCUP 更加精彩，若你手邊有作品的話考慮來社群與大家分享，除了交流技術外也可以認識許多新朋友喔！心動不如馬上行動 🏃‍♂️：

- [Chatbot Developer Taiwan](https://www.facebook.com/groups/chatbot.tw/)
- [Cloud Native Taiwan User Group](https://www.facebook.com/groups/cloudnative.tw/)
- [Clojure.tw](https://clojure.tw/)

立即加入「LINE 開發者官方社群」官方帳號，就能收到第一手 Meetup 活動，或與開發者計畫有關的最新消息的推播通知。▼

「LINE 開發者官方社群」官方帳號 ID：@line_tw_dev
![](https://i.imgur.com/gxHgAzB.png)

# 關於「LINE 開發社群計畫」

LINE 今年年初在台灣啟動「LINE 開發社群計畫」，將長期投入人力與資源在台灣舉辦對內對外、線上線下的開發者社群聚會、徵才日、開發者大會等，已經舉辦 30 場以上的活動。歡迎讀者們能夠持續回來察看最新的狀況。詳情請看:

- [2019 年 LINE 開發社群計畫活動時程表](https://engineering.linecorp.com/zh-hant/blog/line-taiwan-developer-relations-2019-plan/)
- [LINE Taiwan Developer Relations 2019 回顧與 2019 開發社群計畫報告](https://engineering.linecorp.com/zh-hant/blog/line-taiwan-developer-relations-2019/)
- [2020 年 LINE 開發社群計畫活動時程表](https://engineering.linecorp.com/zh-hant/blog/2020-line-tw-devrel/)
