---
title: 【KOLpower】快速剪輯後輸出 XML 變形處理
tags:
  - Premiere
  - KOLpower
  - XML
categories: 學習紀錄
date: 2022-02-27 02:31:24
---


# 前言

![](https://nijialin.com/images/2022/fast-edit/1.png)

首先感謝六指淵提供了這麼棒的[自動剪輯神器](https://kolpower.cc/video-editor)，讓我這剛入門剪輯的新手可以很快速地做一些卡接風格的使用，不過照著步驟把一些卡接內容完成之後，原本的影片是 1920x1080，拉進去會變形(1280x720)，以下若是相關處理步驟，若也有遇到類似的問題可以參考。

- 我的 Premiere 版本為 2022
<!-- more -->

> ※必看！使用說明：
> 建議先將檔案轉檔成以下格式
> 檔案格式：MP4
> (限制)
> 檔案上限：200MB 內
> (建議)
> 影片長度：30 分鐘內
> (建議)
> 限電腦版使用
> 如無符合以上條件，操作時或輸出可能會導致影片失真

# 介紹

![](https://nijialin.com/images/2022/fast-edit/2.png)

1. 把影片拉進去後把一些要調整卡接的地方弄完後，按下右下角的`下載 XML`
   ![](https://nijialin.com/images/2022/fast-edit/3.png)

2. 下載完後到 Premiere 左上角 `File` 選擇 `Import..`
   ![](https://nijialin.com/images/2022/fast-edit/4.png)

3. Import 剛剛下載的 XML 後，會出現兩個檔案，原檔+卡接檔
   ![](https://nijialin.com/images/2022/fast-edit/5.png)

4. 引入進來之後發現影片似乎縮小了，有些時候會變大
   ![](https://nijialin.com/images/2022/fast-edit/6.png)

5. 找到剛剛拉入 sequence 的檔案(長度較短的版本)，`右鍵`選擇 `Sequence Settings..`
   ![](https://nijialin.com/images/2022/fast-edit/7.png)

6. 這邊我出現的是 1280 與 720
   ![](https://nijialin.com/images/2022/fast-edit/8.png)

7. 因為我習慣使用 1920 與 1080，因此這邊就把大小改成這樣
   ![](https://nijialin.com/images/2022/fast-edit/9.png)

8. 按下儲存後會告知你如果改了就不能復原(當然 ok)
   ![](https://nijialin.com/images/2022/fast-edit/10.png)

9. 最後就看到結果是我要的大小啦 (撒花)

# 結論

有了這工具之後可以在 [KOLpower](https://kolpower.cc/video-editor) 上快速的初剪，再透過引入後加速整體剪輯的速度！有這些工具只能感謝、感謝、再感謝～～好人喝珍奶會有粗吸管～

# 參考

- [若下載 XML 檔，連結影片後，遇到影片變形的問題，請參考此 教學 ](https://www.notion.so/XML-838912993fdc4b69be87992bac707cc7)
