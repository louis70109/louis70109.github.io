---
title: 【翻譯】結合 LINE Chatbot 與 Spotify API 創建一個很酷的自動點唱機！
tags:
  - LINE
  - Spotify
  - Chatbot
  - Jukebox
categories: 翻譯
date: 2020-08-04 12:37:23
---

![](https://i.imgur.com/JKOR5lp.jpg)

> 原文出自 [มาสร้างตู้เพลง Jukebox เท่ห์ๆด้วย LINE Chatbot ผ่าน Spotify API กัน!](https://medium.com/linedevth/jukebox-chatbot-line-spotify-e410a84b50d8)

今天我將透過這篇文章帶大家在 LINE 中創建聊天機器人 “Nickelodeon”。會實作此聊天機器人是因為有時會有朋友來我家做飯，我會同時在家中播放音樂。但是朋友們會一下這首一下要求那首。所以我有了新主意：嘿，不如讓 Chatbot 擔任我的助手，幫助我脫離 555+ 種 DJ 身份。而實際上這個 Chatbot 可以應用於其他情境，例如在辦公室中或開車和朋友一起旅行等。

# 點唱機是什麼？

<!-- more -->

我想簡短地解釋一下 Nickelodeon 以及 Jukebox。（我趕不上那個年代。我只在博物館裡看過了 😃。）點唱機實際上是一個電唱機。但像自動販賣機一樣，使用方法是可以按按鈕選擇您想要的歌曲，然後投幣收聽該歌曲。在過去，人們經常把它放在餐館裡以及一些 Bar。

![](https://i.imgur.com/wiHNaC3.jpg)

> Cr. Photo by nuno_lopes from pixabay.com

# Requirement

我想要的是在 LINE app 上利用 Chatbot 尋找歌曲並將該歌曲添加到我的播放列表中，並透過我的裝置連接音響相關設備。

- 所需的功能是自動創建 Spotify 播放列表（如果尚未有歌單）
- 可以在 Spotify 中搜索歌曲並發送精美的 Flex message（若搜尋結果太多，使用分頁以便用戶可以找到更多資訊。）
- 可以將歌曲添加到播放列表中。當我們開始使用此播放清單播放音樂時，剛添加的新歌曲將直接加入歌單並自動播放。

# 開發過程

![](https://i.imgur.com/cWL5PKu.png)

由於本文是半實驗性質，因此我使用 ngrok 作為版地端服務器，並使用 Node.js 進行開發。主要步驟如下：

1. 創建 LINE 官方帳號（Chatbot）。
2. 使用 Spotify Developer Portal 上創建應用程式。
3. 創建一個類別來管理與 Spotify API 連接的元件。
4. 管理 Webhooks 並將結果使用 Flex message 發送給用戶。
5. 啟用 ngrok 並更新 config。

# 1. 創建 LINE 官方帳號（Chatbot）

如果您以前尚未創建 LINE Chatbot，請參閱 Jirawatee [這篇文章](https://medium.com/linedevth/%E0%B8%9B%E0%B8%90%E0%B8%A1%E0%B8%9A%E0%B8%97%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%AA%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%87-line-bot-b2cb90643901)。若已完成此操作，請直接看下一小結。

# 2. 使用 Spotify Developer Portal 創建應用程式

接下來，在 Spotify Developer Portal 上創建一個 "application" 來訪問 Spotify API:

- 前往 https://developer.spotify.com
- 選擇 **Dashboard**。
- 登錄並接受使用條款。
- 點擊 “Create an app” 按鈕。

![](https://i.imgur.com/go3fgJm.png)

- 然後填寫像是 Name、Description 之類的訊息，接著會詢問我們是 Commercial 還是 Non-Commercial 。讓我們選擇 Non-Commercial。

![](https://i.imgur.com/j7bxbbo.png)

- 接受條款後我們將在 Spotify 中獲得一個 application。在此頁面上，有我們開發需要的兩個參數，分別是 Client ID 和 Client Secret（點選顯示 Show Client Secret 的連結 ）。

![](https://i.imgur.com/KKsix3y.png)

# 3. 創建一個類別來管理與 Spotify API 連接的元件

## soptify.js

在此步驟中，我們將創建一個名為 spotify.js 的 Util 類別，該類將幫助管理與 Spotify API 的連接，包括創建用於用戶登錄到 Spotify 的 URL，創建播放列表（如果尚未存在），搜索歌曲並將歌曲添加到播放列表。

<script src="https://gist.github.com/tandevmode/3afd7e338ce499ceb5cdeebccf844cc7.js"></script>

# 4. 管理 Webhooks 並將結果使用 Flex message 發送給用戶

當用戶使用我們的 Chatbot 並獲得回應，此過程將使用 Node.js 編寫一個 Web 應用程序來處理來自 Webhook 的請求。

## index.js

該檔案管理和執行 Express Web Server，並且有 Controller 調用 Class Util 來處理用戶的 Webhook。

<script src="https://gist.github.com/tandevmode/d1a0d3580245af346f38c9f29bd3c85b.js"></script>

## lineapp.js

它是一個 Util 檔案，透過對搜索結果進行排序來管理 LINE 相關部分並創建漂亮的 Flex message，包括在用戶點擊 Flex message 中的按鈕時出現的 Postback event。並且擁有有兩個按鈕：

- 用戶想要查詢更多歌曲時的 **More** 按鈕。
- **Add** 按鈕可將歌曲添加到播放列表。

<script src="https://gist.github.com/tandevmode/f178e49d81ebb715efa460c7d893fedb.js"></script>

# 5. 啟用 ngrok 並更新 config

## 5.1 啟用 ngrok

對於以前從未使用過 ngrok 的初學者，建議您參考[這篇文章](https://medium.com/linedevth/linebot-ngrok-b319841a49d7)，[Sitthi](https://medium.com/@kamnan43)對於這方面相當熟悉，歡迎大家參考！

```sh
ngrok http 3000
```

![](https://i.imgur.com/05shvgv.png)

## 5.2 更新 Config

### .env

我們應用程序的另一個重要檔案為`.env`。這是一個儲存環境變數的檔案。我們必須將與 LINE 和 Spotify 相關的各種參數複製該檔案中，如下所示：

```
// API endpoint
LINE_MESSAGING_API = https：//api.line.me/v2/bot/message

//從 LINE Developer Console 取得，用於發送訊息的 Access token
LINE_ACCESS_TOKEN =

//從 Spotify Developer Portal 複製過來
SPOTIFY_CLIENT_ID =

//在本文第二步驟中的 Spotify Developer Portal 中複製過來
SPOTIFY_CLIENT_SECRET =

//請添加 URL 以便讓 Spotify 的 callback URL 啟用 ngrok
SPOTIFY_CALLBACK = https：//xxxxxxxx.ngrok.io/spotify

//作為音響連接裝置的用戶 ID（將使用此 ID 創建播放列表）
SPOTIFY_USER_ID =

//我們將在 Spotify 上創建的播放列表名稱
SPOTIFY_PLAYLIST_NAME = BrownJukebox
```

我們可以透過 Spotify App 獲得 Spotify 用戶 ID > Setting > Account （我找了很長時間...😓）

![](https://i.imgur.com/adK2DaE.png)

> 建議：若使用的主要帳戶是 “高級” 帳戶。您將能夠聽到更多音樂而非 “廣告”。

### Spotify 設置

接著到 Spotify Developer Dashboard，您必須在先設置 Callback URL。當用戶完成登錄後，authorization code 將發送到此 endpoint URL 上，我們將使用它接收 AccessToken/RefreshToken。

路徑為 Edit Settings > Redirect URIs > 輸入 `https://{ngrok_URL}/spotify`。

![](https://i.imgur.com/xcvclUs.png)

> 重要！不要忘記點下 **ADD** 按鈕。我已經跌了好多次 😭。

### LINE Messaging API Settings

請從 ngrok 複製網址並加上 `/webhook` 後添加到 Chatbot Channel 中的 Webhook URL 中。

![](https://i.imgur.com/sfs1eVu.png)

### Ready!

最後，讓我們使用以下 CLI 執行 npm start 啟動 server！並將我們音響設備登錄至下列 URL 中。

```
Authorization required. Please visit

https://accounts.spotify.com/authorize?client_id=a982c17d58cf4e8cbbdcbb53xxxxxxxx&response_type=code&redirect_uri=https://ed27de618cf4.ngrok.io/spotify&scope=playlist-read-private%20playlist-modify%20playlist-modify-private&state=default-state

Server available on port 3000
```

![](https://i.imgur.com/XCkxVLQ.png)

登錄完成後，我們將在我們的 Spotify 中找到一個名為 “BrownJukebox” 的播放列表。

![](https://i.imgur.com/fcsED7m.png)

# 測試

![](https://miro.medium.com/max/280/1*is6EVaQ_Zit7TsqJHaX65Q.gif)

# 結論

就我個人而言，我真的很喜歡這個聊天機器人，且在使用 Spotify API 實作時也很有趣，並使用搜索結果來設計 Flex message，但是正如我所說的，這只是一個半實驗品，且還有很多地方可以改進。例如更好地管理 Access token/Refresh token，或者如果朋友在其中按了隨機歌曲的選項，他們要能點擊按鈕退出播放列表。

希望藉由這篇文章能啟發各位開發人獲得新點子，並繼續使用 LINE API 開發出出色的服務，所有程式碼均在下面的連結中，下次見 🙂。

若想知道更多可以參考我們的 [Github](https://github.com/linedevth/LINE-Bot-Jukebox-Spotify)。

# Reference

- [Web API Reference](https://developer.spotify.com/documentation/web-api/reference/)
- [Documentation for the Spotify Web API Node.JS wrapper](http://michaelthelin.se/spotify-web-api-node/)
