---
title: 【標題】題目
categories: 學習紀錄
tags:
---

![](https://nijialin.com/images/2023/)
![](https://nijialin.com/images/common.jpeg)

# 前言

Slide: https://speakerdeck.com/line_developers_tw/first-time-lanchain-line-bot

<!-- more -->

# 介紹

## Why I use Google Calender?

- Cambly 上課，內建用 Google Calendar 綁訂上課資訊
- Apple Calendar 可以綁訂/接收 Google Calendar 的事件
  - 身為果粉會有手機、電腦、平板，一次滿足
  - 一個電腦設定通通滿足，iCloud
  - 同步很快，體感約<60s

## Benefit of Google Calender GET API

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/b3671167886945a3b1231f981d95a172?slide=7" title="新米到上手 LangChain: 別再更新了，快學不動了" allowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 100%; height: auto; aspect-ratio: 560 / 314;" data-ratio="1.78343949044586"></iframe>

- 必須：標題，時間
- 選項：地點，描述

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

# 結論

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/b3671167886945a3b1231f981d95a172?slide=19" title="新米到上手 LangChain: 別再更新了，快學不動了" allowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 100%; height: auto; aspect-ratio: 560 / 314;" data-ratio="1.78343949044586"></iframe>

最後，一直沒說為什麼要在 LINE Bot 裡面使用，

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
