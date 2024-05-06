---
title: '在 Cloud Functions 上部署有 Open Data 功能的 LINE Bot | 摘要王, 天氣, 紅外線'
tags:
  - Serverless
  - GCP
  - Google
  - LINE
  - Cloud Function
categories: GCP
date: 2024-05-03 12:50:07
---

![](https://nijialin.com/images/common.jpeg)

- [前言](https://nijialin.com/2024/05/03/line-bot-cloud-functions-workshop/#前言)
- [LINE Bot \& Gemini Pro 設定細節請參考: 旅行小幫手 LINE Bot 文章](https://nijialin.com/2024/05/03/line-bot-cloud-functions-workshop/#line-bot--gemini-pro-設定細節請參考-旅行小幫手-line-bot-文章)
  - [事前準備](#事前準備)
  - [關於 Gemini API Price](https://nijialin.com/2024/05/03/line-bot-cloud-functions-workshop/#關於-gemini-api-price)
  - [流程圖](https://nijialin.com/2024/05/03/line-bot-cloud-functions-workshop/#流程圖)
- [介紹](https://nijialin.com/2024/05/03/line-bot-cloud-functions-workshop/#介紹)
  - [試題：範例為列出五個項目，修改 prompt 找出群組的大家最近關注的事項](https://nijialin.com/2024/05/03/line-bot-cloud-functions-workshop/#試題範例為列出五個項目修改-prompt-找出群組的大家最近關注的事項)
- [增加天氣 Open Data 功能](https://nijialin.com/2024/05/03/line-bot-cloud-functions-workshop/#增加天氣-open-data-功能)
- [衛星雲圖 - 是否有雲層](https://nijialin.com/2024/05/03/line-bot-cloud-functions-workshop/#衛星雲圖---是否有雲層)
- [活動小結](https://nijialin.com/2024/05/03/line-bot-cloud-functions-workshop/#活動小結)

# 前言

此篇文章為延續與政治大學 & 臺北大學 GDSC 工作坊的文章，如果對於整合 LINE 官方帳號的相關資訊，可以參考本篇喔！

<!-- more -->

- [[BwAI workshop][Golang] LINE OA + CloudFunction + GeminiPro + Firebase = 旅行小幫手 LINE 聊天機器人(1)： 景色辨識小幫手](https://www.evanlin.com/linebot-cloudfunc-firebase-gemini-workshop/)
- [[BwAI workshop][Golang] LINE OA + CloudFunction + GeminiPro + Firebase = 旅行小幫手 LINE 聊天機器人(2)： Firebase Database 讓 LINEBot 有個超長記憶](https://www.evanlin.com/linebot-cloudfunc-firebase-gemini-workshop2/)
- [[BwAI workshop][Golang] LINE OA + CloudFunction + GeminiPro + Firebase = 旅行小幫手 LINE 聊天機器人(3)： 導入「名片小幫手」跟「收據小幫手」](https://www.evanlin.com/linebot-cloudfunc-firebase-gemini-workshop3/)

# LINE Bot & Gemini Pro 設定細節請參考: [旅行小幫手 LINE Bot 文章](https://www.evanlin.com/linebot-cloudfunc-firebase-gemini-workshop/)

## 事前準備

![](https://nijialin.com/images/2024/gemini-workshop/image-20240410165104899.png)

- [LINE Developer Account](https://developers.line.biz/en/): 你只需要有 LINE 帳號就可以申請開發者帳號
- [Google Cloud Run](https://cloud.google.com/run?hl=zh-TW)： Python 程式碼的部署平台，生成供 LINE Bot 使用的 webhook URL
- [Firebase](https://firebase.google.com/)：建立 Realtime database，LINE Bot 可以記得你之前的對話，甚至可以回答許多有趣的問題
- [Google AI Studio](https://aistudio.google.com/app/prompts/new_chat): 可以透過這裡取得 Gemini Key
- GitHub: Clone 專案部署的地方 - [linebot-gemini-summarize](https://github.com/louis70109/linebot-summarize-cloud-functions-gemini)

## 關於 Gemini API Price

根據官方網站： https://ai.google.dev/pricing?hl=zh-tw

![](https://nijialin.com/images/2024/gemini-workshop/image-20240412195805278.png)

> 細節請參考: [旅行小幫手 LINE Bot 文章](https://www.evanlin.com/linebot-cloudfunc-firebase-gemini-workshop/)

## 流程圖

```
   ┌─┐
   ║"│
   └┬┘
   ┌┼┐
    │            ┌─────┐          ┌──────────────┐               ┌────────┐          ┌──────┐
   ┌┴┐           │Group│          │Webhook_Server│               │Firebase│          │Gemini│
  User           └─────┘          └──────┬───────┘               └────────┘          └──────┘
   │    傳送文章訊息  │                    │                           │                  │
   │ ──────────────>│                    │                           │                  │
   │                │     傳送用戶指令     │                           │                  │
   │                │───────────────────>│                           │                  │
   │                │                    │   儲存聊天狀態在 Realtime DB│                  │
   │                │                    │ ────────────────────────> |                 │
   │                │                    │           儲存完畢         │                  │
   │                │                    │ <──────────────────────── |                  │
   │                │    回傳已完成文字    │                           │                  │
   │                │<───────────────────│                           │                  │
   │   輸入 "!摘要"  │                    │                           │                  │
   │ ──────────────>│                    │                           │                  │
   │                │     傳送用戶指令     │                           │                  │
   │                │───────────────────>│                           │                  │
   │                │                    │          抓取聊天記錄       │                  │
   │                │                    │ ────────────────────────> |                  │
   │                │                    │           回傳清單         │                  │
   │                │                    │ <─────────────────────────|                  │
   │                │                    │               下prompt 進行摘要運算            │
   │                │                    │ ────────────────────────────────────────────>|
   │                │                    │                   回傳摘要清單                 │
   │                │                    │ <────────────────────────────────────────────|
   │                │   回傳摘要資訊至群組  │                           │                  │
   │                │<───────────────────│                           │                  │
  User           ┌─────┐          ┌──────┴───────┐               ┌────────┐          ┌──────┐
   ┌─┐           │Group│          │Webhook_Server│               │Firebase│          │Gemini│
   ║"│           └─────┘          └──────────────┘               └────────┘          └──────┘
   └┬┘
   ┌┼┐
    │
   ┌┴┐
```

# 介紹

1. 首先到 GitHub 上 [linebot-summarize-cloud-functions-gemini](https://github.com/louis70109/linebot-summarize-cloud-functions-gemini)

![](https://nijialin.com/images/2024/gemini-workshop/1.png)

2. 將 Code 轉貼到 Cloud Functions 上的介面，這邊使用 1st Gen || 2nd Gen 都不影響，如果有舊的也可以複製一個 functions 出來
   1. Function name 小雷：如果先建立了一個 `function-1` 的，然後砍掉之後，再建立一個名字一樣 `function-1` 的，LINE bot 這邊會打不到新的 webhook

![](https://nijialin.com/images/2024/gemini-workshop/2.png)

3. 加入以下的環境變數，並放上對應的參數，如果有找不到的 Key，請參考過往的系列文
   1. 需要注意：因為使用 Python 關係，且之後圖片判斷功能，因此 Memory 會需要設定 `1GB`

```
ChannelSecret
ChannelAccessToken
GOOGLE_GEMINI_API_KEY
FIREBASE_URL
```

![](https://nijialin.com/images/2024/gemini-workshop/3.png)

4. 來到 GitHub 專案 [linebot-gemini-summarize](https://github.com/louis70109/linebot-gemini-summarize) 的 main.py，點選畫面上的按鈕複製程式碼

![](https://nijialin.com/images/2024/gemini-workshop/4.png)

5. 轉貼到 Cloud Functions 上，需要注意的地方是，預設為 JavaScript，因此這邊要先選擇 `Python 3.11`，接著**進入點**需要換成 `linebot`，main.py 以及 requirements.txt 裡面的內容都需要置換，後續才能部署

![](https://nijialin.com/images/2024/gemini-workshop/5.png)

6. 在 build 的過程，找到觸發網址的地方，將他複製起來

![](https://nijialin.com/images/2024/gemini-workshop/6.png)

7. 複製到 LINE Developer Console 的 webhook 地方，不用加任何的 sub-path

![](https://nijialin.com/images/2024/gemini-workshop/7.png)

8. 接著可以來到[ LINE TODAY ](https://today.line.me/tw/v3/tab)當中，假設現在有個爬蟲想做，模擬抓下來的動作，選擇自己喜歡的分類貼上，測試一樣 Gemini Pro 是否有通

## 試題：範例為列出五個項目，修改 prompt 找出群組的大家最近關注的事項

假設你是一位喜歡音樂的人，但今天想關注籃球圈的群組，你會怎麼請 AI Bot 幫忙呢？試試看把 prompt 改掉吧！

# 增加天氣 Open Data 功能

> 這部分範例參考 - [在 Cloud Run 上部署有 Open Data 功能的 LINE Bot | 摘要王, 天氣, 紅外線](https://nijialin.com/2024/04/30/line-bot-cloudfunction-firebase-gemini-workshop-weather/) 文章上的內容

[範例 code 在此](https://gist.github.com/louis70109/d165be10be06d71708804e89410c969e)，這邊需要準備的部分:

- 要到中央氣象局申請 API Key (`需要註冊`且拿到`授權碼`)
  - 天氣 Open Data json 下載位置：https://opendata.cwa.gov.tw/dataset/forecast/F-A0010-001
  - API 位置：https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001
- requirements.txt 裡面的套件需要加入 requests
- 將 API Key 放入環境變數 `OPEN_API` 當中
- 將相關的 code 貼上
- 在 Chatbot 中加入判斷式測試
- 再次部署 Cloud Functions

> [參考作法](https://github.com/louis70109/skatepark-CCTV-line/blob/main/main.py#L113)

<script src="https://gist.github.com/louis70109/d165be10be06d71708804e89410c969e.js"></script>

# 衛星雲圖 - 是否有雲層

![](https://nijialin.com/images/2024/gemini-workshop/cloud-on-taiwan.png)

有時候光看氣象根本不準，外面雨到底要不要下呢？ 請 Gemini vision 來幫忙看看台灣上方是否有大量雲層經過

- 先天限制：兩個小時內會有圖片，當前時間的前十分鐘不會有照片
  - ex: 當前是 14:30，14:20~14:30 都不會有照片
  - 可以試著用時間套件+判斷式來檢測

> 參考以下 code，請在專案中的 chatbot 判斷式中加入程式 &套件放入 `requirements.txt`:

<script src="https://gist.github.com/louis70109/696d064f3d40a676d6326e921c20843e.js"></script>

# 活動小結

立即加入「LINE 開發者官方社群」官方帳號，就能收到第一手 Meetup 活動，或與開發者計畫有關的最新消息的推播通知。▼

「LINE 開發者官方社群」官方帳號 ID：[@line_tw_dev](https://qr-official.line.me/gs/M_908lugfe_BW.png)

<img src="https://qr-official.line.me/gs/M_908lugfe_BW.png" width="200" height="200">

# 關於「LINE 開發社群計畫」

LINE 於 2019 年開始在台灣啟動「LINE 開發社群計畫」，將長期投入人力與資源在台灣舉辦對內對外、線上線下的開發者社群聚會、徵才日、開發者大會等，已經舉辦 30 場以上的活動。歡迎讀者們能夠持續回來查看最新的狀況。詳情請看:

- [2021 年 LINE 開發社群計畫活動時程表](https://engineering.linecorp.com/zh-hant/blog/2021-line-tw-devrel/)
- [2020 年 LINE 開發社群計畫活動時程表](https://engineering.linecorp.com/zh-hant/blog/2020-line-tw-devrel/)
- [2019 年 LINE 開發社群計畫活動時程表](https://engineering.linecorp.com/zh-hant/blog/line-taiwan-developer-relations-2019-plan/)
- [LINE Taiwan Developer Relations 2019 回顧與 2019 開發社群計畫報告](https://engineering.linecorp.com/zh-hant/blog/line-taiwan-developer-relations-2019/)

<style>
  section.compact {
    font-size: 150%  
  }
  img[alt~="center"] {
    display: block;
    margin: 0 auto;
  }
</style>
