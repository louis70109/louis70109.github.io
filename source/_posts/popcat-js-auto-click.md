---
title: 坐而言不如起而行，用 puppeteer 來幫忙搶 popcat 金牌
tags:
  - JavaScript
  - Headless
categories: JavaScript
date: 2021-08-12 18:11:58
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

![](https://nijialin.com/images/2021/popcat/2021-08-12-16-27-10.png)

# 前言

這幾天很流行一個點擊迷因貓的網站 - [popcat](https://popcat.click/)，用戶可以透過點擊的方式來讓自己國家加分數，而昨天台灣本來還在第五名的位置，在寫文章的同時已經在第二名了(此時下方的名次好像卡住)。

近期也剛好在研究 headless browser 的內容，可以模擬用戶點選瀏覽器畫面，常見是使用在模擬測試等等，但既然現在是要搶金牌，那當然是直接拿來幫忙搶金牌啦！

- popcat Twitter: https://twitter.com/PopCatClick
- GitHub: https://github.com/louis70109/popcat-automation

<!-- more -->

# 介紹

![](https://nijialin.com/images/2021/popcat/2021-08-12-16-28-29.png)

而且當名次上升時，popcat twitter 會幫忙推送名次上去，大家為此就瘋狂在搶名次啦！

且看到還有相關的分享：

- 用遙控器點擊 popcat： https://twitter.com/akina_mochi_/status/1425052609308553221?s=20

![](https://nijialin.com/images/2021/popcat/2021-08-12-16-06-44.png)

- 多手指同步點擊 popcat： https://twitter.com/akina_mochi_/status/1425052609308553221?s=20

![](https://nijialin.com/images/2021/popcat/2021-08-12-16-07-23.png)

當然還有看到許多不同的 Client 用法，那本次就透過模擬瀏覽器點擊的方式來實作啦！

# Headless Browser 實作

使用 Google 開發的 Headless Chrome Node.js API - [Puppeteer](https://github.com/puppeteer/puppeteer) 來模擬用戶透過瀏覽器點擊來 popcat

1. 安裝套件

```
npm install puppeteer
```

2. 建立 index.js，引入 puppeteer 進 Node.js 後，用 IIFE 的方式匿名執行程式
   a. launch: 初始化瀏覽器核心，`headless: false` 來開啟瀏覽器畫面
   b. newPage(): 開新頁面
   c. goto(): 前進 **popcat** !!!
   d. setTimeout: 等待瀏覽器渲染完，避免還沒渲染就開始執行動作
   e. 無窮迴圈開始點畫面！點選 div 標籤的 class="cat-img" 位置

```javascript
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto('https://popcat.click/');

  await new Promise((r) => setTimeout(r, 1000));
  while (true) await page.click('div.cat-img');
})();
```

Demo:

> 因為轉成 gif 幀數降低

![](https://nijialin.com/images/2021/popcat/demo.gif)

程式碼參考 GitHub: https://github.com/louis70109/popcat-automation

# 結論

研究東西最開心的就是直接把它用上，這次 popcat 對我而言就是一個非常有成就的例子：），雖然不確定 popcat 後端 API 是否有限制，不過只要能夠搶分數就是要趕快上！

有任何建議或需要討論的部分歡迎留言讓我知道喔：Ｄ
