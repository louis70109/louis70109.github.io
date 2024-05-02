---
title: '在 Cloud Run 上部署有 Open Data 功能的 LINE Bot | 摘要王, 天氣, 紅外線'
tags:
  - LINE
  - Cloud Run
  - Open Data
categories: GCP
date: 2024-04-30 18:13:37
---

![](https://nijialin.com/images/common.jpeg)

# 前言

此為 Cloud Run + Firebase + Gemini 工作坊中的操作文，如果有興趣針對有記憶能力的 LINE Bot 以及整合各方 Open Data 歡迎參考以下的內容

<!-- more -->

# LINE Bot & Gemini Pro 設定細節請參考: [旅行小幫手 LINE Bot 文章](https://www.evanlin.com/linebot-cloudfunc-firebase-gemini-workshop/)

## 事前準備

![](https://nijialin.com/images/2024/gemini-workshop/image-20240410165104899.png)

- [LINE Developer Account](https://developers.line.biz/en/): 你只需要有 LINE 帳號就可以申請開發者帳號
- [Google Cloud Run](https://cloud.google.com/run?hl=zh-TW)： Python 程式碼的部署平台，生成供 LINE Bot 使用的 webhook URL
- [Firebase](https://firebase.google.com/)：建立 Realtime database，LINE Bot 可以記得你之前的對話，甚至可以回答許多有趣的問題
- [Google AI Studio](https://aistudio.google.com/app/prompts/new_chat): 可以透過這裡取得 Gemini Key
- GitHub: Clone 專案部署的地方 - [linebot-gemini-summarize](https://github.com/louis70109/linebot-gemini-summarize)

## 關於 Gemini API Price

根據官方網站： https://ai.google.dev/pricing?hl=zh-tw

![](https://nijialin.com/images/2024/gemini-workshop/image-20240412195805278.png)

> 細節請參考: [旅行小幫手 LINE Bot 文章](https://www.evanlin.com/linebot-cloudfunc-firebase-gemini-workshop/)

# 先部署 - 從 Cloud Run 介面來連結 GitHub 持續部署

1. 首先先 fork 專案 - [linebot-gemini-summarize](https://github.com/louis70109/linebot-gemini-summarize)，方便後續操作
2. 接著到 [Cloud Run 首頁](https://console.cloud.google.com/run?referrer=search&hl=zh-tw)，點選上方的`建立服務`

![](https://nijialin.com/images/2024/gemini-workshop/select.jpeg)

3. 選擇外部資源(GitHub)，從專案中來偵測部署，此步驟後續會連動 GitHub

![](https://nijialin.com/images/2024/gemini-workshop/detail.jpeg)

4. 此步驟需要確保`認證`以及`Ingress control` 的部分，因為從 LINE 伺服器打來的流量對 Google Cloud 來說都是外來的，因此需要確定選項

![](https://nijialin.com/images/2024/gemini-workshop/env_setting.png)

5. 在部署之前，需要先設定環境變數，避免後續部署失敗；把該放入的環境變數放入
   1. 環境變數清單請看 [GitHub URL](https://github.com/louis70109/linebot-gemini-summarize/blob/main/.env.sample)
   2. LINE bot / GEMINI pro / Firebase 的取得詳細請往前看 `事前準備`
   3. API_ENV 需要為 `production`，否則會找 .env 檔案位置

![](https://nijialin.com/images/2024/gemini-workshop/github_ci.jpeg)

6. 在部署的同時可以到 GitHub 專案上看看部署的連動狀態，如此一來只要 GitHub 專案只要有更改，就會自動部署過去 Cloud Run

![](https://nijialin.com/images/2024/gemini-workshop/complete.jpeg)

完成之後就可以在 Cloud Run 介面上看到 Container 建立完成也部署上去

# 摘要王 v2

在 2022 年底，Evan 寫了一篇如何透過 ChatGPT + LINE Bot 的[群組摘要王文章](https://engineering.linecorp.com/zh-hant/blog/linebot-chatgpt)，如今用 Gemini Pro 再做一次效果也會差不多，當時的作法是用 Golang 的 queue 方式去處理，以下介紹另一個作法 - 用 Firebase 當作對話 session 的儲存位置，實現記憶這件事

[2023/11/06 訊息摘要功能上線！用 AI 總結社群聊天室訊息！](https://line-tw-official.weblog.to/archives/25515573.html)

這次做的摘要王主要用以下技術，設定細節請參考「[LINE OA + CloudFunction + GeminiPro + Firebase = 旅行小幫手 LINE 聊天機器人(2)： Firebase Database 讓 LINEBot 有個超長記憶](https://www.evanlin.com/linebot-cloudfunc-firebase-gemini-workshop2/)」：

- Firebase
  - 儲存對話歷史
- Gemini Pro
  - 透過 Firebase 的歷史對話，協助判斷
- 以下選填
  - Cloud Run: 部署用
  - Python: 快速開發

接著建立一個群組，並將剛剛建立的官方帳號邀請進去，此步驟需要到 LINE Dev Console 設定，否則會邀請不進去。

邀請進去後，群組內從 [LINE TODAY](https://today.line.me/tw/v3/tab) 中抓取新聞片段貼貼至群組中，接著打上 `!摘要` 讓 LINE Bot 幫你整理！

> 摘要王 v2 - [Sample code](https://github.com/louis70109/linebot-gemini-summarize/blob/main/main.py#L115)
> 試題：範例為列出五個項目，修改 prompt 找出群組的大家最近關注的事項

### 結果截圖

![](https://nijialin.com/images/2024/gemini-workshop/result.jpg)


# 整合天氣模組

- 天氣 Open Data json 下載位置：https://opendata.cwa.gov.tw/dataset/forecast/F-A0010-001
- API 位置：https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001
- `需要註冊`且拿到`授權碼`

> 請在專案中的 chatbot 判斷式中加入程式 & 套件放入 requirements.txt
> 抓取天氣 API 的 [Python code](https://github.com/louis70109/skatepark-CCTV-line/blob/main/utils/weather.py#L7)

## 紅外線圖 - 是否有雲層

![](https://nijialin.com/images/2024/gemini-workshop/cloud-on-taiwan.png)

有時候光看氣象根本不準，外面雨到底要不要下呢？ 請 Gemini vision 來幫忙看看台灣上方是否有大量雲層經過

- 先天限制：兩個小時內會有圖片，當前時間的前十分鐘不會有照片
  - ex: 當前是 14:30，14:20~14:30 都不會有照片
  - 可以試著用時間套件+判斷式來檢測

> 參考以下 code，請在專案中的 chatbot 判斷式中加入程式 &套件放入 `requirements.txt`:

<script src="https://gist.github.com/louis70109/696d064f3d40a676d6326e921c20843e.js"></script>

## 地板是否為濕的？ (Extra，需要透過爬蟲抓取 CCTV 影像)

如果你有常常需要外出的活動(跑步、滑板、打球...etc)，在台北經常需要確認天氣，除了看中央氣象局，可以透過 Gemini Vision 當作 OCR 用，判斷地板是不是濕的

> [SkatePark code](https://github.com/louis70109/skatepark-CCTV-line/blob/main/utils/common.py#L30)

> 以下的 code 的網址為範例，可以抓任何網址為 `.jpg` 結尾的丟進去試試看。
> 請在專案中的 chatbot 判斷式中加入程式 & 套件放入 requirements.txt

<script src="https://gist.github.com/louis70109/1c8f104eae54a3bcb23aad2347211064.js"></script>

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
