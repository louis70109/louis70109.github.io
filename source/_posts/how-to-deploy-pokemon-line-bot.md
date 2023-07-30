---
title: '寶可夢苦難日: 結局不是重點 重點是我爬不上大師啊'
categories: 研討會
date: 2023-07-30 15:21:56
tags: ['Pokemon', 'LINE Bot']
---


![](https://nijialin.com/images/2023/coscup/2.jpg)

# 前言

我是 LINE Taiwan 的技術傳教士 Nijia (a.k.a 忍者)，這次有幸來 [COSCUP 2023](https://coscup.org/2023/zh-TW/session/VAHKVH) 分享過年期間實做關於寶可夢 Side project 的一些心得，透過以下文章跟大家分享經驗談！

> 本次分享簡報：https://speakerdeck.com/line_developers_tw/how-to-deploy-pokemon-line-bot

<!-- more -->

# 介紹

以下介紹為個人業餘時間所開發的 Side Project 經驗分享～

## 主要的功能流程圖

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/36feeffa79e3497ca7e5a04176ddc5ce?slide=9" title="寶可夢苦難日: 結局不是重點 重點是我爬不上大師啊" allowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 100%; height: auto; aspect-ratio: 560 / 314;" data-ratio="1.78343949044586"></iframe>

- 使用 LINE Bot 作為操作介面
- 尋找指定寶可夢的個體值
- 運用 Flex Message 整理資訊
- 透過指定寶可夢，往下延伸操作
  - 尋找招式、隊友、道具、個性、努力值
  - Flex Message 皆可操作，到 wiki 查看細節功能
- 錯誤回覆則用生成圖片替代
- 另外尋找 Pokemon Showdown 模擬器的對戰資訊來複習

## 為什麼要用 LINE Bot 當介面？

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/36feeffa79e3497ca7e5a04176ddc5ce?slide=15" title="寶可夢苦難日: 結局不是重點 重點是我爬不上大師啊" allowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 100%; height: auto; aspect-ratio: 560 / 314;" data-ratio="1.78343949044586"></iframe>

- 不用撰寫太多前端 code
  - 對 CSS 的 Flexbox 有概念尤佳
- 呈上，可以驗證介面可行性
- 畫面很容易就做的漂亮 ([Flex Message Simulator](https://developers.line.biz/flex-simulator/))
- 人手一機，親朋好友都可以測試 (Single source)

## 突發事件：日本同事的黃金週，兩天內支援日文

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/36feeffa79e3497ca7e5a04176ddc5ce?slide=19" title="寶可夢苦難日: 結局不是重點 重點是我爬不上大師啊" allowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 100%; height: auto; aspect-ratio: 560 / 314;" data-ratio="1.78343949044586"></iframe>

我們在寫正規表達式(Regex)久了，大概知道[A-Za-z0-9]，但其他語系的 unicode 範圍都不一樣，就算中文我也不知道在哪！在這方面，只能依靠全民小助手(生成式 AI)來幫忙產生，雖然沒辦法驗證正確性，但語言基本上都固定的，就可以直接相信它了！

這邊就寫個基本的 Class 來驗證，收到訊息時先進來 match 看看，就可以驗證嚕！

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/36feeffa79e3497ca7e5a04176ddc5ce?slide=18" title="寶可夢苦難日: 結局不是重點 重點是我爬不上大師啊" allowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 100%; height: auto; aspect-ratio: 560 / 314;" data-ratio="1.78343949044586"></iframe>

最後就可以支援三個語言去驗證了(灑花)！可以到黃金週的分享會上跟日本同事分享成果了～～

## Python 小工具推薦

### [Ruff](https://github.com/astral-sh/ruff)

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/36feeffa79e3497ca7e5a04176ddc5ce?slide=22" title="寶可夢苦難日: 結局不是重點 重點是我爬不上大師啊" allowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 100%; height: auto; aspect-ratio: 560 / 314;" data-ratio="1.78343949044586"></iframe>

它是一個由 Rust 撰寫的 Python lint 工具，除了一般的 lint 規則之外，它也支援許多功能：

- [Pre-commit](https://github.com/astral-sh/ruff-pre-commit)
  - 過去在寫 JavaScript 時有這功能，設定完 `.pre-commit-config.yaml` 在 commit 之前就會處理
- Github Actions
  - 可在 CI 階段協助確認，保障品質
- VScode
  - 支援在編輯器上安裝 plugin
  - 個人常用 `autofix` 的功能，把沒用到的套件與行別處理掉，就不用自己動手了！

## testcontainer

Test Container 是一個 Java 的函式庫，支援 JUnit 來做測試，在跑測試時可以幫忙起個容器(Container)，並可以放上各式資料庫、Selenium 瀏覽器…等等可以放在 Docker 上面跑的內容，那 Test Container 很好的地方就是他也提供 Python 的解決方案([testcontainers/testcontainers-python](https://github.com/testcontainers/testcontainers-python))，讓我這個 Python 開發者可以有機會在 Docker 裡面很快地起一個 Container 來跑資料庫相關的整合測試。

- 建立資料庫作真實的測試
- 不用 mock data 假裝過的很好(?)
- 隔離：可在 Docker 裡執行
- 省空間：執行完就刪除
- 普遍資料庫都支援

> [參考文章](https://nijialin.com/2021/11/24/python-testcontainer-fasstapi-database/)

# 結論

因為日常玩遊戲需要找很多資訊，我們透過 LINE Bot 可以很快速的把資訊都整理進去，開發時也會發現很多不同的方法與解決方案，運用網路上許多人整理好的資料可以更快速開發，推薦大家可以參考 GDD – Game Driven Development，推動自己解決日常所遇到的小問題！

> Side Project 佈署的小建議請參考： [【從零開始養】透過 Side Project 增加你的能見度！以 LINE Bot 為例](https://engineering.linecorp.com/zh-hant/blog/how-to-develop-side-project-into-public-cloud)

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
