---
title: Day26 - Use CDN (1) - 建立 Certificate 與 Domain
tags:
  - Serverless
  - CDN
  - Route 53
  - Certificate Manager
categories: 2019鐵人賽
abbrlink: 2081624252
date: 2019-10-10 21:05:23
---

## 簡介

繼上一篇 warm-up 機制之後來了解一下如何使用 AWS 的 CDN 服務 - cloudfont，CDN 顧名思義就是要讓使用者可以到最接近的主機上去拉到對應的資料，透過撒點的方式讓主機去挑選離自己近的服務據點，藉此加速服務。

像我之前部署在 ohio，想想光網路的時間 + Cold start 的時間就已經去了一大半，即便我們有熱開機，服務沒有 Timeout 我該慶幸了，既然如此就不得不認識一下 CDN 服務，而 AWS 的 CDN 服務就是 cloudfont 啦！

只是說原本的 domain 已經有 SSL 了，但是代理沒有這個東西，所以我們要 ban 出一個 Certificate，那在在建立 cloudfont 以前需要先到 Certificate Manager，接著會用圖片帶大家一步一步做

![](https://i.imgur.com/vLLfKyr.png)

## 開始之前

我已經有先在 Route53 註冊了一個 `nijialin.com` 的 domain，`.com`大概 10 美金左右，若是有在其他地方註冊域名的話要找一下相關文章把它導進 Route53 哦！

## 註冊 Certificate

- 先來到 Certificate Manager 頁面，按下左下角的這個

![](https://i.imgur.com/WVk2YFJ.png)

- 接著就直接按右下角啦，但是要確定是不是 public

![](https://i.imgur.com/sNxd3LG.png)

- 這裡輸入你在 route53 註冊的 domain，這邊我是輸入 \*.nijialin.com

![](https://i.imgur.com/FXnknbj.png)

- 到第四部之後就會看到申請的 SSL Pending

![](https://i.imgur.com/WlY5PCf.png)

- 最後回首頁之後就會看到 SSL 簽證正在送簽中
  ![](https://i.imgur.com/kRRtvJ5.png)

最後就等他完成嚕！將將
![](https://i.imgur.com/495PjEw.png)
接著我們到 API Gateway 找到左邊的 `Custom Domain Name`，我們要來建立屬於這個 API 的 Domain 了
![](https://i.imgur.com/BzkvgUR.png)
按下藍色的按鈕之後，輸入`Domain name`以及選擇剛剛註冊的 Certificate 後按下 `Save`
![](https://i.imgur.com/xwBEC5O.png)
他就會開始初始化剛剛的設定，這邊大概需要等 15 分鐘左右
![](https://i.imgur.com/dLMaXrx.png)
在此同時我們就去新增專案裡的套件 [Domain-Manager](https://www.npmjs.com/package/serverless-domain-manager)

```Bash
npm install serverless-domain-manager --save-dev
```

並且在`plugin`下加入套件

```yaml
plugins:
  - serverless-domain-manager
```

在`custom`底下加入

```yaml
custom:
  domainName:
    default:
      domainName: line.nijialin.com
      certificateName: "*.nijialin.com"
      createRoute53Record: true
      endpointType: edge
```

等待前面初始化成功之後部署這個專案`sls deploy`之後就會看到剛剛註冊的域名啟動囉！
![](https://i.imgur.com/Pn2TyMD.png)

## 結論

在建立 Certificate 那邊倒沒什麼問題，畢竟需要一個 SSL，只是到了建立 domain 這邊遇到了很怪的問題，一般來說使用 serverless 框架來跑的話只要照的文件裡說的 `serverless create_domain`就會幫忙註冊，而且可以依照自己開發環境去自動設定，在公司的專案中這樣使用是沒問題的，在是在寫這篇文章時卻只能使用以上的方法來替代使用，雖然結果是一樣的，但是用起來實在是很不符合邏輯，google 也沒找到類似的問題，或許這個問題還要多實測幾次才夠...😭
