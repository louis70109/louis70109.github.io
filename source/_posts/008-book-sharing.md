---
title: 【Vue.js 3】008 學習筆記
tags:
  - Vue
  - JavaScript
categories: JavaScript
date: 2021-02-11 21:43:48
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

![](https://nijialin.com/images/2021/008vue3.jpg)

# 前言

過年前收到了預購的 Vue.js 3 書，除了支持以外也希望透過紀錄把看過的東西在寫下來加深印象，以下就分享一些我看的過程中覺得有學習到的部分。

<!-- more -->

# 介紹

## HTML 引入問題

若放在 Head tag 上，可能會發現 Vue 沒有效果，因為瀏覽器還沒解析放入 <body> 中，因此要加入 `DOMContentLoaded` 來加入監聽事件。

```javascript
const vm = Vue.createApp({...});

document.addEventListener("DOMContentLoaded", ()=>{
  // When DOM ready.
  vm.mount('#app')
});
```

## 重新定義模板語法

為了避免`{{}}`被某些框架使用到(如 flask)，因此可以如下定義來避免掉這個問題：

```javascript
const vm = createApp({
  delimiters: ['%{','}%'],
  ...
})
```

## 避免環境污染：淺拷貝 vs 深拷貝

```javascript
{...data}
```

vs

```javascript
JSON.parse(JSON.stringify(data));
```

## v-model

### v-model 修飾子 (輸入框<input> 小技巧)

> 用法: <input v-model.ooo="message">

- `.lazy`: 將事件轉為 change 模式
  - 不希望輸入框太頻繁更新時則可使用
- `.number`: 即便輸入全數字，由 DOM API 拿到數值時也會被轉為字串
- `.trim`: 過濾輸入框文字前後的空白

### Select 下拉式選單問題

```html
<select v-model="selectParam">
  <option value="" disabled>請選擇</option>
  <option value="台北市">台北市</option>
  <option value="台中市">台中市</option>
</select>
```

- v-model 不可套在 **option** 上
- select 中無法對應到任何選項，標籤會預設為未選中狀態，iOS 中會讓使用者無法選擇第一個項目，因此 iOS 不會出發 change 事件。
  - 解決方案：第一個 option 加入 disabled 屬性，排除此問題

## 其他

- 盡可能避免使用 `_` 與 `$` 來命名參數，因會與 Vue 的核心內容衝突
