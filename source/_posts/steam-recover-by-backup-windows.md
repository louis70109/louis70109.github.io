---
title: 如何復原 Steam 遊戲紀錄檔 | 黑神話悟空
tags:
  - Steam
  - Backup
  - Windows
categories: 學習紀錄
date: 2024-09-14 13:10:00
---


![](https://nijialin.com/images/2024/steam-backup/1.png)

# 前言

事情是這樣的，由於我跟家人個別有一台 PC，參考了巴哈上面的說法([URL](https://forum.gamer.com.tw/C.php?bsn=60599&snA=31999))，為了省錢登入同樣的帳號，想說用**離線模式**就可以一起玩，但殊不知...操作上出了點失誤，結果我從 9/9 ~ 9/14 的記錄都消失(被覆蓋)，找了一下網路上的做法，看了檔案路徑中發現 Steam 居然有備份(超感動)，以下介紹一下如何救回來～

<!-- more -->

# 步驟 1：打開 Steam 並找到你的遊戲

![](https://nijialin.com/images/2024/steam-backup/2.png)

首先來到最傷心的地方 😣，這就是我被覆蓋回去的版本...打開 Steam 客戶端，在左側的遊戲列表中找到《黑神話：悟空》，右鍵點擊遊戲名稱，選擇「管理」。

# 步驟 2：瀏覽本機檔案

![](https://nijialin.com/images/2024/steam-backup/3.png)

在「管理」選單中，選擇「瀏覽本機檔案」，這會打開 Windows 檔案總管並顯示該遊戲的安裝目錄，開啟的樣子如下圖，找到 `b1/` 的資料夾。

![](https://nijialin.com/images/2024/steam-backup/4.png)

# 步驟 3：找到存檔資料夾

![](https://nijialin.com/images/2024/steam-backup/5.png)

在遊戲的安裝目錄中，找到名為 Saved 的資料夾。存檔通常位於 Saved 資料夾內的 SaveGames 或 SaveGamesBackup 資料夾中。

![](https://nijialin.com/images/2024/steam-backup/6.png)

# 步驟 4：備份存檔位置

![](https://nijialin.com/images/2024/steam-backup/7.png)

點進 `SaveGamesBackup`資料夾當中，這些都是 Steam 會定期幫忙備份的檔案，有分 即時、小時、每日。

# 步驟 5：恢復存檔

![](https://nijialin.com/images/2024/steam-backup/8.png)

如果需要恢復存檔，這邊我選擇 01ReamtimeBackup，備份檔案裡面因為我的黑神話悟空裡面有兩個存檔，所以會看到 ArchiveSaveFile.1.sav 以及 ArchiveSaveFile.2.sav，這邊檔案比較大的就是我玩比較前面的進度，因此就把他複製起來來放到**步驟三** SaveGames 資料夾當中，會先看到有一串數字的資料夾，再點進去之後就會看到以下圖片的樣子，把檔案複製進去即可。
![](https://nijialin.com/images/2024/steam-backup/9.png)

# 結論

經過這次才發現原來 Steam 做得這麼棒，都有即時在 local 幫玩家去備份，讓紀錄不小心被覆蓋的玩家可以輕鬆地在 Windows 上備份和恢復 Steam 遊戲的存檔，確保你的遊戲進度不會丟失，這次真的是有驚無險，紀錄起來下次發生時才不會手足無措～ 👀️
