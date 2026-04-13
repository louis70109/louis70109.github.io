---
title: 幫 QR Code 加上背景圖，別只留下黑白！
tags:
  - JavaScript
  - Canvas
  - QR Code
categories: JavaScript
date: 2023-02-05 18:43:57
---

![](https://github.com/louis70109/qrcode-background-generator/raw/main/qrcode.png?raw=true)

> 來自 chatGPT 的說明：它可以生成一個帶有背景圖片的 QR code。這個 QR code 產生器可以通過 GitHub 上的項目連結 https://github.com/louis70109/qrcode-background-generator 來使用。特點是，它可以讓使用者自行選擇背景圖片，並在其上生成一個具有特殊圖案的 QR code，使 QR code 看起來更具吸引力和美感。這個 QR code 產生器可以給您的商業或個人項目帶來更多的創意和更佳的用戶體驗。

# 前言

前幾天在 FB 社群中意外的點到[貝克菜 FB](https://www.facebook.com/tony.tsai/posts/pfbid063T7uwSme1k8dqqoDC2Q5RsJT9JVBBHB2n3bQiVo6LFZjPg39f8G3YSA1S7mBQQml?comment_id=1414642782639170&notif_id=1675426505084880&notif_t=feedback_reaction_generic&ref=notif) 中分享的內容(範例如下)，其中寫到：「<mark>讓你的 QR Code 更符合品牌形象，而不是停留在黑白</mark>」。

它可以讓你自行選擇背景圖片，使 QR code 看起來更有設計感和美觀。這對於您的商業或個人項目來說，可以提高曝光率和吸引力，並提高用戶體驗。

<!-- more -->

![](https://scontent.frmq2-1.fna.fbcdn.net/v/t39.30808-6/328689276_1224285545106496_5760418307112715847_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=730e14&_nc_ohc=eFqj_2RKTwkAX99JEtM&_nc_ht=scontent.frmq2-1.fna&oh=00_AfBbEk1FeFkUNjxA2JlYyLLl-_G9TcCBSLixwAy9SFuWHw&oe=63E4F33A)

> 引用至： [貝克菜 FB](https://www.facebook.com/tony.tsai/posts/pfbid063T7uwSme1k8dqqoDC2Q5RsJT9JVBBHB2n3bQiVo6LFZjPg39f8G3YSA1S7mBQQml?comment_id=1414642782639170&notif_id=1675426505084880&notif_t=feedback_reaction_generic&ref=notif)

剛好最近也正在準備研討會，更是被這句話深深的打中，好奇心之下找到了[Awesome-qr.js](https://github.com/SumiMakito/Awesome-qr.js/blob/master/README.md)，以下就快速分享個實作心得。

> <mark>[qrcode-background-generator 專案](https://github.com/louis70109/qrcode-background-generator)</mark>

# 介紹

當時 Survey 了兩個版本：

- JS 版本：[sumimakito/Awesome-qr.js](<(https://github.com/SumiMakito/Awesome-qr.js/blob/master/README.md)>)
  - 最後更新時間：2021/11/17
  - 支援前/後端，後端需先安裝 [node-canvas](https://github.com/Automattic/node-canvas#installation) 的 Canvas 引擎來驅動。
    - 每個 OS 都有整理相依套件
  - 文件很完整，每功能都寫很詳細。
- Python 版本：[x-hw/amazing-qr](https://github.com/x-hw/amazing-qr)
  - 最後更新： 2021/05/21
  - 有簡中文件、Command line 工具

雖然平常寫 Python 居多，但為考量支援度，未來可以放入我以前寫的 [Announcer](https://github.com/louis70109/Announcer) 中，讓 LIFF 也可以分享(想像是美好的)，之後還是選擇 NodeJS 版本。

在 AwesomeQR 中，現在版本可以使用 `dotScale`，但文件中建議可使用 `components` 去控制 QR code 中點點的參數。

> This option is yet to be removed. You can still use this option to control the scaling of the QR code parts in the legacy way.

## 透過 `<img>` + Base64 來顯示圖片

大致上在 <mark>[qrcode-background-generator 專案](https://github.com/louis70109/qrcode-background-generator)</mark>中都是網路上皆可找到的範例程式，而在本地開發時因為環境都很安裝許多套件，因此測試時好處理。

但部署上去後若沒 encode，則在 Server-side render 時 `res.write()` 裡則會變成亂碼。因此這邊就 `base64` 並透過 `<img>` 放上去，這樣就不會有問題了。

```javascript
// 把檔案的結構資料轉成 base64
const b64 = Buffer.from(buffer).toString('base64');
// 定義圖片格式
const mimeType = 'image/png'; // e.g., image/png

// 用 <img> 展示 base64
res.writeHead(200, { 'Content-Type': 'text/html' });
res.write(`<img src="data:${mimeType};base64,${b64}" />`);
```

## 相依套件安裝

在 OS 中因為 canvas 需要相依套件，因此在 [Dockerfile](https://github.com/louis70109/qrcode-background-generator/blob/main/Dockerfile) 上就放入相關套件的安裝。

```
apk add --update --no-cache \
    make \
    g++ \
    jpeg-dev \
    cairo-dev \
    giflib-dev \
    pango-dev \
    libtool \
    autoconf \
    automake
```

# 結論

- 圖片建議 QR Code 建議用黑的，在 iPhone 13 掃描情況下`黑色`還是辨識度高，`autoColor` 建議設定成 `False`，避免接收到背景顏色改變。

![](https://github.com/louis70109/qrcode-background-generator/raw/main/qrcode.png?raw=true)

- 畢竟處理畫面上用 Canvas 還是前端支援度比較高(瀏覽器)，因為 NodeJS 是使用 V8 引擎去實作的，因此支援度應該 > Python (?)，最後就選擇 NodeJS 作為這次的開發。

最後，這個 QR code generator 是開源的，您可以透過 Pull Request 來修改這程式碼，以滿足您的特定需求。這對於開發者來說是一個很好的選擇，滿足您的商業或個人需求，並提高您的創意和體驗。
