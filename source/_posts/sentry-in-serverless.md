---
title: 使用 Sentry 收集錯誤並將訊息送至 Slack
tags:
  - Sentry
  - Serverless
categories: 應用
abbrlink: 3673111655
date: 2019-11-12 17:50:13
---

# 前言

大家好，我是 [Chatbot TW](https://www.facebook.com/groups/chatbot.tw/) 的 NiJia

當產品開發完上線後難免會遇到可能是邏輯上的 Bug、例外錯誤或是想記錄使用上的錯誤，當沒有工具時都只能等錯誤出來時乖乖的去翻 Log 找問題，對於每次出錯要 Debug 的我就覺得很困擾 😭。

公司強者寫 APP 的同事他們都很開心的在使用 Crashlytics 幫他們將 APP 出問題時將錯誤訊息丟上去，看了實在時羨慕，但那們寫 Web 的朋友要怎麼辦！

最近就發現了`Sentry`這個玩意兒(**應該是有段時間的產品了**)，支援了幾乎支持現在市場上主流的各種框架以及語言，且串接上也都很簡單就能實現，文件也都清楚解釋每個 API 的功能如何使用，以下就來介紹如何使用它吧 😎
![](https://i.imgur.com/xVHa6qg.png)

> 這邊顯示較常用的語言，還有支援很多其他種類的框架及語言

## 說明

- 文章的範例專案在此 -> https://github.com/louis70109/aws-sentry-flask-example
- 本篇是使用 flask 將 Sentry 透過 serverless 部署至 AWS 上 🗿

# 如何使用

首先先到 https://sentry.io/welcome/ `Get start`

![](https://i.imgur.com/LRIVYDH.jpg)

---

這邊可以整合了`GitHub`或者`Azure DevOps`兩種 OAuth 的登入方式
![](https://i.imgur.com/eIYugOF.png)

---

接著就照著步驟來囉！
![](https://i.imgur.com/5EDwA0N.png)

---

選擇自己所使用的語言，這邊我使用 Flask(python) 框架來實作
![](https://i.imgur.com/piHNxXB.png)

---

接著官方會有個簡單的文件告訴你要如何實作這塊，這邊就先使用`pip`在本地安裝套件

```bash
pip install --upgrade "sentry-sdk[flask]==0.13.2"
```

> 若是使用雲端服務的話需要將`sentry-sdk[flask]==0.13.2`放入 requirements.txt 中

將以下 init code 放入 api.py 裡，在 `app = Flask(__name__)` 之前

> 這邊我將 Sentry 的 DSN 放入 .env 裡，若有參考這部分的朋友需要注意環境變數的地方喔！

```python
import sentry_sdk
from sentry_sdk.integrations.flask import FlaskIntegration

sentry_sdk.init(
    dsn=os.environ.get('SENTRY_DSN'),
    integrations=[FlaskIntegration()]
)
```

![](https://i.imgur.com/u9WJkZL.png)

---

接著就開始丟錯誤上去看看狀態，我的專案上是串著 LINE Bot，功能只是當個應聲蟲，**在這情況下只需要丟個貼圖給它就會出錯**。

當錯誤丟出來之後原本監聽的紅色燈號就會打勾囉 ✅

> Sentry 預設都會寄信通知，所以若有錯誤記得看信箱哦！

![](https://i.imgur.com/JXfV97e.png)

---

點進去後就可以很清楚的看到程式是錯在第幾行，寫到這有種莫名的感動，平常都是在 LOG 海裡找看看到底報錯在哪邊，終於有個地方能幫我接下來了 🎉
![](https://i.imgur.com/JvVeSdd.png)

到這邊基本串接已經完成了，但身為免費導向的工程師怎麼能讓 5000/月 限制我！接下來就要去過濾一下來的錯誤內容，若不是系統造成的錯誤就不上傳。

我選擇判斷 Log 達到`Waring`或是`Internal`就回報，並照著官方的指示新增以下內容:

- [before_send](https://docs.sentry.io/platforms/python/#filter-events--custom-logic)
- [logging](https://docs.sentry.io/platforms/python/logging/)

```python=
import sentry_sdk
from sentry_sdk.integrations.flask import FlaskIntegration
+ import logging
+ from http.client import HTTPException
+ from sentry_sdk.integrations.logging import LoggingIntegration


+ def strip_sensitive_data(event, hint):
+     if "exc_info" in hint:
+         instance = hint['exc_info'][1]
+         if isinstance(instance, HTTPException) and instance.code < 500:
+             return None
+     return event


+ sentry_logging = LoggingIntegration(
+     level=logging.INFO,
+     event_level=logging.WARNING
+ )

sentry_sdk.init(
    dsn=os.environ.get('SENTRY_DSN'),
+    before_send=strip_sensitive_data,
+    integrations=[FlaskIntegration(), sentry_logging]
)
```

- `strip_sensitive_data`: 過濾來自 Http 的 Exception 錯誤碼是否大於`500`，否則不回傳。
- `sentry_logging`: 使用 SDK 的 `LoggingIntegration` 來定義 log 回傳事件時的層級到哪層才上傳錯誤訊息，這邊我設定`Waring`等級，並加入到 init 的 `integrations` 裡。

此時不管你打上都會將訊息送上 Sentry：

```python
logging.waring("i am waring")
logging.error("i am error")
```

或者是

```python
raise InternalServerError("Hi Error")
```

> 或者！！自己手殘讓程式崩潰也會送通知

到這基本上已經完成串接完成並能過濾錯誤訊息，接下來則為將服務串至 Slack 上。

# Slack bot 串接

首先來到`Settings`按下`Integrations`會看到以下畫面，並安裝一下`Slack`
![](https://i.imgur.com/Sbib4sv.png)

---

接著就要跟 Slack 連動囉
![](https://i.imgur.com/6wHC4Ci.png)

---

連動完成後再按下`configure`來設定以下內容
![](https://i.imgur.com/dSOV9KP.png)

---

到了`Alerts`頁面後就開始設定以下內容囉，這部分參考[官方文件](https://docs.sentry.io/workflow/integrations/global-integrations/#slack)
![](https://i.imgur.com/qd05OJO.png)

---

可以指定透過哪個`group`去傳送至哪個`tag`，我就直接送到預設的`#general`
![](https://i.imgur.com/22Z3pV9.png)

---

測試就直接送出貼圖來讓 bot 報錯，結果就收到`key`的錯誤啦～
![](https://i.imgur.com/FAvjMwy.png)

# 結論

最後就能透過`sls deploy`將專案部署到 AWS 上，透過這次的紀錄對 Sentry SDK 運作在框架上的問題更加了解，同時也找到了一個不僅可以紀錄錯誤還能通知我錯誤訊息的地方，可以在第一時間直接進去分析 log，若完成了可以直接在 slack 上按`Reslove`來完成這個 issue。

本來有在考慮要串接`LINE Notify`，不過看著 Sentry 對 Slack 的整合比較好，也就放棄了這個念頭了 🤣，但串接哪個平台其實就看公司的需求，Sentry 一樣可以透過 webhook 將錯誤訊息傳至 Server。

此外它一樣可以整合`Github`、`GitLab`、`Azure DevOps`...等等，若錯誤處理好的話可以讓 Sentry 幫你送 Issue 上去，不僅整個超炫砲 😎，若是 open source 的專案也可以大家一起去修這個問題，真的是一舉兩得啊！！！
