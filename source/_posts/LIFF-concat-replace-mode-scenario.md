---
title: LIFF v2.3 更新內容 - Concatenate & Replace 模式
tags:
  - LINE
  - LIFF
categories: LINE
date: 2020-07-21 11:32:08
---

# 前言

大家好，我是 LINE Taiwan 的 Tech Evangelist – NiJia Lin。

在尚未更新前時常會遇到問題就是網址後面會接上 `liff.state=` 抑或是會在原始 target url 上加上 斜線(`/`) 這類相關的問題，開發者(包括我)都需要使用相關的 workaround 去解套，這邊提供之前我寫的 [Twitch-Bot](https://github.com/louis70109/Twitch-Bot/blob/master/src/controller/notifiesController.ts#L6) 的 Javascript workaround 來處理 `liff.state` 的問題：

```
const query = req.query['liff.state'].split('?')[1].split('&');
const notifyPayload = { code: null, state: null };
query.forEach(el => {
  const queryObj = el.split('=');
  if (queryObj[0] in notifyPayload)
    notifyPayload[queryObj[0]] = queryObj[1];
});
const code = notifyPayload.code;
const userId = notifyPayload.state;
```

這樣的解法可以解決我的問題但會讓開發有點綁手綁腳的，但隨著 LIFF v2.3 改版上線後出現了兩個模式提供選擇，分別是 `Concatenate` 與 `Replace` 兩個選項，如下圖所示：

![](https://i.imgur.com/SkUlT3P.png)

在 v2.3 的更新中將之前所會遇到問題以及已有對應 workaround 的版本變成 `Replace mode`，而新推出的 `Concatenate mode` 則已解決相關的議題。也許在使用上還是會有點困惑，以下就使用一些 Scenario 為各位介紹一下這兩個功能之間的差異以及解決了什麼問題 🙂。

<!-- more -->

# 介紹

這是在 2.3 後出現的 mode，以下是一些範例供大家參考，主要以 slash(`/`)、Query String、LIFF 網址接`子路徑`(`sub path`) 三個測向讓大家快速了解兩個 mode 的差異。

## Concatenate mode

在這個模式中處理掉先前 LIFF 版本有的一些問題，下面列幾點簡單敘述一下：

- 斜線（`/`): 之前出現個問題是當開發者將 LIFF url 加上一個 斜線(`/`) 時會造成`原始 Domain+斜線` 的問題(https://YOUR_DOMAIN/)，在某些程式中會將這兩個結果分開(有無斜線的網址)，而在 `case 1` 中目前皆會指向至最初設定的 Target Domain，避免相同問題重複產生。
- `liff.state=`: Replace 的 `case 3` 的案例中中回傳的網址中會出現 `liff.state=`，而在 Concatenate 中已經將這部分排除。
- 子路徑(sub path)消失問題: 過往 `case 6` 中當使用者進入網址後，應當結果是 `/friend/brown`，但 `/friend` 這個路徑被忽略的問題。在 `v2.3` 的版本中已經修正了之前會忽略原始 `/friend` 這個 sub path 的問題。

大家可以參考以下的 scenario 去測試一下實際情況：

| 編號 | 原始網址                   | 使用者進入網址                               | 結果顯示網址                               |
| ---- | -------------------------- | -------------------------------------------- | ------------------------------------------ |
| 1    | https://YOUR_DOMAIN        | https://liff.line.me/LIFF_ID/                | https://YOUR_DOMAIN                        |
| 2    | https://YOUR_DOMAIN        | https://liff.line.me/LIFF_ID/brown/?q=2#hash | https://YOUR_DOMAIN/brown/?q=2#hash        |
| 3    | https://YOUR_DOMAIN/friend | https://liff.line.me/LIFF_ID                 | https://YOUR_DOMAIN/friend                 |
| 4    | https://YOUR_DOMAIN/friend | https://liff.line.me/LIFF_ID/                | https://YOUR_DOMAIN/friend                 |
| 5    | https://YOUR_DOMAIN/friend | https://liff.line.me/LIFF_ID/brown           | https://YOUR_DOMAIN/friend/brown           |
| 6    | https://YOUR_DOMAIN/friend | https://liff.line.me/LIFF_ID/brown/?q=2#hash | https://YOUR_DOMAIN/friend/brown/?q=2#hash |

## Replace mode

若是在改版之前已存在的 LIFF pages 並且有相對應 workaround 的朋友但目前 LIFF migrate 優先權相對低的話可以繼續沿用這個模式，讓原本的存在的程式可以繼續處理對應邏輯，不過建議各位開發者朋友儘早將轉移至 `Concatenate` 已避免日後其他問題產生。而以下則是原本 Replace mode 相關的一些參數測試：

| 編號 | 原始網址                   | 使用者進入網址                               | 結果顯示網址                           |
| ---- | -------------------------- | -------------------------------------------- | -------------------------------------- |
| 1    | https://YOUR_DOMAIN        | https://liff.line.me/LIFF_ID/                | https://YOUR_DOMAIN/                   |
| 2    | https://YOUR_DOMAIN        | https://liff.line.me/LIFF_ID/brown/?q=2#hash | https://YOUR_DOMAIN/brown/?q=2         |
| 3    | https://YOUR_DOMAIN/friend | https://liff.line.me/LIFF_ID                 | https://YOUR_DOMAIN/friend?liff.state= |
| 4    | https://YOUR_DOMAIN/friend | https://liff.line.me/LIFF_ID/                | https://YOUR_DOMAIN/friend             |
| 5    | https://YOUR_DOMAIN/friend | https://liff.line.me/LIFF_ID/brown           | https://YOUR_DOMAIN/brown              |
| 6    | https://YOUR_DOMAIN/friend | https://liff.line.me/LIFF_ID/brown/?q=2#hash | https://YOUR_DOMAIN/brown/?q=2         |

在這個模式中會遇到幾個問題：

- Hash tag 的值消失
- 出現 liff.state=
- 斜線判斷問題

所以還是建議大家若有新開 LIFF page 請選擇 Concatenate 模式，再往後的支援度上比較不會遇到此類的問題且不需要 migrate 兩個模式的 workaround。

# 註記

當時寫 workaround 環境約落於：

- LINE ➡️ v10.11

在上述的表格中皆用測試結果:

- LIFF JS SDK ➡️ 2.3.1
- LINE APP ➡️ v10.12
- iOS ➡️ 13.3.1

> 提醒：在 v2.3 之前建立的 LIFF 模式皆為 `Replace`，v2.3 後新增的 LIFF page 模式皆**預設**為 `Concatenate`，要麻煩各位多注意一下模式上的選擇。

習慣使用套件可朋友可以參考我們官方出的套件 - [@line/liff](https://www.npmjs.com/package/@line/liff)。

## CDN 路徑注意

測試時若未使用 npm package 時需要注意 CDN 版本，一般來說使用 https://static.line-scdn.net/liff/edge/2/sdk.js 它會抓最新版本，
但若是**指定版本**的話  則需像範例網址 ➡️ https://static.line-scdn.net/liff/edge/ **versions/2.1.13** /sdk.js 去指定。

兩個路徑**最大差異**就在於網址中會多一個 `versions` 的 path，使用上需多注意！

> 欲了解更多相關內容請參考 [LINE document](https://developers.line.biz/en/docs/liff/developing-liff-apps/#specify-cdn-path)

# 結論

之前在 Replace mode 中會因為不同的作業系統(`iOS/Android`)導致輸出結果不同，在引入 Concatenate mode 之後排除了這個問題，讓兩個系統的使用者在點選 LIFF page 後會引導至對應的頁面。

這次透過上述範例快速帶大家了解這次 v2.3 更新的 `Replace` & `Concatenate` 以外，我之前寫的 `liff.state=` 的 workaround 也可以刪除了 🎉。

此外使用相關功能時必須依循著下面兩點：

- LINE APP 版本必須在 v10.12 (含)以上才能測試此功能喔！若低於 v10.12 以下可能造成不同輸出結果。
- JS SDK 請使用 v2.3.1。

而目前開發團隊正逐步的修正每個議題，接下來隨著 LIFF 的新功能上線時我們會將第一手將資訊釋出讓大家知道 🙂。

# 參考

- JS SDK release: [LIFF v2.3.1 released](https://developers.line.biz/en/news/2020/07/16/release-liff-2.3.1/)
- [LIFF v2.3.0 released](https://developers.line.biz/en/news/2020/06/29/release-liff-2.3/)
