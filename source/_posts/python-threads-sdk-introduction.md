---
title: 【Threads SDK】透過程式發送你的第一篇 Threads 貼文
tags:
  - Threads
  - SDK
  - Meta
categories: 學習紀錄
date: 2024-08-17 23:54:23
---


![](https://nijialin.com/images/common.jpeg)

# 前言

近期接收到 Threads 也開出 API 可以使用，看網路上有許多人討論相關做法，同時也閱讀了許多大大們的文章，以下就將我這幾天測試發文的結果記錄下來，給有需要使用的讀者們～

<!-- more -->

# 介紹

## 1. 建立應用程式

![](https://nijialin.com/images/2024/threads-sdk/1-createapp.png)

至 [Meta Developer Tool](https://developers.facebook.com/apps/) 右上角按下 **Create App**，因為是要串接 Threads，選擇 **Access the Threads API**

## 2. 選擇 Threads

![](https://nijialin.com/images/2024/threads-sdk/2-name.png)

期間把需要填上的資訊補上即可，就可以建立成功

## 3. 開啟 APIs

![](https://nijialin.com/images/2024/threads-sdk/3-apis.png)

建立完成之後，預設 Threads 只會幫忙開一個 API，其他的可以按下去把它打開，基本上要用也都是全開，應該沒有不想開的 (?)

## 4. 加入 IG 帳號

![](https://nijialin.com/images/2024/threads-sdk/4-add-account.png)

這邊一開始會有點誤導，以為自己 Facebook 帳號有登入就可以，要再把自己的 IG 帳號加入為測試帳號，輸入帳號不用加上 **＠**

## 5. 允許 Threads 與應用程式連動

![](https://nijialin.com/images/2024/threads-sdk/5-thread-connect.png)

這邊在第四步加入帳號之後，理論上會導過去，如果沒有的話，也可以找設定頁面中的**邀請**，這邊點進來之後就會看到剛剛送出的測試邀請，**接受**即可

## 6. 開始測試

![](https://nijialin.com/images/2024/threads-sdk/7-dev-tool.png)

大家剛到 **Graph 測試頁**之後，要先產生出 Access Token 之後才可以合法拿到相關的資料，這邊點下 Generate Token 之後，就會來到跳轉頁面

![](https://nijialin.com/images/2024/threads-sdk/6-access.png)

這邊跟各種網頁應用程式一樣，都會跳一個同意頁面之後才可以開始

## 7. 拿取個人帳號資訊

![](https://nijialin.com/images/2024/threads-sdk/7-dev-tool.png)

最後就可以把 Threads API 們都打過一遍，可以透過 `/me` 先取得自己的 `User ID`，後面 API 路徑都會需要 id 才可以執行

## 8. 如何透過 SDK 上傳第一篇貼文？

安裝 Threads SDK，要透過其他方式安裝也行

```shell
pip install threads-sdk
```

接著準備三個主要的參數，USER_ID、ACCESS_TOKEN、APP_SECRET，其中前兩個上面已經有先取到了，APP_SECRET 可以透過下圖的方式到 Dashboard 中找到詳細資訊後取得

![](https://nijialin.com/images/2024/threads-sdk/8-app-secret.png)

來到了發文環節，建立一個 main.py 之後，將這三個參數帶進初始化當中，由於 Threads 特性可以一次發多個文，因此需要先建立 Container 先將文章儲存起來，之後在把 Container publish

```python
from threads.api import ThreadsAPI

threads = ThreadsAPI(
    user_id=USER_ID, access_token=ACCESS_TOKEN, app_secret=APP_SECRET
)

# 取得個人資訊
# user_info = threads.get_user_bio()
# print(user_info)

# 建立發文的 Container，因為 Threads 可以一次發多個文
media_json = threads.create_media_container(text="Hello, World! \n This is a test post.")
print(media_json)

# 將 Container 發文
threads.publish_container(media_json.get("id"))
```

![](https://nijialin.com/images/2024/threads-sdk/9-post.png)

執行之後就可以發現自己的測試文出去啦！

# 結論 & 注意事項

- 透過 Graph 拿到的 Token 是 short-live 的，**期限是 24h**，如果想要用比較久，請拿 short-live ACCESS_TOKEN + APP_SECRET 並透過[這支 API](https://github.com/louis70109/threads-sdk/blob/main/threads/api.py#L45)來取得 **long-live ACCESS_TOKEN**
- 發文需要先建立 Container，後續可以一起推出
- 相關的 API 如果不敷使用，歡迎[透過 Pull Request ](https://github.com/louis70109/threads-sdk)來更新 SDK 唷！


# 參考

- [Come on！使用 Threads API 來自動發文吧](https://cowton0517.medium.com/come-on-%E4%BD%BF%E7%94%A8-threads-api-%E4%BE%86%E8%87%AA%E5%8B%95%E7%99%BC%E6%96%87%E5%90%A7-792797a68437)
