---
title: Day28 - 用 S3 幫忙轉址到原有的服務上
tags:
  - AWS
  - S3
  - Route53
categories: 2019鐵人賽
abbrlink: 1405710804
date: 2019-10-12 21:07:18
---

## 前言

在之前的文章都有將 `Notify`、`LINE Login`所需要的靜態頁面放在 S3 上面，讓其他使用者去點，雖然把前端放在程式裡面用 render template 比較好，可是在求快的情況下我把靜態頁面寫完就扔上去了(被拖走)，其實也可以透過這個方法去幫忙轉址，不過接下來我會用我的臉書做個範例提供參考～

## 實作

照著之前的範例來建立一個名為 `facebook.nijialin.com` 來做 S3 轉址的範例
![](https://i.imgur.com/BJyONqF.png)
建立完之後因為我們需要把網址公開給其他使用者點選，在第三個分頁中先把第一個選項的 `Block all public access` 更換成 off 狀態
![](https://i.imgur.com/FAoiCbt.png)
到第二個按鈕選項選擇 `Public access`，暴力一點把所有選項都打開 🤣
![](https://i.imgur.com/WhCoHl4.png)
前面都已經把權限開完，選擇`Static Website hosting`這個選項，這個是 S3 提供來讓他有另一種功能，不過我是覺得這功能在這邊有點奇怪 XD
![](https://i.imgur.com/yPv6nET.png)

---

接著就來到 `Route 53`，點選左欄的 `Hosted Zone`
![](https://i.imgur.com/k1T8wIT.png)
點選上面藍色的按鈕，右邊會出現輸入的地方讓你填
![](https://i.imgur.com/szIVARy.png)
這邊我會輸入跟 S3 bucket 的名字一樣，然後 `Alias` 選擇 Yes，下面輸入框點下去會看到自己剛剛輸入的 S3 website endpoints
![](https://i.imgur.com/PVlFHJZ.png)
建立完之後就可以在瀏覽器上輸入網址，他就會導去你預設的網站囉！向我這邊就是拿我的 facebook 來做示範。

## 結論

我透過這個方法幫我把 medium 的部落格網址重新導向，因為我想之後若是有獨立建立部落格的話網址會是一樣的，當有點粉絲的話至少他們認得的網址會是一樣的 😁。

## 參考

[Route 53+靜態網址](https://www.kilait.com/2015/09/08/route-53-%E9%9D%9C%E6%85%8B%E8%BD%89%E5%9D%80/)
