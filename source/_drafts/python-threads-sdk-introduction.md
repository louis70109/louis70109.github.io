---
title: 【標題】題目
categories: 學習紀錄
tags:
---


![](https://nijialin.com/images/2024/threads-sdk/1-createapp.png)
![](https://nijialin.com/images/common.jpeg)


# 前言

<!-- more -->

# 介紹

## 1. 建立應用程式

![](https://nijialin.com/images/2024/threads-sdk/1-createapp.png)

至 [Meta Developer Tool](https://developers.facebook.com/apps/) 右上角按下 **Create App**，因為是要串接 Threads，選擇 **Access the Threads API**

## 2. 選擇 Threads

![](https://nijialin.com/images/2024/threads-sdk/2-name.png)

期間把需要填上的資訊補上即可，就可以建立成功

## 3. 開啟 APIs

![](https://nijialin.com/images/2024/threads-sdk/3-apis.png)

建立完成之後，預設 Threads 只會幫忙開一個 API，其他的可以按下去把它打開，基本上要用也都是全開，應該沒有不想開的 (?)

## 4. 加入 IG 帳號

![](https://nijialin.com/images/2024/threads-sdk/4-add-account.png)

這邊一開始會有點誤導，以為自己 Facebook 帳號有登入就可以，要再把自己的 IG 帳號加入為測試帳號，輸入帳號不用加上 **＠**

## 5. 允許 Threads 與應用程式連動

![](https://nijialin.com/images/2024/threads-sdk/5-thread-connect.png)

這邊在第四步加入帳號之後，理論上會導過去，如果沒有的話，也可以找設定頁面中的**邀請**，這邊點進來之後就會看到剛剛送出的測試邀請，**接受**即可

## 6. 開始測試

![](https://nijialin.com/images/2024/threads-sdk/7-dev-tool.png)

大家剛到 **Graph 測試頁**之後，要先產生出 Access Token 之後才可以合法拿到相關的資料，這邊點下 Generate Token 之後，就會來到跳轉頁面

![](https://nijialin.com/images/2024/threads-sdk/6-access.png)

這邊跟各種網頁應用程式一樣，都會跳一個同意頁面之後才可以開始

## 7. 拿取個人帳號資訊

![](https://nijialin.com/images/2024/threads-sdk/7-dev-tool.png)


# 結論

# 餐考

- [Come on！使用 Threads API 來自動發文吧](https://cowton0517.medium.com/come-on-%E4%BD%BF%E7%94%A8-threads-api-%E4%BE%86%E8%87%AA%E5%8B%95%E7%99%BC%E6%96%87%E5%90%A7-792797a68437)