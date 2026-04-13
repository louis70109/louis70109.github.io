---
title: 【OBS】透過 Streamlabs 打造與觀眾互動的聊天室與訂閱資訊 | Youtube
tags:
  - OBS
  - Streamlabs
  - 直播
categories: 學習紀錄
date: 2021-10-03 23:27:01
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

![](https://nijialin.com/images/2021/obs-chat/11.png)

# 前言

忍編每天的樂趣就是看許多電競選手直播打遊戲分享他們遊戲上的樂趣以及不同的見解，隨著暗黑破壞神上市後我就想說玩的時候可以開個直播，雖然現在沒什麼人看(開好玩的)，但研究一些直播技巧與設定也覺得不錯，在網路上有看到許多前輩們有拍影片介紹以下的功能，但看完之後找不到當初那部影片，就先透過本篇來記錄一下如何收取**訂閱資訊**與**聊天室**內容(基於 Youtube)。

<!-- more -->

# 介紹


![](https://nijialin.com/images/2021/obs-chat/1.PNG)

首先先前往 [Streamlabs](https://streamlabs.com/) 的網站，進去之後按下上方的 Dashboard 的按鈕進去控制面板，但因為直播平台上需要存取權限才能拿到聊天室等等的資訊，這邊我就先用 Youtube 登入。

> Steamlabs 是什麼? 他是一個直播軟體，可以讓大家快速運用各個平台快速起直播，不管手機或是電腦皆可，可以很無痛的就上手開始直播，而後台 Dashboard 也提供了許多很棒的功能讓想客製化的玩家可以使用，當然也有訂閱服務，用喜歡的朋友可以用看看喔!


![](https://nijialin.com/images/2021/obs-chat/2.PNG)

進到 Dashboard 就會看到左側有許多東西加上內容，以下我們就來新增聊天室跟訂閱資訊到 OBS 當中

## Chat Box - 觀眾也想看到實況主畫面上有自己打的文字

![](https://nijialin.com/images/2021/obs-chat/0.PNG)

接著找到左邊紅色框框的內容(<mark>Alert Box</mark>, <mark>All Widgets</mark>)，這邊先選<mark>All Widgets</mark>，選擇右邊的 Chat Box

![](https://nijialin.com/images/2021/obs-chat/3.PNG)

接下來看到這邊，線上有許多的 plugin 可以讓大家自由去選擇，接著看到這裡有個 Widget URL 就是稍後要放在 OBS 裡面的網址(他是對應設定唯一的網址)，這邊我選擇往下選一般的形式來用(等有人看再來調整即可)

![](https://nijialin.com/images/2021/obs-chat/4.PNG)

往下之後有許多選項，不論是樣式、文字顏色、字體大小...等等都可以調整，調整完後複製剛剛說的 Widget URL 起來，切回到 OBS 畫面中

![](https://nijialin.com/images/2021/obs-chat/5.png)

來到 OBS 裡面，按下下方的 `＋` 來找到瀏覽器選項，給他大力的點下去

![](https://nijialin.com/images/2021/obs-chat/6.png)

進來之後把剛剛 Streamlabs 的 Widget URL 複製進網址欄位，確定儲存完之後可以選擇你想擺放的位置，接著我們就回到直播聊天室裡面去測試

> 這邊我已經先把 OBS 的訊號都打出去了，讓整個測試可以順利，其實即便有觀眾他們也應該很樂意看實況主現場測試

![](https://nijialin.com/images/2021/obs-chat/7.PNG)

找到當前直播的聊天室之後開始打字來真實測試一次

![](https://nijialin.com/images/2021/obs-chat/8.png)

回到 OBS 畫面中(觀眾看到的樣子)，就會看到剛剛打的文字

> 是不是覺得這樣越來越專業了呢?

## Alert Box - 訂閱時要有音效阿!

![](https://nijialin.com/images/2021/obs-chat/9.PNG)

既然有了聊天室，那訂閱訊息也不能漏(感謝OOO的訂閱 之類的文字)，選擇左邊的 **Alert Box**，一樣看到中間的 Widget URL，這是等等也要複製進去的網址

> 一般這些服務都會使用網址的方式讓用戶比較好操作，但在複製上也要注意是否有一些奇怪的資訊喔(ex: 電話號碼)

![](https://nijialin.com/images/2021/obs-chat/10.PNG)

往下可以調整你想要顯示的 gif、出現訂閱時間等等的設定，並且可以把上面的文字改移下，**{name}** 就是 Streamlabs 預設會把不同直播平台所接收到的使用者 ID 放入

![](https://nijialin.com/images/2021/obs-chat/11.png)

最後依照剛剛放聊天室的方式把連結貼近新增**瀏覽器**的網址中，回到 Streamlabs 中有個 **Test Subscribers** 的按鈕，按下去之後就會跑出如上圖所示的內容喔!

# 結論

弄成功之後自己覺得專業度提升許多(還是缺觀眾)，有了這些資訊之後觀眾在看台的時候也可以知道自己的資訊是否有出現在實況主的畫面當中(有被大家注意到)，如果你也有更多豐富的直播設定想法，歡迎在下面留言給我喔!