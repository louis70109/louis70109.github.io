---
title: 【翻譯】如何個性化在 LINE 中顯示 Rich Menu 以匹配用戶的語系
tags:
  - LINE
  - Richmenu
  - Firebase
  - Chatbot
categories: 翻譯
date: 2021-03-22 11:59:30
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

![](https://nijialin.com/images/2021/translate/richmenu-personalize/1.png)

> 翻譯來自泰國的 Jirawatee 的[文章](https://medium.com/linedevth/%E0%B8%A7%E0%B8%B4%E0%B8%98%E0%B8%B5%E0%B9%81%E0%B8%AA%E0%B8%94%E0%B8%87%E0%B8%9C%E0%B8%A5-rich-menu-%E0%B9%83%E0%B8%99-line-%E0%B9%81%E0%B8%9A%E0%B8%9A-personalize-%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B8%95%E0%B8%A3%E0%B8%87%E0%B8%81%E0%B8%B1%E0%B8%9A%E0%B8%A0%E0%B8%B2%E0%B8%A9%E0%B8%B2%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B9%83%E0%B8%8A%E0%B9%89%E0%B8%87%E0%B8%B2%E0%B8%99-9c3fd2083ba7)

在過去的一年中，Rich Menu 上的文章非常受歡迎，它的優點是在用戶聊天頁面上顯示重要的**選單(Menu)**並可以選擇各種操作，降低用戶使用官方帳號的門檻。而對於擁有 LINE 正式帳戶或 LINE Chatbot 的用戶而言，加上創建步驟是相當簡單的，可以透過 [Official Account 後台](https://manager.line.biz/)或是讓具有程式能力的朋友透過呼叫 API 的方式建立 Rich Menu，若能這麼容易就建立 Rich Menu，那麼成為每個帳戶必須具備的基本功能也就不足為奇了。

本文中我將邀請所有人開發一個 Rich Menu，以便能夠顯示出來每個用戶在手機上使用的語系。首先必須知道的是 “**該用戶使用哪種語言？**”，我們可以透過哪種方式獲取用戶手機上的語系，早期我們只能取得 `userId`、`displayName`、`pictureUrl`和`statusMessage`，而現今 LINE 已在用戶的個人資料訊息中添加了一個 **language** 參數以供使用。

到目前為止，我們已經準備好了想法。因此，讓我們看一下開發它的步驟：

1. 準備使用 Cloud Functions for Firebase 開發的 LINE Chatbot
2. 準備**泰語**和**英語**的 Rich Menu
3. 建立條件以獲取 Follow 類型 Webhook 的事件
4. 從用戶個人資料中取得 “**language**” 參數
5. 讓用戶匹配對應語系的 Rich Menu

<!-- more -->

# 1. 準備使用 Cloud Functions for Firebase 開發的 LINE Chatbot

對於從未開發過具有用於 Firebase 的 Cloud Functions 的 LINE Chatbot 的用戶，請遵循以下文章的步驟(1-3 章節就足夠了)，但如果有經驗的話，直接跳到步驟 2 - 準備**泰語**和**英語**的 Rich Menu。

> [使用 Messaging API 和 Cloud Functions 在 Firebase 建置 LINE Bot](https://medium.com/linedevth/%E0%B8%AA%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%87-line-bot-%E0%B8%94%E0%B9%89%E0%B8%A7%E0%B8%A2-messaging-api-%E0%B9%81%E0%B8%A5%E0%B8%B0-cloud-functions-for-firebase-20d284edea1b)

注意：隨著使用 Cloud Functions 開發 LINE Chatbot，因為您需要在 Google 網域外使用 LINE API，因此 Cloud Functions 會要求您從 **Spark** 切換到 **Blaze**，但好處是您會在 Blaze 中獲得更多的免費配額。

![](https://nijialin.com/images/2021/translate/richmenu-personalize/2.png)

# 2. 準備**泰語**和**英語**的 Rich Menu

此步驟將根據 [在 LINE 中完成設定 Rich Menu](https://medium.com/linedevth/%E0%B9%80%E0%B8%81%E0%B9%88%E0%B8%87-rich-menu-%E0%B9%83%E0%B8%99-line-messaging-api-%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B8%84%E0%B8%A3%E0%B8%9A%E0%B8%AA%E0%B8%B9%E0%B8%95%E0%B8%A3-6cf12b394f38) 文章將方法分為 3 個子步驟。

## 2.1 使用 Rich Menu Maker 創建 Rich Menu 圖像

讀者可以通過使用兩種語言為 Rich Menu 創建圖像來遵循文章的項目 1 ，在此示例中，圖像將創建 2 張圖像（下載並嘗試）。

![](https://nijialin.com/images/2021/translate/richmenu-personalize/3.jpeg)

> 英文的 Rich Menu 範例

![](https://nijialin.com/images/2021/translate/richmenu-personalize/4.jpeg)

> 泰文的 Rich Menu 範例

## 2.2 使用 LINE Bot Designer 為 Rich Menu 創建 JSON

讀者們可以參考[下列文章](https://medium.com/linedevth/%E0%B9%80%E0%B8%81%E0%B9%88%E0%B8%87-rich-menu-%E0%B9%83%E0%B8%99-line-messaging-api-%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B8%84%E0%B8%A3%E0%B8%9A%E0%B8%AA%E0%B8%B9%E0%B8%95%E0%B8%A3-6cf12b394f38)的步驟 3 使用 [LINE Bot Designer](https://developers.line.biz/zh-hant/services/bot-designer/) 建立 Rich Menu，透過使用兩種語系(泰語、英語)為 Rich Menu 建立兩個 JSON。

> 泰文：[在 LINE 中實作 Rich Menu 的相關訊息](https://medium.com/linedevth/%E0%B9%80%E0%B8%81%E0%B9%88%E0%B8%87-rich-menu-%E0%B9%83%E0%B8%99-line-messaging-api-%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B8%84%E0%B8%A3%E0%B8%9A%E0%B8%AA%E0%B8%B9%E0%B8%95%E0%B8%A3-6cf12b394f38)

![](https://nijialin.com/images/2021/translate/richmenu-personalize/5.png)

在這個範例中，如果點擊 Rich Menu 則將打開 [LINE Developers 網站](https://developers.line.biz/)。

## 2.3 通過 Messaging API 創建 Rich Menu

請把從上述工法得到的 JSON 和參考[下列文章](https://medium.com/linedevth/%E0%B9%80%E0%B8%81%E0%B9%88%E0%B8%87-rich-menu-%E0%B9%83%E0%B8%99-line-messaging-api-%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B8%84%E0%B8%A3%E0%B8%9A%E0%B8%AA%E0%B8%B9%E0%B8%95%E0%B8%A3-6cf12b394f38)的第 4.1 項(Create Rich Menu) 和 4.2 項(Upload Rich Menu Image)，可以使用類似 [Postman](https://www.postman.com/) 的工具來幫助呼叫 LINE API 以建立兩種語系的 Rich menu，其結果一定是 **richMenuId**，而我們需要建立兩次取得泰語與英語的 richMenuId。
![](https://nijialin.com/images/2021/translate/richmenu-personalize/6.png)

> 泰文：[在 LINE 中實作 Rich Menu 的相關訊息](https://medium.com/linedevth/%E0%B9%80%E0%B8%81%E0%B9%88%E0%B8%87-rich-menu-%E0%B9%83%E0%B8%99-line-messaging-api-%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B8%84%E0%B8%A3%E0%B8%9A%E0%B8%AA%E0%B8%B9%E0%B8%95%E0%B8%A3-6cf12b394f38)

# 3. 建立條件以獲取 Follow 類型 Webhook 的事件

當用戶將我們的 Chatbot 添加為好友或封鎖時，我們將獲取 Webhook 事件的 Follow 類型，以便根據用戶的手機語系顯示對應的 Rich Menu。

根據 [透過 webhook 事件的 15 種訊號來喚醒您的 LINE Chatbot](https://medium.com/linedevth/12-%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%E0%B8%93%E0%B8%88%E0%B8%B2%E0%B8%81-webhook-events-%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%88%E0%B8%B0%E0%B8%9B%E0%B8%A5%E0%B8%B8%E0%B8%81%E0%B9%83%E0%B8%AB%E0%B9%89-line-bot-%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%84%E0%B8%B8%E0%B8%93%E0%B8%95%E0%B8%B7%E0%B9%88%E0%B8%99%E0%B8%88%E0%B8%B2%E0%B8%81%E0%B8%A0%E0%B8%A7%E0%B8%B1%E0%B8%87%E0%B8%84%E0%B9%8C-4cb7da653274) 文章的第 2 點，從 Follow 事件中的結構中得出我們感興趣的兩個欄位: `events[0].type` 與 `events[0].source.userId`，因此我們打算寫一個判斷式來獲取 **userId**。

```javascript
exports.LineBot = functions.https.onRequest((req, res) => {
  const event = req.body.events[0];
  if (event.type === 'follow') {
    const userId = event.source.userId;
  }
  return null;
});
```

# 4. 從用戶個人資料中取得 “**language**” 參數

此章節將接續著上一章節並透過使用 **userId** 識別用戶的語系，讓我們根據以下文章的 2.1 章節查看相關配置訊息。

> 泰文：[透過 LINE 中的各式 API 比對用戶個人資料是否相同](https://medium.com/linedevth/%E0%B8%A3%E0%B8%B9%E0%B9%89%E0%B8%84%E0%B8%A3%E0%B8%9A%E0%B8%88%E0%B8%9A%E0%B9%83%E0%B8%99%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B9%80%E0%B8%94%E0%B8%B5%E0%B8%A2%E0%B8%A7%E0%B8%81%E0%B8%B1%E0%B8%9A%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%94%E0%B8%B6%E0%B8%87-user-profile-%E0%B8%9C%E0%B9%88%E0%B8%B2%E0%B8%99-api-%E0%B8%95%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B9%86%E0%B9%83%E0%B8%99-line-dafb17e5864a)

因此，我們需要建立一個 getProfile() 的函式：

```javascript
const getProfile = (userId) => {
  return request.get({
    headers: LINE_HEADER,
    uri: `${LINE_MESSAGING_API}/profile/${userId}`,
    json: true,
  });
};
```

然後，您可以通過發送 **userId** 參數來使用函式。

```javascript
exports.LineBot = functions.https.onRequest(async (req, res) => {
  const event = req.body.events[0];
  if (event.type === 'follow') {
    const userId = event.source.userId;
    const profile = await getProfile(userId);
    const language = profile.language;
  }
  return null;
});
```

> 注意：由於我們必須等待 getProfile() 函式的 callback 回傳，為了簡潔程式碼，因此我借助了 **async / await** 來幫忙。

# 5. 讓用戶匹配對應語系的 Rich Menu

到了最後一步，我們需要根據每個用戶的語系來定義 Rich Menu。接下來將參考 - [在 LINE 中實作 Rich Menu 的相關訊息(泰文)](https://medium.com/linedevth/%E0%B9%80%E0%B8%81%E0%B9%88%E0%B8%87-rich-menu-%E0%B9%83%E0%B8%99-line-messaging-api-%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B8%84%E0%B8%A3%E0%B8%9A%E0%B8%AA%E0%B8%B9%E0%B8%95%E0%B8%A3-6cf12b394f38) 文章中的 4.6 項目來完成，我將建立一個函式 - linkRichMenu()，透過傳遞參數 **userId** 和 **language** 並結合上一步(第四小節)來進行相關操作，以下則是參考所有的程式碼：

<script src="https://gist.github.com/jirawatee/ec8f05a496a2d5b95cedcd059a8a19ea.js"></script>

準備好了整個程式碼區塊，接著就使用 Command Line 將 functions 文件夾進行部署上傳：

```bash
firebase deploy --only functions
```

然後讓我們看看結果。

![](https://nijialin.com/images/2021/translate/richmenu-personalize/7.gif)

# 結論

透過加入了 `language` 參數判斷語系並讓 Rich Menu 可以更貼近特定語系的用戶，或者是針對不同語系的回覆等等。希望透過本文的講解讓讀者們可以發揮出更不同的應用情境，並期待著您可以創造出更多更驚豔的服務！
