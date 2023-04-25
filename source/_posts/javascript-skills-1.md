---
title: 【JavaScript】Function 呈現方式、修改 Array 長度、型態轉換、Unique Array value
tags:
  - JavaScript
categories: JavaScript
date: 2020-09-26 22:28:16
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

最近在各個地方學到到一些 JavaScript 的小技巧，練習過後快速寫一篇小文章記錄下來 📖，也把一些實際上有用到的小技巧一併記錄下來分享給大家。

<!-- more -->

# 介紹

以下的測試程式碼皆可直接在 node 環境中貼上執行，直接在終端機(ex: iTerm)中下 `node` 即可進入環境，另外也可以貼到 Chrome 的 Console(按 F12)。

## 過濾陣列重複的值

[MDN 解釋](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set): Set objects are collections of values. You can iterate through the elements of a set in insertion order. A value in the Set may only occur once; it is unique in the Set's collection.

簡單來說: 會把重複的值過濾掉讓它(value)只出現一次，並創建一個新的陣列

```javascript
const tmp = [1, 1, 1, 2, 2, 3, 4, 5, 6, 6, 6, 7];
new Set(tmp);
//result: Set { 1, 2, 3, 4, 5, 6, 7 }
```

## 轉換成 Boolean

```javascript
!5;
//false
!"5";
//false
![];
//false
!{};
//false
!"";
//true
```

## 強制型態轉換

以下提供常見與 JavaScript 提供的另一種方法:

### 字串 與 整數 互換

```javascript
const b = 123; // Integer
// 轉字串
String(b); // '123'
b + ""; // '123'

// 字串轉整數
const c = "456";
Number(c); // 456
+c; // 456

// 整數 -> 字串 -> 整數
Number(String(b)); // 123
+(b + ""); // 123
```

### 浮點數 與 整數

更多使用方法可以參考 [stackoverflow](https://stackoverflow.com/questions/596467/how-do-i-convert-a-float-number-to-a-whole-number-in-javascript)

```javascript
const d = 123.45;
parseInt(d); // 123
d | 0; // 123
~~d; //123
>>d; //123
```

## 陣列長度修改

這個使用方式會更改到原本的陣列

```javascript
const arr = [1, 2, 3, 4, 5, 6];
arr.length = 3;
// [1, 2, 3]
```

若不想更改到原本的陣列可以使用 `filter` 來操作:

```javascript
arr.filter((el) => arr.indexOf(el) < 3);
```

## 常見函式呈現方法

```javascript
function campaign1() {
  console.log("Hello 1 world");
}

const campaign2 = function () {
  console.log("Hello 2 world");
};
const campaign3 = () => console.log("Hello 3 world");

// 特定需求像是: 遞迴
const campaign4 = function fac(n) {
  return n < 2 ? 1 : n * fac(n - 1);
};
console.log(campaign4(3));
```

> 在操作上若要宣告當下就執行，可以參考 「[IIFE](https://developer.mozilla.org/zh-TW/docs/Glossary/IIFE)」

# 結論

看過這些用法後要記得練習讓自己對這些用法更加有印象喔！若之後有學到不同的技巧實在寫新的文章分享。 👍
