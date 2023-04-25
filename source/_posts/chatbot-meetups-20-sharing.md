---
title: 【Chatbot Taiwan 20】這次參加我又學到了什麼呢 @ LINE
tags:
  - Chatbot
  - LINE
categories: 研討會
abbrlink: 19807
date: 2020-06-24 02:54:28
---

![](https://i.imgur.com/eaU663s.png)

# 前言

疫情穩定並解封後終於迎來期待已久的第 20 場小聚，且這次更是來到我最喜歡的熊大寶殿 - LINE 裡頭辦活動，感謝場地方贊助熊大、美食、飲料讓大家吃飽喝足，並且我們邀請了許多大大來分享超超超精實的議程!!

社群：https://www.facebook.com/groups/chatbot.tw/
共筆：https://hackmd.io/@chatbot-tw/meetups-020
直播回顧：https://youtu.be/VxcpDFHWOb8?t=2146

那接下來就分享本次我參加的心得囉！🙂

<!-- more -->

# Keynote 1 - LINE API Update - Evan Lin

> 直播錄影網址：https://youtu.be/gtpm4zKlsXI

首先 LINE Taiwan 資深技術推廣工程師 Evan 為我們帶來 LINE API 六月的更新介紹。

<script async class="speakerdeck-embed" data-id="8517c0f0cbba4a18854c672827f71d86" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

> [簡報](https://speakerdeck.com/line_developers_tw/room-api-demo)

- 06/09 Flex Message Simulator 教學文件釋出囉
- 06/10 LINE API Update
  - Get group summary
  - Get members in group count
  - Get members in room count
- 06/15 LINE Login 可以透過連結(link)到 Official Account
- 06/15 LIFF SDK error code

## [群組] Get group summary & Get members in group count

以往機器人只能取得個人資訊，而六月提供了這個 API 可以取得群組的資訊，跟使用者的資料格式差不多：
![](https://i.imgur.com/3xEHM49.png)

多了這個功能後能讓機器人在面對各個群組時能更有效地在後端管控來源群組，並且透過 `Get members in group count` 這個 API 來取得當前人數，做出類似行銷後台那樣讓使用者可以看到更完整的資訊。

> Tip: 一個群組只能一隻機器人喔！

## [聊天室] Get members in room count

聊天室與群組的差異在於他不可以踢人，而功能上與群組差不多，一樣可以加機器人進來，可以透過這 API 知道當前群組有多少人，一樣可以管理除了群組以外的`聊天室們`。

## Demo

LINE bot group 範例(Golang): https://github.com/kkdai/linebot-group

QR COde (部屬於 Heroku)：
![](https://i.imgur.com/qbUsN2z.png)

## 小技巧

<script async class="speakerdeck-embed" data-slide="10" data-id="8517c0f0cbba4a18854c672827f71d86" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

### Join type

常常會機器人加入群組後會發出一個`歡迎訊息`，透過 API 的方式會看到 JSON 裡有個 `type` 的欄位，判斷它是否為 `join` 即可回傳歡迎訊息。

另外說明文件有提到，若是 room(聊天室) 需要在其他使用者發送文字(event) 觸發才能讓機器人第一次收到訊息後回傳歡迎訊息。

### 如何確認 Group & Room

<script async class="speakerdeck-embed" data-slide="11" data-id="8517c0f0cbba4a18854c672827f71d86" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

當機器人收到 event 時，在當中的 `source` 會有 type 來放入當前是何種性質的群組。

## 小結

透過每個月的講解讓大家都可以更清楚的了解到 LINE 的更新進度並獲得第一手消息，想知道更多訊息歡迎持續關注社團喔！

LINE 若有更新時都會同步到 [GitHub issue](https://github.com/line/line-bot-sdk-python/issues/271) 上，所以不仿追隨一下有新的 issue 時就能第一手收到通知並送 PR 當貢獻者喔！

# Keynote 2 - [專為高中生設計的管家型聊天機器人 - 廖煥杰](https://drive.google.com/file/d/10Qd-XvznwN_qVkZj2gXK3eLT3PPTqvc3/view?usp=sharing)

> 直播錄影網址：https://youtu.be/HTXvpKWyNHE

這個議程由高二的煥杰來分享，首先為什麼會做這個機器人三個主要原因：

- 同學常常忘了帶考師準備的書籍。
- 提醒學生未來幾天的考試行程，幫大家決定今天要帶的書回家。
- 讓大家有效學習。

## 設計理念

- 為了避免被亂搞需要權限控制
- 放學推播功能
- 學校、老師有權限可以看到所有人的體溫

## 遇到的問題

當中講者也提到他們 SQL 的進化史，由於 google spreadsheet 每 100ms 只能有 100 請求導致服務出問題，因此就搬到 MySQL 上。

當中也因為遇到疫情的關係所以開發出`體溫回報系統`，也有因為自己需求的關係而開發`放學前會推播今天的作業`，讓大家可以帶相關參考書回家。

也需要依照不同季節提供不同的 Richmenu 選單。

## 未來展望

- 人臉辨識結合體溫測量
- 重構程式碼，讓城市更漂亮
- 評估改用 No SQL 來降低成本與請求速度
- 網頁管理介面
- 推廣到全台灣高中

> [Github](https://github.com/cbfhss)

## 小結

很有想法的高中生，從生活中解決需求一直都是一個好的方向去實踐專案，希望這隻機器人可以趕快完成未來展望的部分，期待繼續在社團露臉 😁。

# Keynote 3 - [LIFF & Firebase - Richard Lee](https://docs.google.com/presentation/d/1ZJIDpw9Cmte_9w1NxKHxzXtoaFBXsKVH7tQd4zlvb8k/edit?usp=sharing)

![](https://i.imgur.com/pApsiyi.png)

> 直播錄影網址： https://youtu.be/U_nPlkTuk9s

一開始提到 LINE 在剛開始推出 LIFF 時其實沒那麼好用，然而隨著時間的推移 LINE 有聽到大家的心聲持續更新到今日挺好用的地步，也開發出特別的功能 - share target picker 來分享訊息，也因為類似的功能讓 LIFF 介於聊天機器人與行動網頁之間，且隨之而來 LIFF v2 也開始支援 web 囉！

基本上 LIFF 的組成為 一個一般的 web app + LINE 的 "user credentials" 以及透過 SDK 去 get profile / send message。

## Why Firebase hosting

他有以下幾個特性：

- 可以放置 web page
- 幫助網頁開發的功能
- 分析工具(FCM）
- Firebase is a collection of mobile-related products
- 一上去全球部署(CDN)，機房就在台灣/香港
- No cold start

在一番的火力展示後讓我瞭解到 Firebase 的完整性，其功能不僅擁有像是 AWS S3 的功能，同時擁有像是 AWS Lambda 的功能，並能夠在前端頁面 real time 去更新資料庫裡的值，讓大家能在這裡見識到這部分真的是賺到了！

## Firebase Auth / Security rules

設計再好的產品都會有沒注意到的地方，總不能讓我們放置的 LIFF 網頁被人家輕易的挖走東西，因此 Firebase 提供安全認證相關的機制，管理人員處理`新增`、`刪除`這類較危險的操作。

## 小結

能夠聽到含有 LAE & GDE 認證的專家分享這麼精實的內容實在是很賺，從中完美整合了 LINE 以及 Google 的服務讓我歎為觀止，讓我新的目標可以學新東西了！

# Keynote 4 - [對話式表單架構設計 - 郭佳甯](https://docs.google.com/presentation/d/1np4_d6grkw6kMD-jSnMFFj2yH8FwT2SaEdNKKfA0w7w/edit)

> 直播錄影網址：https://youtu.be/ScLQeFIJjLE

本次再度邀請卡米哥前來分享主題，這次的主題很常會在討論區出現，在表單設計上一定是網頁(LIFF)來處理是較妥當的，但總不會每個需求都這麼完美，因此本次就分享在 Chatbot 上得多輪對話設計架構。

![](https://i.imgur.com/OIb1vz9l.png)

對話式表單常會有以下需求：

- 多欄位填寫
- 表單驗證
- 代換詞(縮寫)
- 對話跳脫

利用了點飲料的需求清楚講解並帶大家認識整個對話的流程，接著就帶大家認識 DialogFlow，之前我有參加 chatbot taichung 工作坊，可以[參考文章](https://medium.com/@nijia.lin/chatbot-taichung-2-%E5%B7%A5%E4%BD%9C%E5%9D%8A%E5%BF%83%E5%BE%97%E5%88%86%E4%BA%AB-bc964fdc07c3)中的做法實作(細節可能有改要注意)。

它帶來的好處可以迅速建立多欄位表單，但經由實測後有時跳脫後對話會跳不回去導至錯亂，且講者認為 Context 用於對話是表單違反直覺。

## 認識[Bottender](https://bottender.js.org/)

最後提到了我也很常用的 Bottender，它的三個主要脈絡為 Action、Chain、Routing，細節可以[參考文件](https://bottender.js.org/docs/zh-TW/getting-started)

也因多輪對話需求越來越多，因此他們就有開出這樣的需求：
![](https://i.imgur.com/la39kaZ.png)

## proposal:

- registerAction: 註冊 Action
- getAction: 取得 Action
- prompt: 向用戶發問
- setField: 設定表單欄位
- deleteField: 刪除欄位

透過像是以上的 APIs 上開發者可以迅速建立對話式表單，並且處理`珍奶例子`的問題，雖然有提到 `缺乏高階語法糖`，但工具向來都是先求有再求好，也許未來會有不同的解決方案來處理這部分～

## 小結

透過生活中常遇到的例子帶入應用情境上讓大家更能融入其中，接著敘述實作上的問題並且提出目前如何處理這部分來解決必須在 Chatbot 中做對話的這件事上， 而 Bottender 持續貢獻於 open source 中，如果支持並有想贊助的朋友歡迎聯絡他們 🙂。

# 閃電秀

## 1. 奇步老爹（陳佳新）- [LIFF 圖片測試工具，設計師和工程師從此溝通無礙](https://www.slideshare.net/jarsing/20200623liffbgtester/jarsing/20200623liffbgtester)

> 直播錄影網址： https://youtu.be/q2E9W4RDGW0

在沒有設計師的情況下需要刻 UI 就只能使用工具，而講者即提供了 Chatbot 供大家測試使用。
![](https://i.imgur.com/LpSvuUAl.jpg)

操作流程：
![](https://i.imgur.com/NnegZEB.jpg)

## 2. 黃鈞亭 - [結合 LINE 和 Google Suite 來做定時回報系統](https://docs.google.com/presentation/d/1Xb6NWCLEqW5q74KOSjm51TWwokM-VXlBcOkpJqA2iTE/edit?usp=sharing)

> 直播錄影網址：https://youtu.be/v6BNMJv782c

因為軍中使用 LINE 回報時的 race condition 問題而讓講者動身實作一隻機器人處理問題，透過填寫 google 表單的方式也不會出現像前面講者所遇到的多輪對話問題。

架構:
![](https://i.imgur.com/KJdu5qd.png)

Github source: https://github.com/chungthuang/line-report-bot

## 臺北科技大學 - 即時通智慧攝影機(EdgeTPU 碰上 LINE Bot)

> 直播錄影網址：https://youtu.be/4QcxQLVgiso

主要解決讓不熟 APP 但熟悉即時通訊軟體的使用者來串接攝影機功能，結合 google 新出的開發版並讓使用者掃描裝置上的 QR Code 跟 LINE 做綁定，接著攝影機開始偵測後若發現有人經過時則會 push message 給用戶告知有問題。

# 結論

超精實的一天，難得疫情後的線下小聚還有 LINE 贊助場地與餐點，把握這次機會再次北上與大家一起舉辦社群活動，促進資訊交流並認識大家，接下來社群還是會持續舉辦月聚，請大家持續關注社群，會將第一手資訊發出來讓大家知道 🙂。
