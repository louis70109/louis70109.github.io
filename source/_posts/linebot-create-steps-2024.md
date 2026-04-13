---
title: 如何透過新的建立方式，開啟你第一隻 LINE Bot 【2024/09/04】
tags:
  - LINE
  - LINE Bot
  - Backend
categories: LINE
date: 2024-09-04 19:00:51
---



# 前言

在 2024/09/04 發布關於 Messaging API 的建立方式有[所變更的新聞](https://developers.line.biz/en/news/2024/09/04/no-longer-possible-to-create-messaging-api-channels-from-console/)，過去因為 LINE Developer Console 與 Official Account Manager 皆可以建立官方帳號(LINE Bot, OA...etc)，導致大家很容易搞混。

而這次的更新當中，透過統一介面，讓大家可以可以在一樣的介面中建立官方帳號，至於詳細操作步驟請見下文 ✨

<!-- more -->

## TL;DR

1️⃣ 前往 https://entry.line.biz/form/entry/unverified
2️⃣ 簡訊 📱 驗證
3️⃣ 輸入 Channel 相關資訊
4️⃣ 前往 Official Account Manager 啟動 Messaging API
🏆 透過 Webhook 開始開發 👨‍💻
以上步驟，你學會了嗎？
Messaging API Channel 將在 2024 年 9 月 4 日 起正式變更！

📖 詳情請見：https://lin.ee/RSw9UxH/yltz

# 介紹

## 1. 前往我們熟悉的 [LINE Developer Console](https://developers.line.biz/console/)

![](https://nijialin.com/images/2024/linebot-create/1.png)

這邊先預設各位已經有建立過 Provider，然後選擇 **Create a Messaging API Channel**

> 如果對於 Provider 以及官方帳號之間的關係，歡迎參考這篇 - [【LINE Developers】 Provider 及 Channel 設定說明](https://tw.linebiz.com/manual/line-official-account/line-porvider-and-channel-intro/)

## 2. 引導至[新的建立入口](https://entry.line.biz/form/entry/unverified)

![](https://nijialin.com/images/2024/linebot-create/2.png)

由於統一入口的關係，這邊新增了一段敘述文字以及**建立按鈕**，讓大家可以到[新的建立入口](https://entry.line.biz/form/entry/unverified)去填寫相關資訊

## 3. 建立屬於你的官方帳號

![](https://nijialin.com/images/2024/linebot-create/3.png)

接著這步驟跟往常一樣，把該填的資訊填寫清楚，如果是測試帳號的話建議加入**前綴符號**(prefix)，避免與正式環境的官方帳號搞混喔！

## 4. 確認資訊是否有誤

![](https://nijialin.com/images/2024/linebot-create/4.png)

## 5. 建立完成！

![](https://nijialin.com/images/2024/linebot-create/5.png)

過往想升級官方帳號時都會找老半天，這次在這步驟可以選擇是否要升級官方帳號，減少操作人員的步驟～

若是想先開發測試的話，可以點選**稍後驗證**，前往 Official Account Manager

## 6. 同意條款

![](https://nijialin.com/images/2024/linebot-create/6.png)

由於 LINE 非常重視大家的使用權益，請大家在操作時務必閱讀相關條款喔

## 7. 如何啟用官方帳號的 Webhook?

![](https://nijialin.com/images/2024/linebot-create/7.png)

首先先來到[Official Account Manager](https://manager.line.biz/)，點選右方的**設定**，找到左邊的 **Messaging API** 選項，就會看到**啟用 Messaging API**的按鈕囉！

## 8. 選擇欲綁定的 Provider

![](https://nijialin.com/images/2024/linebot-create/8.png)

這邊可能操作人員會有點疑惑，剛剛不是已經在 Provider 裡面選了，怎麼沒有自動綁定？

因為好多時候一開始 Provider 大家還沒確定好就建立，透過這樣的設計，或許可以讓大家在啟用 Messaging API 時，可以想想要放那個 Provider 比較好～

## 9. 建立完成！
![](https://nijialin.com/images/2024/linebot-create/9.png)

這邊看到 Webhook 相關資訊之後，就代表可以開始開發囉！

## 10. 回 Developer Console 確認
![](https://nijialin.com/images/2024/linebot-create/10.png)

除了 Official Account Manager 那邊確定之外，也要記得回 Developer Console 確認一下官方帳號是否有建立完成，然後就可以拿 Channel Secret & Access Token 開始做事囉！

# 結論

透過本文的介紹，你已經學會了在 2024 年 9 月 4 日之後建立 Messaging API Channel 的步驟。你已經賣出了開發 LINE Bot 的第一步。現在你可以開始使用 Webhook 開發你的 LINE Bot 了！

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
