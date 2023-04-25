---
title: 【在 LINE 中用語音訂飲料】LINE Bot 輸入到 Speech
categories: Google
tags:
---


![](https://nijialin.com/images/2022/)

# 前言

- LINE Bot apple 語音格式 m4a 
- m4a 與 mp3 介紹，m4a品質好，mp3 泛用，可以直接 m4a轉mp3
- m4a == mp4 直接換檔名就好
  - https://zh.wikipedia.org/wiki/%E9%80%B2%E9%9A%8E%E9%9F%B3%E8%A8%8A%E7%B7%A8%E7%A2%BC

- mp3 
  - 採樣頻率最高為48kHz，對於超過48kHz採樣頻率的音訊無法編碼在MP3內。
  - [參考](https://zh.wikipedia.org/wiki/MP3)
- AAC (.m4a, mp4)
  - AAC支援包含一個串流中48個最高至96 kHz的全頻寬聲道
  - 更多的取樣頻率選擇(8 kHz至96 kHz，MP3為16 kHz至48 kHz)
  - [參考](https://zh.wikipedia.org/wiki/%E9%80%B2%E9%9A%8E%E9%9F%B3%E8%A8%8A%E7%B7%A8%E7%A2%BC)
- 因此猜測 m4a 直接換副檔名到 mp3 會把取樣頻率壓在最高的 48kHz，所以改副檔名這招應該是沒問題
- 上傳到 Cloud Bucket

<!-- more -->


# 結論
