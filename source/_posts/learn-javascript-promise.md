---
title: 【Javascript】你知道你常用的 Promise 嗎?
tags:
  - Promise
  - IIFE
  - Arrow Function
  - Callback
categories: JavaScript
abbrlink: 1394405821
date: 2020-06-13 22:12:08
---

# 前言

在寫 Javascript 時一定會看到有套件或是範例有使用到 callback function，在過往的 coding 過程中最擔心的問題就是遇到 Callback Hell(也就是俗稱的波動拳)，最常見的範例為：

```
doSomething(function(result) {
  doSomethingElse(result, function(newResult) {
    doThirdThing(newResult, function(finalResult) {
      console.log('Got the final result: ' + finalResult);
    }, failureCallback);
  }, failureCallback);
}, failureCallback);
```

> Sample from [MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Using_promises)

為了降低波動拳的出現機率，因此就就誕生了 `Promise` 來幫忙處理 Hell world 的問題，至於如何處理就透過接下來就說明並介紹用法。

<!-- more -->

# 介紹

Promise 是 Javascript 的`非同步運算的物件`，並且包含 `resolve`(成功)、`reject`(失敗)、`pending`(處理中)三種狀態，接下來就看看介紹吧！

## Promise 提供了什麼？

主要提供了 `.then()` 以及 `.catch()` 方法讓使用者可以做 Promise Chain 去串聯方法，它的用意是讓之前的 Chain 在做完之後去執行接下來的事情，以 [Axios](https://github.com/axios/axios) 為例：

```
axios.get('https://www.example.com')
  .then(function(result) {...})
  .catch(function(error) {...})
```

可以在輪到 `get()` 執行後若成功則進去 `.then()`，反之錯誤則 `.catch()`，若只看這樣不清楚還是不懂，那來與以前的寫法比對：

```
function successCallback(result) {...}
function failureCallback(error) {...}

GetExampleCode(callExampleUrl, successCallback, failureCallback)
```

看完以前的的寫法，使用 Promise 邏輯是不是比較順暢且直覺呢？

看完範例後，接著看一下怎麼實作一個 Promise 吧！

## 製作一個【判斷數字】的 Promise

### 了解 Promise 參數

新增一個 `Promise` 時一定要兩個參數(`resolve` & `reject`)，`resolve` 用在當 Promise 裡的判斷式成功後所需要回傳的物件，而 `reject` 顧名思義就是當答案**非預期**時的回傳物件。

### 實作 Implementation

看完解釋之後，接著使用 Chrome 作為範例，首先按下 `F12` 並至 `Console` 畫面：
![](https://i.imgur.com/0bUzvKS.png)

接著我們來定義範例的 numberCondition 函式：

```
function numberCondition(num){
  let result = new Promise(function(resolve, reject){
    if(num === 0){
      resolve("Yeah you got it, the number is 0")
    }else{
     reject(new Error('No No, your number is wrong'))
    }
  })
  return result
}
```

#### Bonus - 使用 early return 讓程式碼更簡潔些

這個方法依照我的經驗在 Ruby、Javascript、Python 都有用過，但 Javascript 這邊用的是最平凡，若看到其他 project 的程式碼有這樣使用時千萬別慌張，其實只是合在一起寫而已。

```
function numberCondition(num){
  return new Promise(function(resolve, reject){
    if(num === 0){
      resolve("Yeah you got it, the number is 0")
    }else{
     reject(new Error('No No, your number is wrong'))
    }
  })
}
```

上述範例當 `num` 等於 0 時就回傳一組字串告訴使用者答對，反之則回傳錯誤訊息的 Error 物件，最後則是把結果 return 回去。

### 結果

Promise 寫完了，接下來就來呼叫他吧！

```
numberCondition(999)
  .then(function(result) { console.log("答對了！") })
  .catch(function(error) { console.log("糟糕，答錯了") })
```

貼到 Chrome 開發者工具列(Console)上吧！接著再把 999 改成 0 會就會跑到 `.then` 囉。
![](https://i.imgur.com/6456opd.png)

> 這樣有沒有發現平常就在使用 Promise 呢 🙂！

# 我知道 Promise 了，那 Async/Await 跟它有什麼關係？

自己做了一個 Promise 後，使用它需要一直 `.then()`、`.catch()`，接下來就來介紹一下 `async/await` 在 Promise 之後才誕生的語法糖。

## 動手做 Implementation

首先我們先複製前面的 Promise code 過來:

```
function numberCondition(num){
  let result = new Promise(function(resolve, reject){
    if(num === 0){
      resolve("Yeah you got it, the number is 0")
    }else{
     reject(new Error('No No, your number is wrong'))
    }
  })
  return result
}
```

這邊就把 `.then()` 的寫法並使用 [IIFE](https://developer.mozilla.org/zh-TW/docs/Glossary/IIFE) 搭配`匿名函式`直接執行:

```
(async function (){
    const result = await numberCondition(0)
    console.log(result)
})()
```

以上是原生的寫法搭配 IIFE，以下則是使用 Arrow Function 做範例:

```
(async () => {
    const result = await numberCondition(0)
    console.log(result)
})()
```

> 當 function 裡有使用到 await 時，外面一定要有 async 的字眼，否則會出錯。

一樣貼至 Chrome 的開發者工具列：

![](https://i.imgur.com/HT9eGlC.png)

與 Promise 的觸發方式是一樣的，若到 `resolve` 成功階段時則附值於 `result`，反之則直接 throw Error()。

> 在這邊的錯誤處理需要使用 try...catch 去 handle error

## 好處

若是從其他語言來的朋友，使用 async/await 的寫法邏輯上會較通順，而若使用一般的 Promise 則容易搞混當前程式執行位置，而 async/await 語法糖除了讓其他語言開發者可以更快速理解以外，也能讓程式邏輯能夠直接順下去，當然最後要加入 Javascript 這個家庭時了解 `Callback` 仍是開發 Javascript 裡必要的功能 👍。

## 待討論部分

由於是在 Promise 之後才出現的語法，若接手的專案本身並未支援到 async/await 語法時則需要將相關邏輯轉換使用 `.then()`、`.catch()` 去處理 Promise，在專案的`支援度`上這部分則需要多考慮。

# 結論

因為接觸到 [Bottender](https://github.com/Yoctol/bottender) 才接觸到 Promise 以及 async/await 這系列的工具，在理解上也花了好長一段時間才轉換過來，藉由本篇紀錄我釐清的過程，透過這些例子希望讓大家能夠更快速的了解 Promise 🙂。
