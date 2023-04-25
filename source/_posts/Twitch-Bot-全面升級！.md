---
title: Twitch Bot 全面升級！ 增加 LINE Notify 綁定與推播實現 LINE 的三項之力！
tags:
  - LINE Bot
  - LINE Notify
  - LIFF
  - Twitch
  - Bottender
categories: 應用
abbrlink: 3750677153
date: 2020-03-09 23:18:11
---

<img src="https://i.imgur.com/dOIsi7H.jpg" width="2000">

> 滿滿的三項之力 🏋️‍♂️

> 來幫我的 [Twitch Bot](https://github.com/louis70109/Twitch-Bot) 按個星星 ⭐️⭐️

# 更新功能

- 使用 LIFF 來綁定 Notify
  <!-- more -->
- 每個小時幫忙檢查訂閱的直播主開了沒
  - 一天只推播一次絕對不吵你
  - 還有 deep link 喔！

# 點子來源

最近卡米哥寫了兩篇文章

- LINE Notify - [在 LINE 群組發送免費推播的方法大公開](https://medium.com/@EtrexKuo/%E7%A5%95%E6%8A%80-%E5%9C%A8-line-%E7%BE%A4%E7%B5%84%E7%99%BC%E9%80%81%E5%85%8D%E8%B2%BB%E6%8E%A8%E6%92%AD%E7%9A%84%E6%96%B9%E6%B3%95%E5%A4%A7%E5%85%AC%E9%96%8B-line%E5%AE%98%E6%96%B9%E5%B8%B3%E8%99%9F-2-0-%E9%9B%A3%E6%B0%91%E6%9C%89%E7%A6%8F%E4%BA%86-a4acd323769e)
- [如何在 Bottender 中使用 LIFF](https://medium.com/@EtrexKuo/%E5%A6%82%E4%BD%95%E5%9C%A8-bottender-%E4%B8%AD%E4%BD%BF%E7%94%A8-liff-88634b187e72)

剛好我在同時期遇到了一個問題，就是我開始偷懶越來越少去按圖奇獸查直播了！！這樣感覺我做了這個 side project 就要石沈大海， 本篇就來介紹一下我增加了什麼功能～ 👀

# 如何使用

輸入`連結 LINE Notify` 或是點選 Richmenu 最右邊的 🔔 也會幫忙開網頁哦！
此時 Twitch Bot 會給你一串綁定網址，直接給他點下去。
![](https://i.imgur.com/OyZy8Ac.jpg)

---

接著到這個畫面之後選擇`透過1對1聊天`的選項，按下同意之後就完成連動囉！
![](https://i.imgur.com/hHXtNv7l.png)

---

接著要怎麼樣才能讓機器人知道你想被推播什麼？輸入`follow`之後會看到有兩個按鈕，按下面的`綁定通知`的按鈕後 Twitch Bot 會告訴你綁定成功沒，如果已經綁定的話按鈕則會變成灰色，在按下去的話則就是取消綁定囉!
![](https://i.imgur.com/fdMIr42l.jpg)

---

接著 Twitch Bot 每個小時會幫你去 Twitch API 找找是否有人開台了，只要已經上線的直播主就會被推播，而會分別給兩個連結(Deep link & 一般網址)，但一天只會推播一次同一個直播主，避免每個小時重複通知影響使用者 🙂
![](https://i.imgur.com/lHoJHT4l.jpg)

# 巧妙結合 LINE Notify 以及 LIFF

有兩個使用方法可以讓 Bot 跟 Notify 結合:

1. 準備打至 Notify 時在 state 欄位上塞入使用者 LINE id，再透過 callback 時帶回來給 api 在藉此存下來，但如此一來比較**方便**但**安全性較不足**些。
2. 在 callback 後在 LIFF 上透過 client api 去取得當前使用者基本資料，在 call 自己的 api 來讓 Bot 與 Notify 連動，安全性較足但步驟較多。

## 美中不足的結合問題 - query string

在 Twitch Bot 中，我使用 LIFF 來開啟 Notify 是為了要透過 LINE 取得使用者的 ID，使用者選擇綁定之後，LIFF 會預設幫使用者加個 `state` 的 query string 欄位，但同時 Notify 也會把它的 `code` 以及 `state` 也加在 query string 上，如此組合起來網址就會變成：

```
https://liff.line.me?state=code={NOTIFY_CODE}&state={NOTIFY_STATE}
```

這樣的網址 api 接到之後一定會出問題，所以我就使用以下的 code 來幫我把它處理成我們認識的 query string:

```javascript
const query = req.query['liff.state'].split('?')[1].split('&');
const notifyPayload = { code: null, state: null };
query.forEach((el) => {
  const queryObj = el.split('=');
  if (queryObj[0] in notifyPayload) notifyPayload[queryObj[0]] = queryObj[1];
});
```

這樣 `notifyPayload` 就是我們平常 api 接到的 object 了。

## 使用 ejs 處理前端

以前寫 Rails 很習慣後端直接很習慣後端直接傳值給前端渲染做些簡單的 UI 處理，會使用 ejs 是因為需要讓使用者點選之後透過 LIFF 導到 LINE Notify 去做綁定的動作，因為還是需要簡單的前端功能，就用 ejs 來幫我解決問題囉！

> 以下我則是使用 express 搭配 ejs 做說明

我設定使用者綁定的 api 入口與 LINE Notify 確認綁定完後(`callback`)的 api 入口為:

1. /notify
   這個 api 做的事情比較簡單，只要負責將環境變數 `CLIENT_ID`、`REDIRECT_URI`、`LIFF_ID` 給前端把使用者導至 LINE Notify 綁定頁面。
2. /notify/confirm
   LINE Notify callback 一定要先打到 `後端(backend)` 才行，否則會有 `跨域(CORS)` 的問題，處理的部分可以參考[我的 Github](https://github.com/louis70109/Twitch-Bot/blob/master/src/controller/notifiesController.ts#L5)，處理完後一樣會導到前端畫面去做畫面渲染。

## LIFF 網址設定

LIFF 的申請與操作方法我就先不贅述，可以參考卡米哥的 [Bottender 結合 LIFF 文章](https://medium.com/@EtrexKuo/%E5%A6%82%E4%BD%95%E5%9C%A8-bottender-%E4%B8%AD%E4%BD%BF%E7%94%A8-liff-88634b187e72)，但申請的時候要記得是在 LINE Login 申請喔！否則可能會有日後 migration 的問題。
![Login LIFF](https://i.imgur.com/AcXEDeI.png)

> Tips: 紅色框框名字的部分在轉貼給別人的時候會顯示在視窗上的縮圖喔

在測試環境時 LINE Notify 設定這邊只要一次 LIFF 網址，往後只要在 LINE 後台去調整 webhook 的網址就好， Notify 這邊就不需要再掛心回來這裡設定，只要等到上線時申請再去弄一個即可。
![LINE Notify callback](https://i.imgur.com/PNVmNmn.png)

# 結論

除了使用 LIFF 綁定 Notify 遇到 query string 部分的問題，其餘在串接上其實都沒障礙，而且也充分展現每個微服務的功能，雖然還是會希望可以讓 Twitch Bot 可以自己發推播，不過既然 LINE 有限制也有解決方案，那就找他們的方法去做吧！

等接下來有空在接上 LINE 最近新出的 ShareTargetPicker 時再來擴增一下圖奇獸～

> ShareTargetPicker 可以參考這個網址: [點我我我我](https://engineering.linecorp.com/zh-hant/blog/share-target-picker-liff/)

三月 [Chatbot Taiwan 小聚](https://chatbots.kktix.cc/events/meetup-017)歡迎大家來參加哦！

> 防疫期間記得要 `多洗手`、`戴口罩`、`保持清潔`！ 防疫從你我做起 🙂
