---
title: Day12 - LINE 的服務都玩了，怎麼能忘了 Message api (Bot) 呢？ (3) - 應聲蟲實作
tags:
  - LINE
  - chatbot
  - Message api
categories: 2019鐵人賽
abbrlink: 1739126467
date: 2019-09-26 20:39:32
---

## 實作

新增兩個 LINE Channel key 至 `.env`

```
LINE_CHANNEL_TOKEN=
LINE_CHANNEL_SECRET_KEY=
```

接著加入 LINE 的 python SDK 至 requirements.txt

```
line-bot-sdk==1.12.1
```

透過 pip 安裝一下

```
pip install -r requirements.txt --user
```

在 controller/ 底下新增一個 message_api_controller.py 並輸入以下程式

```python
from flask import Flask, request, abort
from flask_restful import Resource
import json
import os
from linebot import (
    LineBotApi, WebhookHandler
)
from linebot.exceptions import (
    InvalidSignatureError
)
from linebot.models import (
    MessageEvent, TextMessage, TextSendMessage,
)


class LineMessageApiWebhookController(Resource):
    def post(self):
        line_bot_api = LineBotApi(os.getenv('LINE_CHANNEL_TOKEN'))
        handler = WebhookHandler(os.getenv('LINE_CHANNEL_SECRET_KEY'))

        # get X-Line-Signature header value
        signature = request.headers['X-Line-Signature']

        body = request.get_data(as_text=True)
        event = json.loads(body)
        print(event)
        try:
            handler.handle(body, signature)
        except InvalidSignatureError:
            print(
                "Invalid signature. Please check your channel access token/channel secret.")
            abort(400)

        token = event['events'][0]['replyToken']
        if token == "00000000000000000000000000000000":
            pass
        else:
            line_bot_api.reply_message(token, TextSendMessage(
                text=event['events'][0]['message']['text']))
        return 'OK'
```

用任何語言都會看到回傳會有 200, 'OK'...回傳的成功訊息，在內部系統的部分在處理時要考慮到回傳時間的問題，一般來說如果回傳的時間大於 1 秒的話就有可能失效，或許有些朋友有測試過大於 1 秒也可以，但最好還是於時間內回覆哦！

> 以下圖片來自 https://engineering.linecorp.com/zh-hant/blog/line-device-10/

![https://engineering.linecorp.com/zh-hant/blog/line-device-10/](https://i.imgur.com/nrJl2XM.png)

接著在 api.py 加入下面兩段 code，新增一個`webhook`的路由

```python
from controller.message_api_controller import LineMessageApiWebhookController
api.add_resource(LineMessageApiWebhookController, '/webhook')
```

這邊可以使用`sls wsgi serve` + `ngrok`去搭配做測試

接著就部署啦

```
sls deploy
```

> 現在在接這種第三方的 API 時最好都使用 `https`，而使用 Serverless 的好處就是 AWS 在部署完之後會送你一個含有 SSL 的網址～

把網址貼到 `webhook URL` 上並在尾端加上 `/webhook`
![](https://i.imgur.com/uoiU96f.png)

測試結果如下
![](https://i.imgur.com/9wPNuma.png)

## 結論

這次整合了以前寫的 [Repo](https://github.com/louis70109/aws-line-wsgi-python)，加入了`.env`讓我在抓下來使用時也更方便，也整合成 Restful 格式讓之後有需要的人在看 code 時可以更容易理解了～

專案也會持續更新，更多詳情可以 follow 我的專案 [aws-python-line-api](https://github.com/louis70109/aws-python-line-api)。
