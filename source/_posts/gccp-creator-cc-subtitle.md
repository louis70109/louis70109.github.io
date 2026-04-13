---
title: '【GCCP Creator】增加字幕編輯的效率！| feat. GCP, GCS, STT'
tags:
  - Google
  - Cloud Storage
  - Speech to Text
categories: GCP
date: 2022-08-20 23:10:55
---


![](https://nijialin.com/images/2022/coscup.JPG)

# 前言

隨著大影片時代開始，人們開始拍攝各種題材的題目，身為創作者的你最痛的點是什麼？影片？題材？對我來說就是字幕問題！人人看影片都需要字幕的部分，那該怎麼減輕上字幕的工作呢？這次就利用 GCP 上的服務(STT, GCS)，分享當中使用的一些眉眉角角，至少先讓你可以擁有一個入門級的字幕，降低大家初期在做影片所花的時間，把精力放多一點到創作上，最後在搭配 video.js 來展示。

- [GCCP Creator 專案](https://github.com/louis70109/GCCP-Creator)
- [分享的議程](https://coscup.org/2022/zh-TW/session/P7HXPX)
- [大會共筆](https://hackmd.io/@coscup/r1TovCJ65/%2F%40coscup%2Frk8ivC1a5)
<!-- more -->

> 此次在 COSCUP 2022 分享內容是日常的 Side Project - [GCCP Creator 專案](https://github.com/louis70109/GCCP-Creator)

# 主題圍繞

- 凡事總有個原因
- Speech-To-Text
- Cloud Storage
- IAM & Role
- Cloud Run
- Youtube & Video.js
- Take Away

## 凡事總有個原因

1. 減少獨自製作影片的 effort
2. 增加被平台看見的機會
3. 想紅

### 這個專案怎麼能增進效率呢？

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/d069e1978c504743b6509a7fc336c0fb?slide=6" title="GCCP Creator @ COSCUP 2022" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 560px; height: 314px;" data-ratio="1.78343949044586"></iframe>

製作影片之前花費的功夫就有許多硬體、拍攝手法、剪輯相關，但這些就我目前經驗而言應該大家體會的過程都會是一樣。

而在這個過程中我們能做的事情就是透過雲端服務來處理`逐字稿`-`對時間線`-`輸出SRT`，到底能怎麼做呢？

### 使用 CC 字幕的原因

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/d069e1978c504743b6509a7fc336c0fb?slide=7" title="GCCP Creator @ COSCUP 2022" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 560px; height: 314px;" data-ratio="1.78343949044586"></iframe>

#### 優點篇

- 不必等字幕做完才出影片
- 上字幕難免出錯，修改快速
- 自適應(不受解析度影響)
- 提高影片曝光率(Youtube 識別)
- Youtube 編輯器夠用
- 額外優惠
  - 幫助聽障人士
  - 電腦版有自動翻譯
  - 有機會讓粉絲幫忙共編

#### 缺點篇

- 預設是關閉，需要訓練用戶
- 中文觀眾習慣看內字幕
- 字卡特效較少(不夠吸睛)
  - 會擋住原本的特效，有個遮罩 embed 在最前面

## 我在講它要聽！ ✍️ 開啟 SpeechToText

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/d069e1978c504743b6509a7fc336c0fb?slide=12" title="GCCP Creator @ COSCUP 2022" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 560px; height: 314px;" data-ratio="1.78343949044586"></iframe>

通常我們在使用服務時，都會很習慣進 UI 看一下這服務能做到些什麼事，而 STT 的 UI 上就是一些常見設定，來源、編碼、取樣率...，讓還在觀察測試的用戶可以先稍微玩看看了解 STT 能力到哪，在進行 API 使用的部分。

## 總會需要個玻璃櫃 🦖 建立 Cloud Storage

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/d069e1978c504743b6509a7fc336c0fb?slide=16" title="GCCP Creator @ COSCUP 2022" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 560px; height: 314px;" data-ratio="1.78343949044586"></iframe>

Cloud Storage(GCS) 顧名思義就是要建立一個雲端儲存庫，相當於 AWS S3，除了可以放上東西儲存以外，也可以透過它去介接其他的服務，此篇後面將會透過 Eventarc 去介接 Cloud Storage 與 Cloud Run。

> GCS 與 AWS S3 經常也會被拿來放置前端編譯完放置檔案的地方，再透過其他 DNS route 之類的功能，借接起來把前端資訊打在用戶的瀏覽器上。
> 其他參考 [Day28 - 用 AWS S3 幫忙轉址到原有的服務上](https://nijialin.com/2019/10/12/Day28-%E7%94%A8-S3-%E5%B9%AB%E5%BF%99%E8%BD%89%E5%9D%80%E5%88%B0%E5%8E%9F%E6%9C%89%E7%9A%84%E6%9C%8D%E5%8B%99%E4%B8%8A/)

## 而且要有鎖頭 🔐 來點 IAM & Role

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/d069e1978c504743b6509a7fc336c0fb?slide=19" title="GCCP Creator @ COSCUP 2022" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 560px; height: 314px;" data-ratio="1.78343949044586"></iframe>

首先要先到 GCP 左上的找到 `IAM & Role`，找到 Service Account(服務帳戶) 建立授權過的帳號。

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/d069e1978c504743b6509a7fc336c0fb?slide=20" title="GCCP Creator @ COSCUP 2022" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 560px; height: 314px;" data-ratio="1.78343949044586"></iframe>

順利建立完後會出現有兩種方式的金鑰讓你選擇使用，這邊一般會使用 `JSON 的檔案`來與雲端服務串接 API 使用。

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/d069e1978c504743b6509a7fc336c0fb?slide=21" title="GCCP Creator @ COSCUP 2022" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 560px; height: 314px;" data-ratio="1.78343949044586"></iframe>

這邊與大家分享一個切身之痛的事情，之前有次因為與 .gitignore 發生了點誤會，不小心把 JSON Key 往 GitHub 踢，結果導致 Key 被抓到拿去做壞壞的事，因此被寄了通知信鎖住帳號 QAQ，所以以下提供一些之前文章有做過的做法給大家，盡可能避免大家不小心把 Key 踢出去:

- 建立一個暫時檔
- 路徑放環境變數中
- 寫入 `GOOGLE_APPLICATION_CREDENTIALS`
- ⚠️ 需要框架啟動前
- ⚠️ 需整理成 JSON 樣式
- 單引號 -> 雙引號

以下提供一段 python code 示範上面的內容

```python
import tempfile, os

google_temp = tempfile.NamedTemporaryFile(suffix='.json')
try:
    GOOGLE_KEY = os.environ.get('GOOGLE_KEY', '{}')
    google_temp.write(GOOGLE_KEY.encode())
    google_temp.seek(0)
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = google_temp.name
except:
    google_temp.close()
```

> 更詳細內容請參考我之前寫的文章：[把 JSON 字串寫入記憶體中的暫時檔案並放路徑至環境變數中 | Python, FastAPI](https://nijialin.com/2022/04/02/python-env-import-json-string/)

## 萬事皆上雲 ⛅️ 如何部署到 GCP

gcloud 提供了很便利的方式，不用在本地端 build container 占空間，下指令時會幫忙在 GCP 上 build container，但因為是使用公有雲，所以還是需要出動神奇小卡才行，但可以省去許多初期建置的成本，也推薦大家可以使用。

```bash
git clone https://github.com/louis70109/GCCP-Creator.git
cd GCCP-Creator
gcloud run deploy xxxxxx --source .
```

接著就會把產生的 Container 放到 GCP 的 Artifact(Registry)，接著在部屬到 CloudRun 上。

### 做什麼才會觸發 - 在 CloudRun 設定 Eventarc

<script async class="speakerdeck-embed" data-slide="31" data-id="d069e1978c504743b6509a7fc336c0fb" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

Eventarc 在 GCP 上也是一個獨立服務，而在 CloudRun 上則是有個獨立的按鈕可以設定觸發條件，這邊因為要設定數發條件，可以設定對外、對內流量。

<script async class="speakerdeck-embed" data-slide="32" data-id="d069e1978c504743b6509a7fc336c0fb" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

接著要設定 Cloud Storage 為觸發條件，設定如下

- 想監聽的服務
- 監聽事件，設定 Cloud Storage 上傳完成後觸發
- 最後面 URL path 則設定 `/`，這邊會對應打到你 CloudRun 的路徑

<script async class="speakerdeck-embed" data-slide="35" data-id="d069e1978c504743b6509a7fc336c0fb" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

接著可以 MP3 檔案上傳 Cloud Storage，看看 GCCP Creator 是否運作正常，如果正常一ㄥ該過一段時間後就會出現檔案了。

## 不想住這邊，我要搬走！使用 video.js 的 hints

<script async class="speakerdeck-embed" data-slide="38" data-id="d069e1978c504743b6509a7fc336c0fb" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

一般來說，如果自己擁有的服務，也會把影片跟字幕檔案放在 Cloud Storage 上，而需要把檔案都設定從外面可以訪問的權限，而 mp4 在 video.js 中只要公開即可訪問，但如果是文字檔就不是這麼一回事了...

### CORS 那我要去愛別人 – API 我還你原形

<script async class="speakerdeck-embed" data-slide="40" data-id="d069e1978c504743b6509a7fc336c0fb" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

第一個方法是可以透過自己寫 API 的方式來回傳字幕檔案然後存在 localStorage；

而且在字幕的字串上，一定是會放 \n，在 JS 中可以使用 [eval()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval)來還字幕原型；並另外用 [Blob](https://developer.mozilla.org/zh-TW/docs/Web/API/Blob) 建立一個網址給 video.js 使用；最後 video.js 只接受 `webVTT` 的格式，因此 metadata 要設定 `type: 'text/vtt'`，這樣回傳之後 video.js 就可以正常使用囉！

<script async class="speakerdeck-embed" data-slide="44" data-id="d069e1978c504743b6509a7fc336c0fb" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

### 既然你不聽那我來硬的 – CLI 降肉！

<script async class="speakerdeck-embed" data-slide="42" data-id="d069e1978c504743b6509a7fc336c0fb" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

因為 Cloud Storage 目前不支援在 UI 上設定 CORS，但可以透過 gcloud CLI 來操作，因此這邊就可以用 gsutil 來處理。

- 建立設定檔 json
- 把 json 設定到 Cloud Storage 上
- 最後 get 看一下有沒有正常運作

### 過去即是永恆 – 快取放我走！

<script async class="speakerdeck-embed" data-slide="43" data-id="d069e1978c504743b6509a7fc336c0fb" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

在操作很多對外服務，系統上大部分都會做一些快取的動作，過濾一些重複刷新的動作，增加使用者體驗，但因為我們這次設定新的設定(~~好饒口~~)，因為都在前端操作，這邊可以開啟 F12 後使用 `強制清除快取`，就不用另外去泡茶慢慢等嚕！

## ✍️ 揮揮衣袖，不帶走一片雲彩

- STT 時間支援最低到 nano，但在 Youtube - 字幕上也算很精準
- STT 測試起來以一分鐘為分水嶺，太短的影片可能不適用
- 減少初期敲字幕稿的時間(`30~40%`)，只需後續細修、對時間
- 編輯器用別人的就好，別想自己寫 ( ~~還我三個禮拜！~~ )

<script async class="speakerdeck-embed" data-slide="36" data-id="d069e1978c504743b6509a7fc336c0fb" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

# 結論

這次在 COSCUP 2022 上分享了這次 side project，後續也發現可以透過 Youtube API 把影片或是相關檔案打上 Youtube，不過還有一些謎團要解決👀，如果這次的分享對你有用，歡迎分享出去給朋友們喔！

<style>
  section.compact {
    font-size: 150%  
  }
  img[alt~="center"] {
    display: block;
    margin: 0 auto;
  }
</style>
