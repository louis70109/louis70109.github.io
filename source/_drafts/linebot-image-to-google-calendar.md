---
title: 透過圖片或網址，讓 LINE Bot 產生行事曆來成為活動達人
categories: LINE
tags: ['LINE Bot', 'Google Calendar', 'Google', 'AI']
---

![](https://nijialin.com/images/common.jpeg)

# 前言

平時我們在收到各種平台上都很容易收到各式各樣的廣告文宣(職棒比賽、系上活動、社團...etc)，收到後卻因為忘了放進行事曆而錯過了很多活動跟獎品...🥲

而在這些文宣中有很多重要資訊，像是：標題、時間、地點、簡述、美美的圖，有沒有發現一些共同點？就是跟平常我們再加行事曆時的內容基本上一樣啊！(除了圖片以外)

這兩個相性這麼像，想當然一定是要把它組合再一起才對！因此透過這個專案，只要把圖片或圖片網址給 LINE Bot，就能夠幫你產生一個 Google Calendar 連結，讓你變成一個活動達人！

<!-- more -->

# 介紹

一般來說可以分兩種情況：

1. 收到系上群組轉發的`圖片`
2. 收到一個活動圖片`連結`，讓你自己看

以上兩點在我記憶中的大學日子中很常收到的文宣，因此接下來我們就透過圖片跟連結來做行事曆！

## 收到一則轉傳的圖片要如何變成行事曆連結呢？

### 確認 LINE Bot 是否已建立

> 2024/09/04 更新了新的 LINE Bot 申請方式，請參考 [如何透過新的建立方式，開啟你第一隻 LINE Bot 【2024/09/04】](https://techblog.lycorp.co.jp/zh-hant/linebot-2024-create-steps)

如果已經透過上述文章建立完 LINE Bot，接下來可以參考[GitHub 專案](https://github.com/louis70109/linebot-image2calendar)，並將 LINE Bot 部署起來

### 圖片處理

參考[程式碼中](https://github.com/louis70109/linebot-image2calendar/blob/main/main.py)以下的 decorator:

```python
@handler.add(MessageEvent, message=ImageMessageContent)
def handle_github_message(event):
  ...
```

在 Python 中很特別的是，可以透過 decorator(裝飾) 來判斷訊息類別，如此一來才不會 main function 有滿滿的判斷式，透過這方法大家可以更清楚程式碼當中是如何運行

圖片方面，則是透過以下的方式先取得圖片內容：

> 小補充，過去在取的 image binary 時候，還需要另外寫迴圈將 binary 全部加起來成一個變數，現在僅需透過 `get_message_content` 就可以拿到整個圖片內容囉！

```python
with ApiClient(configuration) as api_client:
        line_bot_blob_api = MessagingApiBlob(api_client)
        image_content = line_bot_blob_api.get_message_content(event.message.id)
```

### 圖片處理

回到正題，我在[程式碼這邊](https://github.com/louis70109/linebot-image2calendar/blob/main/utils.py#L57)是透過 `gemini-1.5-flash` 來針對圖片說文解字

現在 AI 相比一兩年前聰明太多了，在 prompt 上把需求提出來，並且根據 Google Calendar 網址上 timestamp 的需求、以及所需格式，這樣就能夠輸出穩定圖片當中內容

另一方面，LINE 在文字上如果一次貼上太多時，會變成文本，也就是不會是連結產生。那這跟今天實作有什麼關係？

因為在使用上會傳送網址給用戶並帶上`?ExternalBrowser=1`，讓用戶在裝置上可以打開已登入的 Google Calendar 並把行事曆內容附上。且中文字在網址上都需要 urlencode，否則有些瀏覽器會編碼過不了，這情況就會導致文字太長變成文本

因此在這次專案中是[透過 reurl API 來幫忙縮短網址](https://github.com/louis70109/linebot-image2calendar/blob/main/utils.py#L85)，透過短網址就可以處理掉相關問題 😇，除了行事曆內容更完整以外，也可以避免文字過長的困擾

### 展示結果

![](https://nijialin.com/images/2024/image2calendar/image.png)

傳一張廣告文宣給 LINE Bot，請他整理裡面的內容，其中要含有標題、時間、內容，並且要針對這次活動說明一些注意事項

![](https://nijialin.com/images/2024/image2calendar/calendar.png)

點選網址之後即會開啟行事曆，僅需要按確認或調整一下內容後即可唷！

## 若是收到群組傳來一個網址讓我自己看圖片呢？

在這個步驟上，先預想大家會收到一串網址，點開是一個活動的網站內容，可能在系上的網頁、活動網頁...etc

在 LINE Bot 上因為是透過文字的方式，因此需要透過[正規表達式判斷文字是否為網址](https://github.com/louis70109/linebot-image2calendar/blob/main/utils.py#L16)，只要判斷起來是，後面的操作步驟基本上跟上一章節一樣，丟給 Gemini 處理完，然後回傳 Google Calendar 網址來點選

### 展示結果

![](https://nijialin.com/images/2024/image2calendar/url.png)

透過 LINE 將網址傳送給 LINE Bot 去解析，解析完成之後會回傳一個縮網址，讓用戶可以去點選

若是手機上，則會跳到 APP 上讓用戶去新增行事曆

![](https://nijialin.com/images/2024/image2calendar/calendar2.png)

結果如同上一章節一樣，會把對應內容放入行事曆當中，只要按下**送出**即可！

## 其他需要注意

很多時候我們在處理網址上會很直覺把中文字都放進去，會發現時而正常時而壞，這種情況大多是因為有些瀏覽器有先幫忙預處理，才會看起來是好的，而有些瀏覽器功能比較簡潔，就有可能會壞掉

這時候就需要透過 urlencode 去把中文字的內容給 parse 掉，我們就以最低能執行的狀態去處理，因此就會使用 `urllib.parse.quote(content)` 來把文字處理掉，如此以來就不會有電腦正常，手機瀏覽器不正常的情況啦！

> 詳細程式碼[請見 URL](https://github.com/louis70109/linebot-image2calendar/blob/main/utils.py#L30)

# 結論

這次的範例透過圖片判斷的方式，讓大家生活中收到的各種圖文可以整理近行事曆當中，有效管理大家在繁忙生活中的點點滴滴，希望透過這次應用讓大家有個初步的發想，運用 AI 的技術製作讓生活上方便應用的 LINE Bot！

# 活動小結

立即加入「LINE 開發者官方社群」官方帳號，就能收到第一手 Meetup 活動，或與開發者計畫有關的最新消息的推播通知。▼

「LINE 開發者官方社群」官方帳號 ID：[@line_tw_dev](https://qr-official.line.me/gs/M_908lugfe_BW.png)

<img src="https://qr-official.line.me/gs/M_908lugfe_BW.png" width="200" height="200">

# 關於「LINE 開發社群計畫」

LINE 於 2019 年開始在台灣啟動「LINE 開發社群計畫」，將長期投入人力與資源在台灣舉辦對內對外、線上線下的開發者社群聚會、徵才日、開發者大會等，已經舉辦 30 場以上的活動。歡迎讀者們能夠持續回來查看最新的狀況。詳情請看:

- [2021 年 LINE 開發社群計畫活動時程表](https://engineering.linecorp.com/zh-hant/blog/2021-line-tw-devrel/)
- [2020 年 LINE 開發社群計畫活動時程表](https://engineering.linecorp.com/zh-hant/blog/2020-line-tw-devrel/)
- [2019 年 LINE 開發社群計畫活動時程表](https://engineering.linecorp.com/zh-hant/blog/line-taiwan-developer-relations-2019-plan/)
- [LINE Taiwan Developer Relations 2019 回顧與 2019 開發社群計畫報告](https://engineering.linecorp.com/zh-hant/blog/line-taiwan-developer-relations-2019/)

<style>
  section.compact {
    font-size: 150%  
  }
  img[alt~="center"] {
    display: block;
    margin: 0 auto;
  }
</style>
