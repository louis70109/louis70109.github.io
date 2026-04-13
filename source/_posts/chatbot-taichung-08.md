---
title: "LINE 開發社群計畫: Chatbot 台中小聚 08 - LINE platform 工作坊紀錄"
tags:
  - DevRel
  - LINE
categories:
  - 研討會
date: 2020-08-27 20:23:04
---

![all user](https://nijialin.com/images/chatbot.png)

# 前言

大家好，我是 LINE Taiwan 的 Tech Evangelist - NiJia Lin。這次很開心受到 chatbot 社群的邀請，參加了 "[中部人的 Chatbots Meetup 聊天機器人小小聚 #8](https://chatbots.kktix.cc/events/chatbots-meetup-in-central-taiwan-008)" 的聚會活動，並且分享 LINE API 更新與個人開發的心得。在此也跟各位分享本次參與的心得，並且也希望透過社群分享的力量能夠讓聊天機器人的開發動能更加的盛大。

- 社群 Chatbots Meetup： [https://chatbots.kktix.cc/](https://chatbots.kktix.cc/)
- 本次活動網頁: [活動網址](https://chatbots.kktix.cc/events/chatbots-meetup-in-central-taiwan-008)

由於 Chatbots Meetup 本身屬於社群自主性的活動，裡面也有許多社群朋友所贊助的閃電秀。裡面的所有內容也是相當的難得與有趣。也希望能夠透過本篇文章讓大家稍微了解 Chatbots Meetup 社群閃電秀的魅力。

<!-- more -->

# 投影片

<script async class="speakerdeck-embed" data-id="5fe13412f6ac4959a2bc468a90aa5b10" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

這次主題主要圍繞著三個平台實作

- LINE: 提供 機器人(Bot)/網頁(LIFF)/通知(Notify) 的服務
- Heroku: 部署的主機，會含有 Domain/服務套件(SQL、排程)
- GitHub: 放置程式碼的倉庫

搭配我已經寫好的專案: [LINE-subscribe-open-data-bot](https://github.com/louis70109/LINE-subscribe-open-data-bot)

> 整體使用 flask/Python 3.7、PostgreSQL 實作，若想在本地端起服務的話要有這兩個喔！

# Deploy to Heroku

首先需要先到我的專案 [LINE-subscribe-open-data-bot](https://github.com/louis70109/LINE-subscribe-open-data-bot) 按下右上角的 `Fork` (並且按星星 ⭐️) 回自己的 GitHub page。

<script async class="speakerdeck-embed" data-slide="9" data-id="5fe13412f6ac4959a2bc468a90aa5b10" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

在 Fork 專案到自己的帳號下之後，沿著 README 往下會找到 `Deploy to Heroku` 按鈕，按下去之後會被引導至 Heroku 部署的頁面，並輸入一個你喜歡的名字。

<script async class="speakerdeck-embed" data-slide="10" data-id="5fe13412f6ac4959a2bc468a90aa5b10" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>
<script async class="speakerdeck-embed" data-slide="11" data-id="5fe13412f6ac4959a2bc468a90aa5b10" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

等待部署結束後按下最下面的 `Manage app` 的按鈕會到達你剛剛建立的主機頁面 ，這邊會需要按下 `Configure Add-ons` 並加入兩個 Heroku 套件來輔助這次的實作：

- Heroku Scheduler
- Heroku Postgres

<script async class="speakerdeck-embed" data-slide="12" data-id="5fe13412f6ac4959a2bc468a90aa5b10" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

<script async class="speakerdeck-embed" data-slide="13" data-id="5fe13412f6ac4959a2bc468a90aa5b10" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

並且加入完套件之後再點一次 `Heroku Scheduler` 到達可以建立排程作業的地方，分別按下 Create Job 建立兩個 Job 並輸入：

- `python scripts/sync_to_sql.py`
  - 定期將資料同步到資料庫中，而第一次觸發時會建立 DB Tables。
- `python scripts/notify_me.py`
  - 定期發送以訂閱通知的用戶。

接著到 `Settings` 的頁面按下按鈕，這部分是填入環境變數的地方，且往下滑會看到 Heroku 送的 `Domain Name`(參考 17 頁)，待會會大量的使用到它，這個頁面就先保留停在這邊。

<script async class="speakerdeck-embed" data-slide="16" data-id="5fe13412f6ac4959a2bc468a90aa5b10" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

這邊先提前說明一下所有的環境變數用途：

```
// LINE bot 傳遞訊息時所需要的鑰匙
LINE_CHANNEL_ACCESS_TOKEN=
LINE_CHANNEL_SECRET=

// LINE Notify 的鑰匙以及 callback url
LINE_NOTIFY_CLIENT_ID=
LINE_NOTIFY_CLIENT_SECRET=
LINE_NOTIFY_REDIRECT_URI=

// 處理 LINE Notify 所使用的 LIFF page
LIFF_BIND_ID=
LIFF_CONFIRM_ID=

// 操作 Share Target Picker 需要使用的 LIFF page
LIFF_SHARE_ID=

// 在增加 Heroku Postgres Add-ons 時會自動加入的環境變數，若在本地端測試時則需要建立相關參數
DATABASE_URL=
```

# Massaging API

接著就要開始建立 LINE Bot 連動相關資訊，首先先到這個[LINE Developer Console](https://developers.line.biz/console/)頁面，建立一個 Provider(`100 channels per provider`)，並且把該填的部分填完。

<script async class="speakerdeck-embed" data-slide="19" data-id="5fe13412f6ac4959a2bc468a90aa5b10" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

接下來處理訂閱服務的 Messaging API(Bot)部分，在眾多服務選項中選擇第二個建立 Channel。

<script async class="speakerdeck-embed" data-slide="20" data-id="5fe13412f6ac4959a2bc468a90aa5b10" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

然後把該填的資訊填清楚 👍

<script async class="speakerdeck-embed" data-slide="21" data-id="5fe13412f6ac4959a2bc468a90aa5b10" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

在建立完後往下滑會看到 `Channel Secret`，將他複製起來放到 Heroku 環境變數的 `LINE_CHANNEL_SECRET` 欄位。

<script async class="speakerdeck-embed" data-slide="22" data-id="5fe13412f6ac4959a2bc468a90aa5b10" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

接著點選 `Massaging API` 的頁籤並至下方看到 LINE Official Account features 的地方並按下 `Edit` 到另一個設定頁面。

<script async class="speakerdeck-embed" data-slide="24" data-id="5fe13412f6ac4959a2bc468a90aa5b10" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

為了實作方便，由上到下依序為`停用`、`停用`、`啟用` 後將頁面關掉回到剛剛的 LINE Developer Console。

<script async class="speakerdeck-embed" data-slide="25" data-id="5fe13412f6ac4959a2bc468a90aa5b10" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

到最下面 Issue 一個 Channel Access Token 並一樣的複製到 Heroku 環境變數中新增一個 `LINE_CHANNEL_ACCESS_TOKEN` 的欄位並填入。

<script async class="speakerdeck-embed" data-slide="26" data-id="5fe13412f6ac4959a2bc468a90aa5b10" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

這部分是整隻機器人最重要的一個部分，填入 webhook URL，將 Heroku settings 頁面下面 Heroku 給的 Domain Name 複製到這個地方，並在網址後面加上 `webhooks/line`，下面的 webhook 開關也記得打開。

<script async class="speakerdeck-embed" data-slide="27" data-id="5fe13412f6ac4959a2bc468a90aa5b10" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

確認你的環境變數有沒有輸入正確 ❗️

<script async class="speakerdeck-embed" data-slide="29" data-id="5fe13412f6ac4959a2bc468a90aa5b10" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

# 建立 LIFF page

首先一樣先回到我們起初建立的 Provider 上並建立一個 LINE Login Channel，並且將必填欄位的資訊逐步打上，待會會需要在這 Channel 中建立三個 LIFF app。

<script async class="speakerdeck-embed" data-slide="31" data-id="5fe13412f6ac4959a2bc468a90aa5b10" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

在進入頁籤前，需點擊上面紅色框框的地方將這個 Channel 改成 `Published` 狀態，如此一來外部伺服器才會連結的到喔！

<script async class="speakerdeck-embed" data-slide="32" data-id="5fe13412f6ac4959a2bc468a90aa5b10" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

Published 之後到 LIFF 頁籤新增三個 LIFF pages，參考第 33, 34 頁的資訊並輸入以下的 app name 以及 Endpoint url：

- notify index
  - https://HEROKU_RUL/notify
- notify callback
  - https://HEROKU_RUL/notify/callback
- share message
  - https://HEROKU_RUL/liff/air

#### 建立完 LIFF add 後記得打開 `ShareTargetPicker` 的選項喔！

> 後續的步驟則會使用 app name 來解說喔！

接著需要將剛剛建立的三個 LIFF ID 放到 Heroku 的環境變數上，分別對應名稱是：

- LIFF_BIND_ID ↔️ notify index
- LIFF_CONFIRM_ID ↔️ notify callback
- LIFF_SHARE_ID ↔️ share message

<script async class="speakerdeck-embed" data-slide="36" data-id="5fe13412f6ac4959a2bc468a90aa5b10" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

這邊建立後並確認名字是否打對後就接著進入 LINE Notify 的部分囉！

# [LINE Notify](https://notify-bot.line.me/zh_TW/)

![](https://nijialin.com/images/notify.png)

接著來到 [Notify 的頁面](https://notify-bot.line.me/zh_TW/)，並且確認 LINE Notify 是否已加入好友(或需解除封鎖)。

> 這部分串接的套件為 - [lotify](https://github.com/louis70109/lotify) 來幫助快速串接 LINE Notify。

<script async class="speakerdeck-embed" data-slide="38" data-id="5fe13412f6ac4959a2bc468a90aa5b10" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

從右上角按下 `登入` 結束後 👉`管理登入頁面` 👉 最下面的 `登入服務` 開始建立基本資訊。

- 電子信箱一定要能收到信，否則會沒辦法驗證。
- Callback URL 則輸入前面建立 LIFF app 時 `notify callback` 的網址。

<script async class="speakerdeck-embed" data-slide="40" data-id="5fe13412f6ac4959a2bc468a90aa5b10" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

不清楚 Callback URL 是哪個話就是這個 👇

<script async class="speakerdeck-embed" data-slide="41" data-id="5fe13412f6ac4959a2bc468a90aa5b10" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

建立完之後就到信箱收信按下驗證的網址囉！否則你的服務會無法使用。

<script async class="speakerdeck-embed" data-slide="42" data-id="5fe13412f6ac4959a2bc468a90aa5b10" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

按照慣例一樣填入環境變數到 Heroku 中：

- LINE_NOTIFY_CLIENT_ID
- LINE_NOTIFY_CLIENT_SECRET
- LINE_NOTIFY_REDIRECT_URI (這邊是 `URI` 喔！注意)：填入剛剛在設定 Callback URL 時的那個 LIFF app url。

<script async class="speakerdeck-embed" data-slide="43" data-id="5fe13412f6ac4959a2bc468a90aa5b10" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

到這部基本上對 chatbot 說 「所有縣市」 應該要有反應，若沒反應的話要確認哪個步驟有沒有做錯或打錯字喔！(現場很多這樣的問題)

<script async class="speakerdeck-embed" data-slide="46" data-id="5fe13412f6ac4959a2bc468a90aa5b10" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

# 閃電秀 - 我要奮發向上！聊天機器人有哪些書？

<iframe src="//www.slideshare.net/slideshow/embed_code/key/qc23PODCp5yDfj" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/jarsing/lightning-talk-chatbotbooks-20200822" title="我要奮發向上！聊天機器人有哪些書？" target="_blank">我要奮發向上！聊天機器人有哪些書？</a> </strong> from <strong><a href="https://www.slideshare.net/jarsing" target="_blank">佳新 陳</a></strong> </div>

身為主辦人 & LINE API Expert 幫大家整理目前市面上有的書，雖然資訊迭代速度很快，想想有些時候我們都窩在網路上太久，若能好好地透過書籍溫習一下 Chatbot 知識也很讚喔！

# 活動小結

社群分享永遠是讓創意激盪的最佳方式，而 Chatbots Meetup 是一個很熱情與充滿創造力的社群組織。也希望有更多有創意的開發者願意加入 LINE Chatbot 的開發行列，更希望能熱情的參與社群的活動與一起來分享。

立即加入「LINE 開發者官方社群」官方帳號，就能收到第一手 Meetup 活動，或與開發者計畫有關的最新消息的推播通知。▼

「LINE 開發者官方社群」官方帳號 ID：[@line_tw_dev](https://lin.ee/s5RsZHo)

![](https://www.evanlin.com/images/2020/line-tw-dev-qr.png)

# 關於 「LINE 開發社群計畫」

LINE 今年年初在台灣啟動「LINE 開發社群計畫」，將長期投入人力與資源在台灣舉辦對內對外、線上線下的開發者社群聚會、徵才日、開發者大會等，已經舉辦 30 場以上的活動。歡迎讀者們能夠持續回來察看最新的狀況。詳情請看:

- [2019 年 LINE 開發社群計畫活動時程表](https://engineering.linecorp.com/zh-hant/blog/line-taiwan-developer-relations-2019-plan/)
- [LINE Taiwan Developer Relations 2019 回顧與 2019 開發社群計畫報告](https://engineering.linecorp.com/zh-hant/blog/line-taiwan-developer-relations-2019/)
- [2020 年 LINE 開發社群計畫活動時程表](https://engineering.linecorp.com/zh-hant/blog/2020-line-tw-devrel/)
