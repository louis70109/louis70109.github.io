---
title: 如何設定 Cloud Function 2nd gen 來改善截圖爬蟲的效率！
tags:
  - Google
  - GCP
  - Cloud Run
  - Cloud Function
  - Cloud Scheduler
categories: GCP
date: 2024-02-13 13:34:01
---


# 背景介紹

![](https://nijialin.com/images/2024/gcp/1.png)

過年改寫了我自己的在台北常使用的路上攝影機截圖工具，一開始求方便在每次請求來時會在容器當中開啟 chrome 去截圖，但由於是 MVP 以及沒有放 queue 在前面讓請求排隊，因此這樣的做法就無法提供給別人使用。

因此為了可用性，需要把截圖功能透過排程(cronjob)去實作，不過在 GCP 上還不能 Cloud Run 搭配 Cloud Scheduler，所以這次就將截圖功能改搬到 Cloud Function 並搭配 Cloud Scheduler 排程抓取。

<!-- more -->

過往我很習慣在 Cloud Run 上實作任何的功能，這次也是第一次實際操作 Cloud Function，以下就介紹一下兩者是如何搭配使用的！

## 台北板場截圖 LINE Bot

> 參考上一篇文章：[在 Google Cloud Run 上安裝 Chromium 抓取 CCTV 影像](https://nijialin.com/2023/11/13/line-bot-capture-image-cloud-run/)

![](https://qr-official.line.me/sid/L/556trgib.png)

# 介紹

以下會簡介 Cloud Function 操作完後如何銜接 Cloud Run 的步驟，那就繼續往下看吧！

## 建立第一個 Cloud Function

![](https://nijialin.com/images/2024/gcp/2.png)

前往 [Cloud Function](https://console.cloud.google.com/functions/list?hl=zh-tw)，並在介面上按下<mark>建立函式</mark>，即可看到相關畫面

## 直接線上搭配 Cloud Shell 開始寫程式測試！

![](https://nijialin.com/images/2024/gcp/3.png)

把基本資訊設定完後，Cloud Function 這邊跟其他 FaaS 差不多，都有提供編輯界面供撰寫。而這邊夠更棒的是，GCP 的服務很多是搭配 Cloud Shell 讓功能可以在**部署前先測試**好，確認沒問題再部署上去，讓小本開發的我們可以避免來回部署花費了很多流量 💰🤣

## 寫完 Cloud Function 了，那 2nd Gen 有什麼用？

![](https://nijialin.com/images/2024/gcp/4.png)

部署完後進來看看 Cloud Function，會發現上面怎麼會有個**第二代**的字眼，簡單來說是 Google 把 Cloud Function 整合進 Cloud Run，過往 Function 也是另外起 Container 沒錯，但在雲平台上看起來就是兩個不同的服務，藉由這樣整合也讓 Function 能使用到 Cloud Run 上面的很多好處，也可以從介面上直接通往 Cloud Run 開始操作。

相關操作範例如：「Eventarc、處理來自 Cloud Storage 或 BigQuery 的長請求、更多的 Cloud Events、併發處理...etc」

> 更多介紹:
> [Supercharge your event-driven architecture with new Cloud Functions (2nd gen)](https://cloud.google.com/blog/products/serverless/introducing-the-next-generation-of-cloud-functions) > [Cloud Functions version comparison](https://cloud.google.com/functions/docs/concepts/version-comparison)

## Cloud Function 怎麼去 Cloud Run？

![](https://nijialin.com/images/2024/gcp/5.png)

此外也能從介面上直接點選 🍔 直接前往 Cloud Run 設定，或是想要複製更多 Function 讓 Cloud Scheduler 使用，也都是沒有問題的！

## 換過去有什麼差？

![](https://nijialin.com/images/2024/gcp/6.png)

來到這邊之後就會跟原本使用 Cloud Run 的習慣一樣了 👏，想設定任何的 Cloud Event 或是調整和容器相關的係數，皆能在這邊操作，就不用分兩個畫面去調整了～

## 如何在 Cloud Run 上看？

![](https://nijialin.com/images/2024/gcp/6.png)

在 Cloud Run 中也能知道這個容器是透過誰來 Build，如此一來也不用擔心說會不會改天就忘了 🤣

# 結論

這邊我的實作方式是在本地端先跑過一次 Code，再把程式轉貼上 Cloud Function 去測試，但這手動的步驟有點不優，往後若有開發上能夠讓體驗更好，我在另外寫一篇文章介紹，那就大家下回見囉！
