---
title: 【Podcast】Kubernetes vs Serverless with Matt Ward - Software Engineering Daily
categories: Cloud Native
date: 2020-07-05 19:43:28
tags: ["Kubernetes", "Serverless", "Podcast"]
---

![](https://cdn.pixabay.com/photo/2020/06/28/22/09/falcon-5350832_1280.jpg)

> 📸 by WFranz

# 前言

Kubernetes 在分散式系統中已經成為一個高可用性平台，並且有許多人都會將程式部署在上面，雖然部署在 Kubernetes 上很好，但本身的管理以及學習都不那麼簡單，因此也有許多人會使用 Serverless 來解決需求。

而今天介紹這個集節目就邀請到 Mux 的 Matt Ward，他們家的產品主要是在做 video streaming APIs，現今他們有自己的 Kubernetes 也曾經在 Serverless 中使用過，以下就分享我從這集 podcast 學到的東西以及心得囉！

- [Podcast 連結](https://overcast.fm/+E6UBUIDF0)
- [Transcript 連結](https://softwareengineeringdaily.com/wp-content/uploads/2020/05/SED1079-Kube-vs-Serverless.pdf)

<!-- more -->

# Serverless

來賓一開始提到，再做任何事情前都需要容量規劃(capacity planning)以及整體的計算資源(compute resources)，而像是 AWS Lambda 這類的平台讓開發者不需要擔心 CPU、RAM 以及提供 Auto Scaling 的功能，讓產品在前期可以更專注在開發上。

由於 AWS Lambda 也是都基於 EC2 去實作的一個功能(工具)，因此像是 GRPC、socket 之類的功能也都可以使用。

> 當然用 Serverless 還是輕鬆許多，平台幫你處理好許多事 😆

## 好處

Serverless 適合的情境在於當今天產品 Business Model 還不成熟，且很多功能的情境都還不確定下很適合，以 AWS 為例，若今天需要開發 API 就使用 API Gateway、需要 Queue 幫忙緩衝就用 SQS、需要關連式資料庫 RDS，像是拼圖一樣讓大家可以去拼出自己的產品服務，並且不用擔心`計算資源`以及`水平擴展`(Auto Scaling)的問題，一切都交給雲端提供商去處理即可。

## Cold Start 問題

這部分以前我有寫過一篇文章 - [Serverless cold start 問題](https://nijialin.com/2020/02/16/serverless-cold-start/)，簡單來說每個 Lambda Function 都是一個 Container，當過了一段時間後平台會將這 Container 關掉，而當 Function 被觸發後平台會重新啟動 Container，這期間的時間就屬於 Cold Start。

當然這邊可使用 Warm-up 相關工具，只是因為 FaaS 這類的服務都是以流量計價，如此一來就會增加無形中的費用。

## 問題

不過當產品成長到一定程度時就會開始擔心費用、綁架...相關的問題，因此就會考慮到自架 Kubernetes 也可以達到類似的功能，因為 Serverless 有的功能基本上也能透過 Kubernetes API 去做相關的處理(Auto Scaling)。

## 平台綁定

這集較多再分享兩邊的使用經驗，這邊順便分享我自己的觀點，若當前產品都是建置在 AWS 上，而市場都在`歐洲`、`美洲`之類的地方，在傳輸速度上就很快沒問題，但若市場在`台灣`，但因為 AWS 離台灣最近的節點只有在`日本`，在傳輸上還是跨了一座海，反應速度還是會有一定的影響，此時要搬到 GCP 上又會有成本，因此在使用平台時還是要關注一下類似市場這樣的問題喔！

# Kubernetes

在我的印象中它就是可以將 Container 平行擴展的一個工具，不管 Container 裡是裝什麼都可以幫忙 Cluster，若是需要 Load Balance 官方也都有文件可以參考([Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/))，如此一來才能讓彈性以及靈活性變高，且不會有 Cold Start 問題並能 real-time feedback。

[Kubernetes API documents](https://kubernetes.io/docs/concepts/overview/kubernetes-api/)

而 Kubernetes 情況則有點相反，業務與市場都確定，且產品已經有大量流量在進出下很適合，使用 Cluster 的方式分散吞吐量，服務要架設都可以自己來，使用彈性高也不會被服務提供商綁架，每個服務都是一個 Container，當平台功能不敷使用時只要在另一個平台上將 Container 起起來即可。

## 例子

如果現在需要一個擁有`三個節點`的 Redis Cluster 時，開發者不需要知道太多`主從式`裡的細節，只要交給 Kubernetes operators 會幫忙部署並且給出適當的 object 讓你能去客製化資源。

> we don't have to think about every environment variable, every volume, or every kind of networking interface ...

我覺得上述這段話就是對於 Kubernetes 的讚嘆吧(?)，並且指出當今天只要跟 Kubernetes 說出你想要什麼服務，在內部的 operator 就會自動計算出適當的資源。

# 部署在多個平台重要性 (AWS & GCP)

來賓的產品主要是在 AWS 以及 GCP 上，因此他這邊也說推薦大家可以部署在 EKS、GKE 上面，除了服務支援度以外(region 之類)，就是避免因為平台問題(倒站)讓自家服務所停擺，因此部署到兩個平台以上可以較有效的避免服務停擺的問題，雖然可能會有費用上的疑慮，但這就跟買保險的概念一樣，買來保障遇到問題時的一個解決方案 😁。

> 這部分可以參考 17 的文章 - [從 GCP 故障看 17 Media 工程團隊的災難應變](https://medium.com/17media-tech/%E5%BE%9E-gcp-%E6%95%85%E9%9A%9C%E7%9C%8B-17-media-%E5%B7%A5%E7%A8%8B%E5%9C%98%E9%9A%8A%E7%9A%84%E7%81%BD%E9%9B%A3%E6%87%89%E8%AE%8A-51aa5701ba77)

# Knative

它是一個允許部署 Serverless 風格的應用程式在 Kubernetes 上，聽到這邊我想會有這個工具或許也是讓習慣開發 Serverless 的開發者可以叫無痛的轉到 Knative 上，而之後再逐步地轉到 GKE 上面吧 🤔

# 監測工具(Metric)

不管使用什麼服務一定都需要監控狀態，在這集中我有聽到以下三個工具:

- [Grafana](https://grafana.com/): 監控儀表板的功能，自由度很高可以透過套件來建立交互式的數據觀測平台。
- [Prometheus](https://prometheus.io/): 看起來儀表板性質與 Grafana 差不多，大家可以依照自己喜愛去試試看喔！
- [Kibana](https://www.elastic.co/kibana): Elasticsearch 的開源數據可視化儀表板。

# 透過 [CDN](https://zh.wikipedia.org/zh-tw/%E5%85%A7%E5%AE%B9%E5%82%B3%E9%81%9E%E7%B6%B2%E8%B7%AF) 的方式讓產品可以交付到每個地方

主持人與來賓聊到跟 Youtube 差異時有提到 CDN 的部分，簡單來說就是 [網際網路服務供應商](https://zh.wikipedia.org/wiki/%E4%BA%92%E8%81%94%E7%BD%91%E6%9C%8D%E5%8A%A1%E4%BE%9B%E5%BA%94%E5%95%86)(ISP)會先告知它擁有的節點(node)，在 Client 端來請求支援時這些節點會去 cache Server 資料，當下次再重複請求時就可以從節點上直接取資料，加快請求速度也讓體驗更好。

> 若有寫前端的朋友就會對在 Head 裡引入的 jQuery 或 Bootstrap 之類的\<script\> 的標籤應該不陌生

# 其他

來賓公司的服務有一部份將 kubernetes 建構在 kops，以下是 kops 的連結：

- [kops Github](https://github.com/kubernetes/kops)
- [kops 官網](https://kops.sigs.k8s.io/)

# 結論

這集 Podcast 講解 Serverless 的部分許多都跟我開發以來使用的體驗與經驗差不多，而雖然 Kubernetes 我只有聽過並未有實際使用經驗，但靠著來賓分享的經驗也讓我對於 Kubernetes 使用的情境與狀態能夠更加的瞭解。

然而開發上的議題總是需要顧慮到`時間`與`環境`，並不會有特定的工具就一定能吃下所有市場，因此在選擇工具時一定要考慮到產品所處的狀態才能讓工具發揮到最大的效果喔！
