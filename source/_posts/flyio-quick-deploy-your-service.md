---
title: 如何建立 fly.toml 並快速佈署至 Fly.io
tags:
  - Fly.io
  - Serverless
categories: Serverless
date: 2024-04-04 02:16:57
---


# 介紹

最近因為有些專案需要有 local Volume，但在 Serverless 上要用偏麻煩，除機器上的本身功能以外，還需要另外開 VM 讓 Container 能夠 mount volume，因此需要類似 Heroku、Fly.io 這類的 SaaS 的服務，可以用很少量的費用去使用到 Database/Volume 的功能...

<!-- more -->

過往使用 Heroku 經驗也是會睡眠之後把記憶體(SQLite)內容清乾淨，因此上一篇「[在 Fly.io 上架設 Uptime Kuma 監控 Side Project](https://nijialin.com/2024/03/24/flyio-deploy-uptime-kuma/)」時策之後發現不會被清掉，因此就延續這邊來介紹使用

# 背景

有用過 Heroku, Google Cloud, Amazon...+本篇 Fly.io，在一體式與分離式的雲服務基本上都用過

- 像是 Heroku & Fly.io 就可以一包 code 直接上，連 Database/NoSQL 都可以直接弄
- GCP/AWS 則是可以獨立操作想要的功能，需要時在整合，比較乾淨也不會一次佈署搞的霧煞煞

那基本上就是依需求為主，個別有好處也有各自的 config 需要讀寫，但反正概念上都差不多，先學一套剩下的都好處理 💪

# 操作步驟

```
brew install flyctl
```

如果你已經有帳號的話

```
fly auth login
```

第一次還沒有 config 可以使用以下指令，透過 UI 的方式幫忙建立 Fly config

```
fly launch
```

![](https://nijialin.com/images/2024/flyio/launch.png)


畫面上的東西確認後，會在專案下看到 fly.io 幫你建立的 fly.toml，範例如下：

```
# fly.toml app configuration file generated for SERVICE_NAME on 2024-04-03T23:36:13+08:00
#
# See https://fly.io/docs/reference/configuration/ for information about how to use this file.
#

app = 'SERVICE_NAME'
primary_region = 'sin'

[build]

[env]
  LINE_CLIENT_ID = '...'
  LINE_CLIENT_SECRET = '...'
  LINE_REDIRECT_URI = '...'

[http_service]
  internal_port = 8080
  force_https = true
  auto_stop_machines = true
  auto_start_machines = true
  min_machines_running = 0
  processes = ['app']

[[vm]]
  size = 'shared-cpu-1x'
```

## 第二次之後需要部屬：

```
fly deploy
```

Example

```
...
image size: 1.0 GB

Watch your deployment at https://fly.io/apps/SERVICE_NAME/monitoring

-------
Updating existing machines in 'SERVICE_NAME' with rolling strategy

-------
 ✔ [1/2] Machine 9080110f700387 [app] update succeeded
 ✔ [2/2] Machine e784e52b270168 [app] update succeeded
-------
Checking DNS configuration for SERVICE_NAME.fly.dev

Visit your newly deployed app at https://SERVICE_NAME.fly.dev/
```

## 如果 RAM 第一次部屬開太大怎麼辦？

參閱文件：https://fly.io/docs/apps/scale-machine/#add-ram

```
fly scale memory 512
fly scale show
```

## 我換電腦沒有當初的 fly.toml 檔案怎辦？

只要電腦現在終端機有透過 `fly auth sign` 登入，接下來只要把專案 clone 下來，確定 `fly.toml` 裡面的 app 後面的名字一樣，進到終端機就可以 `fly status` 看看機器狀態囉！

## flask deploy 有問題，一直 port confuse

如果是依靠 gunicorn 部屬的讀者，以下應該會在 Dockerfile 裡面寫上這一段：

```
CMD ["gunicorn", "api:app", "--log-file=-"]
```

然而這個啟動方式不論在 app.py 或是 Dockerfile 上寫了 EXPOSE port 為其他的，皆會預設 `127.0.0.1:8000`，這個舉動會讓 fly.io 感到困惑(confuse)，因為 fly.io 只聽 `0.0.0.0`，至於 port 應該是不影響，只是在 log 裡面一直看到 port confuse 覺得很奇怪

其中只要把 Dockerfile 裡面的 CMD 改成以下的就可以上去了，記得自己的 app.py 要改 port 喔！

```
CMD ["flask", "run", "--host", "0.0.0.0", "--port", "8000"]
```

> [參考文章](https://technotrampoline.com/articles/deploying-a-python-flask-application-to-fly/)

# 結論

Fly.io 這邊還有很多功能可以使用，但大多都需要透過 command line 來操作，是一個比較開發者導向的 SaaS 的服務，但指令滿直觀的，或許都可以參考使用看看喔！