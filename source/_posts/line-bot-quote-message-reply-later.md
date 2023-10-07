---
title: 如何有效使用 Quote Message
tags:
  - Quote Message
  - 回覆訊息
  - LINE Bot
  - Push Message
categories: LINE
date: 2023-10-08 00:01:20
---


# 前言

![quote message](https://nijialin.com/images/2023/quote/1.png)

近期 Messaging API 釋出了許久以前期待的 API - 回覆訊息(Quote Message)，讓 LINE Bot 回覆用戶時可以指定特定訊息(如上圖)，在生成式 AI 當下是個非常好用的一個功能(AI 需要運算時間)，接下來就快速跟大家介紹一下相關功能以及操作方式！

> 新聞：[You can now send and receive quote messages using the Messaging API](https://developers.line.biz/en/news/2023/09/14/send-and-receive-quote-messages-using-the-messaging-api/)

<!-- more -->

# Quote Message 介紹

操作時主要有三個元素需要注意：

1. [從 webhook 當中收到 Quote Message](https://developers.line.biz/en/news/2023/09/14/send-and-receive-quote-messages-using-the-messaging-api/#update-20230914-02)
2. [取得 Quote Token](https://developers.line.biz/en/news/2023/09/14/send-and-receive-quote-messages-using-the-messaging-api/#update-20230914-03)
3. [透過 Push Message 來發送 Quote](https://developers.line.biz/en/news/2023/09/14/send-and-receive-quote-messages-using-the-messaging-api/#update-20230914-01)

透過上面三個步驟，就可以發送回復訊息啦！但大家操作起來會覺得為什麼不用 reply message 就好，平常回覆都很快啊？使用他有什麼優點嗎？

大家可以在這停一下思考個，平常在打字跟朋友聊天時也不一定每一則都會按下回覆。同理到了 LINE Bot，在跟用戶互動時，偶爾穿插個 Quote 也會讓用戶覺得這官方帳號非常用心，甚至可以搭配 [Icon Switch API](https://developers.line.biz/en/docs/messaging-api/icon-nickname-switch/#specifying-icon-and-display-name) 也會別有一番風味喔

## [Quote message 範例](https://github.com/louis70109/linebot-find-some/blob/main/main.py#L108)

Quote Message 是以 Push Message 的方式使用，可以從 Reply 的 webhook 當中收到 quote token([開發文件](https://developers.line.biz/en/reference/messaging-api/#send-reply-message-response))，接著在 Push 時帶上 token，即可針對指定的訊息回覆：

```python
await line_bot_api.push_message(push_message_request=PushMessageRequest(
      to=event.source.user_id,
      messages=[TextMessage(
          text=tool_result,
          quoteToken=event.message.quote_token)],
  ))
```

![quote message2](https://nijialin.com/images/2023/quote/2.png)


> 分享個使用案例：當大家串接生成式AI時，因為那邊運算普遍會比較慢些，因此可以把 AI 那邊的 code 另外處理，先透過 Reply Message 先請使用者稍等，後續在透過 Push Message 來回覆指定訊息，如此以來用戶在看訊息時就會比較清楚該訊息是回覆哪一則而不會錯亂～
> 參考程式碼: [GitHub URL](https://github.com/louis70109/linebot-find-some/blob/main/main.py#L99)

# 結論

一方面透過回覆訊息(Quote)可以讓用戶知道現在 LINE Bot 是針對哪個訊息作回覆；另一方面，也可以讓處理較慢的程式碼另外在 Queue 裡面操作，等到處理完成後在另外回覆，相關的操作皆是看大家在開發 LINE Bot 時的 user story，如果這篇文章有幫助到你，歡迎分享出去唷！感謝大家的觀看✍️

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
