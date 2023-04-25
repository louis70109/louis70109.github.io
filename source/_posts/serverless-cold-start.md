---
title: Serverless cold start 問題
categories: Serverless
tags:
  - AWS
  - GCP
  - Azure
  - Heroku
  - cold start
abbrlink: 3995325371
date: 2020-02-16 01:30:03
---

![workload](https://i.imgur.com/gjLODpG.jpg)

# 前言

之前鐵人賽寫了一篇文章有提到 [Cold Start 的問題](https://nijialin.com/2019/10/14/Day30-%E8%80%81%E6%98%AF%E5%9C%A8%E5%90%B9-Serverless%EF%BC%8C%E4%BB%96%E7%9C%9F%E7%9A%84%E6%9C%89%E9%82%A3%E9%BA%BC%E5%A5%BD%EF%BC%9F/)，不過只有粗略介紹，最近看到大家忽然又開始討論這個話題，這次就來好好的搜尋資料介紹一下。

平常在做 open source 時比較常遇到休眠狀態應該就是 `Heroku`，而開頭要先澄清一下他是屬於 `PaaS` 的架構，而 AWS、Google、Azure 裡提供的 `Lambda`、`Cloud Run`、`Azure Function` 這些則屬於 FaaS 架構，而最常討論 `Cold start` 時最常會在 FaaS 上討論，只是剛好 Heroku 使用起來也是一樣，這次文章就把他一起抓進來討論啦～

> 有很多各式各樣的服務，SaaS、FaaS、KaaS、IaaS... 等各式各樣的架構，每個都是為了解決某個問題所誕生的，至於好或不好其實就是看使用場景而定，所以大家在選用時要注意一下你使用的場景哦！

# 為什麼會休眠

一般會有休眠機制是因為這些供應商在提供服務都是提供按次計費的方案，讓開發者在用時可以需要才喚醒使用，也就是說這些服務都是 `事件驅動`(`Event-Driven`)導向，意指是當前服務若收到訊息後，會呼叫對應的 Function 來處理對應服務所接收到的資料(Queue、Notify ...)，但相對的就是會有`休眠`讓服務暫停，進而讓較少使用的服務不會因為掛在線上而一直被收費用，而重新啟動這件事就是本篇要提的`Cold start`。

# Cold start 流程

在處理資料之後過一段時間若沒有繼續執行，雲端供應商會將模組暫停，此時 function 會處於 inactive 狀態(cold)，而當 function 再度被觸發時(`cold start`)則會再啟動模組來執行對應 function 來處理事件，在模組與 function 之間的關係可以稱他們為 `Function chain`。

### 休眠狀態喚醒流程

![[參考](https://mikhail.io/2018/08/serverless-cold-start-war/#how-do-languages-compare-)](https://i.imgur.com/DQoGYns.png)

以 AWS 為例，在喚醒時會到 S3 去取得檔案，接著找到相關的 Lambda 並載入相關模組套件，然後再執行觸發的事件，整理過後的下:

> 事件處理 ➡️ 過段時間 ➡️ 暫停 function 模組(休眠) ➡️ 觸發 ➡️ 啟動 function 模組 ➡️ 事件處理...

這整個流程就是俗稱的 `cold start`，因為在這個過程中會花些時間，所以若是拿來處理 api 相關問題的話就會有第一批請求很久，然後之後的請求卻特別快的狀態，請大家莫急莫慌莫害怕呀！

# 平台比較表

| 平台                   | 多少時間後暫停                                                                                 |
| ---------------------- | ---------------------------------------------------------------------------------------------- |
| AWS Lambda             | 10 minutes                                                                                     |
| Google Cloud Functions | [介於 3 minutes 之間 5+ hours 都有](https://mikhail.io/2018/08/serverless-cold-start-war/#gcp) |
| Azure Functions        | [20 minutes](https://mikhail.io/2018/08/serverless-cold-start-war/#azure)                      |
| Heroku                 | [30 minutes](<(https://devcenter.heroku.com/articles/free-dyno-hours#dyno-sleeping)>)          |

> 前三個為 `FaaS` 架構，而 Heroku 則為 `PaaS` 架構喔！

下圖則來自 2019/09 的[一篇文章](https://mikhail.io/serverless/coldstarts/big3/)，較深色的部分則為啟動時間。
![FaaS platform cold start time](https://i.imgur.com/yZxWvlL.png)

# 如何處理或是盡可能避免？

以我熟悉使用 [serverless framework](https://serverless.com/) 部署到 AWS 來說，他們提供了一個 [warm-up](https://serverless.com/plugins/serverless-plugin-warmup/) 的套件，可以設定排程時間讓這個 function 固定去戳其他 function，避免他們進入休眠的狀態，雖然這樣子就能達到跟一般服務一樣的常駐狀態，不過相對來說就要注意次數的使用問題，若是流量還小的話沒什麼問題，但若有一定的流量就須注意一下帳單，因為這些在互戳的過程中還是有算進費用的喔！使用上還要多注意才行。

另一方面要注意相依套件的問題，引用 google [文件的其中一段](https://cloud.google.com/run/docs/tips#optimizing_performance):

謹慎使用依附元件，如果您使用動態語言搭配相依的程式庫，例如匯入使用 Node.js 的模型，這些模組的載入時間會增加冷啟動期間的延遲時間。您可以透過以下方式縮短啟動延遲時間：

- 儘可能減少相依元件的數量和大小以建置精簡的服務。
- 只有在必要時才載入不常用的程式碼 (如果您使用的語言支援)。
- 使用程式碼載入的最佳化，例如 PHP 的 composer 自動載入器最佳化。

> 畢竟在載入模組的時候相依套件也是要一起抓進來，若是程式本身太多依賴的話也是會導致 cold start 的時間變長哦！

最後就在幫大家整理一下三大平台的 warm-up 資源：

- [warm-up](https://serverless.com/plugins/serverless-plugin-warmup/)
- [Google App Engine warm up](https://cloud.google.com/appengine/docs/standard/python/configuring-warmup-requests)
- [Google Schedule](https://www.serverlessnotes.com/docs/scheduling-with-azure-functions)
- [Scheduling with Azure Functions](https://www.serverlessnotes.com/docs/scheduling-with-azure-functions)

# 結論

為什麼要有 cold start 的機制，以供應商的角度來說他們可以提供一定的量讓使用者免費在平台上先建置服務，但若要免費就是服務會被暫時暫停，畢竟現在流量就是錢嗎 💰，像我常用的 Heroku 就會是這樣，而當你流量大的時候就看你要不要搬家，不過一般應該都懶得搬，就會形成所謂的`養、套、殺`🤣(離題)。

總而言之，若是需要服務時常活著，就是需要付出點流量的錢 💰，也或許你的作品服務時間可能不用那麼長，只要在服勤時間內長駐活著就可以在省下一些費用，如果有需要的話還是付一些錢給供應商，畢竟人家也幫你保管了服務你說是不是？

# 參考

- [On the Serverless cold start problem](https://medium.com/faun/on-the-serverless-cold-start-problem-2fc0797da5cc)
- [Lambda Warm-up](https://serverless.com/blog/keep-your-lambdas-warm/#installing-the-warmup-plugin)
- [Heroku cold start](https://devcenter.heroku.com/articles/free-dyno-hours)
- [serverless 啟動流程](https://mikhail.io/2018/08/serverless-cold-start-war/#how-do-languages-compare-)
- [Function Chain 來源](https://www.nuweba.com/blog/when-are-cold-starts-problem)
- [cloud run cold start](https://github.com/ahmetb/cloud-run-faq#cold-starts)
