---
title: 回顧 LINE Developers Meetup 第 15 場現場活動
tags:
  - LINE
  - DevRel
categories: 研討會
date: 2021-04-27 15:04:18
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

![](https://nijialin.com/images/2021/line-15/0.jpg)

# 前言

每年 LINE 都會安排許多活動讓每一位對 LINE 工程團隊有興趣開發者可以在**線上**或是**線下**直接詢問負責不同領域的同仁們，藉由交流不僅分享在企業中使用的技術細節，也拉近企業與開發者的距離，讓大家感受在 LINE 工作的幸福感指數 😊，希望可以透過本篇活動紀錄讓大家更認識 LINE 的工程團隊！

<!-- more -->

# 介紹

## 前端團隊

![](https://nijialin.com/images/2021/line-15/2.jpeg)

本次開場由負責 LINE TODAY 前端的 Liz 為大家介紹，開始前介紹一下 LINE TODAY，LINE TODAY 作為新聞網站的**主要路口**之一，架構裡也涵蓋了許多不同面向的功能，除了大家熟知的新聞外，也有影音、天氣、留言元件、甚至到泰國的樂透...等等，因此在這麼大的平台下就擁有許多不同單元的服務，同時這些服務都需要專業的前端同仁處理才能讓用戶可以使用到更流暢的服務。

<script async class="speakerdeck-embed" data-slide="3" data-id="76931cf6c2aa474ab12185ac509c5768" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

既然 LINE TODAY 富含了豐富的功能，在流量與產品面向越來越多的情況下，為了長期提供穩定的服務，該下的功夫也是要下足，尤其優化就是很重要的一部分，開始就先列出以下兩個挑戰：

- 巨大的流量
- 多元的產品服務

為了提供穩定的服務與 UX 以外(`效能`)，在開發的過程也要注重 `彈性`，讓整個平台的架構可以乘載未來的新功能，因此有許多部分項目都是需要注意的部分。

<script async class="speakerdeck-embed" data-slide="9" data-id="76931cf6c2aa474ab12185ac509c5768" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

### Performance

提到效能的挑戰，莫過於該評估現在效能是否會有影響的問題，或是該把時間投資在新功能的開發時程，這邊使用 [First Contentful Paint](https://web.dev/fcp/)(FCP) 作為其中一個指標(當然還有很多不同的指標)，FCP 簡單來說表示使用者從進入 web app 時畫面渲染出所有 DOM **所需的時間**，大家不妨可以使用它來測試一下自己 web 的狀態如何。

<script async class="speakerdeck-embed" data-slide="10" data-id="76931cf6c2aa474ab12185ac509c5768" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

另一個效能處理的部分，這邊選擇 Nuxt.js 做為處理前端部分的框架，在處理 web 應用程式時，會因為不同的環境條件而需要從 Server 處理好整包 HTML 再丟到前端渲染(`Server-Side Render`)，抑或是直接在前端做`靜態檔案處理`(讀者可以參考 [Nuxt.js 官網說明](https://nuxtjs.org/))，選擇當前環境最需要的部分做處理，讓效能能夠最大化。

![](https://nijialin.com/images/2021/line-15/1.png)

### Scalable

而因為 Nuxt.js 在處理兩個部分時能夠讓整個專案共用同一個邏輯，且在初始化時就已經幫大家分類好架構，只要依循官方所提供的架構下實作，就不用因為使用的渲染方式不同而將同個操作邏輯分開導致專案使用各種方法處理(例如: Class、Function、Interface)，Nuxt.js 在這部分提供很好的開發者體驗，讓開發者可以更專心的實作其他的邏輯。

講者另外提到可以參考  [Workspaces in Yarn](https://classic.yarnpkg.com/blog/2017/08/02/introducing-workspaces/) 的規範，來 Reuseable 不同的 SDK。

<script async class="speakerdeck-embed" data-slide="18" data-id="76931cf6c2aa474ab12185ac509c5768" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

此外也可以使用 async 的方式來降低主要`檔案的大小`，並且可以切分商業邏輯，讓可以先處理的部分先去處理，除了讓更多的東西可以達到共用外，也可以同步增加效能。

在結合了上述提到的功能，大幅增加效率，或許大家在處理前端領域的專案時不妨也使用看看以上的技能吧！

<script async class="speakerdeck-embed" data-slide="21" data-id="76931cf6c2aa474ab12185ac509c5768" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

> 對 TODAY 有興趣可以參考其架構

<script async class="speakerdeck-embed" data-slide="8" data-id="52067d63f1814086824fdec298e3f1e7" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

持續優化現有架構，因此需要優秀的人才加入，一起處理台灣的新聞入口服務！職缺的部分可以參考以下：

- [Frontend Engineer](https://careers.linecorp.com/jobs/7)
- [Server-Side Developer](https://careers.linecorp.com/jobs/250)
- [QA Engineer](https://careers.linecorp.com/jobs/19)

## 資料工程團隊

![](https://nijialin.com/images/2021/line-15/3.jpg)

MarTech = Marketing + Technology，簡單來說運用科技與量化技術來解決行銷上痛點，任何幫助行銷達成目的的科技手段。以下圖來說，從用戶的獲取、培養到最後的成功轉化或流失，其中每一個環節都是行銷所在意的點，這也就是 MarTech 被分為六大領域應用的原因。

<script async class="speakerdeck-embed" data-slide="6" data-id="113fe6d7a3294eb58de8532e4a9ededc" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

除了資料收集、整合、分析、應用之外，在這部分與行銷人合作也需要許多的考量，不同技能領域的了解程度、運算資源、資安考量...

<script async class="speakerdeck-embed" data-slide="8" data-id="113fe6d7a3294eb58de8532e4a9ededc" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

而在資料工程團隊中主要有四個主要的應用:

- 視覺化系統
- 推薦系統
- 廣告
- Chatbot

透過分享上述的一些使用案例，並實際帶入平常專案有使用到的技術來把握每次曝光的機會，如透過 Related Search、Smart POI、User Tagging、Uplift Modeling 來處理個人化需求以及優化廣告的成效表現(例如：ROI)，將廣告優惠提供給對的人身上，將效益發揮到最大化。

> 相關文章： [LINE 資料工程團隊如何透過專業分工與 MLOps 打造不同服務 | 以 MarTech & NLP 為例](https://engineering.linecorp.com/zh-hant/blog/lets-play-in-data-park/)

<script async class="speakerdeck-embed" data-slide="13" data-id="113fe6d7a3294eb58de8532e4a9ededc" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

在講者的經驗中，使用 MarTech 相關工具都會有三種特性，透過自動化與平台來降低成本與共用資源外，也讓 Marketing 更能有效地使用科技來解決實務上的痛點。

<script async class="speakerdeck-embed" data-slide="16" data-id="113fe6d7a3294eb58de8532e4a9ededc" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

在傾聽 Marketing 同仁對於商業上應用的影響範圍同時，我們也需要將訊息收斂並使用模型所量化出來指標告知同仁，已達到 MarTech 的極致目標。

<script async class="speakerdeck-embed" data-slide="17" data-id="113fe6d7a3294eb58de8532e4a9ededc" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

- [「How ML Powers LINE Services」機器學習如何的讓 LINE 的服務能更貼近使用者](https://engineering.linecorp.com/zh-hant/blog/how-ml-powers-line-services/)

## 團隊介紹

### LINE SHOPPING - 「先 LINE 購物，再購物」

LINE SHOPPING 是我們的主要服務之一，由 [LINE 電商團隊](https://engineering.linecorp.com/zh-hant/blog/2021-line-taiwan-developers-recruitment-day/#id-2021recruitmentday%E6%8B%9B%E5%8B%9F%E6%97%A5%E6%96%87%E7%AB%A0-#LINE%E9%9B%BB%E5%95%86)負責開發，提供相似商品比價功能，用戶可搜尋上千萬筆的商品，讓用戶在 LINE 購物消費之後，將收到 LINE 回饋的 LINE Points。除此之外，也需要串接 LINE 其他國家的平台，同時也需要與本地各個廠商合作。

<script async class="speakerdeck-embed" data-slide="2" data-id="d054b33acca24eec8005828a255fc47f" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

本次則由 LINE SHOPPING 團隊 Machine Learning Engineer - Vila 從 ML 的角度來分享在服務中所應用日常的技能。在如此巨量的資料下，如何有效存好並使用資料也是一門學問，並且要處理**分析**、**監控**、**模組化**、**展示**...等等相關功能，除了在有限的時間內詳細的講解資料處理的部分，也透過範例向大家展示 SHOPPING 裡頭有使用到的相關功能(類別推薦、資料分析展示網站、個人化推薦...)，更多內容請參考簡報。

<script async class="speakerdeck-embed" data-slide="5" data-id="d054b33acca24eec8005828a255fc47f" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

因為 LINE 在各種節日時常會有大流量的問題，因此在日常開發上講者就快速整理了一些較大方向所需面對的挑戰，讓大家了解到在一個平台上處理問題時的思考方向。

<script async class="speakerdeck-embed" data-slide="12" data-id="d054b33acca24eec8005828a255fc47f" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

如果你是學生且對於 ML 與資料有興趣的話，不妨直接寄送履歷([連結](https://careers.linecorp.com/jobs/83))，除了挑戰超高流量平台外，還有機會與不同國家的工程師合作！

<script async class="speakerdeck-embed" data-slide="15" data-id="d054b33acca24eec8005828a255fc47f" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

以下也有許多與 SHOPPING 團隊同仁的分享：

- [第 14 場 LINE Developers Meetup 活動分享](https://engineering.linecorp.com/zh-hant/blog/line-developer-meetup-14/#LINE-SHOPPING-購物)
- [LINE Taiwan x Java 年度盛會：JCConf 2020](https://engineering.linecorp.com/zh-hant/blog/line-jcconf-2020/)

### LINE Pay

![](https://nijialin.com/images/2021/line-15/6.jpg)

打開 LINE 之後點選最右邊的 tab，不僅有錢包，包含了付款、贊助、金融、我的會員卡...等等許多功能

<script async class="speakerdeck-embed" data-slide="2" data-id="3298c104de1646e89c202f575f04fc4f" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

LINE Pay 運用密碼學的原理，使用公、私鑰讓用戶可以在很短的時間內完成付款又兼具安全性，讓大家清楚的知道上課時所學的密碼學是相當重要的，畢竟若是透過持續的呼叫 API，除了增加 Server loading 以外，在使用體驗上也會非常痛苦(e.g. 付款需要三秒)。

<script async class="speakerdeck-embed" data-slide="3" data-id="3298c104de1646e89c202f575f04fc4f" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

作為 LINE Ecosystem 的一員，LINE Pay 也是不同小覷的，如合作商家的數量也是相當驚人

<script async class="speakerdeck-embed" data-slide="7" data-id="3298c104de1646e89c202f575f04fc4f" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

當然，若您對於加入 LINE 大家庭一起打造 WoW 的服務，歡迎參考職缺：

- [Front-end Engineer](https://careers.linecorp.com/jobs/76)
- [Server-side Engineer](https://careers.linecorp.com/jobs/75)

### [LINE SPOT](https://spot.line.me/)(熱點)

LINE SPOT 團隊是主要是開發 O2O (Online to Offline) 及活動相關的服務，LINE SPOT 是一個以您所在的位置為起點，讓您可以在上面看到各式店家的優惠資訊，把線下的資訊整合到線上的一個全新的服務。此外 SPOT 團隊也很熱衷於使用新技術，包含 Docker、kubernetes、Kafka，各類程式語言 (Java、Scala、Go、Node.js) 等，提供使用者更多創新的功能。

<script async class="speakerdeck-embed" data-slide="4" data-id="22a9ae41b3154def9d21fc2001ec5415" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

在團隊中有幾項被歸類出來的挑戰：

- 彈性與可用性: 有許多需要運算的資源，如最近地點
- 整合不同來源的資料集
- 管理 Kubernetes 中的微服務們

除了要克服上述的挑戰之外，LINE SPOT 團隊也很享受使用新的技術，讓對的工具放在對的地方。

<script async class="speakerdeck-embed" data-slide="8" data-id="22a9ae41b3154def9d21fc2001ec5415" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

更多過往的分享可以參考：

- [在 「LINE 熱點」服務上如何處理地理性資訊 ( Serving Location-based data)](https://engineering.linecorp.com/zh-hant/blog/serving-location-based-data/)
- SPOT 團隊強者同事的分享 - [Open Policy Agent – 快速導入 Authz 至 Microservice 架構](https://engineering.linecorp.com/zh-hant/blog/open-policy-agent-authz-in-microservice/)

### Automation Engineer & SRE

![](https://nijialin.com/images/2021/line-15/5.jpg)

如果讓開發人員與維運人員之前的交付過程更順暢，工程文化在其中佔了很大的比例，有好的環境才有辦法讓整體服務交付更加順暢，並且又有品質保證，是不是很棒呢？

Automation Engineer 致力於強化 LINE 的產品品質，了解產品需求，掌握產品開發及測試時的脈絡，分析並快速反應產品的問題，並開發相對應的自動化測試，確保產品品質信心水準，加速整個開發循環。除了使用到許多測試工具外，也遵照一定的工法執行來加速交付時間。

<script async class="speakerdeck-embed" data-slide="4" data-id="4a233e90fafd4fa3b08fb1d847cf65c8" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

在提供受歡迎的服務的同時，服務的可靠度一直都是一個很重要的課題。在 LINE 的 SRE 團隊，我們最重要的目標就是將可靠度轉換成可以被量化的指標，建立各種機制來持續監控這些指標，以用來協助各服務團隊進一步的提升可靠度，找出最適合的解決方案與最佳的佈署策略，並讓服務可靠的在線上運行。

<script async class="speakerdeck-embed" data-slide="5" data-id="4a233e90fafd4fa3b08fb1d847cf65c8" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

講者也額外分享，隨著工具越來越多，與團隊同仁討論並挑選出最適合團隊的工具往往才會是最佳解，希望大家在導入工具時要仔細評估。

<script async class="speakerdeck-embed" data-slide="6" data-id="4a233e90fafd4fa3b08fb1d847cf65c8" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

- [QA Automation Engineer](https://careers.linecorp.com/jobs/18)
- [QA Engineer](https://careers.linecorp.com/jobs/19)
- [TECH FRESH](https://careers.linecorp.com/jobs/83)

### LINE Verda

一切的基礎都需要有 Infra 團隊才有辦法建構服務，LINE Verda 作為私有雲服務即是負責處理 LINE 裡所有的基礎設施，在 2020 的[ COSCUP 中也有分享](https://engineering.linecorp.com/zh-hant/blog/line-coscup-2020/#How-We-Integrate-and-Develop-Private-Cloud-in-LINE-Gene-Kuo)與 Verda 相關內容，過了一年之後，Verda 的基礎設施又更加的成長了～

<script async class="speakerdeck-embed" data-slide="3" data-id="edbb323f728a40edb0541b772999b202" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

除了 Infra Engineer 以外，也歡迎不同領域的朋友一同前來打造 LINE 的私有雲服務

<script async class="speakerdeck-embed" data-slide="4" data-id="edbb323f728a40edb0541b772999b202" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

<script async class="speakerdeck-embed" data-slide="5" data-id="edbb323f728a40edb0541b772999b202" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

- 參考文章：
  - [【Team & Project】Meet the Team Developing the Verda Platform Using OpenStack and Kubernetes](https://engineering.linecorp.com/en/blog/verda-platform-team/)
  - [[Team & Project] Introducing the team in charge of Site Reliability Engineering for the Verda platform](https://engineering.linecorp.com/en/blog/team-project-introducing-the-team-in-charge-of-site-reliability-engineering-for-the-verda-platform/)

# 結論
![](https://nijialin.com/images/2021/line-15/LRD.png)

看了上述的內容是否想更了解 LINE 的工作呢？除了可以直接至 [LINE Career]((https://careers.linecorp.com/jobs?co=Taiwan)) 上投履歷之外，LINE 也即將在 **5/22** 的[招募日](https://engineering.linecorp.com/zh-hant/blog/2021-line-taiwan-developers-recruitment-day/)與大家見面，現場會有許多工程團隊的同仁來為大家介紹，歡迎大家來[報名頁面報名](https://linegroup.kktix.cc/events/20210522-devel)參加本次盛會！

### 【學生票申請方法】
請先翻拍或掃描學生證
寄送至 dl_dev_meetup@linecorp.com
資格符合後即可獲得邀請碼

### 【轉職邀請票申請方法】
寄送履歷至 dl_dev_meetup@linecorp.com
資格符合後即可獲得邀請碼


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
