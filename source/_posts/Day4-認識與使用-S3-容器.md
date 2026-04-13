---
title: Day4 - 認識與使用 S3 容器
tags:
  - AWS
  - Serverless
  - S3
categories: 2019鐵人賽
abbrlink: 931534491
date: 2019-09-19 15:44:36
---

## 前言

Amazon Simple Storage Service(簡稱 AWS S3)是 AWS 的一個線上儲存服務，用戶能夠輕易把檔案儲存到網路伺服器上，可能有些朋友會把它當成雲端硬碟看待，但其實還能像是傳靜態檔案上去，若有寫前端框架的朋友通常都會需要把程式碼打包成靜態檔案再部署，然而這邊把他打包送上去後，S3 會給一個名為 Object Url 的網址，可以透過這個網址去執行網頁裡面的內容(如 AJAX、Axios...)，並可以透過 cloudfont 去弄成 CDN(扯遠了)，簡單說他還有很多不一樣的功能應用等著大家去用～

因為 serverless 只能放關於 API 的程式碼，因此我們需要把 html 靜態檔案放在 S3 裡，

接下來就來建立一個公開的 S3 容器，這邊就不會提到權限如何控管哦！

## 建立一個公開的 S3 容器

建立一個名為`2019-it-30-bucket`的容器，地區就選與 Lambda 同樣的地區，直接按下左下角的`create`來建立。
![](https://i.imgur.com/lfRsTDn.png)

建立完會像這樣
![](https://i.imgur.com/SgPTxsQ.png)
接著點進去後在點到第三個選項會看到 Block of public access 是啟動的狀態，因為我們接下來需要讓我們的頁面可以外部使用
![](https://i.imgur.com/M065zbI.png)
就把 check box 的按掉，在按下 `Save`
![](https://i.imgur.com/SjT0qY7.png)
要輸入`confirm`就修改完成嚕
![](https://i.imgur.com/qxquZI1.png)
接著一樣點到第三個個選項，選到`Access Control List`，看到`Access for bucket owner`這個選項的`Canonical ID`，選項都全部打勾之後再來調整，這樣之後的 HTML 檔案外面就看得到了。
![](https://i.imgur.com/uZfyrAQ.png)

## 測試

接著上傳一個`index.html`的檔案來測試

```
<html>
<h1>Hello world</h1>
</html>
```

上傳後下拉式選單選擇`public read`的選項，因為一個檔案在 S3 就算是一個 Object，所以一定要讓它能對外，然後按下左下的 Upload
![](https://i.imgur.com/iO2R9aW.png)

成功後點進這個檔案，並按下方的`Object URL`，看到 Hello World 的話就代表成功囉，這時可以開個無痕測一次，確認一下沒有錯誤 😃
![](https://i.imgur.com/m1jC1E2.png)

# 參考

[AWS S3 wiki](https://zh.wikipedia.org/wiki/Amazon_S3)
