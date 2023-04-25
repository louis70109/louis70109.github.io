---
title: 【LINE API】- 使用 Icon Switch 讓你的機器人同時有多個角色！ feat. Python
tags:
  - LINE
  - Icon Switch
  - Python
  - AWS
  - Serverless
categories: Chatbot
abbrlink: 1756248633
date: 2020-03-28 11:16:47
---

最近 LINE 釋出了一個我很喜歡的功能 - [Icon Switch](https://developers.line.biz/zh-hant/reference/messaging-api/#icon-nickname-switch)🎚，從字面上的意思就是可以切換機器人的 Icon (名稱以及大頭貼)，過往開發者在使用時都只能較死板的使用同一個頭像或暱稱來回應使用者，而現在只要使用這個這個功能就可以很輕易地切換你想要的大頭貼以及暱稱了 😇

> 據可靠消息指出這以前是需要收費的功能，而現在則是免費推出來給大家使用，讓大家可以有更多的彈性去開發新功能～

![](https://i.imgur.com/TbtdNFjl.png)

<!-- more -->

# 差在哪邊

⭐️ 用 python 做了一個簡單範例程式歡迎大家試玩: https://github.com/louis70109/line-icon-switch-python

原本我們要讓機器人輸出文字時會送這樣的 json:

```json
{
  "type": "text",
  "text": "Hello, world"
}
```

而 Icon Switch 這個功能看起來似乎要設定很多東西，但他其實只要...

```json
{
  "type": "text",
  "text": "Hello, I am Cony!!",
  "sender": {
    "name": "Cony",
    "iconUrl": "https://line.me/conyprof"
  }
}
```

有發現哪邊不一樣嗎？就是指在這個 json 裡面加入 `sender.name` 以及 `sender.iconUrl` 就可以把 大頭貼以及名字換掉啦 🎉

官方文件也說明的很清楚，有興趣的朋友可以[參考官方網站](https://developers.line.biz/zh-hant/reference/messaging-api/#icon-nickname-switch)
![](https://i.imgur.com/0o5tiWJ.png)

> 名稱最多只能 20 個字
> 網址必須要是 Https

# Python 如何實現？

一般機器人的回應我們都會使用`TextSendMessage`來幫我們產生出對應的輸出內容(JSON)

```python
from linebot.models import TextSendMessage

text = TextSendMessage(text="小編去哪兒了呢？")
```

而照著先前的 JSON 範例我們就需要先 `import Sender`，並且在`TextSendMessage`第二個參數地方加上`sender`的參數，範例如下：

```python
from linebot.models import (TextSendMessage, Sender)

text = TextSendMessage(
  text="叫你老闆出來啦",
  sender=Sender(
    name="Boss",
    icon_url="https://{YOUR_BOSS_AVATAR}.jpg")
)
```

如此一來就可以達到切換的功能囉！

# 結論

在 Icon Switch 這個新功能上很適合做一些對話流程上`分類`以及`角色切換`的用途，若是再進階一點甚至貼 Google analytics 標籤來做分析，了解在這個角色下使用者的回應狀態為何，同一時間在分眾的同時還能讓使用者覺得很特別，達到一個雙贏的 communication！😁，諸多應用就留給大家開發發想囉！
