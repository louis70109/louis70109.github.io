---
title: 解決在 NodeJS 環境中遇到 Redis 套件的 Callback 的問題 | Promise 封裝
tags:
  - JavaScript
  - Callback
categories: JavaScript
date: 2021-05-13 19:45:59
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


# 前言

近期在想活動時想到之前有做個[彈幕機器人](https://github.com/louis70109/Screen-LINE-Bullets)，異想天開下想說在上面加個投票系統，不過為求方便想快速完成，因此想說用 Docker 啟動一個 Redis 來做個 PoC，因為當初為求前後端方便彈幕機器人就使用全 js 的方式撰寫，在很直觀找到最多星星的 Redis 套件 - [node-redis](https://github.com/NodeRedis/node-redis)，以下就分享我被 callback 雷到的經驗ＸＤ

<!-- more -->

# TL;DR

https://github.com/louis70109/vote-bullets-line-bot/blob/master/utils/redis.js

官方說本身要支援的話要等到 v4 版本，或是用 `util.promisify` 的方法去讓他變成 Promise 的模式，但顧慮到其他的套件不一定會有類似的封裝方法，因此底下就快速紀錄如何包裝成 Promise 讓其他函式可以正常使用。

# 紀錄

由於當時遇到 Callback 問題的程式碼 `redisClient.get('users', (err, val) => {})` 是會非同步執行完後才回來，導致在 LINE Bot 都已經回應了 Redis 才反應過來，因此接下來就開始用 Promise 來封裝它。

> 參考範例： https://github.com/louis70109/vote-bullets-line-bot/blob/master/utils/redis.js

首先，要先知道 JavaScript 任何東西都是以一個`函式`(`Function`)為單位，因此不論是在陣列、Object 當中都可以放入函式，且因為獨立封裝成一個檔案的關係，為了接下來 module.export 方便因此就直接定義一個 Object 來用。

```javascript
const redisPromise = {};
```

這邊使用 JavaScript 獨特的寫法來撰寫，前面說過 JavaScript 是 Function-based，因此很多東西都可以用 `.` 來串接。而以下這段則是將 `redisClient.get()` 這個 callback 函式透過建立一個 Promise 來將它包裝後，藉由 Promise 的 `reslove()` 以及 `reject()` 來控制成功、失敗時的相關作法，最後在 **return** 來回傳結果，如此一來就可以解決非同步的問題了。

```javascript
redisPromise.getAndUpdateUserList = (lineData) => {
  return new Promise((resolve, reject) => {
    redisClient.get('users', (err, val) => {
      reslove('ok')
    }))})
```

**另一個版本**: 但相信有些讀者應該看到這語法糖應該會頭很痛，以下將它拆解為比較好理解的版本(使用匿名函式)。

```javascript
redisPromise = {
  getAndUpdateUserLint: function (lineData) {
    return new Promise((resolve, reject) => {
      redisClient.get('users', (err, val) => {
        reslove('ok');
      });
    });
  },
};
```

最後在程式的尾端加上 `module.exports = redisPromise;`，即可將剛剛包裝好的東西都輸出出去，讓引入此檔案的地方可以使用剛剛定義的 `redisPromise.getAndUpdateUserLint()` 功能，詳細用法可以參考[我的 GitHub](https://github.com/louis70109/vote-bullets-line-bot/blob/master/index.js#L41)。

> 如果你是寫 Python 的朋友可以想像這個 dictionary (Object) 是一個 Class，裡面的每個 key 都是一個 function，如此一來在撰寫程式時會有比較好的連結喔！

# 結論

以上這次是我第一次遇到這樣的問題，未來可能也會遇到有些套件提供的功能如下：

```javascript
someFunction(callbackOne(), callbackTwo());
```

因為 JavaScript 本身是非同步，因此在 Debug 時可能會看到在後面的 log 已經先印出來了，才看到 Callback 打回來的訊息，若大家切換語系到 JavaScript 時要注意使用的套件是否有遇到這類的問題喔！(還真不適應 😆)
