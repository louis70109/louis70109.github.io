---
title: Day22 - 最常用的搭配 - 使用 Login + Message API 讓使用者在掃描加入好友時就綁定帳號
tags:
  - LINE
  - LINE Login
  - Message api
  - chatbot
categories: 2019鐵人賽
abbrlink: 4225183620
date: 2019-10-06 21:01:02
---

## 前言

在第 Day 13 Python SDK 試玩的時候使用過 get_profile，當時使用時就是在每次訊息來的時候才去 SQL 儲存使用者資訊，若只是單純想要使用者資訊的話這樣用好像有點多餘 😓，以下就帶各位簡單的實作。

## 實作

我們要將上篇的前端頁面(line_login_auth.html)改造一下

```html
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>LINE Login</title>
  </head>
  <body></body>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.js"></script>
  <script>
    $.ajax({
      url: "https://YOUR_SLS_DOMAIN.us-east-1.amazonaws.com/dev/line/auth",
      method: "POST",
      success: function(data) {
        window.location.replace(data.result);
      }
    });
  </script>
</html>
```

這邊我將 button 的 onclick 事件以及 button 本身移除掉，目的是要讓使用者一到這個頁面之後就直接透過 AJAX call api

到了這裡應該有感應到什麼了吧！接著就是把這個 html 檔的 S3 路徑網址使用 QR code 包起來，讓他看起來像是 LINE bot 的 QR code

到了這邊基本上已經快完成了，參考 LINE 的[好友說明](https://developers.line.biz/en/docs/messaging-api/using-line-url-scheme/?fbclid=IwAR25G73QmKIGm1l7kPNFzDIpMwBKQRQVxPP8ZpPzp3p-FSES2fnWcVCue_c)或下圖
![](https://i.imgur.com/fEEzOsy.png)

接著到機器人的開發者頁面，並且往下滑會看到自己機器人的 QR code 以及 Bot 的 ID，把他複製下來並製作機器人的加好友網址
![](https://i.imgur.com/Mn3RG26.png)

像是這樣子

```
https://line.me/R/@1234
```

接著到 `controller/line_login_controller.py`的`def get(self)`最後一行，原本我們這邊做的是回傳 JSON

```python
if dt:
			return {'result': dt}, 200
```

改用

```python
from flask import redirect
if dt:
 		return redirect("https://line.me/R/ti/p//@127ojvgz", code=302)
```

如此一來在登入驗證完之後就會把使用者導向到加好友的頁面，在手機上若已經加過好友則會直接導到機器人對話窗上，如此一來就可以讓使用者在加入好友的同時也綁定完帳號，在未來使用的時候 api 這邊也比較好控管使用者的權限問題。

## 結論

像是我自己做的健身記錄機器人，就是以這個方法下去實作，有聽過一些朋友跟我反應這樣的方法多此一舉，但我認為若是有網頁的話也是套用 LINE SSO 來實作，就可以讓兩個入口去統一，在狀態流上就能比較好控制了。
![](https://i.imgur.com/8fKlsAt.jpg)
