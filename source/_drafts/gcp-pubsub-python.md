---
title: 【GCP】Pub/Sub Python 紀錄
categories: 學習紀錄
tags:
---


![](https://nijialin.com/images/2023/pubsub)
![](https://nijialin.com/images/common.jpeg)


# 前言

<!-- more -->

# 服務使用介紹

![](https://nijialin.com/images/2023/pubsub/1.png)

首先到 GCP 上的 [Pub/Sub 服務](https://console.cloud.google.com/cloudpubsub/topic/create)中按下**建立主題**，這邊很貼心的下方也有加上晚點會使用到的 topic name

![](https://nijialin.com/images/2023/pubsub/2.png)

進到 Topic 頁面，往下滑找到**建立訂閱項目**，建立一個**項目ID**，稍候測試與設定會需要用它

![](https://nijialin.com/images/2023/pubsub/3.png)

接著來到工作坊的專案[gcp-serverless-workshop/notifier-line](https://github.com/gcp-serverless-workshop/notifier-line)下，按下下方的佈署按鈕，接下來會進入 Cloud Shell 的部分

![](https://nijialin.com/images/2023/pubsub/cloudshell.png)

> Cloud Shell 有上限：https://cloud.google.com/shell/docs/quotas-limits

## LINE Bot 建立與設定 Cloud Run 環境變數

接著是建立官方帳號，詳細步驟請參考 [LINE Developers 官方文件](https://developers.line.biz/en/docs/messaging-api/getting-started/#step-one-enable-use-of-messaging-api)，主要我們要做到可以[設定 webhook URL 這個部分](https://developers.line.biz/en/docs/messaging-api/building-bot/#setting-webhook-url)，把剛剛佈署完的 Cloud Run 網址複製到 Webhook 欄位上： `https://CLOUD_RUN_URL/webhooks/line` (如果是使用這個[範例專案](https://github.com/gcp-serverless-workshop/notifier-line))

- 需要到 [Official Account Manager](https://manager.line.biz/)將 LINE Bot 群組功能打開，以供測試使用
- 將 LINE Bot 的 ACCESS—TOKEN 以及 SECRET 放入 Cloud Run 環境變數中
  - LINE_CHANNEL_ACCESS_TOKEN=your_line_channel_access_token
  - LINE_CHANNEL_SECRET=your_line_channel_secret
- 把 Event 當中的 LINE 群組 ID 存下來放在 Cloud Run 環境變數中
  - LINE_GROUP_ID=

## 回到 GCP Pub/Sub 上

![](https://nijialin.com/images/2023/pubsub/4.png)

這部份把 Cloud Run 的 Domain 設定到 訂閱項目ID(Subscribe Topic ID)上，進入到上圖的畫面，按下**編輯**

![](https://nijialin.com/images/2023/pubsub/5.png)

把傳送類型從 **提取** -> **推送**，並且把**端點網址(Endpoint)**換成 Cloud Run 的 Domain，並加上 `/sub` (專案設定的路徑)

## 寫一個 pub.py 來試試看

參考 [gcp-serverless-workshop/notifier-line](https://github.com/gcp-serverless-workshop/notifier-line/blob/main/pub.py)，我們可以針對線上環境去 pub data 去 topic，其中有些需要注意的：

- 需到 GCP Service Accounts 中拿取一把金鑰，是 JSON 格式，並且把路徑置換
  - 第9行：`os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'YOUR_GCP_CA_PATH'`
- 第12行：project_id = "換成你 GCP Project ID"
- 第13行：topic_id = "你剛剛建立的 TOPIC ID"


# 結論
