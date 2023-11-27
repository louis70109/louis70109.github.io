---
title: 【GCP】Pub/Sub Python 實戰紀錄 | DevFest 2023 台中工作坊
tags:
  - Pub/Sub
  - GCP
  - Google
  - LINE
  - Python
categories: GCP
date: 2023-11-26 22:52:34
---

![](https://nijialin.com/images/2023/pubsub/OIG.jpeg)

# 前言

此篇文章為 2023/12/09 DevFest Taichung Serverless workshop 步驟文章，如果有需要透過 GCP Pub/Sub 將訊息轉打給訂閱的 Cloud Run endpoint，可以參考看看這篇文章喔！

<!-- more -->

# 前置準備

- 需要有 GCP 的帳戶，有綁信用卡可開啟服務，且需要開啟個專案
- 需要有 LINE 帳號，且要能登入 [LINE Developer Console](https://developers.line.biz/console/)
  - 要能開啟一個 Provider + Channel

# 服務使用介紹

![](https://nijialin.com/images/2023/pubsub/1.png)

首先到 GCP 上的 [Pub/Sub 服務](https://console.cloud.google.com/cloudpubsub/topic/create)中按下**建立主題**，這邊很貼心的下方也有加上晚點會使用到的 topic name

![](https://nijialin.com/images/2023/pubsub/2.png)

進到 Topic 頁面，往下滑找到**建立訂閱項目**，建立一個**項目 ID**，稍候測試與設定會需要用它

![](https://nijialin.com/images/2023/pubsub/3.png)

## 佈署 Cloud Run

接著來到工作坊的專案[gcp-serverless-workshop/notifier-line](https://github.com/gcp-serverless-workshop/notifier-line)下，按下下方的佈署按鈕，接下來會進入 Cloud Shell 的部分

![](https://nijialin.com/images/2023/pubsub/cloudshell.png)

> Cloud Shell 有上限：https://cloud.google.com/shell/docs/quotas-limits

跟 cloud build 有關皆需要以下權限 ([URL](https://cloud.google.com/run/docs/deploying-source-code#permissions_required_to_deploy))

- Cloud Build Editor role
- Artifact Registry Admin role
- Storage Admin role
- Cloud Run Admin role
- Service Account User role

## LINE Bot 建立與設定 Cloud Run 環境變數

接著是建立官方帳號，詳細步驟請參考 [LINE Developers 官方文件](https://developers.line.biz/en/docs/messaging-api/getting-started/#step-one-enable-use-of-messaging-api)，主要我們要做到可以[設定 webhook URL 這個部分](https://developers.line.biz/en/docs/messaging-api/building-bot/#setting-webhook-url)，把剛剛佈署完的 Cloud Run 網址複製到 Webhook 欄位上： `https://CLOUD_RUN_URL/webhooks/line` (如果是使用這個[範例專案](https://github.com/gcp-serverless-workshop/notifier-line))

![](https://nijialin.com/images/2023/pubsub/6.png)

- 需要到 [Official Account Manager](https://manager.line.biz/)將 LINE Bot 群組功能打開，以供測試使用
- 將 LINE Bot 的 ACCESS—TOKEN 以及 SECRET 放入 Cloud Run 環境變數中
  - LINE_CHANNEL_ACCESS_TOKEN=your_line_channel_access_token
  - LINE_CHANNEL_SECRET=your_line_channel_secret
- 把 Event 當中的 LINE 群組 ID 存下來放在 Cloud Run 環境變數中
  - LINE_GROUP_ID=

## 回到 GCP Pub/Sub 上

![](https://nijialin.com/images/2023/pubsub/4.png)

這部份把 Cloud Run 的 Domain 設定到 訂閱項目 ID(Subscribe Topic ID)上，進入到上圖的畫面，按下**編輯**

![](https://nijialin.com/images/2023/pubsub/5.png)

把傳送類型從 **提取** -> **推送**，並且把**端點網址(Endpoint)**換成 Cloud Run 的 Domain，並加上 `/sub` (專案設定的路徑)

## 寫一個 pub.py 來試試看

參考 [gcp-serverless-workshop/notifier-line](https://github.com/gcp-serverless-workshop/notifier-line/blob/main/pub.py)，我們可以針對線上環境去 pub data 去 topic，其中有些需要注意的：

- 需到 GCP Service Accounts 中拿取一把金鑰，`放到本專案當中`，是 JSON 格式，並且把路徑置換
  - 第 9 行：`os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'YOUR_GCP_CA_PATH'`
    - 開啟終端機，執行 `pwd`，並且把檔案名字加在路徑後方
- 第 12 行：project_id = "換成你 GCP Project ID"
- 第 13 行：topic_id = "你剛剛建立的 TOPIC ID"

## 測試看看

![](https://nijialin.com/images/2023/pubsub/code.png)

接著可以在本地端 `python pub.py` 來把消息疼過 GCP CRED 打上去 Pub/Sub，接下來看一下訊息有沒有轉打到 Cloud Run。

> 如果測試發現有任何環節看不到，可以先在本地端把 API Server 起起來，然後用 ngrok 之類代理本地服務去測試，並且把 Pub/Sub 服務的網址先換掉來 debug，接著再看看 pub.py 是否有東西沒準備好

> ngrok 可以參考這篇文章 - [Day 20 GCP 公有雲\_雲端事件消息傳遞服務實戰 - Pub/Sub 組建測試之路](https://ithelp.ithome.com.tw/articles/10249308)

# 結論

由於這次工作坊中的範例專案是先以 LINE 群組推播為主(Push Message)，因此在環境變數中會先有一個 **LINE_GROUP_ID** 來指定推送，如果有其他需求可以把 Flex Message 以及 Push Message 換成你想要的內容喔！
