---
title: 'LIFF migration: from Replace to Concatenate mode'
categories: 'LINE'
date: 2021-01-19 16:50:13
tags: ['LIFF', 'LINE']
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

於 `1/18` 釋出了一篇新聞 [Reminder: On March 1, 2021, "Replace (Backward compatibility mode)" will be removed from the permanent link redirection settings for LIFF app and LINE MINI App](https://developers.line.biz/en/news/2021/01/18/remind-discontinue-replace-mode-announcement/)，在這個新聞中提到將會在 `3/1` 移除 LIFF 的 `Replace` 模式:

![](https://nijialin.com/images/2021/migrate-liff/news.png)

移除後若尚未更新 LIFF SDK 的話可能會遇到以下問題：

- LIFF 打不開
- 空白頁面
- 打開了但出現許多錯誤訊息
- ...

於 2020/11/20 有發過即將移除的[新聞](https://developers.line.biz/en/news/2020/11/20/discontinue-replace-mode-announcement/)，隨後也有相關文章敘述這件事，許多更改內容可以參閱：

- [您需要了解有關新 LIFF URL 的所有資訊](https://engineering.linecorp.com/zh-hant/blog/new-liff-url-infomation/)
- LAE 戴均民 - [LINE LIFF v2 的 replace 模式即將被移除及建議程式寫法](https://taichunmin.idv.tw/blog/2021-01-19-line-liff-v2-replace-deprecated.html)
- LAE 卡米哥 - [The Best Practice Of LIFF](https://etrexkuo.medium.com/the-best-practice-of-liff-fd89f2e612fc)
<!-- more -->

## 改過去會遇到什麼問題？

可能會遇到的問題：

- 路徑問題
  - 過往 LIFF 無法設定 sub path(子路徑)，有些開發者會寫相關解決方案
  - 出現同樣的路徑: https://example.com/`campaign`/`campaign`

參考之前泰國同事的文章比較一下差異 - [您需要了解有關新 LIFF URL 的所有資訊](https://engineering.linecorp.com/zh-hant/blog/new-liff-url-infomation/)

# 怎麼調整 Mode 的選項？

- 首先先進入 [Developer Console](https://developers.line.biz/console/) 頁面中

- 選擇你 Chatbot Channel 的 `Provider` 後，點選所使用的 `LINE Login` Channel
  ![](https://nijialin.com/images/2021/migrate-liff/1.png)

- 會看到服務中的 LIFF page 目前是 `Replace`
  ![](https://nijialin.com/images/2021/migrate-liff/2.png)

- 將之改成 `Concatenate` 模式
  ![](https://nijialin.com/images/2021/migrate-liff/3.png)

- **升級**你的 LIFF SDK 版本到 `2.3` 以上(目前最新為 `2.7`)避免版本不支援

# 結論

若因為時程問題造成無法再更新日期前完全改版，這邊提供一個新聞上的資訊，只要你的 LINE 版本在 `v10.10.0`(使用[liff.getLineVersion()](https://developers.line.biz/en/reference/liff/#get-line-version)取版本) 以下 以及 `LIFF SDK v2.2.1` 以下即可繼續使用 `Replace mode`(**不建議**)。

![](https://nijialin.com/images/2021/migrate-liff/workaround.png)

最後，筆者我還是建議大家趁早將程式碼 migration，避免在日後遇到不可預期的錯誤，若還有相關問題無法解決，歡迎至[討論區](https://www.facebook.com/groups/linebot)發問，會有許多高手在當中幫忙解答。

# 活動小結

立即加入「LINE 開發者官方社群」官方帳號，就能收到第一手 Meetup 活動，或與開發者計畫有關的最新消息的推播通知。▼

「LINE 開發者官方社群」官方帳號 ID：@line_tw_dev
![](https://www.evanlin.com/images/2020/line-tw-dev-qr.png)

# 關於「LINE 開發社群計畫」

LINE 今年年初在台灣啟動「LINE 開發社群計畫」，將長期投入人力與資源在台灣舉辦對內對外、線上線下的開發者社群聚會、徵才日、開發者大會等，已經舉辦 30 場以上的活動。歡迎讀者們能夠持續回來察看最新的狀況。詳情請看:

- [2019 年 LINE 開發社群計畫活動時程表](https://engineering.linecorp.com/zh-hant/blog/line-taiwan-developer-relations-2019-plan/)
- [LINE Taiwan Developer Relations 2019 回顧與 2019 開發社群計畫報告](https://engineering.linecorp.com/zh-hant/blog/line-taiwan-developer-relations-2019/)
- [2020 年 LINE 開發社群計畫活動時程表](https://engineering.linecorp.com/zh-hant/blog/2020-line-tw-devrel/)
