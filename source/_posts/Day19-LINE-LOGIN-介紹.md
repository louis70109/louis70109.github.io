---
title: Day19 - LINE LOGIN 介紹
tags:
  - LINE
  - LINE Login
categories: 2019鐵人賽
abbrlink: 3255201689
date: 2019-10-03 20:58:22
---

## 前言

LINE 中文版也上線啦 [URL](https://developers.line.biz/zh-hant/docs/line-login/overview/?fbclid=IwAR2I2VWF8Z1xS5wdSKlkWQiMFJphdjH3Qi_RnoJaCynQUG2GBM-PDiWJEjE)
去某些網站登入你可能會有像下面這樣
![](https://i.imgur.com/GNSYfYX.png)
或者是你有玩過 LINE Rangers (怎麼感覺我好老)，就會看到他們登入畫面有個登入鈕，按下去按確認後就登入，使用者不用輸入帳號密碼。
![](https://i.imgur.com/tbOfUET.jpg)
這個機制被稱為 SSO (single sign-on)，它是透過 OAuth2 的機制來做認證，因為不儲存密碼除了可以降低儲存第三方網站的風險，以及使用者不需要記憶各種不同的密碼所帶來困擾，像是 Facebook、Google、LINE...都有相關的機制可以串連 SSO 的服務。

以下會介紹 LINE Login 的流程。

## 流程

這裡我使用 LINE Login
![](https://i.imgur.com/jouHzB0.png)

1. 服務要引導使用者到 LINE 認證頁面並帶著必填的欄位。
2. LINE 會在瀏覽器上打開認證頁面，使用者必須按下同意才會進行認證。
3. LINE 會透過設定過的 `redirect_uri` 還給你一個 `authorization code` 以及 `state` 在 Query string 上。
4. 你的服務需要將 `authorization code` 打到`https://api.line.me/oauth2/v2.1/token`
5. LINE 確認完之後就會送你一個 `access token` 嚕！
   > 可以拿透過 [social API](https://developers.line.biz/en/reference/social-api/) 去拿到相關資訊

## 結論

下一篇再帶著大家申請一個 LINE Login 的服務並建立一個簡單的註冊頁面～

## 參考

[OAuth wiki](https://zh.wikipedia.org/wiki/%E5%BC%80%E6%94%BE%E6%8E%88%E6%9D%83)
[LINE overview](https://developers.line.biz/en/docs/line-login/web/integrate-line-login/)
[LINE 中文文件](https://developers.line.biz/zh-hant/docs/line-login/overview/?fbclid=IwAR2I2VWF8Z1xS5wdSKlkWQiMFJphdjH3Qi_RnoJaCynQUG2GBM-PDiWJEjE)
