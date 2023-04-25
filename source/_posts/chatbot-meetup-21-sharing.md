---
title: "LINE 開發社群計畫: 2020 六月與七月 LINE 平台更新總整理"
tags:
  - DevRel
  - LINE
categories: 研討會
date: 2020-07-23 01:43:51
---

# 前言

大家好，我是 LINE Taiwan 的 Tech Evangelist – NiJia Lin。這次很開心 DevRel 團隊受到 chatbot 社群的邀請，參加了 「Chatbot meetup 聊天機器人小聚 21 @ On-ramp Studio」 的聚會活動，並且分享 LINE API 更新的心得。在此也跟各位分享本次參與的心得，並且也希望透過社群分享的力量能夠讓聊天機器人的開發動能更加的盛大。

社群 Chatbots Meetup： https://chatbots.kktix.cc/
本次活動網頁: https://chatbots.kktix.cc/events/meetup-021
本次活動的共筆紀錄： https://hackmd.io/@chatbot-tw/meetups-021

由於 Chatbots Meetup 本身屬於社群自主性的活動，裡面也有許多社群朋友所贊助的閃電秀。裡面的所有內容也是相當的難得與有趣。也希望能夠透過本篇文章讓大家稍微了解 Chatbots Meetup 社群閃電秀的魅力。

這次活動總算又回到 LINE 台灣的辦公室來舉辦，同時這也是疫情後 LINE 辦公室第一次舉辦線下的聚會。希望透過這次的聚會可以讓更多朋友了解到打造自己的聊天機器人是如此讓人開心的事情。

### 整場分享的影片：

<iframe width="560" height="315" src="https://www.youtube.com/embed/8Lu4LHKSMlo?controls=0&amp;start=335" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<!-- more -->

## LINE Platform 平台 2020 六月 & 七月更新

![](https://i.imgur.com/0KghM9l.jpg)

#### [投影片](https://speakerdeck.com/line_developers_tw/line-api-platform-update-202007)

<script async class="speakerdeck-embed" data-id="279ac2f6f39348c482533ff9f12568d0" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

### 6/22 API Update

在 6/22 的更新當中我們 Issue access_token 的功能([參閱](https://developers.line.biz/en/reference/messaging-api/#issue-channel-access-token-v2-1)除了可以拿到 chatbot 中 JWT 樣式的 access_token，裡面還有一個 unique 的 key_id 欄位，並且可以使用這個新的 API - [Get all valid channel access token key IDs v2.1](https://developers.line.biz/en/reference/messaging-api/#get-all-valid-channel-access-token-key-ids-v2-1) 去找到所有的 kid，除了來並交叉比對你手上所擁有的 access_token 中的 kid 是否有吻合其中一把鑰匙，也可以從中得知已經 issue 多少 access_token 出去囉！

以下是 Get all valid channel access token key IDs v2.1 的流程圖：
![](https://i.imgur.com/LEAYqrL.png)

<script async class="speakerdeck-embed" data-slide="3" data-id="279ac2f6f39348c482533ff9f12568d0" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

需要注意的部分就是 Get all valid channel access tokens v2.1 的 API 會在 7/22 後就會被棄用，因此若使用相關功能的朋友還是建議可以使用 [Get all valid channel access token key IDs v2.1](https://developers.line.biz/en/reference/messaging-api/#get-all-valid-channel-access-token-key-ids-v2-1) 這隻 API 哦！

### [06/29 LIFF v2.3.0 released](https://developers.line.biz/en/news/2020/06/29/release-liff-2.3/)

#### Concatenate & Replace 模式

<script async class="speakerdeck-embed" data-slide="5" data-id="279ac2f6f39348c482533ff9f12568d0" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

在前一個版本中會遇到 Query parameters 於雙系統(iOS/Android)都有問題，甚至會將參數放在 `liff.state=` 上造成問題產生。

而這次的更新中可以在 LIFF 的網址中使用子路徑(`/path`)以及 Query parameters (`?key=value`)，並且解決掉將參數放進 `liff.state=` 的問題 ，解決掉以往較困擾的問題。

在 LINE Developers console 中增加了兩個模式 `Concatenate` 以及 `Replace`，更新之前就已經存在的 LIFF page 則被換到 `Replace` 上，而新建立的 LIFF page 往後預設為 `Concatenate`。

若你已有相關的 workaround implementation 並且暫時不想更新的話則就繼續使用 `Replace` 模式。

> 請注意：iOS 版本必須在 10.11 之後 以及 LIFF SDK 需使用 v2.3.1。

#### liff.permanentLink.createUrl() 的 exception 方法使用介紹

若抓到當前網址與實際 Endpoint 不符的話，liff.permanentLink.createUrl() 會在 exception 中告知狀態。程式碼如下：

```
try {
    const myLink = liff.permanentLink.createUrl()
}
catch (err) {
    console.log(err.code + ':' + err.message);
}
```

若不太清楚的話可以參考下圖範例試試看將 webhook 設定一個基本路由(`/bbb`)，若在原始路由後加個子路由(`/cc`)，則這樣是沒問題，但若將原始路由的路徑(`/bbb`)刪除改成`/ccc`的話就會跳到錯誤中了：
![](https://i.imgur.com/Fb1pRy6.png)

#### liff.shareTargetPicker 已經可以抓出錯誤囉！

<script async class="speakerdeck-embed" data-slide="8" data-id="279ac2f6f39348c482533ff9f12568d0" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

shareTargetPicker 之前的版本無法知道是否已經送出，在這次的 2.3 release 中可以在程式碼內部得知 shareTargetPicker 的狀態並讓開發者去 handle message。

#### liff.sendMessages() 增加了 LiffError 的 spec 囉！

<script async class="speakerdeck-embed" data-slide="11" data-id="279ac2f6f39348c482533ff9f12568d0" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

這次的更新中在 sendMessage 的 catch Promise 中可以抓出 `error code` 是否屬於 "INVALID_ARGUMENT" 的 Liff Error 型別，透過這個參數開發者也能更好的去掌握錯誤的發生。

### 6/30 Beacon Leave Event 將之後被棄用

因為訊號以及不精準的關係，Beacon Event 在 6/30 之後會把 Leave Event sunset 掉，也讓大家可以有時間可以使用其他替代啷案解決此問題。

而 Stay Event 現在則是變成每十秒就會去檢查附近的 Beacon 是否已經被 ping 過了，進而做邏輯判斷。

### 07/01 LIFF SDK npm package

在 7/1 前調查時大部分意見是希望有 LIFF 自己的 npm package，但也因為現在還 non-production，因此大家使用上需要留意，若有任何問題歡迎發 issue 給我們 🙂。

### 07/15 LIFF Header 新釋出！

<script async class="speakerdeck-embed" data-slide="14" data-id="279ac2f6f39348c482533ff9f12568d0" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

這次的更新中因為許多開發者並未將 LIFF Icon 加上去，因此在種種考慮下我們選擇移除了這個 Icon，並且新增了一個分享(Share)的按鈕，當中可以將當前 LIFF page `分享`給其他好友，並且也擁有`重新整理`的按鈕，讓開發者可以不用一直關閉在開啟測試囉！

## 小結

LINE FRESH 2020 的校園競賽開始囉！若想要挑戰的朋友千萬別錯過，這次競賽中有`商業行銷`&`黑客松`組，可依照挑戰選擇參加喔！

<script async class="speakerdeck-embed" data-slide="15" data-id="279ac2f6f39348c482533ff9f12568d0" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

LINE PROTOSTAR 與台北商業大學合作的對話機器人設計大賽也可以開始投稿囉，若你的創意覺得不錯的話趕快來參加競賽，說不定有機會拿到高額獎金喔！

<script async class="speakerdeck-embed" data-slide="16" data-id="279ac2f6f39348c482533ff9f12568d0" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

## LINE Bot with Rasa Open Source

<script async class="speakerdeck-embed" data-id="e7b8ca6a36b94af0b5977e34b0ec3a30" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

## 結論

社群分享永遠是讓創意激盪的最佳方式，而 Chatbots Meetup 是一個很熱情與充滿創造力的社群組織。也希望有更多有創意的開發者願意加入 LINE Chatbot 的開發行列，更希望能熱情的參與社群的活動與一起來分享。

立即加入「LINE 開發者官方社群」官方帳號，就能收到第一手 Meetup 活動，或與開發者計畫有關的最新消息的推播通知。▼

「LINE 開發者官方社群」官方帳號 ID：[@line_tw_dev](https://lin.ee/s5RsZHo)

![](https://www.evanlin.com/images/2020/line-tw-dev-qr.png)

## 關於「LINE 開發社群計畫」

LINE 今年年初在台灣啟動「LINE 開發社群計畫」，將長期投入人力與資源在台灣舉辦對內對外、線上線下的開發者社群聚會、徵才日、開發者大會等，已經舉辦 30 場以上的活動。歡迎讀者們能夠持續回來察看最新的狀況。詳情請看:

- [2019 年 LINE 開發社群計畫活動時程表](https://engineering.linecorp.com/zh-hant/blog/line-taiwan-developer-relations-2019-plan/)
- [LINE Taiwan Developer Relations 2019 回顧與 2019 開發社群計畫報告](https://engineering.linecorp.com/zh-hant/blog/line-taiwan-developer-relations-2019/)
- [2020 年 LINE 開發社群計畫活動時程表](https://engineering.linecorp.com/zh-hant/blog/2020-line-tw-devrel/)
