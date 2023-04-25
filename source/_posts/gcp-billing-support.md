---
title: 【GCP】忘記關服務產生費用該怎麼辦？
tags:
  - Google
  - GCP
  - Billing
categories: GCP
date: 2020-08-17 18:01:25
---


# 前言

原因是這樣的，我在去年 12/13 參加了 [GDG 週年 Hackathon Party](https://www.meetup.com/GDGTaichung/events/266686542/)，當時主辦社群很有心的提供 GCP Credit 半年份，雖然當時我是 AWS 派系但我還是很開心的使用它，但我就在這幾天收到了一筆兩千塊的帳單，造就了這篇文章分享...😭
![](https://i.imgur.com/yMNSJqc.png)

<!-- more -->

# 過程

首先我在這半年中剛好有需求去玩了 GCP 的 Cloud SQL，當下玩完後以為有把 instance 刪乾淨後就沒有在關注它了，沒想到 SQL 完全沒使用的情況下居然一個月要兩千多！如果自己建服務還真的是不便宜呢...

> 在 GCP 大平台上要找到這個客服表單還真的不容易，連結就直接附上了，[表單申請網址](https://support.google.com/cloud/contact/cloud_platform_entitlement_inquries?hl=en#contact=1)。

不得不說 Google 的客服真的是很辛苦，禮拜五申請禮拜六就回信了解我的需求，並且查詢完我帳號的所有記錄後附上參考網址，實在是非常有心呢！以下簡錄一下內容：

![](https://i.imgur.com/nwxExo9.png)

也因為我的手誤手動刷了那筆費用讓客服 💁 有點困擾，但在信中我也表明了我是擔心信用卡沒刷過導致信用問題等等...

經過一連串的攻勢之後感動了 google 客服，幫我申請了帳戶調整的需求：

![](https://i.imgur.com/GDveSih.png)

# 結論

隨後就來了好消息批准了我的申請，將費用清除掉並請我耐心等待費用的作業流程(5-7 天)，但也警告這只是一次性的信譽調整，下不為例，在驚濤駭浪中解決了我費用的問題 😭。

像 AWS、GCP、Azure 這類大平台都有相對應的機制，只是說因為他們相關的文件超多，有時會無法在第一時間找到，若你有相關的經驗也歡迎參考文章的連結詢問平台，只是使用這類的雲端平台都要注意一下費用，避免因小失大。

- [預算設定提醒](https://cloud.google.com/billing/docs/how-to/budgets)
