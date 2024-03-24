---
title: 【標題】題目
categories: 學習紀錄
date: 2024-03-24 13:21:50
tags:
---


![](https://nijialin.com/images/2024/kuma/1.png)

# 前言

由於近期自己蓋了幾隻 side project，慢慢發現有些服務倒了我自己也不知道，但時間久了其實當下也會忘了要修哪...

也因公司內有 status page 可以看每個服務狀態，想想這需求我也需要，因此萌生了架 status page 來幫忙確認健康狀態，接下來看看怎麼操作吧

<!-- more -->

# 介紹

此次使用的是 [uptime-kuma](https://github.com/louislam/uptime-kuma/tree/master)，本來想說可以直接上到 Google Cloud Run 上，除了自己弄不上去以外，也發現 uptime kuma 是使用 SQLite 來儲存資訊，這邊很有可能被 [Cold Start 的問題](https://nijialin.com/2020/02/15/serverless-cold-start/)打到，因此這次使用 fly.io 來部署([民間版本.toml](https://github.com/louis70109/uptime-kuma-fly/blob/main/fly.toml))

1. 有許多的 notification 可以串接，有支援 LINE Bot & Notify

![](https://nijialin.com/images/2024/kuma/notification.png)

2. 初次進去就可以設帳密，但帳號只能一個還改不了 🫣
3. 可設定群組，統一設定 notification 而不用各別弄
4. 還沒研究怎麼把 SQLite 拔出來，看來有支援 MySQL

5. 備份不求人，直接 Export 就可以了

![](https://nijialin.com/images/2024/kuma/backup.png)

6. 如何部署到 fly.io

```
# Clone 專案到本地
git clone https://github.com/louis70109/uptime-kuma-fly.git
# 進入資料夾
cd uptime-kume-fly/

# 部署，原先指令是 flyctl
fly launch \
  --copy-config \
  --auto-confirm \
  --ha=false \
  --name uptime-kuma-nijia \
  --now
```

7. 如果想要在 fly.io 上客製化 domain，例如：`status.YOURDOMAIN.com`

```
fly certs create status.YOURDOMAIN.com
fly certs create "*.YOURDOMAIN.com"
fly certs show "*.YOURDOMAIN.com"
```

# 結論

看 Fly.io 一個月租金寫 5 美元，但因為只有一個服務應該不會用到這麼多流量，這次除了架設 status page 以外，也來看看這邊租金是怎樣，如果 < 100 台幣的話或許可以考慮繼續使用，畢竟人家提供方便的服務來使用也是挺棒的！
