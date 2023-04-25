---
title: Day10 - LINE 的服務都玩了，怎麼能忘了 Message api (Bot) 呢？ (1) - 介紹
tags:
  - LINE
  - Message API
  - chatbot
categories: 2019鐵人賽
abbrlink: 1032560461
date: 2019-09-24 20:36:40
---

## 簡介

LINE 在 2016 年 9 月底發表了 Messaging API 功能，用戶可以透過 Messaging API 將自家的服務內容串聯到 LINE@ 上。

接著在 2019/04/18 之後 LINE@ 2.0 正式上線，在 5/22 後有升級的選項並會陸續更新，升級完的官方帳號也可以申請專屬 ID、進行帳號認證。

我認為比前一版本的最大的好處是在**好友無上限**的這部分，以前只能有 50 位好友，若一般開發者的機器人好不容易上線了並開放測試時被限制住，除了再開一隻機器人或是其他方法就超麻煩，現在好友無上限了，就不會有上述的問題了。

> 若您以前有開發過的機器人到現在還沒升級的話，可以參考 -> [URL](http://at-blog.line.me/tw/archives/lineat_manual_upgrade_02.html)

這邊需要注意 1 on 1 聊天與 Messaging API 是無法同時使用的，但可以在後台切換看要使用哪種模式與顧客互動。對話記錄也會保存在各自的模式下，若要查看完整的對話記錄的話會建議以固定模式與顧客進行互動哦！

### 主要的功能環繞在以下兩點

![](https://i.imgur.com/kqf5mo5.png)

1. **Push mode:** 主動推播訊息給用戶，2.0 每個機器人都有 500 則免費推播則數，超過則數的話可以參考以下的價目表：

![](https://i.imgur.com/7HJySLK.png)

2. **Reply mode:** 這個模式是接受使用者的訊息並透過 webhook 打到伺服器上讓伺服器去做對應訊息的處理，重點是它是是免費、免費、免費的！所以若能引導使用者去輸入訊息的話用這個模式是不用錢的哦 🎉

Message API 支援以下格式

- Text message
- Sticker message
- Image message
- Video message
- Audio message
- Location message
- Imagemap message
- Template message
- Flex message

> 詳細內容可以參考 [LINE doc](https://developers.line.biz/en/docs/messaging-api/message-types/)

![line sample 1](https://i.imgur.com/PLWylFy.png)
![line sample 2](https://i.imgur.com/lInGVV0.png)

## 回傳格式

Message API 回傳格式都是一個陣列的格式，一開始在接的時候都沒注意到一直瘋狂出錯，事實上這樣陣列對 Server 有個好處就是當一次需要送較多訊息時格式會比較統一，只是對於有潔癖的開發者來說每次都要多打`[0]`會覺得有點髒 🤣

```
{
  'events': [{
    'replyToken': '00000000000000000000000000000000',
    'type': 'message',
    'timestamp': 1568983962754,
    'source': {
      'type': 'user',
      'userId': 'Udeadbeefdaaaaefdeadbeefdeadbeef'
    },
    'message': {
      'id': '100001',
      'type': 'text',
      'text': 'Hello, world'
    }
  }, {
    'replyToken': 'ffffffffffffffffffffffffffffffff',
    'type': 'message',
    'timestamp': 1568983962754,
    'source': {
      'type': 'user',
      'userId': 'Udeadbeeaaaaefdeadbeefdeadbeef'
    },
    'message': {
      'id': '100002',
      'type': 'sticker',
      'packageId': '1',
      'stickerId': '1'
    }
  }]
}
```

## 結論

以前剛開始接 LINE Message API 的時候都覺得他的文件不太人性，更新到現在文件內容也越來完整，讓開發者在開發的過程中不用再為了找不到文件而放棄了(我以前就是 🤣)，下一篇將會帶來如何申請一隻機器人到如何建立一個 webhook API 到 AWS 上

## 參考

[功能介紹】Messaging API](http://at-blog.line.me/tw/messaging_api_intro)
[LINE message template](https://developers.line.biz/en/docs/messaging-api/message-types/)
