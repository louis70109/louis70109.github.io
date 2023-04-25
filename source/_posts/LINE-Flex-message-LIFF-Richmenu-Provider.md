---
title: '【LINE API 的小眉角】feat. Flex message, LIFF, Richmenu, Provider'
tags:
  - LINE
  - LIFF
  - Flex message
  - Richmenu
  - Provider
categories: Chatbot
abbrlink: 3574514001
date: 2020-04-11 21:10:23
---

![birds](https://i.imgur.com/HHj7c5Kl.jpg)

# 前言

因為遇到了很多不算坑的坑(~~說啥呢？~~)，有些是文件沒有寫而有些可能是我沒有注意到的，但既然都知道了就乾脆記下來吧！

# LIFF reply 到底算不算收費？

> [LIFF SendMessage api](https://developers.line.biz/en/docs/liff/developing-liff-apps/#developing-a-liff-app)

字面上看起來很像 `Push Message` 的事件，但實際上是走 Flex Message，使用 Message api 的 Reply 功能來幫忙使用者發送條件引發 Bot 行為，並非是透過 Push api 發送讓 Bot 反應，這邊需要多注意喔！

```javascript
liff.sendMessages([
  {
    type: "text",
    text: "You've successfully sent a message! Hooray!",
  },
]);
```

<!-- more -->

> 但是現在 LIFF 還沒有 `postback` 的功能喔！😭

# Flex button 文字(text)欄位空值問題

flex 的 button text 的文字不能用 0 長度的字串，但可以用 `' '` 中間為空白鍵的字串去解決長度 0 的問題，否則會出現以上的錯誤:

```bash
Response Data -
  {
    "message": "A message (messages[0]) in the request body is invalid",
    "details": [
      {
        "message": "must be non-empty text",
        "property": "/contents/0/footer/contents/1/action/text"
      },
      ...
    ]
  }
```

# User id 的問題 - Provider

如下圖所示，左邊為我擁有的 provider，而右邊框框則為兩個不同 provider 下屬於我的 user id，只要在同一個 provider 下 user id 都會是固定的，無論用 Login 或 Message API。
![](https://i.imgur.com/gqRltSU.png)

---

![](https://i.imgur.com/8rXmRy7.png)

# Richmenu

## 座標計算

richmenu 的 x,y 是從左上(0, 0)算到右下(n, n)
限制:

- Image format: JPEG or PNG
- Image size (pixels): 2500x1686, 2500x843, 1200x810, 1200x405, 800x540, 800x270
- Max file size: 1 MB

> [參考](https://developers.line.biz/en/docs/messaging-api/using-rich-menus/#creating-a-rich-menu-using-the-messaging-api)

## 使用 link 的方式指定給特定使用者

➡️ python API - [連結特定使用者](https://github.com/line/line-bot-sdk-python/blob/master/linebot/api.py#L640)

若只需要連結特定使用者的話使用這個 api，我目前使用情境有兩個

- Bot 裡有多重身份需要依照角色不同而給不同的 richmenu
- 實作上下頁的功能，透過讓使用者按下特定位置時觸發更新成另一張圖片

```python
def link_rich_menu_to_user(self, user_id, rich_menu_id, timeout=None):
```

➡️ python API - [一次連結多個使用者](https://github.com/line/line-bot-sdk-python/blob/master/linebot/api.py#L661)

```python
def link_rich_menu_to_users(self, user_ids, rich_menu_id, timeout=None):
```

### 範例影片

![](https://i.imgur.com/nFA7A7p.gif)

## 設定 richmenu 為預設

若是使用 setDefault 的話需要上一頁再回來才會更動，因為 setDefault 的行為則是對當前 Bot 的所有使用者設定，如果想要馬上變化的話則是使用上述 link 的方式哦！

# [模擬 postback 在 LIFF 傳送隱藏資料給機器人](https://taichunmin.idv.tw/blog/2020-04-07-line-liff-send-hidden-data.html)

> 感謝`均民`提供與授權給我記錄在我部落格上 😀

為什麼要模擬呢？因為如同我一開始 `LIFF reply 到底算不算收費？`，LIFF 現在還沒有 `postback` 的 reply 功能，但有些事件我們不希望幫使用者打字去觸發 reply，但現在根本沒這功能那到底要怎辦呢？

這篇作者想到了一個`奇技淫巧`的方法，就是使用最小 size 的透明圖片(`png`)並藉由 liff.sendMessage 來發送圖片事件達到模擬 postback 狀態。

- [透明圖片](https://i.imgur.com/WN88L3I.png)

> 詳細內容參閱 [部落格](https://taichunmin.idv.tw/blog/2020-04-07-line-liff-send-hidden-data.html#yun-zuo-yuan-li)

# [輔助開發 LINE Flex 訊息的工具](https://taichunmin.idv.tw/blog/2020-04-06-line-devbot.html)

> 這部分一樣感謝`均民`提供

通常我們在開發 LINE bot 時如果需要一些比較華麗的顯示方式時，所用的設計工具不外乎是官方出的 [ Flex Message Simulator](https://developers.line.biz/flex-simulator/) 以及 [LINE Bot Designer](https://developers.line.biz/en/services/bot-designer/)，前者是在網頁上直接編輯使用，後者則是可以安裝桌面版編輯測試，相較於網頁版本後者使用上比較完整，而通常設計完之後就直接塞進去 code 來做測試。

但總要在測試時才知道 iOS 跟 Android 的樣子有差，這篇作者幫忙做了一隻機器人可以幫忙處理這件事，當開發完一部份之後，在電腦版的 LINE 貼上 json 後，才看兩種手機所呈現的樣子是什麼，而不用做完一個功能而各別打字或是按 richmenu，但這樣實在太不符合開發流程啦，當然是在電腦版貼上去直接看手機最快啦！

# 結論

開發那麼多的 LINE API 難免會遇到 spec 沒寫或是沒注意到的地方，趁最近有空把它記錄下來分享給大家知道，或許我現在遇到的問題也會是各位遇到的問題 😆

如果有任何遇到的一些小眉角也歡迎到[我的粉絲團](https://www.facebook.com/nijiatw)分享給我知道喔！
