---
title: "SDN x Cloud Native Meetup #29 活動心得"
tags:
  - Cloud
  - SDN
  - Container
  - Kubernetes
  - meetup
categories: 研討會
date: 2020-07-01 02:12:51
---

# 前言

本次活動連結：https://www.meetup.com/CloudNative-Taiwan/events/271350471/

這次一樣是線上小聚的方式為大家帶來精彩的活動，自從碩班畢業之後對於 Cloud Native 接觸的頻率就越來越低，最多是在工作上可能會擦邊學到相關的內容，較多面向程式開發上，那也因為剛好有機會可以跟上活動時間，既然以前有相關經歷那就來參加看一下大家現在都在討論些什麼新知識 🙂。

<!-- more -->

# How to make your Container/Kubernetes is a bit more secure - Kyle Bai

講題主要圍繞在 Cloud Native 的 4C module 安全性上：

- Cloud/Co-location
- Cluster
- Container
- Code

這次的議程主要帶到許多在 Cloud Native 上安全性的問題，首先就帶來兩個案例，從中最有印象的就是`羅門幣`的挖礦程式，因為以前在 openstack 時伺服器也曾經遭襲擊過 😆，以及幾個 CVE 認證過的漏洞，講者當中提到 `CVE-2018-1002105` 並說明他在 KubeCon 中被很多位講者講過，也提醒加入這行的朋友還是要去了解一下，因為發展與迭代越來越快也建議趁早了解對之後再實作時會比較好。

用 Cloud 除了要注意一些 RBAC 之外，也需要注意這兩個問題:

- [Misconfiguration Issues](https://owasp.org/www-project-top-ten/OWASP_Top_Ten_2017/Top_10-2017_A6-Security_Misconfiguration)
- Automation： 自動化有時若沒檢查的話可能會導致漏洞傳播速度很快

接著還有使用 AWS 上的一些例子帶到安全性相關的問題，例如 RDS、DynamoDB 若這些資料庫 VPC 沒有管控好的情況下，開發者在不經意的情況下將 Internet 對外且沒加密，就會將資料庫直接暴露在危險中。

中間的部分就稍微整理一下幾個我叫有印象的議題：

- [PoLP 的最小權限原則](https://en.wikipedia.org/wiki/Principle_of_least_privilege): 當一個東西分工越細時就越需要控管權限，程式、容器、虛擬機都是。
- 盡可能用一些工具去增加資安議題的可見度，盡可能地避免問題產生。

> 工具參考：截圖

![](https://i.imgur.com/qNjsU0g.png)

- 透過 code review 的方式降低被從程式碼注入的問題。
- 權限的開放程度須依照需求去開放，團隊需要討論權限的釋放程度。

最後快速整理出一些講者提到的內容：

- 去縮小 Images size，使用 scratch 建立以及 Container tools - [distroless](https://github.com/GoogleContainerTools/distroless)來避免一些安全疑慮

![](https://i.imgur.com/Zy4TBFm.png)

- 使用 TUF、Notary 去對 Image 去做簽證，讓 Image 上 kubernetes 之後是有認證的，將為簽證的都剔除。
- 公司需要制定個 image security policies，當呼叫 API 之後若權限不同則直接 reject。
- 用 TLS 去處理一些事情可以增加 cod&code 之間的安全性
- 有些 port 不開開都要注意，一些 metrics port 都要注意。
- 3rd Party Dependency 安全性須要注意，使用前注意一下更新時間以及頻率，若覺得不行用就需要找替代方案。
- 透過一些自動工具去靜態檢查程式碼 - [Lint](https://nijialin.com/2020/06/22/why-i-need-lint/) 可以參考我之前的文章
- 要記得用一些工具去檢測 OWASP 相關問題 CSRF、XSS、SQL Injection。

# Public Cloud Networking - Rick Chen

首先先帶入講者收集的 public cloud 關心程度問卷，大家現在最重視的是`資訊安全`，想想以前學校的程式我們根本沒在管資安 😆
![](https://i.imgur.com/HiSp9pF.png)

AWS 沒意外的也是大家最常用，Azure 與 GCP 則緊跟在後。

接著提到一般服務基本上都會擁有兩個平台以上(像是 17)，畢竟當一家雲平台因為有問題時總不能讓自家服務中斷，會有另一家來預備也是滿正常的。
而講者這次分享的這個產品就是在解決跨雲的問題，因為要一般的店家、工程師要精通兩個雲以上是很困難的事情，那也就造就這個產品的誕生。

演講中有提到是使用一個 EC2 去管理 GCP、Azure、AWS 的權限，接著在透過 gateway 來做 data plane，其他則會有 Controller 來邏輯。

> 這邊沒聽得很清楚，但概念上應該可以參考[這篇文章](https://www.ithome.com.tw/node/77353)

這邊講者也希望做出一個透過邏輯去管理不同 Cloud 的 network platform，而在中間就個麻煩部分就是要處理各家的 VPC 問題，在一些情況下這些 VPC 是需要 isolation， 而 Public Cloud 又要同時兼顧 high-performance。

最後看到其他人問了一個問題：「VPC IP 重疊怎麼辦」

回答：首先要收不同用戶到 AWS 上，此時無法控制對方的 IP，因此需要做雙向 NAT，先給一個 virtual range 將實體 IP 透過第一層 NAT 轉掉後往下，而另一邊也透過一層的 NAT 將 IP forward，接著中間會有一層 gateway 來處理這兩邊，如此一來兩邊都不會知道對方的 IP 並且不會有 IP 相撞的問題。

# 結論

許久沒碰 Cloud Native 相關的東西對於內容實在是有種是既熟悉又陌生的感覺，許多代名詞已經許久未更新，藉由這一次參加小聚讓我的資料庫終於開始更新了 🎉，感謝小聚提供這麼棒的空間讓大家可以來學習，也希望我能趕快更新資訊跟上大家的腳步。
