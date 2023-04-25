---
title: 【GDG】Google I/O 2022 Extended 線下活動分享
tags:
  - GCP
  - AlloyDB
  - eventarc
categories: 研討會
date: 2022-07-01 01:11:50
---


![S__3801091](https://user-images.githubusercontent.com/6940010/176736874-e16463da-d1a3-4de0-9ffa-669ba78a5417.jpg)


# 前言

上次參加外部活動時大概是四月多了，因為疫情關係讓這幾個月沒辦法參加實體活動，這次參加了 Google I/O 2022 extended 的線下活動，透過這次文章快速記下一些現場有聽到的內容～

活動連結：https://gdg.community.dev/events/details/google-gdg-cloud-taipei-presents-gdgcloud-taipei-meetup-io-2022-extended-cloud-edition/

<!-- more -->

# 介紹

![S__3801093](https://user-images.githubusercontent.com/6940010/176736858-8d6c21df-54d6-4d97-8614-e60b04226d43.jpg)

## What's new in the latest Serverless World?

開場稍微介紹了 Serverless 以及 Kubernetes 大致使用場景與面對的方向：

- Serverless -> Developer 導向，只要把 code 寫完推上去就能使用
  - 過去也有寫過一些 Serverless 的文章，[歡迎參考](https://nijialin.com/tags/Serverless/)
- kubernetes -> 較針對 Infra manager，需要管理各種應用場景，針對不同需求提供方案

接著簡介帶入產品，把用戶常見 FAQ 分享給大家，這裡主要重點就是在使用時，要幫使用者顧跳槽的東西(彈性)，也要顧及到方便性與 Downtime 的部分。

接下來提供了一些在官網上也有的一些範例，跟大家說現在 gcloud 方便程度到哪。雖然現在會寫 Dockerfile 的人也不少，但如果可以讓開發者(Developer)把心思放在開發上，讓服務來幫忙寫 Dockerfile 速度就會更快了！因此這邊講者就用類似下方的指令到一個自己寫的範例 project，讓 gcloud 自動去幫 Golang 語言的程式跑出容器並部署上。

```
gcloud run deploy NAME --source .
```

接著就開始講到一些藍綠部署的切換機制，透過 gsutil 並打上 `--tag green` 去標註，最後透過範例以及一些指令去逐漸將趴數提高，把用藍的部分流量逐步轉到綠的身上，真的不行也可以 rollback 這樣！

### eventarc

接下來聽到這一部份我也覺得很有興趣，它可以監聽到 Google Cloud 當中許多的服務當做了些什麼事情時，可以去監聽他們之後，把訊號打到後面的服務，這邊講者用 Cloud Storage 做範例，丟一個像是 Excel 的檔案(日常行政常見)，觸發到 eventarc 之後接著 Workflow 處理相關流程，再把內容丟到 Cloud Run 把訊號丟出來，做到常見的 Pub/Sub 相關事情，Demo 中也有類似以下：

- 方便性：用 UI 就可以設定的東西
- 可用性：還可以接 loadbalancer
  - 不同區域的 cloud run，接到同一個 loadbalancer，會自動認區域

#### 解決的問題

以前都需要再透過外網繞一圈結果是打回 GCP 上的內容，現在有個內部 VPC，可以不用繞過外網再進來，加速網路的速度與安全性。

### 想到的一個點子

講者提到的流程如下：

```
cloud storage 丟到一個檔案 -> eventarc 收到資訊後 -> workflow 接上parser處理內容 -> Cloud run 跑東西
```

那因為最近有投稿一個 STT 相關的主題，但每次都在等 STT 盼對出來進 DB 時間就去了很多，感覺可以透過這次分享會聽到的流程來達到相關加速開發的需求：

```
影片丟上 cloud storage -> eventarc -> cloud run 跑STT -> 轉存 STT 檔案回 cloud storage
```


## AlloyDB, The best of Google + PostgreSQL compatibility

![S__3801094](https://user-images.githubusercontent.com/6940010/176736800-7ef83aa0-80c7-4851-a44d-a8970fce28cd.jpg)

以 PostgreSQL 為主體去做的，以下做了些小筆記：

- 支援到 14 版本
- HA 機制
- 把 redo 的過程從 memory 改成在 storage 裡面去跑 AlloyDB
  - No checkpoint stalls, 加速擴展性

- Row Format vs columnar format
  - Row Format: 把一列的東西存一個，ID, Name...存一排，在搜尋上假設要找 ID，就要一列一列找
    - `1,a,AAA 2,b,BBB`
  - Cloumnar Format 的存法是把 Key 存一排，名字存一排依此類推，透過這方式就可以快速找到 ID 相關，然後再透過內部機制去取得後續的資料這樣
    - `1,2 a,b AAA,BBB`

> free during public preview，講者有提到GA後就會收費，因為儲存機制不同於 Cloud SQL，相對收費會高些

### Position

假設都是 4G RAM、1TB硬碟

- cloud SQL: 這邊用了 Primary, HA 還有一個忘了，這三個地方。

在建立時因為機制，會去讀寫實體的硬碟，因此就會需要三個地方就各自會有個 1TB 硬碟(Storage)，讀寫上要去 SYNC 也會有較多的 cost，且 read write 相對 downtime 也比較久：

- AlloyDB: 跟 cloud SQL 不一樣的部分是三個地方都會分享同一個 Storage，文件中也保證即便硬碟因為人為或伺服器有問題，都不會讓資料不見。
  - 這邊有另外詢問講者問題，提到資料也會有類似 git 版控的概念，讓大家可能在一些人為因素不小心動到，或是種種原因後，也是一樣可以回到上一版本的資料，跟快照不太一樣，但至少知道自己的資料們還在，損失也會相對少
  - 因為共享同個 Storage，少了多餘的 query 成本花費，速度上也相對 cloud SQL 快上許多，不用再跨一層互相溝通的時間
  - cloud spanner 讀寫部分可以水平擴展，降低 downtime 的時間，如果剛好量很大還是什麼都可以更快的 consume 掉

# 結論

這次是首次來參加線下 GDG 活動，難得在聽演講同時也可以看看周遭的風景也真的不錯，現場也遇到了許多認識的人，世界真的很小呢(哈)，希望接下來有更多的機會可以到線下跟大家見面！有任何問題歡迎留言讓我知道：）

![S__3801095](https://user-images.githubusercontent.com/6940010/176736868-fe6aa721-6893-4279-bcd4-632413f4b9ab.jpg)

<style>
  section.compact {
    font-size: 150%  
  }
  img[alt~="center"] {
    display: block;
    margin: 0 auto;
  }
</style>
