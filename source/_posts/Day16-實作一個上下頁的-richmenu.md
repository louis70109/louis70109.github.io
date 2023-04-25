---
title: Day16 - 實作一個上下頁的 richmenu
tags:
  - LINE
  - Richmenu
  - chatbot
categories: 2019鐵人賽
abbrlink: 2636963893
date: 2019-09-30 20:47:37
---

## 前言

看著很多人的機器人都有上下頁的功能就心癢癢，一直沒有實際去操作，雖然看起來好像不難，但身為一個肥宅就是只有懶，到了現在才把他實作出來(羞)，以下就帶大家來做嚕！

## 事前準備

首先我做了兩個超級陽春的圖片，來展示一下上下一頁的樣子(超弱)
(1)
![](https://i.imgur.com/Rs5jnJ8.png)

---

(2)
![](https://i.imgur.com/97XG3mv.png)

## 實作

我把上一篇的 richmenu_api_controller.py 的 create 部分改編了一下，
增加了讀 `state` Query string 的一個參數，用`up`&`down`來簡單判斷上傳的內容要傳什麼

```python
if usage == 'create':
            rich_menu_to_create = None
            if request.args.get('state') == 'up':
                rich_menu_to_create = RichMenu(
                    size=RichMenuSize(width=2500, height=843),
                    selected=False,
                    name="Nice richmenu",  # display name
                    chat_bar_text="我是第一頁",
                    areas=[RichMenuArea(  # 這邊是陣列的格式，可以動態設定自己要的區域想要有什麼功能
                        bounds=RichMenuBounds(
                            x=0, y=0, width=2500, height=843),
                        action=MessageAction(
                            label='message',
                            text='下一頁'
                        ))]
                )
            elif request.args.get('state') == 'down':
                rich_menu_to_create = RichMenu(
                    size=RichMenuSize(width=2500, height=843),
                    selected=False,
                    name="Nice richmenu",  # display name
                    chat_bar_text="我是第二頁",
                    areas=[RichMenuArea(
                        bounds=RichMenuBounds(
                            x=0, y=0, width=2500, height=843),
                        action=MessageAction(
                            label='message',
                            text='上一頁'
                        ))]
                )
            else:
                rich_menu_to_create = RichMenu(
                    size=RichMenuSize(width=2500, height=843),
                    selected=False,
                    name="Nice richmenu",  # display name
                    chat_bar_text="我是測試使用",
                    areas=[RichMenuArea(  # 這邊是陣列的格式，可以動態設定自己要的區域想要有什麼功能
                        bounds=RichMenuBounds(
                            x=0, y=0, width=2500, height=843),
                        action=URIAction(label='Go to line.me', uri='https://line.me'))]
                )
            rich_menu_id = self.line_bot_api.create_rich_menu(
                rich_menu=rich_menu_to_create)
            print(rich_menu_id)
            return {'id': rich_menu_id}, 200
```

接著回到 `message_api_controller.py` 把前幾篇的 reply SDK code 先註解掉，並加入以下的 code

```python
message = event['events'][0]['message']['text']
if message == "上一頁" or message == "下一頁":
    try:
        rich_menu_id = self.line_bot_api.get_rich_menu_id_of_user(id)
    except:
        # link default rich menu
        self.line_bot_api.link_rich_menu_to_user(id, "richmenu-269cc28b8e8497d76c2df062b274a2ce")

    if rich_menu_id == "richmenu-269cc28b8e8497d76c2df062b274a2ce":
        self.line_bot_api.link_rich_menu_to_user(id, "richmenu-e31be74ad7e577b4752ab70c9c2a3fba")
    else:
        self.line_bot_api.link_rich_menu_to_user(id, "richmenu-269cc28b8e8497d76c2df062b274a2ce")
else:
    self.line_bot_api.reply_message(token, TextSendMessage(text=message))
```

這邊簡單判斷讀取使用者回應來進入控制的程式碼，透過`get_rich_menu_id_of_user`來抓取當前使用者的 rich menu，但因為他是會返回 Error response，所以這邊就使用`try` `except`來包
except 部分就是透過`link_rich_menu_to_user`來設定當前使用者為第一張圖片的 `richmenu id`，下面的判斷式就是讓他互換成對應的 rich menu id 來換頁。

> Richmenu 那邊事實上是要用 `postback`，因為要 demo 的關係我就弄成一般的文字格式，因為這個上下頁字串的理論上是不該讓使用者看到的，只要用圖片來引導使用者就好。

## Demo

![](https://i.imgur.com/QL3m90U.png)
![](https://i.imgur.com/DhBRsyT.png)

## 結論

透過這次練習大概把 LINE SDK 玩得差不多了(`message api` & `richmenu api`)，寫到了今天真的是苦讀 LINE 的文件啊，都要以防萬一我這狗眼沒有看錯而寫出錯誤的程式碼 XD，到這打完收工，繼續期待下一篇～
