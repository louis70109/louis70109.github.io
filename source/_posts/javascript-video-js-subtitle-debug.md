---
title: 處理 video.js 字幕編碼問題 | 使用 blob 放上字幕檔
tags:
  - video.js
  - JavaScript
  - WEBVTT
  - 字幕
categories: JavaScript
date: 2022-04-16 22:09:31
---

# 前言

因為放在 bucket 上的檔案預設是用 utf-8 上傳，但如果是中文字變成亂碼。因此想說好看一點，在後端上傳前把東西都先用 big5 encode 完後再傳到 bucket，檔案看起來就正常了

- video.js 前端若用 localhost 會拉不到影片
  - 至少要用 IP 的方式開啟才能讀到`影片`跟`字幕`
- 如果 `字幕檔` 是抓遠端 bucket，會遇到 CORS 的問題
  - 本篇使用 blob 的方式建立一個`暫時的網址`給字幕使用

<!-- more -->

# 介紹

呼救了後端來 big5 格式的中文字幕檔，WEBVTT 相關的格式都幫忙 format 好了，想說就透過 Blob 建立一個網址放上去

```javascript
const vttBlob = new Blob([vttText], { type: 'text/vtt' });
const blobURL = URL.createObjectURL(vttBlob);
return blobURL;
```

結果開啟 blob url 之後，發現居然連 `\n` 都老老實實的放下去(如下圖)，因此這邊就用 `eval()` 來協助重建字串。

```javascript
const vttText = eval(localStorage.getItem('subtitles')
```

![](https://nijialin.com/images/subtitle/0-1.png)

想說 blob 出來是亂碼，找了一下就使用 iconv 來協助轉成 big5，看起來畫面是成功的

```javascript
const vttText = iconv.encode(eval(localStorage.getItem('subtitles')), 'big5');
```

![](https://nijialin.com/images/subtitle/1-2.png)

結果重新整理畫面後，看到影片上居然都是亂碼...
![](https://nijialin.com/images/subtitle/1-1.png)

接著實驗一下把 iconv.encode() 先拔掉之後，雖然從 blob url 上看是亂碼，但是到影片播放器中卻是正常的，所以看來 video.js 會協助把中文的字幕(vtt)`自動的轉成 big5` 的格式，因此若有在使用時可以注意一下喔！

# 結論

video.js 影片部分可以拉沒公開的 Google Cloud Storage(GCS) 上的影片，但字幕檔拉的時候會有 CORS 的問題(搞不清楚)，因此使用 Blob 方式來協助這次的使用，因為這次 big5, utf-8 的問題繞得很大一圈，不過至少東西可以繼續往下開發了，後續 side project 出來之後再繼續跟大家分享～
