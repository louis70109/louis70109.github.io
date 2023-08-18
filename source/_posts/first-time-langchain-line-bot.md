---
title: '新米到上手 LangChain: 藉由 Function Agent 在 LINE Bot 上處理 Calendar 資訊！'
tags:
  - LangChain
  - OpenAI
  - LINE
  - ChatGPT
  - Google Calendar
  - Function Agent
categories: LINE
date: 2023-08-18 12:23:46
---

![](https://nijialin.com/images/common.jpeg)

- [前言](#前言)
- [介紹](#介紹)
  - [為什麼選擇 Google Calender?](#為什麼選擇-google-calender)
    - [喜歡程式碼可以看這邊](#喜歡程式碼可以看這邊)
  - [過去我怎麼下 prompt？](#過去我怎麼下-prompt)
  - [什麼是 LangChain？](#什麼是-langchain)
  - [LangChain Function Agent 帶來了什麼好處？](#langchain-function-agent-帶來了什麼好處)
  - [為什麼要在 LINE Bot 用？](#為什麼要在-line-bot-用)
- [結論](#結論)
- [活動小結](#活動小結)
- [關於「LINE 開發社群計畫」](#關於line-開發社群計畫)

# 前言

平時我們經常需要管理/安排行程和資訊。這篇文章將介紹我是如何透過 Google Calendar 與 LangChain，讓我更快在 LINE Bot 上可以加入個人行事曆。同時，我也將分享有關使用 Google Calendar 的好處ㄋ，以及如何更有效地利用 LangChain Function Agent 來簡化程式碼開發過程。相信這對於建立 LINE Bot 以及各種相關應用的開發者來說會是一個不錯的範例，讓我們就往下看下去吧！

Slide: https://speakerdeck.com/line_developers_tw/first-time-lanchain-line-bot
範例程式碼：https://github.com/louis70109/calendar-langchain
歡迎試玩 LINE Bot：https://lin.ee/92O5Od8

<!-- more -->

# 介紹

## 為什麼選擇 Google Calender?

我一直在使用 Google 日曆，主要是基於以下原因：

- 在 Cambly 上課時，我可以將課程資訊直接綁定到 Google Calender，方便我管理下班後的時間
- Apple Calender 可以收來自 Google Calender 的事件，這對於熱愛使用蘋果產品的我來說非常便利，可以在手機、電腦和平板上同步查看我的行事曆 (只需要一個 iCloud)
- Google 日曆的同步速度很快，幾乎可以立即反應行事曆狀態，讓我在規劃時間方面更加順暢
  - 同步很快，體感約<60s

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/b3671167886945a3b1231f981d95a172?slide=7" title="新米到上手 LangChain: 別再更新了，快學不動了" allowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 100%; height: auto; aspect-ratio: 560 / 314;" data-ratio="1.78343949044586"></iframe>

- 標題、時間：對於我來說是必須的，個人行事曆不用像公司的這麼完整，我只要知道時間跟要做什麼事情就好
- 地點、描述：話雖如此，如果行事曆裡面能有更完整的內容當然更好，但沒有也沒關係，只要能幫助我回想就可以了，因此這兩個對我來說是選田

### 喜歡程式碼可以看這邊

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/b3671167886945a3b1231f981d95a172?slide=8" title="新米到上手 LangChain: 別再更新了，快學不動了" allowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 100%; height: auto; aspect-ratio: 560 / 314;" data-ratio="1.78343949044586"></iframe>

以 python 來說，因為是打 GET，不一定每個瀏覽器都會幫忙處理 unicode 的問題，為保險起見都需要先用 `urllib.parse.quote("STRING")` 來包，`openExternalBrowser` 後面在說～

## 過去我怎麼下 prompt？

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/b3671167886945a3b1231f981d95a172?slide=10" title="新米到上手 LangChain: 別再更新了，快學不動了" allowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 100%; height: auto; aspect-ratio: 560 / 314;" data-ratio="1.78343949044586"></iframe>

在公司內部的工作坊中，學到了上圖的 prompt 可以告訴 AI 如何幫我產生我對應要的東西，從角色到要作的事情說清楚，但在這裡有沒有發現，我下面寫的一些髒 code，都要確保它(AI)若沒給東西時我應該怎麼處理，甚至還因為他只能給字串版本的 dict，要暴力破解把他轉成 dict，實在是不太好的作法...哈哈

## 什麼是 LangChain？

引用至 Evan 寫的文章 - [Cloud Summit 2023 - 結合生成式 AI 打造有趣的 LINE Bot 應用](https://engineering.linecorp.com/zh-hant/blog/cloud-summit-2023-gal-linebot)

要讓你的 LINE Bot 做出以上的事情，你需要很多很多的相關 Prompt 。不論是定義 LLM 的模型該如何解讀你的文字，該如何挑選即將要執行的動作，或是如何將結果作為有效的拆解，到把以往訊息得內容加以存在 Prompt 之中。

但是透過 LangChain 你可以將這些工作拆解成一個個的小方塊，讓你打造相關服務與應用的時候不用在重複使用那些的 Prompt ，就可以快速打造出來。 以下透過一些簡單的程式碼範例來講解使用了 LangChain 之後，你的程式碼會變得多簡潔。

## LangChain Function Agent 帶來了什麼好處？

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/b3671167886945a3b1231f981d95a172?slide=11" title="新米到上手 LangChain: 別再更新了，快學不動了" allowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 100%; height: auto; aspect-ratio: 560 / 314;" data-ratio="1.78343949044586"></iframe>

如果有在 Python 作過型別定義，一定對於 Pydantic 不陌生，因為 LangChain 有引入它方式，幫助 LLM 定義需求時可以下相關訊息(description)，透過定義完成後，在 `def _run()` 裡面 LLM 會幫你把參數放入對應的欄位，並且讓開發者可以快速拿參數做事情。

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/b3671167886945a3b1231f981d95a172?slide=12" title="新米到上手 LangChain: 別再更新了，快學不動了" allowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 100%; height: auto; aspect-ratio: 560 / 314;" data-ratio="1.78343949044586"></iframe>

而更神奇的是，你可以在 description 裡面多寫一些內容，像是把 `台` <-> `臺`之類的幫你對應好，這樣是不是想到能解決了超多事情呢？

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/b3671167886945a3b1231f981d95a172?slide=13" title="新米到上手 LangChain: 別再更新了，快學不動了" allowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 100%; height: auto; aspect-ratio: 560 / 314;" data-ratio="1.78343949044586"></iframe>

用 Function Agent 的好處是，Web 開發者可以把`生成式`這件事，用 web server 的邏輯開發，以上述為例：定義環境變數-前處理-init-Run server，霎那間還真的以為自己在寫 web service？如此一來就可以更直覺得去寫你想要的 AI 解決方案，前處理想要放更多資訊，只要定義好 class，基本上很多事情都很好解決了！

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/b3671167886945a3b1231f981d95a172?slide=19" title="新米到上手 LangChain: 別再更新了，快學不動了" allowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 100%; height: auto; aspect-ratio: 560 / 314;" data-ratio="1.78343949044586"></iframe>

透過 LangChain，我可以少學/寫很多的黑魔法，甚至在 description 中就可以判斷今天、明天、兩天後...等等的只有人類對話能懂的東西，雖然還不太懂 LangChain 後面怎麼作，但如此一來我也省處理了很多把 prompt 一直串起來的功了。

## 為什麼要在 LINE Bot 用？

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/b3671167886945a3b1231f981d95a172?slide=19" title="新米到上手 LangChain: 別再更新了，快學不動了" allowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 100%; height: auto; aspect-ratio: 560 / 314;" data-ratio="1.78343949044586"></iframe>

一直沒說為什麼要在 LINE Bot 裡面使用，主要是我個人日常就會準備一隻 Bot 來存我臨時的訊息，抑或是在群組時常常都會有很片段的消息來約時間，通常最後都會有感覺某個時間要出門，結果往往時間到就忘了也找不到訊息在哪...

考慮使用的原因是，因為 LINE Bot 是 event-driven 的方式，我會在桌機板的 LINE 把群組訊息複製起來貼到 LINE Bot，訊息樣是會很像以下：

```
01:52 🤖測試用🐤 你明天想去吃範嗎？
01:52 🤖測試用🐤 可能在內湖附近
01:53 🥷NiJia   可啊，但幾點？
01:53 🤖測試用🐤 應該七點下班後吧
01:53 🤖測試用🐤 你看你要不要來在說
01:54 🥷NiJia   喔好
```

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/b3671167886945a3b1231f981d95a172?slide=17" title="新米到上手 LangChain: 別再更新了，快學不動了" allowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 100%; height: auto; aspect-ratio: 560 / 314;" data-ratio="1.78343949044586"></iframe>

如此一來就能達到類似上述的功能，讓 LangChain 幫忙整理訊息並放到對應 Google Calendar 的 query parameter，這樣就能加到個人行事曆中了！

# 結論

這次的分享先來了解一下 LangChain Function Agent 帶來的魔力！讓我少研究很多 OpenAI 黑魔法的時間，甚至很多程式碼寫起來跟平常寫法都很像，在大 AI 時代對於日常用 Python 寫應用的工程師是非常友善的！如果你也正在關注相關應用，或許可以參考本篇文章唷！

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
