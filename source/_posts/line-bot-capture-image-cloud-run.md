---
title: 在 Google Cloud Run 上安裝 Chromium 抓取 CCTV 影像
tags:
  - Google
  - Cloud Run
  - LINE
categories: LINE
date: 2023-11-13 16:57:13
---


![](https://nijialin.com/images/common.jpeg)

# 前言

近期因為有玩滑板，而且身處台北很容易下雨，因此需要找到加入了交流社群，其中設定了一些指令可以讓社群機器人可以提供 CCTV 的畫面，但其中因為需要去社群當中打指令對於一個剛加入的人有點害羞，有這些攝影機畫面真的可以幫助看是否要出門(大部分場地都室外)，但身為工程師會想要按個按鍵就出現，因此就有以下文章囉！

<!-- more -->

# 介紹

## 安裝 Chromium 在 Container 上

1. 很多人應該在測試時因為歷史關係，環境都已經有安裝，因此在 `requirements.txt` 上需要裝上:

```
selenium
webdriver-manager
chromedriver-binary==77.0.3865.40.0
```

2. 參考我的 Dockerfile ([URL](https://github.com/gcp-serverless-workshop/notifier-line/blob/main/Dockerfile#L6)):

> 參考來自 [dev.to](https://dev.to/googlecloud/using-headless-chrome-with-cloud-run-3fdp)

```
RUN apt-get update
RUN apt-get install -y gconf-service libasound2 libatk1.0-0 libcairo2 libcups2 libfontconfig1 libgdk-pixbuf2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libxss1 fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils

# Install Chrome
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN dpkg -i google-chrome-stable_current_amd64.deb; apt-get -fy install
```

如此一來就可以在 [Container 上使用 Selenium ](https://github.com/gcp-serverless-workshop/notifier-line/blob/main/utils/image.py#L21)操作了，接下來當然就放在 API 去使用，以下講解一些在 LINE Bot 上使用需要的注意事項。

> 感謝公司的 QA 同事大力協助，真的是術業有專攻！

## 在 LINE Bot 上需要的注意事項

1. 輸出圖片需要提供 URL ([API Doc](https://developers.line.biz/en/reference/messaging-api/#image-message))，這邊大家可以參考我過去寫的文章-[應用 - LINE Bot 收到圖片後傳到 GitHub 並使用](https://nijialin.com/2022/10/02/upload-image-get-url-ways/#%E6%87%89%E7%94%A8-LINE-Bot-%E6%94%B6%E5%88%B0%E5%9C%96%E7%89%87%E5%BE%8C%E5%82%B3%E5%88%B0-GitHub-%E4%B8%A6%E4%BD%BF%E7%94%A8)，透過 **Base64** 的方式從 GitHub API 上傳到 Repo 中
2. 注意: Repo 要記得是 **Public** 喔! 否則 LINE Server 會讀不到檔案
3. 網址組成為: `f"https://raw.githubusercontent.com/{USER}/{REPO_NAME}/{master || main}/{IMAGE_NAME}.png"`，記得別用到網頁上看到的名字喔！
4. 建議使用 Push Message 的方式發出(可搭配回覆訊息 Quote 功能)，因為抓圖片以及上傳其實很花時間
   1. 如果回傳速度比較快，或許可以寫判斷式把 Reply 以及 Push Message 兩個搭配使用

> 我自己日常紀錄的東西都放在[這個 Repo](https://github.com/louis70109/ideas-tree)

## 佈署在 Cloud Run

因為需要將 FastAPI 佈署在 Google Cloud Run 上面會需要測試，大家有需要可以參考我的[Dockerfile](https://github.com/gcp-serverless-workshop/notifier-line/blob/main/Dockerfile)，建議使用 `uvicorn`，目前使用 `gunicorn` 遇到滿多問題還不知道怎麼排解，如果有相關經驗歡迎分享喔！

除了在本地端使用 gcloud Command line 佈署，也可以透過 Cloud Shell 的方式佈署，而在我的 Repo 上都有[設定一鍵佈署](https://github.com/gcp-serverless-workshop/notifier-line#google-cloud-platform-%E4%BD%88%E7%BD%B2)，可以直接從 GitHub 直接跳到 GCP 的 Cloud Shell 上操作，相當方便!

> 如果有需要一直測試佈署上去的環境，建議 Cloud Shell 使用時別急著關閉，可以重複把 Cloud Shell 裡的 Repo 重新 Pull 並且佈署，否則會踩到**開啟 Shell 上限**喔！
