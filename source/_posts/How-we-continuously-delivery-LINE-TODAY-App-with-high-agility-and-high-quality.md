---
title: >-
  2019 LINE Dev Day - 議程心得(2) - How we continuously delivery LINE TODAY App with
  high agility and high quality
tags:
  - LINE
  - Dev Day 2019
categories: 研討會
abbrlink: 2683526012
date: 2019-11-22 00:55:53
---

# How we continuously delivery LINE TODAY App with high agility and high quality
![](https://i.imgur.com/ZGXdq4F.png)

簡報連結: [URL](https://speakerdeck.com/line_devday2019/how-we-continuously-delivery-line-today-app-with-high-agility-and-high-quality)

# 前言
大家好我是 [Chatbot Developer Taiwan](https://www.facebook.com/groups/chatbot.tw/) - NiJia，很開心這次能夠以 LINE API Expert 的身份被邀請來參加 LINE Developer Day 2019。

這個議程是難得出現的台灣人，一開始只是想說聽看看 LINE TODAY 是如何透過維持高度敏捷以及保持高品質，其實也就是瞎子摸象，結果聽到自我介紹後發現是台灣人來講，感覺就是在異地聽到一個台灣味的口音覺得很親切🤣

接下來就看一下我聽完這場的心得吧!

# 負責專案

- LINE
- LINE TODAY
- LINE SDK
- LINE MUSIC(Taiwan)
![](https://i.imgur.com/nVgupO1m.jpg)
最近常常出現在左上角的那個 LINE MUSIC

## 流程
![](https://i.imgur.com/WTUuqWX.png)

從 Pull Request - Code review - Build pipeline - unit test - UI test - deploy

當中提到兩個主要部分：
- Unit test: 覆蓋率最好要多少？
- UI test: 自動化測試的可信度？

![](https://i.imgur.com/kNu9cv9.jpg)
且在測試當中會有一種測試叫做 flaky test，有時候測試有過、有時候有沒過，完全讓人摸不著頭緒的測試，這會傷害到軟體品質以及覆蓋率，因此若這種狀況出現時趕快號招團隊的人來討論這個狀態是否處理。

> [flaky test](http://blog.castman.net/%E7%A0%94%E7%A9%B6/2016/06/06/flaky-tests.html)

## UI 自動化測試
在這部分提到說 UI test code 好寫但是難去維護，主要在於 UI 的東西可能會因為裝置、作業系統...等等的問題去影響到，且會很容易出現 flaky test，這邊我詢問講者得到的答案是測試只要確認在當前 UI 上最重要的元件若有出來的話這部分的測試就給過，若太精細的測試時常會影響到整體的開發敏捷度與流暢度。

> 想想也是有道理，平常聽到人家說測試測試的，只是當今天測試時的究竟是要到多詳細還是要取決於團隊的決定。

這段講者有提到要注意 UI Automation test 是 [Smoke test](https://en.wikipedia.org/wiki/Smoke_testing_(software))，因此要注意**維護成本**以及**flaky test**的問題！

## 驗收標準 - [Acceptance Criteria](https://www.altexsoft.com/blog/business/acceptance-criteria-purposes-formats-and-best-practices/)
![](https://i.imgur.com/N5ovDf7.jpg)

接著就提到團隊需要準備各種情境所需要的東西：
- 不一樣的測試資料來讓產品有**彈性**且是**可信賴**
- 若有針對類似 Database 這類的測試團隊則更需要去注意測試細節避免導致特異情況
總之就是 Product Owner(PO) 是需要訂定團隊規則並讓大家去遵守，確保品質！

![](https://i.imgur.com/Vq13ngl.png)
這裡有提到他們經由上述制定好的驗收標準之後，隨著 Release 版本之後的手動測試比率逐漸減少，到後來都是偏向自動化測試去處理，且是有團隊可信度。

## Code Coverage
這邊以 iOS 開發為例，首先就是 MVC 框架上所遇到的問題，官網都是以 MVC 下去做範例，但實際上開發起來則是還得以 MVVM 的框架去執行在測試的部分才不會採太多不必要的坑。
![](https://i.imgur.com/WOIgOQe.png)
接下來提到的部分我覺得是這個議程最重要的一部分，就是如何去取捨覆蓋範圍，像是上圖顯示，可能會有一些 Callback 或是其他的是不可預期的範圍，團隊需要將這些問題一一列出來討論，並且去制定一個最低標準以及 Must have 的標準，促使團隊可以更有規則的去進行開發，如下圖所示。
![](https://i.imgur.com/jidpVl3.png)

# 結論
其實一家公司很願意花成本去讓開發者可以去寫各種測試確認服務品質，若是以普遍環境來說這真的是很難人可貴的地方，此外從中也了解到一個好的流程應該是如何，從談需求到開發中間所要經歷過多少事才能讓一個服務起來，測試這部分真的是很大的一門學問，千萬別寫一堆測試但這個測試只是自己測開心的，而是要讓測試的內容可以讓團隊很放心的將 code 交給測試去驗證，達到這樣子目的的程式我相信在市場上一定是很能接受考驗的！
![](https://i.imgur.com/HnFB307.png)
