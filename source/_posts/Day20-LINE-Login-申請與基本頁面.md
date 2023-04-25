---
title: Day20 - LINE Login 申請與基本頁面
tags:
  - LINE
  - LINE Login
categories: 2019鐵人賽
abbrlink: 864807826
date: 2019-10-04 20:59:09
---

## 前言

上篇介紹了好多了，這邊就不廢話了，直接就帶大家申請一個 LINE Login 的服務。

## 實作

首先到自己的開發者頁面按`+`，並選擇最左邊的選項
![](https://i.imgur.com/c9JI0vX.jpg)
接著輸入`App name`(服務名稱)、`App description`(服務簡介)，因為我們是實作 API ，所以選擇`Use WEB`的選項，接著再輸入`email`
![](https://i.imgur.com/AA8NiF8.png)
把該填的填完之後按下送出就會看到有一個新的服務嚕！
![](https://i.imgur.com/RBM1HdJ.jpg)
點進去後往下滑，可以看到有個 `link to this channel` 的選項，這邊選擇一開始建立的那隻機器人，綁定之後就變它的形狀啦(?)
![](https://i.imgur.com/ES4wcHn.png)
接著再往下會看到 Email 的狀態是 Unapplied，然後按下右邊的`Submit`
![](https://i.imgur.com/SHgQYsU.png)
會看到這樣子的一個框框，把兩個框框打勾並選擇一張圖片上傳，這部分就算是申請帳號下面的同意服務條款一樣，圖片就上傳自己希望當使用者到你頁面的時候想看到的圖片 🤣，送出之後就會看到狀態改成 `Applied` 了
![](https://i.imgur.com/da7zYPg.jpg)

## 結論

很多時候實作對我們來說已經不是什麼問題了，重點是在找不到服務要怎麼去申請 😓，這篇也算是記錄一下申請的步驟細節，接下來會實作個簡單的認證頁面以及 API，打完收工嚕！
