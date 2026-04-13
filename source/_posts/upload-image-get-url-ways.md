---
title: 在 GCS || GitHub 上傳圖片並取得網址
tags:
  - GCP
  - Google
  - GitHub
  - LINE
categories: 應用
date: 2022-10-02 18:27:05
---


![](https://nijialin.com/images/common.jpeg)

# 前言

從以前使用雲端硬碟，如 Dropbox, Google Drive, Box...我們都很習慣可以手動拉照片、影片上去放，而在開始寫程式之後理所當然就會想用 API 丟，但這些雲端硬碟一般來說除非用模擬器，不然理論上應該是不好用程式跑，而在公有雲出來後，就有像是 AWS S3, Google Cloud Storage 等等的服務陸續出來，讓大家可以使用他們的服務建立自己的硬碟空間，也不用自己架伺服器弄硬碟空間，權限管控都幫你弄好好，也可以用 API 訪問，實在是很方便呢！

隨著程式越寫越多，除了在 LINE Bot 上需要圖片網址才可以發送圖片外，像是 video.js 以及許多很多服務、工具越來越依靠　 https 相關的網址來找圖片，接下來就讓筆者就帶大家認識一下近期使用的一些範例以及我發現的另一種上傳方法。

<!-- more -->

# 介紹

以下範例介紹 GCP & GitHub 專案兩種方式來上傳圖片使用。

## Google Cloud Storage(GCS)

![](https://nijialin.com/images/2022/cloud-storage-productcard.jpg)

> [定價表](https://cloud.google.com/storage/pricing)
> Cloud Storage「一律免費」部分的用量限制
> 在 Google Cloud 免費方案下，使用者可免費使用一定限度的 Cloud Storage 資源。無論免費試用期是否已經結束，只要您未超過相關用量限制，都可以免費使用這類資源。免費試用期過後，如果超過「一律免費」方案的用量限制，系統就會根據上方價目表收費。
> Cloud Storage「一律免費」方案的配額適用於 US-WEST1、US-CENTRAL1 和 US-EAST1 區域的資源用量，這 3 個區域的用量會合併計算。一律免費方案的內容隨時可能變更。

| 資源             | 每月免費用量限制                                          |
| ---------------- | --------------------------------------------------------- |
| Standard Storage | Text                                                      |
| A 級作業         | 5,000 次                                                  |
| B 級作業         | 50,000 次                                                 |
| 網路輸出         | 從北美洲到各個 GCP 輸出目的地各佔 1 GB\* (澳洲和中國除外) |

雖然需要付錢，但相關的 API 文件都非常的豐富，網路上也有許多語言範例可以參考，在連結其他 GCP 服務上網內互打也會快滿多的，像是我在八月 [COSCUP 分享的內容中](https://nijialin.com/2022/08/20/gccp-creator-cc-subtitle/)就是使用 GCS 搭配 eventarc，讓上傳後可以觸發後續動作，非常棒的服務！且另外也還可以放前端編譯完的靜態檔案(dist)上去，讓你網站部署後也可以使用。

> 上傳至 GCS 範例：[louis70109/FastAPI-GCS](https://github.com/louis70109/FastAPI-GCS/blob/877189b984a6b10b8df1535e1f63b9e1b447c33c/utils/gcp.py#L4)

```Python
from google.cloud import storage
def upload_data_to_gcs(bucket_name, data, target_key, meta=None):
    try:
        client = storage.Client()
        bucket = client.bucket(bucket_name)
        blob = bucket.blob(target_key)
        blob.upload_from_string(data, content_type=meta)
        return blob.public_url
    except Exception as e:
        print(e)
        raise
```

透過這個函式執行成功之後，就可以取得圖片網址嚕！但若網址拿到之後還是不行使用，請確認 GCS 的權限喔！

## GitHub repo

- 空間限制 5G([Document](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github))

> We recommend repositories remain small, ideally less than 1 GB, and less than 5 GB is strongly recommended.

官方建議專案盡量少於 5G，但因為初期使用可能還在評估到底要用哪家 Bucket 好，因此還是可以先寫一段上傳的 code 先把檔案放上去，後續也建議把它轉移到其他的儲存平台上才好喔！

## 應用 - LINE Bot 收到圖片後傳到 GitHub 並使用

LINE Bot 在一次的 Webhook 收到圖片之後，會收到 Message Id，可以透過這個 ID 去取得圖片、影片、音檔以及檔案([Document](https://developers.line.biz/en/reference/messaging-api/#get-content))，以下是使用 Python 為範例。

<script src="https://gist.github.com/louis70109/d9badb4defce9c33a5e89b1d2c0c82ed.js"></script>

- 5~7 行將 content 內容中的 byte 給全部拉出來，檔案內容內容大概會像這樣 `b'\x009\x002'` (筆者忘了這是哪個編碼)。
- 從 LINE 拉下來的檔案需要 decode 成 ASCII 的格式，而 GitHub 只吃 base64，因此需要透過第 9 行的方式把它轉掉 `base64.b64encode(image_content).decode('ascii'))`。
- 10~24 則是呼叫 GitHub 上傳檔案 API。
  - 如需使用請把 `committer` 以及 `url` 換成自己的內容喔！

搭配著 GitHub [上傳檔案的 API](https://docs.github.com/en/rest/repos/contents#create-or-update-file-contents) 來將檔案上傳上去，其中在 `content` 的部分他規定 `The new file content, using Base64 encoding.`

### 那我要怎麼知道我的檔案網址呢？

一般我們從 GitHub 介面點上進去專案時路徑都大概像是 `https://github.com/帳號/專案名稱/blob/master/檔案.png`，但因為圖片使用上這樣會抓不到原檔，在 GitHub 的儲存位置上則是以下：

```
https://raw.githubusercontent.com/帳號/專案/master/檔案.png
```

如此一來不管在 LINE Bot、video.js、HTML src 上要使用都可以直接這樣傳輸，如此一來就可以帶大家度過 side project 啟動的初期了～

# 結論

處理空間的位置一直都不是件容易的事情，尤其在現在大家都使用雲端空間的時代也很難自己在架設機器，都還是會傾向代管的方式執行，以上提供兩個方法讓大家開發時可以快速上手，如果你也覺得這篇有用的話，再請幫我多分享喔！想了解什麼內容也歡迎留言讓我知道😳 

<style>
  section.compact {
    font-size: 150%  
  }
  img[alt~="center"] {
    display: block;
    margin: 0 auto;
  }
</style>
