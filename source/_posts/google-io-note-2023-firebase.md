---
title: "【Google I/O】筆記 | Firebase & 其他紀錄 \U0001F977"
tags:
  - Firebase
  - Firestore
  - Serverless
  - PaLM
categories: GCP
date: 2023-05-13 18:42:35
---


![](https://nijialin.com/images/common.jpeg)

# 前言

今年也是一個 AI 元年，Google IO 上也講了許多與 AI 的結合，當然 Firebase 也不意外，剛好近期在 Side Project 中使用了比較多 Firebase 相關的開發，因此本篇會先紀錄較多 Firebase，也同步把 Keynote 中聽到的內容給記下來。

<!-- more -->

# Firebase 相關

## [Cloud Firestore 的新動態](https://io.google/2023/program/c3737ca0-709e-4f0e-aef7-671cf6e03878/intl/zh/)

Firestore 是一個 Serverless documentation storage，是一個有可擴展以及高可用性，同時也可 offline cache(影片說的)。

近期提供的 Document Query 功能：

- COUNT() operator: [今年一月 release](https://firebase.google.com/support/release-notes/admin/python#version_610_-_02_february_2023)
  - Price: 1 document 1000 個 index

![](https://nijialin.com/images/2023/googleio/count-operator.png)

- OR(): [5/11 的今天 Python & NodeJS](https://firebase.google.com/docs/firestore/query-data/queries?hl=zh-tw#java_28) 還沒支援，等待 release
  - `cats = black OR dogs = brown`
  - Preview available now

![](https://nijialin.com/images/2023/googleio/or-operator.png)

關於 OR() 的用法看這邊：

<iframe width="1422" height="639" src="https://www.youtube.com/embed/emIxn-f9bK0" title="What&#39;s new in Firebase" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## [Eventarc 支援 Firestore 整合](https://cloud.google.com/firestore/docs/eventarc?hl=zh-cn)

剛好在大會上聽到有支援 Eventarc，雖然具體還沒想出應用環節。

| Firestore 區域 | Eventarc 區域 |
| -------------- | ------------- |
| nam5           | us-central1   |
| eur3           | europe-west4  |

## Firestore 也支援 Terraform

![](https://nijialin.com/images/2023/googleio/terraform.png)

<iframe width="1422" height="639" src="https://www.youtube.com/embed/emIxn-f9bK0" title="What&#39;s new in Firebase" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

可使用資源如下：

- Firebase Project
- Firebase App
- Cloud Firestore
- Cloud Storage for Firebase
- Firebase Realtime Database
- Firebase Authentication
- Firebase Security Rule
  - 只給 Cloud Storage & Cloud Storage

完整的說明可以看以下另一部影片

<iframe width="560" height="315" src="https://www.youtube.com/embed/32SKh-jGXI4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## [Firebase 整合 PaLM API](https://youtu.be/emIxn-f9bK0?t=556)

使用 chatbot 的樣式，讓你在 Firestore 的 document 中下 prompt(key)，在 PaLM API 回傳時就會直接 import 進入 document 中。

<iframe width="560" height="315" src="https://www.youtube.com/embed/emIxn-f9bK0?start=556" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

在這 AI 盛行的期間，Firebase 能夠這樣整合真的很猛！而且用戶在用時也可以無痛使用與儲存資料，對於一般 Web 開發者來說，只需要透過 Firebase API(相對熟悉)，然後再把 prompt 下進去 Firestore 中，如此一來也操作上也可以很像 ChatGPT 這樣對話的方式，馬上用到 Google 的 PaLM，實在是很厲害的一個整合！

## Firebase hosting 也支援 Flask & Django

- `firebase hosting:channel:deploy staging`
- 走的是 Cloud Function
- 如果需要 GitHub PR preview link，需要先[參考此文件](https://firebase.google.com/docs/hosting/github-integration?hl=zh-tw)
  - `firebase init hosting:github` 來綁定你的 github

<iframe width="1422" height="639" src="https://www.youtube.com/embed/emIxn-f9bK0" title="What&#39;s new in Firebase" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## 其他紀錄

### 針對 debugging tool 增加 DX

![](https://nijialin.com/images/2023/googleio/webdx.png)

### [排隊 PaLM API](https://developers.generativeai.google/)

### WebGPU

![](https://nijialin.com/images/2023/googleio/webgpu.png)

### Android Studio bot

![](https://nijialin.com/images/2023/googleio/androidbot.png)

可以在 Android Studio 裡面開啟側邊欄，以對話的方式幫忙產生出 Android 的程式碼

# 結論

下一篇預計會把 Cloud 相關的內容聽完，推薦大家先從近期手頭上專案類型先下手，且 Google IO 上的影片英文其實也滿容易理解的，推薦大家開始去聽看看唷！補齊更多的技術知識！😁🥷
