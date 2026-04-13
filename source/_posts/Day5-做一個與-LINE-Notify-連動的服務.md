---
title: Day5 - 做一個與 LINE Notify 連動的服務
tags:
  - LINE Notify
  - python
categories: 2019鐵人賽
abbrlink: 1338246174
date: 2019-09-20 15:46:15
---

## 建立 LINE Notify 服務

第一步先到 [LINE Notify](https://notify-bot.line.me/zh_TW/) 管力登入服務去建立一個服務
![](https://i.imgur.com/he0csJI.png)
接著按下`登入服務`
![](https://i.imgur.com/iZmktaA.png)
把該填的填一填，要注意的是 Callback Url 這邊先暫時先打 localhost:5500，等頁面上傳後再回來改 domain
![](https://i.imgur.com/5zzxTcj.png)

---

![](https://i.imgur.com/VfaWKEs.png)

建立完成之後就到剛剛填的信箱去收信點下網址並啟動服務
![](https://i.imgur.com/jmZSycQ.png)
這樣第一步就建立完成嚕！

## 動工

接著上次的透過上次的專案並使用 flask_restful 來改造成 Restful 格式的專案(後面開發會比較輕鬆)
因為我們會讓前端呼叫，CORS 設定成＊比較輕鬆，若是有要設定跨域問題的在這邊設定哦 👏
加入套件到 requirements.txt

```
flask==1.0.2
Flask-RESTful==0.3.6
Flask-Cors==3.0.6
requests==2.22.0
```

透過使用 flask_restful 幫忙轉發並管理路由
將 api.py 改為以下的 code

```python=
from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from controller.notify_controller import NotifyController

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*", "supports_credentials": True}})
api = Api(app)

api.add_resource(NotifyController, '/notify')

if __name__ == '__main__':
    app.run(debug=True)
```

這邊我使用 Postgresql，並在專案底下建立一個 lib/ 的資料夾，裡頭放著名為 db.py (這裡還是要記得建立 **init**.py 哦！)
這邊只簡單建立[ Context Manager ](https://blog.gtwang.org/programming/python-with-context-manager-tutorial/)讓連線可以被我呼叫。
db.py:

```python=
import psycopg2
import psycopg2.extras

class Database():
    conns = []
    def __enter__(self):
        return self

    def connect(self):
        conn = psycopg2.connect(
            database=PG_DB,
            user=PG_USER,
            password=PG_PWD,
            host=PG_HOST,
            port=PG_PORT
        )
        self.conns.append(conn)
        return conn

    def __exit__(self, type, value, traceback):
        for conn in self.conns:
            conn.close()
        self.conns.clear()
```

新增一下資料夾名為 controller，建立 **init**.py & notify_controller.py，這邊搭配 with 做資源管理器，
DB 部分則見黎一個 notify 表，然後一個 token 的欄位。

> 在這個 class 類別下方法只要輸入 `def get/post/put/patch/delete` 的函式就可以對應 CRUD 的功能了！

notify_controller.py code is:

```python=
from flask_restful import Resource, reqparse
import requests
import json
from lib.db import Database
import psycopg2.extras

class NotifyController(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('code', required=True, help='code can not be blank!')
        args = parser.parse_args()
        code = args['code']
        client = {'grant_type': 'authorization_code', 'code': code, 'redirect_uri': 'YOUR_REDIRECT_URI',
                  'client_id': 'YOUR_CLIENT_ID', 'client_secret': 'YOUR_CLIENT_SECRET'}
        r = requests.post(
            'https://notify-bot.line.me/oauth/token', data=client)
        req = json.loads(r.text)
        if req['status'] == 200:
            token = req['access_token']
            # Here is use PostgreSQL, you can change your love db
            with Database() as db:
                with db.connect() as conn:
                    with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
                        cur.execute(
                            f"INSERT INTO notify(token) VALUES ('{token}')")
            return {'access_token': req['access_token']}, 200
        else:
            return {'message': r.text}, 200
```

以下這三個要設定成你的當時輸入的字串

- YOUR_REDIRECT_URI
- YOUR_CLIENT_ID
- YOUR_CLIENT_SECRET

> 若不清楚 Client_id & Client_secret 的話就回到 Notify 頁面並點選剛剛建立的服務就能看到 token 了

![](https://i.imgur.com/T0nJaGE.png)

建立一個 views/ 的資料夾，並建立兩個檔案

- notify_index.html
  > 這邊需要修改 `client_id` 以及 `redirect_uri`
  > 這個檔案主要功能是讓使用者有個可以按按鈕觸發的地方，當然這只是個範例，實際上線可能就會直接 call API 導向 LINE Notify 頁面等等

```htmlmixed=
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Link Notify</title>
  </head>
  <body>
    <button onclick="Auth();">點選這裡連結到LineNotify</button>

    <script>
      function Auth() {
        var URL = "https://notify-bot.line.me/oauth/authorize?";
        URL += "response_type=code";
        URL += "&client_id=YOUR_CLIENT_ID";
        URL += "&redirect_uri=YOUR_REDIRECT_URI";
        URL += "&scope=notify";
        URL += "&state=nostate";
        window.location.href = URL;
      }
    </script>
  </body>
</html>
```

- notify_confirm.html
  > 修改 ajax 裡的 url，將網址換成之前部署的網址，若忘了可以在部署一次 `sls deploy`
  > 當導回來的時候透過 ajax 來呼叫 serverless api 讓後端發 requests 給`https://notify-bot.line.me/oauth/token`來獲取`access_token`。

_因為這個路由有 CORS 的問題，若透過瀏覽器來的話會出錯，這邊則是讓後端去處理_

```htmlmixed=
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>message check</title>
  </head>
  <body>
    verify messate:
    <div class="message"></div>
  </body>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.js"></script>

  <script>
    var urlParams = new URLSearchParams(window.location.search);
    var notify_code = urlParams.get("code");
    var state = urlParams.get("state");
    $(function() {
      $.ajax({
        url: "https://SLS_URI.execute-api.us-east-2.amazonaws.com/dev/notify",
        type: "POST",
        dataType: "json",
        data: { code: notify_code },
        success: function(response) {
          console.log(response);
          $(".message").text(response["access_token"]);
        },
        error: function(xhr) {
          console.log(xhr);
          alert("Ajax request 發生錯誤");
        }
      });
    });
  </script>
</html>
```

接著就是測試程式碼是不是正常的，把這兩個檔案丟到 S3 上面
![](https://i.imgur.com/SYRxzA1.png)

---

![](https://i.imgur.com/N3olwJd.png)

把 object url 複製到 LINE Notify 上的 callback url 欄位，這樣就可以實機測試了 🤣
![](https://i.imgur.com/i6Y7dK2.png)

接著按下 index page 的按鈕應該就會看到連動成功(進資料庫應該也會被 insert 一筆)
![](https://i.imgur.com/lEP0AmZ.png)

到了這邊如果沒問題真的是恭喜你，我踩了好多坑 Orz

## 參考

[資源管理器](https://blog.gtwang.org/programming/python-with-context-manager-tutorial/)
[flask CORS](https://github.com/corydolphin/flask-cors)
[CORS](https://serverless.com/framework/docs/providers/aws/events/apigateway/#enabling-cors)
