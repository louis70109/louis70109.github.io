---
title: Day6 - 建立一個使用 Query string 來幫忙發送的 LINE Notify
tags:
  - LINE
  - Notify
  - python
categories: 2019鐵人賽
abbrlink: 2244661996
date: 2019-09-21 20:30:27
---

繼上一篇我們已經可以讓使用者註冊 Notify 並將 token 放入資料庫，接著就帶各位使用 query string 的方式讓你的 Notify 可以送訊息給所有註冊過的 Notify。

首先我們進入我們已經建立過的 controller/notify_controller.py，會看到 class 下有我們之前建立的 post method，這時我們就在前面加入 get method，並加入以下的 code，讓這個 class 看起來比較有順序(~~潔癖~~)

```python=
from flask import request

class NotifyController(Resource):

    def get(self):
            msg = request.args.get('msg')
            with Database() as db, db.connect() as conn:
                with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
                    cur.execute(
                        f"SELECT token FROM notify")
                    fetch = cur.fetchall()
            for f in fetch:
                headers = {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': f"Bearer {f['token']}"
                }
                payload = {'message': msg}

                r = requests.post(
                    'https://notify-api.line.me/api/notify', data=payload, headers=headers)
            return {'result': 'ok'}, 200

    def post(self):
        ...
```

這次使用的套件比上次多 import 一個 flask 底下的 request (注意沒有 s 哦)，這個主要是讓我們可以抓到網址問號後面接的參數，這邊我設定打 API 的人會打一個 msg 的參數。

接著就是使用進 DB 撈我們的 token 們，並用一個迴圈來跑

再來是設定 headers 以及 payload

headers 的部分參考 Notify 的文件，如下圖
![](https://i.imgur.com/B4bjvja.png)
我們需要設定 Content-Type 以及 Authorization，需要注意的是 Authorization 是使用 Bearer 格式([參考](https://blog.yorkxin.org/2013/09/30/oauth2-6-bearer-token.html))，他中間是有加`空白鍵`的，這邊很多朋友都會錯在這裡，千萬要記得檢查這邊！

接著是要送出去的東西是要用什麼送出，本篇只用 message 做範例，若需要使用到其他的功能，像是圖片、貼圖等等的可參考以下的圖片
![](https://i.imgur.com/I6617R6.png)

接著我們就可以使用`sls deploy`來部署我們的程式啦

等等！
這邊有個需要注意的地方是，照著這次的範例使用的話會需要用 docker 來幫忙跑編譯，因為 psycopg2-binary 這個套件如果不是在 Linux 的環境下會需要透過 docker 幫忙編譯完再丟過去
這部分需要在`serverless.yml`下填入參數

```
custom:
  pythonRequirements:
    dockerizePip: true
```

如此一來當前環境若不是 Linux 的話他就會使用 docker 來幫忙，記得 docker 要開哦 🙏

> 當然最簡單的方法就是把它直接抓下來放在專案中，只是這樣就會比較髒一點，可以從這邊抓 -> [參考](https://github.com/jkehler/awslambda-psycopg2)

> 這邊可以先在環境變數上加上`SLS_DEBUG=*` 接著在加上 sls deploy 後面加上`--verbose`可以看到 serverless 到底都在背地裡做了什麼事情 🤣

接著我們就使用 Postman 來幫我們送字串出去，參考下圖，當回傳 ok 就成功了 🎉
![](https://i.imgur.com/oXlBNeC.png)
你的 Notify 應該要回你了～
![](https://i.imgur.com/nihyJxX.png)

## 結論

這邊帶大家做一個簡單的應用，一般來說我覺得放在 query string 讓其他 API 來呼叫的時候帶參數來就可以直接用是很方便的，不用再特地自己寫方法去呼叫 LINE Notify 來幫我們送，反正 AWS Lambda 有一百萬次的請求不怕 🤣
