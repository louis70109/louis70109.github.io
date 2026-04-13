---
title: 處理 Cloud Run 上的 Error loading ASGI app. Could not import module "main".
tags:
  - FastAPI
  - Cloud Run
  - GCP
  - LINE Bot
  - Gemini
categories: GCP
date: 2024-04-07 14:25:38
---



![](https://nijialin.com/images/common.jpeg)


# 前言

這兩天在寫之後工作坊需要用到的範例 [linebot-gemini-summarize](https://github.com/louis70109/linebot-gemini-summarize)，結果遇到部屬上去有問題，以下快速筆記這次遇到的一些蠢事，往後需要更細心點才行🤣

<!-- more -->

# 介紹

![](https://nijialin.com/images/2024/cloudrun-traffic/log.png)


```
[ ✖ ] Failed deploying the application to Cloud Run.
Error: reason=HealthCheckContainerError message=Revision 'linebot-gemini-summarize-00003-pmn' is not ready and cannot serve traffic. The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable. Logs for this revision might contain more information.
```

1. 看到 cloud run log 上出現：`Error loading ASGI app. Could not import module "main".`
   1. 檢查後發現自己 [linebot-gemini-summarize](https://github.com/louis70109/linebot-gemini-summarize/blob/main/Dockerfile#L5) 的 Dockerfile 少了 WORKDIR
2. 後來加上去後還是出了一樣問題，log上寫沒有 LINE_CHANNEL_ACCESS_TOKEN 環境變數
   1. 這邊可以用 app.json 去處理部屬上的問題

# 結論

按照記憶有幾個 side project 似乎有遇到這個問題，如果也有遇到部屬不上去 cloud run的地方，不妨先檢查一下 Dockerfile 喔！