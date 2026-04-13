---
title: 2022 LINE Taiwan On Job Training(OJT) 花絮
tags:
  - LINE
  - Culture
categories: LINE
date: 2022-11-01 10:54:19
---

![](https://nijialin.com/images/2022/OJT/all.jpeg)

# 前言

LINE 台灣每年會定期舉辦 On Job Training，提供新進同仁可以在上班時間有個完整的訓練，了解研發工程部門過去與現在，以及在跟每個團隊中合作需要注意的項目，當然在活動過程中也有些有趣的互動，到底當天活動發生了哪些事情呢？讓我們一同往下看看吧！

<!-- more -->

# 訓練環節

## 研發工程部門介紹

![](https://nijialin.com/images/2022/OJT/whatisline.jpeg)

開場由 CTO - Marco 為大家介紹 LINE 的由來與經過，雖然大家日常都使用 LINE 做許多的事情，但在 APP 成長過程中是如何演進，以及因應長大後的各種組織架構由來，都透過開場的議程帶每位到職的同仁一次滿滿的認識!

> 讀者們知道 LINE APP 以前也是黑克松的作品嗎?

## 開發規範 & DevOps

團隊因應各種商業場景會有不同的開發需求，而隨著服務與產品越來越多，許多開發上都需要有相關規範，除了讓大家的開發上的使用手冊能盡可能統一外，也是要預防軟體災害發生時的規範，因此在這部分來...。

另一方面，LINE 台灣很注重 DevOps 的實踐，在 DevOps 中文化 (culture) 與流程 (process) 佔了一大部份，需要透過每位同仁在日常中逐步實踐 CI/CD，讓軟體開發可以更快、品質更好、更穩定等，而更多的 DevOps 細節大家可以參考下文:

> [DevOps 十年了，你，想改變了嗎?](https://engineering.linecorp.com/zh-hant/blog/tech-sharing-devops/)

## 資料應用規範

在每個服務中，因應各種商業場景會有許多的資料在日常生活中流動，舉凡 LINE TODAY 的新聞標籤、LINE 購物的搜尋、LINE 貼圖的推薦購買...等等，除了有許多資料流，也會有許多的 AI/ML
的應用在其中，其中每位開發者同仁也會在每個開發階段處理到對應的內容。

也因為 LINE 相當注重資安相關規範，尤其在日常的資料中就會有許多的規範需要遵守，因此在這次的訓練中就有一場專門講解內部作業中，是如何透過現有的工具，安全且有效地打造適合用戶的平台，且能妥善的保存相關的資訊。

> [LINE 台灣榮獲英國標準協會「資安管理及個資管理」雙項證書 強化資安技術與企業治理　全方位打造安心數位環境](https://linecorp.com/zh-hant/pr/news/zh-hant/2022/4085) > [透明度報告](https://linecorp.com/en/security/transparency/top)

## 開發者關係(Developer Relations)

隨著組織的成長，建立屬於團隊的文化是相當重要的項目之一，也透過這次的訓練讓大家了解**開發者關係**中注重以及跟大家日常生活有關係的內容為哪些，以下透過三點跟大家分享：

- Take Ownership：我們注重讓每位開發人員的自主權，從規劃、開發、參與討論，讓大家決定該做什麼、該怎麼做。
- Be Open：鼓勵每位同仁踴躍參加研討會或是當講者，除了分享自己在專案上學到的東西外，也能學習成果不同領域的講者所使用的技能，回饋平台上應用的新技術與新知於社群上，讓自己更進步外也能更多瞭解其他地方是如何應用相關技術。
- Trust and Respect：團隊間成員彼此互相信任且尊重彼此的意見，當團隊裡的成員提出不同角度的想法時，能夠藉由彼此的討論，進而增加產品的創新性與提升團隊的化學效應。

> - LINE Developer Relations 所寫的[介紹文章 (Introducing Developer Relations team)](https://engineering.linecorp.com/en/blog/introducing-developer-relations-team/)
> - [關於 LINE 台灣開發者關係與技術推廣部門的校園相關資源](https://engineering.linecorp.com/zh-hant/blog/line-devrel-campus/)

開發者關係 ( Developer Relations ) 從來都不是一條輕鬆的路，開發者由於自身對於技術交流的渴望，即便再辛苦上完一天的班之後，仍然願意利用下班過後的空閒時間來參加技術社群認識更多的同好，砥礪彼此的技術。

<iframe width="560" height="315" src="https://www.youtube.com/embed/t_WhOd9XVMA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 基礎設施介紹

LINE 除了擁有一座私有雲 Verda，員工們都需要透過相關平台操作相關資源，並到 VKS(Verda Kubernetes Service)中建立不同團隊的雲服務。但剛加入的同仁一定會有許多操作上的疑慮，因此也請到 SRE 同仁介紹內部是如何操作相關資源。

而在 LINE 台灣當中，也有架設**可觀測性平台**，讓不同的產品團隊可以透過平台去監控每個服務的狀況，在問題即將發生時，可以快速的找到相關問題，透過 Metric、Log、Trace 來達到監控服務狀態，幫助每個產品服務在日常的維運中可以增家服務可靠性！

相關新聞請看: [8 大關鍵服務維運監控得靠它，LINE 臺灣百億筆遙測數據的可觀察性平臺架構大公開](https://www.ithome.com.tw/news/149317)

## Agile basic

在軟體開發世界中，相信大家一定都聽過敏捷開發，但實際在執行上有什麼需要遵守、有哪些內部管理工具是我們日常在跑 Scrum 時需要使用，透過這場訓練，讓同仁更了解在研發工程團隊裡在交付內容時的心法於實戰經驗。

相關參考：

<iframe width="560" height="315" src="https://www.youtube.com/embed/mMF_cwGGze0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## 互動環節 - 認識同組的同事！

![](https://nijialin.com/images/2022/OJT/game1.JPG)

大家當網友久了，看到隔壁同事腦袋中可能浮現非常多的問號，這次的互動中要求每組需要推派一位同仁，在三分鐘背出同組同仁的部門、名字，這環節很考驗大家腦袋中的「快閃記憶體」，也需要每一位同仁開口說出自己的部門以及名字，在這環節非常有趣，大家用盡各種方式來認識彼此，相信這次的互動可以讓大家更加了解彼此！

## 中場遊戲

經過了整天的訓練，透過中場遊戲讓大家可以在遊戲中彼此合作認識對方，而本次分成三個部分遊戲:

### 再夾一下下就好

藉由合作的方式，透過拿到的不同工具(牙籤、棉花棒...)雙人合作把紙張夾到指定的地點，因為過程中只能使用道具執行，相當考驗了大家平常拿筷子的能力！

### 支援前線

第二關支援前線相信許多地方都有玩過，而在人手都有筆電的情況下，取得滑鼠就是一件非常難的事情，以及像是各種產品規格(Mac 16' 非 M1)、指定姓氏的同仁等等，都是非常考驗大家能否拉下臉跟同事互動的環節，透過這部分相信也讓很多同仁彼此也有個認識了呢～

### 用英文解釋日常開發的內容

![](https://nijialin.com/images/2022/OJT/game2.jpeg)

英文是我們日常跟跨國同仁溝通以及文件撰寫的基本技能，但在遊戲中的猜題，讀者們是否可以在不講出關鍵字的情況下，解釋 ArgoCD、Docker、React 等等日常的技能呢？

在這環節中同仁們使用渾身解數想辦法讓猜題選手可以在最短時間內達出來，甚至有一題是「江南街」，同仁甚至開始唱歌表示，讓效果都非常的足夠！

## 午餐時間

![](https://nijialin.com/images/2022/OJT/lunch.jpeg)

當然經過了大量的資訊交換後腦細胞需要補充能量，我們也準備了許多餐點，讓同仁們可以在年度難得的聚會上，透過餐敘時間彼此交流，認識不同部門同仁，也或許未來他就是你合作的同仁也說不定呢！

# 結論

藉由年度的 On Joh Training，讓 LINER 再加入工程大家庭時可以更了解部門日常規範並認識周遭的同仁，相信每次的實體活動都是個非常棒的經驗，透過活動拉近大家彼此之間的距離，說不定在未來的工作中彼此也有機會互相合作。

如果你也想加入 LINE 研發工程團隊，歡迎大家前來[投遞履歷](https://careers.linecorp.com/jobs?ca=Engineering&ci=Taipei&co=East%20Asia)，讓我們能一同打造大家日常在使用的服務，拉近彼此間的距離，小編期待可以在 LINE 中看到大家！

> 不同團隊介紹，歡迎大家參閱這篇文章 - [LINE Taiwan Developers Recruitment Day 2022 招募資訊懶人包](https://engineering.linecorp.com/zh-hant/blog/line-dev-recruitment-day-2022/)

# 活動小結

立即加入「LINE 開發者官方社群」官方帳號，就能收到第一手 Meetup 活動，或與開發者計畫有關的最新消息的推播通知。▼

「LINE 開發者官方社群」官方帳號 ID：@line_tw_dev
![](https://www.evanlin.com/images/2020/line-tw-dev-qr.png)

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
