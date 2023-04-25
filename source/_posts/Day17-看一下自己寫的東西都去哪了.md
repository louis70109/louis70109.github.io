---
title: Day17 - 看一下自己寫的東西都去哪了
tags:
  - Serverless
  - CloudFormation
  - Lambda
  - S3
  - API gateway
categories: 2019鐵人賽
abbrlink: 3898416250
date: 2019-10-01 20:49:05
---

## 前言

用 Serverless 用得這麼爽，也是時候來看一下他的資源在哪，距離我上次自己手動上傳 python 檔已經是 N 個月之前的事了(遠望)，當時也沒用過什麼`Api Gateway`相關的服務，以下就帶大家來介紹一下嚕！

## 介紹

### CloudFormation

CloudFormation 是一個 AWS 所提供的 JSON-base 服務，主要是用來讓使用者能夠快速建立 AWS 的服務。

> 這邊也不用擔心設定的問題，Serverless 再 deploy 的過程中會幫忙 CloudFormation 的 json 檔

![](https://i.imgur.com/mK9lYCD.png)
透過 CloudFormation 建立 JSON-based 的 template 你可以快速建立所需要的資源堆疊（stack）。

![](https://i.imgur.com/GzHh65j.jpg)
按下`Template`後如下圖所示，他會顯示你已經有建立的服務 Map，整個線牽起來看起來就很爽 XD
![](https://i.imgur.com/bcg1f0a.png)

### Api Gateway

Serverless 建立過程中也會透過 CloudFormation 幫忙建立 Api Gateway，因為我們是用 `WSGI`，所以只會看到兩個`ANY`的路由。
點進去後就可以看到 Client 是怎麼進出的，最右邊是打到 AWS Lambda 上，可以點選上面的字進入 Lambda 所在地。
![](https://i.imgur.com/GPVXsc9.jpg)

### Lambda

點選進來之後可以看到 Lambda 接了什麼服務，以我到目前的程式就會有`API Gateway`、`SQS`以及預設的`CloudWatch`(都是透過這個來看 log)
![](https://i.imgur.com/0MYquqC.png)
接著往下會看到之前設定的`環境變數`以及`STAGE`，這些都是托`Serverless`的福免去這些麻煩的設定
![](https://i.imgur.com/nwKK3xb.png)

### S3

Serverless 在過程中會在 S3 幫忙建立一個 Bucket，並在後面加個 hash key 以免 bucket 重複。
![](https://i.imgur.com/flZtoFn.png)

### Cloud Watch Log

在開始測試後 AWS 會幫忙在這個地方輸出 Log，
![](https://i.imgur.com/t3Ki0gi.png)

### Serverless deploy 紀錄

#### 這邊使用 `Serverless deploy --verbose` 就可以看到所有部署中的基本資訊了

首先因為我們有使用`.env`，所以在一開始時會先設定環境變數，接著就是把相依套件的東西都放進去，再去啟動 CloudFormation
![](https://i.imgur.com/yMKZfAQ.png)

---

接著會建立一個 S3 的 Bucket，將程式透過 CloudFormation 處理成 `zip`的檔案格式並上傳到 S3 上面
![](https://i.imgur.com/NDh2rU8.png)

---

接著就會部署到 `Lambda` 以及 `Api Gateway` 上，並做對應 CloudFormation JSON 檔的設定
![](https://i.imgur.com/7D4v9qS.png)

---

在最後部署完之後就可以看到所有的基本資訊，物件名稱、部署階段、區域、網域以及 Function 們(因為 Lambda 是 Function-base 的服務)等等的基本資訊都會在此
![](https://i.imgur.com/wCBixvO.png)

## 結論

以目前的架構基本上到這麼基本資訊都顯示出來了，若是有使用像是`Route 53`、`CloudFront`等等的服務它就會顯示在這邊了。雖然說 CloudFormation 在設定上已經很方便了，但不得不說 Serverless 真的幫忙做了很多事，讓開發者又更能專注在打 Code 上了～

## 參考

[使用 CloudFormation 快速部署 AWS 資源](https://medium.com/@chihsuan/cloudformation-%E5%BF%AB%E9%80%9F%E5%BB%BA%E7%AB%8B-aws-%E8%B3%87%E6%BA%90-d3378b096249)
