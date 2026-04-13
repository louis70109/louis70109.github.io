---
title: 如何在 PyCharm 幫 Python 除蟲(Debug)
tags:
  - Python
  - Pycharm
categories: Python
date: 2021-05-03 00:08:16
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

從我開始工作時，因為**動態語言**方便且快速上手，因此我就選擇動態語言作為我吃飯的工具。隨著時間的推進我寫過了 Python、Ruby、JavaScript，由於大多都使用 VScode 撰寫程式，對於環境設定不是很熟捻的我設定相關東西就很困擾，因此大多數都是用 `print`(Python)、`console.log`(JS) 或是 `puts`(Ruby) 直接印在終端機上來除錯腳本或是網站。

在過去這些日子中最有印象的就是使用 Ruby 的 `byebug` 套件來幫我除蟲，它是個可以在終端機透過快捷鍵讓你取得想除錯的地方開始進行除錯，對於當時的我來說簡直是福音，也讓我在那段日子中非常的快樂ＸＤ

<!-- more -->

由於現在轉戰 Python 之後有了 PyCharm 這個超讚的 IDE，把 VScode 的環境就拿來寫前端跟一些部落格(Markdown)使用。因此接下來就將分享我是如何在 PyCharm 上 debug Python 相關的程式。

# 步驟

1. 透過 PyCharm 開啟你的專案並選擇畫面上紅色框框的下拉式選單

![](https://nijialin.com/images/2021/debug-python/0.png)

2. 開啟後選擇 `Edit Configurations`

![](https://nijialin.com/images/2021/debug-python/1.png)

3. 讚著圖上的紅色箭頭部分操作，按下 `＋` ➡️ 選擇 `Python` ➡️ 開啟資料夾選擇你想使用的 `script` 或是 `web 入口檔案` ➡️ 設定 `環境變數` (如果地餓話) ➡️ 先 `Apply` 後 `OK`

![](https://nijialin.com/images/2021/debug-python/2.png)

4. 環境變數設定如下，按下 `＋` 可以增加一欄來填寫參數，把相關欄位的 Key 以及 Value 填上來新增環境變數

![](https://nijialin.com/images/2021/debug-python/4.png)

5. 上方欄位所寫的名稱將會對應到左方欄位的名稱，它將是執行任務時的辨識名稱

![](https://nijialin.com/images/2021/debug-python/3.png)

6. 你會看到如下圖範例 - `api debug`(我的任務名稱)，裡頭將會填寫你剛剛所設定的所以參數以及檔案位置(絕對路徑)

![](https://nijialin.com/images/2021/debug-python/6.png)

7. 在你想要測試的程式位置數字旁按下滑鼠左鍵，會看到一個紅色的按鈕，它將代表程式的中斷點，最後按下上方的 `🐛 圖案的按鈕` 來開始**除蟲模式**🎉

![](https://nijialin.com/images/2021/debug-python/5.png)

8. 最後你就可以看到你執行時的所有資訊啦～也許是變數值、函式庫...

> 如果你是在 debug web API，你需要先透過工具去觸發才會開始執行除錯模式喔！(Postman、curl...)

# 結論

這也是我第一次在動態語言中使用 IDE 來幫我除錯，以前老是以為動態語言就沒辦法除錯(型別定義不清楚)，透過這次使用 PyCharm Debug 也幫助我抓出了一些程式上沒有判斷好的部分，也許哪天又忘了怎麼 Debug 時可以回來看看這一篇... XD