---
title: Day27 - Use CDN (2) - CloudFront
tags:
  - Serverless
  - CDN
  - CloudFront
categories: 2019鐵人賽
abbrlink: 486052549
date: 2019-10-11 21:06:26
---

## 前言

不管是建立虛擬機(EC2)，又或是像我們建立 Serverless 的服務(Lambda)，總會挑選離自己家近的節點(東京)，又或者可能因為價錢的關係選擇相對便宜的地點，但不管機器在哪，對於在台灣的我們來說都是一樣跨海啊！但好險台灣擁有 CloudFront 的節點，透過快取讓使用者可以更快的取得服務器上的資源，可能第一次都會比較慢，但只要讓 CloudFront 看過一次就會幫忙快取起來，下次使用者在用的時候就不會那麼慢囉！

## 建立 CDN

首先我們先進去 CloudFront 的頁面，按下左欄的`Distribution`後並 `Create`的藍色按鈕
![](https://i.imgur.com/WQ5o8rl.png)
因為我們是做 Web API 相關的，這邊當然就是選 Web 囉！
![](https://i.imgur.com/htzGaGA.png)
到了這邊，AWS 很有心的在這些輸入框大多都有下拉式選單，這邊就選建立完的那個專案名稱
![](https://i.imgur.com/ntJu1Cm.jpg)
選完之後下面三個就照著這樣點選，Comment 會幫你自動填入
![](https://i.imgur.com/XkbNkfz.png)
CNAMEs 的部分這邊我填入我在 `serverless.yml`裡 create_domain 所設定的 `line.nijia.lin` 字串，SSL 就選擇上一篇所建立的 Certificate
![](https://i.imgur.com/SdnaZhe.png)
建立完成之後就會看到他 `In progress`，CloudFront 就開始撒點告訴其他節點有建立這個名為 `line.nijia.lin`，有看到他的時候記得幫他做個 Cache
![](https://i.imgur.com/RibhSWw.png)
等個大概 15 分鐘後他就部署完成啦～
![](https://i.imgur.com/kHYSETU.png)
點進來可以確認自己剛剛設定的資訊對不對，若有設定錯誤在按 Edit 來修正
![](https://i.imgur.com/HdCn9ue.png)

## 結論

現在每個服務都很流行 CDN，若有在寫前端的朋友常常就會用到 jQuery、Bootstrap、Vue 等等可以再標頭檔就引入的 CDN 路徑，CDN 不僅加速我們平常在抓伺服器資料的速度，也便利了我們有時候需要寫一些簡單的靜態頁面時可以透過抓取 CDN 路徑來快速取得需要的資源，但是像是 AWS 他們都是收取流量費，用得很爽時別忘了看一下自己的帳單是不是在哀嚎 🤣
