---
title: '【JCConf 2022】活動紀錄 | Keynote, 攤位, 開發統計版'
tags:
  - JCConf
  - Java
  - LINE
categories: 研討會
date: 2022-10-14 18:00:50
---


![](https://nijialin.com/images/2022/jcconf/2.JPG)

# 前言

JCConf 為台灣最大的 Java 開發者研討會，這次的研討會中也看到許多講者、開發者的活力！有在現場的朋友一定會被這活力感染。當然今年 LINE 如往常一樣透過「黃金級」贊助 JCConf，除了讓開發者可以在攤位上與 LINER 互動外，也讓社群能夠有持續前進的動力！沒參加到也沒關係，以下就讓小編用文章帶大家走走。

<!-- more -->

## [什麼是 JCConf?](https://jcconf.tw/2022/)

JCConf Taiwan (Java Community Conference Taiwan) 是由社群成員發起的 Java 程式語言及相關領域研討會，由 TWJUG (Taiwan Java User Group) 主辦，Scala Taiwan 和 科斯高 協辦。宗旨在提供台灣的 Java 開發者有更多參與社群以及交流技術的機會，目標與會對象主要為使用 Java 語言及 JVM 相關技術的程式開發者和相關從業人員。

# Keynote - LINE TODAY

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/4d3bbc1078594d23b6146d0e7949d098?slide=4" title="LINE TODAY keynote in JCConf 2022 " allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 560px; height: 314px;" data-ratio="1.78343949044586"></iframe>

因為這次是黃金級贊助，特此邀請 LINE TODAY 團隊的 PJ Tsai 用五分鐘的時間快速介紹整個團隊的技術架構與組成，既然是在 Java 研討會，當然基本的 Java EE, Aspect, Spring Boot...都是必要的，但大家總會有疑問，LINE 有各式各樣的團隊，是不是都自己維護工具呢？其實 LINE 也是相當[支持 Open Source](https://github.com/line)，當然在這次的 Keynote 中 PJ 也分享了 LINE TODAY 中使用到的 Open Source。

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/4d3bbc1078594d23b6146d0e7949d098?slide=5" title="LINE TODAY keynote in JCConf 2022 " allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 560px; height: 314px;" data-ratio="1.78343949044586"></iframe>

LINE TODAY 團隊也相當重視 DevOps 的流程，以下概略列出來給大家：

- 透過 JIRA 專案管理
- Container 方式存取
- SonarQube 做靜態程式碼分析
- Jenkins 處理各種自動化流程
- 透過 ArgoCD 佈署於 Kubernetes
- 使用 Grafana 來監控服務狀態
- 透過 LeSS 大型敏捷框架來增進交付效率

當然你若想了解更細節的團隊內容，歡迎參考以下職缺：

- [Server-Side Developer - LINE TODAY](https://lnkd.in/gUYE4dTi)

# 攤位

![](https://nijialin.com/images/2022/jcconf/1.JPG)

## [EC team](https://engineering.linecorp.com/zh-hant/teams/LINE%20SHOPPING/)

LINE 電商包含購物、直播、禮物、口袋商店、快電商以及金物流 / 電子發票等 microservices。LINE 購物是我們的主要服務，透過商品比價功能，讓用戶可以從上千萬筆的商品中找到最低價或回饋最多的商品，當用戶透過 LINE 購物完成消費，我們將回饋 LINE POINTS 給用戶，除了新功能的開發外，也需要與各合作廠商或 LINE 其他國家的服務合作或平台串接。

- [Senior Data Engineer - EC](https://careers.linecorp.com/jobs/1155)
- [Machine Learning Engineer - EC](https://careers.linecorp.com/jobs/1308)
- [Full Stack Developer - EC](https://careers.linecorp.com/jobs/1230)

## [Android & iOS team](https://speakerdeck.com/line_developers_tw/2022-ios-and-android-team-introduction)

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/2bf0b0ada56e4bd3a004fe0b0a0e6c4c?slide=7" title="2022 iOS &amp; Android team introduction" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 560px; height: 314px;" data-ratio="1.78343949044586"></iframe>

作為 Android 和 iOS 開發者，加入 LINE 工程團隊，可以親手維護自己與親友每天使用的軟體。在這次攤位中分享了在 LINE 當中負責的應用程式以及使用的語言，同時也因為 LINE 功能眾多為大型程式，有機會深入研究模組化與編譯技術。

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/2bf0b0ada56e4bd3a004fe0b0a0e6c4c?slide=9" title="2022 iOS &amp; Android team introduction" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 560px; height: 314px;" data-ratio="1.78343949044586"></iframe>

也分享去年推出的 LINE 購物 App，由台灣團隊一手打造出來，採用了最新的 Google Flutter 技術，讓 Android 及 iOS 兩個平台的開發能更密切，讓現場交流的會眾覺得非常有趣，詢問了許多使用者體驗的問題，當然若讀者有興趣也歡迎參考以下資訊：

- [Flutter iOS Developer](https://careers.linecorp.com/jobs/1362)
- [Android Developer](https://careers.linecorp.com/jobs/1227)

## [LINE Pay](https://speakerdeck.com/line_developers_tw/line-pay-in-jcconf-2022)

![](https://nijialin.com/images/2022/jcconf/3.JPG)

這次的攤位中也邀請的 LINE Pay 的 Luther 以及 Kevin 來攤位上跟大家分享在團隊中處理支付上的一些討論。

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/2d79c6c989c44c519132da68f67fcd97?slide=4" title="LINE Pay in JCConf 2022" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 560px; height: 314px;" data-ratio="1.78343949044586"></iframe>

介紹當中也有提到近期推出的 [LINE Pay App](https://apps.apple.com/tw/app/line-pay-%E6%94%AF%E4%BB%98%E9%AB%94%E9%A9%97-%E7%85%A5%E7%84%B6%E4%B8%80%E6%96%B0/id1563230455)，在使用上小編真的是日常生活都會用到它，使用體驗非常好且直觀呢！

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/2d79c6c989c44c519132da68f67fcd97?slide=10" title="LINE Pay in JCConf 2022" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 560px; height: 314px;" data-ratio="1.78343949044586"></iframe>

當然在技能方面也是含有許多 Open Source 的工具，如果想更透徹了解 LINE Pay 日常開發到底會用到哪些工具，請看這邊:

- [Server-side Engineer - LINE Pay](https://careers.linecorp.com/jobs/75)
- [Android Developer - LINE Pay](https://careers.linecorp.com/jobs/639)

## [Global Content Platform team](https://speakerdeck.com/line_developers_tw/global-content-platform-in-jcconf-2022)

![](https://nijialin.com/images/2022/jcconf/6.JPG)

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/34ba3bd80e8d440d95254f8952b7441e?slide=2" title="Global Content Platform in JCConf 2022" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 560px; height: 314px;" data-ratio="1.78343949044586"></iframe>

在 LINE 服務當中，像是 LINE TODAY、LINE 旅遊、LINE 購物、LINE 熱點等等，都會需要有許多的資料來呈現內容給使用者，隨著服務越來越多，也就需要專門在負責消化/吞吐這些資料的團隊，來幫助大家處理日常資料流。

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/34ba3bd80e8d440d95254f8952b7441e?slide=8" title="Global Content Platform in JCConf 2022" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 560px; height: 314px;" data-ratio="1.78343949044586"></iframe>

而在處理資料上會因為許多來源跟需求不同，需要處理/整理不同的格式(JSON, XML...)，進而讓介接的服務可以在使用體驗上達到一致。

# 結論

![](https://nijialin.com/images/2022/jcconf/IMG_2609.JPG)

以語言開發為基礎的研討會中，有相關的調查都是非常有趣的，本次的攤位中調查「使用何種方式開發 Java」、「都怎麼版控」；其中多數開發者都以 JetBrain 的 IntelliJ IDEA 作為開發首選，搭配 Git 作為版本控制，當然也有開發者選用其他的方式開發以及版本控制，透過這問卷版在現場的互動中真的是很有趣呢！

很高興這次有機會參與年度的 Java 盛事，如果對於加入我們有興趣的開發者，歡迎參考上方的團隊敘述中的連結喔！希望能在 LINE 台灣與大家相見！

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
