---
title: 【續集】如何只使用一台 Mac 進行直播 | BlockHole | OBS | Mac
tags:
  - BlockHole
  - OBS
  - Mac
categories: 直播
date: 2021-06-19 18:19:20
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

常常看著我的另外一篇設定直播的文章 - [如何只使用一台 Mac 進行直播 feat. SoundFlower, OBS, Youtube](https://nijialin.com/2020/11/29/mac-stream-soundflower/) 長期蟬聯本部落格的流量冠軍(感謝大家愛戴)。當時這篇的目標是為了解決透過 OBS 直播時也要同時把桌面音訊打出去(e.g. 線上研討會)，讓觀眾可以同步聽到在電腦中所收到的聲音。

而當時遇到的問題是 SoundFlower 會把聲音通通抓走，導致直播操作者**無法透過麥克風來同步輸入聲音**，並需要透過其他軟體(LINE、Zoom、Google meet...)從另一個裝置打音訊進去。當然這也是解法，但若裝置沒有這麼多的話可就會造成困擾。

<!-- more -->

# 介紹

而本次要介紹的另一個直播方案是透過 [BlockHole](https://github.com/ExistentialAudio/BlackHole) 這個工具幫助直播可以把桌面聲音一起打進直播中，並解決掉以上的那些問題

首先官方有提供 Source Code 並且點選在下方提供[下載連結](https://existential.audio/blackhole/?pk_campaign=github&pk_kwd=readme)，僅需提供信箱以及姓名即可下載。

![](https://nijialin.com/images/2021/blockhole/1.png)

在這個註冊頁面往下滑會看到一些基本資訊，除了用途、粉絲團資訊外，最重要的就是它支援 SoundFlower 沒支援的 M1 晶片，一般來說 Mac 大版更新後時常會有許多東西會有相容性的問題，個人認為 BlockHole 可能是用 C 語言寫的，相對 Obj-C 開發的 SoundFlower 能維護的人也較多 (C 語言不敗！)

> 尤其 SoundFlower 在上次更新時似乎已經是 2016 的樣子 ❓ 因此後面的版本就沒有持續開發跟進。

![](https://nijialin.com/images/2021/blockhole/2.png)

送出後他會寄信含有認證碼的網址到你的信箱，讓你透過連結認證後讓你下載安裝檔。
![](https://nijialin.com/images/2021/blockhole/3.png)

點進來後選擇 16ch 的版本 (東西都選最多的 ❓)，安裝完就如下
![](https://nijialin.com/images/2021/blockhole/4.png)

## OBS setting

接著進到 OBS 右下角的設定中(還沒安裝請[參考這篇](<(https://nijialin.com/2020/11/29/mac-stream-soundflower/)>))
![](https://nijialin.com/images/2021/blockhole/5.png)，在麥克風選項中選上 BlockHole16h 的選項，另一個用上自己的麥克風，讓 OBS 幫你做多重輸入，如果是透過 Mac 的 MIDI 之類的多重音訊輸入 OBS 似乎是不支援的。

在設定完這部分後就可以進`串流`設定看要去哪個平台直播囉！ 😇

## 小結

你可能會很困惑為什麼在用 SoundFlower 時是在`輸出時`選，但在這邊卻是在`輸入時`選，就目前實測起來時 SoundFlower 的做法是把輸出端的聲音全部接走，因此若你有參考此篇 [如何只使用一台 Mac 進行直播 feat. SoundFlower, OBS, Youtube](https://nijialin.com/2020/11/29/mac-stream-soundflower/) 的話，你會發現無法在電腦前聽到聲音，但在直播上聽得到聲音(記憶中直播機也無法打出麥克風)。

而這次使用 BlockHole 他則是透過`輸入`的方式進入，在 OBS 中可以同步設定你自己的麥克風，且兩個不會衝突，簡單說它的做法就是將**電腦桌面的聲音**透過**轉換成輸入**的方式，因此此種方式就不會讓直播機(筆電)聽不到聲音，就可以即時跟同個會議(對話群組)的人講話了。(~~雖然電腦會很燙~~)

# 結論

SoundFlower 與 BlockHole 的共通點：

- 目前不支援用藍牙耳機設備，感覺可能是系統層的某個地方被接走導致的(猜測)，BlockHole [下方也有註明](https://github.com/ExistentialAudio/BlackHole#airpods-with-an-aggregatemulti-output-is-not-working)，如果你對討論有興趣可以參考這個 [issue](https://github.com/ExistentialAudio/BlackHole/issues/146)

如果你不是要做直播，單純想做 **多音軌輸入** 或 **音效合成** 可以參考參考 [GitHub Guide](https://github.com/ExistentialAudio/BlackHole#guides)。

若有內容缺少哪個部分或是勘誤，請於下方留言讓我知道喔～ 🥰
