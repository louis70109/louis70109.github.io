---
title: 2021 LINE Taiwan On Job Training(OJT) 線上花絮
tags:
  - On Job Training
  - LINE
categories: LINE
date: 2021-10-29 20:44:17
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

![](https://nijialin.com/images/2021/ojt/1.png)

# 前言

一年一度 LINE Taiwan On Job Training 在許多同仁加入之後就正式展開啦，這兩年來因爲疫情的關係小編無法與大家一起前往日本受訓，但台灣內部講者、技術資源也是非常豐富，怎麼可以錯過這麼寶貴機會 😁

員工訓練一直工程部門都是很注重的一環，除了大家日常熟悉的 Coding 之外，包括整個部門的狀態、文化、資安意識、開發規範、部署工具等等都是需要了解的部分，

LINE 工程團隊為了持續增加開發品質，一直很遵守所以資安以及許多開發上的規範，而在新人剛加入時不免需要讓大家知道許多規範

> - [【LINE】新進員工的內部訓練花絮](https://engineering.linecorp.com/zh-hant/blog/2020-new-employee-traning/)

<!-- more -->

# Engineering Introduction

教育訓練很重要的一部份就是要讓大家知道這個團隊是如何被建立起來，因此在開場就由 CTO - Marco 為大家帶來部門的歷史以及整體部門架構的組成等等，而在前半段中有幾個需要新加入同仁省思的問題

- 你覺得 LINE 是怎樣的公司?
- 為什麼要加入 LINE?

隨著部門持續擴增，都要盡可能地讓新進同仁可以清楚了解自己加入的初衷，並且時刻回想，讓大家在這麼快速成長的團隊中可以跟著大家的部門一同成長。

> 若對於加入我們有興趣，不妨先從 LINE 裡面有的在地化服務開始著手使用吧！相信會對你之後更有幫助 ：）

## 任何一段 Code 進入前都需要被 Review

![](https://nijialin.com/images/2021/ojt/2.png)

如同上述所說，在產品與團隊越來越多之後，品質的控管就格外重要，在工程部門裡的衷旨就是「**任何一段 Code 進入前都需要被 Review**」，因為這些程式碼可能隨著產品快速迭代之後，下次再更動到的時間可能就很少，為了讓往後的人可以更快速了解當時所做的內容，因此在 Code Review 階段時就顯得格外重要，也讓這份程式碼是有一個以上的同伴一起確認它的品質是足夠的，往後在查找問題時也較能快速找到問題發生點。

---

除了打造服務外，由於人員越來越多，當然也就需要 Developer Relations 這樣的部門角色來建立起優良的內部文化，讓大家除了在打造生態系服務的同時，也可以透過各式各樣的內部活動來互相學習與交流，讓每位工程師可以將自身努力的經驗分享給大家。那到底做了些什麼呢？以下就由 Developer Relations 部門的資深技術推廣工程師 – Evan Lin 為大家介紹這個角色日常都在做些什麼。

# 文化的重要性 Developer Relations

![](https://nijialin.com/images/2021/ojt/4.png)

- **Take Ownership**
  我們注重讓每位開發人員的自主權，從規劃、開發、參與討論，讓大家決定該做什麼、該怎麼做。這邊講者首先以 Antman 這個專案為開場介紹，透過工程師們自主提出問題，與不同團隊協同開發，讓壓縮的方式來節省圖片儲存空間 (詳細參考此篇)。
  接著是去年的 LINE SPOT 口罩地圖，因為疫情的關係，剛好搭配 location-based 的 LINE SPOT，在短短的幾天內迅速打造出口罩地圖，讓各位可以在線上就可以查詢還有哪邊還可以買到口罩，在嚴峻的疫情下效率最大化讓大家可以以最有效的方式找到需要的東西，同時也鼓勵每位同仁發揮黑客的精神持續打造與發想新的應用。
> 延伸閱讀： [LINE Taiwan Internal Hackathon 2020 活動紀錄](https://engineering.linecorp.com/zh-hant/blog/line-taiwan-internal-hackathon-2020/)
- **Be Open**：鼓勵每位同仁踴躍參加研討會或是當講者，除了分享自己在專案上學到的東西外，也能學習成果不同領域的講者所使用的技能，回饋平台上應用的新技術與新知於社群上，讓自己更進步外也能更多瞭解其他地方是如何應用相關技術。
- **Trust and Respect**：團隊間成員彼此互相信任且尊重彼此的意見，當團隊裡的成員提出不同角度的想法時，能夠藉由彼此的討論，進而增加產品的創新性與提升團隊的化學效應。

> 歡迎參考在 [Recruitment Day 2021 的議程](https://engineering.linecorp.com/zh-hant/blog/line-recruitment-day-2021/#internal-developer-relations)

呼應到開頭我們很注重員工們的資安、開發流程等相關意識，我們也有內部的學習系統 - LINE Class 上安排許多課程內容讓同仁們安排時間上完相關的課程，以隨時更新相關的知識與技術

> 延伸閱讀：[LINE Class 以資安主題打頭陣，透過線上學習及實作提升防禦力](https://www.ithome.com.tw/pr/139429)

## 為什麼要確認資訊安全? Security team 

![](https://nijialin.com/images/2021/ojt/6.png)

資訊安全從寫程式開始到日常生活中都是很需要重視的部分，也因為我們重視每位員工(使用者)的相關個人資訊，從入職的第一天就需要注意自己的相關資產是否保存得宜，是否有被竊取的風險，進而到每一行程式碼的相關風險評估，有效地保存個人的資訊從日常生活中就要開始囉！

> 雖然許多工具以及論壇上的內容都相當方便且快速，但在使用上還是要多注意相關細節，避免自己的資產遭受到影響～

## 共用工具的需求 - SRE team

服務的監控、可靠度以及部署上的種種疑難雜症都會需要 SRE 團隊的幫忙與協助，由於 LINE 的服務很容易在上線的同時抵達超高流量，因此在監測上就需要與開發不同服務的團隊下功夫把相關監測數據整理出來，讓服務可以達到各樣的可靠度指標。而在這麼多團隊(服務)的情況下，SRE 團隊就會經常性的協助排除疑難雜症。

因此這部分就需要新進同仁多多了解 SRE 團隊日常的相關工作內容，藉此讓各位在日後工作上只要有遇到類似問題才知道要如何諮詢與排解問題。

> SRE 團隊相關介紹可以查看 Recruitment Day 的影片

## 開發流程的重要性

- DevOps Task Force

當中的內容圍繞著以上列點的項目，首先的 Task Force，在 TECHPULSE 2020 有提到，歡迎大家參考影片中的內容

<iframe width="560" height="315" src="https://www.youtube.com/embed/XE7-xpTCCTM?start=945" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- Development Regulations Highlights
  - Development Processes
  - Source Code Management
  - Deployment System
  - Log Management

團隊擴編、程式碼持續迭代、Sprint 一個接著一個之餘，管理開發流程就相當的重要，一切都是要從基本做起，因此在這個部分的介紹讓新進人員可以透過訓練讓相關知識更加穩固，未來開發上也可以更依循相關的技巧讓專案變得更好維護以及監控。

### 延伸閱讀

<iframe width="560" height="315" src="https://www.youtube.com/embed/CfPf9VtvkNk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## [世界地圖競賽](https://virtualvacation.us/guess)

因為疫情關係無法帶同仁們去日本總部 Training (洗禮?)，但身在跨國公司怎麼能不有國際觀呢？因此將同仁們分到每組來體驗異國風情，當中許多同仁會透過各種方法來辨認地區，右駕、招牌、穿著、植物等等，甚至同仁直接開啟 F12 來檢查一下是不是有答案(API)在後面...(小編覺得佩服)

![](https://nijialin.com/images/2021/ojt/7.jpeg)

過程中非常的精彩，在有限時間內搭配組員間的默契也可以在分組討論的空間中互相幫忙，也讓每位同仁可以認識未來有機會合作的同仁，經過最後的競爭也前三名的同仁獲得小禮物啦～

![](https://nijialin.com/images/2021/ojt/9.jpeg)

# 結論

![](https://nijialin.com/images/2021/ojt/8.jpeg)

我們重視每位同仁的發展與相關的訓練制度，確保同仁們加入工程部門後對於跨部門知識是有一定的見解，日後合作時可以更清楚相關問題可以諮詢哪個部門，如果你也想加入我們，除了到 LINE Career 上投遞正職職缺外，如果讀者目前還是學生身份，也很歡迎申請我們 [TECH FRESH 計畫](https://careers.linecorp.com/jobs/83)的職缺，相關訊息放在下面提供給大家參考囉！

- [LINE Career 台灣類別](https://careers.linecorp.com/jobs?ca=All&ci=Taipei&co=East%20Asia)
- [TECH FRESH 計畫](https://careers.linecorp.com/jobs/83)

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
