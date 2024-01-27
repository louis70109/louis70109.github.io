---
title: 如何在主流前端框架上設定 GTM?
categories: 學習紀錄
tags:
---


![](https://nijialin.com/images/2024/)
![](https://nijialin.com/images/common.jpeg)


# 前言


由於現在主流前端框架(Next, Nuxt)皆會透過 Virtual DOM 的方式渲染網站，在網站當中像是 class 就會有類似 `class="qwe-1234"` 的呈現方式，且會階層往下，但這在 google analytics 當中抓資料會有問題，因為跟一般 SPA 網站渲染方式呈現比較不同
<!-- more -->

## 延伸閱讀：Why Virtual DOM?

> Next 或 Nuxt 前端框架使用 virtual DOM 的主要原因是為了提升網頁的效能和開發體驗。virtual DOM 是一種用 JavaScript 物件來模擬真實 DOM 的技術，它可以減少對真實 DOM 的操作，從而避免不必要的 reflow 或 repaint，這些過程會消耗瀏覽器的資源。virtual DOM 還可以利用 diff 演算法來計算出新舊 virtual DOM 之間的差異，並只更新有變動的部分，這樣可以進一步提高效率。
> 除了效能的優勢，virtual DOM 也可以讓開發者更方便地處理資料和畫面的變化，而不需要直接操作 DOM API。這樣可以減少程式碼的複雜度，並提高可讀性和可維護性。virtual DOM 還可以實現服務端渲染 (SSR)，這對於 SEO 和首頁載入速度有很大的幫助。

# 介紹

假設我想在 GA 中監控事件以下範例:

```
<div class='qwe-123'>
  <div class='asd-456'>
    <button id='myClick'>Hello World</button>
  </div>
</div>
...
```

我們會想在 GTM 後台設定抓取 `id='myClick'`，設定就會跟以下很像：

![](https://nijialin.com/images/2024/ga/1.png)


接著到 Tag Assistant (preview page) 中開啟 Debug mode 時，會發現事件似乎沒有被 Fire


把事件點開之後才發現，怎麼內容都放在 Click Element? 初步猜測應該是 Virtual DOM 壓縮後讓 GA 找不到對應的欄位，因此將內容都放入 Element 當中

<fire 圖片>


因此這邊能解的方式如下：

![](https://nijialin.com/images/2024/ga/2.png)

透過 `CSS Selector` 來指定想 tracking 的 HTML tag，但這邊需要 Double confirm 的地方是，有時候實作上後面的階層可能不一定有東西，因此這邊能做的方式大概為:

```
#accountSetting, #accountSetting *
```

在 GTM CSS Selector 這邊可以用 `,` 來劃分條件，空白+`*` 則是代表後面不論接什麼，只要 ID = accountSetting 就能 fire tracking，

## Page Path 的 contains 設定

建議使用 `contains`，因為可能會因為不同網站導流而在後面放了許多參數，只要路徑有符合就可以收進來
![](https://nijialin.com/images/2024/ga/3.png)


# 結論
會發現這個操作方式是發現，設定了十幾個 click tracking event，結果只有幾個有成功，與同事合力才發現原來有 Virtual DOM 影響的問題，若大家在設定時有遇到相關問題，歡迎參考本篇文章

預祝大家資料都能被好好的 tracking !!