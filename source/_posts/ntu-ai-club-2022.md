---
title: 台灣大學 AI 社團分享 -  竟然有人說 AI 不能拿來做行銷
categories: 研討會
date: 2022-11-05 16:20:34
tags:
---


# 前言

大家好，我們是來自 LINE 台灣開發者關係與技術推廣部門 (Developer Relations)。 LINE Taiwan 開發工程團隊於 2022 年初的 「[關於 LINE 台灣開發者關係與技術推廣部門的校園相關資源](https://engineering.linecorp.com/zh-hant/blog/line-devrel-campus/)」文章中，有敘述到關於 LINE 台灣有提供給理工相關科系學校同學的企業參訪機會，也提供學校的社團能夠邀請 LINE 研發工程團隊成原來位大家分享技術上的議題。

這一次則是收到台灣 AI 社團的邀請，
邀請資料工程團隊的 Johnson 分享如何透過機器學習來解決行銷議題上的經驗分享，讓同學對於 AI/ML 上有更深入的了解。

<!-- more -->

# 介紹

## MarTech

開始先提到在行銷上常使用 AARRR 來歸納用戶歷程的漏斗，從用戶進入服務、使用服務、引流服務的一段用戶歷程的角度來說明 LINE 將 AI 引入 Martech 的切入點。

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/b10ee31f40924274afb48a8d69f0ada1?slide=9" title="竟然有人說AI不能拿來做行銷" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 1120px; height: 628px;" data-ratio="1.78343949044586"></iframe>

接著 Johnson 提到，運用知識圖譜來協助尋找用戶在哪、新用戶在哪、活躍用戶在哪的相關問題，在透過 [Smart Channel(個人化廣告)](https://official-blog-tw.line.me/archives/80236712.html)的方式來投遞給對應用戶相關的資訊，其中也運用語意、卷積網路轉換特徵等等的方式來找到對應關係，也運用這個方法幫助 LINE SHOPPING、LINE SPOT、LINE POINTS...上找出近似關係搜尋，進而提高用戶成長。

## Uplift Model (增益模型)

這邊提到在跟商業團隊討論時，如何優化廣告的效率是很重要的議題，因為一直廣灑的話會有背後成本考量的問題，所以行銷人員需要在有限的行銷資源下，把資源頭放對的用戶上，這裡使用增益模型來衡量廣告對用戶的影響評估，進而達到平衡廣告的效益。

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/b10ee31f40924274afb48a8d69f0ada1?slide=24" title="竟然有人說AI不能拿來做行銷" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 1120px; height: 628px;" data-ratio="1.78343949044586"></iframe>

為了有效的投遞廣告，進而將用戶分眾來提升效益，因此定義了四個族群：

- Sure Thing: 即便不提供誘因，也會購買產品。
- Sleeping Dog: 不投遞還好，一投遞廣告喚醒後，造成負面的影響。
- Lost Cause: 看到廣告(誘因)也不會有反應的族群
- The Persuadable: 容易受到廣告誘因才去購買內容，這部份的人是我們需要的族群

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/b10ee31f40924274afb48a8d69f0ada1?slide=25" title="竟然有人說AI不能拿來做行銷" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 1120px; height: 628px;" data-ratio="1.78343949044586"></iframe>

透過上方四個分眾，接著使用 Uplift Model 來找出相關的群眾(A/B testing)，除了增加投資報酬率(廣告有效投放、)之外，也要進而降低官方帳號被封鎖，讓效果可以更有最大的效益。

## RFM

接著 Johnson 解釋在平常的購買行為上，是如何透過 [RFM](<https://en.wikipedia.org/wiki/RFM_(market_research)>) 來了解你的客戶群：

- R：最近一次什麼時候來
- F：來的頻率
- M：花了多少錢，數量多少

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/b10ee31f40924274afb48a8d69f0ada1?slide=36" title="竟然有人說AI不能拿來做行銷" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 1120px; height: 628px;" data-ratio="1.78343949044586"></iframe>

簡化成 RFM(衡量用戶歷史價值)＆CLV(用模型估測未來用戶帶來的價值)，個別對不同的用戶下不同的行銷操作，預測接下來收益的提升，增加用戶未來在行銷上的價值。

## CLV

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/b10ee31f40924274afb48a8d69f0ada1?slide=46" title="竟然有人說AI不能拿來做行銷" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 1120px; height: 628px;" data-ratio="1.78343949044586"></iframe>

也解釋如何透過 CLV 來計算顧客終身價值，此外，用戶身上都會有 RFM 以及 CLV 的標籤，增加後續的行銷策略，讓未來的消費可以再更多一些，揭露用戶在未來的消費力。

## Foundation Model

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/b10ee31f40924274afb48a8d69f0ada1?slide=53" title="竟然有人說AI不能拿來做行銷" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 1120px; height: 628px;" data-ratio="1.78343949044586"></iframe>

因為 LINE 的服務很多，其中也會有許多用戶歷程資料(都是用戶同意的)，並透過 Foundation models 學習更大量的用戶歷程資料，進而可以套用更多小規模資料的微調來達成任何行銷任務，讓同個解決方案能夠套用不同的服務與情境。

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/b10ee31f40924274afb48a8d69f0ada1?slide=54" title="竟然有人說AI不能拿來做行銷" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 560px; height: 314px;" data-ratio="1.78343949044586"></iframe>

這樣多元的行銷科技解決方案可以透過 MLOps 的概念將層層環節模組化並集中化，把機器學習在行銷應用上的技術內容，套用不同的服務與情境。

## 問：如何從事資料科學家相關職業？

- 從工程方向上，需要更多對於 coding 以及對於模型上的調校的經驗。
- 對於數據統計以及數學上的計算等等的技能。
- 對於新的資訊(如：論文)可以有好奇心，了解不同模型間的差異。
- 有像是 NLP、圖像相關領域的面向的領域，可以依照自己喜歡的方向去找到相關的職業。

# 結論

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/b10ee31f40924274afb48a8d69f0ada1?slide=55" title="竟然有人說AI不能拿來做行銷" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 1120px; height: 628px;" data-ratio="1.78343949044586"></iframe>

有了模型的輔助，除了幫助行銷同仁可以快速交付決策到市場上，並且也讓開發者在後續開發上能更有彈性以及擴展。

最後，希望透過這次的分享，能夠讓參加這次台大 AI 社課的同學可以更了解 LINE 台灣如何在 MarTech 上運用機器學習解決行銷需求上的一些經驗分享，如果你也喜歡這篇內容，歡迎分享！

若對於 LINE 台灣職缺有興趣，歡迎參考以下資訊：

- [2023 TECH FRESH](https://careers.linecorp.com/jobs/83)
- [Machine Learning Engineer - LINE TODAY](https://careers.linecorp.com/jobs/1279)
- [Data Engineer - LINE TODAY](https://careers.linecorp.com/jobs/1278)
- [Senior Data Engineer - EC](https://careers.linecorp.com/jobs/1155)

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
