---
title: >-
  2019 LINE Dev Day - 議程心得(3) - Armeria - A Microservice Framework Well-suited
  Everywhere
tags:
  - LINE
  - Dev Day 2019
categories: 研討會
abbrlink: 1377449472
date: 2019-12-01 10:44:45
---

# Armeria: A Microservice Framework Well-suited Everywhere
![](https://i.imgur.com/MNnrFnm.jpg)

- [簡報連結](https://speakerdeck.com/line_devday2019/armeria-a-microservice-framework-well-suited-everywhere)
- [Github](https://github.com/line/armeria)
- [官網](https://line.github.io/armeria/)

# 前言
大家好我是 [Chatbot Developer Taiwan](https://www.facebook.com/groups/chatbot.tw/) - NiJia，很開心這次能夠以 LINE API Expert 的身份被邀請來參加 LINE Developer Day 2019。

本次議程是由韓國的 open source manager - [trustin](https://github.com/trustin) 為我們帶來議程。

而在今年參加八月舉辦的 COSCUP，並且在第一天的 after party 參加 LINE BoF 上就已經看到 LINE 開發的 Open Source - [Armeria](https://github.com/line/armeria)，它是基於 Java 所撰寫的一個非同步的專案，支援 Java8, Netty, HTTP/2, Thrift 以及 gRPC，當時聽團隊簡單介紹就覺得這個專案一定是個很不得的專案，只不過當時因為他們快速介紹兒少聽了很多細節，這次就把我聽到的細節告訴各位吧！

> 據之前的議程的以及講者的分享說這個服務已經被應用於很多 LINE 服務裡頭，因為覺得好用才推出來🤣

# 如何讓開發者快速使用 Armeria

接下來就用 Java code 來簡單火力展示如何用一個串聯式寫法把服務互叫起來，不管是要用什麼服務只要用串接的方式加入即可，像是 gRPC、Thrift、annotation...等等如下面幾張圖所示。

![](https://i.imgur.com/KKU0eXG.png)

---

![](https://i.imgur.com/6rAex3K.png)

---

![](https://i.imgur.com/mAKhwh4.png)

---

![](https://i.imgur.com/Z9jfFkI.png)

> 這邊看到可以這麼簡單就把一個服務叫起來，然後要讓他開發者可以很輕易地理解並上手，LINE 團隊的開發文化真的是令人佩服...

# 為什麼要做成 async 以及 reactive
首先就先提到若 Queue 裡頭的東西若是都 sync 的話會有什麼問題，這邊就以一個 Call API 常遇到的問題 - Timeout，在大量的 Queue 在排隊時，以 sync 的方式存在時光遇到 Timeout 就會有服務器爆炸的問題，因為彼此不能影響彼此，且這件事會發生在真實世界的每個地方。
![](https://i.imgur.com/Telr7lG.jpg)

---

![](https://i.imgur.com/hkltFFS.jpg)

這邊講者提出的解決方案為：
- 增加執行緒的標記(#)並且減少呼叫堆疊(stack)
- 預準備 Tread pools 讓大家互相共享
- 少調用 points
- 使用非同步的好處就是能夠平行呼叫+較少的執行緒

現在他們能用非同步的方式解決系統被鎖住的問題，但今天若遇到一個很肥～的 payload 呢？以範例來說若一個用戶送他 10 MB 的大小，一次送給 100K 個用戶就相當於 1 TB 大小的流量。

這邊使用的方法是用不同的頻寬 & 處理能力，並且只需要足夠的 buffer 來排除  Out of Memory 的錯誤。

![](https://i.imgur.com/10mGUaD.jpg)

聽到這邊看起來是使用相關的工具來讓整個串接服務可以更有效的 Debug，最後透過 Kibana 來讓訊息可視化，讓 Debug 可以更加快速。
> 若對相關 Debug 工具可以參考我之前寫的 [Sentry 文章](https://nijialin.com/2019/11/12/sentry-in-serverless/)

> Kibana 可參考： [安裝 ElasticSearch + Kibana 實現中文全文搜尋與數據分析](https://blog.toright.com/posts/5319/fulltext-search-elasticsearch-kibana-bigdata.html)

# 結論

經過了講者一連串的火力展示後感受到 LINE 對於 open source 有多麽的重視，連 Slack 也都愛上 Armeria 這套 Java 函式庫，用於他們的軟體中並公開推薦，讓像我這種喜歡做 open source 的工程師可以燃起新希望繼續為開源做努力。
![](https://i.imgur.com/eKYqMpo.png)

其實還有很多技術細節的部分在簡報裡，這邊我就不再多家贅述，大家可以參考 [GitHub](https://github.com/line/armeria)，裡面有更加詳細的用法提供給大家。

這次來 LINE Developer Day 讓我感受到不同於其他大公司的文化，除了精彩的議程外也招待我們這群 LINE API Expert 前來共襄盛舉，若你也想成為 LINE API Expert，不妨拿著你的貢獻來申請看看[連結](https://www.line-community.me/contributors/request)，或許明年我們就能一起去啦！

或是你想面對面直接問問看，也可以來 [Chatbot Taiwan](https://www.facebook.com/groups/chatbot.tw/) 參加我們一個月一次的社群聚會喔！我們時常會邀請 LINE 的資深技術傳教士 - Evan 來為各位帶來第一手 LINE 的資訊，也許可以跟他詢問看看，或許會有意外的收穫喔！
![](https://i.imgur.com/kIDIfPl.jpg)
