---
title: 【WFH 戰記】讓舊的 iPhone 手機變成 Mac 的隨身視訊鏡頭 | feat. OBS
tags:
  - iPhone
  - Mac
  - 視訊
categories: WFH 戰記
date: 2022-06-19 01:18:31
---


# 裝備準備 - iPhone + 傳輸線(TypeC)

![](https://nijialin.com/images/2022/use-iphone-cam/0-1.JPG)

- iPhone XR
- TypeC 傳輸線
- Macbook Pro 15"

江湖再走 Mac 要有，且現代手機鏡頭一個比一個還猛，當然蘋果用戶也會有機會換下舊的手機，這邊只要這三個東西就可以往接下來的步驟前進囉!


<!-- more -->

# OBS

除了直播/錄影之外，OBS有另一個好用的東西就是**虛擬鏡頭**，讓大家可以客製化任何的東西，全部讓OBS幫你套在視訊上，這種需求可能在某些分享畫面中偵數會很低，透過視訊就可以拉高(約 30FPS)，因此以下就用虛擬鯨頭來帶大家把舊的 iPhone 客製成你的視訊鏡頭!

## 加入場景

![](https://nijialin.com/images/2022/use-iphone-cam/1.png)

OBS 彈性很高，可以設定許多組不同的設定，讓應用場景可以客製化，因此這邊就先加入一個 [**視訊鏡頭**] 場景

![](https://nijialin.com/images/2022/use-iphone-cam/2.png)

接著在場景內的 **來源**(Source) 中的**視訊擷取裝置**，在 Mac 上很方便直接把 iPhone 當成一個來源

![](https://nijialin.com/images/2022/use-iphone-cam/3.png)

再下拉選單中找到你的 iPhone 名字

![](https://nijialin.com/images/2022/use-iphone-cam/4.png)

會看到有一個長方形的框框被放入 OBS 當中，但手機可能會**放橫的**，因此我們就先來翻轉成我們要的方向

![](https://nijialin.com/images/2022/use-iphone-cam/5.png)

在畫面上點選*右鍵*找到**變型**，接著會有以下兩種使用

- 翻轉到自己要的位置
- 稍後會用到**變型設定....**

![](https://nijialin.com/images/2022/use-iphone-cam/8.png)

一樣右鍵選擇 **變型設定....**，陸續把上下左右的剪裁逐步調整成適合的大小，這邊我 iPhone 相機使用 1:1 的大小，因此裁切起來就要切成正方形

> 16:9 之類的會出現像是拍照鈕，畫面上不太適合出現，因此我就使用1:1。

## 客製化你的視訊鏡頭

![](https://nijialin.com/images/2022/use-iphone-cam/9.png)

調整完之後就可以在畫面上開始放上各種圖片，讓你整個視訊看起來很繽紛，且可以用到手機的人像功能，但缺點是下面會出現一個自然光的字，如果不想出現就還是用一般的拍照囉!

## 啟動鏡頭 + 開啟會議軟體

![](https://nijialin.com/images/2022/use-iphone-cam/10.png)

在 OBS 右下角開啟**虛擬相機**，這樣就可以在各大會議軟體中使用啦，接著我使用 Zoom 來當作這次的測試

![](https://nijialin.com/images/2022/use-iphone-cam/12.png)

在視訊旁邊就可以選擇 OBS Virtual Camera，這樣就可以看到你的 iPhone 變成你的視訊鏡頭，是不是覺得很方便呢?

> zoom 預設讓自己看到翻轉，這樣狀態是正常的，不用特別去調整。

# 主委加碼 iPhone 九宮格怎麼關

![](https://nijialin.com/images/2022/use-iphone-cam/1-3.PNG)

開啟設定的地方，往下找到相機的選項。

![](https://nijialin.com/images/2022/use-iphone-cam/1-2.PNG)

找到格線的地方把他關起來就可以囉。


# 結論

雖然使用 iPhone 當作視訊鏡頭有點殺雞用牛刀，但透過這種方式讓遠距或接案工作者在隨時隨地都可以讓你的視訊會議質感上升，在疫情的環境下能看到精緻的畫面大家眼睛也會為之一亮呢!!

如果你也覺得這篇文章有用，歡迎分享給更多人知道喔！接下來嘗試看看 Windows 到底怎麼接上 iPhone 來當鏡頭。

<style>
  section.compact {
    font-size: 150%  
  }
  img[alt~="center"] {
    display: block;
    margin: 0 auto;
  }
</style>