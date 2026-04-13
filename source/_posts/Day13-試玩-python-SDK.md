---
title: Day13 - 試玩 python SDK
tags:
  - python
  - LINE SDK
categories: 2019鐵人賽
abbrlink: 4205642863
date: 2019-09-27 20:41:31
---

## 前言

以前從花落落的文件中找到一個方法，像是使用 push message
![](https://i.imgur.com/ZZVg7mI.png)
我都會笨笨的 call API 的方法去執行功能，殊不知 SDK 早就包好了，然後邊做邊罵自己為什麼要解這些 JSON (拍桌)
到了現在比較會看文件，才知道原來以前是自己雷自己 (捶心肝)...接下來就試玩幾個我覺得常會用到的 method 好了不廢話了，來簡單介紹一下一些常用的方法 😎

## get_profile

回傳使用者的個人狀態，可以透過每次的 reply 去拿到使用者的資訊，一般使用的話都話把它存下來，等之後有介接其他服務時方便使用 userId 去判斷使用者。

```python
profile = line_bot_api.get_profile(event['events'][0]['source']['userId'])

try:
    with Database() as db, db.connect() as conn, conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
        cur.execute(
            f"INSERT INTO users(id, name, picture) VALUES ('{id}', '{name}', '{picture}')")
except:
    pass # 這邊簡單處理相同 id 的問題(id我有設 Private key 哦！)
state = f"Hello 👉 `{profile.display_name}` 👈"
line_bot_api.reply_message(token, [
  TextSendMessage(text=state),
  ImageSendMessage(original_content_url=profile.picture_url, preview_image_url=profile.picture_url)
  ])
```

這邊搭配 `ImageSendMessage` 來幫忙發送圖片，他主要是透過 original_content_url 以及 preview_image_url 這兩個參數來幫忙轉成圖片

- original 就是讓使用者看到的圖片
- preview 在還沒載入時的樣子

## push_message

既然都取到使用者的 id 了，下一步就是推訊息給使用者啦!

建立一個 GET 的路由在 /webhook 上，收到 query string 的 msg 的值並找到所有使用者的 id 並逐一推送訊息。

```python
line_bot_api = LineBotApi(os.getenv('LINE_CHANNEL_TOKEN'))
handler = WebhookHandler(os.getenv('LINE_CHANNEL_SECRET_KEY'))

def get(self):
    msg = request.args.get('msg')
    with Database() as db, db.connect() as conn, conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
        cur.execute("SELECT * FROM users")
        fetch = cur.fetchall()
    for user in fetch:
        self.line_bot_api.push_message(
            user['id'], TextSendMessage(text=msg))
    return {'message': msg}, 200
```

![](https://i.imgur.com/MHfYmlZ.png)

---

![](https://i.imgur.com/x7fgvhY.png)

## Reply Mode

### LocationSendMessage

這邊直接拿 SDK 的範例來用，若是有在做商家功能的機器人可以使用這個方式讓使用者接收到商家訊息～

```python
self.line_bot_api.reply_message(token, LocationSendMessage(
    title='my location',
    address='Tokyo',
    latitude=35.65910807942215,
    longitude=139.70372892916203
))
```

### StickerSendMessage

這個方法可以搭配使用，讓整個回應看起來跟真實吧！

> 不知道清單能用什麼可以[參考](https://developers.line.biz/media/messaging-api/sticker_list.pdf)，

```python
self.line_bot_api.reply_message(token, StickerSendMessage(package_id='1',sticker_id='1'))
```

### Button Template

```python
buttons_template_message = TemplateSendMessage(
    alt_text='Buttons template',
    template=ButtonsTemplate(
        thumbnail_image_url=f'{picture}.jpg',
        title='Menu',
        text='Please select',
        actions=[
            PostbackAction(
                label='postback',
                display_text='postback text',
                data='action=buy&itemid=1'
            ),
            MessageAction(
                label='message',
                text='message text'
            ),
            URIAction(
                label='uri',
                uri='http://example.com/'
            )
        ]
    )
)
self.line_bot_api.reply_message(token, buttons_template_message)
```

![](https://i.imgur.com/T30NNHt.png)

## 結論

簡單玩了幾個 API，大概就這幾個比較常搭配著使用，用過之後才知道其實有好多 API 我都還不是很清楚用法 🤣
而 LINE 最近更新了他們文件的功能，多了一個`Try`的按鈕提供使用者可以線上直接測 API，只是像是 push messages 這個就剛好沒有 😓，但至少有很多 API 不用通靈去測試，直接拿著 Token 在網頁上測試嚕！
[Doc Sample](https://developers.line.biz/en/reference/messaging-api/?fbclid=IwAR3gExZwTJjXUudorqkIo-cHVk9yoONen7hnDlh4okntWyveLBYHXzZWJ00#get-number-of-push-messages)
![](https://i.imgur.com/xfk13a3.png)

Code is [here](https://github.com/louis70109/aws-python-line-api/blob/master/controller/message_api_controller.py)

## 參考

[LINE develop page](https://developers.line.biz/en/reference/messaging-api/?fbclid=IwAR3gExZwTJjXUudorqkIo-cHVk9yoONen7hnDlh4okntWyveLBYHXzZWJ00#get-number-of-push-messages)
