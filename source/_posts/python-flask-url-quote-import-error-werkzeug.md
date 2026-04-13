---
title: '處理 Python 中的 ImportError: cannot import name ''url_quote'' from ''werkzeug.urls'
tags:
  - Python
  - Flask
categories: Python
date: 2023-11-20 12:22:49
---


![](https://nijialin.com/images/common.jpeg)

# 前言

近期總算有空寫一些 side project，當然同時也會來 maintain 有在使用的專案，但因為過去都使用 Flask(近期都 FastAPI)，有些Code年久失修，或是有升級版本，都會造成 Cloud Run 上的佈署失敗，以下就提供解法給大家。

<!-- more -->

# 介紹

今天再翻新之前寫的 code，過去是使用 flask 撰寫 [GitHub Link](https://github.com/louis70109/line-bot-gitbub-actions-receiver)

因為本來只想說增加個 [LINE Bot 的判斷式](https://github.com/louis70109/line-bot-gitbub-actions-receiver/blob/master/controller/line_controller.py#L106)，結果發現 log 一直出現`"ImportError: cannot import name 'url_quote' from 'werkzeug.urls'"`

經過了搜尋之後發現可能是 Werkzeug 可能有升版本造成的，近期似乎升到 3.x.x，但由於我使用的 Flask 框架只吃到 2.2.x 版本，因此只要把以下兩個版本[鎖住在 requirements.txt](https://github.com/louis70109/line-bot-gitbub-actions-receiver/blob/master/requirements.txt#L9) 就沒問題囉！

```
Flask==2.2.2
Werkzeug==2.2.2
```

> 參考 [stack overflow](https://stackoverflow.com/questions/77213053/why-did-flask-start-failing-with-importerror-cannot-import-name-url-quote-fr)

# 結論

大家在做完 side project 時可以使用 `pip freeze > requirements.txt` 把版本鎖起來喔！這樣才會避免出現像我一樣的問題 😆