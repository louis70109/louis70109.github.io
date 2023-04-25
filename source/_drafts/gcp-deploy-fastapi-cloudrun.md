---
title: 【GCP】把 FastAPI 佈署上 Cloud Run
categories: GCP
tags: ['Python', ]
---


![](https://nijialin.com/images/2023/)
![](https://nijialin.com/images/common.jpeg)


# 前言

<!-- more -->

# 介紹

大家好，，今天我們的主題是如何將 FastAPI 部署到 GCP Cloud Run 上。Cloud Run 是 Google Cloud 平台上的一個全托管容器平台，支持快速部署和自動擴展。現在，我們將向大家展示如何使用它來部署 FastAPI 應用程序。

第一幕：
首先，讓我們來看一下如何準備我們的 FastAPI 應用程序。為了能夠成功部署到 Cloud Run，我們需要確保我們的應用程序是可部署的。在這裡，我們使用 pipenv 來創建虛擬環境並安裝所需的庫。

創建虛擬環境：`pipenv install`
安裝所需的庫：`pipenv install fastapi uvicorn[standard] google-auth google-auth-oauthlib google-auth-httplib2`


第二幕：
現在，我們已經安裝了所需的庫和虛擬環境，讓我們來實際創建我們的 FastAPI 應用程序。這裡，我們將使用 FastAPI 創建一個簡單的 API 端點，並將其保存到一個 Python 文件中。


```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}
```

第三幕：
現在，我們已經有了一個可以部署的 FastAPI 應用程序，讓我們將其部署到 Cloud Run 上。在這裡，我們將使用 Google Cloud SDK 和 gcloud 命令來完成此操作。

安裝 Google Cloud SDK：請參閱官方文檔以獲取詳細指令。
部署應用程序到 Cloud Run：`gcloud run deploy --image gcr.io/[PROJECT-ID]/[IMAGE]:[TAG] --platform managed`
請注意，上述指令中的 [PROJECT-ID] 和 [IMAGE] 需要替換為您的項目 ID 和映像標記。


第四幕：
現在，我們已經成功部署了我們的 FastAPI 應用程序，讓我們來測試一下它是否正常運行。我們可以使用 curl 命令來測試 API 端點是否可以正常訪問。

使用 curl 命令測試 API 端點，例如：`curl https://[SERVICE-URL]/`
請注意，上述指令中的 [SERVICE-URL] 需要替換為您的 Cloud Run 服務的 URL。


結尾：
這就是如何將 FastAPI 部署到 GCP Cloud Run 上的全部過程。通過這個簡單的演示，你現在已經了解了如何使用 Cloud Run 快速部署和擴展你的應用程序。希望這個影片對你有所幫助，謝謝收看！
# 結論
