---
title: Day15 - 串接 LINE Richmenu API
tags:
  - LINE
  - LINE SDK
  - Richmenu
categories: 2019鐵人賽
abbrlink: 2470435375
date: 2019-09-29 20:46:24
---

## 前言

之前我在使用時都是直接在 Postman 上直接打 API，本來是打算自己刻 接 Richmenu API 的，但剛剛看到[Python SDK](https://github.com/line/line-bot-sdk-python) 很佛心的也提供 Richmenu 相關的 SDK，如此一來就不用自己包一包了。

> 注意 Richmenu 圖片的方向是 由上到下、由左到右 哦！算位置記得別算錯ＸＤ

## 實作

### 設定座標

首先先使用 `create_rich_menu(self, rich_menu, timeout=None)`告訴 LINE 說你的 Richmenu 的基本設定是什麼，格式區域什麼個別要做什麼對應的事情，

Creates a rich menu. You must upload a rich menu image and link the rich menu to a user for the rich menu to be displayed. You can create up to 10 rich menus for one bot.

https://developers.line.biz/en/reference/messaging-api/#create-rich-menu

```python
if usage == 'create':
    rich_menu_to_create = RichMenu(
        size=RichMenuSize(width=2500, height=843),
        selected=False,
        name="Nice richmenu",  # display name
        chat_bar_text="我是測試使用",
        areas=[RichMenuArea(  # 這邊是陣列的格式，可以動態設定自己要的區域想要有什麼功能
            bounds=RichMenuBounds(x=0, y=0, width=2500, height=843),
            action=URIAction(label='Go to line.me', uri='https://line.me'))]
    )
    rich_menu_id = self.line_bot_api.create_rich_menu(
        rich_menu=rich_menu_to_create)
    print(rich_menu_id)
    return {'id': rich_menu_id}, 200
```

## set_rich_menu_image(self, rich_menu_id, content_type, content, timeout=None)

上面設定完圖片裡每個座標區間要幹嘛了，接著就可以自己弄圖片或是下載官網提供的[圖片](https://developers.line.biz/media/messaging-api/rich-menu/controller-rich-menu-image-e1734c7d.jpg)

### MAC 用戶的小技巧

這邊教大家一個小技巧，可以點選想使用的照片，在預覽程式裡的選擇工具->調整大小
![](https://i.imgur.com/OqsDU20.jpg)
接著看到這畫面，把依比例縮放的勾勾取消，然後把長寬調到對應的大小後就完成圖片大小的設定嚕！
![](https://i.imgur.com/OH1tYUl.png)

https://developers.line.biz/en/reference/messaging-api/#upload-rich-menu-image

![](https://i.imgur.com/iA2xMJd.png)

```
elif usage == 'upload':
    file = request.files['the_file'].read()
    rich_menu_id = request.form['richmenu_id']
    content_type = "image/png"
    try:
        self.line_bot_api.set_rich_menu_image(
            rich_menu_id, content_type, file)
    except Exception as e:
        print("===Upload Exception===")
        raise BadRequest(e)
    return {'result': 'upload ok'}, 200
```

## set_default_rich_menu(self, rich_menu_id, timeout=None)

設定完了之後要幹嘛？就是要把他設定`default`啦！
不囉唆， show you the code.

> Sets the default rich menu.
> https://developers.line.biz/en/reference/messaging-api/#set-default-rich-menu

```
elif usage == 'set':
    rich_menu_id = request.form['richmenu_id']
    try:
        self.line_bot_api.set_default_rich_menu(rich_menu_id)
    except:
        raise BadRequest("Maybe your richmenu id error.")
    return {'result': 'set default ok!'}, 200
```

## get_default_rich_menu(self, timeout=None)

糟糕，我好像瘋狂建立卻不知道有幾組？用這個就對了！

> Gets the ID of the default rich menu set with the Messaging API.
> https://developers.line.biz/en/reference/messaging-api/#get-default-rich-menu-id

```
elif usage == 'get':
    rich_menu_list = self.line_bot_api.get_rich_menu_list()
    total = []
    for rich_menu in rich_menu_list:
        total.append(rich_menu.rich_menu_id)
    return {'result': total}, 200
```

## delete_rich_menu(rich_menu_id)

不行，我弄的座標什麼全錯怎麼辦？有時候上傳的圖片可能不是自己想的那樣？，透過這個方法來刪掉它

> Deletes a rich menu.
> https://developers.line.biz/en/reference/messaging-api/#delete-rich-menu

```
elif usage == 'delete':
    rich_menu_id = request.form['richmenu_id']
    try:
        self.line_bot_api.delete_rich_menu(rich_menu_id)
    except:
        raise BadRequest("Maybe your richmenu id error.")
    return {'result': f'{rich_menu_id} is delete!'}, 200
```

## 結論

我都把 `raise` 打成 `rails` (大誤)，LINE 幫忙做的 SDK 真的是好用，透過這次練習我也多學了好多不一樣的用法，順便把自己的腦袋也整理一下 😃，程式碼同步在這邊哦 [URL](https://github.com/louis70109/aws-python-line-api/blob/master/controller/richmenu_api_controller.py)。
