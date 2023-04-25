---
title: 【翻譯】透過 Rich Menu Switch Action 快速地切換 LINE 的個人化的 Rich Menu
tags:
  - LINE
  - Richmenu
categories: 翻譯
date: 2021-06-29 10:14:14
---


<style>
  section.compact {
    font-size: 150%  
  }
  img[alt~="center"] {
    display: block;
    margin: 0 auto;
  }
</style>

![](https://nijialin.com/images/2021/switch-richmenu/1.jpeg)

> 翻譯原文網址：https://medium.com/linedevth/richmenu-swich-action-ba3aa0a9f80a

相信有在使用 LINE 官方帳號(Official Account)的朋友，基本上都會知道 Rich Menu 可以有效幫助並引導使用者來使用服務中的主要內容。其中要使用到 Rich Menu 非常容易，只需使用工具([Official Account Manager](https://manager.line.biz/))或撰寫程式即可完成。

在本篇中，將會透過撰寫程式來建立 Rich Menu，而撰寫的優點則是讓使用者可以自行切換 Rich Menu，例如：

<!-- more -->

![](https://nijialin.com/images/2021/switch-richmenu/2.gif)

從上圖可以看出，當前的 Rich Menu 切換延遲許多，因為後面實際執行了許多步驟。

![](https://nijialin.com/images/2021/switch-richmenu/3.png)

1. 使用者按下 Rich Menu 後透過訊息或 Postback 從聊天室向 LINE Server 發送操作請求。
2. LINE Server 會將 Webhook 事件轉發到我們的 Bot 應用程式中。
3. Boy 應用程式處理來自 Webhook 事件的 Rich Menu 切換訊號，並將切換請求發送回 LINE Server。
4. LINE Server 處理完請求後並更新使用者的 Rich Menu。

> 注意：從切換 Rich Menu 到使用者看到之前，必須有 4 個請求需要處理，當然請求越多，延遲時間也會跟著越高。

---

# 了解 Richmenu Switch Action

**Richmenu Switch Action** 是為 Rich Menu 而生的 Action，它能比上述的例子更快地幫助使用者切換 Rich Menu，因為實際操作在 Client 和 LINE Server 之間的請求只有 2 個。

![](https://nijialin.com/images/2021/switch-richmenu/4.png)

1. 使用者按下 Rich Menu 後向 LINE Server 發送請求。
2. LINE Server 接受請求後並將 Rich Menu 切換到使用者欲使用的樣式。

注意：LINE Server 收到請求後，除了為使用者切換 Rich Menu 外，同時還會以 Postback 事件的形式向 Bot 應用程式發送 Webhook。

關於如何使用 Richmenu Switch Action 建立 Rich Menu，它有 4 個步驟需要操作：

1. 準備兩款 Rich Menu: A 和 B 型
2. 建立 Rich Menu
3. 自定義 Rich Menu 別名
4. 將 Rich Menu 分配給使用者
5. 其他與 Alias 相關的 API

---

# 1. 準備兩款 Rich Menu: A 和 B 型

要為 A 和 B 的 Rich Menu 建立圖片，請按照以下文章的第 1 步執行。

> [使用 LINE 的 Rich Menu 打造一個食譜選單](https://medium.com/linedevth/%E0%B9%80%E0%B8%81%E0%B9%88%E0%B8%87-rich-menu-%E0%B9%83%E0%B8%99-line-messaging-api-%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B8%84%E0%B8%A3%E0%B8%9A%E0%B8%AA%E0%B8%B9%E0%B8%95%E0%B8%A3-6cf12b394f38)

然後按照上述文章的第 3 項為兩個 Rich Menu 建立 JSON 。例如，我將 Rich Menu 命名為 **richmenu-a**（另一幅名為 **richmenu-b** 的圖像），並將更多按鈕（另一幅圖像為 Back 按鈕）的區域定義為可點擊。此時忽略操作設置。

![](https://nijialin.com/images/2021/switch-richmenu/5.png)

> 注意：名稱可以與連接字母(`-`)一起使用，但不得包含空格。

---

# 2. 建立 Rich Menu

在這一步中，先取到上一步的 JSON，並修改成以下新的 Action：

```
// Action 的 Rich Menu 樣板 A
areas.action.type: "richmenuswitch"
areas.action.richMenuAliasId: "richmenu-b"
areas.action.data: "richmenu=b"
// Action 的 Rich Menu 樣板 B
areas.action.type: "richmenuswitch"
areas.action.richMenuAliasId: "richmenu-a"
areas.action.data: "richmenu=a"
```

<script src="https://gist.github.com/jirawatee/da1e9a6e6430140f406118789c8c140e.js"></script>

一旦我們自定義了兩種 Rich Menu 的 JSON 類型，那麼我們必須參考[文章](https://medium.com/linedevth/%E0%B9%80%E0%B8%81%E0%B9%88%E0%B8%87-rich-menu-%E0%B9%83%E0%B8%99-line-messaging-api-%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B8%84%E0%B8%A3%E0%B8%9A%E0%B8%AA%E0%B8%B9%E0%B8%95%E0%B8%A3-6cf12b394f38)的 4.1（建立）和 4.2（上傳）步驟來建立一個 Rich Menu 。您可以使用 [Postman](https://www.postman.com/) 之類的工具來輔助。`richMenuId` 結果如下：

![](https://nijialin.com/images/2021/switch-richmenu/6.png)

---

# 3. 自定義 Rich Menu 別名

在這一步中，我們需要將先前建立的 Alias 分配給 Rich Menu(A 和 B)。

```
Headers:
  + Authorization: Bearer {channel access token}
  + Content-Type: application/json
Endpoint: https://api.line.me/v2/bot/richmenu/alias
Method: POST
Body:
  + richMenuId: 此 ID 從 Rich Menu 第二步驟中取得
  + richMenuAliasId: 此項目是 Rich Menu 的別稱。可以指定為 a-z、A-Z、0-9、_ 和 - ，最多 100 個字元。
```

如果成功，您將獲得狀態碼 200 與 `{}`。

---

# 4. 將 Rich Menu 分配給使用者

最後一步，讓我們在 OA 或 LINE Chatbot 展示 Rich Menu，定義的內容為[文章](https://medium.com/linedevth/6cf12b394f38)中的 4.3、4.6 以及 4.7 項目，接著我們來看看結果，看它有多快！

![](https://nijialin.com/images/2021/switch-richmenu/7.gif)

# 5. 其他與 Alias 相關的 API

## 5.1 Update Rich Menu Alias

定義 Rich Menu Alias 的其中一個便利之處是我們不用像之前一樣更新使用者對應的 Rich Menu ID，它是透過 Cache 機制來更新，而不是透過 real-time 來更新使用者的 Rich Menu。

```
Headers:
  + Authorization: Bearer {channel access token}
  + Content-Type: application/json
Endpoint: https://api.line.me/v2/bot/richmenu/alias/{richMenuAliasId}
Method: POST
Param:
  + richMenuAliasId: Rich Menu 名稱(最多 100 字元)
Body:
  + richMenuId: 同一個 Channel 中的其他 Rich Menu ID
```

如果成功，您將獲得狀態碼 200 與 `{}`。

## 5.2 Get List of Rich Menu Alias

```
Headers:
  + Authorization: Bearer {channel access token}
Endpoint: https://api.line.me/v2/bot/richmenu/alias/list
Method: GET
```

如果成功，您將獲得狀態碼 200，並回傳以下結構的 JSON：

```json
{
  "aliases": [
    {
      "richMenuAliasId": "richmenu-alias-a",
      "richMenuId": "richmenu-862e6ad6..."
    },
    {
      "richMenuAliasId": "richmenu-alias-b",
      "richMenuId": "richmenu-88c05ef6..."
    }
  ]
}
```

## 5.3 Get Rich Menu Alias Info

```
Headers:
  + Authorization: Bearer {channel access token}
Endpoint: https://api.line.me/v2/bot/richmenu/alias/{richMenuAliasId}
Method: GET
Param:
  + richMenuAliasId: Rich Menu 名稱(最多 100 字元)
```

如果成功，將返回狀態 200，並返回這樣結構的 JSON。

```json
{
  "richMenuAliasId": "richmenu-alias-a",
  "richMenuId": "richmenu-88c05ef6..."
}
```

## 5.4 Delete Rich Menu Alias

由於 1 個 Chatbot 最多可以有 1000 個 Rich Menu Alias，所以以防萬一它有限制並且想要創建更多。您需要先刪除不使用的任何別名。

```
Headers:
  + Authorization: Bearer {channel access token}
Endpoint: https://api.line.me/v2/bot/richmenu/alias/{richMenuAliasId}
Method: DELETE
Param:
  + richMenuAliasId: Rich Menu 名稱(最多 100 字元)
```

如果成功，您將獲得狀態碼 200 與 `{}`。

---

# 結論

LINE 發布的 `Richmenu Switch Action` 從使用者的角度幫助了大家做最即時的 Rich Menu 切換，同時也減少了開發者的工作量。更多更有趣的應用，歡迎大家在社群分享給其他開發者朋友知道吧！下一篇文章再見囉！

# 活動小結

立即加入「LINE 開發者官方社群」官方帳號，就能收到第一手 Meetup 活動，或與開發者計畫有關的最新消息的推播通知。▼

「LINE 開發者官方社群」官方帳號 ID：@line_tw_dev
![](https://www.evanlin.com/images/2020/line-tw-dev-qr.png)

# 關於「LINE 開發社群計畫」

LINE 今年年初在台灣啟動「LINE 開發社群計畫」，將長期投入人力與資源在台灣舉辦對內對外、線上線下的開發者社群聚會、徵才日、開發者大會等，已經舉辦 30 場以上的活動。歡迎讀者們能夠持續回來察看最新的狀況。詳情請看:

- [2019 年 LINE 開發社群計畫活動時程表](https://engineering.linecorp.com/zh-hant/blog/line-taiwan-developer-relations-2019-plan/)
- [LINE Taiwan Developer Relations 2019 回顧與 2019 開發社群計畫報告](https://engineering.linecorp.com/zh-hant/blog/line-taiwan-developer-relations-2019/)
- [2020 年 LINE 開發社群計畫活動時程表](https://engineering.linecorp.com/zh-hant/blog/2020-line-tw-devrel/)
- [2021 年 LINE 開發社群計畫活動時程表 (持續更新)](https://engineering.linecorp.com/zh-hant/blog/2021-line-tw-devrel/)
