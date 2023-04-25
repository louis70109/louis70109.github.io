---
title: 【Podcast】Grafana with Torkel Ödegaard
tags:
  - Grafana
  - Internal tool
categories: Cloud Native
date: 2020-07-08 15:07:53
---

![](https://i.imgur.com/kase2RE.png)

# 前言

Grafana 是一個`視覺化`、`即時監控`以及 plug-in system 的工具，之前使用時也含有許多`儀表板(dashboard)`以及`圖表`來呈現 Server 狀態，且他們還很酷地將它 open source - [Grafana](https://github.com/grafana/grafana)，使用 React JS 打造的可容下大量資料的畫面，Grafana 除了支援多平台外也支援 Docker，接下來就來看一下我聽這集的心得吧！

- [Podcast 連結](https://overcast.fm/+E6UCVIbFo)
- [逐字稿](https://softwareengineeringdaily.com/wp-content/uploads/2020/06/SED1088-Grafana.pdf)
<!-- more -->

# Question

這集邀請到的是 Grafana Lab 的 Torkel Ödegaard 來談談關於 open source 以及創立公司種種的心路歷程，從中就簡單整理幾個在聽的過程中我較感興趣的問題 🙂

## 1. When you first created Grafana, what was the state of the art for monitoring and visualization products?

簡單的介紹 Graphite 這個 [RRDtool](https://zh.wikipedia.org/wiki/RRDtool) 以及 [statsd](https://github.com/statsd/statsd) 有相當年紀的工具後，覺得 Graphite 有點難使用卻也需要 statsd 的功能，因此踏上蓋 Grafana 的路，也希望出現在 TV 牆上 😆

> 心得: 大多的 open source、套件、工具基本上都是當前環境下的工具無法滿足自己因此打造一個工具，且剛好又與市場上的需求差不多，不僅星星數大增，也因此創造機會讓自己的專案可以成為一家公司，實在是大家的標竿啊。

![](https://i.imgur.com/yBLiLrn.png)

### Graphite 問題

來賓提到它的畫面是使用 render PNGs，在現在的前端中絕對不是一個好的方案，我認為因為 Grafana 是使用 React，因此在解決 render 問題上應該是駕輕就熟(使用 hook API - [參考](https://medium.com/@z3388638/react-hooks-%E6%96%B0%E6%89%8B%E7%AD%86%E8%A8%98-8c9f1cccd142))。

> 三大框架都會有 hook API 的這種機制喔！

像是 [InfluxDB](https://www.influxdata.com/) 以及 Prometheus 這類的`時序型資料庫`都有改進 Graphite 上擁有的問題。

因此再者些問題下，Grafana 想要做出一個可以收來自各地的 metrics 以及 alert，除了基本的可視化之外，想要做出與這些資料庫更不一樣的地方。

## 2. Streaming 問題

像是在 Grafana 這類工具來說，每一個圖表中基本上都是單次送 Query 去打 Server，因此在 Streaming 上如何做快取、資料來源...各種議題，但如何處理這種巨量資料目前還沒有想到一個最佳方案去解決。

> 心得: 在看各種專案時，不免俗的會有各種 issue 跳出來希望可以做什麼，只是縱觀專案發展與可用性之類的事情都需要考慮進去，因此諸如 cache 這類的問題其實也是要更全面的考量下才能做出一個更好的解決方案。

## 3. Use language

在六年前開始他們是使用 Angular 2 來開發，隨著時間推移出現了 React 也將專案移到 React 上(可能 Angular 一直改版?)，也因為有前面提到的 `Hook API` 上

探討了許多與前端相關的議題，包括 `Hook API`、`UI components`、`data log search`、過往資料操作時都需要寫許多 callback 來處理，在這邊其實聽得出來現代框架為開發者們帶來的極大便利性，並且 Grafana 也是全 TypeScript，有效的定義`型別`與`Interface`，讓團隊成員可以更快速地了解程式邏輯。

> 我的經驗就是從使用 jQuery 操作 DOM 到使用 Vue Hook components，現代三大框架不僅讓寫法上可以更簡潔，也降低效能的問題。

## 4. 與其他工具不一樣

這邊提到 Grafana 不會儲存任何的 data，只會存一些事件(警報之類的)，且可以在圖表上下註解，因為它只是使用 Hook 的機制做很純粹的事情，不會有資料盜竊上的疑慮。

## 5. 安裝問題

Grafana 安裝時最小可以使用到 100~200 mb 的 RAM 並且搭配 SQLite，也因為他們是 Open Source Software(OSS)，因此也可自由的使用 Docker 來架設，當然若使用者太多時還是需要有效規劃來容納流量。

## 6. Apache Arrow

顧名思義就是 Apache 的一個項目，它是使用二進制檔案結構去處理一些進行中非序列化的任務，降低序列化所產生的消耗，主要提供跨平台應用來加快大數據分析項目的運行速度。

> 心得: 雖然沒做過大數據，但看起來像是在解決平行化處理時的一些內部資源問題，有機會來好好研究一下。

想深入了解的話參考:

- [官網](https://arrow.apache.org/)
- [參考 1](https://kknews.cc/zh-tw/tech/225x3kr.html)
- [參考 2](https://www.infoq.cn/article/apache-arrow)

# 結論

每次聽這些節目都讓我認識到許多新的東西，且主持人也道出開發者們普遍會想知道的問題，經營開源專案要顧慮到的部分也與一般公司不一樣， 讓我收穫滿滿，同時藉由 onboard 前的時間培養英聽的能力也看逐字稿學習對科技英文的敏銳度。
