---
title: '如何只使用一台 Mac 進行直播 feat. SoundFlower, OBS, Youtube'
tags:
  - OBS
  - SoundFlower
  - Youtube
  - Mac
  - Streaming
categories: 直播
date: 2020-11-29 20:01:51
---

# 前言

一般來說直播都會有擷取卡(盒)、各式硬體轉接器...但因為在年初時急需又沒安排時間研究(節儉)導致我想用各種軟體解決方案來處理，因此就誕生這篇啦 🎉

若你跟我一樣手上只有一台 Mac 加一台手機但又有直播需求的朋友，這篇就很適合你，本篇接下來將已 MAC OS 為例，搭配 SoundeFlower 這個軟體來解決 Mac 只有獨立音效的問題，並使用 Youtube 來測試直播是否成功。(由於 MAC 沒有額外的音效卡可以輸出，因此需要用軟體來解決)

![](https://nijialin.com/images/2020/OBS/os-version.png)

- 作業系統 MacOS(Big Sur)
- 軟體: Soundflower
- 直播平台: Youtube

> 在此之前記得安裝 Open Broadcaster Software(OBS): https://obsproject.com/download


> [2021/05/28 更新]： 目前並不支援 M1 晶片喔！ [M1 chip-based Macs are NOT YET SUPPORTED](https://github.com/mattingalls/Soundflower/releases/tag/2.0b2)


<!-- more -->

# [SoundFlower](https://github.com/mattingalls/Soundflower/releases)

首先透過[連結](https://github.com/mattingalls/Soundflower/releases)下載 Mac 版的安裝檔， 下載完後接著安裝，但此時會發現`安裝失敗`，但別緊張，因為 Mac 系統設定權限問題在第一次安裝會擋來路不明的軟體，在上述下載的連結中 release 說明有提到第一次安裝因為有權限問題而導致失敗，此時就按造以下步驟進行解鎖

> `系統偏好設定` -> `安全性與隱私` -> `允許安裝`

通過隱私權後接著按下剛剛下載好的 `Soundflower-2.0b2.dmg`，再安裝一次就可以看到安裝成功的畫面。

![](https://nijialin.com/images/2020/OBS/sound-install-success.png)

> 雖然最後一版 release 是 2014 年 12 月底，但截至目前為止都還能用，若有任何不同的解法歡迎 mail 我！

# 多重輸出裝置

會需要這個部分是因為不希望當聲音只能輸出卻不能同步監聽，因此需要 Mac 的內建軟體幫忙脫重輸出。

> 首先先進 `啟動台` -> 點選`其他` -> 選擇 `音訊 MIDI 設定`

![](https://nijialin.com/images/2020/OBS/media-midi.png)
點選左下角的 `＋`，選擇 `製作多重輸出裝置`
![](https://nijialin.com/images/2020/OBS/add-milti-output.png)
出來之後將主裝置設定成`揚聲器`(或你的耳機)，並同步勾選 SoundFlower64，如此一來就可以做到同時輸出兩邊聲音的方法了。
![](https://nijialin.com/images/2020/OBS/multi-output.png)
最後點選聲音選項，將輸出聲音選擇`多重輸出裝置`的選項。
![](https://nijialin.com/images/2020/OBS/select-output.png)

> 重要：藍芽耳機(Airpods)目前測試起來是不行的！

# 輸入裝置

![](https://nijialin.com/images/2020/OBS/input.png.png)
一般來說若是要擷取的話輸入輸出皆會選擇 `SoundFlower64`，而因為有稍後介紹的 OBS 幫忙，因此這邊輸入裝置選擇`內建麥克風`來收自己講話的聲音即可。

# OBS 輸出設定

![](https://nijialin.com/images/2020/OBS/obs-media-config.png)

從 OBS 的主界面右下角點選 `設定` 進入後，左側欄選擇 `音效`，接著按造以下項目實作：

- 桌面音效選擇： SoundFlower64
- 麥克風/輔助音: SoundFlower64
- 麥克風/輔助音 2: Macbook Pro 內建麥克風 <mark>(重要！否則在直播時你只能聽人家講話！)</mark>

為何會有上述這樣的設定呢？`桌面音效`與第一個`輔助音`一定都是選擇 SoundFlower64，讓軟體幫你把音效收音轉打出去(因為 Mac 只有一個介面卡)，而 OBS 的好處就是它可以整合兩個麥克風收到的音訊一起打出去(最多`4`隻)，由於第一個麥克風已經去收電腦的聲音了，接著就是用`輔助音2`來收你講話的聲音，如此一來就可以邊直播邊聽邊說話啦，不用再用其他設備(手機、iPad)在旁邊監聽了。

## 告訴 OBS 要擷取誰輸出

雖然上述已經告訴 OBS 有哪些設備，但 OBS 還是不知道輸出誰好，因此就要按造以下步驟告訴他。

- 點選右下角的`＋`

![](https://nijialin.com/images/2020/OBS/obs-select.png)

- 選擇`擷取音效輸出`，下拉式選單選擇 `SoundFlower(64ch)`

![](https://nijialin.com/images/2020/OBS/obs-select-output.png)

# 如何看結果有沒有成功？

![](https://nijialin.com/images/2020/OBS/obs-output.png)
可以先隨意播放音樂測試，基本上看到上圖的音軌有正在動就代表成功了，以下就使用 Youtube 來進行直播測試。

![](https://nijialin.com/images/2020/OBS/yt-stream.png)
進入 Youtube 之後點選右上角`進行直播`，當進入後通常都需要等一段時間。

![](https://nijialin.com/images/2020/OBS/yt-monitor.png)
看到此畫面之後將金鑰複製起來，右上角的分享按鈕可以複製網址，原則上我都會先複製起來丟在 LINE 的任意視窗中，方便使用手機測試直播狀態。

![](https://nijialin.com/images/2020/OBS/obs-yt-key-set.png)
將 Youtube 的金鑰複製到這邊，即可讓 OBS 與 Youtube 串接，按下確定後就可以按 `開始串流` 測試直播啦！(建議先用`不公開`測試)

最後就是調整看希望收哪邊的音要多一點，看是桌面來的聲音(第三方通訊軟體)或是自己的外接的麥克風，就調整`輔助音1`或是`輔助音2`來控制大小聲。

# 結論

一般遊戲實況主因為都是自組電腦，音效卡都會另外在加裝(不用主機板內建)，因此使用桌機進行直播是相當方便的。但因為蘋果的電腦是一體成型，可以想像就只有電腦的主機板功能這樣，其他任何東西都需要透過 USB 來外接，但因為我的工作習慣就是使用 Mac，也沒考慮到會有直播上的需求，前一陣子因為疫情關係需要轉向線上，但在最近因為使用者習慣擁有線上的形式，因此許多社群即便再有線下聚會還是會搭配線上直播，並且有一些是遠端講者，因此就希望這篇能幫助到跟我同有一樣困擾的朋友～
