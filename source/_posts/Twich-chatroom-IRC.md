---
title: 透過 IRC 與 Twitch 聊天室連結互動
tags:
  - Twitch
  - irc
  - chatbot
abbrlink: 307657668
categories: 應用
date: 2019-12-24 22:09:27
---

# 前言

為什麼會想玩這個呢，因為之前串了一隻介接 Twitch API 的聊天機器人，不過最近因為 API 似乎已經翻新了，所以那隻機器人暫時死亡了 😆，但是聊天機器人不限定只有在 facebook、LINE 通訊軟體上，因此就寫了這篇文章來紀錄一下使用過程。

# 文件 & 申請密鑰

Twitch Chatbot IRC [官方文件](https://dev.twitch.tv/docs/irc/)

- GitHub
  - [連結](https://github.com/tmijs/tmi.js)
  - [文件](https://github.com/tmijs/docs)

> 要使用的朋友在 google 時可能會找到另一套，不過他也說請大家來用 `tmi.js` 了ＸＤ

首先要先申請一個 `OAUTH` 的密鑰，網址[在這邊](https://twitchapps.com/tmi/)

# 套件安裝

透過`npm`安裝`tmi.js`

```bash
npm i tmi.js
```

# IRC 通訊

接著需要寫一個腳本透過`IRC`的方法來與 Twitch 的聊天室連結：

> [IRC](https://zh.wikipedia.org/wiki/IRC)（Internet Relay Chat）是一個位於應用層的協定。其主要用於群體聊天，但同樣也可以用於個人對個人的聊天。

## 新增 `bot.js`

```javascript
const tmi = require('tmi.js');
const client = new tmi.Client({
  options: { debug: true },
  connection: {
    reconnect: true,
    secure: true,
  },
  identity: {
    username: 'YOUR_NAME',
    password: 'oauth:YOUR_KEY',
  },
  channels: ['yuniko0720'], // 想加入的聊天室
});
client.connect();
client.on('message', (channel, tags, message, self) => {
  if (self) return;
  if (message.toLowerCase() === '87') {
    client.say(channel, `@${tags.username}, 你是第 N 個說 87!`);
  }
});
```

## 設定檔

- `username`: 設定你的使用者名稱
- `password`: 申請的 oauth 放在這邊，格式皆是`oauth:XXXXX`
- `channels`: 一般會進入自己的頻道，當然也可以去其他頻道

```javascript
identity: {
    username: 'YOUR_NAME',
    password: 'oauth:YOUR_KEY',
  },
  channels: ['yuniko0720'],
```

## 連結聊天室

這部分則是開始監聽聊天室的內容，所有的範例連結[皆在此](https://github.com/tmijs/docs/tree/gh-pages/_posts/v1.4.2)。

```javascript
client.on('message', (channel, tags, message, self) => {
  if (self) return;
  if (message.toLowerCase() === '87') {
    client.say(channel, `@${tags.username}, 你是第 N 個說 87!`);
  }
});
```

# 成果

執行`node bot.js`會看到以下的畫面

![](https://i.imgur.com/01aiJVw.png)

其實這樣監聽看起來真的是讓我這個宅心噴發 🚀🚀，可以透過`IRC`收到聊天室訊息後看後續要怎麼處理，像有些實況主與觀眾的互動可能是輸入`+1`這樣的文字來獲得獎賞(抑或是互罵 🤣)，在很多情境下這樣用會讓觀眾除了跟實況主互動以外還有個對象能玩 👾。

# 結論

而在這樣監聽下若人數很高之後其實可以收集到更多的資訊去做利用，也許想是開啟`訂閱者模式`後讓訂閱者輸入特定文字後將資訊傳入`Google sheet`之類的資料表，在做抽獎等活動性質的內容，對整個遊戲實況內容行銷都會是滿好與觀眾互動的方式～

大概就玩到這邊了，下次想到什麼應用再來說 😆
