---
title: Day14 - LINE Richmenu 介紹
tags:
  - Richmenu
  - LINE
  - chatbot
categories: 2019鐵人賽
abbrlink: 772162306
date: 2019-09-28 20:42:52
---

Rich menu 是一個 LINE 提供給 chatbot 的圖文選單，可以再上面設定很多各式各樣的功能，下圖為一個範例
![](https://i.imgur.com/AkZnaWs.png)

## 優點

- 擁有長板 & 短板的圖片支援，讓一張圖片不再是一張圖片，機器人看起來可以更有品牌風格，根據 User 喜好、訂閱功能或是下一頁 Menu(即時切換)等等不同創意巧思，且可以客製化圖片讓機器人看起來有更不一樣的特色，也讓對話是互動並不限於對話，而圖片來讓使用者可以更直觀地去使用機器人。
- 一個 Chatbot 可以設定 1000 組的功能選單
- 針對不同 user ID 顯示不同功能選單
  Rich menu 可以自己設計圖片並上傳，再透過 JSON 的樣式去設定圖片區間要進行各種用途，這邊使用 Youbike 小幫手為範例，設定很多相關的設計，並設計上下頁的選單提供像是 APP 的操作。
  ![](https://i.imgur.com/kp3aYTWl.jpg)

## 限制

- 圖片格式: JPEG、PNG
- 圖片尺寸: 2500x1686, 2500x843, 1200x810, 1200x405, 800x540, 800x270
- 圖片大小: 1 MB

## 步驟

1. 先準備一個圖片
2. 對這個 API 下圖片每個位置要做什麼事 https://api.line.me/v2/bot/richmenu
3. 接著上傳圖片給 LINE https://api.line.me/v2/bot/richmenu/richmenu-{id}/content
4. 設定預設 https://api.line.me/v2/bot/user/all/richmenu/richmenu-{id}

## 結論

有很多的文章都有介紹過類似的功能，這邊簡介一下限制以及下篇要做的步驟～

- [設計一個功能選單](https://medium.com/%E6%89%BE%E5%88%B0%E4%BC%AF%E7%89%B9-find-your-bot/line-bot%E7%B3%BB%E5%88%97-%E8%A8%AD%E8%A8%88%E4%B8%80%E5%80%8B%E5%8A%9F%E8%83%BD%E9%81%B8%E5%96%AE-ea5f1d7cde94)
- [LINE 官方文件](https://developers.line.biz/en/docs/messaging-api/using-rich-menus/)

---

![](https://i.imgur.com/JlsLphHl.jpg)
