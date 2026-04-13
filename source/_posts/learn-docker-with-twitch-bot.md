---
title: Docker 學習筆記 - 將 Twitch Bot 容器化
tags:
  - Docker
  - container
  - docker-compose
categories: Docker
abbrlink: 2541820171
date: 2020-01-27 18:36:05
---

# 前言

最近剛好看到許多`EKS`、`GKE`相關的文章，趁著過年時刻先來補足一下 Docker 這個既熟悉又陌生的技能 😆，之後再接著研究如何串接至 [kubernetes](https://zh.wikipedia.org/zh-tw/Kubernetes) 並同時到雲平台上，接下來一起來看我從建立到建置的過程紀錄 🙂。

以下就使用我的 side project - [Twitch-Bot](https://github.com/louis70109/Twitch-Bot) 做範例囉！

> 主要使用的功能為 `node` 以及 `mongo`

# 新增檔案

這邊我使用 vscode 的 [Docker extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) 來幫助我快速建立 docker 相關的檔案:

- Dockerfile
- docer-compose.yml
- .dockerignore

> 透過以下的 gif 可以快速建立以上三個檔案

![](https://github.com/microsoft/vscode-docker/raw/master/resources/readme/generateFiles.gif)

操作方式為 `Cmd+Shift+P` >`docker: add` > `選擇語言(Node)` > `設定輸出 Port`

## 處理 dockerfile

藉由 extension 來幫我們產生檔案第一步就完成了，接著對 Dockerfile 稍做修改:

```dockerfile=
FROM node:10.13-alpine
MAINTAINER NiJia <louis70109@gmail.com>
ENV NODE_ENV production
WORKDIR /app
COPY ["package.json", "package-lock.json*", "/app/"]
RUN npm install
COPY . /app/
EXPOSE 5000
CMD ["npm", "start"]
```

- FROM: 來自什麼映像檔，這裡使用預設給的 node 版。
- MAINTAINER: 寫描述的位置，這邊我標註我的名稱與 EMail。
- ENV: 環境變數寫在這，不過這個專案是放在 Github 上，所以我就沒把 chatbot 平台的密鑰放在這了。
- WORKDIR: 當前在一個乾淨的環境下，而你預想的工作路目錄要叫什麼就在這設定，同時也會一起幫你建立好 (我用`/app`這個工作資料夾當作範例)。
- COPY: 把檔案複製到想要放的地方，這裡為了先讓容器安裝完相依套件，因此先把 `package.json` 以及 `package-lock.json` 先複製進 `/app/` 這個資料夾內。
- RUN: 執行終端機指令，在上面檔案複製過來之後，這裡我就來安裝相依套件庫。
- COPY: 安裝完產生 node_modules 之後把原本的有的東西都複製過來。
  - `.` = 當前目錄
  - /app/ = 欲複製前往的地方
- EXPOSE: 容器要打出去的 Port 出口，在前面呼叫 extension 時就已經輸入完這欄了。
- CMD: 幫我執行指令 (參考: [CMD 與 ENTRYPOINT 的差別](http://jenkins.readbook.tw/docker/basic/104-dockerfile/entrypoint/))

## docker-compose.yml

這邊我將預設的修改為:

```yaml
version: '3'

services:
  twitch-bot:
    image: twitch-bot
    restart: always
    build: .
    environment:
      NODE_ENV: production
    ports:
      - 5000:5000
    depends_on:
      - mongo
    networks:
      - chatbot-network
  mongo:
    image: mongo
    restart: always
    volumes:
      - ./data/db:/data/db
    networks:
      - chatbot-network

networks:
  chatbot-network:
    driver: bridge
```

首先將`version`改成 `3`，有向下相容的話當然就是要使用新的囉！

接著會建立兩個 container (services):

1. twitch-bot
   `build` 後面接著 `.` 是指說建立在當前位置，`depends_on` 則是依賴哪個 container，最後則透過 networks (`chatbot-network`) 來讓服務互相溝通。
2. mongo
   這邊則就直接去 dockerhub 裡面抓，`restart`鐵定是必要設定，不然會沒有資料庫 🤣，`volumes`則是設定說你想映射的檔案位置在哪，這邊我設定**當前目錄的/data/db** (./data/db)裡面，對應到映像檔裡面的 **/data/db** 的位置，然後一樣透過 networks (`chatbot-network`) 來讓服務溝通。

networks 這邊就有點像主機設定網卡一樣，我設定一個 `chatbot-network` 的網卡它是使用橋接(`bridge`)模式來驅動(`driver`)

> 這部分是參考[知乎](https://zhuanlan.zhihu.com/p/69536325)，對照改出來的

> 補給站: 一般看到 `5000:5000` 或是 `./data/db:/data/db` 的寫法，它意思是 本地端位置 對應「`:`」到 容器的位置，像上述檔案就有 port 以及 資料庫位置，這邊就會因應服務而對應到不同的功能。

## 修改 .dockerignore

這邊因為我很偷懶不想把`.env`裡的環境變數寫進`dockerfile`😆，因此在這就把檔案中的`**/.env`拔掉方便做事 🤣

# 測試容器

### 啟動

```sh
docker-compose up -d
```

- `-d` 表示讓容器跑在背景，如果沒加的話就會在終端機上看到容器們的行為。
- 會建立本地端的 container image。

### 關閉

```sh
docker-compose down
```

- 若是使用 [Twitch-bot](https://github.com/louis70109/Twitch-Bot) 來試玩的話，則需要多開一個視窗執行 `npx ngrok http 5000` 來建立一個暫時含有 SSL 的 URL。

# 建置(build)

如果是按照原本 docker-compose.yml 的打法：

```yaml
services:
  twitch-bot:
    image: twitch-bot
```

這樣的話 docker 預設會幫忙下一個 `latest` 版號的 tag。

如果是按造以下做法的話在 build 就會幫忙建立 `帳號/容器名`，並下一個 `0.1` 的 tag

```yaml
services:
  twitch-bot:
    image: louis70109/twitch-bot:0.1
```

![](https://i.imgur.com/7Ftfpeh.png)

接下來就執行 `docker-compose build` 幫忙建立一個有版本號(tag)的容器映像檔(container image)。

![](https://i.imgur.com/JiifOjy.png)

> 補給站:
>
> - 記得要 `docker login` 哦！
> - 到 dockerhub 或其他私有倉庫建立 container repository

# 結碖

趁著春節的零碎時間來跟這個熟悉陌生技能打個招呼 😆，同時也體會到大家說到 docker 好用的地方以及給予的彈性，之前都是有需要測試某些功能才會用到，對於 `dockerfile` 以及 `docker-compose.yml` 就甚少了解，藉著年假空檔練習，之後只要在熟悉一下整體的使用方法應該就能好好的～用它來幫忙做事了 🚀。

# references

[連線 mongo container](https://github.com/lmjben/cdfang-spider/blob/master/src/nodeuii/config/index.ts#L3)
[docker CMD 使用](http://jenkins.readbook.tw/docker/basic/104-dockerfile/entrypoint/)
[Overview of Docker Compose](https://docs.docker.com/compose/)
[Twitch-Bot](https://github.com/louis70109/Twitch-Bot)
