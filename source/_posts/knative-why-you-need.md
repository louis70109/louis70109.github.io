---
title: 為什麼需要選用 Knative 來作為服務架設之地？ | Feat. Google Cloud Run
tags:
  - Knative
  - GCP
  - Cloud Run
  - Kubernetes
categories: GCP
date: 2023-06-03 18:44:13
---


![](https://nijialin.com/images/2023/GAI/cloud.jpeg)

# 為什麼要使用 Knative(KN)

Knative 是一個開源的 Kubernetes 原生 Serverless 平台，它使開發者更容易地建立、佈署和管理應用程式。而 Knative 的好處它提供了統一的方法來佈署和管理基於事件驅動的服務，這使得開發者可以專注於賺寫應用程式，而不必擔心基礎設施的細節。

<!-- more -->

相對於使用 Kubernetes 開發與佈署，Knative 應用程式方面提供了更多的彈性與便利性的地方。它把許多原本 Kubernetes 需要處理的網路、Log、Monitor...等等都包裝起來，開發者則不用擔心這些並且專注開發應用程式，且因為 Knative 是基於 Kubernetes，因此該有的自動水平擴展、根據負載增減佈署的 Instance 數量等等的優點都會包含，這一點對於需要應對流量波動的應用程式會非常有用。

## Knative 與 Google Cloud Run？

Knative 和 Google Cloud Run 都是基於 Kubernetes 的開源平台，都致力於簡化開發者的佈署工作和管理現代服務導向的應用程式。然而兩者的使用方式和管理方式還是有些為差異以下來作些比較。

自己架設 Knative 需要一定的 Kubernetes 服務架設經驗，並且需要在擁有 Kubernetes 環境的主機上進行安裝和設定。開發者需要自行管理 Knative 和 Kubernetes 的升級、相關的安全性問題，對於個人或是規模較小的組織來說門檻較高些。

撇除這些問題，自行架設的 Knative 對於系統的彈性還是比較大的，畢竟自行架設會對於服務的熟悉度更高，開發者可以根據自己的需要的設定和調整整體服務。

## Google Cloud Run 呢？

Google Cloud Run 則是一種全託管的解決方案，Google 已經把開發者所需操作以及管理底層基礎設施和運維工作都做好了，開發者只需要專注於把應用程式的開發完成並且透過 gcloud 指令來佈署即可(甚至 Dockerfile 都不用寫)。
同時 Cloud Run 也是使用 Knative 作為底層引擎，同時擁有 Knative 以及 Kubernetes 的特性，快速部屬且能水平擴展(超棒的)。在權限控管上也可以使用 GCP 提供的身份和存取管理（IAM）等，讓開發者可以更專注在應用程式的開發。

> 如果從 Cloud Run 上用一用，但公司想搬到自架的 Knative 上也是可以！只要把 Cloud Run Knative config 複製就可以使用了！

# 推薦使用 Knative 嗎？

如果團隊的產品日常都在處理一些事件驅動的應用程式，抑或是有購物節等等會忽然暴衝流量，那可能是可以嘗試導入 Knative 使產品進入 Knative 世界，且在內部推動時大家也無須準備像是 Kubernetes 這麼多的 config，可能只需要一兩個 Yaml 就把服務架起來了，讓你們更容易地進行應用程式的佈署和管理。

## 那也推薦使用 Google Cloud Run？

以初期來說，團隊在 Infra 這邊的工作無法下太多，且需要處理上述介紹的這些問題，那 Cloud Run 可能會是一個適合的選擇，因為它能夠讓團隊成員更專注於開發，而不用沒是還要抽身去照顧 Infra，對於團隊管理在建構與實踐整體商業邏輯時，會是一個更好的選擇。

另一個好處是，如果有需要銜接其他功能，Cloud Run 也能更方便地使用 Google Cloud 的其他服務，把這些架設的功夫都先省下來，讓錢先進來後續都比較好跟老闆要求其他東西 😆

> 📖 延伸閱讀：之前分享的 [Cloud Run 串接 Eventarc 的文章](https://nijialin.com/2022/06/30/google-io-extended-2022/)

# 結論

整體而論，Knative 和 Google Cloud Run 都是強大的工具，能夠幫助開發者更容易地佈署和管理現代服務導向的應用程式。選擇哪一種取決於你的團隊偏向何種需求和偏好，無論是完全自行控制的 Knative，還是完全管理式的 Google Cloud Run，都有其各自的優點和需要挑戰的地方。

但無論如何，也推薦大家可以先從 Public Cloud 上的這些 Service 開始學習，也會讓大家對於 Cloud Infra 以及相關的解決方案更加清楚喔！💪

# 結論
