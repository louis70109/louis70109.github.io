---
title: Bottender x Dialogflow x LINE
tags:
  - chatbot
  - Google
  - Dialogflow
categories: Chatbot
abbrlink: 2200933333
date: 2019-12-10 23:18:31
---

大家好，我是 Chatbot Taiwan 的 NiJia，最近我們 Github 開張囉，想找之前演講的紀錄都會在此哦！

- [Github](https://github.com/Chatbot-Taiwan/meetups)
- [Facebook](https://www.facebook.com/groups/chatbot.tw/)
- [KKTIX](https://chatbots.kktix.cc/)

# 前言

事情是這樣的，本週末 12/13-12/15 我要去 [GDG Taichung Hackthon Party](https://www.meetup.com/GDGTaichung/events/266686542/) 上當導師，礙於我實在想不出有個題目可以分享給其他同好，碰巧之前跟過 Wolke 大大的 Dialogflow + LINE bot 工作坊，憶起當時的明媚風景，接著前陣子寫鐵人賽也有跟到 C.T Lin 大大寫的[使用 Modern Web 技術來打造 Chat App](https://ithelp.ithome.com.tw/users/20103630/ironman/2798)，如此一來我就乾脆把這兩個東西合在一起弄個東西！

又這麼剛好的我最近瘋狂看 ABL 球賽(支持本土球隊！)，剛好週末也沒事，就順手把它做出來啦~有在看球賽的朋友別錯過這隻機器人囉！他可以告訴你下一場比賽是哪時候～
![](https://i.imgur.com/RTmyJPr.png)

以下記錄著我踩雷的過程 🤣，詳細 bottender 使用手冊還是參考 -> [使用 Modern Web 技術來打造 Chat App](https://ithelp.ithome.com.tw/users/20103630/ironman/2798)

本篇文章的程式碼已經開源囉 [Taiwan-ABL-Games](https://github.com/louis70109/Taiwan-ABL-games)

# 建立專案

```javascript
npx create-bottender-app taiwan-abl-games
```

接著會看到以下的畫面，bottender 很貼心的列出一些大家平常比較會使用的平台，這邊我們先選擇 LINE，後續會再告訴大家如何增加其他平台選項。
![](https://i.imgur.com/k12ig2m.png)

# Dialogflow 注意事項與串接

這邊一定是要參考主要開發者所寫的文章啊 -> [Day25](https://ithelp.ithome.com.tw/articles/10226833)
大致上創建服務的過程差不多，這個部分就簡單帶過比較重要的部分。

> 在處理意圖部分有個小撇步，若鼠標從左邊到右邊，到第二個時會把第一個意圖覆蓋掉，這邊我都是從右邊到左邊一個一個選，才不會遇到覆蓋的問題。

![](https://i.imgur.com/HtZ1OWd.png)

接下來再處理 Dialogflow API 的問題，Day 25 文章中所提到的地方 Google UI 似乎有換位置，我找到的位置在此 -> [URL](https://cloud.google.com/docs/authentication/production#obtaining_and_providing_service_account_credentials_manually)
![](https://i.imgur.com/5HJ3uL7.png)

從頁面的藍色按鈕(建立服務金鑰)後會遇到下圖畫面，第一個紅色框框需要注意是不是剛剛建立的 Dialogflow 的 agent。
而第二個下拉式選單選擇 `Dialogflow Integrations`，下面則選擇 `JSON` 格式。
![](https://i.imgur.com/vBRfIgp.png)

> 在一開始建立完之後若是要回來管理的話，直接到 GCP 的[主控台](https://console.cloud.google.com/home/dashboard)左側的`API & Services`的`Cedemtials`來管理金鑰。

![](https://i.imgur.com/IEGyogB.png)

把下載的檔案放在主目錄下，接著要在`.env`下新增以下兩個 key，`GOOGLE_APPLICATION_CREDENTIALS`則需要打上`絕對路徑`，後面再部署會再解釋這段。

```
GOOGLE_APPLICATION_CREDENTIALS=/Users/.../taiwan-abl-games/YOUR_KEY.json
GOOGLE_APPLICATION_PROJECT_ID=taiwan-abl-games-mpmomf
```

`PROJECT_ID`要去 [GCP 主控台](https://console.cloud.google.com/home/dashboard)查詢。
![](https://i.imgur.com/GSHaMTK.png)

# 實作

這邊就先複製原作者的 code 並稍做修改至 /src/index.js：

```javascript
const dialogflow = require('dialogflow'); // 記得安裝
const { format } = require('date-fns'); // 記得安裝

const PROJECT_ID = process.env.GOOGLE_APPLICATION_PROJECT_ID;
const sessionClient = new dialogflow.SessionsClient();

module.exports = async function App(context) {
  if (context.event.isText) {
    const sessionPath = sessionClient.sessionPath(
      PROJECT_ID,
      context.session.id
    );

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: context.event.text,
          languageCode: 'zh-tw',
        },
      },
      queryParams: {
        timeZone: 'Asia/Taipei',
      },
    };

    // 透過 dialogflow 偵測意圖
    const responses = await sessionClient.detectIntent(request);
    const { intent, parameters } = responses[0].queryResult;

    if (intent.displayName === 'dreamer-next-game') {
      //...YOUR CONTEXT
    } else {
      await context.sendText('您輸入的內容我不懂哦~🏀');
    }
  }
};
```

藉由上述程式碼會發現藉由 Dialogflow 判斷出來的 intent 到底是要填入什麼？intent 顯示的字串就如下圖所示，我們在 Dialogflow 裡建立的 Intent 的名字就是最後 API 會回傳給我們的判斷字串，這邊就正規化一下自己所要提供的意圖吧！
![](https://i.imgur.com/sEsEep8.png)

## bottender.config.js

最後這邊提一下如何設定給多平台使用，一開始藉由`npx create-bottender-app xxx`幫我們建立 app 時這個檔案就會自動生成，bottender 很好心的把所有明台所會用到的 key 全部都會放在這裡面。
![](https://i.imgur.com/Ba6I5HR.png)
以我為例我就有使用到 Messager 來試玩，這邊就需要把`enabled`啟動(false -> true)，實際建立粉絲頁相關可以[參考](https://ithelp.ithome.com.tw/articles/10218682)

> 題外話: 最後再使用`npx bottender messenger webhook set`就會幫我們把 localhost 串接到 Message 上，實在是太讚了！！！

# 部署注意事項

我是使用 Heroku 當作我部署的環境，請服用這篇[Heroku 部署](https://ithelp.ithome.com.tw/articles/10228055)

在本地端測試時會用到很多的環境變數，而 Dialogflow API json 的路徑我是透過環境變數去取得，在 Heroku 上會把專案的內容放在`/app`底下(不管你專案叫什麼名字)，因此環境變數`GOOGLE_APPLICATION_CREDENTIALS`需要輸入`/app/xx-ooo.json`這樣就會取到當前目錄下的檔案囉！

# 結論

經由這次試玩這個 project 讓我覺得 [bottender](https://github.com/Yoctol/bottender) 這個 chatbot 框架整合真的是厲害，幫開發者處理掉很多跨平台上的問題，我認為最酷的就是 console mode，在測試程式邏輯上可以不用每次都一直用手機開 LINE 或是 FB 來測試機器人狀態，而是在終端機就解決這件事，這是我開發機器人到目前為止覺得最酷的模式 👍！

而在這個專案上我使用到 Dialogflow，除了參考的原文畫面 (GCP 頁面) 已有些許更動外，其實介接的速度是非常快的，此外我很認同原文作者的觀點，把 Dialogflow 接在程式後面才去處理這件事會增加很多彈性，畢竟當一個**回應**來的時候可能會想做其他不同的應用，此時若是模型就在前面先把訊息回覆掉，會增加很多開發上的問題(當然若簡單的功能單人沒問題 🤣)。

總而言之～誠心推薦大家去玩玩 bottender，也許你會跟我一樣發現了新大陸 😎。

# 參考

[Dialogflow](https://dialogflow.com)
[GCP](https://console.cloud.google.com/?hl=zh-TW)
[Bottneder 建立專案](https://ithelp.ithome.com.tw/articles/10216040)
[Heroku 部署](https://ithelp.ithome.com.tw/articles/10228055)
