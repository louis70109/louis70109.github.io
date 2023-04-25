---
title: 【Mac】忍者轉移電腦之術 | 照著步驟就回覆環境啦！
tags:
  - Mac
categories: 學習紀錄
date: 2022-11-05 17:32:47
---

![](https://nijialin.com/images/common.jpeg)

# 前言

最近公司電腦要換了(Macbook pro 15 -> Macbook air 13)，距離上次換電腦也差不多兩年前了[[轉移文章](https://nijialin.com/2020/07/15/restore-my-mac-environment/)]，以下快速整理一些常用的軟體。

<!-- more -->

# 介紹

## 安裝之前

- 建立新使用者
- Caplock <-> Control
  - 因為使用 HHKB 鍵盤，因此筆電的鍵盤也跟著習慣統一。[【HHKB】為什麼要它？怎麼在二手市集挑？](https://nijialin.com/2022/08/20/why-you-need-hhkb/)
- Brew
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```
- `mkdir ~/Programs`
```
cd ~/Document ; git clone https://github.com/louis70109/nijia-blog-backup.git
```
- brew install jq

## 常用軟體

- [Edge](https://www.microsoft.com/zh-tw/edge?form=MA13FJ#evergreen)
- [Alfred](https://www.alfredapp.com/)
  - Option+Space
- [Manico](https://apps.apple.com/tw/app/manico/id724472954?mt=12)
  - Option 常按

![](https://nijialin.com/images/2022/transfer/ma1.png)

- [Magnet](https://apps.apple.com/tw/app/magnet/id441258766?mt=12)
- [McBopomofo 小麥注音輸入法](https://mcbopomofo.openvanilla.org/)
- [Adobe Cloud](https://creativecloud.adobe.com/zh-Hant/apps/download/creative-cloud)
  - Premiere Pro
- [iMovie](https://apps.apple.com/tw/app/imovie/id408981434)
  - 簡易分段剪輯使用
- [Roboto](https://fonts.google.com/specimen/Roboto)
  - 公司常用字體
- [Box client](https://www.box.com/resources/downloads)
- [OBS](https://obsproject.com/)
- [Spotify](https://www.spotify.com/us/download/other/)
- [Logitech Presentation](https://support.logi.com/hc/zh-tw/articles/360025141634)
  - 簡報筆

## 通訊軟體

- [LINE](https://apps.apple.com/tw/app/line/id539883307)
- [Slack](https://apps.apple.com/us/app/slack-for-desktop/id803453959?mt=12)
- [Discord](https://discord.com/download)

## 開發用軟體

- [Docker](https://docs.docker.com/desktop/install/mac-install/)
- [Python](https://www.python.org/downloads/)
- [NodeJS](https://nodejs.org/zh-tw/download/)

- [VS Code](https://code.visualstudio.com/download)
  - Settings sync
  - cmd+shift+p -> "在PATH中安裝 'code' 命令"
  - [Gist](https://gist.github.com/louis70109/8ea88b9b26570d521c81922572f8309d)
- [PyCharm](https://www.jetbrains.com/pycharm/download/#section=mac)
- [gcloud cli](https://cloud.google.com/sdk/docs/install?hl=zh-tw)
- [iTerm2](https://iterm2.com/)
  - zsh

```
alias gs="git status"
alias gl="git pull"
alias gd="git diff"
alias ga="git add"
alias gp="git push"
alias gm="git commit -m"
alias gc="git checkout"
alias k="kubectl"
alias dc="docker-compose"
```

# 結論

現在大部分都滿依靠瀏覽器運行日常工作，但有許多日常使用與開發的軟體都需要安裝，以上是我使用 Mac 常用的軟體，如果你也推薦的軟體歡迎留言給我喔！
