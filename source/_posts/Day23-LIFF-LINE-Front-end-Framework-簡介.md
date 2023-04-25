---
title: Day23 - LIFF(LINE Front-end Framework) 簡介
tags:
  - LINE
  - LIFF
categories: 2019鐵人賽
abbrlink: 615916051
date: 2019-10-07 21:01:58
---

## 介紹

LIFF (LINE Front-end Framework)顧名思義就是 LINE 開發在 LINE 這個通訊軟體裡面的 Web view(好饒舌)，他是一個很精簡的內建瀏覽器，主要是能夠讓開發者可以使用 HTML & Javascript 可以去處理一些在 bot 不好實現的功能，也讓開發者可以透過使用 JS SDK 去拉使用者的資訊，藉此可以做出更多種的應用。

網址的樣式都像是這樣`line://app/ZZZZZ-AAAAAAA`，透過 deep link 的方法讓 LINE 本身可以認得這個藉此去導向設定對應的網站，畢竟做平台的公司內部要互相溝通也是，就透過這種方法去讓不同部門的工程師可以互相使用好像也是不錯(?)

它也可以搭配在之前做的 LINE 服務上，Notify、Message api 上都可以串上去搭配不同種應用，而這個簡易的 Web view 有下面三種的顯示格式可以使用，開發者可以搭配不同應用場景去做搭配。
![](https://i.imgur.com/Z1TfxbN.png)

一開始都只能使用 curl 來增加項目，使用方法可以參考[這篇](https://medium.com/@danielkao/%E5%88%9D%E6%8E%A2-line-message-api-%E7%9A%84%E6%96%B0%E5%8A%9F%E8%83%BD-liff-51d5e7ff1a6a)，現在可以直接在 LINE Developer 頁面線上新增，像下圖片在這個頁面就可以新增了

```bash
curl -X POST \
-H "Authorization: Bearer YOUR_CHANNEL_TOKEN" \
-H "Content-Type: application/json" \
-d '{
    "view": {
        "type": "LIFF_SIZE",
        "url": "URL_OF_YOUR_APPLICATION"
    }
}' \
https://api.line.me/liff/v1/apps
```

![](https://i.imgur.com/t5G9gXh.png)

這邊推薦一個 [kamiliff](https://github.com/etrex/kamiliff)，卡米哥就用一個路由帶著 query string 來判斷，再轉打去其他 controller，如此一來就不需要為了每個頁面去獨立建立 LIFF，如此一來測試跟上線都很好管理，推薦大家去參考卡米哥的 kamiliff 的實作方法～

> 這個功能最大的好處就是可以在 LINE 裡面就可以直接用，若是把使用者導出頁面基本上**轉換率**以及**使用者體驗**一定會變很差，所以若是有在開發 LINE Bot 的話很推薦使用這個。

## 結論

以前我曾嘗試過使用 LIFF 使用 websocket 去跟 MQTT 溝通( IoT 裝置常常使用的通訊格式)，只是他的 websocket 似乎有開，但是總是沒有收到數值，這部分實作也是年初時使用，現在這時候就不知道能不能用了 🤣，若不行就期待哪天他能提供出這個服務了～

## 參考

[LIFF overview](https://developers.line.biz/en/docs/liff/overview/)
