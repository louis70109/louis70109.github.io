---
title: Day11 - LINE 的服務都玩了，怎麼能忘了 Message api (Bot) 呢？ (2) - 申請一步步
tags:
  - LINE
  - chatbot
  - Message api
categories: 2019鐵人賽
abbrlink: 2397270806
date: 2019-09-25 20:38:18
---

## 前言

今天會帶大家如何一步一步的建立 Message api 以及需要注意設定的地方。

## 實作

1. 首先先到 https://developers.line.biz/zh-hant/ ，點選右上角的大頭貼並選擇 `Add new provider`
   ![](https://i.imgur.com/ZDumwCq.jpg)
2. 接著在 Provider name 填上自己的想要的名稱
   ![](https://i.imgur.com/JrSgcQO.png)
3. 再次確認
   ![](https://i.imgur.com/D86u1mQ.png)
4. 選擇想要使用那種服務，這邊我們就選擇`Message API`並按下`Create Channel`
   ![](https://i.imgur.com/8WA1uER.png)
5. 接著就開始填寫自己的機器人(channel)所需要的資訊嚕！
   ![](https://i.imgur.com/VQWPJtn.png)
6. 這邊我們需要填寫的內容為
   6.1. 大頭貼(option)
   6.2. 名稱 App name (required)
   6.3. 描述 app description (required)
   6.4. 類別與子類別 Catagory (required)
   6.5. 信箱 Email address (required)
   6.6. 政策網址 Policy URL (option)
   6.7. 服務條款網址 Term of use URL (option)

![](https://i.imgur.com/0Wj570j.png)
![](https://i.imgur.com/7TW5dzU.png)

---

7. 當填寫完之後的寫一步最後會需要勾兩個服務說明確認的選項並按下 Create
   ![](https://i.imgur.com/VsLYgJK.png)
8. 如此一來就看到自己百般折騰建立出來的 Message api 啦
   ![](https://i.imgur.com/6tBdbEa.png)
9. 滑到最下面，首先掃描 QR code 加入自己機器人的好友讓接下來好測試，接著按下圖篇右手邊的 Set message 進入調整頁面
   ![](https://i.imgur.com/wTxU7FM.png)
10. 進入之後到下面，將**歡迎訊息** & **自動回應** `停用`，並將 **Webhook** 打開，讓之後的串接可以透過 Webhook 打到 Serverless 上，若是前兩個回應的選項沒有關的話即使 Webhook 有啟動也會因為優先權問題被擋下來哦！
    ![](https://i.imgur.com/gS2k9ZP.png)
