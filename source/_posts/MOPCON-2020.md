---
title: 2020 MOPCON 心得分享
tags:
  - LINE
  - MOPCON
  - DevRel
  - Chatbot
categories: 研討會
date: 2020-11-02 19:11:00
---

<style>
  section.compact {
    font-size: 150%  
  }
  img[alt~="center"] {
    display: block;
    margin: 0 auto;
  }
</style>

# 前言

大家好，我是 LINE Taiwan Technology Evangelist - NiJia Lin，在大概三、四月那投稿了 MOPCON，經過漫長的等待在 10/24 這天有機會被邀請至濁水溪以南最大的技術研討會，除了與大家分享實作 [Lotify](https://github.com/louis70109/lotify) 以及 Swagger 的使用經驗，並帶大家多認識研討會所帶來的魅力！

<!-- more -->

# 介紹

## Lotify

<script async class="speakerdeck-embed" data-slide="2" data-id="652942832db145c380f49b065b7f0918" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

LINE 的衷旨以「CLOSING THE DISTANCE」建構了許多大家日常所會使用的服務來拉近人與人的距離，從 LINE TAXI、MUSIC、TODAY...等等大家生活中常見的服務，但這些大服務都有個共通點，就是需要通知使用者得知最新的消息(新聞、歌曲、優惠卷)，只是平常若要做通知這件事，最直覺的想法可能是開發一個 APP，但是開發成本較高且還要使用者願意安裝 APP，因此大家可以使用 LINE Notify 來取代這件事，以下快速介紹他的優點。

<script async class="speakerdeck-embed" data-slide="11" data-id="652942832db145c380f49b065b7f0918" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

- 由 LINE 提供
- 無需另外安裝 APP
- 單向通知(From LINE to user)
- OAuth 2.0

常見的用途如下：

- Production 環境監控
- 購物通知
- Server 健康度通知
- 程式碼倉庫訊息通知(Github、Gitlab)
- 天氣

> Lotify 詳細用途請參考[中文文件](https://github.com/louis70109/lotify/blob/master/README-zh_TW.md)(感謝網友貢獻)

> 更詳細的介紹請參考：[COSCUP 2020 年會 – LINE 工程團隊的議程分享](https://engineering.linecorp.com/zh-hant/blog/line-coscup-2020/)

## Swagger

### 好處

- 文件化 API，還可試用(團隊可以它為標準)
- 支援 YAML 以及 JSON
- flask 推薦 flask-restful-swagger-2

> 可參考我的範例程式 - [lotify-swagger-example](https://github.com/louis70109/lotify-swagger-example)

### Generator

寫完 Swagger 文件之後當然不是只有上述的好處，可以使用工具快速透過 Swagger 產生出其他語言的 SDK 提供不同團隊成員使用，這邊我使用 [openapi-generator](https://github.com/OpenAPITools/openapi-generator) 來做範例使用，當你透過 [lotify-swagger-example](https://github.com/louis70109/lotify-swagger-example) 將服務佈屬起來時，透過以下指令即可快速建立第一個範例：

```
openapi-generator generate -i https://HEROKU_URL.herokuapp.com/api/swagger.json -g javascript -o lotifySampleApi
```

接著就會看到 `lotifySampleApi` 這個資料夾，透過裡面的 README 的說明操作即可馬上使用產生出來的 SDK(依照不同語言有不同的使用方式)，若要馬上測試可以放上 GitHub(or Gitlab) 之類的地方安裝看看是否成功。

## 小結

<script async class="speakerdeck-embed" data-slide="32" data-id="652942832db145c380f49b065b7f0918" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

若對於相關使用有興趣不妨使用這個專案來試試看吧！

# 場外活動

這次 Chatbot 攤位也有來 MOPCON 擺攤！且這次負責人 - KoKo 很用心的使用 LIFF 設計了刮刮卡體驗，吸引了許多會眾前往攤位體驗，完整展現了社群人的精神啊！

![](https://nijialin.com/images/2020/mopcon/1.PNG)

被~~刮刮卡~~社群吸引的會眾們，聽每個熱情的社群分享他們的理念，彼此交流想法讓資訊圈可以更活絡！👏
![](https://nijialin.com/images/2020/mopcon/2.PNG)

精彩的 Unconference，看到上面的題目就知道野生的強者就藏在這裡面！
![](https://nijialin.com/images/2020/mopcon/3.PNG)

Unconference 的設計真的很讚，讓大家(講者、會眾)以一個較輕鬆的心情來分享與聆聽，互相交流變出更多不一樣的想法，讓作品可以注入更多的元素。
![](https://nijialin.com/images/2020/mopcon/5.PNG)

每個聽的人數都超級多，不愧是南部最大的研討會 😲
![](https://nijialin.com/images/2020/mopcon/9.PNG)

## 小結

研討會除了聽議程學習新技術外，場外活動也都是相當精彩的部分，透過與各個領域的朋友交流了解不同面向所帶來的影響(成效)，從解決技術問題～籌備社群，當中都有各種辛酸史，大家若對社群有想法，歡迎來社群月會交流或聯繫管理者們～

- [Chatbot TW](https://www.facebook.com/groups/chatbot.tw)

# 結論

![](https://nijialin.com/images/2020/mopcon/10.PNG)

因為其他活動的關係只能在 MOPCON 停留一天，從以前只能在台下聽大神們的精彩分享到自己也有機會上台分享，藉由這次的前往 MOPCON 的經驗中學習到如何調整內容讓大家可以較快理解，並與路上的各位社群朋友交流了解不同區域的社群型態，期許各個領域的資訊技術可以在每個地方都有討論區可以互相交流。😊

# 活動小結

立即加入「LINE 開發者官方社群」官方帳號，就能收到第一手 Meetup 活動，或與開發者計畫有關的最新消息的推播通知。▼

「LINE 開發者官方社群」官方帳號 ID：@line_tw_dev
![](https://www.evanlin.com/images/2020/line-tw-dev-qr.png)

# 關於「LINE 開發社群計畫」

LINE 今年年初在台灣啟動「LINE 開發社群計畫」，將長期投入人力與資源在台灣舉辦對內對外、線上線下的開發者社群聚會、徵才日、開發者大會等，已經舉辦 30 場以上的活動。歡迎讀者們能夠持續回來察看最新的狀況。詳情請看:

- [2019 年 LINE 開發社群計畫活動時程表](https://engineering.linecorp.com/zh-hant/blog/line-taiwan-developer-relations-2019-plan/)
- [LINE Taiwan Developer Relations 2019 回顧與 2019 開發社群計畫報告](https://engineering.linecorp.com/zh-hant/blog/line-taiwan-developer-relations-2019/)
- [2020 年 LINE 開發社群計畫活動時程表](https://engineering.linecorp.com/zh-hant/blog/2020-line-tw-devrel/)
