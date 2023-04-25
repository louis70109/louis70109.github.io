---
title: Day8 - SQS 簡單介紹 & 建立
tags:
  - AWS
  - SQS
categories: 2019鐵人賽
abbrlink: 3884948296
date: 2019-09-22 20:34:30
---

[詳細介紹](https://ithelp.ithome.com.tw/articles/10194654)

以前自己在架伺服器的時候，提到訊息佇列不外乎都是 RabbitMQ 或是 Kafka，只是現在 AWS、GCP 這類的雲端平台都越來越火紅了，手動按一下服務就建好了(信用卡也在哭泣)，省去很多建立服務的時間，只是說一般時候根本找不到項目練習 😓，剛好最近在複習 LINE Notfiy，就趁這個機會順便練習並記錄一下 ✌️

## 你需要先了解…

> 當 Http requests 非常大量到一定程度，database 已經跟不上處理的速度，尤其是 relational database，這時就需要 queue 來緩衝；所以社群網站像 Facebook or LinkedIn 都使用大量的 message queue and cache.
> By -> Leonard Lee

> SQS 就是 managed queue service，主要就是 async, central messaging (對相對應的程式來說，通常處理 api 的會有多個 instances 同時存在，像是 auto-scaling)，像是 fb 通知、寄送 email 認證信這種不用即時處理的情況，只要給訊息給 queue 讓其他服務或程式去處理，可以把原本的邏輯簡化(以及責任區分)，甚至些事件是預期同時會有多個 listener 會需要處理的情況，在一個 api 裡面去處理這些會讓邏輯變很複雜/不好維護。
> By -> Bill Chung

> 還有就是如果負責處理 request 的 host 有問題，message queue 可以用來短暫儲存還未被處理的 requests 使他們不至於丟失，直到 host 回復正常或是換了一個好的 host 後，message queue 裡面的的 requests 就可以繼續被處理
> By -> 盧元駿

以上來自我之前寫過的文章 [使用 Serverless 讓 AWS SQS 幫你發送 LINE Notify](https://medium.com/@nijia.lin/使用-serverless-讓-aws-sqs-幫你發送-line-notify-fc3b918473cc)

今天在需要發個請求去呼叫 LINE API(或是其他服務的 API)，都可能會碰到圖片，圖片不管他怎麼壓縮，終究還是比文字肥，在數量多的情況下可能就會發現 API 罷工(就會像被斷詠唱一樣)。雖然平常使用可能不會這麼平凡呼叫，但若在商業用途上使用者多的時候一次呼叫就會有一大筆，這時候用 Queue 讓他們排隊一個一個來就在適合不過了 🎉。

## 為什麼選擇 AWS SQS

Amazon Simple Queue Service (SQS) 是全受管訊息佇列服務，可讓您分離和擴展微型服務、分散式系統及無伺服器應用程式。SQS 可免除與管理和操作訊息導向中介軟體相關的複雜性及開銷，也可讓開發人員專注在與眾不同的工作上。您可以使用 SQS 在軟體元件之間傳送、存放和接收不限數量的訊息，不會遺失訊息或需要其他服務可用。使用 AWS 主控台、命令列界面或自選的 SDK 以及三個簡單的命令，即可在幾分鐘內開始使用 SQS。(參考 [AWS](https://aws.amazon.com/tw/sqs/))

SQS 有在免費方案裡面，只要一個月別高於 100 萬個請求就不會被收錢啦 💪
![](https://i.imgur.com/az2V5a4.png)

> AWS 的免費方案可以參考 -> [LINK](https://aws.amazon.com/tw/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsm.page-all-free-tier=5&source=post_page-----fc3b918473cc----------------------)

## 建立 SQS

接著就要開始引入 SQS 嚕，首先到 AWS 上的 SQS 頁面，如下

![](https://i.imgur.com/HXXX2SI.png)

---

接著選左邊的`Standard Queue`並填入 name 就好
![](https://i.imgur.com/Q88vd9t.png)

---

建立完之後就可以看到下面有建立完的資訊

> ARN 以及 URL 接下來都會用到哦

![](https://i.imgur.com/7pUSK9Q.png)

## 結論

接下來會帶各位使用 Notify 接在 SQS 上，這篇就先帶各位介紹並先手動建立一個 Queue，之後會在大家使用 python 的 boto3 的套件來搭配使用 AWS 服務使用 👏
