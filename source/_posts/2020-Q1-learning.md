---
title: 2020 一、二月的學習紀錄
tags:
  - 日記
  - Docker
  - LINE SDK
  - AWS
  - LINT
  - Netflix
categories: 學習紀錄
abbrlink: 2040281021
date: 2020-02-08 01:28:42
---

![learn records](https://i.imgur.com/0uMmQBV.jpg)

# 前言

礙於最近做事有點手忙腳亂，沒有很有效的管理時間，記錄下來讓往後能有個經驗可循並增加自我管理能力。

# 實作項目

## Docker & Docker-Compose

我記得上次自己弄 docker container 已經是一年多前，當時還結合 Drone CI 來跑(好久了 👀)，對於 Dockerfile 使用方法依稀有點印象，而最近因為看了許多 open source 後對於 Dockerfile 的內容了解度也提升了許多(實在是個不錯的方法 👍)，會這樣子弄的原因是我認為 Serverless 的架構很容易被 AWS 綁架，我認為 API 這類可拆出來的功能應該要包成 container 增加彈性不讓平台限制，被這個想法 trigger 後就來好好練習 Docker 了 🏋️‍♂️。

這次使用 [Twitch-Bot](https://github.com/louis70109/Twitch-Bot) 做我的練習對象，裡面主要用了 `node` 以及 `mongo` 兩個服務，在此同時如果各別起 docker 挺麻煩，因此就需要使用 `docker-compose` 幫忙啟動，而在這過程中學到了:

- 把 Dockerfile 遷移到 docker-compose 上 (~~如何複製別人的檔案(大誤)~~)。
- 藉由 docker-compose 裡面的 `network` 連接兩個容器的使用方法。
- Google container-registry 上傳以及 gcloud 過期的 docker 使用方法([參考](https://cloud.google.com/container-registry/docs/support/deprecation-notices))，同時也修正後可以使用 docker 的原生指令將 container 送上 Google。

接下來就是趁六月 credit 過期前趕快來玩玩 Google Kubernetes 🚀

## AWS IoT Job

最近在公司實作 AWS IoT Job 部分的功能(以下稱為 Job)，因為 Job 每次執行收費約 1 塊台幣，之所以會用它是因為在 IoT 執行時不是只會單純發送訊號出來讓後台收訊號做事，而是需要跟後台經過一連串的溝通來達成功能(例如 `韌體更新`)，當然還有很多更複雜的功能，這邊只列舉一個小部分。

從這段時間的實作上學到的部分:

### 裝置工作列表

當後台的 Queue 同時塞進很多工作時要如何管理並通知裝置此時的工作有哪些(All Job)以及要做哪件事(Next Job)，實作這功能時不能只考慮到一個裝置，而是考慮到 N 個裝置時要如何過濾並管理狀態機，限制裝置要依照狀態執行避免系統錯亂。

### 平台化

之前主要功能都是介接 AWS IoT，而這次是要實作一個類似的功能提供給其他使用者，不能只開一個 API 就想要功能都包好，而是將功能明確劃分，讓使用者可以有彈性的去組合，只是在此時我沒有處理得很好，之後的 Task 需要更注意。

## LINE SDK - Narrowcast Client API

> 參考 Pull Request: [Add narrowcast client api #237](https://github.com/line/line-bot-sdk-python/pull/237)

### 工廠模式

功能主要是讓開發者可以透過 API 來做分眾的推播，在實作這個 issue 時讓我原本模糊的工廠模式清晰了許多，主要是 SDK 使用了 Python Class 來擔任 Model 的角色，讓進來資料可以經過 model 去轉換成對應的 key-value，所有的資料都分類進去對應的工廠處理完再回傳出來。

在還沒開始看 code 前只想著要寫什麼邏輯去處理，其實使用 Model 的方法就處理掉大部分資料格式的問題，很多 LINE 文件已經清楚定義的格式只要照著填就解決了，只是在這個 Task 遇到了`Python 保留字`的問題，而經過各種 google 後只好自己寫邏輯去判斷掉這件事，之後只能繼續看有沒有更好的寫法可以取代掉這個`保留字`的問題。

### Lint

官方 Github 有寫要 Contribute 時需要執行的內容([參考](https://github.com/line/line-bot-sdk-python#contributing))，lint 則是遵照`flake8`，而執行`tox`後會對每個版本的 python 去做測試，但像我電腦只有 3.7 版 tox 就只會針對這個版本做測試。

- 在這件事上學到的 `tab` 與 `空白鍵(space)` 的差異，[PEP-08](https://www.python.org/dev/peps/pep-0008/#tabs-or-spaces) 上也告訴建議使用`空白鍵`，而 python 3 之後也不允許兩個混用，畢盡 python 是很注重縮排，既然官網都寫了哪有不遵守的道理呢？😃

> Lint 也不會無緣無故來刁難開發者 XD

- 內部函式(Class、Function)都需要再第一行下註解，而會這樣用的因素可能在 python 上並沒有 `public`、`private` 的觀念，透過這樣的方法來表示它(Class、Function)是一個內部函式，藉由 Lint 讓開發者可以知道這個功能是內部還外部，只是在 python 只能使用這個 lint 讓大家遵守這規則，如果沒有 CI 要硬上的話其實也管不住，畢竟不像 golang 這類語言會編譯(汗顏)。

總之使用 lint 的好處就是開發風格可以統一，能夠盡量避免不必要的 programing 麻煩，在寫任何語言都推薦使用各個語言的 lint，雖然一開始會很討厭它，但它真的是在幫助你 😆。

## Netflix

這時間與家人一起訂閱了一年份的會員，而我的初衷就是想把英文學好，而我也花了時間好好的看完一部全英文影集(發英與字幕)，第一次嘗試這樣看全英文，並且邊看邊 Google 翻譯不懂的單字同時口述跟著念一遍增加記憶力，隨著工作量減輕後下班也可以再安排時間繼續看下個影集學了～

> 然後迷上了`愛的迫降`這個韓劇，推薦喜歡看愛情片的朋友去看 ❤️

## 武漢肺炎

最近剛好因為這傳染病盛行，除了防疫之餘，g0v 也提供 API 讓開發者可以拿去介接，隨著大家各種開發前端 web 以及 chatbot ...的應用後本來在想有個什麼想法可以參與這個全民黑客松，只是我認為用途實在重複性太高，而在大家開發應用時我又剛好在寫 LINE SDK，錯失了第一時間發佈口罩相關的服務建立時間，本來想到 LIFF v2 + LINE Notify，但只是在使用上很容易吵到用戶進而封鎖它(LINE Notify)，因此要考慮好功能再來看會不會有比較好的使用情境。

> 出入公共場所記得戴口罩，有帶隨身瓶酒精的記得消毒！😷

# 結論

有時候在思考與規劃的過程中如果經驗不夠時真的很難馬上到位，不過任何事情都一樣，若這件事可以輕鬆且又得心應手，代表它可能已經是你熟悉的領域或是過於簡單，就像我一開始處理社群一樣，若是沒有前輩們帶著走的話我跟本無法有效地處理事情，總之凡是起頭難，即早加入即早熟悉各個領域才是王道 😆

# 參考

[AWS IoT 觸發後可以執行的功能](https://docs.aws.amazon.com/zh_tw/iot/latest/developerguide/iot-rule-actions.html)
[Job Events](https://docs.aws.amazon.com/iot/latest/developerguide/events-jobs.html)
[Tab 與 space 的差異(PEP-08)](https://www.python.org/dev/peps/pep-0008/#tabs-or-spaces)
