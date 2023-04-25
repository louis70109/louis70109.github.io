---
title: 如何建立一個跨平台的 Twitch 機器人
tags:
  - Chatbot
  - bottender
categories: 應用
abbrlink: 4054342848
date: 2020-01-12 00:53:22
---

# 前言

在去年大約五月的時候寫了一隻 Twitch 的 LINE bot，不過後來似乎 Twitch API 有改版讓機器人壞掉了，最近又有需要一隻機器人幫我查詢，就開始去翻一下 Twitch 官方文件，碰巧逛到這個 [Community Resources page](https://dev.twitch.tv/code/)，看到了好多資料在裡面，就索性來重寫囉！

> 因為 Twitch package 都是 Typescript，因此本篇的範例都會是 Typescript 哦！

⭐️ 本專案: [Twitch-Bot](https://github.com/louis70109/Twitch-Bot)

# 加好友

- LINE
  <img height="200" border="0" alt="QRcode" src="https://i.imgur.com/kRcEhBN.png">

- Messenger
  <img height="200" border="0" alt="QRcode" src="https://i.imgur.com/93yxeiy.png">

# 準備

- 套件
  - [bottender](https://github.com/Yoctol/bottender) 為這次實作跨平台所使用的框架
  - [Twitch js](https://github.com/d-fischer/twitch) 中找到了 [npm 的套件](https://d-fischer.github.io/twitch/docs/basic-usage/getting-started.html)

```javascript
yarn add twitch
// or...
npm install --save twitch
```

- 金鑰
  - ~~申請 [Client ID](https://dev.twitch.tv/docs/v5#getting-a-client-id)~~
  - 建立 [Access Token](https://twitchapps.com/tmi/)

[2020/06/08 修正] 申請完後將 `oauth:` 後的 key 透過官方文件的 [Validating requests](https://dev.twitch.tv/docs/authentication/#validating-requests) 指令放入 access token 中取得 Client_id，如下:

```
curl -H "Authorization: OAuth <access token>" https://id.twitch.tv/oauth2/validate
```

本專案的 `TWITCH_CLIENT_ID` 的環境變數就是這個回傳值中的 `client_id`。

> 這部分可能會需要去 twitch `設定 -> 連結` 去綁定 Oauth 的樣子，再麻煩各位注意一下。

- 平台

  - 需要有個 Facebook 粉絲頁
  - LINE bot

- 資料庫
  - MongoDB: Heroku 上為 `mLab`

# 實作

Clone 專案下來看 ➡️ https://github.com/louis70109/Twitch-Bot.git
首先把`.env.sample`改成 `.env`，並將對應的`Messenger`、`LINE`以及`Twtich` key 放置對應的位置

- Messenger 申請我是參考 C.T. Lin 的[鐵人文章](https://ithelp.ithome.com.tw/articles/10218682)
- LINE bot 申請參考[我的文章](https://nijialin.com/2019/09/25/Day11-LINE-%E7%9A%84%E6%9C%8D%E5%8B%99%E9%83%BD%E7%8E%A9%E4%BA%86%EF%BC%8C%E6%80%8E%E9%BA%BC%E8%83%BD%E5%BF%98%E4%BA%86-Message-api-Bot-%E5%91%A2%EF%BC%9F-2-%E7%94%B3%E8%AB%8B%E4%B8%80%E6%AD%A5%E6%AD%A5/)

## 跨平台

跨平台含本地總共會有三個:

- Console (本地端)
- Messenger (線上)
- LINE (線上)

Console 是 bottender 的特色之一，可以在終端機上直接測試 Bot 的行為，會先用此模式先測試路由的回覆是否正常。

接著要讓同樣的 Action 可以導到 Messenger 以及 LINE，bottender 提供了可以設計針對特定平台處理 Action，如下:

```javascript
import { platform } from 'bottender/router';
export default async function App(): Promise<void> {
  return await router([
    platform('line', LineAction),
    platform('messenger', MessengerAction),
  ]);
}
```

透過`platform`來把特定平台的訊息到打對應的 Action (如 `LineAction`、`MessengerAction`)，在傳遞 Action 過程中會有一個 `context` 的變數，裡頭會有底層幫忙整理好的參數:

```bash
ConsoleContext {
  ...
  _session: {
    _id: 5e08a45c719a1335aeae39bc,
    id: 'console:1',
    _state: {},
    lastActivity: 1578743328620,
    platform: 'console',
    user: { id: '1', name: 'you', _updatedAt: '2019-12-29T13:04:25.633Z' }
  },
  ...
}
```

`_session` 裡有個 `platform` 的參數，只要判斷這參數就能知道訊息是來自哪個平台，而`user`則是被正規化完後的使用者資訊 (這兩個參數為目前為止我最常用的參數)

## 遇到的問題

由於長期使用 LINE flex message 的 button template ([參考](https://github.com/louis70109/Twitch-Bot/blob/master/src/view/line/games.ts#L56))，這按鈕事件可以設定按鈕上的文字並設定按下去回覆的字串。

而 Messenger 的按鈕就跟人家不一樣了([參考](https://github.com/louis70109/Twitch-Bot/blob/master/src/view/messenger/games.ts#L22))！他沒有 LINE 的這個事件，差不多的事件只有 `postback`，在路由上就得特別處理這個事件，為了讓跨平台所使用的內容要統一，在訊息進 router 時就要處理掉:

```javascript
import { messenger } from 'bottender/router';
import { withProps } from 'bottender';

async function LineAction(context): Promise<void> {
  return await router([
    ...
    text(/^[f|F]ind\s*(?<topic>.*)$/, searchGame)
    ...
  ]);
}

async function MessengerAction(context): Promise<void> {
  const payload = context.event?.postback?.payload;
  return await router([
    ...
    messenger.postback(
      withProps(searchGame, { match: { groups: { topic: payload } } })
    )
    ...
  ]);
}
```

這邊找到 [bottender 官方文件](https://bottender.js.org/docs/channel-messenger-routing)中函式專門在處理 Messenger 的 postback 事件，並搭配`withProps`來幫忙把參數 postback 收到的參數傳進對應 Action。

為什麼會要把傳入的參數設定成巢狀 object -> `{ match: { groups: { topic: payload }}}`，因為在設計初期本是希望進來的內容都是從`text`傳進來，意指都是透過使用者打字進來，那 bottender 都會透過傳 match 參數進來([參考](https://github.com/louis70109/Twitch-Bot/blob/master/src/controller/twitches/searchGame.ts#L7))，而解析完 Messenger 的 postback 時也得需要符合這樣的格式，因此就這樣設計，當然如果有更好的設計歡迎送 PR 🎉。

# Chatbot MVC

## [Model](https://github.com/louis70109/Twitch-Bot/blob/master/src/model)

- `Twitch`: 這裡我設定 userId 為 unique，針對每個平台有自己的 id，每個平台都可以綁定 twitch 帳號，進而去做相關操作。
- `Game`: 因為 Twitch 套件這部分是`read only`，因此我就在建立一個一樣的 model 來處理。

> Twich id 是全開放的，只要知道其他使用者的 id 就可以查詢某些功能([參考](https://dev.twitch.tv/docs/v5))，這邊我就使用查詢`追隨`的功能。

## [View](https://github.com/louis70109/Twitch-Bot/tree/master/src/view)

這裡設計上只要屬於送出訊息相關的樣板(`Flex`、`Genetic`、`Text`)接放在此。

- common: `作者資訊(author)` 以及 `幫助我(help)` 的相關
- LINE: Flex message 相關樣板
- messenger: Genetic template 相關樣板

## [Controller](https://github.com/louis70109/Twitch-Bot/tree/master/src/controller)

在呼叫 twitch api 出來的資料有時候會大於 LINE 以及 Messenger 的樣板限制，因此所有計算服務都會放在這邊，剛好就搭上 Controller 的對應功能。

- common: 負責將 controller 處理完的內容送至 `View`
- twitch: 處理`最多人看得遊戲`以及`搜尋指定遊戲`
- user: 處理`綁定`以及`查詢追隨`

# 結論

基本上做到這如果之後要擴增`Telegram`或是`Slack`都可以很快速擴充，只要把相對只要把相對的 Action 加在 `App.ts` 就行了。

藉由這次也學到跨平台的機器人真的不好做，每家廠牌的行為都不一樣，所幸 bottender 已經處理大部分平台間的問題，接著我們只需要將欲輸出的內容處理好對應框架所提供的功能去回傳給使用者，讓整體的開發可以更專注在開發功能上並更有彈性。

歡迎各位幫我按個星星 ⭐️➡️ https://github.com/louis70109/Twitch-Bot
也一起支持開源專案 `bottender`⭐️➡️ https://github.com/Yoctol/bottender
