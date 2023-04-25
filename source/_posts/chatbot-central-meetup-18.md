---
title: 'LINE 開發者社群計畫: 中部人的 Chatbot Meetup #18 心得分享'
categories: 研討會
date: 2021-12-02 19:13:56
tags:
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

大家好，我是 LINE Taiwan 的 Tech Evangelist - NiJia Lin。這次很開心受到 chatbot 社群的邀請，參加了 "[中部人的 Chatbots Meetup 聊天機器人小小聚 #18 @ 臉書社團直播](https://hackmd.io/@chatbot-tw/chatbots-meetup-in-central-taiwan-018)" 的聚會活動，並且分享 LINE API 更新與個人彈幕遊戲的開發心得。在此也跟各位分享本次參與的心得，並且也希望透過社群分享的力量能夠讓聊天機器人的開發動能更加的盛大。

- 社群 Chatbots Meetup： [https://chatbots.kktix.cc/](https://chatbots.kktix.cc/)
- 本次活動網頁: [活動網址](https://chatbots.kktix.cc/events/chatbots-meetup-in-central-taiwan-018)
- 本次活動的共筆紀錄： [https://hackmd.io/@chatbot-tw/chatbots-meetup-in-central-taiwan-018](https://hackmd.io/@chatbot-tw/chatbots-meetup-in-central-taiwan-018)
- [簡報連結](https://speakerdeck.com/line_developers_tw/line-platform-update-202111)
<!-- more -->

# 整場影片分享

<iframe width="560" height="315" src="https://www.youtube.com/embed/xaOpNhB0vBs?start=373" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

# 彈幕遊戲開發分享

- [GitHub](https://github.com/louis70109/WordsGame)

之前有寫過一個彈幕與 LINE Bot 結合的[一個範例](https://github.com/louis70109/Screen-LINE-Bullets)，當時就在想除了在活動上與大家互動之外，還有什麼功能是可以結合的呢？伴隨著前一陣子我在背日文五十音，為了加強自己的印象因此開發與彈幕整合在一起，嘗試讓自己的印象可以更深刻，不過一直忘記眼前的單字是誰。

## 遊戲本體

<script async class="speakerdeck-embed" data-slide="5" data-id="7491b80124ce4c0fa8e1c0a98172b6d2" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

在前端頁面上已較簡易的方式呈現，僅需**用戶登入**、**輸出日文**、**查看排名**三個功能，而在用戶登入的功能上我選擇 LINE Login 做快速登入，實作用戶相關功能時我會考慮以下幾點：

- 如何最簡化登入步驟
- 什麼帳號是大部分人都有
- 只需能快速確認真實用戶即可
- 開發文件需要持續有在更新
- 帳號安全性

<script async class="speakerdeck-embed" data-slide="7" data-id="7491b80124ce4c0fa8e1c0a98172b6d2" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

實作的部分過去有寫過相關的文章，大家在參考流程圖時不仿看看之前寫的文章，此次 LINE Login 整合參考如下：

- [透過 Vue + FastAPI 完成 LINE Login 一鍵式登入](https://engineering.linecorp.com/zh-hant/blog/line-login-vue-fastapi/)
- [LINE Bot 開發者指南詳解 – 4. LINE Login](https://engineering.linecorp.com/zh-hant/blog/line-bot-guideline-4/)
- [LINE Bot 開發者指南詳解 – 5. LINE Login (補充)](https://engineering.linecorp.com/zh-hant/blog/line-bot-guideline-5/)

## 後端 FastAPI 在 Docker 中開發(含資料庫)

過去我在開發的經驗如下：

- 獨立開一台測試用的環境 + 資料庫
  - 所有測試資料都在這，新服務多了之後需反覆確認表格
- 或在 Docker 中建立測試用的資料庫，只能共用一個
  - Docker 多開資料庫也會增加電腦負擔
  - API 在本地端，資料庫在 Docker，開發久了會搞混

而在學會把環境藉由 VSCode 整合進 Docker 裡面開發之後，發現了一個非常酷的世界，畢竟在開發上我個人還是喜歡把東西放在一起開發，因此透過 VSCode 遠端的方式連到 Docker 裡面開發 FastAPI + 資料庫時就非常的棒，且有以下的優點：

- 環境孤立化，在裡面就像在虛擬機裡開發一樣
- 用完就可以刪除，不會影響到本機的內容
- 都在 VSCode，開發前端也沒問題 (開發習慣統一)

> 若你對相關的設定方式也有興趣可以參考這篇文章 - [如何在 VSCode 中以 Container 方式開發 FastAPI + PostgreSQL](https://nijialin.com/2021/05/29/fastapi-dev-in-container-vscode/)

<script async class="speakerdeck-embed" data-slide="8" data-id="7491b80124ce4c0fa8e1c0a98172b6d2" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

## 實裝 Test Container 於 GitHub Actions 中

這一陣子許多同事除了在內部分享會中分享 Testcontainer 的技術，也有到 JCConf 2021 上分享 - [Integration testing with Testcontainers](https://jcconf.tw/2021/)，在內容上都非常精彩，也讓我想試試看這部分

而過往我在寫單元測試 (Unit) 時，時常都把資料庫的函式都直接擋住 (Mock)，假裝他是成功的情況下往下走。但在一個 API 中資料庫往往是最容易在緊繃時掛掉，亦或是工程是手癢去改了某個欄位，讓整個服務瞬間炸掉，這些問題都是我們無法控制的部分… 因此實際讓資料庫跑在測試時可以有個真的環境可以使用是很重要的一環，雖然看專案規模，測試時間有多有少有長有短，但放著一個 Container/VM 在那邊沒用就是很浪費啊，因此就有本次要介紹的 Test Container。

使用 Test Container 有以下的好處：

- 使用時才建立容器
- 能夠真實訪問資料庫
- 讓 API 的測試可以完整走流程

<script async class="speakerdeck-embed" data-slide="11" data-id="7491b80124ce4c0fa8e1c0a98172b6d2" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

而相對 LINE Bot 的部分測試上需要多注意點

- 測試階段因 LINE Bot 需要介面操作才有辦法觸發
  - 這部分可以嘗試 Mock LINE Server，期望 Server 都正常回覆
- 抑或是在環境變數中設定 LINE Bot 的真實金鑰讓初始化
  - 簽證過了就表示成功
- Webhook 裡面的用法針對函式去做測試即可

## LINE Bot 在本次的用途

<script async class="speakerdeck-embed" data-slide="12" data-id="7491b80124ce4c0fa8e1c0a98172b6d2" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

過去我們都習慣在聊天機器人讓做各式應用，其實對話式應用都存在於各種輸入框中，而這次的分享我以日文單字的小遊戲來做一個對話應用，最後再讓管理者可以透過 LINE Bot 中去設定遊戲的難度，增加遊戲的樂趣。

而後續還可以再整合一些功能，讓這次的分享內容可以有更多的應用，像是整合 **平假**/**片假**、抓字典、甚至到 STT 的整合也是可以(只是 latency 要測看看)，如果你也想試看看類似的作法，歡迎參考這次的[範例專案](https://github.com/louis70109/WordsGame)，更多資訊也會在之後於 README 中補充!

# 最後還是需要來個 API Update

<script async class="speakerdeck-embed" data-slide="19" data-id="7491b80124ce4c0fa8e1c0a98172b6d2" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

相信有在使用 LINE 的朋友一定對隨你填貼圖不陌生(甚至人手好幾組)，於今年初時貼圖的 Webhook 回傳更新上就能透過收到 keywords 來了解用戶發送貼圖的契機，而隨著更新至今，隨你填貼圖裡面的內容也可以在 Webhook 中被收到囉！也可以更進一步當使用者傳送這類型貼圖時，更能抓住使用者當前的狀態，進一步地提供更客製化的資訊給他們，讓應用場景更加活躍。

## LIFF 更新

<script async class="speakerdeck-embed" data-slide="20" data-id="7491b80124ce4c0fa8e1c0a98172b6d2" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

往往加入一個領域開發時，都會希望有個能夠參考的範例，讓首次或是往後的開發可以依照一個樣板去開發。在 LIFF 中，你可以使用官方提供的 [line-liff-v2-starter](https://github.com/line/line-liff-v2-starter) 開始，讓開發者們在加入 LIFF 開發時可以有個樣板參考。

另一方面，除了開發上，任何專案在開始前都需要確認接下來要引入的工具功能是否能正常使用，這方面 LIFF 提供了一個 [Playground](https://liff-playground.netlify.app/) 讓各位正在考慮使用的人可以有的地方拿各種手機、桌電、筆電來確認 LIFF 的使用狀態，如果大家也在考慮開發 LIFF 的話歡迎參考以下連結：

> [https://liff-playground.netlify.app/](https://liff-playground.netlify.app/)

# 結論

雖然 demo 時還是老樣子 Server 不聽話，只能先架設在本地端讓大家試玩，希望能透過這次的分享讓大家有新的點子以及參考內容來打造更酷很有趣的應用，Chatbot 社群也都非常有活力，歡迎各路好手踴躍前往分享參加。

# 活動小結

社群分享永遠是讓創意激盪的最佳方式，而 Chatbots Meetup 是一個很熱情與充滿創造力的社群組織。也希望有更多有創意的開發者願意加入 LINE Chatbot 的開發行列，更希望能熱情的參與社群的活動與一起來分享。

立即加入「LINE 開發者官方社群」官方帳號，就能收到第一手 Meetup 活動，或與開發者計畫有關的最新消息的推播通知。▼

「LINE 開發者官方社群」官方帳號 ID：[@line_tw_dev](https://lin.ee/s5RsZHo)

![](https://www.evanlin.com/images/2020/line-tw-dev-qr.png)

# 關於「LINE 開發社群計畫」

LINE 今年年初在台灣啟動「LINE 開發社群計畫」，將長期投入人力與資源在台灣舉辦對內對外、線上線下的開發者社群聚會、徵才日、開發者大會等，已經舉辦 30 場以上的活動。歡迎讀者們能夠持續回來察看最新的狀況。詳情請看:

- [2019 年 LINE 開發社群計畫活動時程表](https://engineering.linecorp.com/zh-hant/blog/line-taiwan-developer-relations-2019-plan/)
- [LINE Taiwan Developer Relations 2019 回顧與 2019 開發社群計畫報告](https://engineering.linecorp.com/zh-hant/blog/line-taiwan-developer-relations-2019/)
- [2020 年 LINE 開發社群計畫活動時程表](https://engineering.linecorp.com/zh-hant/blog/2020-line-tw-devrel/)
- [2021 年 LINE 開發社群計畫活動時程表 (持續更新)](https://engineering.linecorp.com/zh-hant/blog/2021-line-tw-devrel/)
