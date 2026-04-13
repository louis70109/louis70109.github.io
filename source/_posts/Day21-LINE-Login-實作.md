---
title: Day21 - LINE Login 實作
tags:
  - LINE
  - LINE Login
  - S3
categories: 2019鐵人賽
abbrlink: 4163822350
date: 2019-10-05 20:59:50
---

## 前言

現在有規模的平台提供商基本上都會提供 Single Sign On (SSO)的登入機制，藉由他們的平台讓一般小網站可以讓使用者免密碼登入，雖然有很多種 Oauth2 的套件，不過我還是喜歡自己打 🤣，下面就開始嚕！

## 實作

在`views/`建立一個`line_login_auth.html`，填入以下內容，主要是實作一個按鈕並透過 javascript 來互叫 api 並導向到 LINE 頁面

```html
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>LINE Login</title>
  </head>
  <body>
    <button class="auth" onclick="auth()">LINE LOGIN</button>
  </body>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.js"></script>
  <script>
    function auth() {
      $.ajax({
        url: 'https://YOUR_SERVERLESS_DOMAIN.amazonaws.com/dev/line/auth',
        method: 'POST',
        success: function(data) {
          window.location.replace(data.result);
        },
      });
    }
  </script>
</html>
```

接著我們在`.env`加入 LINE Login 的環境變數並輸入對應的參數

```yaml
LINE_LOGIN_CLIENT_ID=
LINE_LOGIN_SECRET=
LINE_LOGIN_URI=https://YOUR_SERVERLESS_DOMAIN.amazonaws.com/dev/line/auth
```

最後就是我們最重要的部分了，實作 GET a& POST 的 api，這邊我先從 POST 講起，這邊主要是把環境變數組在網址中回傳給前端，這邊需要注意的是`state`他是在回傳回來的 JWT 需要解碼時所使用的，這邊我簡單打個字串，然而實際上會隨機產個變數，確保解碼的安全。

GET 則是負責處理從 LINE 回來的參數們，這邊我只用回傳回來的`state`把`id_token`解開，拿到裡面的使用者的參數，後續可以參照應用把資訊存下來，放入 session 並告知前端已登入。

```python
from flask import request
from flask_restful import Resource
import requests
import webbrowser
import os
import jwt
import json


class LineLoginController(Resource):
	def get(self):
		r = requests.post(
			"https://api.line.me/oauth2/v2.1/token",
			data={
				"grant_type": "authorization_code",
				"code": request.args.get('CODE'),
				"redirect_uri": os.environ.get('LINE_LOGIN_URI'),
				"client_id": os.environ.get('LINE_LOGIN_CLIENT_ID'),
				"client_secret": os.environ.get('LINE_LOGIN_SECRET'),
			}, headers={"Content-Type": "application/x-www-form-urlencoded"})
		payload = json.loads(r.text)
		print(payload)
		token = payload.get("id_token")
		if token is None:
			return {'result': payload['error_description']}, 400

		state = request.args.get('state')
		token = token.encode()
		dt = jwt.decode(token, state, None, algorithms=['HS256'])
		if dt:
			return {'result': dt}, 200

	def post(self):
		r_uri = os.environ.get("LINE_LOGIN_URI")
		client = os.environ.get("LINE_LOGIN_CLIENT_ID")
		state = "nostate" # it will be random value
		uri = f"https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id={client}&redirect_uri={r_uri}&scope=profile%20openid%20email&state={state}"
		return {'result': uri}
```

JWT 解開的參數如下，`sub`就是 LINE 的唯一值 ID，一般拿到這個就可以知道是來自 LINE 的使用者了。

```json
{
  "result": {
    "iss": "https://access.line.me",
    "sub": "Ud6ab866a67xxxxxxxxb12b0baffb8ac",
    "aud": "1622939248",
    "exp": 1569925548,
    "iat": 1569921948,
    "amr": ["linesso"],
    "name": "NiJia Lin",
    "picture": "https://profile.line-scdn.net/0hKvTocMuLFFlpFj9HpKdrDlVTGjxxxxxxxxx1YHACMOPRtEHmkWJVIKUyUJNkQWGT0X",
    "email": "loxxxxx09@gmail.com"
  }
}
```

最後別忘了要在`api.py`加入路由才會被導出去ㄛ

```python
from controller.line_login_controller import LineLoginController
api.add_resource(LineLoginController, '/line/auth')
```

## 結論

在實作的時候不知道為什麼一直不能讓 python 去幫我把用戶導去 LINE 認證的頁面，我記得之前寫 Ruby 可以啊(?)，最後只好讓前端去幫我把使用者導出去，這邊就帶大家做到這嚕！
