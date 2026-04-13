---
title: 藉由 LINE Python SDK 初步認識開源專案
tags:
  - LINE
  - Open source
  - SDK
  - Python
categories: Python
date: 2020-07-10 15:11:20
---

![](https://cdn.pixabay.com/photo/2015/04/20/13/17/work-731198_1280.jpg)

# 前言

從一開始在社群中為了 demo code 將程式放上 GitHub，接著到了認識前輩們都在開源圈積極展示自己的成果也分享帶來的好處，造就了我也加入開源行列，但看了 open source 中許多好用的工具，也希望自己能夠看懂並加入開發，希望自己的貢獻能力(Pull Request)別只停於上傳範例以及修改文件，以下我就使用我第一個貢獻的 LINE SDK(python) 帶大家了解開源專案會有的樣子。

<!-- more -->

# 專案結構

這部分會儘可能讓大家知道普遍的架構為何，也一併了解一下 git 上的小知識 😊

![](https://i.imgur.com/72lwPzy.png)

## 1. 測試結果、最新 commit id、更新日期、commit 次數

- 測試結果是 ✅ 或 ❌ 可確保`程式品質`
- Commit id 之後再追查時使用
- 更新日期中可以了解他的更新頻率
- 次數很多不一定好，也可能是開發者刷 commit，數量就是開發過程的一個根據

## 2. 結構

首先先拆分 `資料夾` 與 `一般檔案` 的部分

### 資料夾

LINE SDK 就是一個標準常見的 open source project

- .github: 放平台相關的設定
- docs: 有些會放細部操作的文件，抑或是規範文件之類的
- examples: 通常 SDK 要讓開發者快速入門就是需要 example，顧名思義就是要開發者趕快上手 😆
- linebot: 在 python 中資料夾是引入套件其中一個 namespace，就看引入的名稱希望叫什麼，如果自己[開發的 lotify](https://github.com/louis70109/lotify) 資料夾名稱就也是 lotify
- tests: 含有測試的專案在品質上就有更高的可靠性

### 一般檔案

這邊就針對幾個較需注意的檔案做說明:

- .gitignore: 在 `git init` 時就會出現的檔案，有它就能避免一些`無意義檔案`(node_module...)或`重要的設定檔`(.env...)被上傳
- LICENSE: 在使用專案時授權是`很重要`的，即便維護者將檔案傳至 Github 若沒經過同意也不能隨便商用，因此使用時要看授權的憑證是什麼再決定是否採用

![](https://i.imgur.com/jVrhlJ6.png)

- README: 使用套件一定要說明文件，有些會在這裡寫些簡單說明，而細節則是放在`docs/`底下，以 LINE SDK 來說，他就將範例一併都寫在裡面讓大家可以搜尋使用
- requirement-XXX.txt: 好的專案一定要要把不同環境下所需的依賴套件分開，若全部放在一起則會在特定情況下污染環境，造成 debug 困難
- setup.py: 為 python SDK 上傳時必備的檔案之一，裡面放著所有專案對外的基本資訊
- tox.ini: 使用 tox 所需的設定檔，LINE SDK 用來檢查支援版本、測試環境、Lint 規則、避免幾個 Lint 規則

## 3. Commit description

從描述中可以知道維護者對這個專案的用心到哪，若前面還有加上 prefix 的話會更加分喔！當然清楚的表達更動需求還是最重要的！

> [prefix 參考](https://wadehuanglearning.blogspot.com/2019/05/commit-commit-commit-why-what-commit.html)

若看到訊息為`xxxxxx (#123)` 這樣類型的語句則代表這個檔案是透過 PR 去 close Issue 的表示方式，透過這樣的方式也可看出是否有許多的開發者加入一起開發。

# Issue

![](https://i.imgur.com/byHnUKA.png)

 這部分可以看出有什麼`議題`、`問題`被修除掉，LINE 這邊因為每個月都會有新釋出的 API，因此會有專人放上 Issue 讓大家可以透過 Pull Request 指定處理特定 Issue 來完成 features。

> 一個程式說沒有`問題`不可能，不管是`使用`、`邏輯`、`寫法`等等都能算，看 Issue 這可以知道有沒有人在使用並`回報問題`，這裡的話數量因專案而異(有些 Issue 就是 feature)，若是 fix bug 太多的話我就會認為這專案的健康度不夠。

# Pull Request (PR)

在 PR 中最大的好處就是可以透過 code review 來回溝通學習從 ➡️ `完成需求(implement)`、`提出問題(review)`、`釐清問題(ask)`、`完成功能(merge)`，在這過程中可能會有想法與做法的激烈碰撞，如：

- 維護者希望維護品質覺得不該 xxx...
- 貢獻者覺得這樣做比較好，應該 refactor...

這部分沒有誰對誰錯，看維護者希望專案走向決定貢獻者如何作業。
![](https://i.imgur.com/yofq0LN.png)
一般來說一個 PR 會隨著 1~N 個 Issue，透過以 close 的 PR 就可以知道這個專案是否有遵造一般的開發 flow(提出問題、解決問題)，同時也可以藉由看其他人 PR 學習不同的寫法與溝通方式，以及維護者是如何管理這些 PR 請求。

> 在大型 open source 中會盡量希望 closed PR 的數量越多越好，而 Open 中的 PR 適量(我認為十分之一就不錯)，代表著大家對這個專案很感興趣願意一直投入資源來貢獻(維護者與貢獻者)，這邊大家可以去觀察看看喔！

# Tags & Release

![](https://i.imgur.com/NdWSTNhl.png)
Tags 代表當前版本，且通常都跟`套件庫`裡的版本號一樣，進版規則一般會隨著維護者的習慣 release，以 LINE SDK python 來說通常都是兩個小版本(小數點第三)號後跳一個中版本(小數點第二)，而大版號目前還沒看過，若會動到的話就會跟專案發展相關較有關聯。

> 有時 Tags 排序會怪怪的，需要注意。

偶爾會有因時程規劃上維護者 merge PR 卻沒有 release tag，此時除了詢問外若想玩新功能一般都會去抓 master 分支下來試用。

# Badge

> 官方網站: https://shields.io/

若希望提升專案專業度的話，添加 Badge 一定是不可避免的，而它除了美觀以外，在許多時候都是代表著一個 `事件(Event)` 結果，讓開發者在開頭閱讀文件時可以清楚並快速的了解初步狀態。
![](https://i.imgur.com/BVj8th5.png)

以上圖來說，第一個代表分支跑過測試，第二個則是代表專案的最新版本號，第三個則是文件產生通過。藉由這三個 Badge 讓我在剛看文章時就可知道 `CI 跑過了沒`？`當前版本是多少`？(不需看 release tags)，快速取得閱讀者`目光`並且讓他`了解狀態`，如此有用的功能怎麼能不用呢？

![](https://i.imgur.com/ksYGAak.png)

> 上圖則是我開發 Lotify 時所使用的 Badge，想了解怎麼使用可直接看看[我的 README 喔！](https://github.com/louis70109/lotify/edit/master/README.md)

# 結論

初步帶大家使用 LINE Python SDK 認識開源專案，使用 LINE SDK 做介紹也是因為我透過它第一次學習到與不同地方的開發者一起貢獻一個很多人使用的 project，讓我深深感受到 open source 所帶來的魅力之處 🥰。

此外也是因為貢獻 SDK 並參考其架構後我才寫出 [LINE Notify SDK - lotify](https://github.com/louis70109/lotify)，並且獲得可以在 [2020 COSCUP](https://coscup.org/2020/zh-TW/agenda/KNJDWQ) 主要議程演講的機會，因此鼓勵大家多多與開源圈的前輩們請教與合作，真的是可以學到不少知識並且獲得一些機會喔！
