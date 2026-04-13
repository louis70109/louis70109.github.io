---
title: 快速轉移我的 Mac 開發環境
categories: 學習紀錄
date: 2020-07-15 16:07:40
tags: ["Workspace", "settings sync", "Mac"]
---

![](https://cdn.pixabay.com/photo/2017/02/19/23/09/success-2081167_1280.jpg)

# 前言

最近重灌了兩次 Mac 系統，而加入 LINE 之後也需要在安裝自己的工作環境，而我日常都在`寫文章`、`寫範例`，除了日常已經將開發環境上傳 Gist 以外還有一些小細節需要注意，因此以下就介紹一些我認為較常用的工具以及一些環境設定的部分。

<!-- more -->

# 常用環境

- MacOS
- VScode
- Github

# 使用 SSH key 免密碼上傳 Github

使用以下指令產生 public key:

```
ssh-keygen
```

看到類似下圖的話就成功囉！
![](https://i.imgur.com/s4CvKGJ.png)

Unix like 系統一般都存在 `.ssh/` 底下，因此使用 `cat` 來找 public key 就行了：

```
cat ~/.ssh/id_rsa.pub
```

> 會看到 ssh-rsa 開頭，User Name 結尾的一組 public key，這就是接下來需要的東西

接著到 Github 設定頁面，點選左邊 `SSH & GPG keys` 後新增一筆新的資料，將 public key 填入 `key` 的欄位
![](https://i.imgur.com/ZUtmZAu.png)
填入完後就會出現一筆新資料
![](https://i.imgur.com/fSa7oGs.png)

接下來再使用 git 傳到 Github 時就不需要輸入帳號密碼囉！

# [brew](https://brew.sh/index_zh-tw)

MAC 的套件管理工具，在安裝許多終端機工具時都會使用到，據說還有另一個工具為`apt`，但我還是習慣使用`brew`，透過以下指令安裝後才方便之後做事：

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

![](https://i.imgur.com/wzVzX6Z.png)

# VSCode 透過 Settings Sync 安裝環境

> 平時定期將 vscode 設定上傳至 Gist 是很重要的，因為我們都不會知道什麼時候`換電腦`、`電腦壞掉`種種因素讓開發環境需要重弄，因此定期上傳真的很重要喔！

1. 下載完 vscode 之後皆安裝 settings Sync 這個套件來安裝我舊有的環境

![](https://i.imgur.com/vMx5qW9.png)

2. 點選右邊按鈕`編輯設定檔`

![](https://i.imgur.com/molC1r7.png)

3. 看到這個畫面之後按下自動下載，在之後若其他電腦有更新的話這邊也會同步喔！

![](https://i.imgur.com/GywrjFi.png)

4. 找到之前製作的設定檔，而 `Gist ID` 就是網址中接在使用者名稱後面的 ID

![](https://i.imgur.com/qfjEiAq.png)

5. 點下右上角的 `Settings` 後會看到自己的管理後台頁面，並點選左下角的 `Developer settings` 進入設定頁面

![](https://i.imgur.com/SDMjle7.jpg)

6. 進入後點選 `OAuth Apps` 會看到自己過往有透過 OAuth 連結 Github 的程式，這邊就點選 `code-settings-sync`

![](https://i.imgur.com/OHaXXFD.png)

7. 看到這畫面就點 `Regenerate token` 來產生一組新的 key 讓 vscode 可以連接

![](https://i.imgur.com/IRX4oGO.png)

8. 會產生出一組亂數的 key 讓你貼到工具上

![](https://i.imgur.com/Ajqr3CR.png)

9. 將 Gist ID & Token 貼到 Setting Sync 上後重開就會開始下載啦！

![](https://i.imgur.com/WrO65G3.png)

10. 重開後就開始下載囉！🎉

![](https://i.imgur.com/S9CsJbT.png)

# 在終端機中使用 `code` 指令讓 vscode 幫你開啟專案

身為一個長期使用 vscode 的工程師，又怎麼能不從 command 下手了？

在 vscode 中按下 `command+shift+p` 後輸入 `command`，安裝下圖第二個選項，即可在終端機上輸入 `code` 接著路徑讓 vscode 幫你開專案～
![](https://i.imgur.com/fUwJ5Ao.png)

# 應用程式介紹

## [Alfred](https://www.alfredapp.com/)

這是我很推的一個搜尋工具，搜尋速度比 MAC 原生的 Spotlight 還要快上許多，很推薦大家直接安裝它體驗一下效率！😄

![](https://i.imgur.com/DUXB0pU.jpg)

> Command + L 可以放大搜尋字喔！

## [Magnet](https://apps.apple.com/tw/app/magnet/id441258766?mt=12)

它是我以前在 app store 特價時購入的，在分割視窗時很方便，簡單的組合鍵即可操作完成。

首次安裝有隱私權的問題，需置左上角的`蘋果符號` > `系統偏好設定(Performance)` > `安全性與隱私權` 中的 `輔助使用` 打勾 ✅
![](https://i.imgur.com/vwWjijK.png)
記得點選登入時啟動喔！
![](https://i.imgur.com/VD2Rbd6.png)

## [Trello](https://trello.com/zh-Hant)

很常會需要一個地方紀錄著未成形的想法，而 Trello 本身支援跨平台功能，紅了很久也在最新瘋狂使用它，使用 Free tier 就很足夠囉！

## [iTerm](https://www.iterm2.com/)

iTerm 是一個很普及的終端機工具，而 Mac 內建的終端機雖然夠用，但有時需要裝外掛時會很難處理，因此使用 iTerm 搭配 zsh 來讓我可以更輕鬆的安裝外掛，通常都還會搭配另一個 zsh 框架 - [oh-my-zsh](https://ohmyz.sh/)，網路上有許多相關安裝文章供大家可以參考，以下簡單提供兩個連結:

- [超簡單！十分鐘打造漂亮又好用的 zsh command line 環境](https://medium.com/statementdog-engineering/prettify-your-zsh-command-line-prompt-3ca2acc967f)
- [如何讓 Terminal 看起來好用又好看｜ iTerms 2 + Oh-my-zsh 全攻略](https://medium.com/%E6%95%B8%E6%93%9A%E4%B8%8D%E6%AD%A2-not-only-data/macos-%E7%9A%84-terminal-%E5%A4%A7%E6%94%B9%E9%80%A0-iterms-oh-my-zsh-%E5%85%A8%E6%94%BB%E7%95%A5-77d5aae87b10)

# 結論

藉由這次的整理讓之後若再重灌時就有文章可以快速參考了 😆，目前這樣的環境加上系統內建工具已經可以應付我日常許多工作內容，也因為現在 擁有 Google 與 Apple 這兩個神兵利器，讓重灌後許多帳號密碼之類需要記得的東西可以無痛轉移(相對資料就給別人了)，若是有些比較單純優化使用者體驗的部分之後再寫一些 debug 的文章來紀錄～ 😄
