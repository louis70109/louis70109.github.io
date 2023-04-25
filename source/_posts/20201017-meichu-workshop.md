---
title: 梅竹黑客松賽前企業工作坊 - LIFF shareTargetPicker
categories: 研討會
date: 2020-10-21 14:19:23
tags: ['LINE', 'LIFF', 'shareTargetPicker', '梅竹黑客松']
---

<style>
  section.compact {
    font-size: 150%  
  }
  img[alt~="center"] {
    display: block;
    margin: 0 auto;
  }
</style>

# 前言

很開心能參加到梅竹黑客松的賽前企業工作坊，為了能夠讓各位學生朋友更快速上手 LIFF(LINE Front-end Framework)，並使用來打造更 WoW 的應用服務，因此在這天我們則找到 UIT(a.k.a 前端)部門專業的同仁 - Coke 帶領學生們來做實作相關內容，讓大家更了解 LIFF 以及 [shareTargetPicker](https://developers.line.biz/en/reference/liff/#share-target-picker) 個別是什麼、如何實作並且能應用在什麼地方，以下就來一步一步來介紹。

<!-- more -->

# [LINE Front-end Framework](https://developers.line.biz/en/docs/liff/overview/)

<script async class="speakerdeck-embed" data-slide="4" data-id="29f68cae8f9d4a80adde4ebf5a5fca5e" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

LIFF 是 LINE 提供的一個前端框架，主要是為了讓大家可以更快速的整合前端服務並創造更多更特別應用於 LINE App 上。

<script async class="speakerdeck-embed" data-slide="6" data-id="29f68cae8f9d4a80adde4ebf5a5fca5e" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

LIFF 良好的整合讓大家可以快速應用以下的內容：

- LINE Login
- JavaScript SDK
- User Profile
- Message API

## Part 1 - LIFF starter

<script async class="speakerdeck-embed" data-slide="8" data-id="29f68cae8f9d4a80adde4ebf5a5fca5e" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

首先從 LINE 官方的 repo - [line-liff-starter](https://github.com/line/line-liff-starter) Fork 至自己的 GitHub 帳號上，接著在 README 下方的 Heroku 部署按鈕會進入到 Heroku 的部署頁面

> 在按下這**部署按鈕**之前必須先註冊 [Heroku](https://www.heroku.com/) 的帳號，否則會在註冊完成後回來時已經遺失原先專案幫忙設定的 Config，因為註冊跳轉回來時 Config 已經被清除了。(當天許多同學有類似的問題)

<script async class="speakerdeck-embed" data-slide="12" data-id="29f68cae8f9d4a80adde4ebf5a5fca5e" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

待建立完成後按下 `View` 進去後會看到錯誤訊息，代表這一步驟成功了。接著就是到 [LINE Developer Console](https://developers.line.biz/console) 註冊 LIFF 相關的 Channel。

<script async class="speakerdeck-embed" data-slide="15" data-id="29f68cae8f9d4a80adde4ebf5a5fca5e" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

首先需要先建立 `Provider`，白話來說就是服務提供商的名稱，這邊就是讓同學們可以以自己的黑客松隊伍名稱取名。

<script async class="speakerdeck-embed" data-slide="17" data-id="29f68cae8f9d4a80adde4ebf5a5fca5e" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

建立完 Provider 之後就要接著建立 LINE Login channel，因為 LIFF 是基於 LINE Login 所實作的一個整合服務應用的前端框架，讓大家可以在上面更有效的整合服務於 LINE 上。

這部分則是將`名稱`以及`描述`填寫清楚後即可建立 channel。(上面也會有敘述 `Provider` 是誰)

<script async class="speakerdeck-embed" data-slide="18" data-id="29f68cae8f9d4a80adde4ebf5a5fca5e" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

這邊 Coke 也詳細解釋剛剛所填寫的內容全都會在接下來使用者第一次使用時認證所需頁面會跳出來的資訊。

<script async class="speakerdeck-embed" data-slide="19" data-id="29f68cae8f9d4a80adde4ebf5a5fca5e" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

接著來到 Login channel 裡面的 LIFF 頁籤中選擇 `Add` 建立第一個 LIFF 頁面(page)。

<script async class="speakerdeck-embed" data-slide="20" data-id="29f68cae8f9d4a80adde4ebf5a5fca5e" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

這一頁當中的需要打勾的 checkbox 一定要按照上面打勾，現場就有許多同學沒有打勾到 `chat_message.write` 導致訊息無法送出而找不出問題，這邊要詳細確認才行！

LIFF size 有分為以下三種：

- Full
- Tall
- Compact

<script async class="speakerdeck-embed" data-slide="23" data-id="29f68cae8f9d4a80adde4ebf5a5fca5e" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

建立到下方之後會發現有個 `Bot link` 的選項，若你選擇 `normal` 時則會在下方看到有一個 **Add friend** 的按鈕，反之選擇 `aggressive` 實則會在 Allow 之後跳出一個加好友的選項讓使用者選擇。這邊就看各位開發者應用的場景去選擇囉！

<script async class="speakerdeck-embed" data-slide="25" data-id="29f68cae8f9d4a80adde4ebf5a5fca5e" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

畢竟這次 LINE 工作坊以 `shareTargetPicker` 這個強大且可以發送 Flex Message 的 API 作為主軸，因此這邊就提醒大家若要使用這個獨家功能的話，一定要`打開按鈕`才可以使用！

<script async class="speakerdeck-embed" data-slide="27" data-id="29f68cae8f9d4a80adde4ebf5a5fca5e" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

這部分 Coke 提醒大家剛剛建立的 LIFF 是會幫忙轉址到對應的 Endpoint URL 上，值得注意的是若你在 LIFF URL 後面加上不同的路徑以及參數時，會如投影片所敘述的方式去產生最終的 Endpoint URL，若對這部分還是不甚了解的話可以參考 - [您需要了解有關新 LIFF URL 的所有資訊](https://engineering.linecorp.com/zh-hant/blog/new-liff-url-infomation/) 文章敘述。

<script async class="speakerdeck-embed" data-slide="28" data-id="29f68cae8f9d4a80adde4ebf5a5fca5e" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

待各位建立完後接著就複製 LIFF id 並回到 Heroku 的頁面上。

<script async class="speakerdeck-embed" data-slide="30" data-id="29f68cae8f9d4a80adde4ebf5a5fca5e" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

從你剛剛建立的機器名稱(ex: example-1)點進去後按到 `settings` ➡️ `Reveal Config Vars` 並對應欄位輸入：

- Key: `MY_LIFF_ID`
- Value: 剛剛複製的 LIFF ID

<script async class="speakerdeck-embed" data-slide="32" data-id="29f68cae8f9d4a80adde4ebf5a5fca5e" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

加入後按下 `Open app` 的按鈕就會看到以上畫面，若在這部還是沒出現的話請往前檢查是否有哪一個步驟遺漏了。

<script async class="speakerdeck-embed" data-slide="35" data-id="29f68cae8f9d4a80adde4ebf5a5fca5e" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

因為我們的服務接下來就是開給其他人使用，因此你的 LINE Login channel 就必須要 `publish` 才行喔！

<script async class="speakerdeck-embed" data-slide="36" data-id="29f68cae8f9d4a80adde4ebf5a5fca5e" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

接著就可以把剛剛建立的 LIFF 頁面的網址貼到任意聊天室上，並用手機點下來試玩看看 starter 是否有成功。

### Flex Message

<script async class="speakerdeck-embed" data-slide="38" data-id="29f68cae8f9d4a80adde4ebf5a5fca5e" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

Flex Message 是一個可以把訊息內容當作網頁排版的一個特殊(神奇)格式，在 shareTargetPicker 尚未問世之前，開發者皆只能使用 Chatbot 使用來回應相關內容，在問世後大幅提升使用的可行性，讓大家可以應用更多點子在 Chatbot 以及 LIFF 身上。

想客製化 Flex Message 的樣板可使用 LINE 官方工具 - [Simulator](https://developers.line.biz/flex-simulator/)

> 需要注意 shareTargetPicker 功能只支援 LINE 10.13.0 以上的版本

## Part 2 - 梗圖範例

相信經過前面的說明應該對三個平台操作方法有一定程度的熟悉，接下來這部分 Coke 做了一個 [Demo 專案](https://github.com/cichien/liff-workshop-demo)帶大家來操作，與前面的步驟一下先 Fork 至自己的 GitHub ➡️ 按下 README 裡的 Heroku Deploy 按鈕 ➡️ 建立一個新的 LIFF 頁面

<script async class="speakerdeck-embed" data-slide="45" data-id="29f68cae8f9d4a80adde4ebf5a5fca5e" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

- 使用 `git clone` 的方式把剛剛 Fork 的專案下載到本機上
- 進入資料夾後 `npm install` 安裝相依套件
- 將 `.env.example` 改成 `.env` 並且設定裡面的 `MY_LIFF_ID` 為你剛剛新建立的 LIFF 頁面
- 步驟完成後就使用 `npm run dev` 啟動你的專案
- 訪問 https://localhost:8000
  - 因為本地端有提供憑證給大家使用，請勿 ❌ 使用這個憑證於 production 環境

<script async class="speakerdeck-embed" data-slide="48" data-id="29f68cae8f9d4a80adde4ebf5a5fca5e" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

按造前面的步驟進入後會發現頁面只有簡單的內容，接著就 `git checkout liff-meme-fin` 切換到完成版的分支(沒有`fin`的分支是讓大家可以發揮)，重新使用 `npm run dev` 啟動專案則可以看到上面的畫面，將文字更改後按 Share 即可分享給 LINE 好友。

![](https://nijialin.com/images/2020/target-picker-sample.PNG)

### liff.isApiAvailable

<script async class="speakerdeck-embed" data-slide="49" data-id="29f68cae8f9d4a80adde4ebf5a5fca5e" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

這部分 Coke 也提醒大家在使用相關 API 時需要確認相關的判斷式來確保 API 有被正確使用。

### liff.state 使用小技巧

<script async class="speakerdeck-embed" data-slide="54" data-id="29f68cae8f9d4a80adde4ebf5a5fca5e" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

在做前端時時常最怕內容還沒載入完成時使用者就開始操作上面元素，進而導致非預期錯誤(Exception)，這邊提供一個使用 JavaScript 的方式操作 CSS body 元素，若在 Query parameter 上有找到 `liff.state` 時則先不顯示頁面上的內容(display: none)，如此一來就不會有上述的問題產生了。

# 結論

相信經過這次梅竹黑客松的賽前企業工作坊可以讓學生朋友們除了深入了解 LIFF 這個整合度極高的框架以外，也了解如何使用 shareTargetPicker 做出許多有特色的應用，增添作品的可觀性，期待於 10/24、25 可以發掘出學生朋友們更多更 WoW 的應用與作品。
