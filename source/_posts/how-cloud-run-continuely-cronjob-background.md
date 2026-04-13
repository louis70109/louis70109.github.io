---
title: 【GCP】如何讓 Cloud Run 持續執行背景程式
tags:
  - Cold Start
  - GCP
  - Cloud Run
  - Serverless
categories: GCP
date: 2023-04-05 00:57:02
---


![](https://nijialin.com/images/common.jpeg)

# 冷啟動(Cold start) & Cloud Run 如何處理？

[Serverless 架構](https://cloud.google.com/serverless?hl=zh-tw)的冷啟動（cold start）是指當一個沒有被使用的函式需要被調用時，需要先啟動一個新的容器或虛擬機器來執行該函式，這個啟動的期間被稱為冷啟動時間。

但我們在寫應用的時候通常都會帶有一些 cronjob 在背景跑(備份、爬蟲...)，但在 Serverless 上都會遇到 Cold Start 的問題，在這種情況下因為資源都會被釋放掉，如果這些 cronjob 是比較重的且 Severless RAM&CPU 又放比較少， cronjob 時邊爬蟲邊異地備份又讀寫資料庫(~~ 誇張了點 ~~)，這情況下可能會因為資源瞬間不夠導致功能異常。

<!-- more -->

> 官方也有提供以下以前不能操作的範例給大家：
>
> - Executing background tasks and other asynchronous processing work after returning responses
> - Leveraging monitoring agents like OpenTelemetry that may assume access to CPU in background threads
> - Using Go's Goroutines or Node.js async, Java threads, and Kotlin coroutines
> - Moving Spring Boot apps that use built-in scheduling/background functionality
> - Listening for Firestore changes to keep an in-memory cache up to date

而一般初期會使用 Serverless 通常就是為了省錢、省管理成本才來使用，遇到了上述情況下通常有可能會另起容器或自身一直 ping，來讓容器可以持續活著，但這樣就不就增加了 request & 容器成本了？

# 如何處理與使用它？

在 Cloud Run 上有個 **隨時分配 CPU** 功能(a.k.a CPU is always allocated)可以使用，除了可以在 UI 上設定之外，身為開發者一定要知道如何在部署的時候加上指令才行，請參考以下方式：

參考[開發者文件](https://cloud.google.com/run/docs/configuring/cpu-allocation#command-line)，可以在部署完之後、當下去加上參數`--no-cpu-throttling`來達到隨時有 CPU 資源的狀態，結果會如下圖所示。

> Example: `gcloud run deploy YOUR_SERVICE --source . --no-cpu-throttling`

![](https://nijialin.com/images/2023/gcp/cpu_allocated.png)

# 花費問題？

[](https://storage.googleapis.com/gweb-cloudblog-publish/images/cloud_run_container.max-1000x1000.jpg)

照[官方文件](https://cloud.google.com/blog/products/serverless/cloud-run-gets-always-on-cpu-allocation?hl=en)上所述，在啟動**隨時分配 CPU**的狀態下，費用(charged)比照原本容器都持續活著狀態， CPU 會 -25%、Memory 則會 -20%，看起來應該還挺划算的，因此若有相關需求或許也可以參考看看喔！

> 但這功能目前已經 Release，文件上可能 out off date，包括指令也無需加上 beta，因此在實際使用時還是要關注一下帳單跟相關說明文件喔！

## 其他

[](https://storage.googleapis.com/gweb-cloudblog-publish/images/excute_env.png)

如果在專案需求越來越多時，開始有需要處理這些冷啟動的問題，可以參考上圖的地方，選用適合場景的選項，讓專案可以更符合公司的需求。

> 中文介面步驟: 選到特定容器 > 編輯及部署新的修訂版本 > 執行環境

# 結論

GCP 對於平常有在寫一些小專案是非常方便的，只要把 Dockerfile 寫好之後，後續部署都交給 gcloud 的指令來操作即可，即可部署在 Cloud Run 上(Base on K-Native)，介面上也很方便可以點選許多功能，甚至可以串接 GitHub 來做自動部署，這些都相當方便呢！如果你近期也像我一樣 Heroku 因為收錢在搬家，或許可以考慮到 GCP 上，對於流量不多的小專案來說，這些花費應該算是不多。

> 若文章中有勘誤，請留言跟我說唷！謝謝大家觀賞～😊